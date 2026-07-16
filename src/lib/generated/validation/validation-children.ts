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
 * Describes a hydratable child reference of a type, used to drive recursive validation.
 */
export type ChildType =
  | { kind: 'object'; property: string; type: string }
  | { kind: 'record'; property: string; type: string }
  | { kind: 'indexed'; type: string; knownProperties: string[] }
  | { kind: 'array'; type: string }
  | { kind: 'array-record'; type: string };

/**
 * A map of type names and the typed children they hydrate, used to recurse validation hooks
 * into nested objects. Mirrors the constructor hydration of each generated class.
 */
export const childTypes: Record<string, ChildType[]> = {
  A2AArguments: [
    { kind: 'object', property: 'agentCard', type: 'ExternalResource' },
    { kind: 'object', property: 'server', type: 'Endpoint' },
  ],
  AllEventConsumptionStrategy: [{ kind: 'object', property: 'all', type: 'AllEventConsumptionStrategyConfiguration' }],
  AllEventConsumptionStrategyConfiguration: [{ kind: 'array', type: 'EventFilter' }],
  AnyEventConsumptionStrategy: [
    { kind: 'object', property: 'any', type: 'AnyEventConsumptionStrategyConfiguration' },
    { kind: 'object', property: 'until', type: 'AnyEventConsumptionStrategyUntil' },
  ],
  AnyEventConsumptionStrategyConfiguration: [{ kind: 'array', type: 'EventFilter' }],
  AnyEventConsumptionStrategyUntil: [
    { kind: 'object', property: 'all', type: 'AllEventConsumptionStrategyConfiguration' },
    { kind: 'object', property: 'any', type: 'AnyEventConsumptionStrategyConfiguration' },
    { kind: 'object', property: 'one', type: 'EventFilter' },
  ],
  AnyEventUntilConsumed: [
    { kind: 'object', property: 'all', type: 'AllEventConsumptionStrategyConfiguration' },
    { kind: 'object', property: 'any', type: 'AnyEventConsumptionStrategyConfiguration' },
    { kind: 'object', property: 'one', type: 'EventFilter' },
  ],
  AuthenticationPolicy: [
    { kind: 'object', property: 'basic', type: 'BasicAuthenticationPolicyConfiguration' },
    { kind: 'object', property: 'bearer', type: 'BearerAuthenticationPolicyConfiguration' },
    { kind: 'object', property: 'digest', type: 'DigestAuthenticationPolicyConfiguration' },
    { kind: 'object', property: 'oauth2', type: 'OAuth2AuthenticationPolicyConfiguration' },
    { kind: 'object', property: 'oidc', type: 'OpenIdConnectAuthenticationPolicyConfiguration' },
  ],
  BasicAuthenticationPolicy: [{ kind: 'object', property: 'basic', type: 'BasicAuthenticationPolicyConfiguration' }],
  BearerAuthenticationPolicy: [{ kind: 'object', property: 'bearer', type: 'BearerAuthenticationPolicyConfiguration' }],
  CallA2A: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'with', type: 'A2AArguments' },
  ],
  CallAsyncAPI: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
  ],
  CallFunction: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'with', type: 'FunctionArguments' },
  ],
  CallGRPC: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'with', type: 'GRPCArguments' },
  ],
  CallHTTP: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'with', type: 'HTTPArguments' },
  ],
  CallMCP: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'with', type: 'MCPArguments' },
  ],
  CallOpenAPI: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'with', type: 'OpenAPIArguments' },
  ],
  CallTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
  ],
  Catalog: [{ kind: 'object', property: 'endpoint', type: 'Endpoint' }],
  CatchErrors: [{ kind: 'object', property: 'with', type: 'ErrorFilter' }],
  Container: [
    { kind: 'object', property: 'ports', type: 'ContainerPorts' },
    { kind: 'object', property: 'volumes', type: 'ContainerVolumes' },
    { kind: 'object', property: 'environment', type: 'ContainerEnvironment' },
    { kind: 'object', property: 'lifetime', type: 'ContainerLifetime' },
  ],
  ContainerLifetime: [{ kind: 'object', property: 'after', type: 'Duration' }],
  DigestAuthenticationPolicy: [{ kind: 'object', property: 'digest', type: 'DigestAuthenticationPolicyConfiguration' }],
  Document: [
    { kind: 'object', property: 'tags', type: 'WorkflowTags' },
    { kind: 'object', property: 'metadata', type: 'WorkflowMetadata' },
  ],
  DoTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'do', type: 'TaskList' },
  ],
  EmitEventDefinition: [{ kind: 'object', property: 'with', type: 'EmitEventWith' }],
  EmitTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'emit', type: 'EmitTaskConfiguration' },
  ],
  EmitTaskConfiguration: [{ kind: 'object', property: 'event', type: 'EmitEventDefinition' }],
  Endpoint: [{ kind: 'object', property: 'authentication', type: 'ReferenceableAuthenticationPolicy' }],
  EndpointConfiguration: [{ kind: 'object', property: 'authentication', type: 'ReferenceableAuthenticationPolicy' }],
  EventConsumptionStrategy: [
    { kind: 'object', property: 'all', type: 'AllEventConsumptionStrategyConfiguration' },
    { kind: 'object', property: 'any', type: 'AnyEventConsumptionStrategyConfiguration' },
    { kind: 'object', property: 'until', type: 'AnyEventConsumptionStrategyUntil' },
    { kind: 'object', property: 'one', type: 'EventFilter' },
  ],
  EventFilter: [
    { kind: 'object', property: 'with', type: 'WithEvent' },
    { kind: 'object', property: 'correlate', type: 'EventFilterCorrelate' },
  ],
  Export: [{ kind: 'object', property: 'schema', type: 'Schema' }],
  Extension: [
    { kind: 'object', property: 'before', type: 'TaskList' },
    { kind: 'object', property: 'after', type: 'TaskList' },
  ],
  ExtensionItem: [{ kind: 'indexed', type: 'Extension', knownProperties: [] }],
  ExternalResource: [{ kind: 'object', property: 'endpoint', type: 'Endpoint' }],
  ExternalScript: [{ kind: 'object', property: 'source', type: 'ExternalResource' }],
  ForkTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'fork', type: 'ForkTaskConfiguration' },
  ],
  ForkTaskConfiguration: [{ kind: 'object', property: 'branches', type: 'TaskList' }],
  ForTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'for', type: 'ForTaskConfiguration' },
    { kind: 'object', property: 'do', type: 'TaskList' },
  ],
  GRPCArguments: [
    { kind: 'object', property: 'proto', type: 'ExternalResource' },
    { kind: 'object', property: 'service', type: 'WithGRPCService' },
    { kind: 'object', property: 'arguments', type: 'WithGRPCArguments' },
  ],
  HTTPArguments: [
    { kind: 'object', property: 'endpoint', type: 'Endpoint' },
    { kind: 'object', property: 'body', type: 'HTTPBody' },
  ],
  Input: [{ kind: 'object', property: 'schema', type: 'Schema' }],
  ListenTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'listen', type: 'ListenTaskConfiguration' },
    { kind: 'object', property: 'foreach', type: 'SubscriptionIterator' },
  ],
  ListenTaskConfiguration: [{ kind: 'object', property: 'to', type: 'EventConsumptionStrategy' }],
  MCPArguments: [
    { kind: 'object', property: 'timeout', type: 'Duration' },
    { kind: 'object', property: 'client', type: 'McpClient' },
  ],
  OAuth2AuthenticationData: [
    { kind: 'object', property: 'client', type: 'OAuth2AuthenticationDataClient' },
    { kind: 'object', property: 'request', type: 'OAuth2TokenRequest' },
    { kind: 'object', property: 'subject', type: 'OAuth2TokenDefinition' },
    { kind: 'object', property: 'actor', type: 'OAuth2TokenDefinition' },
  ],
  OAuth2AuthenticationPolicy: [{ kind: 'object', property: 'oauth2', type: 'OAuth2AuthenticationPolicyConfiguration' }],
  OAuth2AuthenticationPolicyConfiguration: [
    { kind: 'object', property: 'client', type: 'OAuth2AuthenticationDataClient' },
    { kind: 'object', property: 'request', type: 'OAuth2TokenRequest' },
    { kind: 'object', property: 'subject', type: 'OAuth2TokenDefinition' },
    { kind: 'object', property: 'actor', type: 'OAuth2TokenDefinition' },
    { kind: 'object', property: 'endpoints', type: 'OAuth2AuthenticationPropertiesEndpoints' },
  ],
  OAuth2ConnectAuthenticationProperties: [
    { kind: 'object', property: 'client', type: 'OAuth2AuthenticationDataClient' },
    { kind: 'object', property: 'request', type: 'OAuth2TokenRequest' },
    { kind: 'object', property: 'subject', type: 'OAuth2TokenDefinition' },
    { kind: 'object', property: 'actor', type: 'OAuth2TokenDefinition' },
    { kind: 'object', property: 'endpoints', type: 'OAuth2AuthenticationPropertiesEndpoints' },
  ],
  OneEventConsumptionStrategy: [{ kind: 'object', property: 'one', type: 'EventFilter' }],
  OpenAPIArguments: [
    { kind: 'object', property: 'document', type: 'ExternalResource' },
    { kind: 'object', property: 'parameters', type: 'WithOpenAPIParameters' },
    { kind: 'object', property: 'authentication', type: 'ReferenceableAuthenticationPolicy' },
  ],
  OpenIdConnectAuthenticationPolicy: [
    { kind: 'object', property: 'oidc', type: 'OpenIdConnectAuthenticationPolicyConfiguration' },
  ],
  OpenIdConnectAuthenticationPolicyConfiguration: [
    { kind: 'object', property: 'client', type: 'OAuth2AuthenticationDataClient' },
    { kind: 'object', property: 'request', type: 'OAuth2TokenRequest' },
    { kind: 'object', property: 'subject', type: 'OAuth2TokenDefinition' },
    { kind: 'object', property: 'actor', type: 'OAuth2TokenDefinition' },
  ],
  OpenIdConnectAuthenticationProperties: [
    { kind: 'object', property: 'client', type: 'OAuth2AuthenticationDataClient' },
    { kind: 'object', property: 'request', type: 'OAuth2TokenRequest' },
    { kind: 'object', property: 'subject', type: 'OAuth2TokenDefinition' },
    { kind: 'object', property: 'actor', type: 'OAuth2TokenDefinition' },
  ],
  Output: [{ kind: 'object', property: 'schema', type: 'Schema' }],
  RaiseTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'raise', type: 'RaiseTaskConfiguration' },
  ],
  RaiseTaskConfiguration: [{ kind: 'object', property: 'error', type: 'RaiseTaskError' }],
  ReferenceableAuthenticationPolicy: [
    { kind: 'object', property: 'basic', type: 'BasicAuthenticationPolicyConfiguration' },
    { kind: 'object', property: 'bearer', type: 'BearerAuthenticationPolicyConfiguration' },
    { kind: 'object', property: 'digest', type: 'DigestAuthenticationPolicyConfiguration' },
    { kind: 'object', property: 'oauth2', type: 'OAuth2AuthenticationPolicyConfiguration' },
    { kind: 'object', property: 'oidc', type: 'OpenIdConnectAuthenticationPolicyConfiguration' },
  ],
  RetryLimit: [
    { kind: 'object', property: 'attempt', type: 'RetryLimitAttempt' },
    { kind: 'object', property: 'duration', type: 'Duration' },
  ],
  RetryLimitAttempt: [{ kind: 'object', property: 'duration', type: 'Duration' }],
  RetryPolicy: [
    { kind: 'object', property: 'delay', type: 'Duration' },
    { kind: 'object', property: 'backoff', type: 'RetryBackoff' },
    { kind: 'object', property: 'limit', type: 'RetryLimit' },
    { kind: 'object', property: 'jitter', type: 'RetryPolicyJitter' },
  ],
  RetryPolicyJitter: [
    { kind: 'object', property: 'from', type: 'Duration' },
    { kind: 'object', property: 'to', type: 'Duration' },
  ],
  RunContainer: [{ kind: 'object', property: 'container', type: 'Container' }],
  RunScript: [{ kind: 'object', property: 'script', type: 'Script' }],
  RunShell: [{ kind: 'object', property: 'shell', type: 'Shell' }],
  RunTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'run', type: 'RunTaskConfiguration' },
  ],
  RunTaskConfiguration: [
    { kind: 'object', property: 'container', type: 'Container' },
    { kind: 'object', property: 'script', type: 'Script' },
    { kind: 'object', property: 'shell', type: 'Shell' },
    { kind: 'object', property: 'workflow', type: 'SubflowConfiguration' },
  ],
  RunWorkflow: [{ kind: 'object', property: 'workflow', type: 'SubflowConfiguration' }],
  Schedule: [
    { kind: 'object', property: 'every', type: 'Duration' },
    { kind: 'object', property: 'after', type: 'Duration' },
    { kind: 'object', property: 'on', type: 'EventConsumptionStrategy' },
  ],
  Schema: [{ kind: 'object', property: 'resource', type: 'ExternalResource' }],
  SchemaExternal: [{ kind: 'object', property: 'resource', type: 'ExternalResource' }],
  Script: [{ kind: 'object', property: 'source', type: 'ExternalResource' }],
  SetTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
  ],
  Shell: [{ kind: 'object', property: 'environment', type: 'ShellEnvironment' }],
  SubflowConfiguration: [{ kind: 'object', property: 'input', type: 'SubflowInput' }],
  SubscriptionIterator: [
    { kind: 'object', property: 'do', type: 'TaskList' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
  ],
  SwitchItem: [{ kind: 'indexed', type: 'SwitchCase', knownProperties: [] }],
  SwitchTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'switch', type: 'SwitchTaskConfiguration' },
  ],
  SwitchTaskConfiguration: [{ kind: 'array', type: 'SwitchItem' }],
  Task: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'do', type: 'TaskList' },
    { kind: 'object', property: 'emit', type: 'EmitTaskConfiguration' },
    { kind: 'object', property: 'fork', type: 'ForkTaskConfiguration' },
    { kind: 'object', property: 'for', type: 'ForTaskConfiguration' },
    { kind: 'object', property: 'listen', type: 'ListenTaskConfiguration' },
    { kind: 'object', property: 'foreach', type: 'SubscriptionIterator' },
    { kind: 'object', property: 'raise', type: 'RaiseTaskConfiguration' },
    { kind: 'object', property: 'run', type: 'RunTaskConfiguration' },
    { kind: 'object', property: 'switch', type: 'SwitchTaskConfiguration' },
    { kind: 'object', property: 'try', type: 'TaskList' },
    { kind: 'object', property: 'catch', type: 'TryTaskCatch' },
    { kind: 'object', property: 'wait', type: 'Duration' },
  ],
  TaskBase: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
  ],
  TaskItem: [{ kind: 'indexed', type: 'Task', knownProperties: [] }],
  TaskList: [{ kind: 'array', type: 'TaskItem' }],
  TaskTimeout: [{ kind: 'object', property: 'after', type: 'Duration' }],
  Timeout: [{ kind: 'object', property: 'after', type: 'Duration' }],
  TryTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'try', type: 'TaskList' },
    { kind: 'object', property: 'catch', type: 'TryTaskCatch' },
  ],
  TryTaskCatch: [
    { kind: 'object', property: 'errors', type: 'CatchErrors' },
    { kind: 'object', property: 'retry', type: 'TryTaskCatchRetry' },
    { kind: 'object', property: 'do', type: 'TaskList' },
  ],
  TryTaskCatchRetry: [
    { kind: 'object', property: 'delay', type: 'Duration' },
    { kind: 'object', property: 'backoff', type: 'RetryBackoff' },
    { kind: 'object', property: 'limit', type: 'RetryLimit' },
    { kind: 'object', property: 'jitter', type: 'RetryPolicyJitter' },
  ],
  Use: [
    { kind: 'object', property: 'authentications', type: 'UseAuthentications' },
    { kind: 'object', property: 'errors', type: 'UseErrors' },
    { kind: 'object', property: 'extensions', type: 'UseExtensions' },
    { kind: 'object', property: 'functions', type: 'UseFunctions' },
    { kind: 'object', property: 'retries', type: 'UseRetries' },
    { kind: 'object', property: 'timeouts', type: 'UseTimeouts' },
    { kind: 'object', property: 'catalogs', type: 'UseCatalogs' },
  ],
  UseAuthentications: [{ kind: 'indexed', type: 'AuthenticationPolicy', knownProperties: [] }],
  UseCatalogs: [{ kind: 'indexed', type: 'Catalog', knownProperties: [] }],
  UseErrors: [{ kind: 'indexed', type: 'Error', knownProperties: [] }],
  UseExtensions: [{ kind: 'array', type: 'ExtensionItem' }],
  UseFunctions: [{ kind: 'indexed', type: 'Task', knownProperties: [] }],
  UseRetries: [{ kind: 'indexed', type: 'RetryPolicy', knownProperties: [] }],
  UseTimeouts: [{ kind: 'indexed', type: 'Timeout', knownProperties: [] }],
  WaitTask: [
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'export', type: 'Export' },
    { kind: 'object', property: 'timeout', type: 'TaskTimeout' },
    { kind: 'object', property: 'metadata', type: 'TaskMetadata' },
    { kind: 'object', property: 'wait', type: 'Duration' },
  ],
  WithGRPCService: [{ kind: 'object', property: 'authentication', type: 'ReferenceableAuthenticationPolicy' }],
  Workflow: [
    { kind: 'object', property: 'document', type: 'Document' },
    { kind: 'object', property: 'input', type: 'Input' },
    { kind: 'object', property: 'use', type: 'Use' },
    { kind: 'object', property: 'do', type: 'TaskList' },
    { kind: 'object', property: 'timeout', type: 'WorkflowTimeout' },
    { kind: 'object', property: 'output', type: 'Output' },
    { kind: 'object', property: 'schedule', type: 'Schedule' },
  ],
  WorkflowTimeout: [{ kind: 'object', property: 'after', type: 'Duration' }],
};
