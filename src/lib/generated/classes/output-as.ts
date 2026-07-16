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
 * Represents the intersection between the OutputAs class and type
 */
export type OutputAsIntersection = OutputAs & Specification.OutputAs;

/**
 * Represents a constructor for the intersection of the OutputAs class and type
 */
export interface OutputAsConstructor {
  new (model?: Partial<Specification.OutputAs>): OutputAsIntersection;
}

/**
 * Represents a OutputAs with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OutputAs extends ObjectHydrator<Specification.OutputAs> {
  /**
   * Instanciates a new instance of the OutputAs class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OutputAs.
   */
  constructor(model?: Partial<Specification.OutputAs>) {
    super(model);

    getLifecycleHooks('OutputAs')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OutputAs.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OutputAs(this as any) as OutputAsIntersection;
    validate('OutputAs', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OutputAs.
   * Creates a copy of the OutputAs, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OutputAs instance.
   */
  normalize(): OutputAs & Specification.OutputAs {
    const copy = new OutputAs(this as any) as OutputAsIntersection;
    return getLifecycleHooks('OutputAs')?.normalize?.(copy) || copy;
  }
}

export const _OutputAs = OutputAs as OutputAsConstructor;
