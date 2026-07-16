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

import { Specification } from '../definitions';
import { ArrayHydrator } from '../../hydrator';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';

/**
 * Represents the intersection between the OAuth2AuthenticationDataAudiences class and type
 */
export type OAuth2AuthenticationDataAudiencesIntersection = OAuth2AuthenticationDataAudiences &
  Specification.OAuth2AuthenticationDataAudiences;

/**
 * Represents a constructor for the intersection of the OAuth2AuthenticationDataAudiences class and type
 */
export interface OAuth2AuthenticationDataAudiencesConstructor {
  new (model?: Array<string> | number): OAuth2AuthenticationDataAudiencesIntersection;
}

/**
 * Represents a collection of string.
 * Inherits from ArrayHydrator to handle array-specific hydration.
 */
export class OAuth2AuthenticationDataAudiences extends ArrayHydrator<string> {
  /**
   * Constructs a new instance of the OAuth2AuthenticationDataAudiences class.
   *
   * @param model - Optional parameter which can be an array of objects or a number representing the array length.
   */
  constructor(model?: Array<string> | number) {
    super(model);
    if (Array.isArray(model)) {
      if (model?.length) {
        this.splice(0, this.length);
        model.forEach((item) => this.push(item));
      }
    }
    Object.setPrototypeOf(this, Object.create(OAuth2AuthenticationDataAudiences.prototype));
    getLifecycleHooks('OAuth2AuthenticationDataAudiences')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OAuth2AuthenticationDataAudiences.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OAuth2AuthenticationDataAudiences(this);
    validate('OAuth2AuthenticationDataAudiences', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OAuth2AuthenticationDataAudiences.
   * Creates a copy of the OAuth2AuthenticationDataAudiences, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OAuth2AuthenticationDataAudiences instance.
   */
  normalize(): OAuth2AuthenticationDataAudiences {
    const copy = new OAuth2AuthenticationDataAudiences(this);
    return getLifecycleHooks('OAuth2AuthenticationDataAudiences')?.normalize?.(copy) || copy;
  }
}

export const _OAuth2AuthenticationDataAudiences =
  OAuth2AuthenticationDataAudiences as unknown as OAuth2AuthenticationDataAudiencesConstructor;
//export const _OAuth2AuthenticationDataAudiences = OAuth2AuthenticationDataAudiences; // could be exported directly, but it makes the job of building the index more straightforward as it's consistant with "object" classes
