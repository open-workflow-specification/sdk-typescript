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
 * Represents the intersection between the ContainerPorts class and type
 */
export type ContainerPortsIntersection = ContainerPorts & Specification.ContainerPorts;

/**
 * Represents a constructor for the intersection of the ContainerPorts class and type
 */
export interface ContainerPortsConstructor {
  new (model?: Partial<Specification.ContainerPorts>): ContainerPortsIntersection;
}

/**
 * Represents a ContainerPorts with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ContainerPorts extends ObjectHydrator<Specification.ContainerPorts> {
  /**
   * Instanciates a new instance of the ContainerPorts class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ContainerPorts.
   */
  constructor(model?: Partial<Specification.ContainerPorts>) {
    super(model);

    getLifecycleHooks('ContainerPorts')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ContainerPorts.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ContainerPorts(this as any) as ContainerPortsIntersection;
    validate('ContainerPorts', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ContainerPorts.
   * Creates a copy of the ContainerPorts, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ContainerPorts instance.
   */
  normalize(): ContainerPorts & Specification.ContainerPorts {
    const copy = new ContainerPorts(this as any) as ContainerPortsIntersection;
    return getLifecycleHooks('ContainerPorts')?.normalize?.(copy) || copy;
  }
}

export const _ContainerPorts = ContainerPorts as ContainerPortsConstructor;
