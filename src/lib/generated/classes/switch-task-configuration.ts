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

import { _SwitchItem } from './switch-item';
import { Specification } from '../definitions';
import { ArrayHydrator } from '../../hydrator';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';

/**
 * Represents the intersection between the SwitchTaskConfiguration class and type
 */
export type SwitchTaskConfigurationIntersection = SwitchTaskConfiguration & Specification.SwitchTaskConfiguration;

/**
 * Represents a constructor for the intersection of the SwitchTaskConfiguration class and type
 */
export interface SwitchTaskConfigurationConstructor {
  new (model?: Array<Specification.SwitchItem> | number): SwitchTaskConfigurationIntersection;
}

/**
 * Represents a collection of Specification.SwitchItem.
 * Inherits from ArrayHydrator to handle array-specific hydration.
 */
export class SwitchTaskConfiguration extends ArrayHydrator<Specification.SwitchItem> {
  /**
   * Constructs a new instance of the SwitchTaskConfiguration class.
   *
   * @param model - Optional parameter which can be an array of objects or a number representing the array length.
   */
  constructor(model?: Array<Specification.SwitchItem> | number) {
    super(model);
    if (Array.isArray(model)) {
      if (model?.length) {
        this.splice(0, this.length);
        model.forEach((item) => this.push(new _SwitchItem(item)));
      }
    }
    Object.setPrototypeOf(this, Object.create(SwitchTaskConfiguration.prototype));
    getLifecycleHooks('SwitchTaskConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the SwitchTaskConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new SwitchTaskConfiguration(this);
    validate('SwitchTaskConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the SwitchTaskConfiguration.
   * Creates a copy of the SwitchTaskConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the SwitchTaskConfiguration instance.
   */
  normalize(): SwitchTaskConfiguration {
    const copy = new SwitchTaskConfiguration(this);
    return getLifecycleHooks('SwitchTaskConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _SwitchTaskConfiguration = SwitchTaskConfiguration as unknown as SwitchTaskConfigurationConstructor;
//export const _SwitchTaskConfiguration = SwitchTaskConfiguration; // could be exported directly, but it makes the job of building the index more straightforward as it's consistant with "object" classes
