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
 * Represents the intersection between the McpClient class and type
 */
export type McpClientIntersection = McpClient & Specification.McpClient;

/**
 * Represents a constructor for the intersection of the McpClient class and type
 */
export interface McpClientConstructor {
  new (model?: Partial<Specification.McpClient>): McpClientIntersection;
}

/**
 * Represents a McpClient with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class McpClient extends ObjectHydrator<Specification.McpClient> {
  /**
   * Instanciates a new instance of the McpClient class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the McpClient.
   */
  constructor(model?: Partial<Specification.McpClient>) {
    super(model);

    getLifecycleHooks('McpClient')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the McpClient.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new McpClient(this as any) as McpClientIntersection;
    validate('McpClient', copy, workflow);
  }

  /**
   * Normalizes the current instance of the McpClient.
   * Creates a copy of the McpClient, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the McpClient instance.
   */
  normalize(): McpClient & Specification.McpClient {
    const copy = new McpClient(this as any) as McpClientIntersection;
    return getLifecycleHooks('McpClient')?.normalize?.(copy) || copy;
  }
}

export const _McpClient = McpClient as McpClientConstructor;
