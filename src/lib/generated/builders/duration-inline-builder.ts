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
import { DurationInlineIntersection } from '../classes/duration-inline';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.DurationInline} model The proxied object
 * @param {BuildOptions} options The build options to use
 * @returns {DurationInlineIntersection} The built object
 */
function buildingFn(model: Specification.DurationInline, options: BuildOptions): DurationInlineIntersection {
  const instance = new Classes.DurationInline(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) as DurationInlineIntersection;
}

/**
 * A factory to create a builder proxy for the type `DurationInlineIntersection`
 * @returns {Builder<DurationInlineIntersection, DurationInlineIntersection>} A builder for `DurationInlineIntersection`
 */
export const durationInlineBuilder = (
  model?: Partial<Specification.DurationInline>,
): Builder<Partial<Specification.DurationInline>, DurationInlineIntersection> =>
  builder<Specification.DurationInline, DurationInlineIntersection>(model, buildingFn);
