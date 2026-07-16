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
 * Represents the intersection between the CallTask class and type
 */
export type CallTaskIntersection = CallTask & Specification.CallTask;

/**
 * Represents a constructor for the intersection of the CallTask class and type
 */
export interface CallTaskConstructor {
  new (model?: Partial<Specification.CallTask>): CallTaskIntersection;
}

/**
 * Represents a CallTask with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CallTask extends ObjectHydrator<Specification.CallTask> {
  /**
   * Instanciates a new instance of the CallTask class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CallTask.
   */
  constructor(model?: Partial<Specification.CallTask>) {
    super(model);
    const self = this as unknown as Specification.CallTask & object;
    if (isObject(model)) {
      if (typeof (model as Specification.TaskBase).input === 'object')
        (self as Specification.TaskBase).input = new _Input(
          (model as Specification.TaskBase).input as Specification.Input,
        );
      if (typeof (model as Specification.TaskBase).output === 'object')
        (self as Specification.TaskBase).output = new _Output(
          (model as Specification.TaskBase).output as Specification.Output,
        );
      if (typeof (model as Specification.TaskBase).export === 'object')
        (self as Specification.TaskBase).export = new _Export(
          (model as Specification.TaskBase).export as Specification.Export,
        );
      if (typeof (model as Specification.TaskBase).timeout === 'object')
        (self as Specification.TaskBase).timeout = new _TaskTimeout(
          (model as Specification.TaskBase).timeout as Specification.TaskTimeout,
        );
      if (typeof (model as Specification.TaskBase).metadata === 'object')
        (self as Specification.TaskBase).metadata = new _TaskMetadata(
          (model as Specification.TaskBase).metadata as Specification.TaskMetadata,
        );
    }
    getLifecycleHooks('CallTask')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CallTask.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new CallTask(this as any) as CallTaskIntersection;
    validate('CallTask', copy, workflow);
  }

  /**
   * Normalizes the current instance of the CallTask.
   * Creates a copy of the CallTask, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CallTask instance.
   */
  normalize(): CallTask & Specification.CallTask {
    const copy = new CallTask(this as any) as CallTaskIntersection;
    return getLifecycleHooks('CallTask')?.normalize?.(copy) || copy;
  }
}

export const _CallTask = CallTask as CallTaskConstructor;
