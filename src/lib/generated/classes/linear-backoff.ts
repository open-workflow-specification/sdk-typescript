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
 * Represents the intersection between the LinearBackoff class and type
 */
export type LinearBackoffIntersection = LinearBackoff & Specification.LinearBackoff;

/**
 * Represents a constructor for the intersection of the LinearBackoff class and type
 */
export interface LinearBackoffConstructor {
  new (model?: Partial<Specification.LinearBackoff>): LinearBackoffIntersection;
}

/**
 * Represents a LinearBackoff with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class LinearBackoff extends ObjectHydrator<Specification.LinearBackoff> {
  /**
   * Instanciates a new instance of the LinearBackoff class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the LinearBackoff.
   */
  constructor(model?: Partial<Specification.LinearBackoff>) {
    super(model);

    getLifecycleHooks('LinearBackoff')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the LinearBackoff.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new LinearBackoff(this as any) as LinearBackoffIntersection;
    validate('LinearBackoff', copy, workflow);
  }

  /**
   * Normalizes the current instance of the LinearBackoff.
   * Creates a copy of the LinearBackoff, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the LinearBackoff instance.
   */
  normalize(): LinearBackoff & Specification.LinearBackoff {
    const copy = new LinearBackoff(this as any) as LinearBackoffIntersection;
    return getLifecycleHooks('LinearBackoff')?.normalize?.(copy) || copy;
  }
}

export const _LinearBackoff = LinearBackoff as LinearBackoffConstructor;
