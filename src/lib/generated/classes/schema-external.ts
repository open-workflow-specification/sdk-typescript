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
 * Represents the intersection between the SchemaExternal class and type
 */
export type SchemaExternalIntersection = SchemaExternal & Specification.SchemaExternal;

/**
 * Represents a constructor for the intersection of the SchemaExternal class and type
 */
export interface SchemaExternalConstructor {
  new (model?: Partial<Specification.SchemaExternal>): SchemaExternalIntersection;
}

/**
 * Represents a SchemaExternal with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class SchemaExternal extends ObjectHydrator<Specification.SchemaExternal> {
  /**
   * Instanciates a new instance of the SchemaExternal class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the SchemaExternal.
   */
  constructor(model?: Partial<Specification.SchemaExternal>) {
    super(model);
    const self = this as unknown as Specification.SchemaExternal & object;
    if (isObject(model)) {
      if (typeof model.resource === 'object') self.resource = new _ExternalResource(model.resource);
    }
    getLifecycleHooks('SchemaExternal')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the SchemaExternal.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new SchemaExternal(this as any) as SchemaExternalIntersection;
    validate('SchemaExternal', copy, workflow);
  }

  /**
   * Normalizes the current instance of the SchemaExternal.
   * Creates a copy of the SchemaExternal, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the SchemaExternal instance.
   */
  normalize(): SchemaExternal & Specification.SchemaExternal {
    const copy = new SchemaExternal(this as any) as SchemaExternalIntersection;
    return getLifecycleHooks('SchemaExternal')?.normalize?.(copy) || copy;
  }
}

export const _SchemaExternal = SchemaExternal as SchemaExternalConstructor;
