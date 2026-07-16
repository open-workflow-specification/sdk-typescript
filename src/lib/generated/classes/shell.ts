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

import { _ShellEnvironment } from './shell-environment';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Shell class and type
 */
export type ShellIntersection = Shell & Specification.Shell;

/**
 * Represents a constructor for the intersection of the Shell class and type
 */
export interface ShellConstructor {
  new (model?: Partial<Specification.Shell>): ShellIntersection;
}

/**
 * Represents a Shell with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Shell extends ObjectHydrator<Specification.Shell> {
  /**
   * Instanciates a new instance of the Shell class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Shell.
   */
  constructor(model?: Partial<Specification.Shell>) {
    super(model);
    const self = this as unknown as Specification.Shell & object;
    if (isObject(model)) {
      if (typeof model.environment === 'object') self.environment = new _ShellEnvironment(model.environment);
    }
    getLifecycleHooks('Shell')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Shell.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Shell(this as any) as ShellIntersection;
    validate('Shell', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Shell.
   * Creates a copy of the Shell, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Shell instance.
   */
  normalize(): Shell & Specification.Shell {
    const copy = new Shell(this as any) as ShellIntersection;
    return getLifecycleHooks('Shell')?.normalize?.(copy) || copy;
  }
}

export const _Shell = Shell as ShellConstructor;
