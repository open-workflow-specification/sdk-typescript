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
 * Represents the intersection between the ErrorInstance class and type
 */
export type ErrorInstanceIntersection = ErrorInstance & Specification.ErrorInstance;

/**
 * Represents a constructor for the intersection of the ErrorInstance class and type
 */
export interface ErrorInstanceConstructor {
  new (model?: Partial<Specification.ErrorInstance>): ErrorInstanceIntersection;
}

/**
 * Represents a ErrorInstance with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ErrorInstance extends ObjectHydrator<Specification.ErrorInstance> {
  /**
   * Instanciates a new instance of the ErrorInstance class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ErrorInstance.
   */
  constructor(model?: Partial<Specification.ErrorInstance>) {
    super(model);

    getLifecycleHooks('ErrorInstance')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ErrorInstance.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ErrorInstance(this as any) as ErrorInstanceIntersection;
    validate('ErrorInstance', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ErrorInstance.
   * Creates a copy of the ErrorInstance, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ErrorInstance instance.
   */
  normalize(): ErrorInstance & Specification.ErrorInstance {
    const copy = new ErrorInstance(this as any) as ErrorInstanceIntersection;
    return getLifecycleHooks('ErrorInstance')?.normalize?.(copy) || copy;
  }
}

export const _ErrorInstance = ErrorInstance as ErrorInstanceConstructor;
