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
import { CallAsyncAPIIntersection } from '../classes/call-async-api';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.CallAsyncAPI} model The proxied object
 * @param {BuildOptions} options The build options to use
 * @returns {CallAsyncAPIIntersection} The built object
 */
function buildingFn(model: Specification.CallAsyncAPI, options: BuildOptions): CallAsyncAPIIntersection {
  const instance = new Classes.CallAsyncAPI(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) as CallAsyncAPIIntersection;
}

/**
 * A factory to create a builder proxy for the type `CallAsyncAPIIntersection`
 * @returns {Builder<CallAsyncAPIIntersection, CallAsyncAPIIntersection>} A builder for `CallAsyncAPIIntersection`
 */
export const callAsyncAPIBuilder = (
  model?: Partial<Specification.CallAsyncAPI>,
): Builder<Partial<Specification.CallAsyncAPI>, CallAsyncAPIIntersection> =>
  builder<Specification.CallAsyncAPI, CallAsyncAPIIntersection>(model, buildingFn);
