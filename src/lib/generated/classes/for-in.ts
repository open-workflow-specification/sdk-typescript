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
 * Represents the intersection between the ForIn class and type
 */
export type ForInIntersection = ForIn & Specification.ForIn;

/**
 * Represents a constructor for the intersection of the ForIn class and type
 */
export interface ForInConstructor {
  new (model?: Partial<Specification.ForIn>): ForInIntersection;
}

/**
 * Represents a ForIn with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ForIn extends ObjectHydrator<Specification.ForIn> {
  /**
   * Instantiates a new instance of the ForIn class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ForIn.
   */
  constructor(model?: Partial<Specification.ForIn>) {
    super(model);

    getLifecycleHooks('ForIn')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ForIn.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ForIn(this as any) as ForInIntersection;
    validate('ForIn', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ForIn.
   * Creates a copy of the ForIn, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ForIn instance.
   */
  normalize(): ForIn & Specification.ForIn {
    const copy = new ForIn(this as any) as ForInIntersection;
    return getLifecycleHooks('ForIn')?.normalize?.(copy) || copy;
  }
}

export const _ForIn = ForIn as ForInConstructor;
