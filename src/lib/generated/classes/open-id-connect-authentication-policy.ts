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

import { _OpenIdConnectAuthenticationPolicyConfiguration } from './open-id-connect-authentication-policy-configuration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the OpenIdConnectAuthenticationPolicy class and type
 */
export type OpenIdConnectAuthenticationPolicyIntersection = OpenIdConnectAuthenticationPolicy &
  Specification.OpenIdConnectAuthenticationPolicy;

/**
 * Represents a constructor for the intersection of the OpenIdConnectAuthenticationPolicy class and type
 */
export interface OpenIdConnectAuthenticationPolicyConstructor {
  new (model?: Partial<Specification.OpenIdConnectAuthenticationPolicy>): OpenIdConnectAuthenticationPolicyIntersection;
}

/**
 * Represents a OpenIdConnectAuthenticationPolicy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OpenIdConnectAuthenticationPolicy extends ObjectHydrator<Specification.OpenIdConnectAuthenticationPolicy> {
  /**
   * Instanciates a new instance of the OpenIdConnectAuthenticationPolicy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OpenIdConnectAuthenticationPolicy.
   */
  constructor(model?: Partial<Specification.OpenIdConnectAuthenticationPolicy>) {
    super(model);
    const self = this as unknown as Specification.OpenIdConnectAuthenticationPolicy & object;
    if (isObject(model)) {
      if (typeof model.oidc === 'object') self.oidc = new _OpenIdConnectAuthenticationPolicyConfiguration(model.oidc);
    }
    getLifecycleHooks('OpenIdConnectAuthenticationPolicy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OpenIdConnectAuthenticationPolicy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OpenIdConnectAuthenticationPolicy(this as any) as OpenIdConnectAuthenticationPolicyIntersection;
    validate('OpenIdConnectAuthenticationPolicy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OpenIdConnectAuthenticationPolicy.
   * Creates a copy of the OpenIdConnectAuthenticationPolicy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OpenIdConnectAuthenticationPolicy instance.
   */
  normalize(): OpenIdConnectAuthenticationPolicy & Specification.OpenIdConnectAuthenticationPolicy {
    const copy = new OpenIdConnectAuthenticationPolicy(this as any) as OpenIdConnectAuthenticationPolicyIntersection;
    return getLifecycleHooks('OpenIdConnectAuthenticationPolicy')?.normalize?.(copy) || copy;
  }
}

export const _OpenIdConnectAuthenticationPolicy =
  OpenIdConnectAuthenticationPolicy as OpenIdConnectAuthenticationPolicyConstructor;
