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

import { callFunctionBuilder } from '../../src/lib/generated/builders';
import { Classes } from '../../src/lib/generated/classes';

const functionName = 'exampleFunction';
const functionArgs = { arg1: 'value1', arg2: 'value2' };

describe('CallFunction builder', () => {
  it('should build with fluent api', () => {
    const callFunction = callFunctionBuilder().call(functionName).build();
    expect(callFunction).toBeDefined();
    expect(callFunction).toBeInstanceOf(Classes.CallFunction);
    expect(callFunction.call).toBe(functionName);
  });

  it('should build with input', () => {
    const data = {
      call: functionName,
    };
    const callFunction = callFunctionBuilder(data).build();
    expect(callFunction).toBeDefined();
    expect(callFunction).toBeInstanceOf(Classes.CallFunction);
    expect(callFunction.call).toBe(functionName);
  });

  it('should build with function arguments', () => {
    const callFunction = callFunctionBuilder().call(functionName).with(functionArgs).build();
    expect(callFunction).toBeDefined();
    expect(callFunction).toBeInstanceOf(Classes.CallFunction);
    expect(callFunction.call).toBe(functionName);
    expect(callFunction.with).toEqual(functionArgs);
  });

  it('should build with input and function arguments', () => {
    const data = {
      call: functionName,
      with: functionArgs,
    };
    const callFunction = callFunctionBuilder(data).build();
    expect(callFunction).toBeDefined();
    expect(callFunction).toBeInstanceOf(Classes.CallFunction);
    expect(callFunction.call).toBe(functionName);
    expect(callFunction.with).toEqual(functionArgs);
  });

  it('should throw when invalid', () => {
    const test = () => {
      callFunctionBuilder().build();
    };
    expect(test).toThrow(Error);
    expect(test).toThrow(/'CallFunction' is invalid/);
  });

  it('should not throw when validation is disabled', () => {
    const test = () => {
      callFunctionBuilder().build({ validate: false });
    };
    expect(test).not.toThrow();
  });
});
