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

import { _TaskList } from './task-list';
import { _Output } from './output';
import { _Export } from './export';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the SubscriptionIterator class and type
 */
export type SubscriptionIteratorIntersection = SubscriptionIterator & Specification.SubscriptionIterator;

/**
 * Represents a constructor for the intersection of the SubscriptionIterator class and type
 */
export interface SubscriptionIteratorConstructor {
  new (model?: Partial<Specification.SubscriptionIterator>): SubscriptionIteratorIntersection;
}

/**
 * Represents a SubscriptionIterator with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class SubscriptionIterator extends ObjectHydrator<Specification.SubscriptionIterator> {
  /**
   * Instanciates a new instance of the SubscriptionIterator class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the SubscriptionIterator.
   */
  constructor(model?: Partial<Specification.SubscriptionIterator>) {
    super(model);
    const self = this as unknown as Specification.SubscriptionIterator & object;
    if (isObject(model)) {
      if (typeof model.do === 'object') self.do = new _TaskList(model.do);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.export === 'object') self.export = new _Export(model.export);
    }
    getLifecycleHooks('SubscriptionIterator')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the SubscriptionIterator.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new SubscriptionIterator(this as any) as SubscriptionIteratorIntersection;
    validate('SubscriptionIterator', copy, workflow);
  }

  /**
   * Normalizes the current instance of the SubscriptionIterator.
   * Creates a copy of the SubscriptionIterator, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the SubscriptionIterator instance.
   */
  normalize(): SubscriptionIterator & Specification.SubscriptionIterator {
    const copy = new SubscriptionIterator(this as any) as SubscriptionIteratorIntersection;
    return getLifecycleHooks('SubscriptionIterator')?.normalize?.(copy) || copy;
  }
}

export const _SubscriptionIterator = SubscriptionIterator as SubscriptionIteratorConstructor;
