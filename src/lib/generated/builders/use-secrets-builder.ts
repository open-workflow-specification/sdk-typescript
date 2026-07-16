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

import { arrayBuilder, ArrayBuilder, BuildOptions } from '../../builder';
import { Classes } from '../classes';
import { UseSecretsIntersection } from '../classes/use-secrets';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying array
 * @param {Specification.UseSecrets} model The proxied array
 * @param {BuildOptions} options The build options to use
 * @returns {UseSecretsIntersection} The built array
 */
function buildingFn(model: Specification.UseSecrets, options: BuildOptions): UseSecretsIntersection {
  const instance = new Classes.UseSecrets(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) as unknown as UseSecretsIntersection;
}

/**
 * A factory to create a builder proxy for the type `UseSecretsIntersection`
 * @returns {ArrayBuilder<string, UseSecretsIntersection>} A builder for `UseSecretsIntersection`
 */
export const useSecretsBuilder = (model?: Specification.UseSecrets): ArrayBuilder<string, UseSecretsIntersection> =>
  arrayBuilder<string, UseSecretsIntersection>(model, buildingFn);
