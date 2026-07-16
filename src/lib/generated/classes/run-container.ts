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

import { _Container } from './container';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RunContainer class and type
 */
export type RunContainerIntersection = RunContainer & Specification.RunContainer;

/**
 * Represents a constructor for the intersection of the RunContainer class and type
 */
export interface RunContainerConstructor {
  new (model?: Partial<Specification.RunContainer>): RunContainerIntersection;
}

/**
 * Represents a RunContainer with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RunContainer extends ObjectHydrator<Specification.RunContainer> {
  /**
   * Instanciates a new instance of the RunContainer class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RunContainer.
   */
  constructor(model?: Partial<Specification.RunContainer>) {
    super(model);
    const self = this as unknown as Specification.RunContainer & object;
    if (isObject(model)) {
      if (typeof model.container === 'object') self.container = new _Container(model.container);
    }
    getLifecycleHooks('RunContainer')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RunContainer.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new RunContainer(this as any) as RunContainerIntersection;
    validate('RunContainer', copy, workflow);
  }

  /**
   * Normalizes the current instance of the RunContainer.
   * Creates a copy of the RunContainer, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RunContainer instance.
   */
  normalize(): RunContainer & Specification.RunContainer {
    const copy = new RunContainer(this as any) as RunContainerIntersection;
    return getLifecycleHooks('RunContainer')?.normalize?.(copy) || copy;
  }
}

export const _RunContainer = RunContainer as RunContainerConstructor;
