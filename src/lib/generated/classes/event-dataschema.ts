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
 * Represents the intersection between the EventDataschema class and type
 */
export type EventDataschemaIntersection = EventDataschema & Specification.EventDataschema;

/**
 * Represents a constructor for the intersection of the EventDataschema class and type
 */
export interface EventDataschemaConstructor {
  new (model?: Partial<Specification.EventDataschema>): EventDataschemaIntersection;
}

/**
 * Represents a EventDataschema with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EventDataschema extends ObjectHydrator<Specification.EventDataschema> {
  /**
   * Instanciates a new instance of the EventDataschema class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EventDataschema.
   */
  constructor(model?: Partial<Specification.EventDataschema>) {
    super(model);

    getLifecycleHooks('EventDataschema')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EventDataschema.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EventDataschema(this as any) as EventDataschemaIntersection;
    validate('EventDataschema', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EventDataschema.
   * Creates a copy of the EventDataschema, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EventDataschema instance.
   */
  normalize(): EventDataschema & Specification.EventDataschema {
    const copy = new EventDataschema(this as any) as EventDataschemaIntersection;
    return getLifecycleHooks('EventDataschema')?.normalize?.(copy) || copy;
  }
}

export const _EventDataschema = EventDataschema as EventDataschemaConstructor;
