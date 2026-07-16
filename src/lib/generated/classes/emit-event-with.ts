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
 * Represents the intersection between the EmitEventWith class and type
 */
export type EmitEventWithIntersection = EmitEventWith & Specification.EmitEventWith;

/**
 * Represents a constructor for the intersection of the EmitEventWith class and type
 */
export interface EmitEventWithConstructor {
  new (model?: Partial<Specification.EmitEventWith>): EmitEventWithIntersection;
}

/**
 * Represents a EmitEventWith with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EmitEventWith extends ObjectHydrator<Specification.EmitEventWith> {
  /**
   * Instanciates a new instance of the EmitEventWith class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EmitEventWith.
   */
  constructor(model?: Partial<Specification.EmitEventWith>) {
    super(model);

    getLifecycleHooks('EmitEventWith')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EmitEventWith.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EmitEventWith(this as any) as EmitEventWithIntersection;
    validate('EmitEventWith', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EmitEventWith.
   * Creates a copy of the EmitEventWith, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EmitEventWith instance.
   */
  normalize(): EmitEventWith & Specification.EmitEventWith {
    const copy = new EmitEventWith(this as any) as EmitEventWithIntersection;
    return getLifecycleHooks('EmitEventWith')?.normalize?.(copy) || copy;
  }
}

export const _EmitEventWith = EmitEventWith as EmitEventWithConstructor;
