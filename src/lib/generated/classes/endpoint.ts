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
 * Represents the intersection between the Endpoint class and type
 */
export type EndpointIntersection = Endpoint & Specification.Endpoint;

/**
 * Represents a constructor for the intersection of the Endpoint class and type
 */
export interface EndpointConstructor {
  new (model?: Partial<Specification.Endpoint>): EndpointIntersection;
}

/**
 * Represents a Endpoint with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Endpoint extends ObjectHydrator<Specification.Endpoint> {
  /**
   * Instanciates a new instance of the Endpoint class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Endpoint.
   */
  constructor(model?: Partial<Specification.Endpoint>) {
    super(model);
    const self = this as unknown as Specification.Endpoint & object;
    if (isObject(model)) {
      if (typeof (model as Specification.EndpointConfiguration).authentication === 'object')
        (self as Specification.EndpointConfiguration).authentication = new _ReferenceableAuthenticationPolicy(
          (model as Specification.EndpointConfiguration)
            .authentication as Specification.ReferenceableAuthenticationPolicy,
        );
    }
    getLifecycleHooks('Endpoint')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Endpoint.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Endpoint(this as any) as EndpointIntersection;
    validate('Endpoint', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Endpoint.
   * Creates a copy of the Endpoint, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Endpoint instance.
   */
  normalize(): Endpoint & Specification.Endpoint {
    const copy = new Endpoint(this as any) as EndpointIntersection;
    return getLifecycleHooks('Endpoint')?.normalize?.(copy) || copy;
  }
}

export const _Endpoint = Endpoint as EndpointConstructor;
