import { Specification } from '../../src';
import { Classes } from '../../src/lib/generated/classes';
import { buildGraph, Graph, GraphNodeType } from '../../src/lib/graph-builder';

describe('Workflow to Graph', () => {
  it('should build a graph for a workflow with a Set task, using the buildGraph function', () => {
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
    const graph = buildGraph(workflow);
    expect(graph).toBeDefined();

    const initializeNode = graph.nodes.find((n) => n.id === '/do/initialize');
    expect(initializeNode).toBeDefined();
    expect(initializeNode?.type).toBe(GraphNodeType.Set);
    expect(initializeNode?.label).toBe('initialize');

    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/initialize')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/initialize' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(3); // start --> initialize --> end
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with a Set task, using the instance method', () => {
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
    const graph = workflow.toGraph();
    expect(graph).toBeDefined();

    const initializeNode = graph.nodes.find((n) => n.id === '/do/initialize');
    expect(initializeNode).toBeDefined();
    expect(initializeNode?.type).toBe(GraphNodeType.Set);

    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/initialize')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/initialize' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(3); // start --> initialize --> end
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with a Set task, using the static method', () => {
    const workflow = {
      document: {
        dsl: '1.0.3',
        name: 'set',
        version: '1.0.0',
        namespace: 'test',
      },
      do: [
        {
          initialize: {
            set: {
              foo: 'bar',
            },
          },
        },
      ],
    } as Specification.Workflow;
    const graph = Classes.Workflow.toGraph(workflow);
    expect(graph).toBeDefined();

    const initializeNode = graph.nodes.find((n) => n.id === '/do/initialize');
    expect(initializeNode).toBeDefined();
    expect(initializeNode?.type).toBe(GraphNodeType.Set);

    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/initialize')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/initialize' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(3); // start --> initialize --> end
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with multiple Set tasks', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: set
  version: '0.1.0'
do:
  - step1:
      set:
        foo: bar
  - step2:
      set:
        foo2: bar
  - step3:
      set:
        foo3: bar`);
    const graph = buildGraph(workflow);
    expect(graph).toBeDefined();

    const step1 = graph.nodes.find((n) => n.id === '/do/step1');
    const step2 = graph.nodes.find((n) => n.id === '/do/step2');
    const step3 = graph.nodes.find((n) => n.id === '/do/step3');
    expect(step1?.type).toBe(GraphNodeType.Set);
    expect(step2?.type).toBe(GraphNodeType.Set);
    expect(step3?.type).toBe(GraphNodeType.Set);

    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/step1')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/step1' && e.targetId === '/do/step2')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/step2' && e.targetId === '/do/step3')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/step3' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(5); // start --> step1 --> step2 --> step3 --> end
    expect(graph.edges.length).toBe(4);
  });

  it('should build a graph for a workflow with a task containing an If clause, producing an alternative edge', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: set
  version: '0.1.0'
do:
  - initialize:
      if: \${ input.data == true }
      set:
        foo: bar`);
    const graph = buildGraph(workflow);
    expect(graph).toBeDefined();

    const initializeNode = graph.nodes.find((n) => n.id === '/do/initialize');
    expect(initializeNode?.type).toBe(GraphNodeType.Set);

    // Conditional edge: start -- (if expression) --> initialize
    const conditionalEdge = graph.edges.find(
      (e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/initialize',
    );
    expect(conditionalEdge?.label).toBe('${ input.data == true }');

    // Bypass edge: start -> end (taken when the condition is false)
    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === 'root-exit-node')).toBeDefined();

    // Completion edge: initialize -> end
    expect(graph.edges.find((e) => e.sourceId === '/do/initialize' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(3); // start --> initialize --> end
    expect(graph.edges.length).toBe(3); //       ----------------->
  });

  it('should build a graph for a workflow with a For task, producing a subgraph', () => {
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
    expect(graph).toBeDefined();

    const forSubgraph = graph.nodes.find((node) => node.id === '/do/checkup') as Graph;
    expect(forSubgraph).toBeDefined();
    expect(forSubgraph.type).toBe(GraphNodeType.For);

    // Root edges wire the For subgraph's entry/exit ports into the root pipeline.
    expect(
      graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === 'port-/do/checkup-entry-node'),
    ).toBeDefined();
    expect(
      graph.edges.find((e) => e.sourceId === 'port-/do/checkup-exit-node' && e.targetId === 'root-exit-node'),
    ).toBeDefined();
    expect(graph.nodes.length).toBe(3); // start --> checkup --> end
    expect(graph.edges.length).toBe(2);

    // Subgraph internals: entry -> waitForCheckup -> exit
    const waitNode = forSubgraph.nodes.find((n) => n.id === '/do/checkup/do/waitForCheckup');
    expect(waitNode?.type).toBe(GraphNodeType.Listen);
    expect(
      forSubgraph.edges.find(
        (e) => e.sourceId === 'port-/do/checkup-entry-node' && e.targetId === '/do/checkup/do/waitForCheckup',
      ),
    ).toBeDefined();
    expect(
      forSubgraph.edges.find(
        (e) => e.sourceId === '/do/checkup/do/waitForCheckup' && e.targetId === 'port-/do/checkup-exit-node',
      ),
    ).toBeDefined();
    expect(forSubgraph.nodes.length).toBe(3); // entry --> waitForCheckup --> exit
    expect(forSubgraph.edges.length).toBe(2);
  });

  it('should build an empty graph', () => {
    const graph = buildGraph({} as Specification.Workflow);
    expect(graph).toBeDefined();

    // Only the root Start and End port nodes should be present.
    expect(graph.nodes.find((n) => n.type === GraphNodeType.Start)?.id).toBe('root-entry-node');
    expect(graph.nodes.find((n) => n.type === GraphNodeType.End)?.id).toBe('root-exit-node');

    // A single edge should go straight from start to end.
    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(2); // start --> end
    expect(graph.edges.length).toBe(1);
  });

  it('should merge duplicate switch transitions that resolve to the same target', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: switch
  version: '0.1.0'
do:
  - decide:
      switch:
        - first:
            when: \${ input.data == 1 }
            then: done
        - second:
            when: \${ input.data == 2 }
            then: done
        - otherwise:
            then: done
  - done:
      set:
        foo: bar`);
    const graph = buildGraph(workflow);
    const decideToDoneEdges = graph.edges.filter(
      (edge) => edge.sourceId === '/do/decide' && edge.targetId === '/do/done',
    );

    expect(decideToDoneEdges).toHaveLength(1);
    expect(decideToDoneEdges[0]?.label).toBe('first / second / otherwise');
  });

  it('should build a graph for a workflow with a cyclic then directive (taskA -> taskB -> taskA)', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: cycle-test
  version: '0.1.0'
do:
  - taskA:
      set:
        step: a
      then: taskB
  - taskB:
      set:
        step: b
      then: taskA`);
    const graph = buildGraph(workflow);
    expect(graph).toBeDefined();

    const taskA = graph.nodes.find((n) => n.id === '/do/taskA');
    const taskB = graph.nodes.find((n) => n.id === '/do/taskB');
    expect(taskA?.type).toBe(GraphNodeType.Set);
    expect(taskB?.type).toBe(GraphNodeType.Set);

    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/taskA')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/taskA' && e.targetId === '/do/taskB')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/taskB' && e.targetId === '/do/taskA')).toBeDefined();

    expect(graph.nodes.length).toBe(4); // start, taskA, taskB, end
    expect(graph.edges.length).toBe(3); // start->taskA, taskA->taskB, taskB->taskA
  });

  it('should build a graph for a workflow with a self-referencing then directive', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: self-loop
  version: '0.1.0'
do:
  - loopTask:
      set:
        counter: 1
      then: loopTask`);
    const graph = buildGraph(workflow);
    expect(graph).toBeDefined();

    const loopTask = graph.nodes.find((n) => n.id === '/do/loopTask');
    expect(loopTask?.type).toBe(GraphNodeType.Set);

    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/loopTask')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/loopTask' && e.targetId === '/do/loopTask')).toBeDefined();

    expect(graph.nodes.length).toBe(3); // start, loopTask, end
    expect(graph.edges.length).toBe(2); // start->loopTask, loopTask->loopTask
  });

  it('should build a graph for a recursive workflow with DoTask cycles', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: recursive-workflow
  version: '0.1.0'
do:
  - awaitForDevWork:
      do:
        - notifyDev:
            set:
              status: waiting-for-dev
      then: awaitDetailsFromQA
  - awaitDetailsFromQA:
      do:
        - notifyQA:
            set:
              status: waiting-for-qa
      then: awaitForDevWork`);
    const graph = buildGraph(workflow);
    expect(graph).toBeDefined();

    const devSubgraph = graph.nodes.find((n) => n.id === '/do/awaitForDevWork') as Graph;
    const qaSubgraph = graph.nodes.find((n) => n.id === '/do/awaitDetailsFromQA') as Graph;
    expect(devSubgraph?.type).toBe(GraphNodeType.Do);
    expect(qaSubgraph?.type).toBe(GraphNodeType.Do);
    expect(devSubgraph.nodes.find((n) => n.id === '/do/awaitForDevWork/do/notifyDev')).toBeDefined();
    expect(qaSubgraph.nodes.find((n) => n.id === '/do/awaitDetailsFromQA/do/notifyQA')).toBeDefined();

    // Entry edge into the first subgraph
    expect(
      graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === 'port-/do/awaitForDevWork-entry-node'),
    ).toBeDefined();
    // Forward edge from dev -> qa (subgraph exit to subgraph entry)
    expect(
      graph.edges.find(
        (e) =>
          e.sourceId === 'port-/do/awaitForDevWork-exit-node' &&
          e.targetId === 'port-/do/awaitDetailsFromQA-entry-node',
      ),
    ).toBeDefined();
    // Back edge: qa -> dev
    expect(
      graph.edges.find(
        (e) =>
          e.sourceId === 'port-/do/awaitDetailsFromQA-exit-node' &&
          e.targetId === 'port-/do/awaitForDevWork-entry-node',
      ),
    ).toBeDefined();

    expect(graph.nodes.length).toBe(4); // start, end, awaitForDevWork (subgraph), awaitDetailsFromQA (subgraph)
    expect(graph.edges.length).toBe(3); // start->awaitForDevWork, awaitForDevWork->awaitDetailsFromQA, awaitDetailsFromQA->awaitForDevWork
  });

  it('should correctly resolve then:end from a deeply nested task (DoTask inside DoTask)', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: nested-end
  version: '0.1.0'
do:
  - outerDo:
      do:
        - innerDo:
            do:
              - deepTask:
                  set:
                    value: done
                  then: end`);
    const graph = buildGraph(workflow);
    expect(graph).toBeDefined();
  }, 5000);

  it('should mark the root graph with the Root node type and attach Start/End port nodes', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: root-shape
  version: '0.1.0'
do:
  - step1:
      set:
        foo: bar`);
    const graph = buildGraph(workflow);
    expect(graph.type).toBe(GraphNodeType.Root);
    expect(graph.id).toBe('root');
    expect(graph.entryNode?.type).toBe(GraphNodeType.Start);
    expect(graph.exitNode?.type).toBe(GraphNodeType.End);
    expect(graph.parent).toBeUndefined();
  });

  it('should build a graph for a workflow with a Call task', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: call-example
  version: '0.1.0'
do:
  - fetchOrder:
      call: http
      with:
        method: get
        endpoint: https://example.com/orders/1`);
    const graph = buildGraph(workflow);

    const callNode = graph.nodes.find((n) => n.id === '/do/fetchOrder');
    expect(callNode).toBeDefined();
    expect(callNode?.type).toBe(GraphNodeType.Call);
    expect(callNode?.label).toBe('fetchOrder');

    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/fetchOrder')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/fetchOrder' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(3); // start --> fetchOrder --> end
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with an Emit task', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: emit-example
  version: '0.1.0'
do:
  - notify:
      emit:
        event:
          with:
            source: https://example.com/service
            type: com.example.order.placed.v1`);
    const graph = buildGraph(workflow);

    const emitNode = graph.nodes.find((n) => n.id === '/do/notify');
    expect(emitNode).toBeDefined();
    expect(emitNode?.type).toBe(GraphNodeType.Emit);

    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/notify')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/notify' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(3);
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with a Fork task, producing a subgraph with one node per branch', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: fork-example
  version: '0.1.0'
do:
  - split:
      fork:
        branches:
          - branchA:
              set:
                a: 1
          - branchB:
              set:
                b: 2`);
    const graph = buildGraph(workflow);

    const forkSubgraph = graph.nodes.find((n) => n.id === '/do/split') as Graph;
    expect(forkSubgraph).toBeDefined();
    expect(forkSubgraph.type).toBe(GraphNodeType.Fork);

    const branchA = forkSubgraph.nodes.find((n) => n.id === '/do/split/fork/branches/branchA');
    const branchB = forkSubgraph.nodes.find((n) => n.id === '/do/split/fork/branches/branchB');
    expect(branchA?.type).toBe(GraphNodeType.Set);
    expect(branchB?.type).toBe(GraphNodeType.Set);

    // Each branch fans out from the fork subgraph entry and joins its exit.
    expect(
      forkSubgraph.edges.find(
        (e) => e.sourceId === 'port-/do/split-entry-node' && e.targetId === '/do/split/fork/branches/branchA',
      ),
    ).toBeDefined();
    expect(
      forkSubgraph.edges.find(
        (e) => e.sourceId === 'port-/do/split-entry-node' && e.targetId === '/do/split/fork/branches/branchB',
      ),
    ).toBeDefined();
    expect(
      forkSubgraph.edges.find(
        (e) => e.sourceId === '/do/split/fork/branches/branchA' && e.targetId === 'port-/do/split-exit-node',
      ),
    ).toBeDefined();
    expect(
      forkSubgraph.edges.find(
        (e) => e.sourceId === '/do/split/fork/branches/branchB' && e.targetId === 'port-/do/split-exit-node',
      ),
    ).toBeDefined();

    // entry, exit, branchA, branchB
    expect(forkSubgraph.nodes.length).toBe(4);
    // entry -> branchA, entry -> branchB, branchA -> exit, branchB -> exit
    expect(forkSubgraph.edges.length).toBe(4);
  });

  it('should build a graph for a workflow with a standalone Listen task', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: listen-example
  version: '0.1.0'
do:
  - waitForOrder:
      listen:
        to:
          one:
            with:
              type: com.example.order.placed.v1`);
    const graph = buildGraph(workflow);

    const listenNode = graph.nodes.find((n) => n.id === '/do/waitForOrder');
    expect(listenNode).toBeDefined();
    expect(listenNode?.type).toBe(GraphNodeType.Listen);

    expect(
      graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/waitForOrder'),
    ).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/waitForOrder' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(3);
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with a Raise task', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: raise-example
  version: '0.1.0'
do:
  - fail:
      raise:
        error:
          type: https://example.com/errors/validation
          status: 400
          title: Validation Error`);
    const graph = buildGraph(workflow);

    const raiseNode = graph.nodes.find((n) => n.id === '/do/fail');
    expect(raiseNode).toBeDefined();
    expect(raiseNode?.type).toBe(GraphNodeType.Raise);

    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/fail')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/fail' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(3);
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with a Run task', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: run-example
  version: '0.1.0'
do:
  - runScript:
      run:
        shell:
          command: echo "hello"`);
    const graph = buildGraph(workflow);

    const runNode = graph.nodes.find((n) => n.id === '/do/runScript');
    expect(runNode).toBeDefined();
    expect(runNode?.type).toBe(GraphNodeType.Run);

    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/runScript')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/runScript' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(3);
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with a Wait task', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: wait-example
  version: '0.1.0'
do:
  - pause:
      wait:
        seconds: 5`);
    const graph = buildGraph(workflow);

    const waitNode = graph.nodes.find((n) => n.id === '/do/pause');
    expect(waitNode).toBeDefined();
    expect(waitNode?.type).toBe(GraphNodeType.Wait);

    expect(graph.edges.find((e) => e.sourceId === 'root-entry-node' && e.targetId === '/do/pause')).toBeDefined();
    expect(graph.edges.find((e) => e.sourceId === '/do/pause' && e.targetId === 'root-exit-node')).toBeDefined();

    expect(graph.nodes.length).toBe(3);
    expect(graph.edges.length).toBe(2);
  });

  it('should build a graph for a workflow with an explicit Do task, producing a subgraph', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: do-example
  version: '0.1.0'
do:
  - group:
      do:
        - inner1:
            set:
              a: 1
        - inner2:
            set:
              b: 2`);
    const graph = buildGraph(workflow);

    const doSubgraph = graph.nodes.find((n) => n.id === '/do/group') as Graph;
    expect(doSubgraph).toBeDefined();
    expect(doSubgraph.type).toBe(GraphNodeType.Do);

    const inner1 = doSubgraph.nodes.find((n) => n.id === '/do/group/do/inner1');
    const inner2 = doSubgraph.nodes.find((n) => n.id === '/do/group/do/inner2');
    expect(inner1?.type).toBe(GraphNodeType.Set);
    expect(inner2?.type).toBe(GraphNodeType.Set);

    // entry -> inner1 -> inner2 -> exit
    expect(
      doSubgraph.edges.find((e) => e.sourceId === 'port-/do/group-entry-node' && e.targetId === '/do/group/do/inner1'),
    ).toBeDefined();
    expect(
      doSubgraph.edges.find((e) => e.sourceId === '/do/group/do/inner1' && e.targetId === '/do/group/do/inner2'),
    ).toBeDefined();
    expect(
      doSubgraph.edges.find((e) => e.sourceId === '/do/group/do/inner2' && e.targetId === 'port-/do/group-exit-node'),
    ).toBeDefined();

    // entry, exit, inner1, inner2
    expect(doSubgraph.nodes.length).toBe(4);
    // entry -> inner1, inner1 -> inner2, inner2 -> exit
    expect(doSubgraph.edges.length).toBe(3);
  });

  it('should build a graph for a Try task without a catch handler (catch without do)', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: try-nocatch
  version: '0.1.0'
do:
  - protect:
      try:
        - attempt:
            set:
              ok: true
      catch:
        as: err`);
    const graph = buildGraph(workflow);
    const tryCatchGraph = graph.nodes.find((node) => node.label === 'protect') as Graph;
    expect(tryCatchGraph).toBeDefined();
    expect(tryCatchGraph.type).toBe(GraphNodeType.TryCatch);

    const trySubgraph = tryCatchGraph.nodes.find((n) => n.type === GraphNodeType.Try) as Graph;
    expect(trySubgraph).toBeDefined();
    expect(trySubgraph.nodes.some((n) => n.label === 'attempt')).toBe(true);

    // With no catch.do, a single Catch node (not a subgraph) should be created.
    const catchNode = tryCatchGraph.nodes.find((n) => n.type === GraphNodeType.Catch);
    expect(catchNode).toBeDefined();
    expect((catchNode as Graph).nodes).toBeUndefined();
  });

  it('should build a graph for a Try task with a catch handler containing tasks, producing a catch subgraph', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: try-catch
  version: '0.1.0'
do:
  - protect:
      try:
        - attempt:
            set:
              ok: true
      catch:
        as: err
        do:
          - recover:
              set:
                recovered: true`);
    const graph = buildGraph(workflow);
    const tryCatchGraph = graph.nodes.find((node) => node.label === 'protect') as Graph;
    expect(tryCatchGraph).toBeDefined();
    expect(tryCatchGraph.type).toBe(GraphNodeType.TryCatch);

    const catchSubgraph = tryCatchGraph.nodes.find((n) => n.type === GraphNodeType.Catch) as Graph;
    expect(catchSubgraph).toBeDefined();
    expect(catchSubgraph.nodes).toBeDefined();
    expect(catchSubgraph.nodes.some((n) => n.label === 'recover')).toBe(true);
  });

  it('should build a graph for a Switch task with a default case', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: switch-default
  version: '0.1.0'
do:
  - decide:
      switch:
        - matched:
            when: \${ .value == 1 }
            then: matchedStep
        - default:
            then: defaultStep
  - matchedStep:
      set:
        path: matched
  - defaultStep:
      set:
        path: default`);
    const graph = buildGraph(workflow);
    const decideNode = graph.nodes.find((node) => node.label === 'decide');
    expect(decideNode?.type).toBe(GraphNodeType.Switch);

    const matchedEdge = graph.edges.find((e) => e.sourceId === '/do/decide' && e.targetId === '/do/matchedStep');
    const defaultEdge = graph.edges.find((e) => e.sourceId === '/do/decide' && e.targetId === '/do/defaultStep');
    expect(matchedEdge?.label).toBe('matched');
    expect(defaultEdge?.label).toBe('default');

    // Because the switch has a default case, there must be no implicit fall-through edge from decide.
    const fallthrough = graph.edges.filter(
      (e) => e.sourceId === '/do/decide' && e.targetId !== '/do/matchedStep' && e.targetId !== '/do/defaultStep',
    );
    expect(fallthrough).toHaveLength(0);
  });

  it('should honor an explicit then:exit flow directive', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: then-exit
  version: '0.1.0'
do:
  - bail:
      set:
        done: true
      then: exit
  - unreachable:
      set:
        never: true`);
    const graph = buildGraph(workflow);
    const exitEdge = graph.edges.find((e) => e.sourceId === '/do/bail' && e.targetId === 'root-exit-node');
    expect(exitEdge).toBeDefined();
  });
});
