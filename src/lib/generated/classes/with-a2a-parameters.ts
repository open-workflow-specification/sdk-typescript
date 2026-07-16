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
 * Represents the intersection between the WithA2AParameters class and type
 */
export type WithA2AParametersIntersection = WithA2AParameters & Specification.WithA2AParameters;

/**
 * Represents a constructor for the intersection of the WithA2AParameters class and type
 */
export interface WithA2AParametersConstructor {
  new (model?: Partial<Specification.WithA2AParameters>): WithA2AParametersIntersection;
}

/**
 * Represents a WithA2AParameters with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class WithA2AParameters extends ObjectHydrator<Specification.WithA2AParameters> {
  /**
   * Instanciates a new instance of the WithA2AParameters class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the WithA2AParameters.
   */
  constructor(model?: Partial<Specification.WithA2AParameters>) {
    super(model);

    getLifecycleHooks('WithA2AParameters')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the WithA2AParameters.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new WithA2AParameters(this as any) as WithA2AParametersIntersection;
    validate('WithA2AParameters', copy, workflow);
  }

  /**
   * Normalizes the current instance of the WithA2AParameters.
   * Creates a copy of the WithA2AParameters, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the WithA2AParameters instance.
   */
  normalize(): WithA2AParameters & Specification.WithA2AParameters {
    const copy = new WithA2AParameters(this as any) as WithA2AParametersIntersection;
    return getLifecycleHooks('WithA2AParameters')?.normalize?.(copy) || copy;
  }
}

export const _WithA2AParameters = WithA2AParameters as WithA2AParametersConstructor;
