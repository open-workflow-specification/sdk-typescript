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

import { _Extension } from './extension';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the ExtensionItem class and type
 */
export type ExtensionItemIntersection = ExtensionItem & Specification.ExtensionItem;

/**
 * Represents a constructor for the intersection of the ExtensionItem class and type
 */
export interface ExtensionItemConstructor {
  new (model?: Partial<Specification.ExtensionItem>): ExtensionItemIntersection;
}

/**
 * Represents a ExtensionItem with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ExtensionItem extends ObjectHydrator<Specification.ExtensionItem> {
  /**
   * Instanciates a new instance of the ExtensionItem class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ExtensionItem.
   */
  constructor(model?: Partial<Specification.ExtensionItem>) {
    super(model);
    const self = this as unknown as Specification.ExtensionItem & object;
    if (isObject(model)) {
      const knownProperties: string[] = [];
      Object.entries(model)
        .filter(([key]) => !knownProperties.includes(key))
        .forEach(([key, value]) => {
          self[key] = new _Extension(value);
        });
    }
    getLifecycleHooks('ExtensionItem')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ExtensionItem.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ExtensionItem(this as any) as ExtensionItemIntersection;
    validate('ExtensionItem', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ExtensionItem.
   * Creates a copy of the ExtensionItem, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ExtensionItem instance.
   */
  normalize(): ExtensionItem & Specification.ExtensionItem {
    const copy = new ExtensionItem(this as any) as ExtensionItemIntersection;
    return getLifecycleHooks('ExtensionItem')?.normalize?.(copy) || copy;
  }
}

export const _ExtensionItem = ExtensionItem as ExtensionItemConstructor;
