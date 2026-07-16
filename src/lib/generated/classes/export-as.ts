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
 * Represents the intersection between the ExportAs class and type
 */
export type ExportAsIntersection = ExportAs & Specification.ExportAs;

/**
 * Represents a constructor for the intersection of the ExportAs class and type
 */
export interface ExportAsConstructor {
  new (model?: Partial<Specification.ExportAs>): ExportAsIntersection;
}

/**
 * Represents a ExportAs with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ExportAs extends ObjectHydrator<Specification.ExportAs> {
  /**
   * Instanciates a new instance of the ExportAs class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ExportAs.
   */
  constructor(model?: Partial<Specification.ExportAs>) {
    super(model);

    getLifecycleHooks('ExportAs')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ExportAs.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ExportAs(this as any) as ExportAsIntersection;
    validate('ExportAs', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ExportAs.
   * Creates a copy of the ExportAs, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ExportAs instance.
   */
  normalize(): ExportAs & Specification.ExportAs {
    const copy = new ExportAs(this as any) as ExportAsIntersection;
    return getLifecycleHooks('ExportAs')?.normalize?.(copy) || copy;
  }
}

export const _ExportAs = ExportAs as ExportAsConstructor;
