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

import { _AllEventConsumptionStrategyConfiguration } from './all-event-consumption-strategy-configuration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the AllEventConsumptionStrategy class and type
 */
export type AllEventConsumptionStrategyIntersection = AllEventConsumptionStrategy &
  Specification.AllEventConsumptionStrategy;

/**
 * Represents a constructor for the intersection of the AllEventConsumptionStrategy class and type
 */
export interface AllEventConsumptionStrategyConstructor {
  new (model?: Partial<Specification.AllEventConsumptionStrategy>): AllEventConsumptionStrategyIntersection;
}

/**
 * Represents a AllEventConsumptionStrategy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class AllEventConsumptionStrategy extends ObjectHydrator<Specification.AllEventConsumptionStrategy> {
  /**
   * Instanciates a new instance of the AllEventConsumptionStrategy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the AllEventConsumptionStrategy.
   */
  constructor(model?: Partial<Specification.AllEventConsumptionStrategy>) {
    super(model);
    const self = this as unknown as Specification.AllEventConsumptionStrategy & object;
    if (isObject(model)) {
      if (typeof model.all === 'object') self.all = new _AllEventConsumptionStrategyConfiguration(model.all);
    }
    getLifecycleHooks('AllEventConsumptionStrategy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the AllEventConsumptionStrategy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new AllEventConsumptionStrategy(this as any) as AllEventConsumptionStrategyIntersection;
    validate('AllEventConsumptionStrategy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the AllEventConsumptionStrategy.
   * Creates a copy of the AllEventConsumptionStrategy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the AllEventConsumptionStrategy instance.
   */
  normalize(): AllEventConsumptionStrategy & Specification.AllEventConsumptionStrategy {
    const copy = new AllEventConsumptionStrategy(this as any) as AllEventConsumptionStrategyIntersection;
    return getLifecycleHooks('AllEventConsumptionStrategy')?.normalize?.(copy) || copy;
  }
}

export const _AllEventConsumptionStrategy = AllEventConsumptionStrategy as AllEventConsumptionStrategyConstructor;
