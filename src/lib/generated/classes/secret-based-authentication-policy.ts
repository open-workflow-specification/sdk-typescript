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
 * Represents the intersection between the SecretBasedAuthenticationPolicy class and type
 */
export type SecretBasedAuthenticationPolicyIntersection = SecretBasedAuthenticationPolicy &
  Specification.SecretBasedAuthenticationPolicy;

/**
 * Represents a constructor for the intersection of the SecretBasedAuthenticationPolicy class and type
 */
export interface SecretBasedAuthenticationPolicyConstructor {
  new (model?: Partial<Specification.SecretBasedAuthenticationPolicy>): SecretBasedAuthenticationPolicyIntersection;
}

/**
 * Represents a SecretBasedAuthenticationPolicy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class SecretBasedAuthenticationPolicy extends ObjectHydrator<Specification.SecretBasedAuthenticationPolicy> {
  /**
   * Instanciates a new instance of the SecretBasedAuthenticationPolicy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the SecretBasedAuthenticationPolicy.
   */
  constructor(model?: Partial<Specification.SecretBasedAuthenticationPolicy>) {
    super(model);

    getLifecycleHooks('SecretBasedAuthenticationPolicy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the SecretBasedAuthenticationPolicy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new SecretBasedAuthenticationPolicy(this as any) as SecretBasedAuthenticationPolicyIntersection;
    validate('SecretBasedAuthenticationPolicy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the SecretBasedAuthenticationPolicy.
   * Creates a copy of the SecretBasedAuthenticationPolicy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the SecretBasedAuthenticationPolicy instance.
   */
  normalize(): SecretBasedAuthenticationPolicy & Specification.SecretBasedAuthenticationPolicy {
    const copy = new SecretBasedAuthenticationPolicy(this as any) as SecretBasedAuthenticationPolicyIntersection;
    return getLifecycleHooks('SecretBasedAuthenticationPolicy')?.normalize?.(copy) || copy;
  }
}

export const _SecretBasedAuthenticationPolicy =
  SecretBasedAuthenticationPolicy as SecretBasedAuthenticationPolicyConstructor;
