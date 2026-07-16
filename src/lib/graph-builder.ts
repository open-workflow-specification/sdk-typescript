import {
  CallTask,
  DoTask,
  EmitTask,
  ForkTask,
  ForTask,
  ListenTask,
  RaiseTask,
  RunTask,
  SetTask,
  SwitchTask,
  Task,
  TaskItem,
  TryTask,
  WaitTask,
  Workflow,
} from './generated/definitions/specification';
import { appendJsonPointerSegment } from './utils';

const entrySuffix = '-entry-node';
const exitSuffix = '-exit-node';

const rootId = 'root';
const portPrefix = 'port-';

const doReference = '/do';
const catchReference = '/catch';
const branchReference = '/fork/branches';
const tryReference = '/try';

/**
 * Enumeration of possible node types in a graph.
 */
export enum GraphNodeType {
  Root = 'root',
  Start = 'start',
  End = 'end',
  Entry = 'entry',
  Exit = 'exit',
  Call = 'call',
  Catch = 'catch',
  Do = 'do',
  Emit = 'emit',
  For = 'for',
  Fork = 'fork',
  Listen = 'listen',
  Raise = 'raise',
  Run = 'run',
  Set = 'set',
  Switch = 'switch',
  Try = 'try',
  TryCatch = 'try-catch',
  Wait = 'wait',
}

/**
 * Represents a generic within a graph.
 * This serves as a base type for nodes, edges, and graphs.
 */
export type GraphElement = {
  /** A unique identifier for this graph element. */
  id: string;
  /** An optional label to provide additional context or naming. */
  label?: string;
};

/**
 * Represents a node within the graph.
 */
export type GraphNode = GraphElement & {
  /** The type of the node. */
  type: GraphNodeType;
  /** The parent graph, if any. */
  parent?: Graph;
  /** The related task */
  task?: Task;
  /** The task's indexed RFC 6901 JSON Pointer within the workflow document. */
  taskReference?: string;
};

/**
 * Represents a flattened node within the graph.
 */
export type FlatGraphNode = Omit<GraphNode, 'parent'> & {
  /** The id of parent graph, if any. */
  parentId?: string;
};

/**
 * Represents a directed edge connecting two nodes in the graph.
 */
export type GraphEdge = GraphElement & {
  /** The unique identifier of the node where the edge originates. */
  sourceId: string;
  /** The unique identifier of the node where the edge terminates. */
  targetId: string;
};

/**
 * Represents a graph or a subgraph.
 */
export type Graph = GraphNode & {
  /** A collection of nodes that belong to this graph. */
  nodes: Array<Graph | GraphNode>;
  /** A collection of edges that define relationships between nodes. */
  edges: GraphEdge[];
  /** The entry node of the graph, if any. */
  entryNode?: GraphNode;
  /** The exit node of the graph, if any. */
  exitNode?: GraphNode;
};

/**
 * Represents a flattened graph.
 */
export type FlatGraph = FlatGraphNode & {
  /** A collection of nodes that belong to this graph. */
  nodes: FlatGraphNode[];
  /** A collection of edges that define relationships between nodes. */
  edges: GraphEdge[];
  /** The entry node of the graph, if any. */
  entryNode?: GraphNode;
  /** The exit node of the graph, if any. */
  exitNode?: GraphNode;
};

/**
 * The information provided to a custom task id factory when resolving a task's node id.
 */
export type TaskIdFactoryContext = {
  /** The task definition. */
  task: Task;
  /** The task name. */
  name: string;
  /** The task's indexed RFC 6901 JSON Pointer within the workflow document, e.g. `/do/0/init`. */
  reference: string;
  /** The id of the graph the node will be added to (`root` for top-level tasks). */
  parentId: string;
  /** The id the builder would assign by default, e.g. `/do/init`. */
  defaultId: string;
};

/**
 * Options used to customize how a graph is built.
 */
export type GraphBuildOptions = {
  /**
   * Returns a custom node id for a task, or undefined to keep the default id.
   * The factory is invoked at most once per task per build: the first resolution is cached
   * and reused wherever the task is reached again. Returned ids must be unique across the
   * whole graph, must not start with `port-` and must not be a root port id; the build
   * throws otherwise. Derived ids (ports, try/catch subgraphs, child task lists) compose
   * on the returned id, so children of a renamed container keep default ids under it.
   */
  taskId?: (context: TaskIdFactoryContext) => string | undefined;
};

/**
 * Context information used when processing tasks in a workflow graph.
 */
type TaskContext = {
  /** The parent graph the node will be added to. */
  graph: Graph;
  /** The reference of the task list. */
  taskListReference: string;
  /** The index-free, pointer-shaped path of the task list. */
  taskListId: string;
  /** The list of sibling tasks. */
  taskList: Map<string, Task>;
  /** The current task name. */
  taskName?: string;
  /** The current reference. */
  taskReference: string;
  /** The current stable graph node id. */
  taskId: string;
  /** The ids of edges already visited */
  knownEdges: GraphEdge[];
  /** The graph build options, if any. */
  options?: GraphBuildOptions;
  /** The resolved node ids, mapped by task reference. */
  taskIdsByReference: Map<string, string>;
  /** The task references, mapped by resolved node id. */
  taskReferencesById: Map<string, string>;
};

/**
 * Identity information for a transition between tasks.
 */
type TransitionInfo = {
  /** Name of the task to transition to. */
  name: string;
  /** Index position in the task list. */
  index: number;
  /** Optional reference to the associated task. */
  task?: Task;
  /** Optional label of the transition. */
  label?: string;
};

/**
 * Enumeration of possible workflow flow directives.
 */
enum FlowDirective {
  Exit = 'exit',
  End = 'end',
  Continue = 'continue',
}

/**
 * Converts an array of TaskItem objects into a Map for easy lookup.
 *
 * @param tasksList An array of TaskItem objects.
 * @returns A map where keys are task names and values are Task objects.
 */
function mapTasks(tasksList: TaskItem[] | undefined): Map<string, Task> {
  return (tasksList || []).reduce((acc, item) => {
    const [key, task] = Object.entries(item)[0];
    acc.set(key, task);
    return acc;
  }, new Map<string, Task>());
}

/**
 * Initializes a graph with default entry and exit nodes.
 *
 * @param type The type of the graph node.
 * @param id Unique identifier for the graph.
 * @param task The related task
 * @param label Optional label for the graph.
 * @param parent Optional parent graph if this is a subgraph.
 * @returns A newly created Graph instance.
 */
function initGraph(
  type: GraphNodeType,
  id: string = rootId,
  task: Task | undefined = undefined,
  label: string | undefined = undefined,
  parent: Graph | undefined = undefined,
  taskReference: string | undefined = undefined,
): Graph {
  const graph: Graph = {
    id,
    label,
    type,
    parent,
    task,
    taskReference,
    nodes: [],
    edges: [],
  };
  const entryNode: GraphNode = {
    type: id === rootId ? GraphNodeType.Start : GraphNodeType.Entry,
    id: id === rootId ? `${id}${entrySuffix}` : `${portPrefix}${id}${entrySuffix}`,
    parent: graph,
  };
  const exitNode: GraphNode = {
    type: id === rootId ? GraphNodeType.End : GraphNodeType.Exit,
    id: id === rootId ? `${id}${exitSuffix}` : `${portPrefix}${id}${exitSuffix}`,
    parent: graph,
  };
  graph.entryNode = entryNode;
  graph.exitNode = exitNode;
  graph.nodes = [entryNode, exitNode];
  if (parent) parent.nodes.push(graph);
  return graph;
}

/**
 * Gets the next task to be executed in the workflow
 * @param tasksList The list of task to resolve the next task from
 * @param taskName The current task name, if any
 * @param transition A specific transition, if any
 * @returns
 */
function getNextTask(
  tasksList: Map<string, Task>,
  taskName: string | undefined = undefined,
  transition: string | undefined = undefined,
): TransitionInfo {
  if (!tasksList?.size) {
    return {
      name: FlowDirective.Exit,
      index: -1,
    };
  }
  const currentTask: Task | undefined = tasksList.get(taskName || '');
  transition = transition || currentTask?.then || '';
  if (transition == FlowDirective.End || transition == FlowDirective.Exit) {
    return {
      name: transition,
      index: -1,
    };
  }
  let index: number = 0;
  if (transition && transition != FlowDirective.Continue) {
    index = Array.from(tasksList.keys()).indexOf(transition);
    if (index === -1) throw new Error(`Unable to find task to transition to '${transition}' from '${taskName}'`);
  } else if (currentTask) {
    index = Array.from(tasksList.values()).indexOf(currentTask) + 1;
    if (index >= tasksList.size) {
      return {
        name: FlowDirective.Exit,
        index: -1,
      };
    }
  }
  const taskEntry = Array.from(tasksList.entries())[index];
  return {
    index,
    name: taskEntry[0],
    task: taskEntry[1],
  };
}

/**
 * Returns the root exit node.
 * @param graph
 * @returns
 */
function getEndNode(graph: Graph): GraphNode {
  let rootGraph = graph;
  while (rootGraph.id !== rootId) {
    if (!rootGraph.parent) throw new Error(`Unable to reach root graph from graph id '${graph.id}'`);
    rootGraph = rootGraph.parent;
  }
  if (!rootGraph.exitNode) throw new Error('The root graph should have an exit node.');
  return rootGraph.exitNode;
}

/**
 * Resolves the node id of a task, delegating to the custom task id factory when one is provided.
 * The first resolution per task reference is cached and reused: `buildTaskNode` dedups revisited
 * tasks by id, so a task must resolve to the same id however it is reached.
 * @param context The context the task is resolved in
 * @param parent The graph the task's node will be added to
 * @param task The task definition
 * @param name The task name
 * @param reference The task's indexed RFC 6901 JSON Pointer within the workflow document
 * @param defaultId The id the builder assigns by default
 * @returns The resolved node id
 */
function resolveTaskId(
  context: TaskContext,
  parent: Graph,
  task: Task,
  name: string,
  reference: string,
  defaultId: string,
): string {
  const cached = context.taskIdsByReference.get(reference);
  if (cached) return cached;
  const customId = context.options?.taskId?.({ task, name, reference, parentId: parent.id, defaultId });
  if (customId != null) {
    if (typeof customId !== 'string' || !customId.length) {
      throw new Error(`The task id factory returned an invalid id for task '${reference}'`);
    }
    if (
      customId.startsWith(portPrefix) ||
      customId === rootId ||
      customId === `${rootId}${entrySuffix}` ||
      customId === `${rootId}${exitSuffix}`
    ) {
      throw new Error(`The task id factory returned the reserved id '${customId}' for task '${reference}'`);
    }
  }
  const id = customId ?? defaultId;
  const knownReference = context.taskReferencesById.get(id);
  if (knownReference !== undefined && knownReference !== reference) {
    throw new Error(`The task id '${id}' is assigned to both tasks '${knownReference}' and '${reference}'`);
  }
  context.taskIdsByReference.set(reference, id);
  context.taskReferencesById.set(id, reference);
  return id;
}

/**
 * Builds the provided transition from the source node
 * @param sourceNode The node to build the transition from
 * @param transition The transition to follow
 * @param context The context in which the transition is built
 */
function buildTransition(sourceNode: GraphNode | Graph, transition: TransitionInfo, context: TaskContext) {
  const exitAnchor = (sourceNode as Graph).exitNode || sourceNode;
  if (transition.index != -1) {
    const taskReference = appendJsonPointerSegment(
      appendJsonPointerSegment(context.taskListReference, transition.index),
      transition.name,
    );
    const targetNode = buildTaskNode({
      ...context,
      taskId: resolveTaskId(
        context,
        context.graph,
        transition.task!,
        transition.name,
        taskReference,
        appendJsonPointerSegment(context.taskListId, transition.name),
      ),
      taskReference,
      taskName: transition.name,
    });
    buildEdge(
      context.graph,
      context.knownEdges,
      exitAnchor,
      (targetNode as Graph).entryNode || targetNode,
      transition.label,
    );
  } else if (transition.name === FlowDirective.Exit) {
    if (!context.graph.exitNode) throw new Error(`Missing exit node on graph id '${context.graph.id}'`);
    buildEdge(context.graph, context.knownEdges, exitAnchor, context.graph.exitNode, transition.label);
  } else if (transition.name === FlowDirective.End) {
    buildEdge(context.graph, context.knownEdges, exitAnchor, getEndNode(context.graph), transition.label);
  } else throw new Error('Invalid transition');
}

/**
 * Builds all the possible transitions from the provided node in the provided context
 * @param sourceNode The node to build the transitions from
 * @param context The context in which the transitions are built
 */
function buildTransitions(sourceNode: GraphNode | Graph, context: TaskContext) {
  const transitions: TransitionInfo[] = [];
  let nextTransition = getNextTask(context.taskList, context.taskName);
  transitions.push(nextTransition);
  while (nextTransition?.task?.if) {
    nextTransition.label = nextTransition?.task?.if;
    nextTransition = getNextTask(context.taskList, nextTransition.name, FlowDirective.Continue);
    transitions.push(nextTransition);
  }
  transitions
    .filter(
      (transition, index) =>
        transitions.findIndex(
          (t) => t.index === transition.index && t.name === transition.name && t.task === transition.task,
        ) === index,
    )
    .forEach((transition) => buildTransition(sourceNode, transition, context));
}

/**
 * Builds a graph representation of a task
 * @param context The context to build the graph/node for
 * @returns A graph or node for the provided context
 */
function buildTaskNode(context: TaskContext): GraphNode | Graph {
  const existingNode = context.graph.nodes.find((node) => node.id === context.taskId);
  if (existingNode) return existingNode;
  const task = context.taskList.get(context.taskName!);
  if (!task) throw new Error(`Unabled to find the task '${context.taskName}' in the current context`);
  if (task.call) return buildCallTaskNode(task, context);
  if (task.catch) return buildTryCatchTaskNode(task, context);
  if (task.emit) return buildEmitTaskNode(task, context);
  if (task.for) return buildForTaskNode(task, context);
  if (task.fork) return buildForkTaskNode(task, context);
  if (task.listen) return buildListenTaskNode(task, context);
  if (task.raise) return buildRaiseTaskNode(task, context);
  if (task.run) return buildRunTaskNode(task, context);
  if (task.set) return buildSetTaskNode(task, context);
  if (task.switch) return buildSwitchTaskNode(task, context);
  if (task.wait) return buildWaitTaskNode(task, context);
  if (task.do) return buildDoTaskNode(task, context);
  throw new Error(`Unable to defined task type of task named '${context.taskName}'`);
}

/**
 * Builds a graph node with the provided type and context
 * @param type The type of the node
 * @param context The context to build the graph node for
 * @returns A graph node for the provided context
 */
function buildGenericTaskNode(task: Task, type: GraphNodeType, context: TaskContext): GraphNode {
  const node: GraphNode = {
    task,
    taskReference: context.taskReference,
    type,
    parent: context.graph,
    id: context.taskId,
    label: context.taskName,
  };
  context.graph.nodes.push(node);
  buildTransitions(node, context);
  return node;
}

/**
 * Builds a graph node for the provided call task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildCallTaskNode(task: CallTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Call, context);
  return node;
}

/**
 * Builds a graph for the provided do task
 * @param task The task to build the graph for
 * @param context The context to build the graph for
 * @returns A graph for the provided task
 */
function buildDoTaskNode(task: DoTask, context: TaskContext): Graph {
  const subgraph: Graph = initGraph(
    GraphNodeType.Do,
    context.taskId,
    task,
    context.taskName,
    context.graph,
    context.taskReference,
  );
  const doContext: TaskContext = {
    ...context,
    graph: subgraph,
    taskListId: context.taskId + doReference,
    taskListReference: context.taskReference + doReference,
    taskList: mapTasks(task.do),
    taskName: undefined,
  };
  if (!subgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${subgraph.id}'`);
  buildTransitions(subgraph.entryNode, doContext);
  buildTransitions(subgraph, context);
  return subgraph;
}

/**
 * Builds a graph node for the provided emit task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildEmitTaskNode(task: EmitTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Emit, context);
  return node;
}

/**
 * Builds a graph for the provided for task
 * @param task The task to build the graph for
 * @param context The context to build the graph for
 * @returns A graph for the provided task
 */
function buildForTaskNode(task: ForTask, context: TaskContext): Graph {
  const subgraph: Graph = initGraph(
    GraphNodeType.For,
    context.taskId,
    task,
    context.taskName,
    context.graph,
    context.taskReference,
  );
  const forContext: TaskContext = {
    ...context,
    graph: subgraph,
    taskListId: context.taskId + doReference,
    taskListReference: context.taskReference + doReference,
    taskList: mapTasks(task.do),
    taskName: undefined,
  };
  if (!subgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${subgraph.id}'`);
  buildTransitions(subgraph.entryNode, forContext);
  buildTransitions(subgraph, context);
  return subgraph;
}

/**
 * Builds a graph for the provided fork task
 * @param task The task to build the graph for
 * @param context The context to build the graph for
 * @returns A graph for the provided task
 */
function buildForkTaskNode(task: ForkTask, context: TaskContext): Graph {
  const subgraph: Graph = initGraph(
    GraphNodeType.Fork,
    context.taskId,
    task,
    context.taskName,
    context.graph,
    context.taskReference,
  );
  for (let i = 0, c = task.fork?.branches.length || 0; i < c; i++) {
    const branchItem = task.fork?.branches[i];
    if (!branchItem) continue;
    const [branchName, branchTask] = Object.entries(branchItem)[0];
    const branchListId = `${context.taskId}${branchReference}`;
    const branchListReference = `${context.taskReference}${branchReference}`;
    const branchTaskReference = appendJsonPointerSegment(appendJsonPointerSegment(branchListReference, i), branchName);
    const branchContext: TaskContext = {
      ...context,
      graph: subgraph,
      taskListId: branchListId,
      taskListReference: branchListReference,
      taskList: mapTasks([branchItem]),
      taskId: resolveTaskId(
        context,
        subgraph,
        branchTask,
        branchName,
        branchTaskReference,
        appendJsonPointerSegment(branchListId, branchName),
      ),
      taskReference: branchTaskReference,
      taskName: branchName,
    };
    const branchNode = buildTaskNode(branchContext);
    if (!subgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${subgraph.id}'`);
    if (!subgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${subgraph.id}'`);
    buildEdge(subgraph, context.knownEdges, subgraph.entryNode, (branchNode as Graph).entryNode || branchNode);
    buildEdge(subgraph, context.knownEdges, (branchNode as Graph).exitNode || branchNode, subgraph.exitNode);
  }
  buildTransitions(subgraph, context);
  return subgraph;
}

/**
 * Builds a graph node for the provided listen task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildListenTaskNode(task: ListenTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Listen, context);
  return node;
}

/**
 * Builds a graph node for the provided rasie task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildRaiseTaskNode(task: RaiseTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Raise, context);
  return node;
}

/**
 * Builds a graph node for the provided run task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildRunTaskNode(task: RunTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Run, context);
  return node;
}

/**
 * Builds a graph node for the provided set task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildSetTaskNode(task: SetTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Set, context);
  return node;
}

/**
 * Builds a graph node for the provided switch task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildSwitchTaskNode(task: SwitchTask, context: TaskContext): GraphNode {
  const node: GraphNode = buildGenericTaskNode(task, GraphNodeType.Switch, context);
  let hasDefaultCase = false;
  task.switch?.forEach((switchItem) => {
    const [caseName, switchCase] = Object.entries(switchItem)[0];
    if (!switchCase.when) hasDefaultCase = true;
    const transition = getNextTask(context.taskList, context.taskName, switchCase.then);
    transition.label = caseName;
    buildTransition(node, transition, context);
  });
  if (!hasDefaultCase) {
    buildTransitions(node, context);
  }
  return node;
}

/**
 * Builds a graph for the provided try/catch task
 * @param task The task to build the graph for
 * @param context The context to build the graph for
 * @returns A graph for the provided task
 */
function buildTryCatchTaskNode(task: TryTask, context: TaskContext): Graph {
  const containerSubgraph: Graph = initGraph(
    GraphNodeType.TryCatch,
    context.taskId,
    task,
    context.taskName,
    context.graph,
    context.taskReference,
  );
  const trySubgraph: Graph = initGraph(
    GraphNodeType.Try,
    context.taskId + tryReference,
    task,
    context.taskName + ' (try)',
    containerSubgraph,
  );
  if (!containerSubgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${containerSubgraph.id}'`);
  if (!trySubgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${trySubgraph.id}'`);
  buildEdge(containerSubgraph, context.knownEdges, containerSubgraph.entryNode, trySubgraph.entryNode);
  const tryContext: TaskContext = {
    ...context,
    graph: trySubgraph,
    taskListId: context.taskId + tryReference,
    taskListReference: context.taskReference + tryReference,
    taskList: mapTasks(task.try),
    taskName: undefined,
  };
  if (!trySubgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${trySubgraph.id}'`);
  buildTransitions(trySubgraph.entryNode, tryContext);
  if (!task.catch?.do?.length) {
    const catchNode: GraphNode = {
      task,
      type: GraphNodeType.Catch,
      parent: containerSubgraph,
      id: context.taskId + catchReference,
      label: context.taskName + ' (catch)',
    };
    containerSubgraph.nodes.push(catchNode);
    if (!trySubgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${trySubgraph.id}'`);
    if (!containerSubgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${containerSubgraph.id}'`);
    buildEdge(containerSubgraph, context.knownEdges, trySubgraph.exitNode, catchNode);
    buildEdge(containerSubgraph, context.knownEdges, catchNode, containerSubgraph.exitNode);
  } else {
    const catchSubgraph: Graph = initGraph(
      GraphNodeType.Catch,
      context.taskId + catchReference + doReference,
      task,
      context.taskName + ' (catch)',
      containerSubgraph,
    );
    if (!trySubgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${trySubgraph.id}'`);
    if (!catchSubgraph.entryNode) throw new Error(`Missing 'entryNode' on graph id '${catchSubgraph.entryNode}'`);
    buildEdge(containerSubgraph, context.knownEdges, trySubgraph.exitNode, catchSubgraph.entryNode);
    const catchContext: TaskContext = {
      ...context,
      graph: catchSubgraph,
      taskListId: context.taskId + catchReference + doReference,
      taskListReference: context.taskReference + catchReference + doReference,
      taskList: mapTasks(task.catch.do),
      taskName: undefined,
    };
    buildTransitions(catchSubgraph.entryNode, catchContext);
    if (!catchSubgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${catchSubgraph.exitNode}'`);
    if (!containerSubgraph.exitNode) throw new Error(`Missing 'exitNode' on graph id '${containerSubgraph.exitNode}'`);
    buildEdge(containerSubgraph, context.knownEdges, catchSubgraph.exitNode, containerSubgraph.exitNode);
  }
  buildTransitions(containerSubgraph, context);
  return containerSubgraph;
}

/**
 * Builds a graph node for the provided wait task
 * @param task The task to build the graph node for
 * @param context The context to build the graph node for
 * @returns A graph node for the provided task
 */
function buildWaitTaskNode(task: WaitTask, context: TaskContext): GraphNode {
  const node = buildGenericTaskNode(task, GraphNodeType.Wait, context);
  return node;
}

/**
 * Builds an edge between two elements
 * @param graph The graph element containing the nodes
 * @param source The origin node
 * @param target The target node
 * @param label The edge label, if any
 */
function buildEdge(graph: Graph, knownEdges: GraphEdge[], source: GraphNode, target: GraphNode, label: string = '') {
  const edge = knownEdges.find((e) => e.sourceId === source.id && e.targetId === target.id);
  if (edge) {
    if (label && !edge.label?.includes(label)) {
      edge.label = edge.label + (edge.label ? ' / ' : '') + label;
    }
    return edge;
  }
  const newEdge: GraphEdge = {
    label,
    id: `${source.id}-${target.id}`,
    sourceId: source.id,
    targetId: target.id,
  };
  graph.edges.push(newEdge);
  knownEdges.push(newEdge);
  return newEdge;
}

/**
 * Remaps edges by getting rid of routes leading to entry/exit nodes
 * @param edges
 */
export const remapEdges = (edges: GraphEdge[]): GraphEdge[] => {
  const isInnerPort = (id: string) =>
    id.startsWith(portPrefix) && (id.endsWith(entrySuffix) || id.endsWith(exitSuffix));
  const outgoing = edges.reduce((bySource, edge) => {
    const sourceEdges = bySource.get(edge.sourceId) ?? [];
    sourceEdges.push(edge);
    bySource.set(edge.sourceId, sourceEdges);
    return bySource;
  }, new Map<string, GraphEdge[]>());
  const remappedEdges: GraphEdge[] = [];
  const appendLabel = (current: string, next: string | undefined) =>
    `${current}${current && next ? ' / ' : ''}${next ?? ''}`;
  const addEdge = (sourceId: string, targetId: string, label: string) => {
    const existing = remappedEdges.find((edge) => edge.sourceId === sourceId && edge.targetId === targetId);
    if (existing) {
      if (label && !existing.label?.includes(label)) {
        existing.label = appendLabel(existing.label ?? '', label);
      }
      return;
    }
    remappedEdges.push({
      id: `${sourceId}-${targetId}`,
      sourceId,
      targetId,
      label,
    });
  };
  const follow = (sourceId: string, edge: GraphEdge, label: string, visited: Set<GraphEdge>) => {
    if (visited.has(edge)) return;
    const nextVisited = new Set(visited).add(edge);
    const nextLabel = appendLabel(label, edge.label);
    if (!isInnerPort(edge.targetId)) {
      addEdge(sourceId, edge.targetId, nextLabel);
      return;
    }
    (outgoing.get(edge.targetId) ?? []).forEach((next) => follow(sourceId, next, nextLabel, nextVisited));
  };
  edges
    .filter((edge) => !isInnerPort(edge.sourceId))
    .forEach((edge) => follow(edge.sourceId, edge, '', new Set<GraphEdge>()));
  return remappedEdges;
};

/**
 * Flattens the edges of the provided graph
 * @param graph The graph to flatten the edges of
 * @returns All the edge declared in the graph and its subgraphs
 */
export const flattenEdges = (graph: Graph): GraphEdge[] => [
  ...(graph.edges || []),
  ...((graph.nodes || []).filter((node) => (node as Graph).edges?.length) as Graph[]).flatMap(flattenEdges),
];

/**
 * Flattens the nodes of the provided graph/node
 * @param graph The graph/node to flatten the nodes of
 * @returns All the nodes and subnodes declared in the graph
 */
export const flattenNodes = (node: Graph | GraphNode): FlatGraphNode[] => [
  {
    id: node.id,
    label: node.label,
    type: node.type,
    task: node.task,
    taskReference: node.taskReference,
    parentId: node.parent?.id,
  },
  ...((node as Graph).nodes || []).flatMap(flattenNodes),
];

/**
 * Flattens the provided graph into a single node and edge collection.
 * @param graph The target graph
 * @param removePorts A boolean indicating whether the port nodes should be removed.
 * @returns The flattened graph
 */
export function flattenGraph(graph: Graph, removePorts: boolean = false): FlatGraph {
  const flatGraph: FlatGraph = {
    ...graph,
    edges: flattenEdges(graph),
    nodes: graph.nodes.flatMap((node) => flattenNodes(node)),
  };
  if (!removePorts) return flatGraph;
  return {
    ...flatGraph,
    edges: remapEdges(flatGraph.edges),
    nodes: flatGraph.nodes.filter((node) => node.type !== GraphNodeType.Entry && node.type !== GraphNodeType.Exit),
  };
}

/**
 * Asserts that all node ids in the provided graph are unique.
 * Guards against custom task ids colliding with derived ids (ports, try/catch subgraphs).
 * @param graph The graph to check
 */
function assertUniqueNodeIds(graph: Graph): void {
  const knownIds = new Set<string>();
  graph.nodes.flatMap(flattenNodes).forEach(({ id }) => {
    if (knownIds.has(id)) {
      throw new Error(`Duplicate node id '${id}' produced with the provided task id factory`);
    }
    knownIds.add(id);
  });
}

/**
 * Constructs a graph representation based on the given workflow.
 *
 * @param workflow The workflow to be converted into a graph structure.
 * @param options The options used to customize how the graph is built.
 * @returns A graph representation of the workflow.
 */
export function buildGraph(workflow: Workflow, options?: GraphBuildOptions): Graph {
  const graph = initGraph(GraphNodeType.Root);
  if (!graph.entryNode) throw new Error('The root graph should have an entry node.');
  buildTransitions(graph.entryNode, {
    graph,
    taskListId: doReference,
    taskListReference: doReference,
    taskList: mapTasks(workflow.do),
    taskId: doReference,
    taskReference: doReference,
    knownEdges: [],
    options,
    taskIdsByReference: new Map<string, string>(),
    taskReferencesById: new Map<string, string>(),
  });
  if (options?.taskId) assertUniqueNodeIds(graph);
  return graph;
}

/**
 * Constructs a flattened graph representation based on the given workflow.
 *
 * @param workflow The workflow to be converted into a flattened graph structure.
 * @param removePorts A boolean indicating whether the port nodes should be removed.
 * @param options The options used to customize how the graph is built.
 * @returns A flattened graph representation of the workflow.
 */
export function buildFlatGraph(
  workflow: Workflow,
  removePorts: boolean = false,
  options?: GraphBuildOptions,
): FlatGraph {
  const graph = buildGraph(workflow, options);
  return flattenGraph(graph, removePorts);
}

/**
 * Returns all nodes in a hierarchical or flat graph without copying them.
 * @param graph The graph to traverse
 * @returns The root and all descendant nodes
 */
function getGraphNodes(graph: Graph | FlatGraph): Array<GraphNode | FlatGraphNode> {
  const nodes: Array<GraphNode | FlatGraphNode> = [];
  const visit = (node: GraphNode | FlatGraphNode | Graph | FlatGraph) => {
    nodes.push(node);
    const children = (node as Graph | FlatGraph).nodes;
    if (Array.isArray(children)) children.forEach(visit);
  };
  visit(graph);
  return nodes;
}

/**
 * Gets the node whose task reference exactly matches the supplied indexed RFC 6901 JSON Pointer.
 * @param graph The hierarchical or flat graph to search
 * @param taskReference The task reference to find
 * @returns The matching node, if any
 */
export function getNodeByTaskReference(
  graph: Graph | FlatGraph,
  taskReference: string,
): GraphNode | FlatGraphNode | undefined {
  return getGraphNodes(graph).find((node) => node.taskReference === taskReference);
}

/**
 * Gets the deepest task node whose task reference contains the supplied workflow pointer.
 * DSL validation errors expose their pointer through `WorkflowValidationError.path`; schema validation
 * errors expose pointers through each `SchemaValidationError.schemaErrors[].instancePath`.
 * Pointers above task granularity (e.g. a `TaskItem` at `/do/0` or a task list at `/do`) have no
 * owning task node and resolve to `undefined`.
 * @param graph The hierarchical or flat graph to search
 * @param pointer The indexed RFC 6901 JSON Pointer to locate
 * @returns The nearest owning task node, if any
 */
export function getNodeAtPointer(graph: Graph | FlatGraph, pointer: string): GraphNode | FlatGraphNode | undefined {
  return getGraphNodes(graph)
    .filter(
      (node): node is (GraphNode | FlatGraphNode) & { taskReference: string } =>
        !!node.taskReference && (pointer === node.taskReference || pointer.startsWith(`${node.taskReference}/`)),
    )
    .sort((left, right) => right.taskReference.length - left.taskReference.length)[0];
}
