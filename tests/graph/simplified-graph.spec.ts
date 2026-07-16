import { Classes } from '../../src/lib/generated/classes';
import {
  buildFlatGraph,
  buildGraph,
  flattenEdges,
  flattenGraph,
  flattenNodes,
  GraphNodeType,
  remapEdges,
} from '../../src/lib/graph-builder';

describe('Workflow to Simplified Graph', () => {
  it('should build a simplified graph for a workflow with a Set task, using the buildFlatGraph function', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: set
  version: '0.1.0'
do:
  - initialize:
      set:
        foo: bar`);
    const graph = buildFlatGraph(workflow, true);
    expect(graph).toBeDefined();

    // start, initialize, end
    expect(graph.nodes.find((n) => n.type === GraphNodeType.Start)).toBeDefined();
    expect(graph.nodes.find((n) => n.type === GraphNodeType.End)).toBeDefined();
    const initializeNode = graph.nodes.find((n) => n.id === '/do/initialize');
    expect(initializeNode?.type).toBe(GraphNodeType.Set);

    // start -> initialize -> end
    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/initialize')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/initialize' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(3); // start --> initialize --> end
    expect(graph.edges.length).toBe(2);
  });

  it('should build a simplified graph for a workflow with a For task, producing a subgraph', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: for-example
  version: '0.1.0'
do:
  - checkup:
      for:
        each: pet
        in: .pets
        at: index
      while: .vet != null
      do:
        - waitForCheckup:
            listen:
              to:
                one:
                  with:
                    type: com.fake.petclinic.pets.checkup.completed.v2
            output:
              as: '.pets + [{ "id": $pet.id }]'`);
    const graph = buildFlatGraph(workflow, true);
    expect(graph).toBeDefined();

    // start, checkup (For subgraph node), waitForCheckup, end
    expect(graph.nodes.find((n) => n.type === GraphNodeType.Start)).toBeDefined();
    expect(graph.nodes.find((n) => n.type === GraphNodeType.End)).toBeDefined();
    expect(graph.nodes.find((n) => n.id === '/do/checkup')?.type).toBe(GraphNodeType.For);
    expect(graph.nodes.find((n) => n.id === '/do/checkup/do/waitForCheckup')?.type).toBe(GraphNodeType.Listen);

    // After remapping, the inner entry/exit ports are collapsed, so:
    // root-entry -> waitForCheckup, waitForCheckup -> root-exit
    expect(
      graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/checkup/do/waitForCheckup'),
    ).toBeDefined();
    expect(
      graph.edges.find((e) => e.sourceId === '/do/checkup/do/waitForCheckup' && e.targetId === 'root-exit-node'),
    ).toBeDefined();

    expect(graph.nodes.length).toBe(4); // start --[--> waitForCheckup --]--> end
    expect(graph.edges.length).toBe(2);
  });

  it('should flatten a graph and optionally remove ports', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: for-example
  version: '0.1.0'
do:
  - checkup:
      for:
        each: pet
        in: .pets
        at: index
      while: .vet != null
      do:
        - waitForCheckup:
            listen:
              to:
                one:
                  with:
                    type: com.fake.petclinic.pets.checkup.completed.v2
            output:
              as: '.pets + [{ "id": $pet.id }]'`);
    const graph = buildGraph(workflow);
    const fullFlatGraph = flattenGraph(graph);
    const simplifiedFlatGraph = flattenGraph(graph, true);

    expect(fullFlatGraph).toBeDefined();
    expect(fullFlatGraph.nodes.length).toBe(6); // start --> [entry --> waitForCheckup --> exit] --> end
    expect(fullFlatGraph.edges.length).toBe(4);

    expect(simplifiedFlatGraph).toBeDefined();
    expect(simplifiedFlatGraph.nodes.length).toBe(4); // start --[--> waitForCheckup --]--> end
    expect(simplifiedFlatGraph.edges.length).toBe(2);
  });

  it('flattenEdges should hoist edges from nested subgraphs into a single collection', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: for-flatten-edges
  version: '0.1.0'
do:
  - checkup:
      for:
        each: pet
        in: .pets
      do:
        - waitForCheckup:
            listen:
              to:
                one:
                  with:
                    type: com.fake.petclinic.pets.checkup.completed.v2`);
    const graph = buildGraph(workflow);
    const edges = flattenEdges(graph);

    // Root has 2 edges (start -> checkup-entry, checkup-exit -> end).
    // The For subgraph has 2 edges (entry -> waitForCheckup, waitForCheckup -> exit).
    expect(edges.length).toBe(4);
    expect(edges.some((e) => e.sourceId === 'root-entry-node')).toBe(true);
    expect(edges.some((e) => e.targetId === 'root-exit-node')).toBe(true);
    expect(edges.some((e) => e.sourceId.endsWith('waitForCheckup'))).toBe(true);
  });

  it('flattenNodes should hoist nodes from nested subgraphs and set parentId on nested entries', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: for-flatten-nodes
  version: '0.1.0'
do:
  - checkup:
      for:
        each: pet
        in: .pets
      do:
        - waitForCheckup:
            listen:
              to:
                one:
                  with:
                    type: com.fake.petclinic.pets.checkup.completed.v2`);
    const graph = buildGraph(workflow);
    const nodes = graph.nodes.flatMap(flattenNodes);

    // start, end, For subgraph, For entry, For exit, waitForCheckup
    expect(nodes.length).toBe(6);
    const waitNode = nodes.find((n) => n.label === 'waitForCheckup');
    expect(waitNode).toBeDefined();
    // Nested node's parentId should point at its enclosing subgraph.
    expect(waitNode?.parentId).toBe('/do/checkup');
    // Root's direct children should have 'root' as parentId.
    expect(nodes.find((n) => n.type === GraphNodeType.Start)?.parentId).toBe('root');
    expect(nodes.find((n) => n.type === GraphNodeType.End)?.parentId).toBe('root');
  });

  it('remapEdges should collapse edges passing through entry/exit ports into direct source-to-target edges', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: remap-edges
  version: '0.1.0'
do:
  - checkup:
      for:
        each: pet
        in: .pets
      do:
        - waitForCheckup:
            listen:
              to:
                one:
                  with:
                    type: com.fake.petclinic.pets.checkup.completed.v2`);
    const graph = buildGraph(workflow);
    const edges = flattenEdges(graph);
    const remapped = remapEdges(edges);

    // After remapping, no edge should lead to an inner entry/exit port node.
    const leadsToInnerPort = remapped.some(
      (e) =>
        e.targetId !== 'root-exit-node' && (e.targetId.endsWith('-entry-node') || e.targetId.endsWith('-exit-node')),
    );
    expect(leadsToInnerPort).toBe(false);

    // The original graph had 4 edges routed via ports; after remapping we should
    // end up with exactly 2 direct edges: root-entry -> waitForCheckup, waitForCheckup -> root-exit.
    expect(remapped.length).toBe(2);
    expect(
      remapped.some((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/checkup/do/waitForCheckup'),
    ).toBe(true);
    expect(
      remapped.some((e) => e.sourceId === '/do/checkup/do/waitForCheckup' && e.targetId === 'root-exit-node'),
    ).toBe(true);
  });

  it('remapEdges should concatenate edge labels when traversing labelled port edges', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: remap-labels
  version: '0.1.0'
do:
  - outer:
      if: \${ .flag == true }
      do:
        - inner:
            set:
              ok: true`);
    const graph = buildGraph(workflow);
    const edges = flattenEdges(graph);
    const remapped = remapEdges(edges);

    const intoInner = remapped.find((e) => e.targetId.endsWith('inner'));
    expect(intoInner).toBeDefined();
    expect(intoInner?.label).toContain('${ .flag == true }');
  });

  it('buildFlatGraph should keep inner entry/exit ports by default and drop them when removePorts is true', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: build-flat-defaults
  version: '0.1.0'
do:
  - group:
      do:
        - inner:
            set:
              foo: bar`);

    const withPorts = buildFlatGraph(workflow);
    // The inner Do subgraph's entry/exit port nodes must be preserved by default.
    expect(withPorts.nodes.some((n) => n.type === GraphNodeType.Entry)).toBe(true);
    expect(withPorts.nodes.some((n) => n.type === GraphNodeType.Exit)).toBe(true);
    // The root Start/End nodes are always present.
    expect(withPorts.nodes.some((n) => n.type === GraphNodeType.Start)).toBe(true);
    expect(withPorts.nodes.some((n) => n.type === GraphNodeType.End)).toBe(true);

    const withoutPorts = buildFlatGraph(workflow, true);
    // Inner entry/exit ports are stripped.
    expect(withoutPorts.nodes.some((n) => n.type === GraphNodeType.Entry)).toBe(false);
    expect(withoutPorts.nodes.some((n) => n.type === GraphNodeType.Exit)).toBe(false);
    // Root Start/End nodes are preserved (they are kept as anchors).
    expect(withoutPorts.nodes.some((n) => n.type === GraphNodeType.Start)).toBe(true);
    expect(withoutPorts.nodes.some((n) => n.type === GraphNodeType.End)).toBe(true);
  });
});
