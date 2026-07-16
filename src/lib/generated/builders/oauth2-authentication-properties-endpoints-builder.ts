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
import { OAuth2AuthenticationPropertiesEndpointsIntersection } from '../classes/oauth2-authentication-properties-endpoints';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.OAuth2AuthenticationPropertiesEndpoints} model The proxied object
 * @param {BuildOptions} options The build options to use
 * @returns {OAuth2AuthenticationPropertiesEndpointsIntersection} The built object
 */
function buildingFn(
  model: Specification.OAuth2AuthenticationPropertiesEndpoints,
  options: BuildOptions,
): OAuth2AuthenticationPropertiesEndpointsIntersection {
  const instance = new Classes.OAuth2AuthenticationPropertiesEndpoints(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) as OAuth2AuthenticationPropertiesEndpointsIntersection;
}

/**
 * A factory to create a builder proxy for the type `OAuth2AuthenticationPropertiesEndpointsIntersection`
 * @returns {Builder<OAuth2AuthenticationPropertiesEndpointsIntersection, OAuth2AuthenticationPropertiesEndpointsIntersection>} A builder for `OAuth2AuthenticationPropertiesEndpointsIntersection`
 */
export const oAuth2AuthenticationPropertiesEndpointsBuilder = (
  model?: Partial<Specification.OAuth2AuthenticationPropertiesEndpoints>,
): Builder<
  Partial<Specification.OAuth2AuthenticationPropertiesEndpoints>,
  OAuth2AuthenticationPropertiesEndpointsIntersection
> =>
  builder<Specification.OAuth2AuthenticationPropertiesEndpoints, OAuth2AuthenticationPropertiesEndpointsIntersection>(
    model,
    buildingFn,
  );
