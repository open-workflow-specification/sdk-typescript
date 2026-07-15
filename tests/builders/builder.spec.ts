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

import { Builder, builder } from '../../src/lib/builder';
import { type } from 'ts-inference-check';

type Person = {
  name: string;
  age: number;
  friends?: Array<Person>;
  [k: string]: unknown;
};

const darknessMyOldFriend = { name: 'Darkness', age: 999 };
const isPerson = (model: Partial<Person>): model is Person => !!model.name && !!model.age;
function personBuildingFn(model: Partial<Person>): Person {
  if (!isPerson(model)) {
    throw new Error('The provided object is not a person');
  }
  return {
    ...model,
    friends: [...(model.friends || []), darknessMyOldFriend],
  };
}
const personBuilder = (model?: Partial<Person>): Builder<Person> => builder<Person>(model, personBuildingFn);

describe('builder proxy', () => {
  it('should infer property types', () => {
    const builder = personBuilder();
    expect(type(builder.name).is<(arg: string) => Builder<Person>>(true)).toBe(true);
    expect(type(builder.age).is<(arg: number) => Builder<Person>>(true)).toBe(true);
    expect(type(builder.friends).is<(arg: Array<Person> | undefined) => Builder<Person>>(true)).toBe(true);
    expect(type(builder.lover).is<(arg: unknown) => Builder<Person>>(true)).toBe(true);
  });

  it('should build', () => {
    const name = 'John Doe';
    const age = 42;
    const friend = { name: 'Cookie Doe', age: 42 };
    const lover = 'Jane Doe';
    const person = personBuilder().name(name).age(age).friends([friend]).lover(lover).build();
    expect(person).toBeDefined();
    expect(person.name).toBe(name);
    expect(person.age).toBe(age);
    expect(person.friends?.length).toBe(2);
    expect(person.friends?.includes(friend)).toBe(true);
    expect(person.friends?.includes(darknessMyOldFriend)).toBe(true);
    expect(person.lover).toBe(lover);
  });
});
