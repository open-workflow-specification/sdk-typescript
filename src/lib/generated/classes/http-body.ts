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
 * Represents the intersection between the HTTPBody class and type
 */
export type HTTPBodyIntersection = HTTPBody & Specification.HTTPBody;

/**
 * Represents a constructor for the intersection of the HTTPBody class and type
 */
export interface HTTPBodyConstructor {
  new (model?: Partial<Specification.HTTPBody>): HTTPBodyIntersection;
}

/**
 * Represents a HTTPBody with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class HTTPBody extends ObjectHydrator<Specification.HTTPBody> {
  /**
   * Instanciates a new instance of the HTTPBody class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the HTTPBody.
   */
  constructor(model?: Partial<Specification.HTTPBody>) {
    super(model);

    getLifecycleHooks('HTTPBody')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the HTTPBody.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new HTTPBody(this as any) as HTTPBodyIntersection;
    validate('HTTPBody', copy, workflow);
  }

  /**
   * Normalizes the current instance of the HTTPBody.
   * Creates a copy of the HTTPBody, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the HTTPBody instance.
   */
  normalize(): HTTPBody & Specification.HTTPBody {
    const copy = new HTTPBody(this as any) as HTTPBodyIntersection;
    return getLifecycleHooks('HTTPBody')?.normalize?.(copy) || copy;
  }
}

export const _HTTPBody = HTTPBody as HTTPBodyConstructor;
