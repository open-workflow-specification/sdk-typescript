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
 * Represents the intersection between the OAuth2AuthenticationDataClient class and type
 */
export type OAuth2AuthenticationDataClientIntersection = OAuth2AuthenticationDataClient &
  Specification.OAuth2AuthenticationDataClient;

/**
 * Represents a constructor for the intersection of the OAuth2AuthenticationDataClient class and type
 */
export interface OAuth2AuthenticationDataClientConstructor {
  new (model?: Partial<Specification.OAuth2AuthenticationDataClient>): OAuth2AuthenticationDataClientIntersection;
}

/**
 * Represents a OAuth2AuthenticationDataClient with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OAuth2AuthenticationDataClient extends ObjectHydrator<Specification.OAuth2AuthenticationDataClient> {
  /**
   * Instanciates a new instance of the OAuth2AuthenticationDataClient class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OAuth2AuthenticationDataClient.
   */
  constructor(model?: Partial<Specification.OAuth2AuthenticationDataClient>) {
    super(model);

    getLifecycleHooks('OAuth2AuthenticationDataClient')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OAuth2AuthenticationDataClient.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OAuth2AuthenticationDataClient(this as any) as OAuth2AuthenticationDataClientIntersection;
    validate('OAuth2AuthenticationDataClient', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OAuth2AuthenticationDataClient.
   * Creates a copy of the OAuth2AuthenticationDataClient, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OAuth2AuthenticationDataClient instance.
   */
  normalize(): OAuth2AuthenticationDataClient & Specification.OAuth2AuthenticationDataClient {
    const copy = new OAuth2AuthenticationDataClient(this as any) as OAuth2AuthenticationDataClientIntersection;
    return getLifecycleHooks('OAuth2AuthenticationDataClient')?.normalize?.(copy) || copy;
  }
}

export const _OAuth2AuthenticationDataClient =
  OAuth2AuthenticationDataClient as OAuth2AuthenticationDataClientConstructor;
