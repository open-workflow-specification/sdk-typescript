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
 */
import {
  documentBuilder,
  setTaskBuilder,
  taskListBuilder,
  workflowBuilder,
} from /*'@openworkflowspec/sdk';*/ '../../dist';

try {
  const workflow = workflowBuilder()
    .document(documentBuilder().dsl('1.0.3').name('using-fluent-api').version('1.0.0').namespace('default').build())
    .do(
      taskListBuilder()
        .push({
          step1: setTaskBuilder().set({ foo: 'bar' }).build(),
        })
        .build(),
    )
    .build();
  console.log(`--- YAML ---\n${workflow.serialize()}\n\n--- JSON ---\n${workflow.serialize('json')}`);
} catch (ex) {
  console.error('Invalid workflow', ex);
}
