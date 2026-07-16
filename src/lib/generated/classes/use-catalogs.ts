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

import { _Catalog } from './catalog';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the UseCatalogs class and type
 */
export type UseCatalogsIntersection = UseCatalogs & Specification.UseCatalogs;

/**
 * Represents a constructor for the intersection of the UseCatalogs class and type
 */
export interface UseCatalogsConstructor {
  new (model?: Partial<Specification.UseCatalogs>): UseCatalogsIntersection;
}

/**
 * Represents a UseCatalogs with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class UseCatalogs extends ObjectHydrator<Specification.UseCatalogs> {
  /**
   * Instanciates a new instance of the UseCatalogs class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the UseCatalogs.
   */
  constructor(model?: Partial<Specification.UseCatalogs>) {
    super(model);
    const self = this as unknown as Specification.UseCatalogs & object;
    if (isObject(model)) {
      const knownProperties: string[] = [];
      Object.entries(model)
        .filter(([key]) => !knownProperties.includes(key))
        .forEach(([key, value]) => {
          self[key] = new _Catalog(value);
        });
    }
    getLifecycleHooks('UseCatalogs')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the UseCatalogs.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new UseCatalogs(this as any) as UseCatalogsIntersection;
    validate('UseCatalogs', copy, workflow);
  }

  /**
   * Normalizes the current instance of the UseCatalogs.
   * Creates a copy of the UseCatalogs, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the UseCatalogs instance.
   */
  normalize(): UseCatalogs & Specification.UseCatalogs {
    const copy = new UseCatalogs(this as any) as UseCatalogsIntersection;
    return getLifecycleHooks('UseCatalogs')?.normalize?.(copy) || copy;
  }
}

export const _UseCatalogs = UseCatalogs as UseCatalogsConstructor;
