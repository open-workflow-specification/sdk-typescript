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
 * Represents the intersection between the UriTemplate class and type
 */
export type UriTemplateIntersection = UriTemplate & Specification.UriTemplate;

/**
 * Represents a constructor for the intersection of the UriTemplate class and type
 */
export interface UriTemplateConstructor {
  new (model?: Partial<Specification.UriTemplate>): UriTemplateIntersection;
}

/**
 * Represents a UriTemplate with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class UriTemplate extends ObjectHydrator<Specification.UriTemplate> {
  /**
   * Instanciates a new instance of the UriTemplate class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the UriTemplate.
   */
  constructor(model?: Partial<Specification.UriTemplate>) {
    super(model);

    getLifecycleHooks('UriTemplate')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the UriTemplate.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new UriTemplate(this as any) as UriTemplateIntersection;
    validate('UriTemplate', copy, workflow);
  }

  /**
   * Normalizes the current instance of the UriTemplate.
   * Creates a copy of the UriTemplate, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the UriTemplate instance.
   */
  normalize(): UriTemplate & Specification.UriTemplate {
    const copy = new UriTemplate(this as any) as UriTemplateIntersection;
    return getLifecycleHooks('UriTemplate')?.normalize?.(copy) || copy;
  }
}

export const _UriTemplate = UriTemplate as UriTemplateConstructor;
