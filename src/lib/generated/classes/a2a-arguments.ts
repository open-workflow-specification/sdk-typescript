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

import { _ExternalResource } from './external-resource';
import { _Endpoint } from './endpoint';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the A2AArguments class and type
 */
export type A2AArgumentsIntersection = A2AArguments & Specification.A2AArguments;

/**
 * Represents a constructor for the intersection of the A2AArguments class and type
 */
export interface A2AArgumentsConstructor {
  new (model?: Partial<Specification.A2AArguments>): A2AArgumentsIntersection;
}

/**
 * Represents a A2AArguments with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class A2AArguments extends ObjectHydrator<Specification.A2AArguments> {
  /**
   * Instanciates a new instance of the A2AArguments class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the A2AArguments.
   */
  constructor(model?: Partial<Specification.A2AArguments>) {
    super(model);
    const self = this as unknown as Specification.A2AArguments & object;
    if (isObject(model)) {
      if (typeof model.agentCard === 'object') self.agentCard = new _ExternalResource(model.agentCard);
      if (typeof model.server === 'object') self.server = new _Endpoint(model.server);
    }
    getLifecycleHooks('A2AArguments')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the A2AArguments.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new A2AArguments(this as any) as A2AArgumentsIntersection;
    validate('A2AArguments', copy, workflow);
  }

  /**
   * Normalizes the current instance of the A2AArguments.
   * Creates a copy of the A2AArguments, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the A2AArguments instance.
   */
  normalize(): A2AArguments & Specification.A2AArguments {
    const copy = new A2AArguments(this as any) as A2AArgumentsIntersection;
    return getLifecycleHooks('A2AArguments')?.normalize?.(copy) || copy;
  }
}

export const _A2AArguments = A2AArguments as A2AArgumentsConstructor;
