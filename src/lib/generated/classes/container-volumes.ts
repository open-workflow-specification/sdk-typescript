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
 * Represents the intersection between the ContainerVolumes class and type
 */
export type ContainerVolumesIntersection = ContainerVolumes & Specification.ContainerVolumes;

/**
 * Represents a constructor for the intersection of the ContainerVolumes class and type
 */
export interface ContainerVolumesConstructor {
  new (model?: Partial<Specification.ContainerVolumes>): ContainerVolumesIntersection;
}

/**
 * Represents a ContainerVolumes with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ContainerVolumes extends ObjectHydrator<Specification.ContainerVolumes> {
  /**
   * Instanciates a new instance of the ContainerVolumes class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ContainerVolumes.
   */
  constructor(model?: Partial<Specification.ContainerVolumes>) {
    super(model);

    getLifecycleHooks('ContainerVolumes')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ContainerVolumes.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ContainerVolumes(this as any) as ContainerVolumesIntersection;
    validate('ContainerVolumes', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ContainerVolumes.
   * Creates a copy of the ContainerVolumes, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ContainerVolumes instance.
   */
  normalize(): ContainerVolumes & Specification.ContainerVolumes {
    const copy = new ContainerVolumes(this as any) as ContainerVolumesIntersection;
    return getLifecycleHooks('ContainerVolumes')?.normalize?.(copy) || copy;
  }
}

export const _ContainerVolumes = ContainerVolumes as ContainerVolumesConstructor;
