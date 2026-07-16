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

import { _EventConsumptionStrategy } from './event-consumption-strategy';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the ListenTaskConfiguration class and type
 */
export type ListenTaskConfigurationIntersection = ListenTaskConfiguration & Specification.ListenTaskConfiguration;

/**
 * Represents a constructor for the intersection of the ListenTaskConfiguration class and type
 */
export interface ListenTaskConfigurationConstructor {
  new (model?: Partial<Specification.ListenTaskConfiguration>): ListenTaskConfigurationIntersection;
}

/**
 * Represents a ListenTaskConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ListenTaskConfiguration extends ObjectHydrator<Specification.ListenTaskConfiguration> {
  /**
   * Instanciates a new instance of the ListenTaskConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ListenTaskConfiguration.
   */
  constructor(model?: Partial<Specification.ListenTaskConfiguration>) {
    super(model);
    const self = this as unknown as Specification.ListenTaskConfiguration & object;
    if (isObject(model)) {
      if (typeof model.to === 'object') self.to = new _EventConsumptionStrategy(model.to);
    }
    getLifecycleHooks('ListenTaskConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ListenTaskConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ListenTaskConfiguration(this as any) as ListenTaskConfigurationIntersection;
    validate('ListenTaskConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ListenTaskConfiguration.
   * Creates a copy of the ListenTaskConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ListenTaskConfiguration instance.
   */
  normalize(): ListenTaskConfiguration & Specification.ListenTaskConfiguration {
    const copy = new ListenTaskConfiguration(this as any) as ListenTaskConfigurationIntersection;
    return getLifecycleHooks('ListenTaskConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _ListenTaskConfiguration = ListenTaskConfiguration as ListenTaskConfigurationConstructor;
