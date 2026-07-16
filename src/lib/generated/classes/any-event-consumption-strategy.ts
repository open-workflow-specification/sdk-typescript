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

import { _AnyEventConsumptionStrategyConfiguration } from './any-event-consumption-strategy-configuration';
import { _AnyEventConsumptionStrategyUntil } from './any-event-consumption-strategy-until';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the AnyEventConsumptionStrategy class and type
 */
export type AnyEventConsumptionStrategyIntersection = AnyEventConsumptionStrategy &
  Specification.AnyEventConsumptionStrategy;

/**
 * Represents a constructor for the intersection of the AnyEventConsumptionStrategy class and type
 */
export interface AnyEventConsumptionStrategyConstructor {
  new (model?: Partial<Specification.AnyEventConsumptionStrategy>): AnyEventConsumptionStrategyIntersection;
}

/**
 * Represents a AnyEventConsumptionStrategy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class AnyEventConsumptionStrategy extends ObjectHydrator<Specification.AnyEventConsumptionStrategy> {
  /**
   * Instanciates a new instance of the AnyEventConsumptionStrategy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the AnyEventConsumptionStrategy.
   */
  constructor(model?: Partial<Specification.AnyEventConsumptionStrategy>) {
    super(model);
    const self = this as unknown as Specification.AnyEventConsumptionStrategy & object;
    if (isObject(model)) {
      if (typeof model.any === 'object') self.any = new _AnyEventConsumptionStrategyConfiguration(model.any);
      if (typeof model.until === 'object') self.until = new _AnyEventConsumptionStrategyUntil(model.until);
    }
    getLifecycleHooks('AnyEventConsumptionStrategy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the AnyEventConsumptionStrategy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new AnyEventConsumptionStrategy(this as any) as AnyEventConsumptionStrategyIntersection;
    validate('AnyEventConsumptionStrategy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the AnyEventConsumptionStrategy.
   * Creates a copy of the AnyEventConsumptionStrategy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the AnyEventConsumptionStrategy instance.
   */
  normalize(): AnyEventConsumptionStrategy & Specification.AnyEventConsumptionStrategy {
    const copy = new AnyEventConsumptionStrategy(this as any) as AnyEventConsumptionStrategyIntersection;
    return getLifecycleHooks('AnyEventConsumptionStrategy')?.normalize?.(copy) || copy;
  }
}

export const _AnyEventConsumptionStrategy = AnyEventConsumptionStrategy as AnyEventConsumptionStrategyConstructor;
