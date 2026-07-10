/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Classes } from '../../src/lib/generated/classes';
import { validate } from '../../src/lib/validation';
import { DslValidationError, SchemaValidationError, WorkflowValidationError } from '../../src/lib/errors';

import { schemaVersion, supportedDslVersions } from '../../package.json';

/**
 * Runs `fn`, expecting it to throw, and returns the thrown value.
 */
const captureError = (fn: () => void): unknown => {
  try {
    fn();
  } catch (error) {
    return error;
  }
  throw new Error('Expected the function to throw, but it did not.');
};

describe('Workflow validation', () => {
  it('should be valid', () => {
    const workflow = new Classes.Workflow({
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
    });
    const test = () => validate('Workflow', workflow);
    expect(test).not.toThrow(Error);
  });

  it('should throw when invalid', () => {
    const workflow = new Classes.Workflow({
      document: {
        dsl: schemaVersion,
        name: 'test',
        version: '1.0.0',
        namespace: 'default',
      },
    });
    const test = () => validate('Workflow', workflow);
    expect(test).toThrow(Error);
    expect(test).toThrow(/'Workflow' is invalid/);
  });

  it('should throw with a DSL version below the minimum supported version', () => {
    const oldVersion = '0.9.0';
    const workflow = new Classes.Workflow({
      document: {
        dsl: oldVersion,
        name: 'test',
        version: '1.0.0',
        namespace: 'default',
      },
    });
    expect(() => workflow.validate()).toThrow(
      `The DSL version of the workflow '${oldVersion}' does not satisfy the DSL version range supported by this SDK '${supportedDslVersions}'.`,
    );
  });

  it('should throw with a DSL version newer than the current schemaVersion', () => {
    const newerVersion = '3.0.0';
    const workflow = new Classes.Workflow({
      document: {
        dsl: newerVersion,
        name: 'test',
        version: '1.0.0',
        namespace: 'default',
      },
    });
    expect(() => workflow.validate()).toThrow(
      `The DSL version of the workflow '${newerVersion}' does not satisfy the DSL version range supported by this SDK '${supportedDslVersions}'.`,
    );
  });

  it('should be valid with an older DSL version than the current schema but still supported', () => {
    const oldVersion = '1.0.0';
    const workflow = new Classes.Workflow({
      document: {
        dsl: oldVersion,
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
    });

    const result = () => validate('Workflow', workflow);
    expect(result).not.toThrow(Error);
  });

  it('should be valid with a pre-release version within the supported range', () => {
    const preReleaseVersion = `${schemaVersion}-alpha`;
    const workflow = new Classes.Workflow({
      document: {
        dsl: preReleaseVersion,
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
    });

    const result = () => validate('Workflow', workflow);
    expect(result).not.toThrow(Error);
  });

  it('should throw with a pre-release version below the minimum supported', () => {
    const preReleaseVersion = '1.0.0-alpha';
    const workflow = new Classes.Workflow({
      document: {
        dsl: preReleaseVersion,
        name: 'test',
        version: '1.0.0',
        namespace: 'default',
      },
    });
    expect(() => workflow.validate()).toThrow(
      `The DSL version of the workflow '${preReleaseVersion}' does not satisfy the DSL version range supported by this SDK '${supportedDslVersions}'.`,
    );
  });

  it('should throw with a pre-release version above the supported range', () => {
    const preReleaseVersion = '2.0.0-alpha';
    const workflow = new Classes.Workflow({
      document: {
        dsl: preReleaseVersion,
        name: 'test',
        version: '1.0.0',
        namespace: 'default',
      },
    });
    expect(() => workflow.validate()).toThrow(
      `The DSL version of the workflow '${preReleaseVersion}' does not satisfy the DSL version range supported by this SDK '${supportedDslVersions}'.`,
    );
  });
});

describe('Workflow validation - recursive lifecycle hooks', () => {
  const document = {
    dsl: schemaVersion,
    name: 'test',
    version: '1.0.0',
    namespace: 'default',
  };

  it('should throw on duplicate top-level task names via validate(Workflow, ...)', () => {
    const workflow = new Classes.Workflow({
      document,
      do: [{ step1: { set: { foo: 'bar' } } }, { step1: { set: { foo: 'baz' } } }],
    });
    const test = () => validate('Workflow', workflow);
    expect(test).toThrow(Error);
    expect(test).toThrow(/'TaskList' is invalid - The following task names are duplicated: 'step1'/);
  });

  it('should throw on duplicate top-level task names via workflow.validate()', () => {
    const workflow = new Classes.Workflow({
      document,
      do: [{ step1: { set: { foo: 'bar' } } }, { step1: { set: { foo: 'baz' } } }],
    });
    expect(() => workflow.validate()).toThrow(
      /'TaskList' is invalid - The following task names are duplicated: 'step1'/,
    );
  });

  it('should throw on duplicate task names nested within a do task', () => {
    const workflow = new Classes.Workflow({
      document,
      do: [
        {
          outer: {
            do: [{ dup: { set: { foo: 'bar' } } }, { dup: { set: { foo: 'baz' } } }],
          },
        },
      ],
    });
    const test = () => validate('Workflow', workflow);
    expect(test).toThrow(Error);
    expect(test).toThrow(/'TaskList' is invalid - The following task names are duplicated: 'dup'/);
  });

  it('should not throw when all task names are unique, including nested', () => {
    const workflow = new Classes.Workflow({
      document,
      do: [
        { step1: { set: { foo: 'bar' } } },
        {
          step2: {
            do: [{ inner1: { set: { foo: 'bar' } } }, { inner2: { set: { foo: 'baz' } } }],
          },
        },
      ],
    });
    expect(() => validate('Workflow', workflow)).not.toThrow();
    expect(() => workflow.validate()).not.toThrow();
  });
});

describe('Workflow validation - WorkflowValidationError', () => {
  const document = {
    dsl: schemaVersion,
    name: 'test',
    version: '1.0.0',
    namespace: 'default',
  };

  it('should throw a DslValidationError locating a top-level duplicate task name', () => {
    const workflow = new Classes.Workflow({
      document,
      do: [{ step1: { set: { foo: 'bar' } } }, { step1: { set: { foo: 'baz' } } }],
    });
    const error = captureError(() => validate('Workflow', workflow));
    expect(error).toBeInstanceOf(WorkflowValidationError);
    expect(error).toBeInstanceOf(DslValidationError);
    expect((error as DslValidationError).path).toBe('/do');
    expect((error as DslValidationError).typeName).toBe('TaskList');
    expect((error as DslValidationError).cause).toBeInstanceOf(Error);
  });

  it('should throw a DslValidationError locating a nested duplicate task name', () => {
    const workflow = new Classes.Workflow({
      document,
      do: [
        {
          outer: {
            do: [{ dup: { set: { foo: 'bar' } } }, { dup: { set: { foo: 'baz' } } }],
          },
        },
      ],
    });
    const error = captureError(() => validate('Workflow', workflow));
    expect(error).toBeInstanceOf(DslValidationError);
    expect((error as DslValidationError).path).toBe('/do/0/outer/do');
    expect((error as DslValidationError).typeName).toBe('TaskList');
  });

  it('should throw a DslValidationError at the root for an unsupported DSL version', () => {
    const workflow = new Classes.Workflow({
      document: { ...document, dsl: '0.9.0' },
    });
    const error = captureError(() => validate('Workflow', workflow));
    expect(error).toBeInstanceOf(DslValidationError);
    expect((error as DslValidationError).path).toBe('');
    expect((error as DslValidationError).typeName).toBe('Workflow');
  });

  it('should throw a SchemaValidationError carrying the AJV errors for a structural failure', () => {
    const workflow = new Classes.Workflow({ document });
    const error = captureError(() => validate('Workflow', workflow));
    expect(error).toBeInstanceOf(WorkflowValidationError);
    expect(error).toBeInstanceOf(SchemaValidationError);
    expect((error as SchemaValidationError).typeName).toBe('Workflow');
    expect(Array.isArray((error as SchemaValidationError).schemaErrors)).toBe(true);
    expect((error as SchemaValidationError).schemaErrors.length).toBeGreaterThan(0);
  });
});
