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
import { _TaskBase } from './task-base';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the CallAsyncAPI class and type
 */
export type CallAsyncAPIIntersection = CallAsyncAPI & Specification.CallAsyncAPI;

/**
 * Represents a constructor for the intersection of the CallAsyncAPI class and type
 */
export interface CallAsyncAPIConstructor {
  new (model?: Partial<Specification.CallAsyncAPI>): CallAsyncAPIIntersection;
}

/**
 * Represents a CallAsyncAPI with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CallAsyncAPI extends _TaskBase {
  /**
   * Instanciates a new instance of the CallAsyncAPI class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CallAsyncAPI.
   */
  constructor(model?: Partial<Specification.CallAsyncAPI>) {
    super(model);
    const self = this as unknown as Specification.CallAsyncAPI & object;
    if (isObject(model)) {
      self.call = 'asyncapi' as const;
      if (typeof model.input === 'object') self.input = new _Input(model.input);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.export === 'object') self.export = new _Export(model.export);
      if (typeof model.timeout === 'object') self.timeout = new _TaskTimeout(model.timeout);
      if (typeof model.metadata === 'object') self.metadata = new _TaskMetadata(model.metadata);
    }
    getLifecycleHooks('CallAsyncAPI')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CallAsyncAPI.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new CallAsyncAPI(this as any) as CallAsyncAPIIntersection;
    validate('CallAsyncAPI', copy, workflow);
  }

  /**
   * Normalizes the current instance of the CallAsyncAPI.
   * Creates a copy of the CallAsyncAPI, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CallAsyncAPI instance.
   */
  normalize(): CallAsyncAPI & Specification.CallAsyncAPI {
    const copy = new CallAsyncAPI(this as any) as CallAsyncAPIIntersection;
    return getLifecycleHooks('CallAsyncAPI')?.normalize?.(copy) || copy;
  }
}

export const _CallAsyncAPI = CallAsyncAPI as CallAsyncAPIConstructor;
