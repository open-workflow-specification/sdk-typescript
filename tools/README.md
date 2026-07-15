# Tooling Architecture

## 1. Downloader

A simple script that downloads the JSON Schema(s) from `https://open-workflow-specification.org/`. Currently, there is only one schema, but the script supports downloading referenced schemas as well for legacy reasons. As it might be useful in the future and doesn't add much complexity, it has been retained.

> [!TIP]
> The schema(s) are saved in `src/lib/generated/schema/`, the main one being `workflow.json`.\*

## 2. Generating Types

The goal is to automatically generate TypeScript types/interfaces or classes corresponding to the specification's JSON Schema. This step is the trickiest. Its outcome will vary depending on the schema and the library used.

Some libraries considered:

- [dtsgenerator](https://www.npmjs.com/package/dtsgenerator) - Used with the previous version of the spec but is no longer updated and doesn't support `draft/2020-12` schemas. Replacing `$defs` with `definitions` didn't yield convincing results. With the previous version, manual merging of schemas was needed because external `$refs` were not resolved.
- [quicktype](https://www.npmjs.com/package/quicktype) - Despite its popularity, its output was unsatisfactory. Instead of using union types, it merged all properties into one object and made them nullable. While there might be configuration options to address this, it was not explored in depth. Its support for many languages might make it less specialized.
- [json-schema-to-typescript](https://www.npmjs.com/package/json-schema-to-typescript) - Generates a mix of types and interfaces, using unions and intersections. A red flag is the number of open issues, some dating back to 2018. However, it is still maintained.

In the end, `json-schema-to-typescript` was selected. Nevertheless, it has some issues to work around:

- [Issue #613](https://github.com/bcherny/json-schema-to-typescript/issues/613)
- [Issue #193](https://github.com/bcherny/json-schema-to-typescript/issues/193) (from 2018)

To maximize compatibility with `json-schema-to-typescript`, the generator performs a few operations in two phases:

### Phase 1: Embellishing the JSON Schema

To have better control over the generated type names, every object and array of objects in the schema is given a `title` if none is defined. This allows:

1. Avoiding names like `Schema` and `Schema1`
2. Mapping a generated type to its JSON pointer in the schema (see [3. Generating Validators](#3-generating-validators))

The `type: object` is also added when not specified. This doesn't impact type generation but might be useful for strict schema validation.

Theoretically, _Phase 1_ doesn't affect the validity of the schema.

> [!TIP]
> The resulting schema is saved as `src/lib/generated/schema/__internal_workflow.json` for later use.\*

### Phase 2: Mutating the JSON Schema

`json-schema-to-typescript` has limitations, as highlighted in the issues linked above:

- When a property's type is referenced (`$ref`) and also decorated with metadata (e.g., `description`), `json-schema-to-typescript` outputs an additional type instead of using the referenced one. See [Issue #193](https://github.com/bcherny/json-schema-to-typescript/issues/193).
- When an object inherits from another using a reference (`$ref`), the parent is ignored in the generated types. See [Issue #613](https://github.com/bcherny/json-schema-to-typescript/issues/613).
- `unevaluatedProperties` seems to be ignored.

_Phase 2_ addresses these limitations by:

- Removing metadata from properties whose type is a reference.
- Replacing `$ref` inheritance with `allOf`
- Replacing `unevaluatedProperties` with `additionalProperties`

The resulting schema is used in-memory to generate the types. The schema produced by _Phase 2_ is intrinsically different from the original schema and will produce different validation results if used. **This is why this process is done in two phases instead of one, which would have been more performant.**

After phases 1 & 2, the mutated schema is passed to `json-schema-to-typescript` and the resulting TypeScript declarations are saved to `specification.ts`.

> [!TIP]
> The declarations are saved in `src/lib/generated/definitions/specification.ts`.\*

## 3. Generating Validators

To validate an object of type `T`, where `T` is not the root object described by the JSON Schema, we need to know the subschema's JSON pointer corresponding to `T`. The exported declarations of the TypeScript file produced in [step 2](#2-generating-types) are extracted using `ts-morph`. _(At this point, it is probably overkill; a regex could probably do the trick, but this library will be useful later on.)_ For each declaration, the internal JSON Schema produced in [step 2 - Phase 1](#phase-1-embellishing-the-json-schema) is crawled to find the object with the matching title. Then, an object where the keys are the names of the types and the values are their JSON pointers is saved as `validation-pointers.ts`.

> [!TIP]
> The validation pointers are saved in `src/lib/generated/validation/validation-pointers.ts`.\*

The produced validation pointers are used by the SDK to expose a `validate` function that takes the name of the type to validate and the object to validate:

```typescript
validate('TypeName', value);
```

> [!TIP]
> The validation function is located at `src/lib/validation.ts`.\*

## 4. Generating Classes

[Generating types](#2-generating-types) is already a great step, but classes have a few advantages we'd like to leverage in an SDK:

- Unlike types, they can be tested at runtime with `instanceof`
- They can carry business logic such as object hydration (for the aforementioned `instanceof` checking), validation, normalization, etc.

### Phase 1: Declaration

The aim is to generate a class for each type/interface generated in [step 2](#2-generating-types) that shares the same property signatures. This is achieved by exploiting a TypeScript trick: declaring an internal class and then exposing it as an intersection of its constructor and its associated type (see this [StackOverflow reply](https://stackoverflow.com/questions/54207173/classes-keyof-in-typescript/54207465#54207465)). For instance, if our type is `Foo`, we can mimic a class `FooClass` using the following code:

```typescript
class FooClass {
  constructor(model?: Partial<Specification.Foo>) {
    if (model) Object.assign(this, model);
  }
}

const _FooClass = FooClass as {
  new (model?: Foo): FooClass & Specification.Foo; // aka "the constructor creates an object which is both FooClass and Foo"
};

export const Classes = {
  FooClass: _FooClass,
};

const fooInstance = new Classes.FooClass();
console.log(fooInstance instanceof Classes.FooClass); // true
```

For array types, it's a bit different. Here the challenge is to extend `Array` but enforce our prototype:

```typescript
export class Foo extends Array<SomeType> {
  constructor(model?: Array<SomeType>) {
    super(...(model || []));
    Object.setPrototypeOf(this, Object.create(Foo.prototype));
  }
}
```

> [!NOTE]
> After implementing this approach, the "hydration" has been researched and implemented. During this phase, properties of a type/interface and their subtypes (union/intersection/tuple) are reflected to be recursively hydrated. We could maybe use those to declare classes properties instead of using the "cast trick".

### Phase 2: Hydration

To hydrate the object, we rely on `ts-morph` to reflect the properties and build the hydration code. The process consists of the following steps:

- Get the target object associate type/interface and its subtypes (union/intersection/tuple)
- For each of those types, get their properties and indexed signature
- Get literal properties that can be constant and hydrate the constant if necessary
- Get properties that are not value types and hydrate the properties if necessary
- Get the indexed signature type and hydrate it if necessary

If a property is defined in multiple subtypes with different types, it's ignore altogether and a warning is emitted. For instance, a `CallTask` is a union of specialized call task such as `CallAsyncAPI`, `CallHTTP`, ... Those types both declare a `with` property but with different signature. Therefore, its hydration is ignored at the `CallTask` level.

In addition to the hydration, a call to the `constructor` lifecycle hook is also generated.

### Phase 3: Validation and normalization

When generating the class, two methods will be added:

- `validate(): void` which calls, in that order, the `preValidation` lifecycle hook, the `validate` function using the pointers build in [step 3](#3-generating-validators) and the `postValidation` lifecycle hook
- `normalize(): T` which calls the the `normalize` lifecycle hook

> [!TIP]
> The classes are saved in `src/lib/generated/classes/`.\*

> [!TIP]
> The lifecycle hooks can be found in `src/lib/hooks/`.\*

## 5. Generating Fluent Builders

One feature of the SDK is to expose fluent builders. This feature heavily relies on the builder proxy in `src/lib/builder.ts`. The generic type `Builder<T>` reflects properties of `T` as methods and adds a `build()` method to return the built object. The proxy sets the property value when the corresponding method is called or calls a "building function" when `build()` is called.

The generator iterates over the generated types to:

- Define a "building function" that creates an "instance of the type" (of the class that mimics the type) and validates it.
- Wrap the generic proxy into a specific one. e.g., `export const workflowBuilder = (): Builder<Specification.Workflow> => builder<Specification.Workflow>(buildingFn);`.

The "building function" will call the `validate()` and `normalize()` methods of the class.

> [!TIP]
> The builders are saved in `src/lib/generated/builders/`.\*

## Conclusion

With the tooling in place, we can automatically provide the required features of the SDK:

- Type checking
- Validation
- Normalization
- Typed instances
- Fluent builder
