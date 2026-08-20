/*
 * Copyright 2021-Present The Open Workflow Specification Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import * as yaml from 'js-yaml';

import { Specification } from '../../src/lib/generated/definitions';
import { Classes } from '../../src/lib/generated/classes';
import { DslValidationError, SchemaValidationError, WorkflowValidationError } from '../../src/lib/errors';
import { DeserializationOptions, SerializationOptions } from '../../src/lib/serialization';

import { schemaVersion } from '../../package.json';

/**
 * The smallest valid workflow.
 */
const minimalWorkflow: Specification.Workflow = {
  document: {
    dsl: schemaVersion,
    name: 'test',
    version: '1.0.0',
    namespace: 'default',
  },
  do: [
    {
      step1: {
        set: {
          foo: 'bar',
        },
      },
    },
  ],
};

/**
 * A valid workflow whose summary is longer than the eighty character line width js-yaml folds at,
 * used to exercise the YAML output options.
 */
const summary =
  'A workflow whose summary is deliberately longer than the eighty character line width used by js-yaml, so that folded block scalars are exercised.';
const verboseWorkflow: Specification.Workflow = {
  ...minimalWorkflow,
  document: { ...minimalWorkflow.document, summary },
};

/**
 * A workflow missing the required 'do' property, which fails JSON schema validation.
 */
const invalidWorkflow = {
  document: {
    dsl: schemaVersion,
    name: 'test',
    version: '1.0.0',
    namespace: 'default',
  },
} as unknown as Specification.Workflow;

/**
 * A workflow declaring a DSL version this SDK does not support. Rejected by the Workflow lifecycle
 * hook rather than by the schema, so it fails as a DslValidationError rather than a
 * SchemaValidationError.
 */
const unsupportedDslWorkflow: Specification.Workflow = {
  ...minimalWorkflow,
  document: { ...minimalWorkflow.document, dsl: '99.0.0' },
};

/**
 * A workflow whose tasks share a name. Rejected by the TaskList lifecycle hook, which the validation
 * walk reaches by recursing into the workflow's descendants rather than at its root.
 */
const duplicateTaskNamesWorkflow: Specification.Workflow = {
  ...minimalWorkflow,
  do: [{ step1: { set: { foo: 'bar' } } }, { step1: { set: { foo: 'baz' } } }],
};

/**
 * A half-written document of the kind an editor holds: a partial header and no tasks at all. Invalid
 * against the schema, and the reason `validate: false` exists.
 */
const wipDraft = { document: { name: 'work-in-progress' } } as unknown as Partial<Specification.Workflow>;

/**
 * A work in progress document that has reached an empty task list, the shape that used to hydrate
 * into a task list holding one empty array.
 */
const wipEmptyTaskList = {
  document: { dsl: schemaVersion, name: 'work-in-progress' },
  do: [],
} as unknown as Partial<Specification.Workflow>;

/**
 * A work in progress document whose task has been named but not yet given a body.
 */
const wipEmptyTask = {
  document: { dsl: schemaVersion, name: 'work-in-progress' },
  do: [{ step1: {} }],
} as unknown as Partial<Specification.Workflow>;

describe('Workflow serialization - options payload', () => {
  it('should default to YAML, normalized and validated, when no options are passed', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expect(workflow.serialize({})).toBe(workflow.serialize());
    expect(workflow.serialize({ format: 'yaml', normalize: true, validate: true })).toBe(workflow.serialize());
  });

  it('should honour the format option', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expect(workflow.serialize({ format: 'json' })).toBe(JSON.stringify(minimalWorkflow));
    expect(yaml.load(workflow.serialize({ format: 'yaml' }))).toStrictEqual(minimalWorkflow);
  });

  it('should honour the normalize option', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expect(yaml.load(workflow.serialize({ normalize: false }))).toStrictEqual(minimalWorkflow);
    expect(workflow.serialize({ format: 'json', normalize: false })).toBe(JSON.stringify(minimalWorkflow));
  });

  it('should accept the options payload on the static method', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expect(Classes.Workflow.serialize(workflow, {})).toBe(Classes.Workflow.serialize(workflow));
    expect(Classes.Workflow.serialize(minimalWorkflow, { format: 'json' })).toBe(JSON.stringify(minimalWorkflow));
  });
});

/**
 * The compatibility guard for the deprecated positional signature: every call that compiled before the
 * options payload existed must keep producing exactly what it produced then.
 */
describe('Workflow serialization - legacy positional signature', () => {
  const cases: Array<{
    name: string;
    legacy: (workflow: InstanceType<typeof Classes.Workflow>) => string;
    options: (workflow: InstanceType<typeof Classes.Workflow>) => string;
  }> = [
    {
      name: 'instance, no argument',
      legacy: (workflow) => workflow.serialize(),
      options: (workflow) => workflow.serialize({}),
    },
    {
      name: "instance, 'yaml'",
      legacy: (workflow) => workflow.serialize('yaml'),
      options: (workflow) => workflow.serialize({ format: 'yaml' }),
    },
    {
      name: "instance, 'json'",
      legacy: (workflow) => workflow.serialize('json'),
      options: (workflow) => workflow.serialize({ format: 'json' }),
    },
    {
      name: "instance, 'yaml' without normalizing",
      legacy: (workflow) => workflow.serialize('yaml', false),
      options: (workflow) => workflow.serialize({ format: 'yaml', normalize: false }),
    },
    {
      name: "instance, 'json' without normalizing",
      legacy: (workflow) => workflow.serialize('json', false),
      options: (workflow) => workflow.serialize({ format: 'json', normalize: false }),
    },
    {
      name: 'static, no argument',
      legacy: (workflow) => Classes.Workflow.serialize(workflow),
      options: (workflow) => Classes.Workflow.serialize(workflow, {}),
    },
    {
      name: "static, 'yaml'",
      legacy: (workflow) => Classes.Workflow.serialize(workflow, 'yaml'),
      options: (workflow) => Classes.Workflow.serialize(workflow, { format: 'yaml' }),
    },
    {
      name: "static, 'json'",
      legacy: (workflow) => Classes.Workflow.serialize(workflow, 'json'),
      options: (workflow) => Classes.Workflow.serialize(workflow, { format: 'json' }),
    },
    {
      name: "static, 'yaml' without normalizing",
      legacy: (workflow) => Classes.Workflow.serialize(workflow, 'yaml', false),
      options: (workflow) => Classes.Workflow.serialize(workflow, { format: 'yaml', normalize: false }),
    },
    {
      name: "static, 'json' without normalizing",
      legacy: (workflow) => Classes.Workflow.serialize(workflow, 'json', false),
      options: (workflow) => Classes.Workflow.serialize(workflow, { format: 'json', normalize: false }),
    },
  ];

  for (const { name, legacy, options } of cases) {
    it(`should produce the same output for the options payload and the positional form - ${name}`, () => {
      const workflow = new Classes.Workflow(verboseWorkflow);
      expect(legacy(workflow)).toBe(options(workflow));
    });
  }

  it('should keep validating by default through the positional form', () => {
    const workflow = new Classes.Workflow(invalidWorkflow);
    expect(() => workflow.serialize('yaml')).toThrow(SchemaValidationError);
    expect(() => Classes.Workflow.serialize(workflow, 'json', false)).toThrow(SchemaValidationError);
  });

  /**
   * The positional `format` was optional with a default before the overloads existed, so a caller
   * forwarding a possibly undefined format compiled. Declaring it required on the deprecated overload
   * would break those call sites at compile time, which the literal-argument cases above cannot catch.
   */
  it('should still accept an explicitly undefined format', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    const format: 'yaml' | 'json' | undefined = undefined;
    expect(workflow.serialize(format)).toBe(workflow.serialize());
    expect(Classes.Workflow.serialize(workflow, format)).toBe(workflow.serialize());
    expect(workflow.serialize(format, false)).toBe(workflow.serialize({ normalize: false }));
  });
});

/**
 * The options are a public payload, and the UMD bundle is consumed as untyped JavaScript, so a null
 * field has to mean the same thing everywhere rather than being read as "off" on one entry point and
 * "unset" on the other.
 */
describe('Workflow (de)serialization - null and missing options', () => {
  it('should treat a null option field as unset when serializing', () => {
    const workflow = new Classes.Workflow(invalidWorkflow);
    const nulled = { format: null, normalize: null, validate: null } as unknown as SerializationOptions;
    expect(() => workflow.serialize(nulled)).toThrow(SchemaValidationError);
  });

  it('should treat a null option field as unset when deserializing', () => {
    const text = Classes.Workflow.serialize(invalidWorkflow, { validate: false });
    const nulled = { validate: null } as unknown as DeserializationOptions;
    expect(() => Classes.Workflow.deserialize(text, nulled)).toThrow(SchemaValidationError);
  });

  it('should accept a null options payload', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    const text = Classes.Workflow.serialize(minimalWorkflow);
    expect(workflow.serialize(null as unknown as SerializationOptions)).toBe(workflow.serialize());
    expect(Classes.Workflow.deserialize(text, null as unknown as DeserializationOptions).asPlainObject()).toStrictEqual(
      minimalWorkflow,
    );
  });
});

/**
 * Hydration silently ignores anything that is not a mapping, so without validation to reject it first
 * a scalar or a sequence would deserialize into a blank Workflow and lose the caller's document.
 */
describe('Workflow deserialization - non-mapping documents', () => {
  const documents: Array<{ name: string; text: string }> = [
    { name: 'a scalar string', text: 'just a string' },
    { name: 'a number', text: '42' },
    { name: 'a sequence', text: '- a\n- b' },
    { name: 'an explicit null', text: 'null' },
  ];

  for (const { name, text } of documents) {
    it(`should refuse to deserialize ${name}, even with validation off`, () => {
      expect(() => Classes.Workflow.deserialize(text, { validate: false })).toThrow(
        /does not describe a workflow: expected a mapping/,
      );
    });

    it(`should still report ${name} as a validation failure by default`, () => {
      expect(() => Classes.Workflow.deserialize(text)).toThrow(WorkflowValidationError);
    });
  }
});

describe('Workflow serialization - validation opt-out', () => {
  it('should serialize an invalid workflow to YAML without throwing', () => {
    const workflow = new Classes.Workflow(invalidWorkflow);
    const serialized = workflow.serialize({ validate: false });
    expect(yaml.load(serialized)).toStrictEqual(invalidWorkflow);
  });

  it('should serialize an invalid workflow to JSON without throwing', () => {
    const workflow = new Classes.Workflow(invalidWorkflow);
    expect(workflow.serialize({ format: 'json', validate: false })).toBe(JSON.stringify(invalidWorkflow));
  });

  it('should serialize an invalid workflow without throwing from the static method', () => {
    expect(yaml.load(Classes.Workflow.serialize(invalidWorkflow, { validate: false }))).toStrictEqual(invalidWorkflow);
  });

  it('should bypass the DSL version lifecycle hook, not only the schema', () => {
    const workflow = new Classes.Workflow(unsupportedDslWorkflow);
    expect(() => workflow.serialize()).toThrow(DslValidationError);
    expect(yaml.load(workflow.serialize({ validate: false }))).toStrictEqual(unsupportedDslWorkflow);
  });

  it('should bypass the lifecycle hooks of nested types too', () => {
    const workflow = new Classes.Workflow(duplicateTaskNamesWorkflow);
    expect(() => workflow.serialize()).toThrow(DslValidationError);
    expect(yaml.load(workflow.serialize({ validate: false }))).toStrictEqual(duplicateTaskNamesWorkflow);
  });

  it('should still validate when validate is omitted or explicitly true', () => {
    const workflow = new Classes.Workflow(invalidWorkflow);
    expect(() => workflow.serialize({})).toThrow(SchemaValidationError);
    expect(() => workflow.serialize({ validate: true })).toThrow(SchemaValidationError);
    expect(() => Classes.Workflow.serialize(invalidWorkflow, { validate: true })).toThrow(SchemaValidationError);
  });

  it('should leave normalization on when validation is turned off', () => {
    const workflow = new Classes.Workflow(invalidWorkflow);
    expect(workflow.serialize({ validate: false })).toBe(workflow.serialize({ validate: false, normalize: true }));
  });
});

describe('Workflow deserialization - validation opt-out', () => {
  it('should deserialize an invalid document without throwing', () => {
    const text = Classes.Workflow.serialize(invalidWorkflow, { validate: false });
    const workflow = Classes.Workflow.deserialize(text, { validate: false });
    expect(workflow).toBeInstanceOf(Classes.Workflow);
    expect(workflow.asPlainObject()).toStrictEqual(invalidWorkflow);
  });

  it('should bypass the DSL version lifecycle hook', () => {
    const text = Classes.Workflow.serialize(unsupportedDslWorkflow, { validate: false });
    expect(() => Classes.Workflow.deserialize(text)).toThrow(DslValidationError);
    expect(Classes.Workflow.deserialize(text, { validate: false }).asPlainObject()).toStrictEqual(
      unsupportedDslWorkflow,
    );
  });

  it('should bypass the lifecycle hooks of nested types too', () => {
    const text = Classes.Workflow.serialize(duplicateTaskNamesWorkflow, { validate: false });
    expect(() => Classes.Workflow.deserialize(text)).toThrow(DslValidationError);
    expect(Classes.Workflow.deserialize(text, { validate: false }).asPlainObject()).toStrictEqual(
      duplicateTaskNamesWorkflow,
    );
  });

  it('should still validate when validate is omitted or explicitly true', () => {
    const text = Classes.Workflow.serialize(invalidWorkflow, { validate: false });
    expect(() => Classes.Workflow.deserialize(text)).toThrow(SchemaValidationError);
    expect(() => Classes.Workflow.deserialize(text, {})).toThrow(SchemaValidationError);
    expect(() => Classes.Workflow.deserialize(text, { validate: true })).toThrow(SchemaValidationError);
  });

  it('should keep deserializing a valid document unchanged', () => {
    const text = Classes.Workflow.serialize(minimalWorkflow);
    expect(Classes.Workflow.deserialize(text, { validate: false }).asPlainObject()).toStrictEqual(minimalWorkflow);
  });
});

/**
 * The save then reload cycle of a work in progress document, which is what the whole option exists
 * for: a draft the editor can persist but never reopen is of no use to it.
 */
describe('Workflow (de)serialization - work in progress round-trip', () => {
  const drafts: Array<{ name: string; draft: Partial<Specification.Workflow> }> = [
    { name: 'a partial header and no tasks', draft: wipDraft },
    { name: 'an empty task list', draft: wipEmptyTaskList },
    { name: 'a named task with no body', draft: wipEmptyTask },
  ];

  for (const { name, draft } of drafts) {
    it(`should survive a save and reload cycle - ${name}`, () => {
      const saved = Classes.Workflow.serialize(draft, { validate: false });
      const reloaded = Classes.Workflow.deserialize(saved, { validate: false });
      expect(reloaded).toBeInstanceOf(Classes.Workflow);
      expect(reloaded.asPlainObject()).toStrictEqual(draft);
    });

    it(`should re-save a reloaded draft byte for byte - ${name}`, () => {
      const saved = Classes.Workflow.serialize(draft, { validate: false });
      const reloaded = Classes.Workflow.deserialize(saved, { validate: false });
      expect(reloaded.serialize({ validate: false })).toBe(saved);
    });
  }

  it('should reject a draft whose shape cannot be hydrated, even with validation off', () => {
    const impossible = { document: { name: 'wip' }, do: {} } as unknown as Partial<Specification.Workflow>;
    expect(() => Classes.Workflow.serialize(impossible, { validate: false })).toThrow(
      'The provided model should be an array',
    );
  });
});

describe('Workflow serialization - YAML output options', () => {
  it('should produce byte-identical output when no YAML options are passed', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expect(workflow.serialize({ yaml: {} })).toBe(workflow.serialize());
    expect(workflow.serialize()).toBe(
      `document:
  dsl: ${schemaVersion}
  name: test
  version: 1.0.0
  namespace: default
do:
  - step1:
      set:
        foo: bar
`,
    );
  });

  it('should fold long scalars at the default line width', () => {
    const serialized = new Classes.Workflow(verboseWorkflow).serialize();
    expect(serialized).toMatch(/summary: >-/);
    expect((yaml.load(serialized) as Specification.Workflow).document.summary).toBe(summary);
  });

  it('should keep long scalars on a single line with an unlimited line width', () => {
    const serialized = new Classes.Workflow(verboseWorkflow).serialize({ yaml: { lineWidth: -1 } });
    expect(serialized).not.toMatch(/>-/);
    expect(serialized).toContain(`summary: ${summary}`);
    expect(yaml.load(serialized)).toStrictEqual(verboseWorkflow);
  });

  it('should honour the indentation width', () => {
    const serialized = new Classes.Workflow(minimalWorkflow).serialize({ yaml: { indent: 4 } });
    expect(serialized).toContain(`document:\n    dsl: ${schemaVersion}`);
    expect(yaml.load(serialized)).toStrictEqual(minimalWorkflow);
  });

  /**
   * js-yaml v5 no longer clamps the indent, so an indent of 0 emits nested mappings at column 0,
   * which parses back as a flat document, and a negative one raises a RangeError from inside the
   * dumper. Neither can be allowed to reach it.
   */
  it('should raise an indentation width below one to one', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    for (const indent of [0, -2]) {
      const serialized = workflow.serialize({ yaml: { indent } });
      expect(serialized).toBe(workflow.serialize({ yaml: { indent: 1 } }));
      expect(yaml.load(serialized)).toStrictEqual(minimalWorkflow);
    }
  });

  it('should sort mapping keys on request while preserving sequence order', () => {
    const serialized = new Classes.Workflow(duplicateTaskNamesWorkflow).serialize({
      validate: false,
      yaml: { sortKeys: true },
    });
    expect(serialized.indexOf('do:')).toBeLessThan(serialized.indexOf('document:'));
    expect(yaml.load(serialized)).toStrictEqual(duplicateTaskNamesWorkflow);
  });

  it('should switch to flow style on request', () => {
    const serialized = new Classes.Workflow(minimalWorkflow).serialize({ yaml: { flowLevel: 0 } });
    expect(serialized.startsWith('{')).toBe(true);
    expect(yaml.load(serialized)).toStrictEqual(minimalWorkflow);
  });

  it('should ignore the YAML options when the format is json', () => {
    const workflow = new Classes.Workflow(verboseWorkflow);
    expect(workflow.serialize({ format: 'json', yaml: { indent: 4, lineWidth: -1, flowLevel: 0 } })).toBe(
      workflow.serialize({ format: 'json' }),
    );
  });

  /**
   * js-yaml emits `&ref_0`/`*ref_0` anchors for subtrees that are the same object, which `noRefs`
   * exists to suppress. `asPlainObject()` runs the document through JSON first and so destroys
   * reference identity before the dumper ever sees it, which is why `noRefs` is not offered. If this
   * test fails, that conversion has changed and the option is worth adding back.
   */
  it('should never emit anchors, which is what makes a noRefs option unnecessary', () => {
    const shared = { foo: 'bar' };
    const workflow = new Classes.Workflow({
      ...minimalWorkflow,
      do: [{ step1: { set: shared } }, { step2: { set: shared } }],
    });
    expect(workflow.serialize()).not.toMatch(/[&*]ref_/);
  });
});
