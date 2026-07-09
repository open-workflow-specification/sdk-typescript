/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Specification } from './generated/definitions';
import { TaskListHooks, WorkflowHooks } from './hooks';

/**
 * Represents the possible lifecycle hooks of an instance
 */
export type LifecycleHooks<T> = {
  /**
   * The hook called at the end of the constructor
   * @param instance The instance being initialized
   */
  constructor?: (instance: T) => void;
  /**
   * The hook called before the validation
   * @param instance A copy instance being validated
   * @param workflow A workflow instance, used for DSL level validation
   */
  preValidation?: (instance: T, workflow?: Partial<Specification.Workflow>) => void;
  /**
   * The hook called after the validation
   * @param instance A copy instance being validated
   * @param workflow A workflow instance, used for DSL level validation
   */
  postValidation?: (instance: T, workflow?: Partial<Specification.Workflow>) => void;
  /**
   * The hook called to normalized the instance
   * @param instance A copy of the instance to normalize
   * @returns The normalized instance
   */
  normalize?: (instance: T) => T;
};

/**
 * A mapping of type names and their lifecycle hooks
 */
// The generated classes call these hooks without generic arguments, so this registry must stay untyped at runtime.
const registeredHooks: Map<string, LifecycleHooks<any>> = new Map<string, LifecycleHooks<any>>();

/**
 * The function used to register hooks
 * @param typeName The name of the type to register the hooks for
 * @param hooks The hooks to register
 */
export const registerHooks = (typeName: string, hooks: LifecycleHooks<any>): void => {
  registeredHooks.set(typeName, hooks);
};

/**
 * Gets the lifecylce hook for the provided type, if any
 * @param typeName The type to get the lifecycle hook for
 * @returns The lifecycle hook, if any
 */
export const getLifecycleHooks = (typeName: string): LifecycleHooks<any> | undefined => {
  return registeredHooks.get(typeName);
};

registerHooks('Workflow', WorkflowHooks);
registerHooks('TaskList', TaskListHooks);
