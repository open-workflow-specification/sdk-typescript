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
 * Represents the intersection between the WorkflowTags class and type
 */
export type WorkflowTagsIntersection = WorkflowTags & Specification.WorkflowTags;

/**
 * Represents a constructor for the intersection of the WorkflowTags class and type
 */
export interface WorkflowTagsConstructor {
  new (model?: Partial<Specification.WorkflowTags>): WorkflowTagsIntersection;
}

/**
 * Represents a WorkflowTags with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class WorkflowTags extends ObjectHydrator<Specification.WorkflowTags> {
  /**
   * Instanciates a new instance of the WorkflowTags class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the WorkflowTags.
   */
  constructor(model?: Partial<Specification.WorkflowTags>) {
    super(model);

    getLifecycleHooks('WorkflowTags')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the WorkflowTags.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new WorkflowTags(this as any) as WorkflowTagsIntersection;
    validate('WorkflowTags', copy, workflow);
  }

  /**
   * Normalizes the current instance of the WorkflowTags.
   * Creates a copy of the WorkflowTags, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the WorkflowTags instance.
   */
  normalize(): WorkflowTags & Specification.WorkflowTags {
    const copy = new WorkflowTags(this as any) as WorkflowTagsIntersection;
    return getLifecycleHooks('WorkflowTags')?.normalize?.(copy) || copy;
  }
}

export const _WorkflowTags = WorkflowTags as WorkflowTagsConstructor;
