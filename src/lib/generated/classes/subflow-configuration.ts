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

import { _SubflowInput } from './subflow-input';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the SubflowConfiguration class and type
 */
export type SubflowConfigurationIntersection = SubflowConfiguration & Specification.SubflowConfiguration;

/**
 * Represents a constructor for the intersection of the SubflowConfiguration class and type
 */
export interface SubflowConfigurationConstructor {
  new (model?: Partial<Specification.SubflowConfiguration>): SubflowConfigurationIntersection;
}

/**
 * Represents a SubflowConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class SubflowConfiguration extends ObjectHydrator<Specification.SubflowConfiguration> {
  /**
   * Instanciates a new instance of the SubflowConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the SubflowConfiguration.
   */
  constructor(model?: Partial<Specification.SubflowConfiguration>) {
    super(model);
    const self = this as unknown as Specification.SubflowConfiguration & object;
    if (isObject(model)) {
      if (typeof model.input === 'object') self.input = new _SubflowInput(model.input);
    }
    getLifecycleHooks('SubflowConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the SubflowConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new SubflowConfiguration(this as any) as SubflowConfigurationIntersection;
    validate('SubflowConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the SubflowConfiguration.
   * Creates a copy of the SubflowConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the SubflowConfiguration instance.
   */
  normalize(): SubflowConfiguration & Specification.SubflowConfiguration {
    const copy = new SubflowConfiguration(this as any) as SubflowConfigurationIntersection;
    return getLifecycleHooks('SubflowConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _SubflowConfiguration = SubflowConfiguration as SubflowConfigurationConstructor;
