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
 * Represents the intersection between the AnyEventConsumptionStrategyUntil class and type
 */
export type AnyEventConsumptionStrategyUntilIntersection = AnyEventConsumptionStrategyUntil &
  Specification.AnyEventConsumptionStrategyUntil;

/**
 * Represents a constructor for the intersection of the AnyEventConsumptionStrategyUntil class and type
 */
export interface AnyEventConsumptionStrategyUntilConstructor {
  new (model?: Partial<Specification.AnyEventConsumptionStrategyUntil>): AnyEventConsumptionStrategyUntilIntersection;
}

/**
 * Represents a AnyEventConsumptionStrategyUntil with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class AnyEventConsumptionStrategyUntil extends ObjectHydrator<Specification.AnyEventConsumptionStrategyUntil> {
  /**
   * Instanciates a new instance of the AnyEventConsumptionStrategyUntil class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the AnyEventConsumptionStrategyUntil.
   */
  constructor(model?: Partial<Specification.AnyEventConsumptionStrategyUntil>) {
    super(model);
    const self = this as unknown as Specification.AnyEventConsumptionStrategyUntil & object;
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
    getLifecycleHooks('AnyEventConsumptionStrategyUntil')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the AnyEventConsumptionStrategyUntil.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new AnyEventConsumptionStrategyUntil(this as any) as AnyEventConsumptionStrategyUntilIntersection;
    validate('AnyEventConsumptionStrategyUntil', copy, workflow);
  }

  /**
   * Normalizes the current instance of the AnyEventConsumptionStrategyUntil.
   * Creates a copy of the AnyEventConsumptionStrategyUntil, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the AnyEventConsumptionStrategyUntil instance.
   */
  normalize(): AnyEventConsumptionStrategyUntil & Specification.AnyEventConsumptionStrategyUntil {
    const copy = new AnyEventConsumptionStrategyUntil(this as any) as AnyEventConsumptionStrategyUntilIntersection;
    return getLifecycleHooks('AnyEventConsumptionStrategyUntil')?.normalize?.(copy) || copy;
  }
}

export const _AnyEventConsumptionStrategyUntil =
  AnyEventConsumptionStrategyUntil as AnyEventConsumptionStrategyUntilConstructor;
