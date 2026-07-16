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
import { _HTTPBody } from './http-body';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the HTTPArguments class and type
 */
export type HTTPArgumentsIntersection = HTTPArguments & Specification.HTTPArguments;

/**
 * Represents a constructor for the intersection of the HTTPArguments class and type
 */
export interface HTTPArgumentsConstructor {
  new (model?: Partial<Specification.HTTPArguments>): HTTPArgumentsIntersection;
}

/**
 * Represents a HTTPArguments with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class HTTPArguments extends ObjectHydrator<Specification.HTTPArguments> {
  /**
   * Instanciates a new instance of the HTTPArguments class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the HTTPArguments.
   */
  constructor(model?: Partial<Specification.HTTPArguments>) {
    super(model);
    const self = this as unknown as Specification.HTTPArguments & object;
    if (isObject(model)) {
      if (typeof model.endpoint === 'object') self.endpoint = new _Endpoint(model.endpoint);
      if (typeof model.body === 'object') self.body = new _HTTPBody(model.body);
    }
    getLifecycleHooks('HTTPArguments')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the HTTPArguments.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new HTTPArguments(this as any) as HTTPArgumentsIntersection;
    validate('HTTPArguments', copy, workflow);
  }

  /**
   * Normalizes the current instance of the HTTPArguments.
   * Creates a copy of the HTTPArguments, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the HTTPArguments instance.
   */
  normalize(): HTTPArguments & Specification.HTTPArguments {
    const copy = new HTTPArguments(this as any) as HTTPArgumentsIntersection;
    return getLifecycleHooks('HTTPArguments')?.normalize?.(copy) || copy;
  }
}

export const _HTTPArguments = HTTPArguments as HTTPArgumentsConstructor;
