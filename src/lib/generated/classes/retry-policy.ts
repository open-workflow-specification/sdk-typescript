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
 * Represents the intersection between the RetryPolicy class and type
 */
export type RetryPolicyIntersection = RetryPolicy & Specification.RetryPolicy;

/**
 * Represents a constructor for the intersection of the RetryPolicy class and type
 */
export interface RetryPolicyConstructor {
  new (model?: Partial<Specification.RetryPolicy>): RetryPolicyIntersection;
}

/**
 * Represents a RetryPolicy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RetryPolicy extends ObjectHydrator<Specification.RetryPolicy> {
  /**
   * Instanciates a new instance of the RetryPolicy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RetryPolicy.
   */
  constructor(model?: Partial<Specification.RetryPolicy>) {
    super(model);
    const self = this as unknown as Specification.RetryPolicy & object;
    if (isObject(model)) {
      if (typeof model.delay === 'object') self.delay = new _Duration(model.delay);
      if (typeof model.backoff === 'object') self.backoff = new _RetryBackoff(model.backoff);
      if (typeof model.limit === 'object') self.limit = new _RetryLimit(model.limit);
      if (typeof model.jitter === 'object') self.jitter = new _RetryPolicyJitter(model.jitter);
    }
    getLifecycleHooks('RetryPolicy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RetryPolicy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new RetryPolicy(this as any) as RetryPolicyIntersection;
    validate('RetryPolicy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the RetryPolicy.
   * Creates a copy of the RetryPolicy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RetryPolicy instance.
   */
  normalize(): RetryPolicy & Specification.RetryPolicy {
    const copy = new RetryPolicy(this as any) as RetryPolicyIntersection;
    return getLifecycleHooks('RetryPolicy')?.normalize?.(copy) || copy;
  }
}

export const _RetryPolicy = RetryPolicy as RetryPolicyConstructor;
