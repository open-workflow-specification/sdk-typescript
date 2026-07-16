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
 * Represents the intersection between the ContainerEnvironment class and type
 */
export type ContainerEnvironmentIntersection = ContainerEnvironment & Specification.ContainerEnvironment;

/**
 * Represents a constructor for the intersection of the ContainerEnvironment class and type
 */
export interface ContainerEnvironmentConstructor {
  new (model?: Partial<Specification.ContainerEnvironment>): ContainerEnvironmentIntersection;
}

/**
 * Represents a ContainerEnvironment with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ContainerEnvironment extends ObjectHydrator<Specification.ContainerEnvironment> {
  /**
   * Instanciates a new instance of the ContainerEnvironment class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ContainerEnvironment.
   */
  constructor(model?: Partial<Specification.ContainerEnvironment>) {
    super(model);

    getLifecycleHooks('ContainerEnvironment')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ContainerEnvironment.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ContainerEnvironment(this as any) as ContainerEnvironmentIntersection;
    validate('ContainerEnvironment', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ContainerEnvironment.
   * Creates a copy of the ContainerEnvironment, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ContainerEnvironment instance.
   */
  normalize(): ContainerEnvironment & Specification.ContainerEnvironment {
    const copy = new ContainerEnvironment(this as any) as ContainerEnvironmentIntersection;
    return getLifecycleHooks('ContainerEnvironment')?.normalize?.(copy) || copy;
  }
}

export const _ContainerEnvironment = ContainerEnvironment as ContainerEnvironmentConstructor;
