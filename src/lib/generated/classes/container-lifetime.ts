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

import { _Duration } from './duration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the ContainerLifetime class and type
 */
export type ContainerLifetimeIntersection = ContainerLifetime & Specification.ContainerLifetime;

/**
 * Represents a constructor for the intersection of the ContainerLifetime class and type
 */
export interface ContainerLifetimeConstructor {
  new (model?: Partial<Specification.ContainerLifetime>): ContainerLifetimeIntersection;
}

/**
 * Represents a ContainerLifetime with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ContainerLifetime extends ObjectHydrator<Specification.ContainerLifetime> {
  /**
   * Instanciates a new instance of the ContainerLifetime class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ContainerLifetime.
   */
  constructor(model?: Partial<Specification.ContainerLifetime>) {
    super(model);
    const self = this as unknown as Specification.ContainerLifetime & object;
    if (isObject(model)) {
      if (typeof model.after === 'object') self.after = new _Duration(model.after);
    }
    getLifecycleHooks('ContainerLifetime')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ContainerLifetime.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ContainerLifetime(this as any) as ContainerLifetimeIntersection;
    validate('ContainerLifetime', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ContainerLifetime.
   * Creates a copy of the ContainerLifetime, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ContainerLifetime instance.
   */
  normalize(): ContainerLifetime & Specification.ContainerLifetime {
    const copy = new ContainerLifetime(this as any) as ContainerLifetimeIntersection;
    return getLifecycleHooks('ContainerLifetime')?.normalize?.(copy) || copy;
  }
}

export const _ContainerLifetime = ContainerLifetime as ContainerLifetimeConstructor;
