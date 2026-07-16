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

import { _ExternalResource } from './external-resource';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Script class and type
 */
export type ScriptIntersection = Script & Specification.Script;

/**
 * Represents a constructor for the intersection of the Script class and type
 */
export interface ScriptConstructor {
  new (model?: Partial<Specification.Script>): ScriptIntersection;
}

/**
 * Represents a Script with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Script extends ObjectHydrator<Specification.Script> {
  /**
   * Instanciates a new instance of the Script class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Script.
   */
  constructor(model?: Partial<Specification.Script>) {
    super(model);
    const self = this as unknown as Specification.Script & object;
    if (isObject(model)) {
      if (typeof (model as Specification.ExternalScript).source === 'object')
        (self as Specification.ExternalScript).source = new _ExternalResource(
          (model as Specification.ExternalScript).source as Specification.ExternalResource,
        );
    }
    getLifecycleHooks('Script')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Script.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Script(this as any) as ScriptIntersection;
    validate('Script', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Script.
   * Creates a copy of the Script, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Script instance.
   */
  normalize(): Script & Specification.Script {
    const copy = new Script(this as any) as ScriptIntersection;
    return getLifecycleHooks('Script')?.normalize?.(copy) || copy;
  }
}

export const _Script = Script as ScriptConstructor;
