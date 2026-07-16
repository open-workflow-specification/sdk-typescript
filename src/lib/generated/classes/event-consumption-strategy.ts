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
import { _AnyEventConsumptionStrategyConfiguration } from './any-event-consumption-strategy-configuration';
import { _AnyEventConsumptionStrategyUntil } from './any-event-consumption-strategy-until';
import { _EventFilter } from './event-filter';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the EventConsumptionStrategy class and type
 */
export type EventConsumptionStrategyIntersection = EventConsumptionStrategy & Specification.EventConsumptionStrategy;

/**
 * Represents a constructor for the intersection of the EventConsumptionStrategy class and type
 */
export interface EventConsumptionStrategyConstructor {
  new (model?: Partial<Specification.EventConsumptionStrategy>): EventConsumptionStrategyIntersection;
}

/**
 * Represents a EventConsumptionStrategy with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EventConsumptionStrategy extends ObjectHydrator<Specification.EventConsumptionStrategy> {
  /**
   * Instanciates a new instance of the EventConsumptionStrategy class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EventConsumptionStrategy.
   */
  constructor(model?: Partial<Specification.EventConsumptionStrategy>) {
    super(model);
    const self = this as unknown as Specification.EventConsumptionStrategy & object;
    if (isObject(model)) {
      if (typeof (model as Specification.AllEventConsumptionStrategy).all === 'object')
        (self as Specification.AllEventConsumptionStrategy).all = new _AllEventConsumptionStrategyConfiguration(
          (model as Specification.AllEventConsumptionStrategy)
            .all as Specification.AllEventConsumptionStrategyConfiguration,
        );
      if (typeof (model as Specification.AnyEventConsumptionStrategy).any === 'object')
        (self as Specification.AnyEventConsumptionStrategy).any = new _AnyEventConsumptionStrategyConfiguration(
          (model as Specification.AnyEventConsumptionStrategy)
            .any as Specification.AnyEventConsumptionStrategyConfiguration,
        );
      if (typeof (model as Specification.AnyEventConsumptionStrategy).until === 'object')
        (self as Specification.AnyEventConsumptionStrategy).until = new _AnyEventConsumptionStrategyUntil(
          (model as Specification.AnyEventConsumptionStrategy).until as Specification.AnyEventConsumptionStrategyUntil,
        );
      if (typeof (model as Specification.OneEventConsumptionStrategy).one === 'object')
        (self as Specification.OneEventConsumptionStrategy).one = new _EventFilter(
          (model as Specification.OneEventConsumptionStrategy).one as Specification.EventFilter,
        );
    }
    getLifecycleHooks('EventConsumptionStrategy')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EventConsumptionStrategy.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EventConsumptionStrategy(this as any) as EventConsumptionStrategyIntersection;
    validate('EventConsumptionStrategy', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EventConsumptionStrategy.
   * Creates a copy of the EventConsumptionStrategy, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EventConsumptionStrategy instance.
   */
  normalize(): EventConsumptionStrategy & Specification.EventConsumptionStrategy {
    const copy = new EventConsumptionStrategy(this as any) as EventConsumptionStrategyIntersection;
    return getLifecycleHooks('EventConsumptionStrategy')?.normalize?.(copy) || copy;
  }
}

export const _EventConsumptionStrategy = EventConsumptionStrategy as EventConsumptionStrategyConstructor;
