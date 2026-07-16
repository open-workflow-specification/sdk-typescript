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
 * oUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {
  basicAuthenticationPolicyBuilder,
  basicAuthenticationPropertiesBuilder,
  bearerAuthenticationPolicyBuilder,
  bearerAuthenticationPropertiesBuilder,
  callHTTPBuilder,
  documentBuilder,
  hTTPArgumentsBuilder,
  oAuth2AuthenticationDataClientBuilder,
  oAuth2AuthenticationPolicyBuilder,
  oAuth2ConnectAuthenticationPropertiesBuilder,
  setTaskBuilder,
  taskListBuilder,
  useAuthenticationsBuilder,
  useBuilder,
  useFunctionsBuilder,
  workflowBuilder,
} from '../../src/lib/generated/builders';
import { Classes } from '../../src/lib/generated/classes';

import { schemaVersion } from '../../package.json';

describe('Workflow builder', () => {
  it('should build with fluent api', () => {
    const workflow = workflowBuilder()
      .document(documentBuilder().dsl(schemaVersion).name('test').version('1.0.0').namespace('default').build())
      .do(
        taskListBuilder()
          .push({
            step1: setTaskBuilder().set({ foo: 'bar' }).build(),
          })
          .build(),
      )
      .build();
    expect(workflow).toBeDefined();
    expect(workflow).toBeInstanceOf(Classes.Workflow);
  });

  it('should build a complex workflow with fluent api', () => {
    const workflow = workflowBuilder()
      .document(documentBuilder().dsl(schemaVersion).name('test').version('1.0.0').namespace('default').build())
      .use(
        useBuilder()
          .authentications(
            useAuthenticationsBuilder({
              myBasicAuth: basicAuthenticationPolicyBuilder()
                .basic(basicAuthenticationPropertiesBuilder().username('user').password('password').build())
                .build(),
              myBearerAuth: bearerAuthenticationPolicyBuilder()
                .bearer(bearerAuthenticationPropertiesBuilder().token('token').build())
                .build(),
              myOAuthAuth: oAuth2AuthenticationPolicyBuilder()
                .oauth2(
                  oAuth2ConnectAuthenticationPropertiesBuilder()
                    .grant('client_credentials')
                    .authority('https://authority.com')
                    .client(oAuth2AuthenticationDataClientBuilder().id('clientId').secret('clientSecret').build())
                    .build(),
                )
                .build(),
            }).build(),
          )
          .functions(
            useFunctionsBuilder({
              myCustomFunction: callHTTPBuilder()
                .with(hTTPArgumentsBuilder().method('GET').endpoint('https://myapi.com').build())
                .build(),
            }).build(),
          )
          .build(),
      )
      .do(
        taskListBuilder()
          .push({
            step1: setTaskBuilder().set({ foo: 'bar' }).build(),
          })
          .build(),
      )
      .build();
    expect(workflow).toBeDefined();
    expect(workflow).toBeInstanceOf(Classes.Workflow);
  });

  it('should build with input', () => {
    const data = {
      document: {
        dsl: schemaVersion,
        name: 'test',
        version: '1.0.0',
        namespace: 'default',
      },
      do: [
        {
          step1: {
            set: {
              foo: 'bar',
            },
          },
        },
      ],
    };
    const workflow = workflowBuilder(data).build();
    expect(workflow).toBeDefined();
    expect(workflow).toBeInstanceOf(Classes.Workflow);
  });

  it('should throw when invalid', () => {
    const test = () => {
      workflowBuilder().build();
    };
    expect(test).toThrow(Error);
    expect(test).toThrow(/'Workflow' is invalid/);
  });

  it('should not throw when validation is disabled', () => {
    const test = () => {
      workflowBuilder().build({ validate: false });
    };
    expect(test).not.toThrow();
  });
});
