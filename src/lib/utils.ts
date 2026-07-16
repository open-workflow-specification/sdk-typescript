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

/**
 * Check if the provided value is an object but not an array
 * @param value The value to check
 * @returns True if the value is an object
 */
export const isObject = <T>(value: T): value is T & object => {
  if (!value) return false;
  return typeof value === 'object' && !Array.isArray(value);
};

/**
 * Makes a deep copy of the provided object
 * @param obj
 * @returns
 */
export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

/**
 * Checks the provided array is an array
 * @param arr
 * @returns
 */
export const isArray = <T>(arr: Array<T> | number | undefined): arr is Array<T> => !!arr && isNaN(arr as number);
