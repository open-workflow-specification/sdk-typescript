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

import { builder, Builder, BuildOptions } from '../../builder';
import { Classes } from '../classes';
import { OpenAPIArgumentsIntersection } from '../classes/open-api-arguments';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.OpenAPIArguments} model The proxied object
 * @param {BuildOptions} options The build options to use
 * @returns {OpenAPIArgumentsIntersection} The built object
 */
function buildingFn(model: Specification.OpenAPIArguments, options: BuildOptions): OpenAPIArgumentsIntersection {
  const instance = new Classes.OpenAPIArguments(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) as OpenAPIArgumentsIntersection;
}

/**
 * A factory to create a builder proxy for the type `OpenAPIArgumentsIntersection`
 * @returns {Builder<OpenAPIArgumentsIntersection, OpenAPIArgumentsIntersection>} A builder for `OpenAPIArgumentsIntersection`
 */
export const openAPIArgumentsBuilder = (
  model?: Partial<Specification.OpenAPIArguments>,
): Builder<Partial<Specification.OpenAPIArguments>, OpenAPIArgumentsIntersection> =>
  builder<Specification.OpenAPIArguments, OpenAPIArgumentsIntersection>(model, buildingFn);
