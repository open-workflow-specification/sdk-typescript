/**
 * Smoke-tests the packed npm tarball the same way downstream consumers use it.
 *
 * The script extracts the most recent tarball, installs it into a temporary
 * throwaway consumer layout, and verifies CommonJS, ESM, browser UMD, and
 * TypeScript type-consumption scenarios before cleaning everything up again.
 */
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gunzipSync as unzip } from 'node:zlib';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const tempDir = path.resolve(repoRoot, '.pack-validation');
const packageExtractDir = path.resolve(tempDir, 'extracted');
const extractedPackageDir = path.resolve(packageExtractDir, 'package');
const consumerDir = path.resolve(tempDir, 'consumer');
const consumerNodeModulesDir = path.resolve(consumerDir, 'node_modules');
const consumerPackageDir = path.resolve(consumerNodeModulesDir, '@openworkflowspec', 'sdk');

/**
 * Reads a fixed-width string field from a tar header and trims trailing null
 * bytes so the header data can be interpreted safely.
 */
const readTarString = (buffer, start, length) =>
  trimNulls(buffer.subarray(start, start + length).toString('utf8')).trim();

/**
 * Tar headers are null-padded; this removes the first null terminator and
 * anything after it so later parsing sees the original value only.
 */
const trimNulls = (value) => {
  const nullIndex = value.indexOf('\0');
  return nullIndex === -1 ? value : value.slice(0, nullIndex);
};

/**
 * Parses the octal file-size field stored in a tar header.
 */
const parseTarSize = (buffer) => {
  const sizeValue = readTarString(buffer, 124, 12);
  return sizeValue ? Number.parseInt(sizeValue, 8) : 0;
};

/**
 * Parses PAX extended headers so long file names and overridden paths are
 * preserved during manual extraction.
 */
const parsePaxHeader = (buffer) => {
  const metadata = {};
  let offset = 0;

  while (offset < buffer.length) {
    const spaceIndex = buffer.indexOf(0x20, offset);
    if (spaceIndex === -1) {
      break;
    }

    const recordLength = Number.parseInt(buffer.subarray(offset, spaceIndex).toString('utf8'), 10);
    if (!Number.isFinite(recordLength) || recordLength <= 0) {
      break;
    }

    const record = buffer.subarray(offset + (spaceIndex - offset) + 1, offset + recordLength - 1).toString('utf8');
    const separatorIndex = record.indexOf('=');
    if (separatorIndex !== -1) {
      metadata[record.slice(0, separatorIndex)] = record.slice(separatorIndex + 1);
    }

    offset += recordLength;
  }

  return metadata;
};

/**
 * Extracts the gzipped tarball without relying on external tooling and guards
 * against path traversal while materializing entries on disk.
 */
const extractTarball = (archivePath, destinationDir) => {
  const archive = unzip(readFileSync(archivePath));
  let offset = 0;
  let nextPathOverride;

  while (offset + 512 <= archive.length) {
    const header = archive.subarray(offset, offset + 512);
    offset += 512;

    if (header.every((byte) => byte === 0)) {
      break;
    }

    const size = parseTarSize(header);
    const typeFlag = readTarString(header, 156, 1) || '0';
    const name = readTarString(header, 0, 100);
    const prefix = readTarString(header, 345, 155);
    const body = archive.subarray(offset, offset + size);
    const defaultPath = [prefix, name].filter(Boolean).join('/');

    if (typeFlag === 'x') {
      const paxHeaders = parsePaxHeader(body);
      nextPathOverride = paxHeaders.path;
    } else if (typeFlag === 'L') {
      nextPathOverride = trimNulls(body.toString('utf8'));
    } else {
      const entryPath = nextPathOverride ?? defaultPath;
      nextPathOverride = undefined;

      if (!entryPath) {
        throw new Error('Encountered a tar entry without a path.');
      }

      const destinationPath = path.resolve(destinationDir, entryPath);
      if (!destinationPath.startsWith(destinationDir)) {
        throw new Error(`Tarball entry '${entryPath}' would escape the extraction directory.`);
      }

      if (typeFlag === '5') {
        mkdirSync(destinationPath, { recursive: true });
      } else if (typeFlag === '0' || typeFlag === '') {
        mkdirSync(path.dirname(destinationPath), { recursive: true });
        writeFileSync(destinationPath, body);
      }
    }

    offset += Math.ceil(size / 512) * 512;
  }
};

/**
 * Type-checks the temporary consumer project with the native `tsc` (`--noEmit`)
 * to verify the published declaration files work in a realistic NodeNext setup.
 *
 * TypeScript 7.0 dropped the programmatic compiler API, so this shells out to the
 * `tsc` binary installed in the workspace instead of using `ts.createProgram`.
 */
const verifyTypeSmoke = (tsconfigPath) => {
  try {
    execSync(`npx --no-install tsc --noEmit --project "${tsconfigPath}"`, {
      cwd: consumerDir,
      stdio: 'inherit',
    });
  } catch {
    throw new Error(`Type smoke-test failed: tsc reported errors for '${tsconfigPath}'.`);
  }
};

/**
 * Executes the published browser bundle in a sandboxed VM and checks the UMD
 * global exposes the expected runtime surface.
 */
const verifyBrowserGlobalSmoke = (packageDir) => {
  const packageJson = JSON.parse(readFileSync(path.resolve(packageDir, 'package.json'), 'utf8'));
  if (typeof packageJson.browser !== 'string' || packageJson.browser.length === 0) {
    throw new Error('Expected the packed package.json to expose a browser bundle.');
  }

  const browserEntryPath = path.resolve(packageDir, packageJson.browser);
  const browserBundle = readFileSync(browserEntryPath, 'utf8');
  const browserGlobals = {
    console,
    setTimeout,
    clearTimeout,
  };

  browserGlobals.globalThis = browserGlobals;
  browserGlobals.self = browserGlobals;
  browserGlobals.window = browserGlobals;

  vm.runInNewContext(browserBundle, browserGlobals, {
    filename: browserEntryPath,
  });

  const sdk = browserGlobals.serverWorkflowSdk;
  if (typeof sdk?.Classes?.Workflow !== 'function') {
    throw new Error('Expected Classes.Workflow to be available from the browser UMD bundle.');
  }
  if (typeof sdk?.workflowBuilder !== 'function') {
    throw new Error('Expected workflowBuilder to be available from the browser UMD bundle.');
  }
};

const tarballName = readdirSync(repoRoot)
  .filter((fileName) => fileName.endsWith('.tgz'))
  .sort(
    (left, right) => statSync(path.resolve(repoRoot, right)).mtimeMs - statSync(path.resolve(repoRoot, left)).mtimeMs,
  )
  .at(0);

if (!tarballName) {
  throw new Error('Unable to find a packed tarball in the repository root. Run `npm run pack:dist` first.');
}

const tarballPath = path.resolve(repoRoot, tarballName);

try {
  rmSync(tempDir, { force: true, recursive: true });
  mkdirSync(packageExtractDir, { recursive: true });
  mkdirSync(consumerNodeModulesDir, { recursive: true });
  mkdirSync(path.dirname(consumerPackageDir), { recursive: true });

  extractTarball(tarballPath, packageExtractDir);
  cpSync(extractedPackageDir, consumerPackageDir, { recursive: true });

  writeFileSync(
    path.resolve(consumerDir, 'package.json'),
    `${JSON.stringify({ name: 'sdk-pack-smoke', private: true, type: 'module' }, null, 2)}\n`,
  );

  writeFileSync(
    path.resolve(consumerDir, 'smoke-test.cjs'),
    `const sdk = require('@openworkflowspec/sdk');
if (typeof sdk.Classes?.Workflow !== 'function') {
  throw new Error('Expected Classes.Workflow to be available from the CommonJS entrypoint.');
}
if (typeof sdk.workflowBuilder !== 'function') {
  throw new Error('Expected workflowBuilder to be available from the CommonJS entrypoint.');
}
`,
  );

  writeFileSync(
    path.resolve(consumerDir, 'smoke-test.mjs'),
    `import { Classes, workflowBuilder } from '@openworkflowspec/sdk';
if (typeof Classes?.Workflow !== 'function') {
  throw new Error('Expected Classes.Workflow to be available from the ESM entrypoint.');
}
if (typeof workflowBuilder !== 'function') {
  throw new Error('Expected workflowBuilder to be available from the ESM entrypoint.');
}
`,
  );

  writeFileSync(
    path.resolve(consumerDir, 'smoke-types.ts'),
    `import { Classes, type Specification, workflowBuilder } from '@openworkflowspec/sdk';

const workflow: Specification.Workflow = {
  document: {
    dsl: '1.0.3',
    name: 'pack-smoke',
    namespace: 'test',
    version: '1.0.0',
  },
  do: [],
};

const instance = new Classes.Workflow(workflow);
workflowBuilder(workflow).build();
instance.validate();
`,
  );

  writeFileSync(
    path.resolve(consumerDir, 'tsconfig.json'),
    `${JSON.stringify(
      {
        compilerOptions: {
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          noEmit: true,
          strict: true,
          target: 'ES2022',
        },
        include: ['smoke-types.ts'],
      },
      null,
      2,
    )}\n`,
  );

  const consumerRequire = createRequire(path.resolve(consumerDir, 'package.json'));
  consumerRequire(path.resolve(consumerDir, 'smoke-test.cjs'));
  await import(pathToFileURL(path.resolve(consumerDir, 'smoke-test.mjs')).href);
  verifyTypeSmoke(path.resolve(consumerDir, 'tsconfig.json'));
  verifyBrowserGlobalSmoke(consumerPackageDir);
} finally {
  rmSync(tarballPath, { force: true });
  rmSync(tempDir, { force: true, recursive: true });
}
