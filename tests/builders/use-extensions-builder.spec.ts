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
import { useExtensionsBuilder } from '../../src/lib/generated/builders';
import { Classes } from '../../src/lib/generated/classes';

describe('UseExtensions builder', () => {
  it('should build with fluent api', () => {
    const extension = {
      myExtension: {
        extend: 'call' as const,
      },
    };
    const useExtensions = useExtensionsBuilder().push(extension).build();
    expect(useExtensions).toBeDefined();
    expect(useExtensions).toBeInstanceOf(Classes.UseExtensions);
    expect(useExtensions.length).toBe(1);
    expect(useExtensions[0].myExtension).toEqual(extension.myExtension);
  });

  it('should build with input', () => {
    const extension = {
      myExtension: {
        extend: 'call' as const,
      },
    };
    const useExtensions = useExtensionsBuilder([extension]).build();
    expect(useExtensions).toBeDefined();
    expect(useExtensions).toBeInstanceOf(Classes.UseExtensions);
    expect(useExtensions.length).toBe(1);
    expect(useExtensions[0].myExtension).toEqual(extension.myExtension);
  });

  it('should throw with non-array', () => {
    const test = () => {
      useExtensionsBuilder({ foo: 'bar' } as any).build();
    };
    expect(test).toThrow(Error);
    expect(test).toThrow('The provided model should be an array');
  });

  it('should throw when invalid', () => {
    const test = () => {
      useExtensionsBuilder([1, 2, 3] as any).build();
    };
    expect(test).toThrow(Error);
    expect(test).toThrow(/'UseExtensions' is invalid/);
  });

  it('should not throw when validation is disabled', () => {
    const test = () => {
      useExtensionsBuilder([1, 2, 3] as any).build({ validate: false });
    };
    expect(test).not.toThrow();
  });
});
