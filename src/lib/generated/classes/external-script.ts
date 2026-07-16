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

import { _ExternalResource } from './external-resource';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the ExternalScript class and type
 */
export type ExternalScriptIntersection = ExternalScript & Specification.ExternalScript;

/**
 * Represents a constructor for the intersection of the ExternalScript class and type
 */
export interface ExternalScriptConstructor {
  new (model?: Partial<Specification.ExternalScript>): ExternalScriptIntersection;
}

/**
 * Represents a ExternalScript with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ExternalScript extends ObjectHydrator<Specification.ExternalScript> {
  /**
   * Instanciates a new instance of the ExternalScript class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ExternalScript.
   */
  constructor(model?: Partial<Specification.ExternalScript>) {
    super(model);
    const self = this as unknown as Specification.ExternalScript & object;
    if (isObject(model)) {
      if (typeof model.source === 'object') self.source = new _ExternalResource(model.source);
    }
    getLifecycleHooks('ExternalScript')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ExternalScript.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ExternalScript(this as any) as ExternalScriptIntersection;
    validate('ExternalScript', copy, workflow);
  }

  /**
   * Normalizes the current instance of the ExternalScript.
   * Creates a copy of the ExternalScript, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ExternalScript instance.
   */
  normalize(): ExternalScript & Specification.ExternalScript {
    const copy = new ExternalScript(this as any) as ExternalScriptIntersection;
    return getLifecycleHooks('ExternalScript')?.normalize?.(copy) || copy;
  }
}

export const _ExternalScript = ExternalScript as ExternalScriptConstructor;
