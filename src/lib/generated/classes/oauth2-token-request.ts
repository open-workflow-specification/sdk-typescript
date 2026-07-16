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
 * Represents the intersection between the OAuth2TokenRequest class and type
 */
export type OAuth2TokenRequestIntersection = OAuth2TokenRequest & Specification.OAuth2TokenRequest;

/**
 * Represents a constructor for the intersection of the OAuth2TokenRequest class and type
 */
export interface OAuth2TokenRequestConstructor {
  new (model?: Partial<Specification.OAuth2TokenRequest>): OAuth2TokenRequestIntersection;
}

/**
 * Represents a OAuth2TokenRequest with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OAuth2TokenRequest extends ObjectHydrator<Specification.OAuth2TokenRequest> {
  /**
   * Instanciates a new instance of the OAuth2TokenRequest class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OAuth2TokenRequest.
   */
  constructor(model?: Partial<Specification.OAuth2TokenRequest>) {
    super(model);

    getLifecycleHooks('OAuth2TokenRequest')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OAuth2TokenRequest.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OAuth2TokenRequest(this as any) as OAuth2TokenRequestIntersection;
    validate('OAuth2TokenRequest', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OAuth2TokenRequest.
   * Creates a copy of the OAuth2TokenRequest, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OAuth2TokenRequest instance.
   */
  normalize(): OAuth2TokenRequest & Specification.OAuth2TokenRequest {
    const copy = new OAuth2TokenRequest(this as any) as OAuth2TokenRequestIntersection;
    return getLifecycleHooks('OAuth2TokenRequest')?.normalize?.(copy) || copy;
  }
}

export const _OAuth2TokenRequest = OAuth2TokenRequest as OAuth2TokenRequestConstructor;
