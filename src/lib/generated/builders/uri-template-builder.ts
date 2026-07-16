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
import { UriTemplateIntersection } from '../classes/uri-template';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.UriTemplate} model The proxied object
 * @param {BuildOptions} options The build options to use
 * @returns {UriTemplateIntersection} The built object
 */
function buildingFn(model: Specification.UriTemplate, options: BuildOptions): UriTemplateIntersection {
  const instance = new Classes.UriTemplate(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) as UriTemplateIntersection;
}

/**
 * A factory to create a builder proxy for the type `UriTemplateIntersection`
 * @returns {Builder<UriTemplateIntersection, UriTemplateIntersection>} A builder for `UriTemplateIntersection`
 */
export const uriTemplateBuilder = (
  model?: Partial<Specification.UriTemplate>,
): Builder<Partial<Specification.UriTemplate>, UriTemplateIntersection> =>
  builder<Specification.UriTemplate, UriTemplateIntersection>(model, buildingFn);
