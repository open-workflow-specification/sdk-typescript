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

import { callGRPCBuilder } from '../../src/lib/generated/builders';
import { Classes } from '../../src/lib/generated/classes';

const proto = { name: 'foo', endpoint: 'http://proto.com' };
const service = { name: 'MyService', host: 'Host' };
const method = 'MyMethod';

describe('CallGRPC builder', () => {
  it('should build with fluent api', () => {
    const callGrpc = callGRPCBuilder()
      .with({
        proto,
        service,
        method,
      })
      .build();
    expect(callGrpc).toBeDefined();
    expect(callGrpc).toBeInstanceOf(Classes.CallGRPC);
    expect(callGrpc.call).toBe('grpc');
    expect(callGrpc.with).toBeDefined();
    expect(callGrpc.with!.service).toEqual(service);
    expect(callGrpc.with!.method).toBe(method);
  });

  it('should build with input', () => {
    const data = {
      with: {
        proto,
        service,
        method,
      },
    };
    const callGrpc = callGRPCBuilder(data).build();
    expect(callGrpc).toBeDefined();
    expect(callGrpc).toBeInstanceOf(Classes.CallGRPC);
    expect(callGrpc.call).toBe('grpc');
    expect(callGrpc.with).toBeDefined();
    expect(callGrpc.with!.service).toEqual(service);
    expect(callGrpc.with!.method).toBe(method);
  });

  it('should throw when invalid', () => {
    const test = () => {
      callGRPCBuilder().build();
    };
    expect(test).toThrow(Error);
    expect(test).toThrow(/'CallGRPC' is invalid/);
  });

  it('should not throw when validation is disabled', () => {
    const test = () => {
      callGRPCBuilder().build({ validate: false });
    };
    expect(test).not.toThrow();
  });
});
