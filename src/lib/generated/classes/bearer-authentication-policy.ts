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

import { _BearerAuthenticationPolicyConfiguration } from './bearer-authentication-policy-configuration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the BearerAuthenticationPolicy class and type
 */
export type BearerAuthenticationPolicyIntersection = BearerAuthenticationPolicy &
  Specification.BearerAuthenticationPolicy;

/**
 * Represents a constructor for the intersection of the BearerAuthenticationPolicy class and type
 */
export interface BearerAuthenticationPolicyConstructor {
  new (model?: Partial<Specification.BearerAuthenticationPolicy>): BearerAuthenticationPolicyIntersection;
}

/**
 * Represents a BearerAuthenticationPolicy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class BearerAuthenticationPolicy extends ObjectHydrator<Specification.BearerAuthenticationPolicy> {
  /**
   * Instanciates a new instance of the BearerAuthenticationPolicy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the BearerAuthenticationPolicy.
   */
  constructor(model?: Partial<Specification.BearerAuthenticationPolicy>) {
    super(model);
    const self = this as unknown as Specification.BearerAuthenticationPolicy & object;
    if (isObject(model)) {
      if (typeof model.bearer === 'object') self.bearer = new _BearerAuthenticationPolicyConfiguration(model.bearer);
    }
    getLifecycleHooks('BearerAuthenticationPolicy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the BearerAuthenticationPolicy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new BearerAuthenticationPolicy(this as any) as BearerAuthenticationPolicyIntersection;
    validate('BearerAuthenticationPolicy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the BearerAuthenticationPolicy.
   * Creates a copy of the BearerAuthenticationPolicy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the BearerAuthenticationPolicy instance.
   */
  normalize(): BearerAuthenticationPolicy & Specification.BearerAuthenticationPolicy {
    const copy = new BearerAuthenticationPolicy(this as any) as BearerAuthenticationPolicyIntersection;
    return getLifecycleHooks('BearerAuthenticationPolicy')?.normalize?.(copy) || copy;
  }
}

export const _BearerAuthenticationPolicy = BearerAuthenticationPolicy as BearerAuthenticationPolicyConstructor;
