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
import { _TaskList } from './task-list';
import { _TryTaskCatch } from './try-task-catch';
import { _TaskBase } from './task-base';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the TryTask class and type
 */
export type TryTaskIntersection = TryTask & Specification.TryTask;

/**
 * Represents a constructor for the intersection of the TryTask class and type
 */
export interface TryTaskConstructor {
  new (model?: Partial<Specification.TryTask>): TryTaskIntersection;
}

/**
 * Represents a TryTask with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class TryTask extends _TaskBase {
  /**
   * Instanciates a new instance of the TryTask class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the TryTask.
   */
  constructor(model?: Partial<Specification.TryTask>) {
    super(model);
    const self = this as unknown as Specification.TryTask & object;
    if (isObject(model)) {
      if (typeof model.input === 'object') self.input = new _Input(model.input);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.export === 'object') self.export = new _Export(model.export);
      if (typeof model.timeout === 'object') self.timeout = new _TaskTimeout(model.timeout);
      if (typeof model.metadata === 'object') self.metadata = new _TaskMetadata(model.metadata);
      if (typeof model.try === 'object') self.try = new _TaskList(model.try);
      if (typeof model.catch === 'object') self.catch = new _TryTaskCatch(model.catch);
    }
    getLifecycleHooks('TryTask')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the TryTask.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new TryTask(this as any) as TryTaskIntersection;
    validate('TryTask', copy, workflow);
  }

  /**
   * Normalizes the current instance of the TryTask.
   * Creates a copy of the TryTask, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the TryTask instance.
   */
  normalize(): TryTask & Specification.TryTask {
    const copy = new TryTask(this as any) as TryTaskIntersection;
    return getLifecycleHooks('TryTask')?.normalize?.(copy) || copy;
  }
}

export const _TryTask = TryTask as TryTaskConstructor;
