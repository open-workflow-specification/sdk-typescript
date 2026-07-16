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
import { _WithOpenAPIParameters } from './with-open-api-parameters';
import { _ReferenceableAuthenticationPolicy } from './referenceable-authentication-policy';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the OpenAPIArguments class and type
 */
export type OpenAPIArgumentsIntersection = OpenAPIArguments & Specification.OpenAPIArguments;

/**
 * Represents a constructor for the intersection of the OpenAPIArguments class and type
 */
export interface OpenAPIArgumentsConstructor {
  new (model?: Partial<Specification.OpenAPIArguments>): OpenAPIArgumentsIntersection;
}

/**
 * Represents a OpenAPIArguments with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class OpenAPIArguments extends ObjectHydrator<Specification.OpenAPIArguments> {
  /**
   * Instanciates a new instance of the OpenAPIArguments class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the OpenAPIArguments.
   */
  constructor(model?: Partial<Specification.OpenAPIArguments>) {
    super(model);
    const self = this as unknown as Specification.OpenAPIArguments & object;
    if (isObject(model)) {
      if (typeof model.document === 'object') self.document = new _ExternalResource(model.document);
      if (typeof model.parameters === 'object') self.parameters = new _WithOpenAPIParameters(model.parameters);
      if (typeof model.authentication === 'object')
        self.authentication = new _ReferenceableAuthenticationPolicy(model.authentication);
    }
    getLifecycleHooks('OpenAPIArguments')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the OpenAPIArguments.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new OpenAPIArguments(this as any) as OpenAPIArgumentsIntersection;
    validate('OpenAPIArguments', copy, workflow);
  }

  /**
   * Normalizes the current instance of the OpenAPIArguments.
   * Creates a copy of the OpenAPIArguments, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the OpenAPIArguments instance.
   */
  normalize(): OpenAPIArguments & Specification.OpenAPIArguments {
    const copy = new OpenAPIArguments(this as any) as OpenAPIArgumentsIntersection;
    return getLifecycleHooks('OpenAPIArguments')?.normalize?.(copy) || copy;
  }
}

export const _OpenAPIArguments = OpenAPIArguments as OpenAPIArgumentsConstructor;
