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
 * Represents the intersection between the RetryPolicyJitter class and type
 */
export type RetryPolicyJitterIntersection = RetryPolicyJitter & Specification.RetryPolicyJitter;

/**
 * Represents a constructor for the intersection of the RetryPolicyJitter class and type
 */
export interface RetryPolicyJitterConstructor {
  new (model?: Partial<Specification.RetryPolicyJitter>): RetryPolicyJitterIntersection;
}

/**
 * Represents a RetryPolicyJitter with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RetryPolicyJitter extends ObjectHydrator<Specification.RetryPolicyJitter> {
  /**
   * Instanciates a new instance of the RetryPolicyJitter class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RetryPolicyJitter.
   */
  constructor(model?: Partial<Specification.RetryPolicyJitter>) {
    super(model);
    const self = this as unknown as Specification.RetryPolicyJitter & object;
    if (isObject(model)) {
      if (typeof model.from === 'object') self.from = new _Duration(model.from);
      if (typeof model.to === 'object') self.to = new _Duration(model.to);
    }
    getLifecycleHooks('RetryPolicyJitter')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RetryPolicyJitter.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new RetryPolicyJitter(this as any) as RetryPolicyJitterIntersection;
    validate('RetryPolicyJitter', copy, workflow);
  }

  /**
   * Normalizes the current instance of the RetryPolicyJitter.
   * Creates a copy of the RetryPolicyJitter, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RetryPolicyJitter instance.
   */
  normalize(): RetryPolicyJitter & Specification.RetryPolicyJitter {
    const copy = new RetryPolicyJitter(this as any) as RetryPolicyJitterIntersection;
    return getLifecycleHooks('RetryPolicyJitter')?.normalize?.(copy) || copy;
  }
}

export const _RetryPolicyJitter = RetryPolicyJitter as RetryPolicyJitterConstructor;
