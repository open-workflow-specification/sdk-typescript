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

import { _Schema } from './schema';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Export class and type
 */
export type ExportIntersection = Export & Specification.Export;

/**
 * Represents a constructor for the intersection of the Export class and type
 */
export interface ExportConstructor {
  new (model?: Partial<Specification.Export>): ExportIntersection;
}

/**
 * Represents a Export with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Export extends ObjectHydrator<Specification.Export> {
  /**
   * Instanciates a new instance of the Export class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Export.
   */
  constructor(model?: Partial<Specification.Export>) {
    super(model);
    const self = this as unknown as Specification.Export & object;
    if (isObject(model)) {
      if (typeof model.schema === 'object') self.schema = new _Schema(model.schema);
    }
    getLifecycleHooks('Export')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Export.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Export(this as any) as ExportIntersection;
    validate('Export', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Export.
   * Creates a copy of the Export, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Export instance.
   */
  normalize(): Export & Specification.Export {
    const copy = new Export(this as any) as ExportIntersection;
    return getLifecycleHooks('Export')?.normalize?.(copy) || copy;
  }
}

export const _Export = Export as ExportConstructor;
