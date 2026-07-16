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
 * Represents the intersection between the EndpointUri class and type
 */
export type EndpointUriIntersection = EndpointUri & Specification.EndpointUri;

/**
 * Represents a constructor for the intersection of the EndpointUri class and type
 */
export interface EndpointUriConstructor {
  new (model?: Partial<Specification.EndpointUri>): EndpointUriIntersection;
}

/**
 * Represents a EndpointUri with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EndpointUri extends ObjectHydrator<Specification.EndpointUri> {
  /**
   * Instanciates a new instance of the EndpointUri class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EndpointUri.
   */
  constructor(model?: Partial<Specification.EndpointUri>) {
    super(model);

    getLifecycleHooks('EndpointUri')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EndpointUri.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EndpointUri(this as any) as EndpointUriIntersection;
    validate('EndpointUri', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EndpointUri.
   * Creates a copy of the EndpointUri, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EndpointUri instance.
   */
  normalize(): EndpointUri & Specification.EndpointUri {
    const copy = new EndpointUri(this as any) as EndpointUriIntersection;
    return getLifecycleHooks('EndpointUri')?.normalize?.(copy) || copy;
  }
}

export const _EndpointUri = EndpointUri as EndpointUriConstructor;
