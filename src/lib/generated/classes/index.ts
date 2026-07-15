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

import { _A2AArguments } from './a2a-arguments';
import { _AllEventConsumptionStrategy } from './all-event-consumption-strategy';
import { _AllEventConsumptionStrategyConfiguration } from './all-event-consumption-strategy-configuration';
import { _AnyEventConsumptionStrategy } from './any-event-consumption-strategy';
import { _AnyEventConsumptionStrategyConfiguration } from './any-event-consumption-strategy-configuration';
import { _AnyEventConsumptionStrategyUntil } from './any-event-consumption-strategy-until';
import { _AnyEventUntilConsumed } from './any-event-until-consumed';
import { _AsyncApiArguments } from './async-api-arguments';
import { _AuthenticationPolicy } from './authentication-policy';
import { _AuthenticationPolicyReference } from './authentication-policy-reference';
import { _BasicAuthenticationPolicy } from './basic-authentication-policy';
import { _BasicAuthenticationPolicyConfiguration } from './basic-authentication-policy-configuration';
import { _BasicAuthenticationProperties } from './basic-authentication-properties';
import { _BearerAuthenticationPolicy } from './bearer-authentication-policy';
import { _BearerAuthenticationPolicyConfiguration } from './bearer-authentication-policy-configuration';
import { _BearerAuthenticationProperties } from './bearer-authentication-properties';
import { _CallA2A } from './call-a2a';
import { _CallAsyncAPI } from './call-async-api';
import { _CallFunction } from './call-function';
import { _CallGRPC } from './call-grpc';
import { _CallHTTP } from './call-http';
import { _CallMCP } from './call-mcp';
import { _CallOpenAPI } from './call-open-api';
import { _CallTask } from './call-task';
import { _Catalog } from './catalog';
import { _CatchErrors } from './catch-errors';
import { _ConstantBackoff } from './constant-backoff';
import { _Container } from './container';
import { _ContainerArguments } from './container-arguments';
import { _ContainerEnvironment } from './container-environment';
import { _ContainerLifetime } from './container-lifetime';
import { _ContainerPorts } from './container-ports';
import { _ContainerVolumes } from './container-volumes';
import { _DigestAuthenticationPolicy } from './digest-authentication-policy';
import { _DigestAuthenticationPolicyConfiguration } from './digest-authentication-policy-configuration';
import { _DigestAuthenticationProperties } from './digest-authentication-properties';
import { _Document } from './document';
import { _DoTask } from './do-task';
import { _Duration } from './duration';
import { _DurationInline } from './duration-inline';
import { _EmitEventDefinition } from './emit-event-definition';
import { _EmitEventWith } from './emit-event-with';
import { _EmitTask } from './emit-task';
import { _EmitTaskConfiguration } from './emit-task-configuration';
import { _Endpoint } from './endpoint';
import { _EndpointConfiguration } from './endpoint-configuration';
import { _EndpointUri } from './endpoint-uri';
import { _Error } from './error';
import { _ErrorDetails } from './error-details';
import { _ErrorFilter } from './error-filter';
import { _ErrorInstance } from './error-instance';
import { _ErrorTitle } from './error-title';
import { _ErrorType } from './error-type';
import { _EventConsumptionStrategy } from './event-consumption-strategy';
import { _EventData } from './event-data';
import { _EventDataschema } from './event-dataschema';
import { _EventFilter } from './event-filter';
import { _EventFilterCorrelate } from './event-filter-correlate';
import { _EventSource } from './event-source';
import { _EventTime } from './event-time';
import { _ExponentialBackOff } from './exponential-back-off';
import { _Export } from './export';
import { _ExportAs } from './export-as';
import { _Extension } from './extension';
import { _ExtensionItem } from './extension-item';
import { _ExternalResource } from './external-resource';
import { _ExternalScript } from './external-script';
import { _FlowDirective } from './flow-directive';
import { _ForkTask } from './fork-task';
import { _ForkTaskConfiguration } from './fork-task-configuration';
import { _ForTask } from './for-task';
import { _ForTaskConfiguration } from './for-task-configuration';
import { _FunctionArguments } from './function-arguments';
import { _GRPCArguments } from './grpc-arguments';
import { _HTTPArguments } from './http-arguments';
import { _HTTPBody } from './http-body';
import { _HTTPHeaders } from './http-headers';
import { _HTTPQuery } from './http-query';
import { _InlineScript } from './inline-script';
import { _Input } from './input';
import { _InputFrom } from './input-from';
import { _LinearBackoff } from './linear-backoff';
import { _ListenTask } from './listen-task';
import { _ListenTaskConfiguration } from './listen-task-configuration';
import { _MCPArguments } from './mcp-arguments';
import { _McpCallTransport } from './mcp-call-transport';
import { _McpClient } from './mcp-client';
import { _McpMethodParameters } from './mcp-method-parameters';
import { _OAuth2AuthenticationData } from './oauth2-authentication-data';
import { _OAuth2AuthenticationDataAudiences } from './oauth2-authentication-data-audiences';
import { _OAuth2AuthenticationDataClient } from './oauth2-authentication-data-client';
import { _OAuth2AuthenticationDataScopes } from './oauth2-authentication-data-scopes';
import { _OAuth2AuthenticationPolicy } from './oauth2-authentication-policy';
import { _OAuth2AuthenticationPolicyConfiguration } from './oauth2-authentication-policy-configuration';
import { _OAuth2AuthenticationPropertiesEndpoints } from './oauth2-authentication-properties-endpoints';
import { _OAuth2ConnectAuthenticationProperties } from './oauth2-connect-authentication-properties';
import { _OAuth2Issuers } from './oauth2-issuers';
import { _OAuth2TokenDefinition } from './oauth2-token-definition';
import { _OAuth2TokenRequest } from './oauth2-token-request';
import { _OneEventConsumptionStrategy } from './one-event-consumption-strategy';
import { _OpenAPIArguments } from './open-api-arguments';
import { _OpenIdConnectAuthenticationPolicy } from './open-id-connect-authentication-policy';
import { _OpenIdConnectAuthenticationPolicyConfiguration } from './open-id-connect-authentication-policy-configuration';
import { _OpenIdConnectAuthenticationProperties } from './open-id-connect-authentication-properties';
import { _Output } from './output';
import { _OutputAs } from './output-as';
import { _RaiseTask } from './raise-task';
import { _RaiseTaskConfiguration } from './raise-task-configuration';
import { _RaiseTaskError } from './raise-task-error';
import { _ReferenceableAuthenticationPolicy } from './referenceable-authentication-policy';
import { _RetryBackoff } from './retry-backoff';
import { _RetryLimit } from './retry-limit';
import { _RetryLimitAttempt } from './retry-limit-attempt';
import { _RetryPolicy } from './retry-policy';
import { _RetryPolicyJitter } from './retry-policy-jitter';
import { _RunContainer } from './run-container';
import { _RunScript } from './run-script';
import { _RunShell } from './run-shell';
import { _RunTask } from './run-task';
import { _RunTaskConfiguration } from './run-task-configuration';
import { _RuntimeExpression } from './runtime-expression';
import { _RunWorkflow } from './run-workflow';
import { _Schedule } from './schedule';
import { _Schema } from './schema';
import { _SchemaExternal } from './schema-external';
import { _SchemaInline } from './schema-inline';
import { _Script } from './script';
import { _SecretBasedAuthenticationPolicy } from './secret-based-authentication-policy';
import { _SetTask } from './set-task';
import { _SetTaskConfiguration } from './set-task-configuration';
import { _Shell } from './shell';
import { _ShellArguments } from './shell-arguments';
import { _ShellEnvironment } from './shell-environment';
import { _SubflowConfiguration } from './subflow-configuration';
import { _SubflowInput } from './subflow-input';
import { _SubscriptionIterator } from './subscription-iterator';
import { _SwitchCase } from './switch-case';
import { _SwitchItem } from './switch-item';
import { _SwitchTask } from './switch-task';
import { _SwitchTaskConfiguration } from './switch-task-configuration';
import { _Task } from './task';
import { _TaskBase } from './task-base';
import { _TaskBaseIf } from './task-base-if';
import { _TaskItem } from './task-item';
import { _TaskList } from './task-list';
import { _TaskMetadata } from './task-metadata';
import { _TaskTimeout } from './task-timeout';
import { _Timeout } from './timeout';
import { _TryTask } from './try-task';
import { _TryTaskCatch } from './try-task-catch';
import { _TryTaskCatchRetry } from './try-task-catch-retry';
import { _UriTemplate } from './uri-template';
import { _Use } from './use';
import { _UseAuthentications } from './use-authentications';
import { _UseCatalogs } from './use-catalogs';
import { _UseErrors } from './use-errors';
import { _UseExtensions } from './use-extensions';
import { _UseFunctions } from './use-functions';
import { _UseRetries } from './use-retries';
import { _UseSecrets } from './use-secrets';
import { _UseTimeouts } from './use-timeouts';
import { _WaitTask } from './wait-task';
import { _WithA2AParameters } from './with-a2a-parameters';
import { _WithEvent } from './with-event';
import { _WithGRPCArguments } from './with-grpc-arguments';
import { _WithGRPCService } from './with-grpc-service';
import { _WithOpenAPIParameters } from './with-open-api-parameters';
import { _Workflow } from './workflow';
import { _WorkflowMetadata } from './workflow-metadata';
import { _WorkflowTags } from './workflow-tags';
import { _WorkflowTimeout } from './workflow-timeout';

export const Classes = {
  A2AArguments: _A2AArguments,
  AllEventConsumptionStrategy: _AllEventConsumptionStrategy,
  AllEventConsumptionStrategyConfiguration: _AllEventConsumptionStrategyConfiguration,
  AnyEventConsumptionStrategy: _AnyEventConsumptionStrategy,
  AnyEventConsumptionStrategyConfiguration: _AnyEventConsumptionStrategyConfiguration,
  AnyEventConsumptionStrategyUntil: _AnyEventConsumptionStrategyUntil,
  AnyEventUntilConsumed: _AnyEventUntilConsumed,
  AsyncApiArguments: _AsyncApiArguments,
  AuthenticationPolicy: _AuthenticationPolicy,
  AuthenticationPolicyReference: _AuthenticationPolicyReference,
  BasicAuthenticationPolicy: _BasicAuthenticationPolicy,
  BasicAuthenticationPolicyConfiguration: _BasicAuthenticationPolicyConfiguration,
  BasicAuthenticationProperties: _BasicAuthenticationProperties,
  BearerAuthenticationPolicy: _BearerAuthenticationPolicy,
  BearerAuthenticationPolicyConfiguration: _BearerAuthenticationPolicyConfiguration,
  BearerAuthenticationProperties: _BearerAuthenticationProperties,
  CallA2A: _CallA2A,
  CallAsyncAPI: _CallAsyncAPI,
  CallFunction: _CallFunction,
  CallGRPC: _CallGRPC,
  CallHTTP: _CallHTTP,
  CallMCP: _CallMCP,
  CallOpenAPI: _CallOpenAPI,
  CallTask: _CallTask,
  Catalog: _Catalog,
  CatchErrors: _CatchErrors,
  ConstantBackoff: _ConstantBackoff,
  Container: _Container,
  ContainerArguments: _ContainerArguments,
  ContainerEnvironment: _ContainerEnvironment,
  ContainerLifetime: _ContainerLifetime,
  ContainerPorts: _ContainerPorts,
  ContainerVolumes: _ContainerVolumes,
  DigestAuthenticationPolicy: _DigestAuthenticationPolicy,
  DigestAuthenticationPolicyConfiguration: _DigestAuthenticationPolicyConfiguration,
  DigestAuthenticationProperties: _DigestAuthenticationProperties,
  Document: _Document,
  DoTask: _DoTask,
  Duration: _Duration,
  DurationInline: _DurationInline,
  EmitEventDefinition: _EmitEventDefinition,
  EmitEventWith: _EmitEventWith,
  EmitTask: _EmitTask,
  EmitTaskConfiguration: _EmitTaskConfiguration,
  Endpoint: _Endpoint,
  EndpointConfiguration: _EndpointConfiguration,
  EndpointUri: _EndpointUri,
  Error: _Error,
  ErrorDetails: _ErrorDetails,
  ErrorFilter: _ErrorFilter,
  ErrorInstance: _ErrorInstance,
  ErrorTitle: _ErrorTitle,
  ErrorType: _ErrorType,
  EventConsumptionStrategy: _EventConsumptionStrategy,
  EventData: _EventData,
  EventDataschema: _EventDataschema,
  EventFilter: _EventFilter,
  EventFilterCorrelate: _EventFilterCorrelate,
  EventSource: _EventSource,
  EventTime: _EventTime,
  ExponentialBackOff: _ExponentialBackOff,
  Export: _Export,
  ExportAs: _ExportAs,
  Extension: _Extension,
  ExtensionItem: _ExtensionItem,
  ExternalResource: _ExternalResource,
  ExternalScript: _ExternalScript,
  FlowDirective: _FlowDirective,
  ForkTask: _ForkTask,
  ForkTaskConfiguration: _ForkTaskConfiguration,
  ForTask: _ForTask,
  ForTaskConfiguration: _ForTaskConfiguration,
  FunctionArguments: _FunctionArguments,
  GRPCArguments: _GRPCArguments,
  HTTPArguments: _HTTPArguments,
  HTTPBody: _HTTPBody,
  HTTPHeaders: _HTTPHeaders,
  HTTPQuery: _HTTPQuery,
  InlineScript: _InlineScript,
  Input: _Input,
  InputFrom: _InputFrom,
  LinearBackoff: _LinearBackoff,
  ListenTask: _ListenTask,
  ListenTaskConfiguration: _ListenTaskConfiguration,
  MCPArguments: _MCPArguments,
  McpCallTransport: _McpCallTransport,
  McpClient: _McpClient,
  McpMethodParameters: _McpMethodParameters,
  OAuth2AuthenticationData: _OAuth2AuthenticationData,
  OAuth2AuthenticationDataAudiences: _OAuth2AuthenticationDataAudiences,
  OAuth2AuthenticationDataClient: _OAuth2AuthenticationDataClient,
  OAuth2AuthenticationDataScopes: _OAuth2AuthenticationDataScopes,
  OAuth2AuthenticationPolicy: _OAuth2AuthenticationPolicy,
  OAuth2AuthenticationPolicyConfiguration: _OAuth2AuthenticationPolicyConfiguration,
  OAuth2AuthenticationPropertiesEndpoints: _OAuth2AuthenticationPropertiesEndpoints,
  OAuth2ConnectAuthenticationProperties: _OAuth2ConnectAuthenticationProperties,
  OAuth2Issuers: _OAuth2Issuers,
  OAuth2TokenDefinition: _OAuth2TokenDefinition,
  OAuth2TokenRequest: _OAuth2TokenRequest,
  OneEventConsumptionStrategy: _OneEventConsumptionStrategy,
  OpenAPIArguments: _OpenAPIArguments,
  OpenIdConnectAuthenticationPolicy: _OpenIdConnectAuthenticationPolicy,
  OpenIdConnectAuthenticationPolicyConfiguration: _OpenIdConnectAuthenticationPolicyConfiguration,
  OpenIdConnectAuthenticationProperties: _OpenIdConnectAuthenticationProperties,
  Output: _Output,
  OutputAs: _OutputAs,
  RaiseTask: _RaiseTask,
  RaiseTaskConfiguration: _RaiseTaskConfiguration,
  RaiseTaskError: _RaiseTaskError,
  ReferenceableAuthenticationPolicy: _ReferenceableAuthenticationPolicy,
  RetryBackoff: _RetryBackoff,
  RetryLimit: _RetryLimit,
  RetryLimitAttempt: _RetryLimitAttempt,
  RetryPolicy: _RetryPolicy,
  RetryPolicyJitter: _RetryPolicyJitter,
  RunContainer: _RunContainer,
  RunScript: _RunScript,
  RunShell: _RunShell,
  RunTask: _RunTask,
  RunTaskConfiguration: _RunTaskConfiguration,
  RuntimeExpression: _RuntimeExpression,
  RunWorkflow: _RunWorkflow,
  Schedule: _Schedule,
  Schema: _Schema,
  SchemaExternal: _SchemaExternal,
  SchemaInline: _SchemaInline,
  Script: _Script,
  SecretBasedAuthenticationPolicy: _SecretBasedAuthenticationPolicy,
  SetTask: _SetTask,
  SetTaskConfiguration: _SetTaskConfiguration,
  Shell: _Shell,
  ShellArguments: _ShellArguments,
  ShellEnvironment: _ShellEnvironment,
  SubflowConfiguration: _SubflowConfiguration,
  SubflowInput: _SubflowInput,
  SubscriptionIterator: _SubscriptionIterator,
  SwitchCase: _SwitchCase,
  SwitchItem: _SwitchItem,
  SwitchTask: _SwitchTask,
  SwitchTaskConfiguration: _SwitchTaskConfiguration,
  Task: _Task,
  TaskBase: _TaskBase,
  TaskBaseIf: _TaskBaseIf,
  TaskItem: _TaskItem,
  TaskList: _TaskList,
  TaskMetadata: _TaskMetadata,
  TaskTimeout: _TaskTimeout,
  Timeout: _Timeout,
  TryTask: _TryTask,
  TryTaskCatch: _TryTaskCatch,
  TryTaskCatchRetry: _TryTaskCatchRetry,
  UriTemplate: _UriTemplate,
  Use: _Use,
  UseAuthentications: _UseAuthentications,
  UseCatalogs: _UseCatalogs,
  UseErrors: _UseErrors,
  UseExtensions: _UseExtensions,
  UseFunctions: _UseFunctions,
  UseRetries: _UseRetries,
  UseSecrets: _UseSecrets,
  UseTimeouts: _UseTimeouts,
  WaitTask: _WaitTask,
  WithA2AParameters: _WithA2AParameters,
  WithEvent: _WithEvent,
  WithGRPCArguments: _WithGRPCArguments,
  WithGRPCService: _WithGRPCService,
  WithOpenAPIParameters: _WithOpenAPIParameters,
  Workflow: _Workflow,
  WorkflowMetadata: _WorkflowMetadata,
  WorkflowTags: _WorkflowTags,
  WorkflowTimeout: _WorkflowTimeout,
};
