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

import { _WithEvent } from './with-event';
import { _EventFilterCorrelate } from './event-filter-correlate';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the EventFilter class and type
 */
export type EventFilterIntersection = EventFilter & Specification.EventFilter;

/**
 * Represents a constructor for the intersection of the EventFilter class and type
 */
export interface EventFilterConstructor {
  new (model?: Partial<Specification.EventFilter>): EventFilterIntersection;
}

/**
 * Represents a EventFilter with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EventFilter extends ObjectHydrator<Specification.EventFilter> {
  /**
   * Instanciates a new instance of the EventFilter class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EventFilter.
   */
  constructor(model?: Partial<Specification.EventFilter>) {
    super(model);
    const self = this as unknown as Specification.EventFilter & object;
    if (isObject(model)) {
      if (typeof model.with === 'object') self.with = new _WithEvent(model.with);
      if (typeof model.correlate === 'object') self.correlate = new _EventFilterCorrelate(model.correlate);
    }
    getLifecycleHooks('EventFilter')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EventFilter.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EventFilter(this as any) as EventFilterIntersection;
    validate('EventFilter', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EventFilter.
   * Creates a copy of the EventFilter, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EventFilter instance.
   */
  normalize(): EventFilter & Specification.EventFilter {
    const copy = new EventFilter(this as any) as EventFilterIntersection;
    return getLifecycleHooks('EventFilter')?.normalize?.(copy) || copy;
  }
}

export const _EventFilter = EventFilter as EventFilterConstructor;
