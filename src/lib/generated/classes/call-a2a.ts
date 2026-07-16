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
import { _A2AArguments } from './a2a-arguments';
import { _TaskBase } from './task-base';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the CallA2A class and type
 */
export type CallA2AIntersection = CallA2A & Specification.CallA2A;

/**
 * Represents a constructor for the intersection of the CallA2A class and type
 */
export interface CallA2AConstructor {
  new (model?: Partial<Specification.CallA2A>): CallA2AIntersection;
}

/**
 * Represents a CallA2A with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class CallA2A extends _TaskBase {
  /**
   * Instanciates a new instance of the CallA2A class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the CallA2A.
   */
  constructor(model?: Partial<Specification.CallA2A>) {
    super(model);
    const self = this as unknown as Specification.CallA2A & object;
    if (isObject(model)) {
      self.call = 'a2a' as const;
      if (typeof model.input === 'object') self.input = new _Input(model.input);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.export === 'object') self.export = new _Export(model.export);
      if (typeof model.timeout === 'object') self.timeout = new _TaskTimeout(model.timeout);
      if (typeof model.metadata === 'object') self.metadata = new _TaskMetadata(model.metadata);
      if (typeof model.with === 'object') self.with = new _A2AArguments(model.with);
    }
    getLifecycleHooks('CallA2A')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the CallA2A.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new CallA2A(this as any) as CallA2AIntersection;
    validate('CallA2A', copy, workflow);
  }

  /**
   * Normalizes the current instance of the CallA2A.
   * Creates a copy of the CallA2A, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the CallA2A instance.
   */
  normalize(): CallA2A & Specification.CallA2A {
    const copy = new CallA2A(this as any) as CallA2AIntersection;
    return getLifecycleHooks('CallA2A')?.normalize?.(copy) || copy;
  }
}

export const _CallA2A = CallA2A as CallA2AConstructor;
