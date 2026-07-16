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
 * Represents the intersection between the SubflowInput class and type
 */
export type SubflowInputIntersection = SubflowInput & Specification.SubflowInput;

/**
 * Represents a constructor for the intersection of the SubflowInput class and type
 */
export interface SubflowInputConstructor {
  new (model?: Partial<Specification.SubflowInput>): SubflowInputIntersection;
}

/**
 * Represents a SubflowInput with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class SubflowInput extends ObjectHydrator<Specification.SubflowInput> {
  /**
   * Instanciates a new instance of the SubflowInput class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the SubflowInput.
   */
  constructor(model?: Partial<Specification.SubflowInput>) {
    super(model);

    getLifecycleHooks('SubflowInput')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the SubflowInput.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new SubflowInput(this as any) as SubflowInputIntersection;
    validate('SubflowInput', copy, workflow);
  }

  /**
   * Normalizes the current instance of the SubflowInput.
   * Creates a copy of the SubflowInput, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the SubflowInput instance.
   */
  normalize(): SubflowInput & Specification.SubflowInput {
    const copy = new SubflowInput(this as any) as SubflowInputIntersection;
    return getLifecycleHooks('SubflowInput')?.normalize?.(copy) || copy;
  }
}

export const _SubflowInput = SubflowInput as SubflowInputConstructor;
