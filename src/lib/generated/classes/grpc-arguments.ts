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
import { _WithGRPCService } from './with-grpc-service';
import { _WithGRPCArguments } from './with-grpc-arguments';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the GRPCArguments class and type
 */
export type GRPCArgumentsIntersection = GRPCArguments & Specification.GRPCArguments;

/**
 * Represents a constructor for the intersection of the GRPCArguments class and type
 */
export interface GRPCArgumentsConstructor {
  new (model?: Partial<Specification.GRPCArguments>): GRPCArgumentsIntersection;
}

/**
 * Represents a GRPCArguments with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class GRPCArguments extends ObjectHydrator<Specification.GRPCArguments> {
  /**
   * Instanciates a new instance of the GRPCArguments class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the GRPCArguments.
   */
  constructor(model?: Partial<Specification.GRPCArguments>) {
    super(model);
    const self = this as unknown as Specification.GRPCArguments & object;
    if (isObject(model)) {
      if (typeof model.proto === 'object') self.proto = new _ExternalResource(model.proto);
      if (typeof model.service === 'object') self.service = new _WithGRPCService(model.service);
      if (typeof model.arguments === 'object') self.arguments = new _WithGRPCArguments(model.arguments);
    }
    getLifecycleHooks('GRPCArguments')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the GRPCArguments.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new GRPCArguments(this as any) as GRPCArgumentsIntersection;
    validate('GRPCArguments', copy, workflow);
  }

  /**
   * Normalizes the current instance of the GRPCArguments.
   * Creates a copy of the GRPCArguments, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the GRPCArguments instance.
   */
  normalize(): GRPCArguments & Specification.GRPCArguments {
    const copy = new GRPCArguments(this as any) as GRPCArgumentsIntersection;
    return getLifecycleHooks('GRPCArguments')?.normalize?.(copy) || copy;
  }
}

export const _GRPCArguments = GRPCArguments as GRPCArgumentsConstructor;
