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
import { type } from 'ts-inference-check';
import { Classes } from '../../src/lib/generated/classes';
import { Specification } from '../../src/lib/generated/definitions';

describe('UseExtensions class', () => {
  it('should be an instance of UseExtensions', () => {
    const useExtensions = new Classes.UseExtensions();
    expect(useExtensions).toBeInstanceOf(Classes.UseExtensions);
    expect(useExtensions.length).toBe(0);
    expect(type(useExtensions.push).is<(...items: { [k: string]: Specification.Extension }[]) => number>(true)).toBe(
      true,
    );
  });
});
