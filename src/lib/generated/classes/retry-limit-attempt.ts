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

import { _Duration } from './duration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RetryLimitAttempt class and type
 */
export type RetryLimitAttemptIntersection = RetryLimitAttempt & Specification.RetryLimitAttempt;

/**
 * Represents a constructor for the intersection of the RetryLimitAttempt class and type
 */
export interface RetryLimitAttemptConstructor {
  new (model?: Partial<Specification.RetryLimitAttempt>): RetryLimitAttemptIntersection;
}

/**
 * Represents a RetryLimitAttempt with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RetryLimitAttempt extends ObjectHydrator<Specification.RetryLimitAttempt> {
  /**
   * Instanciates a new instance of the RetryLimitAttempt class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RetryLimitAttempt.
   */
  constructor(model?: Partial<Specification.RetryLimitAttempt>) {
    super(model);
    const self = this as unknown as Specification.RetryLimitAttempt & object;
    if (isObject(model)) {
      if (typeof model.duration === 'object') self.duration = new _Duration(model.duration);
    }
    getLifecycleHooks('RetryLimitAttempt')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RetryLimitAttempt.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new RetryLimitAttempt(this as any) as RetryLimitAttemptIntersection;
    validate('RetryLimitAttempt', copy, workflow);
  }

  /**
   * Normalizes the current instance of the RetryLimitAttempt.
   * Creates a copy of the RetryLimitAttempt, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RetryLimitAttempt instance.
   */
  normalize(): RetryLimitAttempt & Specification.RetryLimitAttempt {
    const copy = new RetryLimitAttempt(this as any) as RetryLimitAttemptIntersection;
    return getLifecycleHooks('RetryLimitAttempt')?.normalize?.(copy) || copy;
  }
}

export const _RetryLimitAttempt = RetryLimitAttempt as RetryLimitAttemptConstructor;
