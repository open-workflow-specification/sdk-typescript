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

import { _Duration } from './duration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the WorkflowTimeout class and type
 */
export type WorkflowTimeoutIntersection = WorkflowTimeout & Specification.WorkflowTimeout;

/**
 * Represents a constructor for the intersection of the WorkflowTimeout class and type
 */
export interface WorkflowTimeoutConstructor {
  new (model?: Partial<Specification.WorkflowTimeout>): WorkflowTimeoutIntersection;
}

/**
 * Represents a WorkflowTimeout with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class WorkflowTimeout extends ObjectHydrator<Specification.WorkflowTimeout> {
  /**
   * Instanciates a new instance of the WorkflowTimeout class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the WorkflowTimeout.
   */
  constructor(model?: Partial<Specification.WorkflowTimeout>) {
    super(model);
    const self = this as unknown as Specification.WorkflowTimeout & object;
    if (isObject(model)) {
      if (typeof (model as Specification.Timeout).after === 'object')
        (self as Specification.Timeout).after = new _Duration(
          (model as Specification.Timeout).after as Specification.Duration,
        );
    }
    getLifecycleHooks('WorkflowTimeout')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the WorkflowTimeout.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new WorkflowTimeout(this as any) as WorkflowTimeoutIntersection;
    validate('WorkflowTimeout', copy, workflow);
  }

  /**
   * Normalizes the current instance of the WorkflowTimeout.
   * Creates a copy of the WorkflowTimeout, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the WorkflowTimeout instance.
   */
  normalize(): WorkflowTimeout & Specification.WorkflowTimeout {
    const copy = new WorkflowTimeout(this as any) as WorkflowTimeoutIntersection;
    return getLifecycleHooks('WorkflowTimeout')?.normalize?.(copy) || copy;
  }
}

export const _WorkflowTimeout = WorkflowTimeout as WorkflowTimeoutConstructor;
