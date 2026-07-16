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

import { _AuthenticationPolicy } from './authentication-policy';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the UseAuthentications class and type
 */
export type UseAuthenticationsIntersection = UseAuthentications & Specification.UseAuthentications;

/**
 * Represents a constructor for the intersection of the UseAuthentications class and type
 */
export interface UseAuthenticationsConstructor {
  new (model?: Partial<Specification.UseAuthentications>): UseAuthenticationsIntersection;
}

/**
 * Represents a UseAuthentications with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class UseAuthentications extends ObjectHydrator<Specification.UseAuthentications> {
  /**
   * Instanciates a new instance of the UseAuthentications class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the UseAuthentications.
   */
  constructor(model?: Partial<Specification.UseAuthentications>) {
    super(model);
    const self = this as unknown as Specification.UseAuthentications & object;
    if (isObject(model)) {
      const knownProperties: string[] = [];
      Object.entries(model)
        .filter(([key]) => !knownProperties.includes(key))
        .forEach(([key, value]) => {
          self[key] = new _AuthenticationPolicy(value);
        });
    }
    getLifecycleHooks('UseAuthentications')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the UseAuthentications.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new UseAuthentications(this as any) as UseAuthenticationsIntersection;
    validate('UseAuthentications', copy, workflow);
  }

  /**
   * Normalizes the current instance of the UseAuthentications.
   * Creates a copy of the UseAuthentications, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the UseAuthentications instance.
   */
  normalize(): UseAuthentications & Specification.UseAuthentications {
    const copy = new UseAuthentications(this as any) as UseAuthenticationsIntersection;
    return getLifecycleHooks('UseAuthentications')?.normalize?.(copy) || copy;
  }
}

export const _UseAuthentications = UseAuthentications as UseAuthenticationsConstructor;
