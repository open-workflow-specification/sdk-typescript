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
import { _RetryBackoff } from './retry-backoff';
import { _RetryLimit } from './retry-limit';
import { _RetryPolicyJitter } from './retry-policy-jitter';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the TryTaskCatchRetry class and type
 */
export type TryTaskCatchRetryIntersection = TryTaskCatchRetry & Specification.TryTaskCatchRetry;

/**
 * Represents a constructor for the intersection of the TryTaskCatchRetry class and type
 */
export interface TryTaskCatchRetryConstructor {
  new (model?: Partial<Specification.TryTaskCatchRetry>): TryTaskCatchRetryIntersection;
}

/**
 * Represents a TryTaskCatchRetry with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class TryTaskCatchRetry extends ObjectHydrator<Specification.TryTaskCatchRetry> {
  /**
   * Instanciates a new instance of the TryTaskCatchRetry class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the TryTaskCatchRetry.
   */
  constructor(model?: Partial<Specification.TryTaskCatchRetry>) {
    super(model);
    const self = this as unknown as Specification.TryTaskCatchRetry & object;
    if (isObject(model)) {
      if (typeof (model as Specification.RetryPolicy).delay === 'object')
        (self as Specification.RetryPolicy).delay = new _Duration(
          (model as Specification.RetryPolicy).delay as Specification.Duration,
        );
      if (typeof (model as Specification.RetryPolicy).backoff === 'object')
        (self as Specification.RetryPolicy).backoff = new _RetryBackoff(
          (model as Specification.RetryPolicy).backoff as Specification.RetryBackoff,
        );
      if (typeof (model as Specification.RetryPolicy).limit === 'object')
        (self as Specification.RetryPolicy).limit = new _RetryLimit(
          (model as Specification.RetryPolicy).limit as Specification.RetryLimit,
        );
      if (typeof (model as Specification.RetryPolicy).jitter === 'object')
        (self as Specification.RetryPolicy).jitter = new _RetryPolicyJitter(
          (model as Specification.RetryPolicy).jitter as Specification.RetryPolicyJitter,
        );
    }
    getLifecycleHooks('TryTaskCatchRetry')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the TryTaskCatchRetry.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new TryTaskCatchRetry(this as any) as TryTaskCatchRetryIntersection;
    validate('TryTaskCatchRetry', copy, workflow);
  }

  /**
   * Normalizes the current instance of the TryTaskCatchRetry.
   * Creates a copy of the TryTaskCatchRetry, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the TryTaskCatchRetry instance.
   */
  normalize(): TryTaskCatchRetry & Specification.TryTaskCatchRetry {
    const copy = new TryTaskCatchRetry(this as any) as TryTaskCatchRetryIntersection;
    return getLifecycleHooks('TryTaskCatchRetry')?.normalize?.(copy) || copy;
  }
}

export const _TryTaskCatchRetry = TryTaskCatchRetry as TryTaskCatchRetryConstructor;
