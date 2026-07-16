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

import { _Endpoint } from './endpoint';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the ExternalResource class and type
 */
export type ExternalResourceIntersection = ExternalResource & Specification.ExternalResource;

/**
 * Represents a constructor for the intersection of the ExternalResource class and type
 */
export interface ExternalResourceConstructor {
  new (model?: Partial<Specification.ExternalResource>): ExternalResourceIntersection;
}

/**
 * Represents a ExternalResource with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ExternalResource extends ObjectHydrator<Specification.ExternalResource> {
  /**
   * Instanciates a new instance of the ExternalResource class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ExternalResource.
   */
  constructor(model?: Partial<Specification.ExternalResource>) {
    super(model);
    const self = this as unknown as Specification.ExternalResource & object;
    if (isObject(model)) {
      if (typeof model.endpoint === 'object') self.endpoint = new _Endpoint(model.endpoint);
    }
    getLifecycleHooks('ExternalResource')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ExternalResource.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ExternalResource(this as any) as ExternalResourceIntersection;
    validate('ExternalResource', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ExternalResource.
   * Creates a copy of the ExternalResource, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ExternalResource instance.
   */
  normalize(): ExternalResource & Specification.ExternalResource {
    const copy = new ExternalResource(this as any) as ExternalResourceIntersection;
    return getLifecycleHooks('ExternalResource')?.normalize?.(copy) || copy;
  }
}

export const _ExternalResource = ExternalResource as ExternalResourceConstructor;
