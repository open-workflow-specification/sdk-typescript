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
 * Represents the intersection between the BasicAuthenticationProperties class and type
 */
export type BasicAuthenticationPropertiesIntersection = BasicAuthenticationProperties &
  Specification.BasicAuthenticationProperties;

/**
 * Represents a constructor for the intersection of the BasicAuthenticationProperties class and type
 */
export interface BasicAuthenticationPropertiesConstructor {
  new (model?: Partial<Specification.BasicAuthenticationProperties>): BasicAuthenticationPropertiesIntersection;
}

/**
 * Represents a BasicAuthenticationProperties with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class BasicAuthenticationProperties extends ObjectHydrator<Specification.BasicAuthenticationProperties> {
  /**
   * Instanciates a new instance of the BasicAuthenticationProperties class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the BasicAuthenticationProperties.
   */
  constructor(model?: Partial<Specification.BasicAuthenticationProperties>) {
    super(model);

    getLifecycleHooks('BasicAuthenticationProperties')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the BasicAuthenticationProperties.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new BasicAuthenticationProperties(this as any) as BasicAuthenticationPropertiesIntersection;
    validate('BasicAuthenticationProperties', copy, workflow);
  }

  /**
   * Normalizes the current instance of the BasicAuthenticationProperties.
   * Creates a copy of the BasicAuthenticationProperties, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the BasicAuthenticationProperties instance.
   */
  normalize(): BasicAuthenticationProperties & Specification.BasicAuthenticationProperties {
    const copy = new BasicAuthenticationProperties(this as any) as BasicAuthenticationPropertiesIntersection;
    return getLifecycleHooks('BasicAuthenticationProperties')?.normalize?.(copy) || copy;
  }
}

export const _BasicAuthenticationProperties = BasicAuthenticationProperties as BasicAuthenticationPropertiesConstructor;
