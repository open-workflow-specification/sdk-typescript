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
import { OAuth2AuthenticationDataScopesIntersection } from '../classes/oauth2-authentication-data-scopes';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying array
 * @param {Specification.OAuth2AuthenticationDataScopes} model The proxied array
 * @param {BuildOptions} options The build options to use
 * @returns {OAuth2AuthenticationDataScopesIntersection} The built array
 */
function buildingFn(
  model: Specification.OAuth2AuthenticationDataScopes,
  options: BuildOptions,
): OAuth2AuthenticationDataScopesIntersection {
  const instance = new Classes.OAuth2AuthenticationDataScopes(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) as unknown as OAuth2AuthenticationDataScopesIntersection;
}

/**
 * A factory to create a builder proxy for the type `OAuth2AuthenticationDataScopesIntersection`
 * @returns {ArrayBuilder<string, OAuth2AuthenticationDataScopesIntersection>} A builder for `OAuth2AuthenticationDataScopesIntersection`
 */
export const oAuth2AuthenticationDataScopesBuilder = (
  model?: Specification.OAuth2AuthenticationDataScopes,
): ArrayBuilder<string, OAuth2AuthenticationDataScopesIntersection> =>
  arrayBuilder<string, OAuth2AuthenticationDataScopesIntersection>(model, buildingFn);
