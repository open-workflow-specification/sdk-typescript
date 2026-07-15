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

import { _RaiseTaskError } from './raise-task-error';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RaiseTaskConfiguration class and type
 */
export type RaiseTaskConfigurationIntersection = RaiseTaskConfiguration & Specification.RaiseTaskConfiguration;

/**
 * Represents a constructor for the intersection of the RaiseTaskConfiguration class and type
 */
export interface RaiseTaskConfigurationConstructor {
  new (model?: Partial<Specification.RaiseTaskConfiguration>): RaiseTaskConfigurationIntersection;
}

/**
 * Represents a RaiseTaskConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RaiseTaskConfiguration extends ObjectHydrator<Specification.RaiseTaskConfiguration> {
  /**
   * Instanciates a new instance of the RaiseTaskConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RaiseTaskConfiguration.
   */
  constructor(model?: Partial<Specification.RaiseTaskConfiguration>) {
    super(model);
    const self = this as unknown as Specification.RaiseTaskConfiguration & object;
    if (isObject(model)) {
      if (typeof model.error === 'object') self.error = new _RaiseTaskError(model.error);
    }
    getLifecycleHooks('RaiseTaskConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RaiseTaskConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new RaiseTaskConfiguration(this as any) as RaiseTaskConfigurationIntersection;
    validate('RaiseTaskConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the RaiseTaskConfiguration.
   * Creates a copy of the RaiseTaskConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RaiseTaskConfiguration instance.
   */
  normalize(): RaiseTaskConfiguration & Specification.RaiseTaskConfiguration {
    const copy = new RaiseTaskConfiguration(this as any) as RaiseTaskConfigurationIntersection;
    return getLifecycleHooks('RaiseTaskConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _RaiseTaskConfiguration = RaiseTaskConfiguration as RaiseTaskConfigurationConstructor;
