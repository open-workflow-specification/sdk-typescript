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
import { callHTTPBuilder } from '../../src/lib/generated/builders';
import { Classes } from '../../src/lib/generated/classes';

describe('CallHTTP builder', () => {
  it('should build with fluent api', () => {
    const endpoint = 'https://open-workflow-specification.org';
    const method = 'get';
    const callHttp = callHTTPBuilder()
      .with({
        endpoint,
        method,
      })
      .build();
    expect(callHttp).toBeDefined();
    expect(callHttp).toBeInstanceOf(Classes.CallHTTP);
    expect(callHttp.call).toBe('http');
    expect(callHttp.with).toBeDefined();
    expect(callHttp.with!.endpoint).toBe(endpoint);
    expect(callHttp.with!.method).toBe(method);
  });

  it('should build with input', () => {
    const endpoint = 'https://open-workflow-specification.org';
    const method = 'get';
    const data = {
      with: {
        endpoint,
        method,
      },
    };
    const callHttp = callHTTPBuilder(data).build();
    expect(callHttp).toBeDefined();
    expect(callHttp).toBeInstanceOf(Classes.CallHTTP);
    expect(callHttp.call).toBe('http');
    expect(callHttp.with).toBeDefined();
    expect(callHttp.with!.endpoint).toBe(endpoint);
    expect(callHttp.with!.method).toBe(method);
  });

  it('should throw when invalid', () => {
    const test = () => {
      callHTTPBuilder().build();
    };
    expect(test).toThrow(Error);
    expect(test).toThrow(/'CallHTTP' is invalid/);
  });

  it('should not throw when validation is disabled', () => {
    const test = () => {
      callHTTPBuilder().build({ validate: false });
    };
    expect(test).not.toThrow();
  });
});
