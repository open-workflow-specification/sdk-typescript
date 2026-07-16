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
 * Represents the intersection between the OpenIdConnectAuthenticationProperties class and type
 */
export type OpenIdConnectAuthenticationPropertiesIntersection = OpenIdConnectAuthenticationProperties &
  Specification.OpenIdConnectAuthenticationProperties;

/**
 * Represents a constructor for the intersection of the OpenIdConnectAuthenticationProperties class and type
 */
export interface OpenIdConnectAuthenticationPropertiesConstructor {
  new (
    model?: Partial<Specification.OpenIdConnectAuthenticationProperties>,
  ): OpenIdConnectAuthenticationPropertiesIntersection;
}

/**
 * Represents a OpenIdConnectAuthenticationProperties with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OpenIdConnectAuthenticationProperties extends ObjectHydrator<Specification.OpenIdConnectAuthenticationProperties> {
  /**
   * Instanciates a new instance of the OpenIdConnectAuthenticationProperties class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OpenIdConnectAuthenticationProperties.
   */
  constructor(model?: Partial<Specification.OpenIdConnectAuthenticationProperties>) {
    super(model);
    const self = this as unknown as Specification.OpenIdConnectAuthenticationProperties & object;
    if (isObject(model)) {
      if (typeof model.client === 'object') self.client = new _OAuth2AuthenticationDataClient(model.client);
      if (typeof model.request === 'object') self.request = new _OAuth2TokenRequest(model.request);
      if (typeof model.subject === 'object') self.subject = new _OAuth2TokenDefinition(model.subject);
      if (typeof model.actor === 'object') self.actor = new _OAuth2TokenDefinition(model.actor);
    }
    getLifecycleHooks('OpenIdConnectAuthenticationProperties')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OpenIdConnectAuthenticationProperties.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OpenIdConnectAuthenticationProperties(
      this as any,
    ) as OpenIdConnectAuthenticationPropertiesIntersection;
    validate('OpenIdConnectAuthenticationProperties', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OpenIdConnectAuthenticationProperties.
   * Creates a copy of the OpenIdConnectAuthenticationProperties, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OpenIdConnectAuthenticationProperties instance.
   */
  normalize(): OpenIdConnectAuthenticationProperties & Specification.OpenIdConnectAuthenticationProperties {
    const copy = new OpenIdConnectAuthenticationProperties(
      this as any,
    ) as OpenIdConnectAuthenticationPropertiesIntersection;
    return getLifecycleHooks('OpenIdConnectAuthenticationProperties')?.normalize?.(copy) || copy;
  }
}

export const _OpenIdConnectAuthenticationProperties =
  OpenIdConnectAuthenticationProperties as OpenIdConnectAuthenticationPropertiesConstructor;
