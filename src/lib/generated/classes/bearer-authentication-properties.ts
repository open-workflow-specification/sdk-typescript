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
 * Represents the intersection between the BearerAuthenticationProperties class and type
 */
export type BearerAuthenticationPropertiesIntersection = BearerAuthenticationProperties &
  Specification.BearerAuthenticationProperties;

/**
 * Represents a constructor for the intersection of the BearerAuthenticationProperties class and type
 */
export interface BearerAuthenticationPropertiesConstructor {
  new (model?: Partial<Specification.BearerAuthenticationProperties>): BearerAuthenticationPropertiesIntersection;
}

/**
 * Represents a BearerAuthenticationProperties with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class BearerAuthenticationProperties extends ObjectHydrator<Specification.BearerAuthenticationProperties> {
  /**
   * Instanciates a new instance of the BearerAuthenticationProperties class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the BearerAuthenticationProperties.
   */
  constructor(model?: Partial<Specification.BearerAuthenticationProperties>) {
    super(model);

    getLifecycleHooks('BearerAuthenticationProperties')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the BearerAuthenticationProperties.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new BearerAuthenticationProperties(this as any) as BearerAuthenticationPropertiesIntersection;
    validate('BearerAuthenticationProperties', copy, workflow);
  }

  /**
   * Normalizes the current instance of the BearerAuthenticationProperties.
   * Creates a copy of the BearerAuthenticationProperties, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the BearerAuthenticationProperties instance.
   */
  normalize(): BearerAuthenticationProperties & Specification.BearerAuthenticationProperties {
    const copy = new BearerAuthenticationProperties(this as any) as BearerAuthenticationPropertiesIntersection;
    return getLifecycleHooks('BearerAuthenticationProperties')?.normalize?.(copy) || copy;
  }
}

export const _BearerAuthenticationProperties =
  BearerAuthenticationProperties as BearerAuthenticationPropertiesConstructor;
