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
import { DslValidationError, SchemaValidationError, WorkflowValidationError } from './errors';

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
 * Escapes a JSON Pointer segment per RFC 6901 (`~` -> `~0`, `/` -> `~1`); numbers are array indices.
 * @param segment The raw property name, record key or array index
 * @returns The escaped segment
 */
const escapeSegment = (segment: string | number): string =>
  typeof segment === 'number' ? String(segment) : segment.replace(/~/g, '~0').replace(/\//g, '~1');

/**
 * Appends a segment to a RFC 6901 JSON Pointer.
 * @param base The base pointer ('' for the root)
 * @param segment The segment to append
 * @returns The extended pointer
 */
const appendPointer = (base: string, segment: string | number): string => `${base}/${escapeSegment(segment)}`;

/**
 * Renders a JSON Pointer for display in an error message, labelling the root explicitly.
 * @param path The RFC 6901 JSON Pointer ('' for the root)
 * @returns The human-friendly pointer
 */
const displayPath = (path: string): string => (path === '' ? '<root>' : path);

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
    const schemaErrors = validateFn.errors ?? [];
    throw new SchemaValidationError(
      `'${typeName}' is invalid:
${schemaErrors.reduce((acc, error) => acc + `- ${error.instancePath} | ${error.schemaPath} | ${error.message} | ${JSON.stringify(error.params)}\n`, '')}

data: ${JSON.stringify(data, null, 4)}`,
      { path: '', typeName, schemaErrors },
    );
  }
};

/**
 * Runs the provided validation step, wrapping any raised error into a {@link DslValidationError} that
 * carries the JSON Pointer to the offending node. Errors that are already a {@link WorkflowValidationError}
 * (a schema failure, or a descendant that has already been located) are rethrown unchanged.
 * @param typeName The type name of the node being validated
 * @param path The RFC 6901 JSON Pointer to the node being validated
 * @param fn The validation step to run
 */
const withValidationContext = <R>(typeName: string, path: string, fn: () => R): R => {
  try {
    return fn();
  } catch (cause) {
    if (cause instanceof WorkflowValidationError) {
      throw cause; // already located & typed; don't re-wrap
    }
    const detail = cause instanceof Error ? cause.message : String(cause);
    throw new DslValidationError(`Validation failed at '${displayPath(path)}' (${typeName}): ${detail}`, {
      path,
      typeName,
      cause,
    });
  }
};

/**
 * A nested node to recurse into, paired with the JSON Pointer segment(s) used to reach it from its parent.
 */
type ResolvedChild = { node: unknown; segments: (string | number)[] };

/**
 * Resolves the nested node(s) to recurse into for the provided child descriptor, along with the JSON
 * Pointer segment(s) used to reach each of them. Navigation is driven by the generated metadata
 * (property names), so it works on both hydrated class instances and plain objects/arrays.
 * @param node The parent node
 * @param child The child reference descriptor
 * @returns The nested node(s) to validate, each with its path segment(s)
 */
const resolveChildren = (node: unknown, child: ChildType): ResolvedChild[] => {
  switch (child.kind) {
    case 'object':
      return [{ node: (node as Record<string, unknown>)?.[child.property], segments: [child.property] }];
    case 'record': {
      const record = (node as Record<string, unknown>)?.[child.property];
      return isObject(record)
        ? Object.entries(record).map(([key, value]) => ({ node: value, segments: [child.property, key] }))
        : [];
    }
    case 'indexed':
      return isObject(node)
        ? Object.entries(node)
            .filter(([key]) => !child.knownProperties.includes(key))
            .map(([key, value]) => ({ node: value, segments: [key] }))
        : [];
    case 'array':
      return Array.isArray(node) ? node.map((value, index) => ({ node: value, segments: [index] })) : [];
    case 'array-record':
      return Array.isArray(node)
        ? node.flatMap((item, index) =>
            isObject(item) ? Object.entries(item).map(([key, value]) => ({ node: value, segments: [index, key] })) : [],
          )
        : [];
    default:
      return [];
  }
};

/**
 * Recursively invokes the lifecycle validation hooks of the provided node's descendants.
 * The schema is validated once at the root, so descendants only run their hooks here. Any error
 * raised by a hook is wrapped into a {@link WorkflowValidationError} carrying the JSON Pointer to
 * the offending node.
 * @param typeName The type name of the current node
 * @param node The current node
 * @param workflow The root workflow, passed to every hook as DSL-level validation context
 * @param path The RFC 6901 JSON Pointer to the current node, relative to the validated root
 */
const validateDescendants = (
  typeName: string,
  node: unknown,
  workflow: Partial<Specification.Workflow>,
  path: string,
): void => {
  for (const child of childTypes[typeName] ?? []) {
    for (const { node: childNode, segments } of resolveChildren(node, child)) {
      if (childNode == null) {
        continue;
      }
      const childPath = segments.reduce(appendPointer, path);
      const hooks = getLifecycleHooks(child.type);
      withValidationContext(child.type, childPath, () => {
        hooks?.preValidation?.(childNode, workflow);
        hooks?.postValidation?.(childNode, workflow);
      });
      validateDescendants(child.type, childNode, workflow, childPath);
    }
  }
};

/**
 * Validates the provided data or throws an error.
 * Runs the JSON schema validation for `typeName` (which structurally validates the whole subtree),
 * then recursively invokes the lifecycle hooks of every nested type, passing the root workflow as
 * DSL-level validation context. Any failure is thrown as a {@link WorkflowValidationError}.
 * @param typeName The data type to validate
 * @param data The data to validate
 * @param workflow A workflow instance, used for DSL level validation. Defaults to `data`, i.e. the root of the validation
 * @returns Throws if invalid
 */
export const validate = <T>(typeName: string, data: T, workflow?: Partial<Specification.Workflow>) => {
  const root = workflow ?? (data as unknown as Partial<Specification.Workflow>);
  withValidationContext(typeName, '', () => {
    getLifecycleHooks(typeName)?.preValidation?.(data, root);
    validateSchema(typeName, data);
    getLifecycleHooks(typeName)?.postValidation?.(data, root);
  });
  validateDescendants(typeName, data, root, '');
};
