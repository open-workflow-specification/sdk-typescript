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
 * Represents the intersection between the EventSource class and type
 */
export type EventSourceIntersection = EventSource & Specification.EventSource;

/**
 * Represents a constructor for the intersection of the EventSource class and type
 */
export interface EventSourceConstructor {
  new (model?: Partial<Specification.EventSource>): EventSourceIntersection;
}

/**
 * Represents a EventSource with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EventSource extends ObjectHydrator<Specification.EventSource> {
  /**
   * Instanciates a new instance of the EventSource class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EventSource.
   */
  constructor(model?: Partial<Specification.EventSource>) {
    super(model);

    getLifecycleHooks('EventSource')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EventSource.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EventSource(this as any) as EventSourceIntersection;
    validate('EventSource', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EventSource.
   * Creates a copy of the EventSource, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EventSource instance.
   */
  normalize(): EventSource & Specification.EventSource {
    const copy = new EventSource(this as any) as EventSourceIntersection;
    return getLifecycleHooks('EventSource')?.normalize?.(copy) || copy;
  }
}

export const _EventSource = EventSource as EventSourceConstructor;
