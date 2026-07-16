import {
  buildFlatGraph,
  buildGraph,
  flattenGraph,
  getNodeAtPointer,
  getNodeByTaskReference,
  Graph,
  GraphNode,
  GraphNodeType,
} from '../../src/lib/graph-builder';
import { Workflow } from '../../src/lib/generated/definitions/specification';

const document = {
  dsl: '1.0.3',
  namespace: 'test',
  name: 'node-identity',
  version: '0.1.0',
};

const workflowWith = (tasks: Workflow['do']): Workflow => ({ document, do: tasks });

const collectNodes = (graph: Graph): GraphNode[] => {
  const nodes: GraphNode[] = [graph];
  graph.nodes.forEach((node) => {
    nodes.push(node);
    if (Array.isArray((node as Graph).nodes)) nodes.push(...collectNodes(node as Graph).slice(1));
  });
  return nodes;
};

const resolvePointer = (value: unknown, pointer: string): unknown =>
  pointer
    .split('/')
    .slice(1)
    .map((segment) => segment.replace(/~1/g, '/').replace(/~0/g, '~'))
    .reduce<unknown>((current, segment) => (current as Record<string, unknown>)[segment], value);

describe('Graph node identity', () => {
  it('keeps task and unaffected edge ids stable when siblings are inserted or removed', () => {
    const base = workflowWith([
      { a: { set: { value: 'a' } } },
      { b: { set: { value: 'b' } } },
      { c: { set: { value: 'c' } } },
    ]);
    const inserted = workflowWith([
      { added: { set: { value: 'new' } } },
      { a: { set: { value: 'a' } } },
      { b: { set: { value: 'b' } } },
      { c: { set: { value: 'c' } } },
    ]);
    const removed = workflowWith([{ a: { set: { value: 'a' } } }, { c: { set: { value: 'c' } } }]);

    const baseGraph = buildGraph(base);
    const insertedGraph = buildGraph(inserted);
    const removedGraph = buildGraph(removed);

    expect(baseGraph.nodes.filter((node) => node.task).map((node) => node.id)).toEqual(['/do/a', '/do/b', '/do/c']);
    expect(insertedGraph.nodes.filter((node) => node.task).map((node) => node.id)).toEqual([
      '/do/added',
      '/do/a',
      '/do/b',
      '/do/c',
    ]);
    expect(removedGraph.nodes.filter((node) => node.task).map((node) => node.id)).toEqual(['/do/a', '/do/c']);

    const baseEdge = baseGraph.edges.find((edge) => edge.sourceId === '/do/a' && edge.targetId === '/do/b');
    const insertedEdge = insertedGraph.edges.find((edge) => edge.sourceId === '/do/a' && edge.targetId === '/do/b');
    expect(insertedEdge?.id).toBe(baseEdge?.id);
  });

  it('keeps edge ids stable when a transition label changes', () => {
    const withCondition = (expression: string): Workflow =>
      workflowWith([{ a: { set: { value: 'a' } } }, { b: { set: { value: 'b' }, if: expression } }]);
    const firstGraph = buildGraph(withCondition('${ .count > 1 }'));
    const secondGraph = buildGraph(withCondition('${ .count > 2 }'));
    const firstEdge = firstGraph.edges.find((edge) => edge.sourceId === '/do/a' && edge.targetId === '/do/b');
    const secondEdge = secondGraph.edges.find((edge) => edge.sourceId === '/do/a' && edge.targetId === '/do/b');

    expect(firstEdge?.label).toBe('${ .count > 1 }');
    expect(secondEdge?.label).toBe('${ .count > 2 }');
    expect(secondEdge?.id).toBe(firstEdge?.id);
  });

  it('assigns document-faithful references only to actual task nodes', () => {
    const workflow = workflowWith([
      {
        loop: {
          for: { each: 'item', in: '.items' },
          do: [{ child: { set: { value: true } } }],
        },
      },
      {
        split: {
          fork: { branches: [{ left: { set: { value: 'left' } } }, { right: { set: { value: 'right' } } }] },
        },
      },
      {
        guarded: {
          try: [{ attempt: { set: { value: 'try' } } }],
          catch: { do: [{ recover: { set: { value: 'catch' } } }] },
        },
      },
    ]);

    const graph = buildGraph(workflow);
    const nodes = collectNodes(graph);
    const referencedNodes = nodes.filter((node) => node.taskReference);

    referencedNodes.forEach((node) => expect(resolvePointer(workflow, node.taskReference!)).toBe(node.task));
    expect(referencedNodes.map((node) => node.taskReference)).toContain('/do/0/loop/do/0/child');

    nodes
      .filter((node) =>
        [
          GraphNodeType.Root,
          GraphNodeType.Start,
          GraphNodeType.End,
          GraphNodeType.Entry,
          GraphNodeType.Exit,
          GraphNodeType.Try,
          GraphNodeType.Catch,
        ].includes(node.type),
      )
      .forEach((node) => expect(node.taskReference).toBeUndefined());
  });

  it('looks up exact task references and the deepest task owning a workflow pointer', () => {
    const workflow = workflowWith([{ a: { set: { value: true } } }]);
    const graph = buildGraph(workflow);
    const flatGraph = flattenGraph(graph);

    expect(getNodeByTaskReference(graph, '/do/0/a')?.id).toBe('/do/a');
    expect(getNodeByTaskReference(flatGraph, '/do/0/a')?.id).toBe('/do/a');
    expect(getNodeByTaskReference(graph, '/do/0/missing')).toBeUndefined();
    expect(getNodeAtPointer(graph, '/do/0/a/set/value')?.id).toBe('/do/a');
    expect(getNodeAtPointer(flatGraph, '/do/0/a/set/value')?.id).toBe('/do/a');
    expect(getNodeAtPointer(graph, '/do/0/ab/set/value')).toBeUndefined();
    expect(getNodeAtPointer(graph, '/do')).toBeUndefined();
  });

  it('escapes slash and tilde characters in ids and task references', () => {
    const workflow = workflowWith([{ 'a/b~c': { set: { value: true } } }]);
    const graph = buildGraph(workflow);
    const node = graph.nodes.find((candidate) => candidate.task);

    expect(node?.id).toBe('/do/a~1b~0c');
    expect(node?.taskReference).toBe('/do/0/a~1b~0c');
    expect(resolvePointer(workflow, node!.taskReference!)).toBe(node?.task);
    expect(getNodeByTaskReference(graph, '/do/0/a~1b~0c')).toBe(node);
  });

  it('qualifies identical task names by their containing task list', () => {
    const workflow = workflowWith([
      { first: { do: [{ notify: { set: { source: 'first' } } }] } },
      { second: { do: [{ notify: { set: { source: 'second' } } }] } },
    ]);
    const ids = buildFlatGraph(workflow).nodes.map((node) => node.id);

    expect(ids).toContain('/do/first/do/notify');
    expect(ids).toContain('/do/second/do/notify');
  });

  it('keeps non-root port ids distinct from valid task ids with port-like names', () => {
    const workflow = workflowWith([
      { x: { do: [{ inner: { set: { value: true } } }] } },
      { 'x-entry-node': { set: { value: false } } },
    ]);
    const graph = buildGraph(workflow);
    const flatGraph = flattenGraph(graph);
    const simplifiedGraph = buildFlatGraph(workflow, true);
    const ids = flatGraph.nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain('port-/do/x-entry-node');
    expect(ids).toContain('/do/x-entry-node');
    expect(
      graph.edges.some((edge) => edge.sourceId === 'port-/do/x-exit-node' && edge.targetId === '/do/x-entry-node'),
    ).toBe(true);
    expect(simplifiedGraph.nodes.some((node) => node.id === '/do/x-entry-node')).toBe(true);
    expect(
      simplifiedGraph.edges.some((edge) => edge.sourceId === '/do/x/do/inner' && edge.targetId === '/do/x-entry-node'),
    ).toBe(true);
  });
});
