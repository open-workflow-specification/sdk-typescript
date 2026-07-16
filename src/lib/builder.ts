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
 * Represents the options passed to the `build()` method
 */
export type BuildOptions = {
  /**
   * Default true
   */
  validate?: boolean;
  /**
   * Default true
   */
  normalize?: boolean;
};

/**
 * The type of the underlying function called on `build()` for objects
 */
export type BuildingFunction<TSpec, TBuilt> = (model: TSpec, options: BuildOptions) => TBuilt;

/**
 * The type of the underlying function called on `build()` for arrays
 */
export type ArrayBuildingFunction<TSpec, TBuilt> = (model: Array<TSpec>, options: BuildOptions) => TBuilt;

/**
 * Represents a fluent builder proxy for an object
 */
export type Builder<TSpec, TBuilt = TSpec> = {
  build: (option?: BuildOptions) => TBuilt;
} & {
  [K in keyof TSpec]-?: (arg: TSpec[K]) => Builder<TSpec, TBuilt>;
};

/**
 * Represents a fluent builder proxy for an array
 */
export type ArrayBuilder<TSpec, TBuilt> = {
  push: (item: TSpec) => ArrayBuilder<TSpec, TBuilt>;
  build: (option?: BuildOptions) => TBuilt;
};

/**
 * The default function used to build an object, basically just return the provided object
 * @param model The object to "build"
 * @param options The build options
 * @returns
 */
function defaultBuildingFn<TSpec, TBuilt = TSpec>(model: TSpec, options: BuildOptions): TBuilt {
  // Keep defaults explicit so callers can omit both options.
  if (options.validate == null) {
    options.validate = true;
  }
  if (options.normalize == null) {
    options.normalize = true;
  }
  return model as unknown as TBuilt;
}

/**
 * A factory for fluent builders that proxy properties assignations and can validate against schema on build()
 * @param buildingFn The function used to validate and produce the object on build()
 * @returns A fluent builder
 */
export function builder<TSpec, TBuilt = TSpec>(
  model: Partial<TSpec> = {},
  buildingFn: BuildingFunction<TSpec, TBuilt> = defaultBuildingFn,
): Builder<Partial<TSpec>, TBuilt> {
  const proxy = new Proxy({} as Builder<Partial<TSpec>, TBuilt>, {
    get: (_, prop) => {
      if (prop === 'build') {
        return (options?: BuildOptions) => {
          options = options || ({} as BuildOptions);
          if (options.validate == null) {
            options.validate = true;
          }
          if (options.normalize == null) {
            options.normalize = true;
          }
          return buildingFn(model as TSpec, options);
        };
      }
      return (value: unknown): Builder<Partial<TSpec>, TBuilt> => {
        (model as Record<string, unknown>)[prop.toString()] = value;
        return proxy;
      };
    },
    set: () => {
      return false;
    },
  });
  return proxy;
}

/**
 * A factory for fluent builders that proxy properties assignations and can validate against schema on build()
 * @param buildingFn The function used to validate and produce the object on build()
 * @returns A fluent builder
 */
export function arrayBuilder<TSpec, TBuilt>(
  model: Array<TSpec> = [],
  buildingFn: ArrayBuildingFunction<TSpec, TBuilt> = defaultBuildingFn,
): ArrayBuilder<TSpec, TBuilt> {
  if (model != null && !Array.isArray(model)) {
    throw new Error(`The provided model should be an array`);
  }
  const proxy = new Proxy({} as ArrayBuilder<TSpec, TBuilt>, {
    get: (_, prop) => {
      if (prop === 'build') {
        return (options?: BuildOptions) => {
          options = options || ({} as BuildOptions);
          if (options.validate == null) {
            options.validate = true;
          }
          if (options.normalize == null) {
            options.normalize = true;
          }
          return buildingFn(model, options);
        };
      }
      if (prop === 'push') {
        return (value: TSpec): ArrayBuilder<TSpec, TBuilt> => {
          model.push(value);
          return proxy;
        };
      }
    },
    set: () => {
      return false;
    },
  });
  return proxy;
}
