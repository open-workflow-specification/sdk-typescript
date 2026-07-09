/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
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

import Ajv, { ValidateFunction } from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import workflowSchema from './generated/schema/workflow.json';
import { ChildType, childTypes, validationPointers } from './generated/validation';
import { deepCopy, isObject } from './utils';
import { getLifecycleHooks } from './lifecycle-hooks';
import { Specification } from './generated/definitions';

const ajv = new Ajv({
  schemas: [workflowSchema],
  strict: false,
});
addFormats(ajv);

/**
 * A Map of validation functions, where the key is the name of the schema to validate with
 */
const validators: Map<string, ValidateFunction> = new Map<string, ValidateFunction>(
  Object.entries(validationPointers).map(([typeName, jsonPointer]) => {
    if (!jsonPointer) throw new Error(`No JSON pointer provided for type '${typeName}'`);
    const validate = ajv.getSchema(jsonPointer);
    if (!validate) throw new Error(`Unable to find schema '${jsonPointer}' for type '${typeName}'`);
    return [typeName, validate as ValidateFunction];
  }),
);

/**
 * Runs the JSON schema validation for a single type, throwing a formatted error if invalid.
 * The schema is structurally recursive (AJV walks the whole subtree via `$ref`s), so this only
 * needs to run once, at the root of a `validate` call.
 * @param typeName The data type to validate
 * @param data The data to validate
 */
const validateSchema = <T>(typeName: string, data: T): void => {
  const validateFn: ValidateFunction | undefined = validators.get(typeName);
  if (!validateFn) {
    throw new Error(`Unable to find a validation function for '${typeName}'`);
  }
  // prevents possible data mutation and invalid "additional properties" from the classes like constructor/validate/normalize
  if (!validateFn(deepCopy(data))) {
    throw new Error(
      `'${typeName}' is invalid:
${validateFn.errors?.reduce((acc, error) => acc + `- ${error.instancePath} | ${error.schemaPath} | ${error.message} | ${JSON.stringify(error.params)}\n`, '') ?? ''}

data: ${JSON.stringify(data, null, 4)}`,
    );
  }
};

/**
 * Resolves the nested node(s) to recurse into for the provided child descriptor.
 * Navigation is driven by the generated metadata (property names), so it works on both hydrated
 * class instances and plain objects/arrays.
 * @param node The parent node
 * @param child The child reference descriptor
 * @returns The nested node(s) to validate
 */
const resolveChildren = (node: unknown, child: ChildType): unknown[] => {
  switch (child.kind) {
    case 'object':
      return [(node as Record<string, unknown>)?.[child.property]];
    case 'record': {
      const record = (node as Record<string, unknown>)?.[child.property];
      return isObject(record) ? Object.values(record) : [];
    }
    case 'indexed':
      return isObject(node)
        ? Object.entries(node)
            .filter(([key]) => !child.knownProperties.includes(key))
            .map(([, value]) => value)
        : [];
    case 'array':
      return Array.isArray(node) ? node : [];
    case 'array-record':
      return Array.isArray(node) ? node.flatMap((item) => (isObject(item) ? Object.values(item) : [])) : [];
    default:
      return [];
  }
};

/**
 * Recursively invokes the lifecycle validation hooks of the provided node's descendants.
 * The schema is validated once at the root, so descendants only run their hooks here.
 * @param typeName The type name of the current node
 * @param node The current node
 * @param workflow The root workflow, passed to every hook as DSL-level validation context
 */
const validateDescendants = (typeName: string, node: unknown, workflow: Partial<Specification.Workflow>): void => {
  for (const child of childTypes[typeName] ?? []) {
    for (const childNode of resolveChildren(node, child)) {
      if (childNode == null) {
        continue;
      }
      const hooks = getLifecycleHooks(child.type);
      hooks?.preValidation?.(childNode, workflow);
      hooks?.postValidation?.(childNode, workflow);
      validateDescendants(child.type, childNode, workflow);
    }
  }
};

/**
 * Validates the provided data or throws an error.
 * Runs the JSON schema validation for `typeName` (which structurally validates the whole subtree),
 * then recursively invokes the lifecycle hooks of every nested type, passing the root workflow as
 * DSL-level validation context.
 * @param typeName The data type to validate
 * @param data The data to validate
 * @param workflow A workflow instance, used for DSL level validation. Defaults to `data`, i.e. the root of the validation
 * @returns Throws if invalid
 */
export const validate = <T>(typeName: string, data: T, workflow?: Partial<Specification.Workflow>) => {
  const root = workflow ?? (data as unknown as Partial<Specification.Workflow>);
  getLifecycleHooks(typeName)?.preValidation?.(data, root);
  validateSchema(typeName, data);
  getLifecycleHooks(typeName)?.postValidation?.(data, root);
  validateDescendants(typeName, data, root);
};
