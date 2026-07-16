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
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Classes } from '../../src/lib/generated/classes';
import { validate } from '../../src/lib/validation';
import { DslValidationError, WorkflowValidationError } from '../../src/lib/errors';

import { schemaVersion } from '../../package.json';

describe('TaskList validation', () => {
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

  it('should throw on duplicate task names in a task list', () => {
    const taskList = new Classes.TaskList([
      {
        step1: {
          set: {
            foo: 'bar',
          },
        },
      },
      {
        step1: {
          set: {
            foo: 'baz',
          },
        },
      },
    ]);
    const test = () => validate('TaskList', taskList);
    expect(test).toThrow(Error);
    expect(test).toThrow(/'TaskList' is invalid - The following task names are duplicated: 'step1'/);
  });

  it('should throw a DslValidationError rooted at the task list on duplicate task names', () => {
    const taskList = new Classes.TaskList([{ step1: { set: { foo: 'bar' } } }, { step1: { set: { foo: 'baz' } } }]);
    let error: unknown;
    try {
      validate('TaskList', taskList);
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(WorkflowValidationError);
    expect(error).toBeInstanceOf(DslValidationError);
    expect((error as DslValidationError).path).toBe('');
    expect((error as DslValidationError).typeName).toBe('TaskList');
  });
});
