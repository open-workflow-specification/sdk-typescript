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

import { _Script } from './script';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RunScript class and type
 */
export type RunScriptIntersection = RunScript & Specification.RunScript;

/**
 * Represents a constructor for the intersection of the RunScript class and type
 */
export interface RunScriptConstructor {
  new (model?: Partial<Specification.RunScript>): RunScriptIntersection;
}

/**
 * Represents a RunScript with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RunScript extends ObjectHydrator<Specification.RunScript> {
  /**
   * Instanciates a new instance of the RunScript class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RunScript.
   */
  constructor(model?: Partial<Specification.RunScript>) {
    super(model);
    const self = this as unknown as Specification.RunScript & object;
    if (isObject(model)) {
      if (typeof model.script === 'object') self.script = new _Script(model.script);
    }
    getLifecycleHooks('RunScript')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RunScript.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new RunScript(this as any) as RunScriptIntersection;
    validate('RunScript', copy, workflow);
  }

  /**
   * Normalizes the current instance of the RunScript.
   * Creates a copy of the RunScript, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RunScript instance.
   */
  normalize(): RunScript & Specification.RunScript {
    const copy = new RunScript(this as any) as RunScriptIntersection;
    return getLifecycleHooks('RunScript')?.normalize?.(copy) || copy;
  }
}

export const _RunScript = RunScript as RunScriptConstructor;
