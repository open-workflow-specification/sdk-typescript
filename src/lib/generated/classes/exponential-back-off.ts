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
 * Represents the intersection between the ExponentialBackOff class and type
 */
export type ExponentialBackOffIntersection = ExponentialBackOff & Specification.ExponentialBackOff;

/**
 * Represents a constructor for the intersection of the ExponentialBackOff class and type
 */
export interface ExponentialBackOffConstructor {
  new (model?: Partial<Specification.ExponentialBackOff>): ExponentialBackOffIntersection;
}

/**
 * Represents a ExponentialBackOff with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ExponentialBackOff extends ObjectHydrator<Specification.ExponentialBackOff> {
  /**
   * Instanciates a new instance of the ExponentialBackOff class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ExponentialBackOff.
   */
  constructor(model?: Partial<Specification.ExponentialBackOff>) {
    super(model);

    getLifecycleHooks('ExponentialBackOff')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ExponentialBackOff.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ExponentialBackOff(this as any) as ExponentialBackOffIntersection;
    validate('ExponentialBackOff', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ExponentialBackOff.
   * Creates a copy of the ExponentialBackOff, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ExponentialBackOff instance.
   */
  normalize(): ExponentialBackOff & Specification.ExponentialBackOff {
    const copy = new ExponentialBackOff(this as any) as ExponentialBackOffIntersection;
    return getLifecycleHooks('ExponentialBackOff')?.normalize?.(copy) || copy;
  }
}

export const _ExponentialBackOff = ExponentialBackOff as ExponentialBackOffConstructor;
