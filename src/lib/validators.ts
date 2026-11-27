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

import Ajv, { ValidateFunction } from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import workflowSchema from './generated/schema/workflow.json';
import { validationPointers } from './generated/validation';

/**
 * The AJV instance holding the workflow schema, created the first time a type is validated
 */
let ajv: Ajv | undefined;

/**
 * Returns the AJV instance holding the workflow schema, creating it on first use.
 * AJV generates code from strings to compile a schema, so nothing is compiled until a validation is requested.
 * The instance is kept only once it is fully configured.
 * @returns The AJV instance
 */
const getAjv = (): Ajv => {
  if (!ajv) {
    const instance = new Ajv({
      schemas: [workflowSchema],
      strict: false,
    });
    addFormats(instance);
    ajv = instance;
  }
  return ajv;
};

/**
 * A Map of JSON pointers to the schemas to validate with, where the key is the name of the type
 */
const jsonPointers: Map<string, string> = new Map<string, string>(Object.entries(validationPointers));

/**
 * A Map of the validation functions compiled so far, where the key is the name of the schema to validate with
 */
const validators: Map<string, ValidateFunction> = new Map<string, ValidateFunction>();

/**
 * Compiles the validation function for the provided type.
 * @param typeName The data type to compile the validation function for
 * @param jsonPointer The JSON pointer to the schema of the type
 * @returns The validation function
 */
const compileValidator = (typeName: string, jsonPointer: string | undefined): ValidateFunction => {
  if (!jsonPointer) throw new Error(`No JSON pointer provided for type '${typeName}'`);
  const validate = getAjv().getSchema(jsonPointer);
  if (!validate) throw new Error(`Unable to find schema '${jsonPointer}' for type '${typeName}'`);
  return validate as ValidateFunction;
};

/**
 * Returns the validation function for the provided type, compiling it the first time it is requested.
 * @param typeName The data type to validate
 * @returns The validation function, or undefined if the type is unknown
 */
export const getValidator = (typeName: string): ValidateFunction | undefined => {
  if (!validators.has(typeName) && jsonPointers.has(typeName)) {
    validators.set(typeName, compileValidator(typeName, jsonPointers.get(typeName)));
  }
  return validators.get(typeName);
};
