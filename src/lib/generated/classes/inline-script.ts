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
 * Represents the intersection between the InlineScript class and type
 */
export type InlineScriptIntersection = InlineScript & Specification.InlineScript;

/**
 * Represents a constructor for the intersection of the InlineScript class and type
 */
export interface InlineScriptConstructor {
  new (model?: Partial<Specification.InlineScript>): InlineScriptIntersection;
}

/**
 * Represents a InlineScript with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class InlineScript extends ObjectHydrator<Specification.InlineScript> {
  /**
   * Instanciates a new instance of the InlineScript class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the InlineScript.
   */
  constructor(model?: Partial<Specification.InlineScript>) {
    super(model);

    getLifecycleHooks('InlineScript')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the InlineScript.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new InlineScript(this as any) as InlineScriptIntersection;
    validate('InlineScript', copy, workflow);
  }

  /**
   * Normalizes the current instance of the InlineScript.
   * Creates a copy of the InlineScript, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the InlineScript instance.
   */
  normalize(): InlineScript & Specification.InlineScript {
    const copy = new InlineScript(this as any) as InlineScriptIntersection;
    return getLifecycleHooks('InlineScript')?.normalize?.(copy) || copy;
  }
}

export const _InlineScript = InlineScript as InlineScriptConstructor;
