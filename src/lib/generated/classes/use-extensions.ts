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

import { _ExtensionItem } from './extension-item';
import { Specification } from '../definitions';
import { ArrayHydrator } from '../../hydrator';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';

/**
 * Represents the intersection between the UseExtensions class and type
 */
export type UseExtensionsIntersection = UseExtensions & Specification.UseExtensions;

/**
 * Represents a constructor for the intersection of the UseExtensions class and type
 */
export interface UseExtensionsConstructor {
  new (model?: Array<Specification.ExtensionItem> | number): UseExtensionsIntersection;
}

/**
 * Represents a collection of Specification.ExtensionItem.
 * Inherits from ArrayHydrator to handle array-specific hydration.
 */
export class UseExtensions extends ArrayHydrator<Specification.ExtensionItem> {
  /**
   * Constructs a new instance of the UseExtensions class.
   *
   * @param model - Optional parameter which can be an array of objects or a number representing the array length.
   */
  constructor(model?: Array<Specification.ExtensionItem> | number) {
    super(model);
    if (Array.isArray(model)) {
      if (model?.length) {
        this.splice(0, this.length);
        model.forEach((item) => this.push(new _ExtensionItem(item)));
      }
    }
    Object.setPrototypeOf(this, Object.create(UseExtensions.prototype));
    getLifecycleHooks('UseExtensions')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the UseExtensions.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new UseExtensions(this);
    validate('UseExtensions', copy, workflow);
  }

  /**
   * Normalizes the current instance of the UseExtensions.
   * Creates a copy of the UseExtensions, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the UseExtensions instance.
   */
  normalize(): UseExtensions {
    const copy = new UseExtensions(this);
    return getLifecycleHooks('UseExtensions')?.normalize?.(copy) || copy;
  }
}

export const _UseExtensions = UseExtensions as unknown as UseExtensionsConstructor;
//export const _UseExtensions = UseExtensions; // could be exported directly, but it makes the job of building the index more straightforward as it's consistant with "object" classes
