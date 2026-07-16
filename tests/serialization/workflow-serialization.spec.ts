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

import { Specification } from '../../src/lib/generated/definitions';
import { Classes } from '../../src/lib/generated/classes';

import { schemaVersion } from '../../package.json';
import { documentBuilder, setTaskBuilder, taskListBuilder, workflowBuilder } from '../../src';

describe('Workflow (de)serialization', () => {
  it('should deserialize JSON', () => {
    const data: Specification.Workflow = {
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
    const dataJson = JSON.stringify(data);
    const workflow = Classes.Workflow.deserialize(dataJson);
    expect(workflow).toBeInstanceOf(Classes.Workflow);
  });

  it('should serialize as JSON from static method', () => {
    const data: Specification.Workflow = {
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
    const workflow = new Classes.Workflow(data);
    const expected = JSON.stringify(data);
    const serialized = Classes.Workflow.serialize(workflow, 'json');
    expect(serialized).toEqual(expected);
  });

  it('should serialize as JSON from instance method', () => {
    const data: Specification.Workflow = {
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
    const workflow = new Classes.Workflow(data);
    const expected = JSON.stringify(data);
    const serialized = workflow.serialize('json');
    expect(serialized).toEqual(expected);
  });

  it('should serialize as JSON from from static method from fluently built workflow', () => {
    const workflow = workflowBuilder()
      .document(documentBuilder().dsl('1.0.3').name('test').version('1.0.0').namespace('default').build())
      .do(
        taskListBuilder()
          .push({
            step1: setTaskBuilder().set({ foo: 'bar' }).build(),
          })
          .build(),
      )
      .build();
    const expected = JSON.stringify(workflow);
    const serialized = Classes.Workflow.serialize(workflow, 'json');
    expect(serialized).toEqual(expected);
  });
});
