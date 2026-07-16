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
 * Represents the intersection between the BasicAuthenticationPolicyConfiguration class and type
 */
export type BasicAuthenticationPolicyConfigurationIntersection = BasicAuthenticationPolicyConfiguration &
  Specification.BasicAuthenticationPolicyConfiguration;

/**
 * Represents a constructor for the intersection of the BasicAuthenticationPolicyConfiguration class and type
 */
export interface BasicAuthenticationPolicyConfigurationConstructor {
  new (
    model?: Partial<Specification.BasicAuthenticationPolicyConfiguration>,
  ): BasicAuthenticationPolicyConfigurationIntersection;
}

/**
 * Represents a BasicAuthenticationPolicyConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class BasicAuthenticationPolicyConfiguration extends ObjectHydrator<Specification.BasicAuthenticationPolicyConfiguration> {
  /**
   * Instanciates a new instance of the BasicAuthenticationPolicyConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the BasicAuthenticationPolicyConfiguration.
   */
  constructor(model?: Partial<Specification.BasicAuthenticationPolicyConfiguration>) {
    super(model);

    getLifecycleHooks('BasicAuthenticationPolicyConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the BasicAuthenticationPolicyConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new BasicAuthenticationPolicyConfiguration(
      this as any,
    ) as BasicAuthenticationPolicyConfigurationIntersection;
    validate('BasicAuthenticationPolicyConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the BasicAuthenticationPolicyConfiguration.
   * Creates a copy of the BasicAuthenticationPolicyConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the BasicAuthenticationPolicyConfiguration instance.
   */
  normalize(): BasicAuthenticationPolicyConfiguration & Specification.BasicAuthenticationPolicyConfiguration {
    const copy = new BasicAuthenticationPolicyConfiguration(
      this as any,
    ) as BasicAuthenticationPolicyConfigurationIntersection;
    return getLifecycleHooks('BasicAuthenticationPolicyConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _BasicAuthenticationPolicyConfiguration =
  BasicAuthenticationPolicyConfiguration as BasicAuthenticationPolicyConfigurationConstructor;
