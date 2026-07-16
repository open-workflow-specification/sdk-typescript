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
import { _EventFilter } from './event-filter';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the AnyEventUntilConsumed class and type
 */
export type AnyEventUntilConsumedIntersection = AnyEventUntilConsumed & Specification.AnyEventUntilConsumed;

/**
 * Represents a constructor for the intersection of the AnyEventUntilConsumed class and type
 */
export interface AnyEventUntilConsumedConstructor {
  new (model?: Partial<Specification.AnyEventUntilConsumed>): AnyEventUntilConsumedIntersection;
}

/**
 * Represents a AnyEventUntilConsumed with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class AnyEventUntilConsumed extends ObjectHydrator<Specification.AnyEventUntilConsumed> {
  /**
   * Instanciates a new instance of the AnyEventUntilConsumed class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the AnyEventUntilConsumed.
   */
  constructor(model?: Partial<Specification.AnyEventUntilConsumed>) {
    super(model);
    const self = this as unknown as Specification.AnyEventUntilConsumed & object;
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
      if (typeof (model as Specification.OneEventConsumptionStrategy).one === 'object')
        (self as Specification.OneEventConsumptionStrategy).one = new _EventFilter(
          (model as Specification.OneEventConsumptionStrategy).one as Specification.EventFilter,
        );
    }
    getLifecycleHooks('AnyEventUntilConsumed')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the AnyEventUntilConsumed.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new AnyEventUntilConsumed(this as any) as AnyEventUntilConsumedIntersection;
    validate('AnyEventUntilConsumed', copy, workflow);
  }

  /**
   * Normalizes the current instance of the AnyEventUntilConsumed.
   * Creates a copy of the AnyEventUntilConsumed, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the AnyEventUntilConsumed instance.
   */
  normalize(): AnyEventUntilConsumed & Specification.AnyEventUntilConsumed {
    const copy = new AnyEventUntilConsumed(this as any) as AnyEventUntilConsumedIntersection;
    return getLifecycleHooks('AnyEventUntilConsumed')?.normalize?.(copy) || copy;
  }
}

export const _AnyEventUntilConsumed = AnyEventUntilConsumed as AnyEventUntilConsumedConstructor;
