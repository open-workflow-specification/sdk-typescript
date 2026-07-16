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

import { _OAuth2AuthenticationDataClient } from './oauth2-authentication-data-client';
import { _OAuth2TokenRequest } from './oauth2-token-request';
import { _OAuth2TokenDefinition } from './oauth2-token-definition';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the OpenIdConnectAuthenticationPolicyConfiguration class and type
 */
export type OpenIdConnectAuthenticationPolicyConfigurationIntersection =
  OpenIdConnectAuthenticationPolicyConfiguration & Specification.OpenIdConnectAuthenticationPolicyConfiguration;

/**
 * Represents a constructor for the intersection of the OpenIdConnectAuthenticationPolicyConfiguration class and type
 */
export interface OpenIdConnectAuthenticationPolicyConfigurationConstructor {
  new (
    model?: Partial<Specification.OpenIdConnectAuthenticationPolicyConfiguration>,
  ): OpenIdConnectAuthenticationPolicyConfigurationIntersection;
}

/**
 * Represents a OpenIdConnectAuthenticationPolicyConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OpenIdConnectAuthenticationPolicyConfiguration extends ObjectHydrator<Specification.OpenIdConnectAuthenticationPolicyConfiguration> {
  /**
   * Instanciates a new instance of the OpenIdConnectAuthenticationPolicyConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OpenIdConnectAuthenticationPolicyConfiguration.
   */
  constructor(model?: Partial<Specification.OpenIdConnectAuthenticationPolicyConfiguration>) {
    super(model);
    const self = this as unknown as Specification.OpenIdConnectAuthenticationPolicyConfiguration & object;
    if (isObject(model)) {
      if (typeof (model as Specification.OpenIdConnectAuthenticationProperties).client === 'object')
        (self as Specification.OpenIdConnectAuthenticationProperties).client = new _OAuth2AuthenticationDataClient(
          (model as Specification.OpenIdConnectAuthenticationProperties)
            .client as Specification.OAuth2AuthenticationDataClient,
        );
      if (typeof (model as Specification.OpenIdConnectAuthenticationProperties).request === 'object')
        (self as Specification.OpenIdConnectAuthenticationProperties).request = new _OAuth2TokenRequest(
          (model as Specification.OpenIdConnectAuthenticationProperties).request as Specification.OAuth2TokenRequest,
        );
      if (typeof (model as Specification.OpenIdConnectAuthenticationProperties).subject === 'object')
        (self as Specification.OpenIdConnectAuthenticationProperties).subject = new _OAuth2TokenDefinition(
          (model as Specification.OpenIdConnectAuthenticationProperties).subject as Specification.OAuth2TokenDefinition,
        );
      if (typeof (model as Specification.OpenIdConnectAuthenticationProperties).actor === 'object')
        (self as Specification.OpenIdConnectAuthenticationProperties).actor = new _OAuth2TokenDefinition(
          (model as Specification.OpenIdConnectAuthenticationProperties).actor as Specification.OAuth2TokenDefinition,
        );
    }
    getLifecycleHooks('OpenIdConnectAuthenticationPolicyConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OpenIdConnectAuthenticationPolicyConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OpenIdConnectAuthenticationPolicyConfiguration(
      this as any,
    ) as OpenIdConnectAuthenticationPolicyConfigurationIntersection;
    validate('OpenIdConnectAuthenticationPolicyConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OpenIdConnectAuthenticationPolicyConfiguration.
   * Creates a copy of the OpenIdConnectAuthenticationPolicyConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OpenIdConnectAuthenticationPolicyConfiguration instance.
   */
  normalize(): OpenIdConnectAuthenticationPolicyConfiguration &
    Specification.OpenIdConnectAuthenticationPolicyConfiguration {
    const copy = new OpenIdConnectAuthenticationPolicyConfiguration(
      this as any,
    ) as OpenIdConnectAuthenticationPolicyConfigurationIntersection;
    return getLifecycleHooks('OpenIdConnectAuthenticationPolicyConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _OpenIdConnectAuthenticationPolicyConfiguration =
  OpenIdConnectAuthenticationPolicyConfiguration as OpenIdConnectAuthenticationPolicyConfigurationConstructor;
