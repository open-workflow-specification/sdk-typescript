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
 * Represents the intersection between the BearerAuthenticationPolicyConfiguration class and type
 */
export type BearerAuthenticationPolicyConfigurationIntersection = BearerAuthenticationPolicyConfiguration &
  Specification.BearerAuthenticationPolicyConfiguration;

/**
 * Represents a constructor for the intersection of the BearerAuthenticationPolicyConfiguration class and type
 */
export interface BearerAuthenticationPolicyConfigurationConstructor {
  new (
    model?: Partial<Specification.BearerAuthenticationPolicyConfiguration>,
  ): BearerAuthenticationPolicyConfigurationIntersection;
}

/**
 * Represents a BearerAuthenticationPolicyConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class BearerAuthenticationPolicyConfiguration extends ObjectHydrator<Specification.BearerAuthenticationPolicyConfiguration> {
  /**
   * Instanciates a new instance of the BearerAuthenticationPolicyConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the BearerAuthenticationPolicyConfiguration.
   */
  constructor(model?: Partial<Specification.BearerAuthenticationPolicyConfiguration>) {
    super(model);

    getLifecycleHooks('BearerAuthenticationPolicyConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the BearerAuthenticationPolicyConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new BearerAuthenticationPolicyConfiguration(
      this as any,
    ) as BearerAuthenticationPolicyConfigurationIntersection;
    validate('BearerAuthenticationPolicyConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the BearerAuthenticationPolicyConfiguration.
   * Creates a copy of the BearerAuthenticationPolicyConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the BearerAuthenticationPolicyConfiguration instance.
   */
  normalize(): BearerAuthenticationPolicyConfiguration & Specification.BearerAuthenticationPolicyConfiguration {
    const copy = new BearerAuthenticationPolicyConfiguration(
      this as any,
    ) as BearerAuthenticationPolicyConfigurationIntersection;
    return getLifecycleHooks('BearerAuthenticationPolicyConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _BearerAuthenticationPolicyConfiguration =
  BearerAuthenticationPolicyConfiguration as BearerAuthenticationPolicyConfigurationConstructor;
