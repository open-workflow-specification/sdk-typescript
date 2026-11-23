# Migration Guide

## Migrating from 1.0.x to 1.1.0

SDK `1.1.0` targets version [1.1.0](https://github.com/open-workflow-specification/specification/tree/v1.1.0) of the Open Workflow Specification. This guide covers what changes for code that uses the SDK. For the full list of specification changes, see the specification's [upgrade guide](https://github.com/open-workflow-specification/specification/blob/v1.1.0/docs/upgrade-to-1.1.0.md).

### DSL version support

The SDK accepts workflows whose `document.dsl` is in the range `>=1.0.0-0 <=1.1.0`. This includes pre-releases such as `1.1.0-rc1`. Workflows with a DSL version outside this range, for example `1.1.1`, fail validation with a `DslValidationError`.

Every workflow is validated against the **1.1.0** schema, whatever its `document.dsl` value. Most `1.0.x` workflows stay valid, but workflows that use any of the fields changed below must be updated, even if they still declare `dsl: '1.0.x'`. To use the new 1.1.0 features, set `document.dsl` to `'1.1.0'`.

### Breaking changes

#### `run.script.arguments` is a key/value map

In the `1.0.2` and `1.0.3` pre-releases, script arguments were a list. The specification has reverted them to a map, as in `1.0.1`.

```yaml
# 1.0.3
run:
  script:
    language: js
    code: ...
    arguments:
      - Foo
      - Bar

# 1.1.0
run:
  script:
    language: js
    code: ...
    arguments:
      first: Foo
      second: Bar
```

> [!IMPORTANT]
> Only validation detects this change, not the TypeScript compiler. The generated `Script` type does not currently model the properties shared by inline and external scripts (`language`, `stdin`, `arguments`, `environment`), so the old list form still compiles and fails only when the workflow is validated.

`run.shell.arguments` is unchanged and remains a list of strings.

#### Error filter `details` is renamed to `detail`

`catch.errors.with.details` is now `catch.errors.with.detail`, which matches RFC 7807. The `ErrorFilter` type now has `detail` instead of `details`.

```yaml
catch:
  errors:
    with:
      detail: Connection refused # was: details
```

> [!WARNING]
> Error filters allow additional properties, so a leftover `details` does **not** fail validation. It is no longer a recognized filter, so the filter silently stops matching on it. Search your workflows for `details` and rename it.

#### Inline OAuth2 and OIDC authentication require `authority` and `grant`

In `OAuth2AuthenticationData` and `OpenIdConnectAuthenticationProperties`, `authority` and `grant` are now required. Inline OAuth2 or OIDC definitions without them fail type checking and validation.

```yaml
authentication:
  oauth2:
    authority: https://auth.example.com
    grant: client_credentials
    client:
      id: my-client
```

#### MCP client `description` is replaced by `version`

On `call: mcp`, the `client` object now requires `name` and `version`. The former `description` property is removed.

```yaml
with:
  client:
    name: my-client
    version: 1.0.0 # was: description
```

#### `for.in` accepts an inline array

`ForTaskConfiguration.in` changes from `string` to `ForIn` (`string | ForInInlineArray`). Writing a string still works. Code that **reads** `in` and assumes it is a string must now handle an array:

```typescript
const source = task.for.in;
if (typeof source === 'string') {
  // runtime expression
} else {
  // inline array
}
```

#### URI validation

URI templates and literal URIs are now validated as RFC 3986 URI references:

- Relative references, such as `/api/pets`, are now valid.
- Values containing whitespace are now invalid.
- A literal URI must not contain `{` or `}`, and a URI template must contain at least one `{...}` expression.
- Neither may start with `${` (use a runtime expression instead).

### New features

These additions are backward compatible:

| Feature | SDK surface |
| :------ | :---------- |
| Top-level `evaluate` (`language`, `mode`) | `Workflow.evaluate`, `Evaluate` type, class and builder |
| `schedule.read` (`data`, `envelope`, `raw`) | `Schedule.read`. Requires `schedule.on` |
| `for.in` inline array | `ForIn` and `ForInInlineArray` types, classes and builders |
| `run.shell.directory` | `Shell.directory` |
| `try.catch.then` | `TryTaskCatch.then` |
| `emit.event.with.source` is optional | `EmitEventWith.source` is now optional. Runtimes generate it when absent |

### Graphs and Mermaid diagrams

`buildGraph`, `buildFlatGraph` and the Mermaid converter support `try.catch.then`. When it is set, the catch, or the exit of the `catch.do` tasks, leads to the `catch.then` target. The successful try path leads to the try task's own `then`, or to the next task. Graphs of try tasks without `catch.then` are unchanged.
