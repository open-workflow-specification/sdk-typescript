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
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the BasicAuthenticationPolicy class and type
 */
export type BasicAuthenticationPolicyIntersection = BasicAuthenticationPolicy & Specification.BasicAuthenticationPolicy;

/**
 * Represents a constructor for the intersection of the BasicAuthenticationPolicy class and type
 */
export interface BasicAuthenticationPolicyConstructor {
  new (model?: Partial<Specification.BasicAuthenticationPolicy>): BasicAuthenticationPolicyIntersection;
}

/**
 * Represents a BasicAuthenticationPolicy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class BasicAuthenticationPolicy extends ObjectHydrator<Specification.BasicAuthenticationPolicy> {
  /**
   * Instanciates a new instance of the BasicAuthenticationPolicy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the BasicAuthenticationPolicy.
   */
  constructor(model?: Partial<Specification.BasicAuthenticationPolicy>) {
    super(model);
    const self = this as unknown as Specification.BasicAuthenticationPolicy & object;
    if (isObject(model)) {
      if (typeof model.basic === 'object') self.basic = new _BasicAuthenticationPolicyConfiguration(model.basic);
    }
    getLifecycleHooks('BasicAuthenticationPolicy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the BasicAuthenticationPolicy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new BasicAuthenticationPolicy(this as any) as BasicAuthenticationPolicyIntersection;
    validate('BasicAuthenticationPolicy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the BasicAuthenticationPolicy.
   * Creates a copy of the BasicAuthenticationPolicy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the BasicAuthenticationPolicy instance.
   */
  normalize(): BasicAuthenticationPolicy & Specification.BasicAuthenticationPolicy {
    const copy = new BasicAuthenticationPolicy(this as any) as BasicAuthenticationPolicyIntersection;
    return getLifecycleHooks('BasicAuthenticationPolicy')?.normalize?.(copy) || copy;
  }
}

export const _BasicAuthenticationPolicy = BasicAuthenticationPolicy as BasicAuthenticationPolicyConstructor;
