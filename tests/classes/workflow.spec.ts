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
//import { schemaVersion } from '../../package.json';

describe('Workflow class', () => {
  it('should be an instance of Workflow', () => {
    const workflow = new Classes.Workflow();
    expect(workflow).toBeInstanceOf(Classes.Workflow);
    expect(type(workflow.document).is<Specification.Document>(true)).toBe(true);
    expect(type(workflow.input).is<Specification.Input | undefined>(true)).toBe(true);
    expect(type(workflow.use).is<Specification.Use | undefined>(true)).toBe(true);
    expect(type(workflow.do).is<Specification.TaskList>(true)).toBe(true);
    expect(type(workflow.timeout).is<Specification.WorkflowTimeout | undefined>(true)).toBe(true);
    expect(type(workflow.output).is<Specification.Output | undefined>(true)).toBe(true);
    expect(type(workflow.schedule).is<Specification.Schedule | undefined>(true)).toBe(true);
    expect(type(workflow.foobar).is<unknown>(true)).toBe(true);
  });
});
