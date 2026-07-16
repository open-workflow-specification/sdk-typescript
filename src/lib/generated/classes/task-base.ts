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

import { _Input } from './input';
import { _Output } from './output';
import { _Export } from './export';
import { _TaskTimeout } from './task-timeout';
import { _TaskMetadata } from './task-metadata';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the TaskBase class and type
 */
export type TaskBaseIntersection = TaskBase & Specification.TaskBase;

/**
 * Represents a constructor for the intersection of the TaskBase class and type
 */
export interface TaskBaseConstructor {
  new (model?: Partial<Specification.TaskBase>): TaskBaseIntersection;
}

/**
 * Represents a TaskBase with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class TaskBase extends ObjectHydrator<Specification.TaskBase> {
  /**
   * Instanciates a new instance of the TaskBase class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the TaskBase.
   */
  constructor(model?: Partial<Specification.TaskBase>) {
    super(model);
    const self = this as unknown as Specification.TaskBase & object;
    if (isObject(model)) {
      if (typeof model.input === 'object') self.input = new _Input(model.input);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.export === 'object') self.export = new _Export(model.export);
      if (typeof model.timeout === 'object') self.timeout = new _TaskTimeout(model.timeout);
      if (typeof model.metadata === 'object') self.metadata = new _TaskMetadata(model.metadata);
    }
    getLifecycleHooks('TaskBase')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the TaskBase.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new TaskBase(this as any) as TaskBaseIntersection;
    validate('TaskBase', copy, workflow);
  }

  /**
   * Normalizes the current instance of the TaskBase.
   * Creates a copy of the TaskBase, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the TaskBase instance.
   */
  normalize(): TaskBase & Specification.TaskBase {
    const copy = new TaskBase(this as any) as TaskBaseIntersection;
    return getLifecycleHooks('TaskBase')?.normalize?.(copy) || copy;
  }
}

export const _TaskBase = TaskBase as TaskBaseConstructor;
