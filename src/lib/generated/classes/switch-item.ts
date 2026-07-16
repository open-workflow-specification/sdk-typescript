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

import { _SwitchCase } from './switch-case';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the SwitchItem class and type
 */
export type SwitchItemIntersection = SwitchItem & Specification.SwitchItem;

/**
 * Represents a constructor for the intersection of the SwitchItem class and type
 */
export interface SwitchItemConstructor {
  new (model?: Partial<Specification.SwitchItem>): SwitchItemIntersection;
}

/**
 * Represents a SwitchItem with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class SwitchItem extends ObjectHydrator<Specification.SwitchItem> {
  /**
   * Instanciates a new instance of the SwitchItem class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the SwitchItem.
   */
  constructor(model?: Partial<Specification.SwitchItem>) {
    super(model);
    const self = this as unknown as Specification.SwitchItem & object;
    if (isObject(model)) {
      const knownProperties: string[] = [];
      Object.entries(model)
        .filter(([key]) => !knownProperties.includes(key))
        .forEach(([key, value]) => {
          self[key] = new _SwitchCase(value);
        });
    }
    getLifecycleHooks('SwitchItem')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the SwitchItem.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new SwitchItem(this as any) as SwitchItemIntersection;
    validate('SwitchItem', copy, workflow);
  }

  /**
   * Normalizes the current instance of the SwitchItem.
   * Creates a copy of the SwitchItem, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the SwitchItem instance.
   */
  normalize(): SwitchItem & Specification.SwitchItem {
    const copy = new SwitchItem(this as any) as SwitchItemIntersection;
    return getLifecycleHooks('SwitchItem')?.normalize?.(copy) || copy;
  }
}

export const _SwitchItem = SwitchItem as SwitchItemConstructor;
