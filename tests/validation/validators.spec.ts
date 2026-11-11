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
 *
 */

import { validationPointers } from '../../src/lib/generated/validation';
import { getValidator } from '../../src/lib/validators';

/**
 * Returns why the validation function of the provided type cannot be compiled, if it cannot.
 * @param typeName The type to compile the validation function for
 * @returns The reason, prefixed with the name of the type, or undefined if it compiles
 */
const findCompilationFailure = (typeName: string): string | undefined => {
  try {
    return typeof getValidator(typeName) === 'function' ? undefined : `${typeName}: no validation function`;
  } catch (error) {
    return `${typeName}: ${error instanceof Error ? error.message : String(error)}`;
  }
};

/**
 * A validation function is compiled the first time its type is validated, not when the SDK is imported, so a JSON
 * pointer that is missing or resolves to no schema would go unnoticed until that type is validated.
 */
describe('Validators', () => {
  it('should resolve the schema of every type', () => {
    const failures = Object.keys(validationPointers)
      .map(findCompilationFailure)
      .filter((failure) => failure !== undefined);
    expect(failures).toStrictEqual([]);
  });
});
