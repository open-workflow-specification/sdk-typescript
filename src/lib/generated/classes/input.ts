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

import { _Schema } from './schema';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Input class and type
 */
export type InputIntersection = Input & Specification.Input;

/**
 * Represents a constructor for the intersection of the Input class and type
 */
export interface InputConstructor {
  new (model?: Partial<Specification.Input>): InputIntersection;
}

/**
 * Represents a Input with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Input extends ObjectHydrator<Specification.Input> {
  /**
   * Instanciates a new instance of the Input class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Input.
   */
  constructor(model?: Partial<Specification.Input>) {
    super(model);
    const self = this as unknown as Specification.Input & object;
    if (isObject(model)) {
      if (typeof model.schema === 'object') self.schema = new _Schema(model.schema);
    }
    getLifecycleHooks('Input')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Input.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Input(this as any) as InputIntersection;
    validate('Input', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Input.
   * Creates a copy of the Input, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Input instance.
   */
  normalize(): Input & Specification.Input {
    const copy = new Input(this as any) as InputIntersection;
    return getLifecycleHooks('Input')?.normalize?.(copy) || copy;
  }
}

export const _Input = Input as InputConstructor;
