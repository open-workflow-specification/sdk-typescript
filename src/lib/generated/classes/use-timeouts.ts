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

import { _Timeout } from './timeout';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the UseTimeouts class and type
 */
export type UseTimeoutsIntersection = UseTimeouts & Specification.UseTimeouts;

/**
 * Represents a constructor for the intersection of the UseTimeouts class and type
 */
export interface UseTimeoutsConstructor {
  new (model?: Partial<Specification.UseTimeouts>): UseTimeoutsIntersection;
}

/**
 * Represents a UseTimeouts with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class UseTimeouts extends ObjectHydrator<Specification.UseTimeouts> {
  /**
   * Instanciates a new instance of the UseTimeouts class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the UseTimeouts.
   */
  constructor(model?: Partial<Specification.UseTimeouts>) {
    super(model);
    const self = this as unknown as Specification.UseTimeouts & object;
    if (isObject(model)) {
      const knownProperties: string[] = [];
      Object.entries(model)
        .filter(([key]) => !knownProperties.includes(key))
        .forEach(([key, value]) => {
          self[key] = new _Timeout(value);
        });
    }
    getLifecycleHooks('UseTimeouts')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the UseTimeouts.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new UseTimeouts(this as any) as UseTimeoutsIntersection;
    validate('UseTimeouts', copy, workflow);
  }

  /**
   * Normalizes the current instance of the UseTimeouts.
   * Creates a copy of the UseTimeouts, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the UseTimeouts instance.
   */
  normalize(): UseTimeouts & Specification.UseTimeouts {
    const copy = new UseTimeouts(this as any) as UseTimeoutsIntersection;
    return getLifecycleHooks('UseTimeouts')?.normalize?.(copy) || copy;
  }
}

export const _UseTimeouts = UseTimeouts as UseTimeoutsConstructor;
