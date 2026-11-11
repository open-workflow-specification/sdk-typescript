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
const { Classes, WorkflowValidationError, buildGraph, convertToMermaidCode, validate } = require(${JSON.stringify(sdkEntryPoint)});
const workflow = Classes.Workflow.deserialize(${JSON.stringify(workflowText)}, { validate: false });
const graph = buildGraph(workflow);
const mermaidCode = convertToMermaidCode(workflow);
let validation = null;
try {
  validate('Workflow', workflow);
} catch (error) {
  validation = {
    name: error.name,
    message: error.message,
    isWorkflowValidationError: error instanceof WorkflowValidationError,
  };
}
console.log(
  JSON.stringify({
    workflowName: workflow.document.name,
    graphNodeCount: graph.nodes.length,
    mermaidCodeLength: mermaidCode.length,
    validation,
  }),
);
`;

/**
 * What the child process printed.
 */
type Output = {
  workflowName: string;
  graphNodeCount: number;
  mermaidCodeLength: number;
  validation: { name: string; message: string; isWorkflowValidationError: boolean } | null;
};

/**
 * Describes how the child process ended, with what it wrote to stderr. Each line of it is quoted, so that the stack
 * frames of the child process are not taken for frames of the error that reports them.
 * @param run The child process run
 * @returns The description
 */
const describeRun = (run: SpawnSyncReturns<string>): string =>
  `The child process exited with status ${run.status}, writing to stderr:\n${run.stderr.replace(/^/gm, '| ')}`;

/**
 * Parses what the child process printed.
 * @param run The child process run
 * @returns What each step produced
 * @throws An error describing how the child process ended, if what it printed cannot be parsed, such as when it crashed
 */
const readOutput = (run: SpawnSyncReturns<string>): Output => {
  try {
    return JSON.parse(run.stdout);
  } catch (cause) {
    throw new Error(describeRun(run), { cause });
  }
};

/**
 * Some environments refuse to generate code from strings (`eval`, `new Function`), such as a browser under a
 * Content Security Policy without 'unsafe-eval'. AJV compiles a validator by generating code from strings, so
 * importing the SDK must not compile any: only validating does, the first time a type is validated. Where code
 * generation is refused, validating throws the error that prevented the compilation, unchanged, since it does not
 * mean that the workflow is invalid.
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
    expect(run.status, describeRun(run)).toBe(0);
  });

  it('should deserialize a workflow with validation turned off', () => {
    expect(readOutput(run).workflowName).toBe('set');
  });

  it('should build the graph of the workflow', () => {
    expect(readOutput(run).graphNodeCount).toBeGreaterThan(0);
  });

  it('should write the Mermaid code of the workflow', () => {
    expect(readOutput(run).mermaidCodeLength).toBeGreaterThan(0);
  });

  it('should throw only when validating, with the error that prevents code generation', () => {
    expect(readOutput(run).validation).toStrictEqual({
      name: 'EvalError',
      message: expect.stringContaining('Code generation from strings disallowed'),
      isWorkflowValidationError: false,
    });
  });
});
