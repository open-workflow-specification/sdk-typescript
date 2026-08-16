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

import { workflowSchema } from '../../src/lib/schema';
import { schemaVersion } from '../../package.json';

describe('workflowSchema', () => {
  it('it is the same schema the validatior enforces', () => {
    expect(workflowSchema.$id).toBe(`https://open-workflow-specification.org/schemas/${schemaVersion}/workflow.json`);
  });

  it('it carries the definitions consumers navigate by (smoke test)', () => {
    expect(workflowSchema.$defs?.task).toBeDefined();
    expect(workflowSchema.$defs?.taskList).toBeDefined();
    expect(workflowSchema.$defs?.callTask).toBeDefined();
  });
});
