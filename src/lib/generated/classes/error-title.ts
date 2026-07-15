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
 * Represents the intersection between the ErrorTitle class and type
 */
export type ErrorTitleIntersection = ErrorTitle & Specification.ErrorTitle;

/**
 * Represents a constructor for the intersection of the ErrorTitle class and type
 */
export interface ErrorTitleConstructor {
  new (model?: Partial<Specification.ErrorTitle>): ErrorTitleIntersection;
}

/**
 * Represents a ErrorTitle with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ErrorTitle extends ObjectHydrator<Specification.ErrorTitle> {
  /**
   * Instanciates a new instance of the ErrorTitle class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ErrorTitle.
   */
  constructor(model?: Partial<Specification.ErrorTitle>) {
    super(model);

    getLifecycleHooks('ErrorTitle')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ErrorTitle.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ErrorTitle(this as any) as ErrorTitleIntersection;
    validate('ErrorTitle', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ErrorTitle.
   * Creates a copy of the ErrorTitle, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ErrorTitle instance.
   */
  normalize(): ErrorTitle & Specification.ErrorTitle {
    const copy = new ErrorTitle(this as any) as ErrorTitleIntersection;
    return getLifecycleHooks('ErrorTitle')?.normalize?.(copy) || copy;
  }
}

export const _ErrorTitle = ErrorTitle as ErrorTitleConstructor;
