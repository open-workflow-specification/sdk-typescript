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
 * Represents the intersection between the TaskMetadata class and type
 */
export type TaskMetadataIntersection = TaskMetadata & Specification.TaskMetadata;

/**
 * Represents a constructor for the intersection of the TaskMetadata class and type
 */
export interface TaskMetadataConstructor {
  new (model?: Partial<Specification.TaskMetadata>): TaskMetadataIntersection;
}

/**
 * Represents a TaskMetadata with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class TaskMetadata extends ObjectHydrator<Specification.TaskMetadata> {
  /**
   * Instanciates a new instance of the TaskMetadata class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the TaskMetadata.
   */
  constructor(model?: Partial<Specification.TaskMetadata>) {
    super(model);

    getLifecycleHooks('TaskMetadata')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the TaskMetadata.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new TaskMetadata(this as any) as TaskMetadataIntersection;
    validate('TaskMetadata', copy, workflow);
  }

  /**
   * Normalizes the current instance of the TaskMetadata.
   * Creates a copy of the TaskMetadata, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the TaskMetadata instance.
   */
  normalize(): TaskMetadata & Specification.TaskMetadata {
    const copy = new TaskMetadata(this as any) as TaskMetadataIntersection;
    return getLifecycleHooks('TaskMetadata')?.normalize?.(copy) || copy;
  }
}

export const _TaskMetadata = TaskMetadata as TaskMetadataConstructor;
