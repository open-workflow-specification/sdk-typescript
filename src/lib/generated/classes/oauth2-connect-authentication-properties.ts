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
import { _OAuth2AuthenticationPropertiesEndpoints } from './oauth2-authentication-properties-endpoints';
import { _OAuth2AuthenticationData } from './oauth2-authentication-data';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the OAuth2ConnectAuthenticationProperties class and type
 */
export type OAuth2ConnectAuthenticationPropertiesIntersection = OAuth2ConnectAuthenticationProperties &
  Specification.OAuth2ConnectAuthenticationProperties;

/**
 * Represents a constructor for the intersection of the OAuth2ConnectAuthenticationProperties class and type
 */
export interface OAuth2ConnectAuthenticationPropertiesConstructor {
  new (
    model?: Partial<Specification.OAuth2ConnectAuthenticationProperties>,
  ): OAuth2ConnectAuthenticationPropertiesIntersection;
}

/**
 * Represents a OAuth2ConnectAuthenticationProperties with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OAuth2ConnectAuthenticationProperties extends _OAuth2AuthenticationData {
  /**
   * Instanciates a new instance of the OAuth2ConnectAuthenticationProperties class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OAuth2ConnectAuthenticationProperties.
   */
  constructor(model?: Partial<Specification.OAuth2ConnectAuthenticationProperties>) {
    super(model);
    const self = this as unknown as Specification.OAuth2ConnectAuthenticationProperties & object;
    if (isObject(model)) {
      if (typeof model.client === 'object') self.client = new _OAuth2AuthenticationDataClient(model.client);
      if (typeof model.request === 'object') self.request = new _OAuth2TokenRequest(model.request);
      if (typeof model.subject === 'object') self.subject = new _OAuth2TokenDefinition(model.subject);
      if (typeof model.actor === 'object') self.actor = new _OAuth2TokenDefinition(model.actor);
      if (typeof model.endpoints === 'object')
        self.endpoints = new _OAuth2AuthenticationPropertiesEndpoints(model.endpoints);
    }
    getLifecycleHooks('OAuth2ConnectAuthenticationProperties')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OAuth2ConnectAuthenticationProperties.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OAuth2ConnectAuthenticationProperties(
      this as any,
    ) as OAuth2ConnectAuthenticationPropertiesIntersection;
    validate('OAuth2ConnectAuthenticationProperties', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OAuth2ConnectAuthenticationProperties.
   * Creates a copy of the OAuth2ConnectAuthenticationProperties, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OAuth2ConnectAuthenticationProperties instance.
   */
  normalize(): OAuth2ConnectAuthenticationProperties & Specification.OAuth2ConnectAuthenticationProperties {
    const copy = new OAuth2ConnectAuthenticationProperties(
      this as any,
    ) as OAuth2ConnectAuthenticationPropertiesIntersection;
    return getLifecycleHooks('OAuth2ConnectAuthenticationProperties')?.normalize?.(copy) || copy;
  }
}

export const _OAuth2ConnectAuthenticationProperties =
  OAuth2ConnectAuthenticationProperties as OAuth2ConnectAuthenticationPropertiesConstructor;
