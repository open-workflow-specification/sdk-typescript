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
 * Represents the intersection between the SchemaInline class and type
 */
export type SchemaInlineIntersection = SchemaInline & Specification.SchemaInline;

/**
 * Represents a constructor for the intersection of the SchemaInline class and type
 */
export interface SchemaInlineConstructor {
  new (model?: Partial<Specification.SchemaInline>): SchemaInlineIntersection;
}

/**
 * Represents a SchemaInline with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class SchemaInline extends ObjectHydrator<Specification.SchemaInline> {
  /**
   * Instanciates a new instance of the SchemaInline class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the SchemaInline.
   */
  constructor(model?: Partial<Specification.SchemaInline>) {
    super(model);

    getLifecycleHooks('SchemaInline')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the SchemaInline.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new SchemaInline(this as any) as SchemaInlineIntersection;
    validate('SchemaInline', copy, workflow);
  }

  /**
   * Normalizes the current instance of the SchemaInline.
   * Creates a copy of the SchemaInline, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the SchemaInline instance.
   */
  normalize(): SchemaInline & Specification.SchemaInline {
    const copy = new SchemaInline(this as any) as SchemaInlineIntersection;
    return getLifecycleHooks('SchemaInline')?.normalize?.(copy) || copy;
  }
}

export const _SchemaInline = SchemaInline as SchemaInlineConstructor;
