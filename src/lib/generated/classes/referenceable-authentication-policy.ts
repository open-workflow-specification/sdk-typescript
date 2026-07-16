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

import { _BasicAuthenticationPolicyConfiguration } from './basic-authentication-policy-configuration';
import { _BearerAuthenticationPolicyConfiguration } from './bearer-authentication-policy-configuration';
import { _DigestAuthenticationPolicyConfiguration } from './digest-authentication-policy-configuration';
import { _OAuth2AuthenticationPolicyConfiguration } from './oauth2-authentication-policy-configuration';
import { _OpenIdConnectAuthenticationPolicyConfiguration } from './open-id-connect-authentication-policy-configuration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the ReferenceableAuthenticationPolicy class and type
 */
export type ReferenceableAuthenticationPolicyIntersection = ReferenceableAuthenticationPolicy &
  Specification.ReferenceableAuthenticationPolicy;

/**
 * Represents a constructor for the intersection of the ReferenceableAuthenticationPolicy class and type
 */
export interface ReferenceableAuthenticationPolicyConstructor {
  new (model?: Partial<Specification.ReferenceableAuthenticationPolicy>): ReferenceableAuthenticationPolicyIntersection;
}

/**
 * Represents a ReferenceableAuthenticationPolicy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ReferenceableAuthenticationPolicy extends ObjectHydrator<Specification.ReferenceableAuthenticationPolicy> {
  /**
   * Instanciates a new instance of the ReferenceableAuthenticationPolicy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ReferenceableAuthenticationPolicy.
   */
  constructor(model?: Partial<Specification.ReferenceableAuthenticationPolicy>) {
    super(model);
    const self = this as unknown as Specification.ReferenceableAuthenticationPolicy & object;
    if (isObject(model)) {
      if (typeof (model as Specification.BasicAuthenticationPolicy).basic === 'object')
        (self as Specification.BasicAuthenticationPolicy).basic = new _BasicAuthenticationPolicyConfiguration(
          (model as Specification.BasicAuthenticationPolicy)
            .basic as Specification.BasicAuthenticationPolicyConfiguration,
        );
      if (typeof (model as Specification.BearerAuthenticationPolicy).bearer === 'object')
        (self as Specification.BearerAuthenticationPolicy).bearer = new _BearerAuthenticationPolicyConfiguration(
          (model as Specification.BearerAuthenticationPolicy)
            .bearer as Specification.BearerAuthenticationPolicyConfiguration,
        );
      if (typeof (model as Specification.DigestAuthenticationPolicy).digest === 'object')
        (self as Specification.DigestAuthenticationPolicy).digest = new _DigestAuthenticationPolicyConfiguration(
          (model as Specification.DigestAuthenticationPolicy)
            .digest as Specification.DigestAuthenticationPolicyConfiguration,
        );
      if (typeof (model as Specification.OAuth2AuthenticationPolicy).oauth2 === 'object')
        (self as Specification.OAuth2AuthenticationPolicy).oauth2 = new _OAuth2AuthenticationPolicyConfiguration(
          (model as Specification.OAuth2AuthenticationPolicy)
            .oauth2 as Specification.OAuth2AuthenticationPolicyConfiguration,
        );
      if (typeof (model as Specification.OpenIdConnectAuthenticationPolicy).oidc === 'object')
        (self as Specification.OpenIdConnectAuthenticationPolicy).oidc =
          new _OpenIdConnectAuthenticationPolicyConfiguration(
            (model as Specification.OpenIdConnectAuthenticationPolicy)
              .oidc as Specification.OpenIdConnectAuthenticationPolicyConfiguration,
          );
    }
    getLifecycleHooks('ReferenceableAuthenticationPolicy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ReferenceableAuthenticationPolicy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ReferenceableAuthenticationPolicy(this as any) as ReferenceableAuthenticationPolicyIntersection;
    validate('ReferenceableAuthenticationPolicy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ReferenceableAuthenticationPolicy.
   * Creates a copy of the ReferenceableAuthenticationPolicy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ReferenceableAuthenticationPolicy instance.
   */
  normalize(): ReferenceableAuthenticationPolicy & Specification.ReferenceableAuthenticationPolicy {
    const copy = new ReferenceableAuthenticationPolicy(this as any) as ReferenceableAuthenticationPolicyIntersection;
    return getLifecycleHooks('ReferenceableAuthenticationPolicy')?.normalize?.(copy) || copy;
  }
}

export const _ReferenceableAuthenticationPolicy =
  ReferenceableAuthenticationPolicy as ReferenceableAuthenticationPolicyConstructor;
