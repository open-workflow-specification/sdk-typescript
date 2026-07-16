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
 * Represents the intersection between the OAuth2AuthenticationData class and type
 */
export type OAuth2AuthenticationDataIntersection = OAuth2AuthenticationData & Specification.OAuth2AuthenticationData;

/**
 * Represents a constructor for the intersection of the OAuth2AuthenticationData class and type
 */
export interface OAuth2AuthenticationDataConstructor {
  new (model?: Partial<Specification.OAuth2AuthenticationData>): OAuth2AuthenticationDataIntersection;
}

/**
 * Represents a OAuth2AuthenticationData with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OAuth2AuthenticationData extends ObjectHydrator<Specification.OAuth2AuthenticationData> {
  /**
   * Instanciates a new instance of the OAuth2AuthenticationData class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OAuth2AuthenticationData.
   */
  constructor(model?: Partial<Specification.OAuth2AuthenticationData>) {
    super(model);
    const self = this as unknown as Specification.OAuth2AuthenticationData & object;
    if (isObject(model)) {
      if (typeof model.client === 'object') self.client = new _OAuth2AuthenticationDataClient(model.client);
      if (typeof model.request === 'object') self.request = new _OAuth2TokenRequest(model.request);
      if (typeof model.subject === 'object') self.subject = new _OAuth2TokenDefinition(model.subject);
      if (typeof model.actor === 'object') self.actor = new _OAuth2TokenDefinition(model.actor);
    }
    getLifecycleHooks('OAuth2AuthenticationData')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OAuth2AuthenticationData.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OAuth2AuthenticationData(this as any) as OAuth2AuthenticationDataIntersection;
    validate('OAuth2AuthenticationData', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OAuth2AuthenticationData.
   * Creates a copy of the OAuth2AuthenticationData, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OAuth2AuthenticationData instance.
   */
  normalize(): OAuth2AuthenticationData & Specification.OAuth2AuthenticationData {
    const copy = new OAuth2AuthenticationData(this as any) as OAuth2AuthenticationDataIntersection;
    return getLifecycleHooks('OAuth2AuthenticationData')?.normalize?.(copy) || copy;
  }
}

export const _OAuth2AuthenticationData = OAuth2AuthenticationData as OAuth2AuthenticationDataConstructor;
