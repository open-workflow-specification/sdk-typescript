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

import { spawnSync, SpawnSyncReturns } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/**
 * The root of the repository, from which the child process resolves `tsx`.
 */
const repositoryRoot = fileURLToPath(new URL('../..', import.meta.url));

/**
 * The SDK entry point, required by the child process the way a CommonJS consumer requires the package.
 */
const sdkEntryPoint = fileURLToPath(new URL('../../src/index.ts', import.meta.url));

/**
 * A workflow with a single Set task.
 */
const workflowText = `
document:
  dsl: '1.0.3'
  namespace: test
  name: set
  version: '0.1.0'
do:
  - initialize:
      set:
        foo: bar`;

/**
 * Imports the SDK, deserializes the workflow with validation turned off, builds its graph and writes its
 * Mermaid code, and only then validates it, printing what each step produced as JSON.
 */
const script = `
const { Classes, buildGraph, convertToMermaidCode, validate } = require(${JSON.stringify(sdkEntryPoint)});
const workflow = Classes.Workflow.deserialize(${JSON.stringify(workflowText)}, { validate: false });
const nodeIds = buildGraph(workflow).nodes.map((node) => node.id);
const mermaidCode = convertToMermaidCode(workflow).trim();
let validation = null;
try {
  validate('Workflow', workflow);
} catch (error) {
  validation = { name: error.name, cause: { name: error.cause?.name, message: error.cause?.message } };
}
console.log(JSON.stringify({ workflow: workflow.asPlainObject(), nodeIds, mermaidCode, validation }));
`;

/**
 * What the child process printed.
 */
type Output = {
  workflow: unknown;
  nodeIds: string[];
  mermaidCode: string;
  validation: { name: string; cause: { name: string; message: string } } | null;
};

/**
 * Parses what the child process printed.
 * @param run The child process run
 * @returns What each step produced
 */
const readOutput = (run: SpawnSyncReturns<string>): Output => JSON.parse(run.stdout);

/**
 * Some environments refuse to generate code from strings (`eval`, `new Function`), such as a browser under a
 * Content Security Policy without 'unsafe-eval'. AJV compiles a validator by generating code from strings, so
 * importing the SDK must not compile any: only validating does, the first time a type is validated.
 */
describe('Validation - code generation from strings disallowed', () => {
  let run: SpawnSyncReturns<string>;

  beforeAll(() => {
    run = spawnSync(
      process.execPath,
      ['--disallow-code-generation-from-strings', '--import', 'tsx', '--eval', script],
      { cwd: repositoryRoot, encoding: 'utf8' },
    );
  });

  it('should import the SDK', () => {
    expect(run.status, run.stderr).toBe(0);
  });

  it('should deserialize a workflow with validation turned off', () => {
    expect(readOutput(run).workflow).toStrictEqual({
      document: { dsl: '1.0.3', namespace: 'test', name: 'set', version: '0.1.0' },
      do: [{ initialize: { set: { foo: 'bar' } } }],
    });
  });

  it('should build the graph of the workflow', () => {
    expect(readOutput(run).nodeIds).toStrictEqual(['root-entry-node', 'root-exit-node', '/do/initialize']);
  });

  it('should write the Mermaid code of the workflow', () => {
    expect(readOutput(run).mermaidCode).toBe(
      `flowchart TD
    n0(( ))
    n1((( )))
    n2["initialize"]
    n2 --> n1
    n0 --> n2


classDef hidden width: 1px, height: 1px;`,
    );
  });

  it('should throw only when validating, for want of code generation', () => {
    expect(readOutput(run).validation).toStrictEqual({
      name: 'DslValidationError',
      cause: { name: 'EvalError', message: expect.stringContaining('Code generation from strings disallowed') },
    });
  });
});
