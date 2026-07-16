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
 * Represents the intersection between the Schema class and type
 */
export type SchemaIntersection = Schema & Specification.Schema;

/**
 * Represents a constructor for the intersection of the Schema class and type
 */
export interface SchemaConstructor {
  new (model?: Partial<Specification.Schema>): SchemaIntersection;
}

/**
 * Represents a Schema with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Schema extends ObjectHydrator<Specification.Schema> {
  /**
   * Instanciates a new instance of the Schema class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Schema.
   */
  constructor(model?: Partial<Specification.Schema>) {
    super(model);
    const self = this as unknown as Specification.Schema & object;
    if (isObject(model)) {
      if (typeof (model as Specification.SchemaExternal).resource === 'object')
        (self as Specification.SchemaExternal).resource = new _ExternalResource(
          (model as Specification.SchemaExternal).resource as Specification.ExternalResource,
        );
    }
    getLifecycleHooks('Schema')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Schema.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Schema(this as any) as SchemaIntersection;
    validate('Schema', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Schema.
   * Creates a copy of the Schema, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Schema instance.
   */
  normalize(): Schema & Specification.Schema {
    const copy = new Schema(this as any) as SchemaIntersection;
    return getLifecycleHooks('Schema')?.normalize?.(copy) || copy;
  }
}

export const _Schema = Schema as SchemaConstructor;
