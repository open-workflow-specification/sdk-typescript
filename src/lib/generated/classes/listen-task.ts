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
import { _ListenTaskConfiguration } from './listen-task-configuration';
import { _SubscriptionIterator } from './subscription-iterator';
import { _TaskBase } from './task-base';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the ListenTask class and type
 */
export type ListenTaskIntersection = ListenTask & Specification.ListenTask;

/**
 * Represents a constructor for the intersection of the ListenTask class and type
 */
export interface ListenTaskConstructor {
  new (model?: Partial<Specification.ListenTask>): ListenTaskIntersection;
}

/**
 * Represents a ListenTask with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ListenTask extends _TaskBase {
  /**
   * Instanciates a new instance of the ListenTask class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ListenTask.
   */
  constructor(model?: Partial<Specification.ListenTask>) {
    super(model);
    const self = this as unknown as Specification.ListenTask & object;
    if (isObject(model)) {
      if (typeof model.input === 'object') self.input = new _Input(model.input);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.export === 'object') self.export = new _Export(model.export);
      if (typeof model.timeout === 'object') self.timeout = new _TaskTimeout(model.timeout);
      if (typeof model.metadata === 'object') self.metadata = new _TaskMetadata(model.metadata);
      if (typeof model.listen === 'object') self.listen = new _ListenTaskConfiguration(model.listen);
      if (typeof model.foreach === 'object') self.foreach = new _SubscriptionIterator(model.foreach);
    }
    getLifecycleHooks('ListenTask')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ListenTask.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ListenTask(this as any) as ListenTaskIntersection;
    validate('ListenTask', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ListenTask.
   * Creates a copy of the ListenTask, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ListenTask instance.
   */
  normalize(): ListenTask & Specification.ListenTask {
    const copy = new ListenTask(this as any) as ListenTaskIntersection;
    return getLifecycleHooks('ListenTask')?.normalize?.(copy) || copy;
  }
}

export const _ListenTask = ListenTask as ListenTaskConstructor;
