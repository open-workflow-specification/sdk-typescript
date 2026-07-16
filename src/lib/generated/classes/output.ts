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
 * Represents the intersection between the Output class and type
 */
export type OutputIntersection = Output & Specification.Output;

/**
 * Represents a constructor for the intersection of the Output class and type
 */
export interface OutputConstructor {
  new (model?: Partial<Specification.Output>): OutputIntersection;
}

/**
 * Represents a Output with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Output extends ObjectHydrator<Specification.Output> {
  /**
   * Instanciates a new instance of the Output class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Output.
   */
  constructor(model?: Partial<Specification.Output>) {
    super(model);
    const self = this as unknown as Specification.Output & object;
    if (isObject(model)) {
      if (typeof model.schema === 'object') self.schema = new _Schema(model.schema);
    }
    getLifecycleHooks('Output')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Output.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Output(this as any) as OutputIntersection;
    validate('Output', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Output.
   * Creates a copy of the Output, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Output instance.
   */
  normalize(): Output & Specification.Output {
    const copy = new Output(this as any) as OutputIntersection;
    return getLifecycleHooks('Output')?.normalize?.(copy) || copy;
  }
}

export const _Output = Output as OutputConstructor;
