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

import { callAsyncAPIBuilder } from '../../src/lib/generated/builders';
import { Classes } from '../../src/lib/generated/classes';

const document = { endpoint: 'https://example.com', name: 'example' };
const operation = 'operationRef';
const subscription = {
  consume: {
    until: '${ .condition }',
  },
};

describe('CallAsyncAPI builder', () => {
  it('should build with fluent api', () => {
    const callAsyncAPI = callAsyncAPIBuilder()
      .with({
        document,
        operation,
        subscription,
      })
      .build();
    expect(callAsyncAPI).toBeDefined();
    expect(callAsyncAPI).toBeInstanceOf(Classes.CallAsyncAPI);
    expect(callAsyncAPI.call).toBe('asyncapi');
    expect(callAsyncAPI.with).toBeDefined();
    expect(callAsyncAPI.with!.document).toEqual(document);
    expect(callAsyncAPI.with!.operation).toBe(operation);
    expect(callAsyncAPI.with!.subscription).toEqual(subscription);
  });

  it('should build with input', () => {
    const data = {
      with: {
        document,
        operation,
        subscription,
      },
    };
    const callAsyncAPI = callAsyncAPIBuilder(data).build();
    expect(callAsyncAPI).toBeDefined();
    expect(callAsyncAPI).toBeInstanceOf(Classes.CallAsyncAPI);
    expect(callAsyncAPI.call).toBe('asyncapi');
    expect(callAsyncAPI.with).toBeDefined();
    expect(callAsyncAPI.with!.document).toEqual(document);
    expect(callAsyncAPI.with!.operation).toBe(operation);
    expect(callAsyncAPI.with!.subscription).toEqual(subscription);
  });

  it('should throw when invalid', () => {
    const test = () => {
      callAsyncAPIBuilder().build();
    };
    expect(test).toThrow(Error);
    expect(test).toThrow(/'CallAsyncAPI' is invalid/);
  });

  it('should not throw when validation is disabled', () => {
    const test = () => {
      callAsyncAPIBuilder().build({ validate: false });
    };
    expect(test).not.toThrow();
  });
});
