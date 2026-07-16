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

import { _Duration } from './duration';
import { _EventConsumptionStrategy } from './event-consumption-strategy';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Schedule class and type
 */
export type ScheduleIntersection = Schedule & Specification.Schedule;

/**
 * Represents a constructor for the intersection of the Schedule class and type
 */
export interface ScheduleConstructor {
  new (model?: Partial<Specification.Schedule>): ScheduleIntersection;
}

/**
 * Represents a Schedule with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Schedule extends ObjectHydrator<Specification.Schedule> {
  /**
   * Instanciates a new instance of the Schedule class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Schedule.
   */
  constructor(model?: Partial<Specification.Schedule>) {
    super(model);
    const self = this as unknown as Specification.Schedule & object;
    if (isObject(model)) {
      if (typeof model.every === 'object') self.every = new _Duration(model.every);
      if (typeof model.after === 'object') self.after = new _Duration(model.after);
      if (typeof model.on === 'object') self.on = new _EventConsumptionStrategy(model.on);
    }
    getLifecycleHooks('Schedule')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Schedule.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Schedule(this as any) as ScheduleIntersection;
    validate('Schedule', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Schedule.
   * Creates a copy of the Schedule, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Schedule instance.
   */
  normalize(): Schedule & Specification.Schedule {
    const copy = new Schedule(this as any) as ScheduleIntersection;
    return getLifecycleHooks('Schedule')?.normalize?.(copy) || copy;
  }
}

export const _Schedule = Schedule as ScheduleConstructor;
