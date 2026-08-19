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
import { SchemaValidationError } from '../../src/lib/errors';

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

describe('Workflow serialization - YAML format', () => {
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

  it('should serialize as YAML by default from static method', () => {
    const workflow = new Classes.Workflow(data);
    const serialized = Classes.Workflow.serialize(workflow);
    expect(typeof serialized).toBe('string');
    expect(serialized).toMatch(/document:/);
    expect(serialized).toMatch(/foo: bar/);
  });

  it('should serialize as YAML by default from instance method', () => {
    const workflow = new Classes.Workflow(data);
    const serialized = workflow.serialize();
    expect(typeof serialized).toBe('string');
    expect(serialized).toMatch(/document:/);
    expect(serialized).toMatch(/foo: bar/);
  });

  it('should serialize as YAML when format is explicitly set to yaml', () => {
    const workflow = new Classes.Workflow(data);
    const serialized = Classes.Workflow.serialize(workflow, 'yaml');
    expect(typeof serialized).toBe('string');
    expect(serialized).toMatch(/document:/);
  });
});

describe('Workflow serialization - normalize flag', () => {
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

  it('should serialize without normalizing when normalize is false (static method)', () => {
    const workflow = new Classes.Workflow(data);
    const serialized = Classes.Workflow.serialize(workflow, 'json', false);
    const parsed = JSON.parse(serialized);
    expect(parsed).toMatchObject(data);
  });

  it('should serialize without normalizing when normalize is false (instance method)', () => {
    const workflow = new Classes.Workflow(data);
    const serialized = workflow.serialize('json', false);
    const parsed = JSON.parse(serialized);
    expect(parsed).toMatchObject(data);
  });
});

describe('Workflow serialization - validate flag', () => {
  const validData: Specification.Workflow = {
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

  const invalidData = {
    document: {
      dsl: schemaVersion,
      name: 'test',
      version: '1.0.0',
      namespace: 'default',
    },
    // missing required 'do'
  } as unknown as Specification.Workflow;

  it('should throw a SchemaValidationError when serializing an invalid workflow (static method)', () => {
    const workflow = new Classes.Workflow(invalidData);
    expect(() => Classes.Workflow.serialize(workflow, 'json')).toThrow(SchemaValidationError);
  });

  it('should throw a SchemaValidationError when serializing an invalid workflow (instance method)', () => {
    const workflow = new Classes.Workflow(invalidData);
    expect(() => workflow.serialize('json')).toThrow(SchemaValidationError);
  });

  it('should not throw when validate is false even for an invalid workflow (static method)', () => {
    const workflow = new Classes.Workflow(invalidData);
    expect(() => Classes.Workflow.serialize(workflow, 'json', true, false)).not.toThrow();
  });

  it('should not throw when validate is false even for an invalid workflow (instance method)', () => {
    const workflow = new Classes.Workflow(invalidData);
    expect(() => workflow.serialize('json', true, false)).not.toThrow();
  });

  it('should serialize a valid workflow without errors when validate is true (static method)', () => {
    const workflow = new Classes.Workflow(validData);
    expect(() => Classes.Workflow.serialize(workflow, 'json', true, true)).not.toThrow();
  });

  it('should serialize a valid workflow without errors when validate is true (instance method)', () => {
    const workflow = new Classes.Workflow(validData);
    expect(() => workflow.serialize('json', true, true)).not.toThrow();
  });
});
