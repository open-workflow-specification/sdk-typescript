## Contributing to the Open Workflow Specification TypeScript SDK

The SDK is developed and validated on Node.js `22+`, and the local workflow is intended to work on Windows, macOS, and Linux.

### Local setup

```sh
git clone https://github.com/open-workflow-specification/sdk-typescript.git
cd sdk-typescript
npm install
```

### Common commands

```sh
npm run lint
npm run test
npm run build
npm run validate:package
```

- `npm run lint` checks the Oxlint and Oxfmt baselines.
- `npm run test` runs the manual-code typecheck and Vitest.
- `npm run build` creates the distributable package under `dist/`.
- `npm run validate:package` builds the package, runs package-shape validation, and smoke-tests the packed tarball.

### Generated code workflow

The SDK tracks generated files under `src/lib/generated/`. These files are derived from the Open Workflow Specification schema and should not be edited by hand.

Use the following command when the schema or generator logic changes:

```sh
npm run codegen
```

To verify that generated files are up to date, run:

```sh
npm run codegen:check
```

The tooling architecture and generator rationale are documented in [tools/README.md](./tools/README.md).

### Browser examples

The package ships browser examples for both the native ESM build and the standalone UMD bundle. To build the package and open the browser examples locally:

```sh
npm run serve
```

### Gitpod

If you prefer a hosted environment, Gitpod support is still available:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/open-workflow-specification/sdk-typescript)
