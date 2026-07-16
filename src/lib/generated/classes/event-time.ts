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

import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';

/**
 * Represents the intersection between the EventTime class and type
 */
export type EventTimeIntersection = EventTime & Specification.EventTime;

/**
 * Represents a constructor for the intersection of the EventTime class and type
 */
export interface EventTimeConstructor {
  new (model?: Partial<Specification.EventTime>): EventTimeIntersection;
}

/**
 * Represents a EventTime with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EventTime extends ObjectHydrator<Specification.EventTime> {
  /**
   * Instanciates a new instance of the EventTime class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EventTime.
   */
  constructor(model?: Partial<Specification.EventTime>) {
    super(model);

    getLifecycleHooks('EventTime')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EventTime.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EventTime(this as any) as EventTimeIntersection;
    validate('EventTime', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EventTime.
   * Creates a copy of the EventTime, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EventTime instance.
   */
  normalize(): EventTime & Specification.EventTime {
    const copy = new EventTime(this as any) as EventTimeIntersection;
    return getLifecycleHooks('EventTime')?.normalize?.(copy) || copy;
  }
}

export const _EventTime = EventTime as EventTimeConstructor;
