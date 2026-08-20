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

import * as yaml from 'js-yaml';

import { Specification } from '../../src/lib/generated/definitions';
import { Classes } from '../../src/lib/generated/classes';
import { SchemaValidationError } from '../../src/lib/errors';

import { schemaVersion } from '../../package.json';
import { documentBuilder, setTaskBuilder, taskListBuilder, workflowBuilder } from '../../src';

/**
 * The smallest valid workflow.
 * Every scalar is kept under eighty characters: the exact output test asserts the serialized
 * string byte for byte, and js-yaml folds longer scalars into block scalars.
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
 * A workflow exercising the constructs a YAML dumper is known to mis-encode: multi-task control
 * flow, a summary long enough to force a folded block scalar, task names carrying YAML significant
 * characters, version strings that must stay strings, numbers that must stay numbers, runtime and
 * jq expressions, and empty objects and arrays.
 */
const complexWorkflow: Specification.Workflow = {
  document: {
    dsl: schemaVersion,
    namespace: 'default',
    name: 'kitchen-sink',
    version: '1.0.0',
    summary:
      'A workflow whose summary is deliberately longer than the eighty character line width used by js-yaml, so that folded block scalars are exercised.',
    tags: { owner: 'team-a', 'cost-center': '42' },
  },
  input: { schema: { format: 'json', document: { type: 'object' } } },
  do: [
    {
      'consume/reading~1': {
        listen: {
          to: {
            all: [
              {
                with: { source: 'https://my.home.com/sensor', type: 'my.home.sensors.temperature' },
                correlate: { roomId: { from: '.roomid' } },
              },
              {
                with: { source: 'https://my.home.com/sensor', type: 'my.home.sensors.humidity' },
                correlate: { roomId: { from: '.roomid' } },
              },
            ],
          },
        },
        output: { as: '.data.reading' },
      },
    },
    { 'say "hello world" (loudly)': { set: { greeting: '${ "hello " + .name }' } } },
    {
      scalars: {
        set: {
          version: '1.0',
          enabled: 'no',
          nothing: 'null',
          one: '1',
          zero: 0,
          ratio: 1.5,
          empty: {},
          list: [],
          expression: '${ .input.value + 1 }',
          jq: '.data.reading',
          at: '@here',
          tilde: '~',
          percent: '%50',
          colon: 'key: value',
          hash: 'a # b',
        },
      },
    },
    {
      decide: {
        switch: [{ matched: { when: '${ .value == 1 }', then: 'logReadings' } }, { default: { then: 'protect' } }],
      },
    },
    {
      logReadings: {
        for: { each: 'reading', in: '.readings' },
        do: [
          {
            callOrderService: {
              call: 'openapi',
              with: { document: { endpoint: 'http://myorg.io/ordersservices.json' }, operationId: 'logreading' },
            },
          },
        ],
      },
    },
    {
      protect: {
        try: [{ attempt: { set: { ok: true } } }],
        catch: { as: 'err', do: [{ recover: { set: { recovered: true } } }] },
      },
    },
    { branch: { fork: { compete: true, branches: [{ left: { set: { x: 1 } } }, { right: { set: { y: 2 } } }] } } },
  ],
  timeout: { after: { hours: 1, minutes: 30 } },
  output: { as: '.result' },
};

/**
 * A workflow missing the required 'do' property.
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
 * Asserts the YAML and JSON serializations of the same workflow describe exactly the same
 * document, with the same values in the same order, and that both match the expected plain
 * document. YAML output diverging from JSON output is the failure mode of issue #308.
 *
 * The expected document leg assumes normalization is a no-op for Workflow, which holds as long
 * as no normalize lifecycle hook is registered for it.
 *
 * @param yamlText The YAML serialization under test
 * @param jsonText The JSON serialization of the same workflow
 * @param expected The plain document both serializations are expected to describe
 */
const expectFormatsToAgree = (yamlText: string, jsonText: string, expected: Specification.Workflow): void => {
  const fromYaml = yaml.load(yamlText);
  expect(fromYaml).toStrictEqual(JSON.parse(jsonText));
  expect(JSON.stringify(fromYaml)).toBe(jsonText);
  expect(fromYaml).toStrictEqual(expected);
};

/**
 * Builds the minimal workflow through the fluent API, yielding a graph in which the workflow, its
 * document, its task list and its tasks are all hydrated class instances.
 *
 * @returns A fluently built equivalent of the minimal workflow
 */
const buildMinimalWorkflow = () =>
  workflowBuilder()
    .document(documentBuilder().dsl(schemaVersion).name('test').version('1.0.0').namespace('default').build())
    .do(
      taskListBuilder()
        .push({
          step1: setTaskBuilder().set({ foo: 'bar' }).build(),
        })
        .build(),
    )
    .build();

describe('Workflow (de)serialization', () => {
  it('should deserialize JSON', () => {
    const workflow = Classes.Workflow.deserialize(JSON.stringify(minimalWorkflow));
    expect(workflow).toBeInstanceOf(Classes.Workflow);
    expect(workflow.serialize('json')).toBe(JSON.stringify(minimalWorkflow));
  });

  it('should deserialize YAML', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '${schemaVersion}'
  name: test
  version: '1.0.0'
  namespace: default
do:
  - step1:
      set:
        foo: bar`);
    expect(workflow).toBeInstanceOf(Classes.Workflow);
    expect(workflow.serialize('json')).toBe(JSON.stringify(minimalWorkflow));
  });

  it('should serialize as JSON from static method', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expect(Classes.Workflow.serialize(workflow, 'json')).toEqual(JSON.stringify(minimalWorkflow));
  });

  it('should serialize as JSON from instance method', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expect(workflow.serialize('json')).toEqual(JSON.stringify(minimalWorkflow));
  });

  it('should serialize as JSON from static method from fluently built workflow', () => {
    const workflow = buildMinimalWorkflow();
    expect(Classes.Workflow.serialize(workflow, 'json')).toEqual(JSON.stringify(workflow));
  });
});

describe('Workflow serialization - YAML format', () => {
  it('should serialize to YAML by default from the instance method', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expectFormatsToAgree(workflow.serialize(), workflow.serialize('json'), minimalWorkflow);
  });

  it('should serialize to YAML when the format is explicitly set to yaml', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expectFormatsToAgree(workflow.serialize('yaml'), workflow.serialize('json'), minimalWorkflow);
  });

  it('should serialize to YAML by default from the static method given a class instance', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expectFormatsToAgree(
      Classes.Workflow.serialize(workflow),
      Classes.Workflow.serialize(workflow, 'json'),
      minimalWorkflow,
    );
  });

  it('should serialize to YAML by default from the static method given a plain object', () => {
    expectFormatsToAgree(
      Classes.Workflow.serialize(minimalWorkflow),
      Classes.Workflow.serialize(minimalWorkflow, 'json'),
      minimalWorkflow,
    );
  });

  it('should serialize a fluently built workflow to YAML', () => {
    const workflow = buildMinimalWorkflow();
    expectFormatsToAgree(workflow.serialize(), workflow.serialize('json'), minimalWorkflow);
  });

  it('should emit block-style YAML with the same key order as the JSON output', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
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

  it('should serialize a multi-task workflow with switch, try/catch, fork, nested for and timeout to YAML', () => {
    const workflow = new Classes.Workflow(complexWorkflow);
    expectFormatsToAgree(workflow.serialize(), workflow.serialize('json'), complexWorkflow);
  });

  it('should preserve the types of YAML-ambiguous scalars', () => {
    const parsed = yaml.load(new Classes.Workflow(complexWorkflow).serialize()) as Record<string, any>;
    expect(parsed.document.dsl).toBe(schemaVersion);
    expect(parsed.document.version).toBe('1.0.0');
    expect(parsed.document.summary).toBe(complexWorkflow.document.summary);
    expect(parsed.document.tags['cost-center']).toBe('42');
    expect(parsed.timeout.after.hours).toBe(1);
    const { set } = parsed.do[2].scalars;
    expect(set.version).toBe('1.0');
    expect(set.enabled).toBe('no');
    expect(set.nothing).toBe('null');
    expect(set.one).toBe('1');
    expect(set.zero).toBe(0);
    expect(set.ratio).toBe(1.5);
    expect(set.empty).toStrictEqual({});
    expect(set.list).toStrictEqual([]);
    expect(set.expression).toBe('${ .input.value + 1 }');
    expect(set.jq).toBe('.data.reading');
    expect(set.at).toBe('@here');
    expect(set.tilde).toBe('~');
    expect(set.percent).toBe('%50');
    expect(set.colon).toBe('key: value');
    expect(set.hash).toBe('a # b');
    expect(parsed.do[3].decide.switch[0].matched.when).toBe('${ .value == 1 }');
  });

  it('should round-trip task names containing YAML-significant characters', () => {
    const parsed = yaml.load(new Classes.Workflow(complexWorkflow).serialize()) as Record<string, any>;
    expect(parsed.do.map((task: object) => Object.keys(task)[0])).toStrictEqual([
      'consume/reading~1',
      'say "hello world" (loudly)',
      'scalars',
      'decide',
      'logReadings',
      'protect',
      'branch',
    ]);
  });

  it('should not emit YAML tags in the serialized output', () => {
    expect(new Classes.Workflow(complexWorkflow).serialize()).not.toMatch(/!!/);
  });

  it('should deserialize the YAML it produced back into an equivalent workflow', () => {
    const workflow = new Classes.Workflow(complexWorkflow);
    const roundTripped = Classes.Workflow.deserialize(workflow.serialize());
    expect(roundTripped).toBeInstanceOf(Classes.Workflow);
    expect(roundTripped.serialize('json')).toBe(workflow.serialize('json'));
  });
});

describe('Workflow serialization - normalize flag', () => {
  it('should serialize without normalizing when normalize is false (static method)', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expect(JSON.parse(Classes.Workflow.serialize(workflow, 'json', false))).toMatchObject(minimalWorkflow);
  });

  it('should serialize without normalizing when normalize is false (instance method)', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expect(JSON.parse(workflow.serialize('json', false))).toMatchObject(minimalWorkflow);
  });

  it('should serialize to YAML without normalizing when normalize is false (static method)', () => {
    const workflow = new Classes.Workflow(complexWorkflow);
    expectFormatsToAgree(
      Classes.Workflow.serialize(workflow, 'yaml', false),
      Classes.Workflow.serialize(workflow, 'json', false),
      complexWorkflow,
    );
  });

  it('should serialize to YAML without normalizing when normalize is false (instance method)', () => {
    const workflow = new Classes.Workflow(complexWorkflow);
    expectFormatsToAgree(workflow.serialize('yaml', false), workflow.serialize('json', false), complexWorkflow);
  });
});

describe('Workflow serialization - validation', () => {
  it('should throw a SchemaValidationError when serializing an invalid workflow (static method)', () => {
    const workflow = new Classes.Workflow(invalidWorkflow);
    expect(() => Classes.Workflow.serialize(workflow)).toThrow(SchemaValidationError);
  });

  it('should throw a SchemaValidationError when serializing an invalid workflow (instance method)', () => {
    const workflow = new Classes.Workflow(invalidWorkflow);
    expect(() => workflow.serialize()).toThrow(SchemaValidationError);
  });
});

describe('ObjectHydrator - plain object conversion', () => {
  it('should convert a hydrated workflow into a plain object', () => {
    const plainWorkflow = new Classes.Workflow(minimalWorkflow).asPlainObject();
    expect(Object.getPrototypeOf(plainWorkflow)).toBe(Object.prototype);
    expect(plainWorkflow).toStrictEqual(minimalWorkflow);
  });

  it('should convert nested hydrated instances into plain objects', () => {
    const plainWorkflow = new Classes.Workflow(minimalWorkflow).asPlainObject();
    expect(Object.getPrototypeOf(plainWorkflow.document)).toBe(Object.prototype);
    expect(Object.getPrototypeOf(plainWorkflow.do)).toBe(Array.prototype);
    expect(Object.getPrototypeOf(plainWorkflow.do[0])).toBe(Object.prototype);
  });

  it('should produce a plain object js-yaml can dump directly', () => {
    expect(() => yaml.dump(new Classes.Workflow(minimalWorkflow).asPlainObject())).not.toThrow();
  });
});

describe('Workflow serialization - js-yaml compatibility', () => {
  it('should hydrate workflows as class instances rather than plain objects', () => {
    const workflow = new Classes.Workflow(minimalWorkflow);
    expect(Object.getPrototypeOf(workflow)).not.toBe(Object.prototype);
    expect(workflow).toBeInstanceOf(Classes.Workflow);
  });

  /**
   * Canary. js-yaml v5 identifies mappings with Object.getPrototypeOf(data) === Object.prototype,
   * so it refuses hydrated class instances; serialize converts to plain data first to work around
   * it. If this test fails, js-yaml has relaxed that rule - re-evaluate the conversion rather than
   * deleting this test.
   */
  it('should document that js-yaml cannot dump hydrated instances directly (issue #308)', () => {
    expect(() => yaml.dump(new Classes.Workflow(minimalWorkflow))).toThrow(yaml.YAMLException);
  });
});
