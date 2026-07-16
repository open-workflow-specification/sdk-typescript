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

import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';

/**
 * Represents the intersection between the ForTaskConfiguration class and type
 */
export type ForTaskConfigurationIntersection = ForTaskConfiguration & Specification.ForTaskConfiguration;

/**
 * Represents a constructor for the intersection of the ForTaskConfiguration class and type
 */
export interface ForTaskConfigurationConstructor {
  new (model?: Partial<Specification.ForTaskConfiguration>): ForTaskConfigurationIntersection;
}

/**
 * Represents a ForTaskConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ForTaskConfiguration extends ObjectHydrator<Specification.ForTaskConfiguration> {
  /**
   * Instanciates a new instance of the ForTaskConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ForTaskConfiguration.
   */
  constructor(model?: Partial<Specification.ForTaskConfiguration>) {
    super(model);

    getLifecycleHooks('ForTaskConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ForTaskConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ForTaskConfiguration(this as any) as ForTaskConfigurationIntersection;
    validate('ForTaskConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ForTaskConfiguration.
   * Creates a copy of the ForTaskConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ForTaskConfiguration instance.
   */
  normalize(): ForTaskConfiguration & Specification.ForTaskConfiguration {
    const copy = new ForTaskConfiguration(this as any) as ForTaskConfigurationIntersection;
    return getLifecycleHooks('ForTaskConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _ForTaskConfiguration = ForTaskConfiguration as ForTaskConfigurationConstructor;
