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

import { _EmitEventWith } from './emit-event-with';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the EmitEventDefinition class and type
 */
export type EmitEventDefinitionIntersection = EmitEventDefinition & Specification.EmitEventDefinition;

/**
 * Represents a constructor for the intersection of the EmitEventDefinition class and type
 */
export interface EmitEventDefinitionConstructor {
  new (model?: Partial<Specification.EmitEventDefinition>): EmitEventDefinitionIntersection;
}

/**
 * Represents a EmitEventDefinition with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class EmitEventDefinition extends ObjectHydrator<Specification.EmitEventDefinition> {
  /**
   * Instanciates a new instance of the EmitEventDefinition class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the EmitEventDefinition.
   */
  constructor(model?: Partial<Specification.EmitEventDefinition>) {
    super(model);
    const self = this as unknown as Specification.EmitEventDefinition & object;
    if (isObject(model)) {
      if (typeof model.with === 'object') self.with = new _EmitEventWith(model.with);
    }
    getLifecycleHooks('EmitEventDefinition')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the EmitEventDefinition.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new EmitEventDefinition(this as any) as EmitEventDefinitionIntersection;
    validate('EmitEventDefinition', copy, workflow);
  }

  /**
   * Normalizes the current instance of the EmitEventDefinition.
   * Creates a copy of the EmitEventDefinition, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the EmitEventDefinition instance.
   */
  normalize(): EmitEventDefinition & Specification.EmitEventDefinition {
    const copy = new EmitEventDefinition(this as any) as EmitEventDefinitionIntersection;
    return getLifecycleHooks('EmitEventDefinition')?.normalize?.(copy) || copy;
  }
}

export const _EmitEventDefinition = EmitEventDefinition as EmitEventDefinitionConstructor;
