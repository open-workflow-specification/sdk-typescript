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
 * Represents the intersection between the DurationInline class and type
 */
export type DurationInlineIntersection = DurationInline & Specification.DurationInline;

/**
 * Represents a constructor for the intersection of the DurationInline class and type
 */
export interface DurationInlineConstructor {
  new (model?: Partial<Specification.DurationInline>): DurationInlineIntersection;
}

/**
 * Represents a DurationInline with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class DurationInline extends ObjectHydrator<Specification.DurationInline> {
  /**
   * Instanciates a new instance of the DurationInline class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the DurationInline.
   */
  constructor(model?: Partial<Specification.DurationInline>) {
    super(model);

    getLifecycleHooks('DurationInline')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the DurationInline.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new DurationInline(this as any) as DurationInlineIntersection;
    validate('DurationInline', copy, workflow);
  }

  /**
   * Normalizes the current instance of the DurationInline.
   * Creates a copy of the DurationInline, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the DurationInline instance.
   */
  normalize(): DurationInline & Specification.DurationInline {
    const copy = new DurationInline(this as any) as DurationInlineIntersection;
    return getLifecycleHooks('DurationInline')?.normalize?.(copy) || copy;
  }
}

export const _DurationInline = DurationInline as DurationInlineConstructor;
