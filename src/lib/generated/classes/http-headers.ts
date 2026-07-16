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
 * Represents the intersection between the HTTPHeaders class and type
 */
export type HTTPHeadersIntersection = HTTPHeaders & Specification.HTTPHeaders;

/**
 * Represents a constructor for the intersection of the HTTPHeaders class and type
 */
export interface HTTPHeadersConstructor {
  new (model?: Partial<Specification.HTTPHeaders>): HTTPHeadersIntersection;
}

/**
 * Represents a HTTPHeaders with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class HTTPHeaders extends ObjectHydrator<Specification.HTTPHeaders> {
  /**
   * Instanciates a new instance of the HTTPHeaders class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the HTTPHeaders.
   */
  constructor(model?: Partial<Specification.HTTPHeaders>) {
    super(model);

    getLifecycleHooks('HTTPHeaders')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the HTTPHeaders.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new HTTPHeaders(this as any) as HTTPHeadersIntersection;
    validate('HTTPHeaders', copy, workflow);
  }

  /**
   * Normalizes the current instance of the HTTPHeaders.
   * Creates a copy of the HTTPHeaders, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the HTTPHeaders instance.
   */
  normalize(): HTTPHeaders & Specification.HTTPHeaders {
    const copy = new HTTPHeaders(this as any) as HTTPHeadersIntersection;
    return getLifecycleHooks('HTTPHeaders')?.normalize?.(copy) || copy;
  }
}

export const _HTTPHeaders = HTTPHeaders as HTTPHeadersConstructor;
