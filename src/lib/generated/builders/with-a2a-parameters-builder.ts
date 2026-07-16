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
import { WithA2AParametersIntersection } from '../classes/with-a2a-parameters';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.WithA2AParameters} model The proxied object
 * @param {BuildOptions} options The build options to use
 * @returns {WithA2AParametersIntersection} The built object
 */
function buildingFn(model: Specification.WithA2AParameters, options: BuildOptions): WithA2AParametersIntersection {
  const instance = new Classes.WithA2AParameters(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) as WithA2AParametersIntersection;
}

/**
 * A factory to create a builder proxy for the type `WithA2AParametersIntersection`
 * @returns {Builder<WithA2AParametersIntersection, WithA2AParametersIntersection>} A builder for `WithA2AParametersIntersection`
 */
export const withA2AParametersBuilder = (
  model?: Partial<Specification.WithA2AParameters>,
): Builder<Partial<Specification.WithA2AParameters>, WithA2AParametersIntersection> =>
  builder<Specification.WithA2AParameters, WithA2AParametersIntersection>(model, buildingFn);
