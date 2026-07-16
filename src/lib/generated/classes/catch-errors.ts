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

import { _ErrorFilter } from './error-filter';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the CatchErrors class and type
 */
export type CatchErrorsIntersection = CatchErrors & Specification.CatchErrors;

/**
 * Represents a constructor for the intersection of the CatchErrors class and type
 */
export interface CatchErrorsConstructor {
  new (model?: Partial<Specification.CatchErrors>): CatchErrorsIntersection;
}

/**
 * Represents a CatchErrors with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CatchErrors extends ObjectHydrator<Specification.CatchErrors> {
  /**
   * Instanciates a new instance of the CatchErrors class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CatchErrors.
   */
  constructor(model?: Partial<Specification.CatchErrors>) {
    super(model);
    const self = this as unknown as Specification.CatchErrors & object;
    if (isObject(model)) {
      if (typeof model.with === 'object') self.with = new _ErrorFilter(model.with);
    }
    getLifecycleHooks('CatchErrors')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CatchErrors.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new CatchErrors(this as any) as CatchErrorsIntersection;
    validate('CatchErrors', copy, workflow);
  }

  /**
   * Normalizes the current instance of the CatchErrors.
   * Creates a copy of the CatchErrors, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CatchErrors instance.
   */
  normalize(): CatchErrors & Specification.CatchErrors {
    const copy = new CatchErrors(this as any) as CatchErrorsIntersection;
    return getLifecycleHooks('CatchErrors')?.normalize?.(copy) || copy;
  }
}

export const _CatchErrors = CatchErrors as CatchErrorsConstructor;
