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

/**
 * A map of type names and their corresponding schema
 */
export const validationPointers = {
  Workflow: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#',
  A2AArguments:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/4/allOf/1/properties/with',
  AllEventConsumptionStrategy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/0',
  AllEventConsumptionStrategyConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/0/properties/all',
  AnyEventConsumptionStrategy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/1',
  AnyEventConsumptionStrategyConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/1/properties/any',
  AnyEventConsumptionStrategyUntil:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/1/properties/until',
  AnyEventUntilConsumed:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/1/properties/until/oneOf/1',
  AsyncApiArguments:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/0/allOf/1/properties/with',
  AuthenticationPolicy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy',
  AuthenticationPolicyReference:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/referenceableAuthenticationPolicy/oneOf/0',
  BasicAuthenticationPolicy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/0',
  BasicAuthenticationPolicyConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/0/properties/basic',
  BasicAuthenticationProperties:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/0/properties/basic/oneOf/0',
  BearerAuthenticationPolicy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/1',
  BearerAuthenticationPolicyConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/1/properties/bearer',
  BearerAuthenticationProperties:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/1/properties/bearer/oneOf/0',
  CallA2A: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/4',
  CallAsyncAPI: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/0',
  CallFunction: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/6',
  CallGRPC: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/1',
  CallHTTP: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/2',
  CallMCP: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/5',
  CallOpenAPI: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/3',
  CallTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask',
  Catalog: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/catalog',
  CatchErrors:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/tryTask/allOf/1/properties/catch/properties/errors',
  ConstantBackoff:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/retryPolicy/properties/backoff/oneOf/0',
  Container:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/0/properties/container',
  ContainerArguments:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/0/properties/container/properties/arguments',
  ContainerEnvironment:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/0/properties/container/properties/environment',
  ContainerLifetime:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/0/properties/container/properties/lifetime',
  ContainerPorts:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/0/properties/container/properties/ports',
  ContainerVolumes:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/0/properties/container/properties/volumes',
  DigestAuthenticationPolicy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/2',
  DigestAuthenticationPolicyConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/2/properties/digest',
  DigestAuthenticationProperties:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/2/properties/digest/oneOf/0',
  Document: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/document',
  DoTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/doTask',
  Duration: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/duration',
  DurationInline: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/duration/oneOf/0',
  EmitEventDefinition:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/emitTask/allOf/1/properties/emit/properties/event',
  EmitEventWith:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/emitTask/allOf/1/properties/emit/properties/event/properties/with',
  EmitTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/emitTask',
  EmitTaskConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/emitTask/allOf/1/properties/emit',
  Endpoint: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/endpoint',
  EndpointConfiguration: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/endpoint/oneOf/2',
  EndpointUri:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/endpoint/oneOf/2/properties/uri',
  Error: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/error',
  ErrorDetails: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/error/properties/detail',
  ErrorFilter: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/errorFilter',
  ErrorInstance: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/error/properties/instance',
  ErrorTitle: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/error/properties/title',
  ErrorType: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/error/properties/type',
  EventConsumptionStrategy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventConsumptionStrategy',
  EventData:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventProperties/properties/data',
  EventDataschema:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventProperties/properties/dataschema',
  EventFilter: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventFilter',
  EventFilterCorrelate:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventFilter/properties/correlate',
  EventSource:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventProperties/properties/source',
  EventTime:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventProperties/properties/time',
  ExponentialBackOff:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/retryPolicy/properties/backoff/oneOf/1',
  Export: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/export',
  ExportAs: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/export/properties/as',
  Extension: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/extension',
  ExtensionItem:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/use/properties/extensions/items',
  ExternalResource: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/externalResource',
  ExternalScript:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/1/properties/script/oneOf/1',
  FlowDirective: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/flowDirective',
  ForkTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/forkTask',
  ForkTaskConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/forkTask/allOf/1/properties/fork',
  ForTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/forTask',
  ForTaskConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/forTask/allOf/1/properties/for',
  FunctionArguments:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/6/allOf/1/properties/with',
  GRPCArguments:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/1/allOf/1/properties/with',
  HTTPArguments:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/2/allOf/1/properties/with',
  HTTPBody:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/2/allOf/1/properties/with/properties/body',
  HTTPHeaders:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/2/allOf/1/properties/with/properties/headers',
  HTTPQuery:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/2/allOf/1/properties/with/properties/query',
  InlineScript:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/1/properties/script/oneOf/0',
  Input: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/input',
  InputFrom: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/input/properties/from',
  LinearBackoff:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/retryPolicy/properties/backoff/oneOf/2',
  ListenTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/listenTask',
  ListenTaskConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/listenTask/allOf/1/properties/listen',
  MCPArguments:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/5/allOf/1/properties/with',
  McpCallTransport:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/5/allOf/1/properties/with/properties/transport',
  McpClient:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/5/allOf/1/properties/with/properties/client',
  McpMethodParameters:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/5/allOf/1/properties/with/properties/parameters',
  OAuth2AuthenticationData:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/oauth2AuthenticationProperties',
  OAuth2AuthenticationDataAudiences:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/oauth2AuthenticationProperties/properties/audiences',
  OAuth2AuthenticationDataClient:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/oauth2AuthenticationProperties/properties/client',
  OAuth2AuthenticationDataScopes:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/oauth2AuthenticationProperties/properties/scopes',
  OAuth2AuthenticationPolicy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/3',
  OAuth2AuthenticationPolicyConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/3/properties/oauth2',
  OAuth2AuthenticationPropertiesEndpoints:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/3/properties/oauth2/oneOf/0/properties/endpoints',
  OAuth2ConnectAuthenticationProperties:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/3/properties/oauth2/oneOf/0',
  OAuth2Issuers:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/oauth2AuthenticationProperties/properties/issuers',
  OAuth2TokenDefinition: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/oauth2Token',
  OAuth2TokenRequest:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/oauth2AuthenticationProperties/properties/request',
  OneEventConsumptionStrategy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventConsumptionStrategy/oneOf/2',
  OpenAPIArguments:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/3/allOf/1/properties/with',
  OpenIdConnectAuthenticationPolicy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/4',
  OpenIdConnectAuthenticationPolicyConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/4/properties/oidc',
  OpenIdConnectAuthenticationProperties:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/authenticationPolicy/oneOf/4/properties/oidc/oneOf/0',
  Output: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/output',
  OutputAs: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/output/properties/as',
  RaiseTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/raiseTask',
  RaiseTaskConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/raiseTask/allOf/1/properties/raise',
  RaiseTaskError:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/raiseTask/allOf/1/properties/raise/properties/error',
  ReferenceableAuthenticationPolicy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/referenceableAuthenticationPolicy',
  RetryBackoff:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/retryPolicy/properties/backoff',
  RetryLimit: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/retryPolicy/properties/limit',
  RetryLimitAttempt:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/retryPolicy/properties/limit/properties/attempt',
  RetryPolicy: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/retryPolicy',
  RetryPolicyJitter:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/retryPolicy/properties/jitter',
  RunContainer:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/0',
  RunScript:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/1',
  RunShell:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/2',
  RunTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask',
  RunTaskConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run',
  RuntimeExpression: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runtimeExpression',
  RunWorkflow:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/3',
  Schedule: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/schedule',
  Schema: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/schema',
  SchemaExternal: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/schema/oneOf/1',
  SchemaInline: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/schema/oneOf/0',
  Script:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/1/properties/script',
  SecretBasedAuthenticationPolicy:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/secretBasedAuthenticationPolicy',
  SetTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/setTask',
  SetTaskConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/setTask/allOf/1/properties/set',
  Shell:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/2/properties/shell',
  ShellArguments:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/2/properties/shell/properties/arguments',
  ShellEnvironment:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/2/properties/shell/properties/environment',
  SubflowConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/3/properties/workflow',
  SubflowInput:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/runTask/allOf/1/properties/run/oneOf/3/properties/workflow/properties/input',
  SubscriptionIterator:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/subscriptionIterator',
  SwitchCase:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/switchTask/allOf/1/properties/switch/items/additionalProperties',
  SwitchItem:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/switchTask/allOf/1/properties/switch/items',
  SwitchTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/switchTask',
  SwitchTaskConfiguration:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/switchTask/allOf/1/properties/switch',
  Task: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/task',
  TaskBase: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/taskBase',
  TaskBaseIf: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/taskBase/properties/if',
  TaskItem: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/taskList/items',
  TaskList: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/taskList',
  TaskMetadata:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/taskBase/properties/metadata',
  TaskTimeout: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/taskBase/properties/timeout',
  Timeout: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/timeout',
  TryTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/tryTask',
  TryTaskCatch:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/tryTask/allOf/1/properties/catch',
  TryTaskCatchRetry:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/tryTask/allOf/1/properties/catch/properties/retry',
  UriTemplate: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/uriTemplate',
  Use: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/use',
  UseAuthentications:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/use/properties/authentications',
  UseCatalogs:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/use/properties/catalogs',
  UseErrors: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/use/properties/errors',
  UseExtensions:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/use/properties/extensions',
  UseFunctions:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/use/properties/functions',
  UseRetries: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/use/properties/retries',
  UseSecrets: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/use/properties/secrets',
  UseTimeouts:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/use/properties/timeouts',
  WaitTask: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/waitTask',
  WithA2AParameters:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/4/allOf/1/properties/with/properties/parameters',
  WithEvent: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/eventFilter/properties/with',
  WithGRPCArguments:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/1/allOf/1/properties/with/properties/arguments',
  WithGRPCService:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/1/allOf/1/properties/with/properties/service',
  WithOpenAPIParameters:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/$defs/callTask/oneOf/3/allOf/1/properties/with/properties/parameters',
  WorkflowMetadata:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/document/properties/metadata',
  WorkflowTags:
    'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/document/properties/tags',
  WorkflowTimeout: 'https://open-workflow-specification.org/schemas/1.0.3/workflow.json#/properties/timeout',
};
