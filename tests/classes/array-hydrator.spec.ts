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

import { ArrayHydrator } from '../../src/lib/hydrator';
import { Classes } from '../../src/lib/generated/classes';
import { Specification } from '../../src/lib/generated/definitions';

import { schemaVersion } from '../../package.json';

/**
 * The message ArrayHydrator raises for a model it cannot treat as an array.
 */
const notAnArray = 'The provided model should be an array';

/**
 * ArrayHydrator used to discriminate a length from a list of elements with `!isNaN(model)`, which
 * coerces the model to a number first. `Number([])` is 0 and `Number(['5'])` is 5, so empty and
 * single element arrays were routed into the `Array(length)` constructor.
 *
 * These assert the base class directly, because that is the only place the single element case is
 * observable: every generated subclass immediately splices its contents away and re-pushes hydrated
 * elements, which repaired the damage for a non-empty model but never for an empty one.
 */
describe('ArrayHydrator - model coercion', () => {
  it('should hydrate an empty array as an empty instance', () => {
    expect([...new ArrayHydrator<string>([])]).toStrictEqual([]);
  });

  it('should preserve a single element whose value coerces to a number', () => {
    expect([...new ArrayHydrator<string>(['5'])]).toStrictEqual(['5']);
    expect([...new ArrayHydrator<string>([''])]).toStrictEqual(['']);
    expect([...new ArrayHydrator<number>([3])]).toStrictEqual([3]);
  });

  it('should hydrate null and undefined as an empty instance', () => {
    expect([...new ArrayHydrator<string>(null as unknown as Array<string>)]).toStrictEqual([]);
    expect([...new ArrayHydrator<string>(undefined)]).toStrictEqual([]);
  });

  it('should treat a number as a length rather than as an element', () => {
    expect(new ArrayHydrator<string>(3).length).toBe(3);
  });

  it('should reject a model it cannot treat as an array', () => {
    expect(() => new ArrayHydrator<string>({} as unknown as Array<string>)).toThrow(notAnArray);
    expect(() => new ArrayHydrator<string>('abc' as unknown as Array<string>)).toThrow(notAnArray);
  });

  it('should copy a large model without exceeding the argument limit', () => {
    const large = Array.from({ length: 200_000 }, (_, index) => `task-${index}`);
    const hydrated = new ArrayHydrator<string>(large);
    expect(hydrated.length).toBe(200_000);
    expect(hydrated[199_999]).toBe('task-199999');
  });
});

/**
 * The same behaviour reached the way the SDK actually reaches it. Only the empty, null and non-array
 * models discriminate here; the rest document that the subclass hydration layer composes correctly
 * over the base class rather than proving the base class fix.
 */
describe('ArrayHydrator - generated subclasses', () => {
  it('should hydrate an empty array as an empty instance', () => {
    const taskList = new Classes.TaskList([]);
    expect(taskList).toBeInstanceOf(Classes.TaskList);
    expect(taskList.length).toBe(0);
    expect([...taskList]).toStrictEqual([]);
  });

  it('should hydrate null as an empty instance', () => {
    const taskList = new Classes.TaskList(null as unknown as Array<Specification.TaskItem>);
    expect(taskList.length).toBe(0);
    expect([...taskList]).toStrictEqual([]);
  });

  it('should hydrate undefined as an empty instance', () => {
    const taskList = new Classes.TaskList(undefined);
    expect(taskList.length).toBe(0);
    expect([...taskList]).toStrictEqual([]);
  });

  it('should treat a number as a length rather than as an element', () => {
    const taskList = new Classes.TaskList(3);
    expect(taskList.length).toBe(3);
  });

  it('should hydrate the elements of a populated array', () => {
    const taskList = new Classes.TaskList([{ step1: { set: { foo: 'bar' } } }, { step2: { set: { foo: 'baz' } } }]);
    expect(taskList.length).toBe(2);
    expect(Object.keys(taskList[0]!)).toStrictEqual(['step1']);
    expect(Object.keys(taskList[1]!)).toStrictEqual(['step2']);
  });

  it('should throw its own error rather than a TypeError when given a mapping', () => {
    expect(() => new Classes.TaskList({} as unknown as Array<Specification.TaskItem>)).toThrow(notAnArray);
  });

  it('should throw rather than split a string into characters', () => {
    expect(() => new Classes.TaskList('abc' as unknown as Array<Specification.TaskItem>)).toThrow(notAnArray);
  });

  it('should round-trip an existing instance without altering it', () => {
    const source = new Classes.TaskList([{ step1: { set: { foo: 'bar' } } }]);
    const copy = new Classes.TaskList(source);
    expect(copy.length).toBe(1);
    expect(JSON.stringify(copy)).toBe(JSON.stringify(source));
  });

  it('should hydrate a workflow holding an empty task list without inventing a task', () => {
    const workflow = new Classes.Workflow({
      document: { dsl: schemaVersion, name: 'test', version: '1.0.0', namespace: 'default' },
      do: [],
    });
    expect(workflow.do.length).toBe(0);
    expect(workflow.serialize({ validate: false })).toBe(
      `document:
  dsl: ${schemaVersion}
  name: test
  version: 1.0.0
  namespace: default
do: []
`,
    );
  });
});
