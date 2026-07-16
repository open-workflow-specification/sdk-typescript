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

import { _Container } from './container';
import { _Script } from './script';
import { _Shell } from './shell';
import { _SubflowConfiguration } from './subflow-configuration';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the RunTaskConfiguration class and type
 */
export type RunTaskConfigurationIntersection = RunTaskConfiguration & Specification.RunTaskConfiguration;

/**
 * Represents a constructor for the intersection of the RunTaskConfiguration class and type
 */
export interface RunTaskConfigurationConstructor {
  new (model?: Partial<Specification.RunTaskConfiguration>): RunTaskConfigurationIntersection;
}

/**
 * Represents a RunTaskConfiguration with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class RunTaskConfiguration extends ObjectHydrator<Specification.RunTaskConfiguration> {
  /**
   * Instanciates a new instance of the RunTaskConfiguration class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the RunTaskConfiguration.
   */
  constructor(model?: Partial<Specification.RunTaskConfiguration>) {
    super(model);
    const self = this as unknown as Specification.RunTaskConfiguration & object;
    if (isObject(model)) {
      if (typeof (model as Specification.RunContainer).container === 'object')
        (self as Specification.RunContainer).container = new _Container(
          (model as Specification.RunContainer).container as Specification.Container,
        );
      if (typeof (model as Specification.RunScript).script === 'object')
        (self as Specification.RunScript).script = new _Script(
          (model as Specification.RunScript).script as Specification.Script,
        );
      if (typeof (model as Specification.RunShell).shell === 'object')
        (self as Specification.RunShell).shell = new _Shell(
          (model as Specification.RunShell).shell as Specification.Shell,
        );
      if (typeof (model as Specification.RunWorkflow).workflow === 'object')
        (self as Specification.RunWorkflow).workflow = new _SubflowConfiguration(
          (model as Specification.RunWorkflow).workflow as Specification.SubflowConfiguration,
        );
    }
    getLifecycleHooks('RunTaskConfiguration')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the RunTaskConfiguration.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new RunTaskConfiguration(this as any) as RunTaskConfigurationIntersection;
    validate('RunTaskConfiguration', copy, workflow);
  }

  /**
   * Normalizes the current instance of the RunTaskConfiguration.
   * Creates a copy of the RunTaskConfiguration, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the RunTaskConfiguration instance.
   */
  normalize(): RunTaskConfiguration & Specification.RunTaskConfiguration {
    const copy = new RunTaskConfiguration(this as any) as RunTaskConfigurationIntersection;
    return getLifecycleHooks('RunTaskConfiguration')?.normalize?.(copy) || copy;
  }
}

export const _RunTaskConfiguration = RunTaskConfiguration as RunTaskConfigurationConstructor;
