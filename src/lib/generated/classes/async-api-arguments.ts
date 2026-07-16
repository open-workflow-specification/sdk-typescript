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
 * Represents the intersection between the AsyncApiArguments class and type
 */
export type AsyncApiArgumentsIntersection = AsyncApiArguments & Specification.AsyncApiArguments;

/**
 * Represents a constructor for the intersection of the AsyncApiArguments class and type
 */
export interface AsyncApiArgumentsConstructor {
  new (model?: Partial<Specification.AsyncApiArguments>): AsyncApiArgumentsIntersection;
}

/**
 * Represents a AsyncApiArguments with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class AsyncApiArguments extends ObjectHydrator<Specification.AsyncApiArguments> {
  /**
   * Instanciates a new instance of the AsyncApiArguments class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the AsyncApiArguments.
   */
  constructor(model?: Partial<Specification.AsyncApiArguments>) {
    super(model);

    getLifecycleHooks('AsyncApiArguments')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the AsyncApiArguments.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new AsyncApiArguments(this as any) as AsyncApiArgumentsIntersection;
    validate('AsyncApiArguments', copy, workflow);
  }

  /**
   * Normalizes the current instance of the AsyncApiArguments.
   * Creates a copy of the AsyncApiArguments, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the AsyncApiArguments instance.
   */
  normalize(): AsyncApiArguments & Specification.AsyncApiArguments {
    const copy = new AsyncApiArguments(this as any) as AsyncApiArgumentsIntersection;
    return getLifecycleHooks('AsyncApiArguments')?.normalize?.(copy) || copy;
  }
}

export const _AsyncApiArguments = AsyncApiArguments as AsyncApiArgumentsConstructor;
