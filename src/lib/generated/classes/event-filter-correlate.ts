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
 * Represents the intersection between the EventFilterCorrelate class and type
 */
export type EventFilterCorrelateIntersection = EventFilterCorrelate & Specification.EventFilterCorrelate;

/**
 * Represents a constructor for the intersection of the EventFilterCorrelate class and type
 */
export interface EventFilterCorrelateConstructor {
  new (model?: Partial<Specification.EventFilterCorrelate>): EventFilterCorrelateIntersection;
}

/**
 * Represents a EventFilterCorrelate with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EventFilterCorrelate extends ObjectHydrator<Specification.EventFilterCorrelate> {
  /**
   * Instanciates a new instance of the EventFilterCorrelate class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EventFilterCorrelate.
   */
  constructor(model?: Partial<Specification.EventFilterCorrelate>) {
    super(model);

    getLifecycleHooks('EventFilterCorrelate')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EventFilterCorrelate.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EventFilterCorrelate(this as any) as EventFilterCorrelateIntersection;
    validate('EventFilterCorrelate', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EventFilterCorrelate.
   * Creates a copy of the EventFilterCorrelate, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EventFilterCorrelate instance.
   */
  normalize(): EventFilterCorrelate & Specification.EventFilterCorrelate {
    const copy = new EventFilterCorrelate(this as any) as EventFilterCorrelateIntersection;
    return getLifecycleHooks('EventFilterCorrelate')?.normalize?.(copy) || copy;
  }
}

export const _EventFilterCorrelate = EventFilterCorrelate as EventFilterCorrelateConstructor;
