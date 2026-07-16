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

import { _ReferenceableAuthenticationPolicy } from './referenceable-authentication-policy';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the EndpointConfiguration class and type
 */
export type EndpointConfigurationIntersection = EndpointConfiguration & Specification.EndpointConfiguration;

/**
 * Represents a constructor for the intersection of the EndpointConfiguration class and type
 */
export interface EndpointConfigurationConstructor {
  new (model?: Partial<Specification.EndpointConfiguration>): EndpointConfigurationIntersection;
}

/**
 * Represents a EndpointConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EndpointConfiguration extends ObjectHydrator<Specification.EndpointConfiguration> {
  /**
   * Instanciates a new instance of the EndpointConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EndpointConfiguration.
   */
  constructor(model?: Partial<Specification.EndpointConfiguration>) {
    super(model);
    const self = this as unknown as Specification.EndpointConfiguration & object;
    if (isObject(model)) {
      if (typeof model.authentication === 'object')
        self.authentication = new _ReferenceableAuthenticationPolicy(model.authentication);
    }
    getLifecycleHooks('EndpointConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EndpointConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EndpointConfiguration(this as any) as EndpointConfigurationIntersection;
    validate('EndpointConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EndpointConfiguration.
   * Creates a copy of the EndpointConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EndpointConfiguration instance.
   */
  normalize(): EndpointConfiguration & Specification.EndpointConfiguration {
    const copy = new EndpointConfiguration(this as any) as EndpointConfigurationIntersection;
    return getLifecycleHooks('EndpointConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _EndpointConfiguration = EndpointConfiguration as EndpointConfigurationConstructor;
