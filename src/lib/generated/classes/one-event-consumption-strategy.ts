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

import { _EventFilter } from './event-filter';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the OneEventConsumptionStrategy class and type
 */
export type OneEventConsumptionStrategyIntersection = OneEventConsumptionStrategy &
  Specification.OneEventConsumptionStrategy;

/**
 * Represents a constructor for the intersection of the OneEventConsumptionStrategy class and type
 */
export interface OneEventConsumptionStrategyConstructor {
  new (model?: Partial<Specification.OneEventConsumptionStrategy>): OneEventConsumptionStrategyIntersection;
}

/**
 * Represents a OneEventConsumptionStrategy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OneEventConsumptionStrategy extends ObjectHydrator<Specification.OneEventConsumptionStrategy> {
  /**
   * Instanciates a new instance of the OneEventConsumptionStrategy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OneEventConsumptionStrategy.
   */
  constructor(model?: Partial<Specification.OneEventConsumptionStrategy>) {
    super(model);
    const self = this as unknown as Specification.OneEventConsumptionStrategy & object;
    if (isObject(model)) {
      if (typeof model.one === 'object') self.one = new _EventFilter(model.one);
    }
    getLifecycleHooks('OneEventConsumptionStrategy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OneEventConsumptionStrategy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OneEventConsumptionStrategy(this as any) as OneEventConsumptionStrategyIntersection;
    validate('OneEventConsumptionStrategy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OneEventConsumptionStrategy.
   * Creates a copy of the OneEventConsumptionStrategy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OneEventConsumptionStrategy instance.
   */
  normalize(): OneEventConsumptionStrategy & Specification.OneEventConsumptionStrategy {
    const copy = new OneEventConsumptionStrategy(this as any) as OneEventConsumptionStrategyIntersection;
    return getLifecycleHooks('OneEventConsumptionStrategy')?.normalize?.(copy) || copy;
  }
}

export const _OneEventConsumptionStrategy = OneEventConsumptionStrategy as OneEventConsumptionStrategyConstructor;
