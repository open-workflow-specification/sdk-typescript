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
import { AuthenticationPolicyReferenceIntersection } from '../classes/authentication-policy-reference';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.AuthenticationPolicyReference} model The proxied object
 * @param {BuildOptions} options The build options to use
 * @returns {AuthenticationPolicyReferenceIntersection} The built object
 */
function buildingFn(
  model: Specification.AuthenticationPolicyReference,
  options: BuildOptions,
): AuthenticationPolicyReferenceIntersection {
  const instance = new Classes.AuthenticationPolicyReference(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) as AuthenticationPolicyReferenceIntersection;
}

/**
 * A factory to create a builder proxy for the type `AuthenticationPolicyReferenceIntersection`
 * @returns {Builder<AuthenticationPolicyReferenceIntersection, AuthenticationPolicyReferenceIntersection>} A builder for `AuthenticationPolicyReferenceIntersection`
 */
export const authenticationPolicyReferenceBuilder = (
  model?: Partial<Specification.AuthenticationPolicyReference>,
): Builder<Partial<Specification.AuthenticationPolicyReference>, AuthenticationPolicyReferenceIntersection> =>
  builder<Specification.AuthenticationPolicyReference, AuthenticationPolicyReferenceIntersection>(model, buildingFn);
