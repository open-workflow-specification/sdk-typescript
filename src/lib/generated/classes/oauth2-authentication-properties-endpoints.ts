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
 * Represents the intersection between the OAuth2AuthenticationPropertiesEndpoints class and type
 */
export type OAuth2AuthenticationPropertiesEndpointsIntersection = OAuth2AuthenticationPropertiesEndpoints &
  Specification.OAuth2AuthenticationPropertiesEndpoints;

/**
 * Represents a constructor for the intersection of the OAuth2AuthenticationPropertiesEndpoints class and type
 */
export interface OAuth2AuthenticationPropertiesEndpointsConstructor {
  new (
    model?: Partial<Specification.OAuth2AuthenticationPropertiesEndpoints>,
  ): OAuth2AuthenticationPropertiesEndpointsIntersection;
}

/**
 * Represents a OAuth2AuthenticationPropertiesEndpoints with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OAuth2AuthenticationPropertiesEndpoints extends ObjectHydrator<Specification.OAuth2AuthenticationPropertiesEndpoints> {
  /**
   * Instanciates a new instance of the OAuth2AuthenticationPropertiesEndpoints class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OAuth2AuthenticationPropertiesEndpoints.
   */
  constructor(model?: Partial<Specification.OAuth2AuthenticationPropertiesEndpoints>) {
    super(model);

    getLifecycleHooks('OAuth2AuthenticationPropertiesEndpoints')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OAuth2AuthenticationPropertiesEndpoints.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OAuth2AuthenticationPropertiesEndpoints(
      this as any,
    ) as OAuth2AuthenticationPropertiesEndpointsIntersection;
    validate('OAuth2AuthenticationPropertiesEndpoints', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OAuth2AuthenticationPropertiesEndpoints.
   * Creates a copy of the OAuth2AuthenticationPropertiesEndpoints, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OAuth2AuthenticationPropertiesEndpoints instance.
   */
  normalize(): OAuth2AuthenticationPropertiesEndpoints & Specification.OAuth2AuthenticationPropertiesEndpoints {
    const copy = new OAuth2AuthenticationPropertiesEndpoints(
      this as any,
    ) as OAuth2AuthenticationPropertiesEndpointsIntersection;
    return getLifecycleHooks('OAuth2AuthenticationPropertiesEndpoints')?.normalize?.(copy) || copy;
  }
}

export const _OAuth2AuthenticationPropertiesEndpoints =
  OAuth2AuthenticationPropertiesEndpoints as OAuth2AuthenticationPropertiesEndpointsConstructor;
