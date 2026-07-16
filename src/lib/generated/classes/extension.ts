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

import { _TaskList } from './task-list';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Extension class and type
 */
export type ExtensionIntersection = Extension & Specification.Extension;

/**
 * Represents a constructor for the intersection of the Extension class and type
 */
export interface ExtensionConstructor {
  new (model?: Partial<Specification.Extension>): ExtensionIntersection;
}

/**
 * Represents a Extension with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Extension extends ObjectHydrator<Specification.Extension> {
  /**
   * Instanciates a new instance of the Extension class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Extension.
   */
  constructor(model?: Partial<Specification.Extension>) {
    super(model);
    const self = this as unknown as Specification.Extension & object;
    if (isObject(model)) {
      if (typeof model.before === 'object') self.before = new _TaskList(model.before);
      if (typeof model.after === 'object') self.after = new _TaskList(model.after);
    }
    getLifecycleHooks('Extension')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Extension.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Extension(this as any) as ExtensionIntersection;
    validate('Extension', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Extension.
   * Creates a copy of the Extension, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Extension instance.
   */
  normalize(): Extension & Specification.Extension {
    const copy = new Extension(this as any) as ExtensionIntersection;
    return getLifecycleHooks('Extension')?.normalize?.(copy) || copy;
  }
}

export const _Extension = Extension as ExtensionConstructor;
