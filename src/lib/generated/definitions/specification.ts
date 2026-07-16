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
 * Represents the definition of a schema.
 */
export type Schema = SchemaInline | SchemaExternal;
/**
 * Represents an endpoint.
 */
export type Endpoint = RuntimeExpression | UriTemplate | EndpointConfiguration;
/**
 * A runtime expression.
 */
export type RuntimeExpression = string;
export type UriTemplate = string;
/**
 * The endpoint's URI.
 */
export type EndpointUri = UriTemplate | RuntimeExpression;
/**
 * Represents a referenceable authentication policy.
 */
export type ReferenceableAuthenticationPolicy = AuthenticationPolicyReference | AuthenticationPolicy;
/**
 * Defines an authentication policy.
 */
export type AuthenticationPolicy =
  | BasicAuthenticationPolicy
  | BearerAuthenticationPolicy
  | DigestAuthenticationPolicy
  | OAuth2AuthenticationPolicy
  | OpenIdConnectAuthenticationPolicy;
/**
 * The configuration of the basic authentication policy.
 */
export type BasicAuthenticationPolicyConfiguration = BasicAuthenticationProperties | SecretBasedAuthenticationPolicy;
/**
 * The configuration of the bearer authentication policy.
 */
export type BearerAuthenticationPolicyConfiguration = BearerAuthenticationProperties | SecretBasedAuthenticationPolicy;
/**
 * The configuration of the digest authentication policy.
 */
export type DigestAuthenticationPolicyConfiguration = DigestAuthenticationProperties | SecretBasedAuthenticationPolicy;
/**
 * The configuration of the OAuth2 authentication policy.
 */
export type OAuth2AuthenticationPolicyConfiguration =
  | OAuth2ConnectAuthenticationProperties
  | SecretBasedAuthenticationPolicy;
/**
 * The inline configuration of the OAuth2 authentication policy.
 */
export type OAuth2ConnectAuthenticationProperties = OAuth2AuthenticationData & {
  endpoints?: OAuth2AuthenticationPropertiesEndpoints;
  [k: string]: unknown;
};
/**
 * A list that contains that contains valid issuers that will be used to check against the issuer of generated tokens.
 */
export type OAuth2Issuers = string[];
/**
 * The scopes, if any, to request the token for.
 */
export type OAuth2AuthenticationDataScopes = string[];
/**
 * The audiences, if any, to request the token for.
 */
export type OAuth2AuthenticationDataAudiences = string[];
/**
 * The configuration of the OpenIdConnect authentication policy.
 */
export type OpenIdConnectAuthenticationPolicyConfiguration =
  | OpenIdConnectAuthenticationProperties
  | SecretBasedAuthenticationPolicy;
/**
 * A runtime expression, if any, used to mutate and/or filter the input of the workflow or task.
 */
export type InputFrom =
  | string
  | {
      [k: string]: unknown;
    };
/**
 * A URI reference that identifies the error type.
 */
export type ErrorType = UriTemplate | RuntimeExpression;
/**
 * A JSON Pointer used to reference the component the error originates from.
 */
export type ErrorInstance = RuntimeExpression;
/**
 * A short, human-readable summary of the error.
 */
export type ErrorTitle = RuntimeExpression;
/**
 * A human-readable explanation specific to this occurrence of the error.
 */
export type ErrorDetails = RuntimeExpression;
/**
 * A discrete unit of work that contributes to achieving the overall objectives defined by the workflow.
 */
export type Task =
  | CallTask
  | DoTask
  | ForkTask
  | EmitTask
  | ForTask
  | ListenTask
  | RaiseTask
  | RunTask
  | SetTask
  | SwitchTask
  | TryTask
  | WaitTask;
/**
 * Defines the call to perform.
 */
export type CallTask = CallAsyncAPI | CallGRPC | CallHTTP | CallOpenAPI | CallA2A | CallMCP | CallFunction;
/**
 * Defines the AsyncAPI call to perform.
 */
export type CallAsyncAPI = TaskBase & {
  call?: 'asyncapi';
  with?: AsyncApiArguments;
  [k: string]: unknown;
};
/**
 * A runtime expression, if any, used to determine whether or not the task should be run.
 */
export type TaskBaseIf = string;
/**
 * A runtime expression, if any, used to mutate and/or filter the output of the workflow or task.
 */
export type OutputAs =
  | string
  | {
      [k: string]: unknown;
    };
/**
 * A runtime expression, if any, used to export the output data to the context.
 */
export type ExportAs =
  | string
  | {
      [k: string]: unknown;
    };
export type TaskTimeout = Timeout | string;
export type Duration = DurationInline | RuntimeExpression | string;
/**
 * Represents different transition options for a workflow.
 */
export type FlowDirective = ('continue' | 'exit' | 'end') | string;
/**
 * The Async API call arguments.
 */
export type AsyncApiArguments = {
  [k: string]: unknown;
};
/**
 * Defines the GRPC call to perform.
 */
export type CallGRPC = TaskBase & {
  call?: 'grpc';
  with?: GRPCArguments;
  [k: string]: unknown;
};
/**
 * Defines the HTTP call to perform.
 */
export type CallHTTP = TaskBase & {
  call?: 'http';
  with?: HTTPArguments;
  [k: string]: unknown;
};
/**
 * A name/value mapping of the headers, if any, of the HTTP request to perform.
 */
export type HTTPHeaders =
  | {
      [k: string]: string;
    }
  | RuntimeExpression;
/**
 * A name/value mapping of the query parameters, if any, of the HTTP request to perform.
 */
export type HTTPQuery =
  | {
      [k: string]: string;
    }
  | RuntimeExpression;
/**
 * Defines the OpenAPI call to perform.
 */
export type CallOpenAPI = TaskBase & {
  call?: 'openapi';
  with?: OpenAPIArguments;
  [k: string]: unknown;
};
/**
 * Defines the A2A call to perform.
 */
export type CallA2A = TaskBase & {
  call?: 'a2a';
  with?: A2AArguments;
  [k: string]: unknown;
};
/**
 * The parameters object to send with the A2A method.
 */
export type WithA2AParameters =
  | {
      [k: string]: unknown;
    }
  | string;
/**
 * Defines the MCP call to perform.
 */
export type CallMCP = TaskBase & {
  call?: 'mcp';
  with?: MCPArguments;
  [k: string]: unknown;
};
/**
 * The MCP method parameters.
 */
export type McpMethodParameters =
  | {
      [k: string]: unknown;
    }
  | string;
/**
 * The transport to use to perform the MCP call.
 */
export type McpCallTransport = {
  [k: string]: unknown;
};
/**
 * Defines the function call to perform.
 */
export type CallFunction = TaskBase & {
  /**
   * The name of the function to call.
   */
  call?: string;
  with?: FunctionArguments;
  [k: string]: unknown;
};
/**
 * Allows to execute a list of tasks in sequence.
 */
export type DoTask = TaskBase & {
  do?: TaskList;
  [k: string]: unknown;
};
/**
 * Allows workflows to execute multiple tasks concurrently and optionally race them against each other, with a single possible winner, which sets the task's output.
 */
export type ForkTask = TaskBase & {
  fork?: ForkTaskConfiguration;
  [k: string]: unknown;
};
/**
 * Allows workflows to publish events to event brokers or messaging systems, facilitating communication and coordination between different components and services.
 */
export type EmitTask = TaskBase & {
  emit?: EmitTaskConfiguration;
  [k: string]: unknown;
};
/**
 * Identifies the context in which an event happened.
 */
export type EventSource = UriTemplate | RuntimeExpression;
/**
 * When the event occured.
 */
export type EventTime = RuntimeExpression;
/**
 * The schema describing the event format.
 */
export type EventDataschema = UriTemplate | RuntimeExpression;
/**
 * The event's payload data
 */
export type EventData =
  | RuntimeExpression
  | {
      [k: string]: unknown;
    };
/**
 * Allows workflows to iterate over a collection of items, executing a defined set of subtasks for each item in the collection. This task type is instrumental in handling scenarios such as batch processing, data transformation, and repetitive operations across datasets.
 */
export type ForTask = TaskBase & {
  for?: ForTaskConfiguration;
  /**
   * A runtime expression that represents the condition, if any, that must be met for the iteration to continue.
   */
  while?: string;
  do?: TaskList;
  [k: string]: unknown;
};
/**
 * Provides a mechanism for workflows to await and react to external events, enabling event-driven behavior within workflow systems.
 */
export type ListenTask = TaskBase & {
  listen?: ListenTaskConfiguration;
  foreach?: SubscriptionIterator;
  [k: string]: unknown;
};
/**
 * Describe the event consumption strategy to adopt.
 */
export type EventConsumptionStrategy =
  | AllEventConsumptionStrategy
  | AnyEventConsumptionStrategy
  | OneEventConsumptionStrategy;
/**
 * A list containing all the events that must be consumed.
 */
export type AllEventConsumptionStrategyConfiguration = EventFilter[];
/**
 * A list containing any of the events to consume.
 */
export type AnyEventConsumptionStrategyConfiguration = EventFilter[];
export type AnyEventConsumptionStrategyUntil = string | AnyEventUntilConsumed;
export type AnyEventUntilConsumed = EventConsumptionStrategy & {
  until?: never;
  [k: string]: unknown;
};
/**
 * Intentionally triggers and propagates errors.
 */
export type RaiseTask = TaskBase & {
  raise?: RaiseTaskConfiguration;
  [k: string]: unknown;
};
export type RaiseTaskError = Error | string;
/**
 * Provides the capability to execute external containers, shell commands, scripts, or workflows.
 */
export type RunTask = TaskBase & {
  run?: RunTaskConfiguration;
  [k: string]: unknown;
};
/**
 * The configuration of the process to execute.
 */
export type RunTaskConfiguration = RunContainer | RunScript | RunShell | RunWorkflow;
/**
 * A list of the arguments, if any, passed as argv to the command or default container CMD
 */
export type ContainerArguments = string[];
/**
 * The configuration of the script to run.
 */
export type Script = InlineScript | ExternalScript;
/**
 * A list of the arguments, if any, to the shell command as argv
 */
export type ShellArguments = string[];
/**
 * A task used to set data.
 */
export type SetTask = TaskBase & {
  set?: SetTaskConfiguration;
  [k: string]: unknown;
};
/**
 * The data to set.
 */
export type SetTaskConfiguration =
  | {
      [k: string]: unknown;
    }
  | string;
/**
 * Enables conditional branching within workflows, allowing them to dynamically select different paths based on specified conditions or criteria.
 */
export type SwitchTask = TaskBase & {
  switch?: SwitchTaskConfiguration;
  [k: string]: unknown;
};
/**
 * The definition of the switch to use.
 *
 * @minItems 1
 */
export type SwitchTaskConfiguration = [SwitchItem, ...SwitchItem[]];
/**
 * Serves as a mechanism within workflows to handle errors gracefully, potentially retrying failed tasks before proceeding with alternate ones.
 */
export type TryTask = TaskBase & {
  try?: TaskList;
  catch?: TryTaskCatch;
  [k: string]: unknown;
};
export type TryTaskCatchRetry = RetryPolicy | string;
/**
 * The retry duration backoff.
 */
export type RetryBackoff = ConstantBackoff | ExponentialBackOff | LinearBackoff;
/**
 * Allows workflows to pause or delay their execution for a specified period of time.
 */
export type WaitTask = TaskBase & {
  wait?: Duration;
  [k: string]: unknown;
};
/**
 * List of named tasks to perform.
 */
export type TaskList = TaskItem[];
/**
 * The workflow's extensions.
 */
export type UseExtensions = ExtensionItem[];
/**
 * The workflow's reusable secrets.
 */
export type UseSecrets = string[];
export type WorkflowTimeout = Timeout | string;

/**
 * Open Workflow Specification DSL - Workflow Schema.
 */
export interface Workflow {
  document: Document;
  input?: Input;
  use?: Use;
  do: TaskList;
  timeout?: WorkflowTimeout;
  output?: Output;
  schedule?: Schedule;
  [k: string]: unknown;
}
/**
 * Documents the workflow.
 */
export interface Document {
  /**
   * The version of the DSL used by the workflow.
   */
  dsl: string;
  /**
   * The workflow's namespace.
   */
  namespace: string;
  /**
   * The workflow's name.
   */
  name: string;
  /**
   * The workflow's semantic version.
   */
  version: string;
  /**
   * The workflow's title.
   */
  title?: string;
  /**
   * The workflow's Markdown summary.
   */
  summary?: string;
  tags?: WorkflowTags;
  metadata?: WorkflowMetadata;
}
/**
 * A key/value mapping of the workflow's tags, if any.
 */
export interface WorkflowTags {
  [k: string]: unknown;
}
/**
 * Holds additional information about the workflow.
 */
export interface WorkflowMetadata {
  [k: string]: unknown;
}
/**
 * Configures the input of a workflow or task.
 */
export interface Input {
  schema?: Schema;
  from?: InputFrom;
}
export interface SchemaInline {
  /**
   * The schema's inline definition.
   */
  document: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface SchemaExternal {
  resource: ExternalResource;
  [k: string]: unknown;
}
/**
 * Represents an external resource.
 */
export interface ExternalResource {
  /**
   * The name of the external resource, if any.
   */
  name?: string;
  endpoint: Endpoint;
}
export interface EndpointConfiguration {
  uri: EndpointUri;
  authentication?: ReferenceableAuthenticationPolicy;
}
/**
 * The reference of the authentication policy to use.
 */
export interface AuthenticationPolicyReference {
  /**
   * The name of the authentication policy to use.
   */
  use: string;
  [k: string]: unknown;
}
/**
 * Use basic authentication.
 */
export interface BasicAuthenticationPolicy {
  basic: BasicAuthenticationPolicyConfiguration;
  [k: string]: unknown;
}
/**
 * Inline configuration of the basic authentication policy.
 */
export interface BasicAuthenticationProperties {
  /**
   * The username to use.
   */
  username: string;
  /**
   * The password to use.
   */
  password: string;
  [k: string]: unknown;
}
/**
 * Represents an authentication policy based on secrets.
 */
export interface SecretBasedAuthenticationPolicy {
  /**
   * The name of the authentication policy to use.
   */
  use: string;
}
/**
 * Use bearer authentication.
 */
export interface BearerAuthenticationPolicy {
  bearer: BearerAuthenticationPolicyConfiguration;
  [k: string]: unknown;
}
/**
 * Inline configuration of the bearer authentication policy.
 */
export interface BearerAuthenticationProperties {
  /**
   * The bearer token to use.
   */
  token: string;
  [k: string]: unknown;
}
/**
 * Use digest authentication.
 */
export interface DigestAuthenticationPolicy {
  digest: DigestAuthenticationPolicyConfiguration;
  [k: string]: unknown;
}
/**
 * Inline configuration of the digest authentication policy.
 */
export interface DigestAuthenticationProperties {
  /**
   * The username to use.
   */
  username: string;
  /**
   * The password to use.
   */
  password: string;
  [k: string]: unknown;
}
/**
 * Use OAuth2 authentication.
 */
export interface OAuth2AuthenticationPolicy {
  oauth2: OAuth2AuthenticationPolicyConfiguration;
  [k: string]: unknown;
}
/**
 * Inline configuration of the OAuth2 authentication policy.
 */
export interface OAuth2AuthenticationData {
  authority?: UriTemplate;
  /**
   * The grant type to use.
   */
  grant?:
    | 'authorization_code'
    | 'client_credentials'
    | 'password'
    | 'refresh_token'
    | 'urn:ietf:params:oauth:grant-type:token-exchange';
  client?: OAuth2AuthenticationDataClient;
  request?: OAuth2TokenRequest;
  issuers?: OAuth2Issuers;
  scopes?: OAuth2AuthenticationDataScopes;
  audiences?: OAuth2AuthenticationDataAudiences;
  /**
   * The username to use. Used only if the grant type is Password.
   */
  username?: string;
  /**
   * The password to use. Used only if the grant type is Password.
   */
  password?: string;
  subject?: OAuth2TokenDefinition;
  actor?: OAuth2TokenDefinition;
  [k: string]: unknown;
}
/**
 * The definition of an OAuth2 client.
 */
export interface OAuth2AuthenticationDataClient {
  /**
   * The client id to use.
   */
  id?: string;
  /**
   * The client secret to use, if any.
   */
  secret?: string;
  /**
   * A JWT containing a signed assertion with your application credentials.
   */
  assertion?: string;
  /**
   * The authentication method to use to authenticate the client.
   */
  authentication?: 'client_secret_basic' | 'client_secret_post' | 'client_secret_jwt' | 'private_key_jwt' | 'none';
}
/**
 * The configuration of an OAuth2 token request
 */
export interface OAuth2TokenRequest {
  encoding?: 'application/x-www-form-urlencoded' | 'application/json';
  [k: string]: unknown;
}
/**
 * Represents an OAuth2 token.
 */
export interface OAuth2TokenDefinition {
  /**
   * The security token to use.
   */
  token: string;
  /**
   * The type of the security token to use.
   */
  type: string;
}
/**
 * The endpoint configurations for OAuth2.
 */
export interface OAuth2AuthenticationPropertiesEndpoints {
  /**
   * The relative path to the token endpoint. Defaults to `/oauth2/token`.
   */
  token?: string;
  /**
   * The relative path to the revocation endpoint. Defaults to `/oauth2/revoke`.
   */
  revocation?: string;
  /**
   * The relative path to the introspection endpoint. Defaults to `/oauth2/introspect`.
   */
  introspection?: string;
  [k: string]: unknown;
}
/**
 * Use OpenIdConnect authentication.
 */
export interface OpenIdConnectAuthenticationPolicy {
  oidc: OpenIdConnectAuthenticationPolicyConfiguration;
  [k: string]: unknown;
}
/**
 * Inline configuration of the OAuth2 authentication policy.
 */
export interface OpenIdConnectAuthenticationProperties {
  authority?: UriTemplate;
  /**
   * The grant type to use.
   */
  grant?:
    | 'authorization_code'
    | 'client_credentials'
    | 'password'
    | 'refresh_token'
    | 'urn:ietf:params:oauth:grant-type:token-exchange';
  client?: OAuth2AuthenticationDataClient;
  request?: OAuth2TokenRequest;
  issuers?: OAuth2Issuers;
  scopes?: OAuth2AuthenticationDataScopes;
  audiences?: OAuth2AuthenticationDataAudiences;
  /**
   * The username to use. Used only if the grant type is Password.
   */
  username?: string;
  /**
   * The password to use. Used only if the grant type is Password.
   */
  password?: string;
  subject?: OAuth2TokenDefinition;
  actor?: OAuth2TokenDefinition;
}
/**
 * Defines the workflow's reusable components.
 */
export interface Use {
  authentications?: UseAuthentications;
  errors?: UseErrors;
  extensions?: UseExtensions;
  functions?: UseFunctions;
  retries?: UseRetries;
  secrets?: UseSecrets;
  timeouts?: UseTimeouts;
  catalogs?: UseCatalogs;
}
/**
 * The workflow's reusable authentication policies.
 */
export interface UseAuthentications {
  [k: string]: AuthenticationPolicy;
}
/**
 * The workflow's reusable errors.
 */
export interface UseErrors {
  [k: string]: Error;
}
/**
 * Represents an error.
 */
export interface Error {
  type: ErrorType;
  /**
   * The status code generated by the origin for this occurrence of the error.
   */
  status: number;
  instance?: ErrorInstance;
  title?: ErrorTitle;
  detail?: ErrorDetails;
}
export interface ExtensionItem {
  [k: string]: Extension;
}
/**
 * The definition of an extension.
 */
export interface Extension {
  /**
   * The type of task to extend.
   */
  extend:
    | 'call'
    | 'composite'
    | 'emit'
    | 'for'
    | 'listen'
    | 'raise'
    | 'run'
    | 'set'
    | 'switch'
    | 'try'
    | 'wait'
    | 'all';
  /**
   * A runtime expression, if any, used to determine whether or not the extension should apply in the specified context.
   */
  when?: string;
  before?: TaskList;
  after?: TaskList;
}
export interface TaskItem {
  [k: string]: Task;
}
/**
 * An object inherited by all tasks.
 */
export interface TaskBase {
  if?: TaskBaseIf;
  input?: Input;
  output?: Output;
  export?: Export;
  timeout?: TaskTimeout;
  then?: FlowDirective;
  metadata?: TaskMetadata;
  [k: string]: unknown;
}
/**
 * Configures the output of a workflow or task.
 */
export interface Output {
  schema?: Schema;
  as?: OutputAs;
}
/**
 * Set the content of the context. .
 */
export interface Export {
  schema?: Schema;
  as?: ExportAs;
}
/**
 * The definition of a timeout.
 */
export interface Timeout {
  after: Duration;
}
/**
 * The inline definition of a duration.
 */
export interface DurationInline {
  /**
   * Number of days, if any.
   */
  days?: number;
  /**
   * Number of days, if any.
   */
  hours?: number;
  /**
   * Number of minutes, if any.
   */
  minutes?: number;
  /**
   * Number of seconds, if any.
   */
  seconds?: number;
  /**
   * Number of milliseconds, if any.
   */
  milliseconds?: number;
}
/**
 * Holds additional information about the task.
 */
export interface TaskMetadata {
  [k: string]: unknown;
}
/**
 * The GRPC call arguments.
 */
export interface GRPCArguments {
  proto: ExternalResource;
  service: WithGRPCService;
  /**
   * The name of the method to call on the defined GRPC service.
   */
  method: string;
  arguments?: WithGRPCArguments;
}
export interface WithGRPCService {
  /**
   * The name of the GRPC service to call.
   */
  name: string;
  /**
   * The hostname of the GRPC service to call.
   */
  host: string;
  /**
   * The port number of the GRPC service to call.
   */
  port?: number;
  authentication?: ReferenceableAuthenticationPolicy;
}
/**
 * The arguments, if any, to call the method with.
 */
export interface WithGRPCArguments {
  [k: string]: unknown;
}
/**
 * The HTTP call arguments.
 */
export interface HTTPArguments {
  /**
   * The HTTP method of the HTTP request to perform.
   */
  method: string;
  endpoint: Endpoint;
  headers?: HTTPHeaders;
  body?: HTTPBody;
  query?: HTTPQuery;
  /**
   * The http call output format. Defaults to 'content'.
   */
  output?: 'raw' | 'content' | 'response';
  /**
   * Specifies whether redirection status codes (`300–399`) should be treated as errors.
   */
  redirect?: boolean;
}
/**
 * The body, if any, of the HTTP request to perform.
 */
export interface HTTPBody {
  [k: string]: unknown;
}
/**
 * The OpenAPI call arguments.
 */
export interface OpenAPIArguments {
  document: ExternalResource;
  /**
   * The id of the OpenAPI operation to call.
   */
  operationId: string;
  parameters?: WithOpenAPIParameters;
  authentication?: ReferenceableAuthenticationPolicy;
  /**
   * The http call output format. Defaults to 'content'.
   */
  output?: 'raw' | 'content' | 'response';
  /**
   * Specifies whether redirection status codes (`300–399`) should be treated as errors.
   */
  redirect?: boolean;
}
/**
 * A name/value mapping of the parameters of the OpenAPI operation to call.
 */
export interface WithOpenAPIParameters {
  [k: string]: unknown;
}
/**
 * The A2A call arguments.
 */
export interface A2AArguments {
  agentCard?: ExternalResource;
  server?: Endpoint;
  /**
   * The A2A method to send.
   */
  method:
    | 'message/send'
    | 'message/stream'
    | 'tasks/get'
    | 'tasks/list'
    | 'tasks/cancel'
    | 'tasks/resubscribe'
    | 'tasks/pushNotificationConfig/set'
    | 'tasks/pushNotificationConfig/get'
    | 'tasks/pushNotificationConfig/list'
    | 'tasks/pushNotificationConfig/delete'
    | 'agent/getAuthenticatedExtendedCard';
  parameters?: WithA2AParameters;
}
/**
 * The MCP call arguments.
 */
export interface MCPArguments {
  /**
   * The version of the MCP protocol to use.
   */
  protocolVersion?: string;
  /**
   * The MCP method to call.
   */
  method:
    | 'tools/list'
    | 'tools/call'
    | 'prompts/list'
    | 'prompts/get'
    | 'resources/list'
    | 'resources/read'
    | 'resources/templates/list';
  parameters?: McpMethodParameters;
  timeout?: Duration;
  transport: McpCallTransport;
  client?: McpClient;
  [k: string]: unknown;
}
/**
 * Describes the client used to perform the MCP call.
 */
export interface McpClient {
  /**
   * The name of the client used to connect to the MCP server.
   */
  name: string;
  /**
   * The version of the client used to connect to the MCP server.
   */
  description?: string;
  [k: string]: unknown;
}
/**
 * A name/value mapping of the parameters, if any, to call the function with.
 */
export interface FunctionArguments {
  [k: string]: unknown;
}
/**
 * The configuration of the branches to perform concurrently.
 */
export interface ForkTaskConfiguration {
  branches: TaskList;
  /**
   * Indicates whether or not the concurrent tasks are racing against each other, with a single possible winner, which sets the composite task's output.
   */
  compete?: boolean;
}
/**
 * The configuration of an event's emission.
 */
export interface EmitTaskConfiguration {
  event: EmitEventDefinition;
}
/**
 * The definition of the event to emit.
 */
export interface EmitEventDefinition {
  with?: EmitEventWith;
  [k: string]: unknown;
}
/**
 * Defines the properties of event to emit.
 */
export interface EmitEventWith {
  /**
   * The event's unique identifier.
   */
  id?: string;
  source: EventSource;
  /**
   * This attribute contains a value describing the type of event related to the originating occurrence.
   */
  type: string;
  time?: EventTime;
  /**
   * The subject of the event.
   */
  subject?: string;
  /**
   * Content type of data value. This attribute enables data to carry any type of content, whereby format and encoding might differ from that of the chosen event format.
   */
  datacontenttype?: string;
  dataschema?: EventDataschema;
  data?: EventData;
  [k: string]: unknown;
}
/**
 * The definition of the loop that iterates over a range of values.
 */
export interface ForTaskConfiguration {
  /**
   * The name of the variable used to store the current item being enumerated.
   */
  each?: string;
  /**
   * A runtime expression used to get the collection to enumerate.
   */
  in: string;
  /**
   * The name of the variable used to store the index of the current item being enumerated.
   */
  at?: string;
}
/**
 * The configuration of the listener to use.
 */
export interface ListenTaskConfiguration {
  to: EventConsumptionStrategy;
  /**
   * Specifies how events are read during the listen operation.
   */
  read?: 'data' | 'envelope' | 'raw';
}
export interface AllEventConsumptionStrategy {
  all: AllEventConsumptionStrategyConfiguration;
  [k: string]: unknown;
}
/**
 * An event filter is a mechanism used to selectively process or handle events based on predefined criteria, such as event type, source, or specific attributes.
 */
export interface EventFilter {
  with: WithEvent;
  correlate?: EventFilterCorrelate;
}
/**
 * An event filter is a mechanism used to selectively process or handle events based on predefined criteria, such as event type, source, or specific attributes.
 */
export interface WithEvent {
  /**
   * The event's unique identifier.
   */
  id?: string;
  source?: EventSource;
  /**
   * This attribute contains a value describing the type of event related to the originating occurrence.
   */
  type?: string;
  time?: EventTime;
  /**
   * The subject of the event.
   */
  subject?: string;
  /**
   * Content type of data value. This attribute enables data to carry any type of content, whereby format and encoding might differ from that of the chosen event format.
   */
  datacontenttype?: string;
  dataschema?: EventDataschema;
  data?: EventData;
  [k: string]: unknown;
}
/**
 * A correlation is a link between events and data, established by mapping event attributes to specific data attributes, allowing for coordinated processing or handling based on event characteristics.
 */
export interface EventFilterCorrelate {
  [k: string]: {
    /**
     * A runtime expression used to extract the correlation value from the filtered event.
     */
    from: string;
    /**
     * A constant or a runtime expression, if any, used to determine whether or not the extracted correlation value matches expectations. If not set, the first extracted value will be used as the correlation's expectation.
     */
    expect?: string;
    [k: string]: unknown;
  };
}
export interface AnyEventConsumptionStrategy {
  any: AnyEventConsumptionStrategyConfiguration;
  until?: AnyEventConsumptionStrategyUntil;
  [k: string]: unknown;
}
export interface OneEventConsumptionStrategy {
  one: EventFilter;
  [k: string]: unknown;
}
/**
 * Configures the iteration over each item (event or message) consumed by a subscription.
 */
export interface SubscriptionIterator {
  /**
   * The name of the variable used to store the current item being enumerated.
   */
  item?: string;
  /**
   * The name of the variable used to store the index of the current item being enumerated.
   */
  at?: string;
  do?: TaskList;
  output?: Output;
  export?: Export;
}
/**
 * The definition of the error to raise.
 */
export interface RaiseTaskConfiguration {
  error: RaiseTaskError;
}
/**
 * Enables the execution of external processes encapsulated within a containerized environment.
 */
export interface RunContainer {
  container: Container;
  [k: string]: unknown;
}
/**
 * The configuration of the container to run.
 */
export interface Container {
  /**
   * The name of the container image to run.
   */
  image: string;
  /**
   * A runtime expression, if any, used to give specific name to the container.
   */
  name?: string;
  /**
   * The command, if any, to execute on the container.
   */
  command?: string;
  ports?: ContainerPorts;
  volumes?: ContainerVolumes;
  environment?: ContainerEnvironment;
  /**
   * A runtime expression, if any, passed as standard input (stdin) to the command or default container CMD
   */
  stdin?: string;
  arguments?: ContainerArguments;
  lifetime?: ContainerLifetime;
  /**
   * Policy that controls how the container's image should be pulled from the registry. Defaults to `ifNotPresent`
   */
  pullPolicy?: 'ifNotPresent' | 'always' | 'never';
}
/**
 * The container's port mappings, if any.
 */
export interface ContainerPorts {
  [k: string]: unknown;
}
/**
 * The container's volume mappings, if any.
 */
export interface ContainerVolumes {
  [k: string]: unknown;
}
/**
 * A key/value mapping of the environment variables, if any, to use when running the configured process.
 */
export interface ContainerEnvironment {
  [k: string]: unknown;
}
/**
 * The configuration of a container's lifetime
 */
export interface ContainerLifetime {
  /**
   * The container cleanup policy to use
   */
  cleanup: 'always' | 'never' | 'eventually';
  after?: Duration;
}
/**
 * Enables the execution of custom scripts or code within a workflow, empowering workflows to perform specialized logic, data processing, or integration tasks by executing user-defined scripts written in various programming languages.
 */
export interface RunScript {
  script: Script;
  [k: string]: unknown;
}
/**
 * The script's code.
 */
export interface InlineScript {
  code: string;
  [k: string]: unknown;
}
/**
 * The script's resource.
 */
export interface ExternalScript {
  source: ExternalResource;
  [k: string]: unknown;
}
/**
 * Enables the execution of shell commands within a workflow, enabling workflows to interact with the underlying operating system and perform system-level operations, such as file manipulation, environment configuration, or system administration tasks.
 */
export interface RunShell {
  shell: Shell;
  [k: string]: unknown;
}
/**
 * The configuration of the shell command to run.
 */
export interface Shell {
  /**
   * The shell command to run.
   */
  command: string;
  /**
   * A runtime expression, if any, to the shell command as standard input (stdin).
   */
  stdin?: string;
  arguments?: ShellArguments;
  environment?: ShellEnvironment;
}
/**
 * A key/value mapping of the environment variables, if any, to use when running the configured process.
 */
export interface ShellEnvironment {
  [k: string]: unknown;
}
/**
 * Enables the invocation and execution of nested workflows within a parent workflow, facilitating modularization, reusability, and abstraction of complex logic or business processes by encapsulating them into standalone workflow units.
 */
export interface RunWorkflow {
  workflow: SubflowConfiguration;
  [k: string]: unknown;
}
/**
 * The configuration of the workflow to run.
 */
export interface SubflowConfiguration {
  /**
   * The namespace the workflow to run belongs to.
   */
  namespace: string;
  /**
   * The name of the workflow to run.
   */
  name: string;
  /**
   * The version of the workflow to run. Defaults to latest.
   */
  version: string;
  input?: SubflowInput;
}
/**
 * The data, if any, to pass as input to the workflow to execute. The value should be validated against the target workflow's input schema, if specified.
 */
export interface SubflowInput {
  [k: string]: unknown;
}
export interface SwitchItem {
  [k: string]: SwitchCase;
}
/**
 * The definition of a case within a switch task, defining a condition and corresponding tasks to execute if the condition is met.
 */
export interface SwitchCase {
  /**
   * A runtime expression used to determine whether or not the case matches.
   */
  when?: string;
  then: FlowDirective;
  [k: string]: unknown;
}
/**
 * The object used to define the errors to catch.
 */
export interface TryTaskCatch {
  errors?: CatchErrors;
  /**
   * The name of the runtime expression variable to save the error as. Defaults to 'error'.
   */
  as?: string;
  /**
   * A runtime expression used to determine whether to catch the filtered error.
   */
  when?: string;
  /**
   * A runtime expression used to determine whether not to catch the filtered error.
   */
  exceptWhen?: string;
  retry?: TryTaskCatchRetry;
  do?: TaskList;
}
/**
 * static error filter
 */
export interface CatchErrors {
  with?: ErrorFilter;
  [k: string]: unknown;
}
/**
 * Error filtering base on static values. For error filtering on dynamic values, use catch.when property
 */
export interface ErrorFilter {
  /**
   * if present, means this value should be used for filtering
   */
  type?: string;
  /**
   * if present, means this value should be used for filtering
   */
  status?: number;
  /**
   * if present, means this value should be used for filtering
   */
  instance?: string;
  /**
   * if present, means this value should be used for filtering
   */
  title?: string;
  /**
   * if present, means this value should be used for filtering
   */
  details?: string;
  [k: string]: unknown;
}
/**
 * Defines a retry policy.
 */
export interface RetryPolicy {
  /**
   * A runtime expression, if any, used to determine whether or not to retry running the task, in a given context.
   */
  when?: string;
  /**
   * A runtime expression used to determine whether or not to retry running the task, in a given context.
   */
  exceptWhen?: string;
  delay?: Duration;
  backoff?: RetryBackoff;
  limit?: RetryLimit;
  jitter?: RetryPolicyJitter;
}
export interface ConstantBackoff {
  /**
   * The definition of the constant backoff to use, if any.
   */
  constant: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface ExponentialBackOff {
  /**
   * The definition of the exponential backoff to use, if any.
   */
  exponential: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface LinearBackoff {
  /**
   * The definition of the linear backoff to use, if any.
   */
  linear: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * The retry limit, if any.
 */
export interface RetryLimit {
  attempt?: RetryLimitAttempt;
  duration?: Duration;
}
export interface RetryLimitAttempt {
  /**
   * The maximum amount of retry attempts, if any.
   */
  count?: number;
  duration?: Duration;
}
/**
 * The parameters, if any, that control the randomness or variability of the delay between retry attempts.
 */
export interface RetryPolicyJitter {
  from: Duration;
  to: Duration;
}
/**
 * The workflow's reusable functions.
 */
export interface UseFunctions {
  [k: string]: Task;
}
/**
 * The workflow's reusable retry policies.
 */
export interface UseRetries {
  [k: string]: RetryPolicy;
}
/**
 * The workflow's reusable timeouts.
 */
export interface UseTimeouts {
  [k: string]: Timeout;
}
/**
 * The workflow's reusable catalogs.
 */
export interface UseCatalogs {
  [k: string]: Catalog;
}
/**
 * The definition of a resource catalog.
 */
export interface Catalog {
  endpoint: Endpoint;
}
/**
 * Schedules the workflow.
 */
export interface Schedule {
  every?: Duration;
  /**
   * Specifies the schedule using a cron expression, e.g., '0 0 * * *' for daily at midnight.
   */
  cron?: string;
  after?: Duration;
  on?: EventConsumptionStrategy;
}
