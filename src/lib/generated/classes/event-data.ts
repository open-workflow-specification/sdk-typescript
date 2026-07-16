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
 * Represents the intersection between the EventData class and type
 */
export type EventDataIntersection = EventData & Specification.EventData;

/**
 * Represents a constructor for the intersection of the EventData class and type
 */
export interface EventDataConstructor {
  new (model?: Partial<Specification.EventData>): EventDataIntersection;
}

/**
 * Represents a EventData with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EventData extends ObjectHydrator<Specification.EventData> {
  /**
   * Instanciates a new instance of the EventData class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EventData.
   */
  constructor(model?: Partial<Specification.EventData>) {
    super(model);

    getLifecycleHooks('EventData')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EventData.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EventData(this as any) as EventDataIntersection;
    validate('EventData', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EventData.
   * Creates a copy of the EventData, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EventData instance.
   */
  normalize(): EventData & Specification.EventData {
    const copy = new EventData(this as any) as EventDataIntersection;
    return getLifecycleHooks('EventData')?.normalize?.(copy) || copy;
  }
}

export const _EventData = EventData as EventDataConstructor;
