import { buildFlatGraph, buildGraph, Graph, GraphNodeType } from '../../src/lib/graph-builder';
import { Task, Workflow } from '../../src/lib/generated/definitions/specification';

const document = {
  dsl: '1.1.0',
  namespace: 'test',
  name: 'nested-task-lists',
  version: '0.1.0',
};

const iterator = {
  item: 'message',
  do: [{ first: { set: { value: 1 } } }, { second: { wait: { seconds: 1 } } }],
};

const listenTask = (foreach?: unknown): Task =>
  ({
    listen: { to: { one: { with: { type: 'com.example.event' } } } },
    ...(foreach !== undefined && { foreach }),
  }) as Task;

const asyncApiTask = (foreach?: unknown): Task =>
  ({
    call: 'asyncapi',
    with: {
      document: { endpoint: 'https://example.com/asyncapi.json' },
      operation: 'onMessage',
      subscription: { consume: { amount: 2 }, ...(foreach !== undefined && { foreach }) },
    },
  }) as Task;

/** Edges as `source -> target`, as a set: the builder emits them in recursion order, not flow order. */
const edgesOf = (graph: Graph): Set<string> =>
  new Set(graph.edges.map((edge) => `${edge.sourceId} -> ${edge.targetId}`));

const resolvePointer = (value: unknown, pointer: string): unknown =>
  pointer
    .split('/')
    .slice(1)
    .reduce<unknown>((current, segment) => (current as Record<string, unknown>)[segment], value);

describe('Tasks holding a nested task list', () => {
  it.each([
    { name: 'listen', task: listenTask(iterator), type: GraphNodeType.Listen, listPath: '/foreach/do' },
    {
      name: 'asyncapi call',
      task: asyncApiTask(iterator),
      type: GraphNodeType.Call,
      listPath: '/with/subscription/foreach/do',
    },
  ])('builds a $name with nested tasks as a subgraph', ({ task, type, listPath }) => {
    const workflow: Workflow = { document, do: [{ consume: task }, { after: { set: { done: true } } }] };
    const graph = buildGraph(workflow);

    const subgraph = graph.nodes.find((node) => node.id === '/do/consume') as Graph;
    expect(subgraph.type).toBe(type);
    expect(subgraph.task).toBe(task);
    expect(subgraph.taskReference).toBe('/do/0/consume');

    const childIds = subgraph.nodes.map((node) => node.id);
    expect(childIds).toEqual([
      'port-/do/consume-entry-node',
      'port-/do/consume-exit-node',
      `/do/consume${listPath}/first`,
      `/do/consume${listPath}/second`,
    ]);
    const children = subgraph.nodes.filter((node) => node.taskReference);
    expect(children.map((node) => node.taskReference)).toEqual([
      `/do/0/consume${listPath}/0/first`,
      `/do/0/consume${listPath}/1/second`,
    ]);
    children.forEach((node) => expect(resolvePointer(workflow, node.taskReference!)).toBe(node.task));

    expect(edgesOf(subgraph)).toEqual(
      new Set([
        `port-/do/consume-entry-node -> /do/consume${listPath}/first`,
        `/do/consume${listPath}/first -> /do/consume${listPath}/second`,
        `/do/consume${listPath}/second -> port-/do/consume-exit-node`,
      ]),
    );
    expect(edgesOf(graph)).toEqual(
      new Set([
        'root-entry-node -> port-/do/consume-entry-node',
        'port-/do/consume-exit-node -> /do/after',
        '/do/after -> root-exit-node',
      ]),
    );
  });

  it('parents the nested tasks to their task in the flat graph', () => {
    const flat = buildFlatGraph({ document, do: [{ consume: listenTask(iterator) }] });
    const parentIds = flat.nodes
      .filter((node) => node.id.startsWith('/do/consume/foreach/do/'))
      .map((node) => node.parentId);
    expect(parentIds).toEqual(['/do/consume', '/do/consume']);
  });

  it.each([
    { name: 'listen without foreach', task: listenTask() },
    { name: 'listen with an empty foreach.do', task: listenTask({ item: 'event', do: [] }) },
    { name: 'listen with a foreach without do', task: listenTask({ item: 'event' }) },
    { name: 'asyncapi call without foreach', task: asyncApiTask() },
    { name: 'asyncapi call with an empty foreach.do', task: asyncApiTask({ do: [] }) },
    {
      name: 'function call whose arguments have the same shape',
      task: { call: 'myFunction', with: { subscription: { foreach: iterator } } } as Task,
    },
    {
      name: 'http call',
      task: { call: 'http', with: { method: 'get', endpoint: 'https://example.com' } } as Task,
    },
  ])('keeps a $name as a leaf node', ({ task }) => {
    const graph = buildGraph({ document, do: [{ consume: task }] });
    const node = graph.nodes.find((n) => n.id === '/do/consume');
    expect(node).toBeDefined();
    expect((node as Graph).nodes).toBeUndefined();
    expect(edgesOf(graph)).toEqual(new Set(['root-entry-node -> /do/consume', '/do/consume -> root-exit-node']));
  });
});
