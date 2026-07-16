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
import { _ForkTaskConfiguration } from './fork-task-configuration';
import { _EmitTaskConfiguration } from './emit-task-configuration';
import { _ForTaskConfiguration } from './for-task-configuration';
import { _ListenTaskConfiguration } from './listen-task-configuration';
import { _SubscriptionIterator } from './subscription-iterator';
import { _RaiseTaskConfiguration } from './raise-task-configuration';
import { _RunTaskConfiguration } from './run-task-configuration';
import { _SwitchTaskConfiguration } from './switch-task-configuration';
import { _TaskList } from './task-list';
import { _TryTaskCatch } from './try-task-catch';
import { _Duration } from './duration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Task class and type
 */
export type TaskIntersection = Task & Specification.Task;

/**
 * Represents a constructor for the intersection of the Task class and type
 */
export interface TaskConstructor {
  new (model?: Partial<Specification.Task>): TaskIntersection;
}

/**
 * Represents a Task with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Task extends ObjectHydrator<Specification.Task> {
  /**
   * Instanciates a new instance of the Task class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Task.
   */
  constructor(model?: Partial<Specification.Task>) {
    super(model);
    const self = this as unknown as Specification.Task & object;
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
      if (
        typeof (model as { [k: string]: unknown; fork?: Specification.ForkTaskConfiguration | undefined }).fork ===
        'object'
      )
        (self as { [k: string]: unknown; fork?: Specification.ForkTaskConfiguration | undefined }).fork =
          new _ForkTaskConfiguration(
            (model as { [k: string]: unknown; fork?: Specification.ForkTaskConfiguration | undefined })
              .fork as Specification.ForkTaskConfiguration,
          );
      if (
        typeof (model as { [k: string]: unknown; emit?: Specification.EmitTaskConfiguration | undefined }).emit ===
        'object'
      )
        (self as { [k: string]: unknown; emit?: Specification.EmitTaskConfiguration | undefined }).emit =
          new _EmitTaskConfiguration(
            (model as { [k: string]: unknown; emit?: Specification.EmitTaskConfiguration | undefined })
              .emit as Specification.EmitTaskConfiguration,
          );
      if (
        typeof (
          model as {
            [k: string]: unknown;
            for?: Specification.ForTaskConfiguration | undefined;
            while?: string | undefined;
            do?: Specification.TaskList | undefined;
          }
        ).for === 'object'
      )
        (
          self as {
            [k: string]: unknown;
            for?: Specification.ForTaskConfiguration | undefined;
            while?: string | undefined;
            do?: Specification.TaskList | undefined;
          }
        ).for = new _ForTaskConfiguration(
          (
            model as {
              [k: string]: unknown;
              for?: Specification.ForTaskConfiguration | undefined;
              while?: string | undefined;
              do?: Specification.TaskList | undefined;
            }
          ).for as Specification.ForTaskConfiguration,
        );
      if (
        typeof (
          model as {
            [k: string]: unknown;
            listen?: Specification.ListenTaskConfiguration | undefined;
            foreach?: Specification.SubscriptionIterator | undefined;
          }
        ).listen === 'object'
      )
        (
          self as {
            [k: string]: unknown;
            listen?: Specification.ListenTaskConfiguration | undefined;
            foreach?: Specification.SubscriptionIterator | undefined;
          }
        ).listen = new _ListenTaskConfiguration(
          (
            model as {
              [k: string]: unknown;
              listen?: Specification.ListenTaskConfiguration | undefined;
              foreach?: Specification.SubscriptionIterator | undefined;
            }
          ).listen as Specification.ListenTaskConfiguration,
        );
      if (
        typeof (
          model as {
            [k: string]: unknown;
            listen?: Specification.ListenTaskConfiguration | undefined;
            foreach?: Specification.SubscriptionIterator | undefined;
          }
        ).foreach === 'object'
      )
        (
          self as {
            [k: string]: unknown;
            listen?: Specification.ListenTaskConfiguration | undefined;
            foreach?: Specification.SubscriptionIterator | undefined;
          }
        ).foreach = new _SubscriptionIterator(
          (
            model as {
              [k: string]: unknown;
              listen?: Specification.ListenTaskConfiguration | undefined;
              foreach?: Specification.SubscriptionIterator | undefined;
            }
          ).foreach as Specification.SubscriptionIterator,
        );
      if (
        typeof (model as { [k: string]: unknown; raise?: Specification.RaiseTaskConfiguration | undefined }).raise ===
        'object'
      )
        (self as { [k: string]: unknown; raise?: Specification.RaiseTaskConfiguration | undefined }).raise =
          new _RaiseTaskConfiguration(
            (model as { [k: string]: unknown; raise?: Specification.RaiseTaskConfiguration | undefined })
              .raise as Specification.RaiseTaskConfiguration,
          );
      if (
        typeof (model as { [k: string]: unknown; run?: Specification.RunTaskConfiguration | undefined }).run ===
        'object'
      )
        (self as { [k: string]: unknown; run?: Specification.RunTaskConfiguration | undefined }).run =
          new _RunTaskConfiguration(
            (model as { [k: string]: unknown; run?: Specification.RunTaskConfiguration | undefined })
              .run as Specification.RunTaskConfiguration,
          );
      if (
        typeof (model as { [k: string]: unknown; switch?: Specification.SwitchTaskConfiguration | undefined })
          .switch === 'object'
      )
        (self as { [k: string]: unknown; switch?: Specification.SwitchTaskConfiguration | undefined }).switch =
          new _SwitchTaskConfiguration(
            (model as { [k: string]: unknown; switch?: Specification.SwitchTaskConfiguration | undefined })
              .switch as Specification.SwitchTaskConfiguration,
          ) as unknown as Specification.SwitchTaskConfiguration;
      if (
        typeof (
          model as {
            [k: string]: unknown;
            try?: Specification.TaskList | undefined;
            catch?: Specification.TryTaskCatch | undefined;
          }
        ).try === 'object'
      )
        (
          self as {
            [k: string]: unknown;
            try?: Specification.TaskList | undefined;
            catch?: Specification.TryTaskCatch | undefined;
          }
        ).try = new _TaskList(
          (
            model as {
              [k: string]: unknown;
              try?: Specification.TaskList | undefined;
              catch?: Specification.TryTaskCatch | undefined;
            }
          ).try as Specification.TaskList,
        );
      if (
        typeof (
          model as {
            [k: string]: unknown;
            try?: Specification.TaskList | undefined;
            catch?: Specification.TryTaskCatch | undefined;
          }
        ).catch === 'object'
      )
        (
          self as {
            [k: string]: unknown;
            try?: Specification.TaskList | undefined;
            catch?: Specification.TryTaskCatch | undefined;
          }
        ).catch = new _TryTaskCatch(
          (
            model as {
              [k: string]: unknown;
              try?: Specification.TaskList | undefined;
              catch?: Specification.TryTaskCatch | undefined;
            }
          ).catch as Specification.TryTaskCatch,
        );
      if (typeof (model as { [k: string]: unknown; wait?: Specification.Duration | undefined }).wait === 'object')
        (self as { [k: string]: unknown; wait?: Specification.Duration | undefined }).wait = new _Duration(
          (model as { [k: string]: unknown; wait?: Specification.Duration | undefined }).wait as Specification.Duration,
        );
    }
    getLifecycleHooks('Task')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Task.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Task(this as any) as TaskIntersection;
    validate('Task', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Task.
   * Creates a copy of the Task, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Task instance.
   */
  normalize(): Task & Specification.Task {
    const copy = new Task(this as any) as TaskIntersection;
    return getLifecycleHooks('Task')?.normalize?.(copy) || copy;
  }
}

export const _Task = Task as TaskConstructor;
