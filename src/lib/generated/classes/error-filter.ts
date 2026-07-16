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
 * Represents the intersection between the ErrorFilter class and type
 */
export type ErrorFilterIntersection = ErrorFilter & Specification.ErrorFilter;

/**
 * Represents a constructor for the intersection of the ErrorFilter class and type
 */
export interface ErrorFilterConstructor {
  new (model?: Partial<Specification.ErrorFilter>): ErrorFilterIntersection;
}

/**
 * Represents a ErrorFilter with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ErrorFilter extends ObjectHydrator<Specification.ErrorFilter> {
  /**
   * Instanciates a new instance of the ErrorFilter class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ErrorFilter.
   */
  constructor(model?: Partial<Specification.ErrorFilter>) {
    super(model);

    getLifecycleHooks('ErrorFilter')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ErrorFilter.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ErrorFilter(this as any) as ErrorFilterIntersection;
    validate('ErrorFilter', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ErrorFilter.
   * Creates a copy of the ErrorFilter, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ErrorFilter instance.
   */
  normalize(): ErrorFilter & Specification.ErrorFilter {
    const copy = new ErrorFilter(this as any) as ErrorFilterIntersection;
    return getLifecycleHooks('ErrorFilter')?.normalize?.(copy) || copy;
  }
}

export const _ErrorFilter = ErrorFilter as ErrorFilterConstructor;
