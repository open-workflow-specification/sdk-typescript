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
 * Represents the intersection between the WithGRPCArguments class and type
 */
export type WithGRPCArgumentsIntersection = WithGRPCArguments & Specification.WithGRPCArguments;

/**
 * Represents a constructor for the intersection of the WithGRPCArguments class and type
 */
export interface WithGRPCArgumentsConstructor {
  new (model?: Partial<Specification.WithGRPCArguments>): WithGRPCArgumentsIntersection;
}

/**
 * Represents a WithGRPCArguments with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class WithGRPCArguments extends ObjectHydrator<Specification.WithGRPCArguments> {
  /**
   * Instanciates a new instance of the WithGRPCArguments class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the WithGRPCArguments.
   */
  constructor(model?: Partial<Specification.WithGRPCArguments>) {
    super(model);

    getLifecycleHooks('WithGRPCArguments')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the WithGRPCArguments.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new WithGRPCArguments(this as any) as WithGRPCArgumentsIntersection;
    validate('WithGRPCArguments', copy, workflow);
  }

  /**
   * Normalizes the current instance of the WithGRPCArguments.
   * Creates a copy of the WithGRPCArguments, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the WithGRPCArguments instance.
   */
  normalize(): WithGRPCArguments & Specification.WithGRPCArguments {
    const copy = new WithGRPCArguments(this as any) as WithGRPCArgumentsIntersection;
    return getLifecycleHooks('WithGRPCArguments')?.normalize?.(copy) || copy;
  }
}

export const _WithGRPCArguments = WithGRPCArguments as WithGRPCArgumentsConstructor;
