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
import { AnyEventConsumptionStrategyConfigurationIntersection } from '../classes/any-event-consumption-strategy-configuration';
import { Specification } from '../definitions';

/**
 * The internal function used by the builder proxy to validate and return its underlying array
 * @param {Specification.AnyEventConsumptionStrategyConfiguration} model The proxied array
 * @param {BuildOptions} options The build options to use
 * @returns {AnyEventConsumptionStrategyConfigurationIntersection} The built array
 */
function buildingFn(
  model: Specification.AnyEventConsumptionStrategyConfiguration,
  options: BuildOptions,
): AnyEventConsumptionStrategyConfigurationIntersection {
  const instance = new Classes.AnyEventConsumptionStrategyConfiguration(model);
  if (options.validate) instance.validate();
  return (options.normalize
    ? instance.normalize()
    : instance) as unknown as AnyEventConsumptionStrategyConfigurationIntersection;
}

/**
 * A factory to create a builder proxy for the type `AnyEventConsumptionStrategyConfigurationIntersection`
 * @returns {ArrayBuilder<Specification.EventFilter, AnyEventConsumptionStrategyConfigurationIntersection>} A builder for `AnyEventConsumptionStrategyConfigurationIntersection`
 */
export const anyEventConsumptionStrategyConfigurationBuilder = (
  model?: Specification.AnyEventConsumptionStrategyConfiguration,
): ArrayBuilder<Specification.EventFilter, AnyEventConsumptionStrategyConfigurationIntersection> =>
  arrayBuilder<Specification.EventFilter, AnyEventConsumptionStrategyConfigurationIntersection>(model, buildingFn);
