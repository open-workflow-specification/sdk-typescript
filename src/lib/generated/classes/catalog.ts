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

import { _Endpoint } from './endpoint';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Catalog class and type
 */
export type CatalogIntersection = Catalog & Specification.Catalog;

/**
 * Represents a constructor for the intersection of the Catalog class and type
 */
export interface CatalogConstructor {
  new (model?: Partial<Specification.Catalog>): CatalogIntersection;
}

/**
 * Represents a Catalog with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Catalog extends ObjectHydrator<Specification.Catalog> {
  /**
   * Instanciates a new instance of the Catalog class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Catalog.
   */
  constructor(model?: Partial<Specification.Catalog>) {
    super(model);
    const self = this as unknown as Specification.Catalog & object;
    if (isObject(model)) {
      if (typeof model.endpoint === 'object') self.endpoint = new _Endpoint(model.endpoint);
    }
    getLifecycleHooks('Catalog')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Catalog.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Catalog(this as any) as CatalogIntersection;
    validate('Catalog', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Catalog.
   * Creates a copy of the Catalog, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Catalog instance.
   */
  normalize(): Catalog & Specification.Catalog {
    const copy = new Catalog(this as any) as CatalogIntersection;
    return getLifecycleHooks('Catalog')?.normalize?.(copy) || copy;
  }
}

export const _Catalog = Catalog as CatalogConstructor;
