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

import { _DigestAuthenticationPolicyConfiguration } from './digest-authentication-policy-configuration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the DigestAuthenticationPolicy class and type
 */
export type DigestAuthenticationPolicyIntersection = DigestAuthenticationPolicy &
  Specification.DigestAuthenticationPolicy;

/**
 * Represents a constructor for the intersection of the DigestAuthenticationPolicy class and type
 */
export interface DigestAuthenticationPolicyConstructor {
  new (model?: Partial<Specification.DigestAuthenticationPolicy>): DigestAuthenticationPolicyIntersection;
}

/**
 * Represents a DigestAuthenticationPolicy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class DigestAuthenticationPolicy extends ObjectHydrator<Specification.DigestAuthenticationPolicy> {
  /**
   * Instanciates a new instance of the DigestAuthenticationPolicy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the DigestAuthenticationPolicy.
   */
  constructor(model?: Partial<Specification.DigestAuthenticationPolicy>) {
    super(model);
    const self = this as unknown as Specification.DigestAuthenticationPolicy & object;
    if (isObject(model)) {
      if (typeof model.digest === 'object') self.digest = new _DigestAuthenticationPolicyConfiguration(model.digest);
    }
    getLifecycleHooks('DigestAuthenticationPolicy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the DigestAuthenticationPolicy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new DigestAuthenticationPolicy(this as any) as DigestAuthenticationPolicyIntersection;
    validate('DigestAuthenticationPolicy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the DigestAuthenticationPolicy.
   * Creates a copy of the DigestAuthenticationPolicy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the DigestAuthenticationPolicy instance.
   */
  normalize(): DigestAuthenticationPolicy & Specification.DigestAuthenticationPolicy {
    const copy = new DigestAuthenticationPolicy(this as any) as DigestAuthenticationPolicyIntersection;
    return getLifecycleHooks('DigestAuthenticationPolicy')?.normalize?.(copy) || copy;
  }
}

export const _DigestAuthenticationPolicy = DigestAuthenticationPolicy as DigestAuthenticationPolicyConstructor;
