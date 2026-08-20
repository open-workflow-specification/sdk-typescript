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
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { deepCopy, isObject } from './utils';

/**
 * A base class used for object hydration
 */
export class ObjectHydrator<T> {
  /**
   * Instanciates a new instance of the ObjectHydrator class.
   * Copies the own properties of the provided model onto the instance if it is an object.
   *
   * @param model - Optional partial model object to initialize the instance.
   */
  constructor(model?: Partial<T>) {
    if (isObject(model)) {
      Object.assign(this, deepCopy(model));
    }
  }

  /**
   * Converts the hydrated instance, and every hydrated instance nested within it, into plain data.
   *
   * Hydrated objects are class instances, which several plain data consumers reject: js-yaml v5
   * identifies mappings with `Object.getPrototypeOf(data) === Object.prototype` and throws on
   * anything else, and AJV reports class members as unevaluated properties. Use this method to
   * obtain a representation safe to hand to such a consumer. See issue #308.
   *
   * @returns A plain object representation of the instance, free of class prototypes
   */
  asPlainObject(): T {
    return deepCopy(this as unknown as T);
  }
}

/**
 * A base class used for array hydration
 */
export class ArrayHydrator<T> extends Array<T> {
  /**
   * Instanciates a new instance of the ArrayHydrator class.
   * Copies the elements of the provided model onto the instance if it is an array.
   *
   * Discriminates on the model's runtime type rather than on its numeric coercion. `Number([])` is 0
   * and `Number(['5'])` is 5, so an isNaN based test routed empty and single element arrays into the
   * `Array(length)` constructor, hydrating `[]` as `[[]]` and `null` as `[null]`. The elements are
   * assigned by index rather than spread as arguments, which would exceed the engine's argument limit
   * for a large model.
   *
   * @param model - Optional array to copy, or a number to preallocate the instance's length.
   */
  constructor(model?: Array<T> | number) {
    if (model == null) {
      super();
    } else if (typeof model === 'number') {
      super(model);
    } else if (Array.isArray(model)) {
      super(model.length);
      model.forEach((item, index) => {
        this[index] = item;
      });
    } else {
      throw new Error('The provided model should be an array');
    }
  }
}
