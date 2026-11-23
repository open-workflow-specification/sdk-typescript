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
 * Represents the intersection between the Evaluate class and type
 */
export type EvaluateIntersection = Evaluate & Specification.Evaluate;

/**
 * Represents a constructor for the intersection of the Evaluate class and type
 */
export interface EvaluateConstructor {
  new (model?: Partial<Specification.Evaluate>): EvaluateIntersection;
}

/**
 * Represents a Evaluate with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Evaluate extends ObjectHydrator<Specification.Evaluate> {
  /**
   * Instantiates a new instance of the Evaluate class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Evaluate.
   */
  constructor(model?: Partial<Specification.Evaluate>) {
    super(model);

    getLifecycleHooks('Evaluate')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Evaluate.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Evaluate(this as any) as EvaluateIntersection;
    validate('Evaluate', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Evaluate.
   * Creates a copy of the Evaluate, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Evaluate instance.
   */
  normalize(): Evaluate & Specification.Evaluate {
    const copy = new Evaluate(this as any) as EvaluateIntersection;
    return getLifecycleHooks('Evaluate')?.normalize?.(copy) || copy;
  }
}

export const _Evaluate = Evaluate as EvaluateConstructor;
