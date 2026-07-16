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

import { _UseAuthentications } from './use-authentications';
import { _UseErrors } from './use-errors';
import { _UseExtensions } from './use-extensions';
import { _UseFunctions } from './use-functions';
import { _UseRetries } from './use-retries';
import { _UseTimeouts } from './use-timeouts';
import { _UseCatalogs } from './use-catalogs';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Use class and type
 */
export type UseIntersection = Use & Specification.Use;

/**
 * Represents a constructor for the intersection of the Use class and type
 */
export interface UseConstructor {
  new (model?: Partial<Specification.Use>): UseIntersection;
}

/**
 * Represents a Use with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Use extends ObjectHydrator<Specification.Use> {
  /**
   * Instanciates a new instance of the Use class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Use.
   */
  constructor(model?: Partial<Specification.Use>) {
    super(model);
    const self = this as unknown as Specification.Use & object;
    if (isObject(model)) {
      if (typeof model.authentications === 'object')
        self.authentications = new _UseAuthentications(model.authentications);
      if (typeof model.errors === 'object') self.errors = new _UseErrors(model.errors);
      if (typeof model.extensions === 'object') self.extensions = new _UseExtensions(model.extensions);
      if (typeof model.functions === 'object') self.functions = new _UseFunctions(model.functions);
      if (typeof model.retries === 'object') self.retries = new _UseRetries(model.retries);
      if (typeof model.timeouts === 'object') self.timeouts = new _UseTimeouts(model.timeouts);
      if (typeof model.catalogs === 'object') self.catalogs = new _UseCatalogs(model.catalogs);
    }
    getLifecycleHooks('Use')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Use.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Use(this as any) as UseIntersection;
    validate('Use', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Use.
   * Creates a copy of the Use, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Use instance.
   */
  normalize(): Use & Specification.Use {
    const copy = new Use(this as any) as UseIntersection;
    return getLifecycleHooks('Use')?.normalize?.(copy) || copy;
  }
}

export const _Use = Use as UseConstructor;
