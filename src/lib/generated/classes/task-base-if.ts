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
 * Represents the intersection between the TaskBaseIf class and type
 */
export type TaskBaseIfIntersection = TaskBaseIf & Specification.TaskBaseIf;

/**
 * Represents a constructor for the intersection of the TaskBaseIf class and type
 */
export interface TaskBaseIfConstructor {
  new (model?: Partial<Specification.TaskBaseIf>): TaskBaseIfIntersection;
}

/**
 * Represents a TaskBaseIf with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class TaskBaseIf extends ObjectHydrator<Specification.TaskBaseIf> {
  /**
   * Instanciates a new instance of the TaskBaseIf class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the TaskBaseIf.
   */
  constructor(model?: Partial<Specification.TaskBaseIf>) {
    super(model);

    getLifecycleHooks('TaskBaseIf')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the TaskBaseIf.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new TaskBaseIf(this as any) as TaskBaseIfIntersection;
    validate('TaskBaseIf', copy, workflow);
  }

  /**
   * Normalizes the current instance of the TaskBaseIf.
   * Creates a copy of the TaskBaseIf, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the TaskBaseIf instance.
   */
  normalize(): TaskBaseIf & Specification.TaskBaseIf {
    const copy = new TaskBaseIf(this as any) as TaskBaseIfIntersection;
    return getLifecycleHooks('TaskBaseIf')?.normalize?.(copy) || copy;
  }
}

export const _TaskBaseIf = TaskBaseIf as TaskBaseIfConstructor;
