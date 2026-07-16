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

import { _Error } from './error';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the UseErrors class and type
 */
export type UseErrorsIntersection = UseErrors & Specification.UseErrors;

/**
 * Represents a constructor for the intersection of the UseErrors class and type
 */
export interface UseErrorsConstructor {
  new (model?: Partial<Specification.UseErrors>): UseErrorsIntersection;
}

/**
 * Represents a UseErrors with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class UseErrors extends ObjectHydrator<Specification.UseErrors> {
  /**
   * Instanciates a new instance of the UseErrors class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the UseErrors.
   */
  constructor(model?: Partial<Specification.UseErrors>) {
    super(model);
    const self = this as unknown as Specification.UseErrors & object;
    if (isObject(model)) {
      const knownProperties: string[] = [];
      Object.entries(model)
        .filter(([key]) => !knownProperties.includes(key))
        .forEach(([key, value]) => {
          self[key] = new _Error(value);
        });
    }
    getLifecycleHooks('UseErrors')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the UseErrors.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new UseErrors(this as any) as UseErrorsIntersection;
    validate('UseErrors', copy, workflow);
  }

  /**
   * Normalizes the current instance of the UseErrors.
   * Creates a copy of the UseErrors, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the UseErrors instance.
   */
  normalize(): UseErrors & Specification.UseErrors {
    const copy = new UseErrors(this as any) as UseErrorsIntersection;
    return getLifecycleHooks('UseErrors')?.normalize?.(copy) || copy;
  }
}

export const _UseErrors = UseErrors as UseErrorsConstructor;
