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

import { _RetryLimitAttempt } from './retry-limit-attempt';
import { _Duration } from './duration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RetryLimit class and type
 */
export type RetryLimitIntersection = RetryLimit & Specification.RetryLimit;

/**
 * Represents a constructor for the intersection of the RetryLimit class and type
 */
export interface RetryLimitConstructor {
  new (model?: Partial<Specification.RetryLimit>): RetryLimitIntersection;
}

/**
 * Represents a RetryLimit with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RetryLimit extends ObjectHydrator<Specification.RetryLimit> {
  /**
   * Instanciates a new instance of the RetryLimit class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RetryLimit.
   */
  constructor(model?: Partial<Specification.RetryLimit>) {
    super(model);
    const self = this as unknown as Specification.RetryLimit & object;
    if (isObject(model)) {
      if (typeof model.attempt === 'object') self.attempt = new _RetryLimitAttempt(model.attempt);
      if (typeof model.duration === 'object') self.duration = new _Duration(model.duration);
    }
    getLifecycleHooks('RetryLimit')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RetryLimit.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new RetryLimit(this as any) as RetryLimitIntersection;
    validate('RetryLimit', copy, workflow);
  }

  /**
   * Normalizes the current instance of the RetryLimit.
   * Creates a copy of the RetryLimit, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RetryLimit instance.
   */
  normalize(): RetryLimit & Specification.RetryLimit {
    const copy = new RetryLimit(this as any) as RetryLimitIntersection;
    return getLifecycleHooks('RetryLimit')?.normalize?.(copy) || copy;
  }
}

export const _RetryLimit = RetryLimit as RetryLimitConstructor;
