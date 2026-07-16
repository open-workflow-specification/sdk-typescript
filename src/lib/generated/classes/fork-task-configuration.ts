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

import { _TaskList } from './task-list';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the ForkTaskConfiguration class and type
 */
export type ForkTaskConfigurationIntersection = ForkTaskConfiguration & Specification.ForkTaskConfiguration;

/**
 * Represents a constructor for the intersection of the ForkTaskConfiguration class and type
 */
export interface ForkTaskConfigurationConstructor {
  new (model?: Partial<Specification.ForkTaskConfiguration>): ForkTaskConfigurationIntersection;
}

/**
 * Represents a ForkTaskConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ForkTaskConfiguration extends ObjectHydrator<Specification.ForkTaskConfiguration> {
  /**
   * Instanciates a new instance of the ForkTaskConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ForkTaskConfiguration.
   */
  constructor(model?: Partial<Specification.ForkTaskConfiguration>) {
    super(model);
    const self = this as unknown as Specification.ForkTaskConfiguration & object;
    if (isObject(model)) {
      if (typeof model.branches === 'object') self.branches = new _TaskList(model.branches);
    }
    getLifecycleHooks('ForkTaskConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ForkTaskConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ForkTaskConfiguration(this as any) as ForkTaskConfigurationIntersection;
    validate('ForkTaskConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ForkTaskConfiguration.
   * Creates a copy of the ForkTaskConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ForkTaskConfiguration instance.
   */
  normalize(): ForkTaskConfiguration & Specification.ForkTaskConfiguration {
    const copy = new ForkTaskConfiguration(this as any) as ForkTaskConfigurationIntersection;
    return getLifecycleHooks('ForkTaskConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _ForkTaskConfiguration = ForkTaskConfiguration as ForkTaskConfigurationConstructor;
