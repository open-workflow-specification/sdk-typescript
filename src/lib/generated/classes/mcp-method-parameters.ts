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
 * Represents the intersection between the McpMethodParameters class and type
 */
export type McpMethodParametersIntersection = McpMethodParameters & Specification.McpMethodParameters;

/**
 * Represents a constructor for the intersection of the McpMethodParameters class and type
 */
export interface McpMethodParametersConstructor {
  new (model?: Partial<Specification.McpMethodParameters>): McpMethodParametersIntersection;
}

/**
 * Represents a McpMethodParameters with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class McpMethodParameters extends ObjectHydrator<Specification.McpMethodParameters> {
  /**
   * Instanciates a new instance of the McpMethodParameters class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the McpMethodParameters.
   */
  constructor(model?: Partial<Specification.McpMethodParameters>) {
    super(model);

    getLifecycleHooks('McpMethodParameters')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the McpMethodParameters.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new McpMethodParameters(this as any) as McpMethodParametersIntersection;
    validate('McpMethodParameters', copy, workflow);
  }

  /**
   * Normalizes the current instance of the McpMethodParameters.
   * Creates a copy of the McpMethodParameters, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the McpMethodParameters instance.
   */
  normalize(): McpMethodParameters & Specification.McpMethodParameters {
    const copy = new McpMethodParameters(this as any) as McpMethodParametersIntersection;
    return getLifecycleHooks('McpMethodParameters')?.normalize?.(copy) || copy;
  }
}

export const _McpMethodParameters = McpMethodParameters as McpMethodParametersConstructor;
