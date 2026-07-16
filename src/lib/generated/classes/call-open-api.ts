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

/*****************************************************************************************
 *
 * /!\ This file is computer generated. Any manual modification can and will be lost. /!\
 *
 *****************************************************************************************/

import { _Input } from './input';
import { _Output } from './output';
import { _Export } from './export';
import { _TaskTimeout } from './task-timeout';
import { _TaskMetadata } from './task-metadata';
import { _OpenAPIArguments } from './open-api-arguments';
import { _TaskBase } from './task-base';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the CallOpenAPI class and type
 */
export type CallOpenAPIIntersection = CallOpenAPI & Specification.CallOpenAPI;

/**
 * Represents a constructor for the intersection of the CallOpenAPI class and type
 */
export interface CallOpenAPIConstructor {
  new (model?: Partial<Specification.CallOpenAPI>): CallOpenAPIIntersection;
}

/**
 * Represents a CallOpenAPI with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CallOpenAPI extends _TaskBase {
  /**
   * Instanciates a new instance of the CallOpenAPI class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CallOpenAPI.
   */
  constructor(model?: Partial<Specification.CallOpenAPI>) {
    super(model);
    const self = this as unknown as Specification.CallOpenAPI & object;
    if (isObject(model)) {
      self.call = 'openapi' as const;
      if (typeof model.input === 'object') self.input = new _Input(model.input);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.export === 'object') self.export = new _Export(model.export);
      if (typeof model.timeout === 'object') self.timeout = new _TaskTimeout(model.timeout);
      if (typeof model.metadata === 'object') self.metadata = new _TaskMetadata(model.metadata);
      if (typeof model.with === 'object') self.with = new _OpenAPIArguments(model.with);
    }
    getLifecycleHooks('CallOpenAPI')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CallOpenAPI.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new CallOpenAPI(this as any) as CallOpenAPIIntersection;
    validate('CallOpenAPI', copy, workflow);
  }

  /**
   * Normalizes the current instance of the CallOpenAPI.
   * Creates a copy of the CallOpenAPI, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CallOpenAPI instance.
   */
  normalize(): CallOpenAPI & Specification.CallOpenAPI {
    const copy = new CallOpenAPI(this as any) as CallOpenAPIIntersection;
    return getLifecycleHooks('CallOpenAPI')?.normalize?.(copy) || copy;
  }
}

export const _CallOpenAPI = CallOpenAPI as CallOpenAPIConstructor;
