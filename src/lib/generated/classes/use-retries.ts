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

import { _RetryPolicy } from './retry-policy';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the UseRetries class and type
 */
export type UseRetriesIntersection = UseRetries & Specification.UseRetries;

/**
 * Represents a constructor for the intersection of the UseRetries class and type
 */
export interface UseRetriesConstructor {
  new (model?: Partial<Specification.UseRetries>): UseRetriesIntersection;
}

/**
 * Represents a UseRetries with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class UseRetries extends ObjectHydrator<Specification.UseRetries> {
  /**
   * Instanciates a new instance of the UseRetries class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the UseRetries.
   */
  constructor(model?: Partial<Specification.UseRetries>) {
    super(model);
    const self = this as unknown as Specification.UseRetries & object;
    if (isObject(model)) {
      const knownProperties: string[] = [];
      Object.entries(model)
        .filter(([key]) => !knownProperties.includes(key))
        .forEach(([key, value]) => {
          self[key] = new _RetryPolicy(value);
        });
    }
    getLifecycleHooks('UseRetries')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the UseRetries.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new UseRetries(this as any) as UseRetriesIntersection;
    validate('UseRetries', copy, workflow);
  }

  /**
   * Normalizes the current instance of the UseRetries.
   * Creates a copy of the UseRetries, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the UseRetries instance.
   */
  normalize(): UseRetries & Specification.UseRetries {
    const copy = new UseRetries(this as any) as UseRetriesIntersection;
    return getLifecycleHooks('UseRetries')?.normalize?.(copy) || copy;
  }
}

export const _UseRetries = UseRetries as UseRetriesConstructor;
