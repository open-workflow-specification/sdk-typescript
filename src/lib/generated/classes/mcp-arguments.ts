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

import { _Duration } from './duration';
import { _McpClient } from './mcp-client';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the MCPArguments class and type
 */
export type MCPArgumentsIntersection = MCPArguments & Specification.MCPArguments;

/**
 * Represents a constructor for the intersection of the MCPArguments class and type
 */
export interface MCPArgumentsConstructor {
  new (model?: Partial<Specification.MCPArguments>): MCPArgumentsIntersection;
}

/**
 * Represents a MCPArguments with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class MCPArguments extends ObjectHydrator<Specification.MCPArguments> {
  /**
   * Instanciates a new instance of the MCPArguments class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the MCPArguments.
   */
  constructor(model?: Partial<Specification.MCPArguments>) {
    super(model);
    const self = this as unknown as Specification.MCPArguments & object;
    if (isObject(model)) {
      if (typeof model.timeout === 'object') self.timeout = new _Duration(model.timeout);
      if (typeof model.client === 'object') self.client = new _McpClient(model.client);
    }
    getLifecycleHooks('MCPArguments')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the MCPArguments.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new MCPArguments(this as any) as MCPArgumentsIntersection;
    validate('MCPArguments', copy, workflow);
  }

  /**
   * Normalizes the current instance of the MCPArguments.
   * Creates a copy of the MCPArguments, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the MCPArguments instance.
   */
  normalize(): MCPArguments & Specification.MCPArguments {
    const copy = new MCPArguments(this as any) as MCPArgumentsIntersection;
    return getLifecycleHooks('MCPArguments')?.normalize?.(copy) || copy;
  }
}

export const _MCPArguments = MCPArguments as MCPArgumentsConstructor;
