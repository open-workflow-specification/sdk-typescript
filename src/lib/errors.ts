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

import type { ErrorObject } from 'ajv';

/**
 * The options used to build a {@link WorkflowValidationError}
 */
export interface WorkflowValidationErrorOptions {
  /**
   * The RFC 6901 JSON Pointer to the offending node, relative to the validated root ('' = root)
   */
  path: string;
  /**
   * The DSL type name being validated at that path, e.g. 'TaskList', 'Workflow'
   */
  typeName: string;
  /**
   * The underlying error that triggered this one (the hook throw or schema failure)
   */
  cause?: unknown;
}

/**
 * The base type for any validation failure. Catch this to handle all validation errors.
 */
export class WorkflowValidationError extends Error {
  /**
   * The RFC 6901 JSON Pointer to the offending node, relative to the validated root ('' = root)
   */
  readonly path: string;
  /**
   * The DSL type name being validated at that path, e.g. 'TaskList', 'Workflow'
   */
  readonly typeName: string;

  constructor(message: string, options: WorkflowValidationErrorOptions) {
    super(message, { cause: options.cause });
    this.name = 'WorkflowValidationError';
    this.path = options.path;
    this.typeName = options.typeName;
    Object.setPrototypeOf(this, WorkflowValidationError.prototype); // keeps `instanceof` correct across transpile targets
  }
}

/**
 * The options used to build a {@link SchemaValidationError}
 */
export interface SchemaValidationErrorOptions extends WorkflowValidationErrorOptions {
  /**
   * The raw AJV errors produced by the JSON schema validation
   */
  schemaErrors: ErrorObject[];
}

/**
 * A JSON schema (structural) validation failure produced by AJV.
 */
export class SchemaValidationError extends WorkflowValidationError {
  /**
   * The raw AJV errors produced by the JSON schema validation. Each carries its own `instancePath`/`params`.
   */
  readonly schemaErrors: ErrorObject[];

  constructor(message: string, options: SchemaValidationErrorOptions) {
    super(message, options);
    this.name = 'SchemaValidationError';
    this.schemaErrors = options.schemaErrors;
    Object.setPrototypeOf(this, SchemaValidationError.prototype);
  }
}

/**
 * A DSL level (semantic) validation failure produced by a lifecycle hook, e.g. duplicate task names
 * or an unsupported DSL version.
 */
export class DslValidationError extends WorkflowValidationError {
  constructor(message: string, options: WorkflowValidationErrorOptions) {
    super(message, options);
    this.name = 'DslValidationError';
    Object.setPrototypeOf(this, DslValidationError.prototype);
  }
}
