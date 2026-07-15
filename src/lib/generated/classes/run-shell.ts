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

import { _Shell } from './shell';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RunShell class and type
 */
export type RunShellIntersection = RunShell & Specification.RunShell;

/**
 * Represents a constructor for the intersection of the RunShell class and type
 */
export interface RunShellConstructor {
  new (model?: Partial<Specification.RunShell>): RunShellIntersection;
}

/**
 * Represents a RunShell with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RunShell extends ObjectHydrator<Specification.RunShell> {
  /**
   * Instanciates a new instance of the RunShell class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RunShell.
   */
  constructor(model?: Partial<Specification.RunShell>) {
    super(model);
    const self = this as unknown as Specification.RunShell & object;
    if (isObject(model)) {
      if (typeof model.shell === 'object') self.shell = new _Shell(model.shell);
    }
    getLifecycleHooks('RunShell')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RunShell.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new RunShell(this as any) as RunShellIntersection;
    validate('RunShell', copy, workflow);
  }

  /**
   * Normalizes the current instance of the RunShell.
   * Creates a copy of the RunShell, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RunShell instance.
   */
  normalize(): RunShell & Specification.RunShell {
    const copy = new RunShell(this as any) as RunShellIntersection;
    return getLifecycleHooks('RunShell')?.normalize?.(copy) || copy;
  }
}

export const _RunShell = RunShell as RunShellConstructor;
