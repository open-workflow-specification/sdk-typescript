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
 * Represents the intersection between the WithOpenAPIParameters class and type
 */
export type WithOpenAPIParametersIntersection = WithOpenAPIParameters & Specification.WithOpenAPIParameters;

/**
 * Represents a constructor for the intersection of the WithOpenAPIParameters class and type
 */
export interface WithOpenAPIParametersConstructor {
  new (model?: Partial<Specification.WithOpenAPIParameters>): WithOpenAPIParametersIntersection;
}

/**
 * Represents a WithOpenAPIParameters with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class WithOpenAPIParameters extends ObjectHydrator<Specification.WithOpenAPIParameters> {
  /**
   * Instanciates a new instance of the WithOpenAPIParameters class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the WithOpenAPIParameters.
   */
  constructor(model?: Partial<Specification.WithOpenAPIParameters>) {
    super(model);

    getLifecycleHooks('WithOpenAPIParameters')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the WithOpenAPIParameters.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new WithOpenAPIParameters(this as any) as WithOpenAPIParametersIntersection;
    validate('WithOpenAPIParameters', copy, workflow);
  }

  /**
   * Normalizes the current instance of the WithOpenAPIParameters.
   * Creates a copy of the WithOpenAPIParameters, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the WithOpenAPIParameters instance.
   */
  normalize(): WithOpenAPIParameters & Specification.WithOpenAPIParameters {
    const copy = new WithOpenAPIParameters(this as any) as WithOpenAPIParametersIntersection;
    return getLifecycleHooks('WithOpenAPIParameters')?.normalize?.(copy) || copy;
  }
}

export const _WithOpenAPIParameters = WithOpenAPIParameters as WithOpenAPIParametersConstructor;
