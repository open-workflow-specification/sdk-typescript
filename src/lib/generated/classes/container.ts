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

import { _ContainerPorts } from './container-ports';
import { _ContainerVolumes } from './container-volumes';
import { _ContainerEnvironment } from './container-environment';
import { _ContainerLifetime } from './container-lifetime';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Container class and type
 */
export type ContainerIntersection = Container & Specification.Container;

/**
 * Represents a constructor for the intersection of the Container class and type
 */
export interface ContainerConstructor {
  new (model?: Partial<Specification.Container>): ContainerIntersection;
}

/**
 * Represents a Container with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Container extends ObjectHydrator<Specification.Container> {
  /**
   * Instanciates a new instance of the Container class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Container.
   */
  constructor(model?: Partial<Specification.Container>) {
    super(model);
    const self = this as unknown as Specification.Container & object;
    if (isObject(model)) {
      if (typeof model.ports === 'object') self.ports = new _ContainerPorts(model.ports);
      if (typeof model.volumes === 'object') self.volumes = new _ContainerVolumes(model.volumes);
      if (typeof model.environment === 'object') self.environment = new _ContainerEnvironment(model.environment);
      if (typeof model.lifetime === 'object') self.lifetime = new _ContainerLifetime(model.lifetime);
    }
    getLifecycleHooks('Container')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Container.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Container(this as any) as ContainerIntersection;
    validate('Container', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Container.
   * Creates a copy of the Container, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Container instance.
   */
  normalize(): Container & Specification.Container {
    const copy = new Container(this as any) as ContainerIntersection;
    return getLifecycleHooks('Container')?.normalize?.(copy) || copy;
  }
}

export const _Container = Container as ContainerConstructor;
