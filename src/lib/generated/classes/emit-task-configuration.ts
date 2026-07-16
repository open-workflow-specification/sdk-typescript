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

import { _EmitEventDefinition } from './emit-event-definition';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the EmitTaskConfiguration class and type
 */
export type EmitTaskConfigurationIntersection = EmitTaskConfiguration & Specification.EmitTaskConfiguration;

/**
 * Represents a constructor for the intersection of the EmitTaskConfiguration class and type
 */
export interface EmitTaskConfigurationConstructor {
  new (model?: Partial<Specification.EmitTaskConfiguration>): EmitTaskConfigurationIntersection;
}

/**
 * Represents a EmitTaskConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EmitTaskConfiguration extends ObjectHydrator<Specification.EmitTaskConfiguration> {
  /**
   * Instanciates a new instance of the EmitTaskConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EmitTaskConfiguration.
   */
  constructor(model?: Partial<Specification.EmitTaskConfiguration>) {
    super(model);
    const self = this as unknown as Specification.EmitTaskConfiguration & object;
    if (isObject(model)) {
      if (typeof model.event === 'object') self.event = new _EmitEventDefinition(model.event);
    }
    getLifecycleHooks('EmitTaskConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EmitTaskConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EmitTaskConfiguration(this as any) as EmitTaskConfigurationIntersection;
    validate('EmitTaskConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EmitTaskConfiguration.
   * Creates a copy of the EmitTaskConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EmitTaskConfiguration instance.
   */
  normalize(): EmitTaskConfiguration & Specification.EmitTaskConfiguration {
    const copy = new EmitTaskConfiguration(this as any) as EmitTaskConfigurationIntersection;
    return getLifecycleHooks('EmitTaskConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _EmitTaskConfiguration = EmitTaskConfiguration as EmitTaskConfigurationConstructor;
