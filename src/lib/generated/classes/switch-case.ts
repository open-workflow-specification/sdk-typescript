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
 * Represents the intersection between the SwitchCase class and type
 */
export type SwitchCaseIntersection = SwitchCase & Specification.SwitchCase;

/**
 * Represents a constructor for the intersection of the SwitchCase class and type
 */
export interface SwitchCaseConstructor {
  new (model?: Partial<Specification.SwitchCase>): SwitchCaseIntersection;
}

/**
 * Represents a SwitchCase with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class SwitchCase extends ObjectHydrator<Specification.SwitchCase> {
  /**
   * Instanciates a new instance of the SwitchCase class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the SwitchCase.
   */
  constructor(model?: Partial<Specification.SwitchCase>) {
    super(model);

    getLifecycleHooks('SwitchCase')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the SwitchCase.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new SwitchCase(this as any) as SwitchCaseIntersection;
    validate('SwitchCase', copy, workflow);
  }

  /**
   * Normalizes the current instance of the SwitchCase.
   * Creates a copy of the SwitchCase, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the SwitchCase instance.
   */
  normalize(): SwitchCase & Specification.SwitchCase {
    const copy = new SwitchCase(this as any) as SwitchCaseIntersection;
    return getLifecycleHooks('SwitchCase')?.normalize?.(copy) || copy;
  }
}

export const _SwitchCase = SwitchCase as SwitchCaseConstructor;
