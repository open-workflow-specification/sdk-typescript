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

import { _Task } from './task';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the UseFunctions class and type
 */
export type UseFunctionsIntersection = UseFunctions & Specification.UseFunctions;

/**
 * Represents a constructor for the intersection of the UseFunctions class and type
 */
export interface UseFunctionsConstructor {
  new (model?: Partial<Specification.UseFunctions>): UseFunctionsIntersection;
}

/**
 * Represents a UseFunctions with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class UseFunctions extends ObjectHydrator<Specification.UseFunctions> {
  /**
   * Instanciates a new instance of the UseFunctions class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the UseFunctions.
   */
  constructor(model?: Partial<Specification.UseFunctions>) {
    super(model);
    const self = this as unknown as Specification.UseFunctions & object;
    if (isObject(model)) {
      const knownProperties: string[] = [];
      Object.entries(model)
        .filter(([key]) => !knownProperties.includes(key))
        .forEach(([key, value]) => {
          self[key] = new _Task(value);
        });
    }
    getLifecycleHooks('UseFunctions')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the UseFunctions.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new UseFunctions(this as any) as UseFunctionsIntersection;
    validate('UseFunctions', copy, workflow);
  }

  /**
   * Normalizes the current instance of the UseFunctions.
   * Creates a copy of the UseFunctions, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the UseFunctions instance.
   */
  normalize(): UseFunctions & Specification.UseFunctions {
    const copy = new UseFunctions(this as any) as UseFunctionsIntersection;
    return getLifecycleHooks('UseFunctions')?.normalize?.(copy) || copy;
  }
}

export const _UseFunctions = UseFunctions as UseFunctionsConstructor;
