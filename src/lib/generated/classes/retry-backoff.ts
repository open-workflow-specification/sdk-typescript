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

import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';

/**
 * Represents the intersection between the RetryBackoff class and type
 */
export type RetryBackoffIntersection = RetryBackoff & Specification.RetryBackoff;

/**
 * Represents a constructor for the intersection of the RetryBackoff class and type
 */
export interface RetryBackoffConstructor {
  new (model?: Partial<Specification.RetryBackoff>): RetryBackoffIntersection;
}

/**
 * Represents a RetryBackoff with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RetryBackoff extends ObjectHydrator<Specification.RetryBackoff> {
  /**
   * Instanciates a new instance of the RetryBackoff class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RetryBackoff.
   */
  constructor(model?: Partial<Specification.RetryBackoff>) {
    super(model);

    getLifecycleHooks('RetryBackoff')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RetryBackoff.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new RetryBackoff(this as any) as RetryBackoffIntersection;
    validate('RetryBackoff', copy, workflow);
  }

  /**
   * Normalizes the current instance of the RetryBackoff.
   * Creates a copy of the RetryBackoff, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RetryBackoff instance.
   */
  normalize(): RetryBackoff & Specification.RetryBackoff {
    const copy = new RetryBackoff(this as any) as RetryBackoffIntersection;
    return getLifecycleHooks('RetryBackoff')?.normalize?.(copy) || copy;
  }
}

export const _RetryBackoff = RetryBackoff as RetryBackoffConstructor;
