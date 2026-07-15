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

import { _OAuth2AuthenticationPolicyConfiguration } from './oauth2-authentication-policy-configuration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the OAuth2AuthenticationPolicy class and type
 */
export type OAuth2AuthenticationPolicyIntersection = OAuth2AuthenticationPolicy &
  Specification.OAuth2AuthenticationPolicy;

/**
 * Represents a constructor for the intersection of the OAuth2AuthenticationPolicy class and type
 */
export interface OAuth2AuthenticationPolicyConstructor {
  new (model?: Partial<Specification.OAuth2AuthenticationPolicy>): OAuth2AuthenticationPolicyIntersection;
}

/**
 * Represents a OAuth2AuthenticationPolicy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OAuth2AuthenticationPolicy extends ObjectHydrator<Specification.OAuth2AuthenticationPolicy> {
  /**
   * Instanciates a new instance of the OAuth2AuthenticationPolicy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OAuth2AuthenticationPolicy.
   */
  constructor(model?: Partial<Specification.OAuth2AuthenticationPolicy>) {
    super(model);
    const self = this as unknown as Specification.OAuth2AuthenticationPolicy & object;
    if (isObject(model)) {
      if (typeof model.oauth2 === 'object') self.oauth2 = new _OAuth2AuthenticationPolicyConfiguration(model.oauth2);
    }
    getLifecycleHooks('OAuth2AuthenticationPolicy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OAuth2AuthenticationPolicy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OAuth2AuthenticationPolicy(this as any) as OAuth2AuthenticationPolicyIntersection;
    validate('OAuth2AuthenticationPolicy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OAuth2AuthenticationPolicy.
   * Creates a copy of the OAuth2AuthenticationPolicy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OAuth2AuthenticationPolicy instance.
   */
  normalize(): OAuth2AuthenticationPolicy & Specification.OAuth2AuthenticationPolicy {
    const copy = new OAuth2AuthenticationPolicy(this as any) as OAuth2AuthenticationPolicyIntersection;
    return getLifecycleHooks('OAuth2AuthenticationPolicy')?.normalize?.(copy) || copy;
  }
}

export const _OAuth2AuthenticationPolicy = OAuth2AuthenticationPolicy as OAuth2AuthenticationPolicyConstructor;
