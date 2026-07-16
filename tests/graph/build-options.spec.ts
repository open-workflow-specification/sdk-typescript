import { buildFlatGraph, buildGraph, TaskIdFactoryContext } from '../../src/lib/graph-builder';
import { Workflow } from '../../src/lib/generated/definitions/specification';
import { Classes } from '../../src/lib/generated/classes';

const document = {
  dsl: '1.0.3',
  namespace: 'test',
  name: 'build-options',
  version: '0.1.0',
};

const workflowWith = (tasks: Workflow['do']): Workflow => ({ document, do: tasks });

describe('Graph build options', () => {
  it('applies custom task ids and composes derived ids under them', () => {
    const workflow = workflowWith([
      { wrapper: { do: [{ child: { set: { value: true } } }] } },
      { other: { set: { value: false } } },
    ]);
    const flatGraph = buildFlatGraph(workflow, false, {
      taskId: ({ reference }) => (reference === '/do/0/wrapper' ? 'node-1' : undefined),
    });
    const ids = flatGraph.nodes.map((node) => node.id);

    expect(ids).toContain('node-1');
    expect(ids).toContain('port-node-1-entry-node');
    expect(ids).toContain('port-node-1-exit-node');
    expect(ids).toContain('node-1/do/child');
    expect(ids).toContain('/do/other');
    expect(ids).not.toContain('/do/wrapper');
  });

  it('provides the task, name, reference, parent id and default id to the factory', () => {
    const innerTask = { set: { value: 1 } };
    const outerTask = { do: [{ inner: innerTask }] };
    const workflow = workflowWith([{ outer: outerTask }]);
    const calls: TaskIdFactoryContext[] = [];
    buildGraph(workflow, {
      taskId: (factoryContext) => {
        calls.push(factoryContext);
        return undefined;
      },
    });

    const outerCall = calls.find((call) => call.name === 'outer');
    expect(outerCall?.task).toBe(outerTask);
    expect(outerCall?.reference).toBe('/do/0/outer');
    expect(outerCall?.defaultId).toBe('/do/outer');
    expect(outerCall?.parentId).toBe('root');
    const innerCall = calls.find((call) => call.name === 'inner');
    expect(innerCall?.task).toBe(innerTask);
    expect(innerCall?.reference).toBe('/do/0/outer/do/0/inner');
    expect(innerCall?.defaultId).toBe('/do/outer/do/inner');
    expect(innerCall?.parentId).toBe('/do/outer');
  });

  it('provides fork branches to the factory like any other task', () => {
    const workflow = workflowWith([
      {
        split: {
          fork: { branches: [{ left: { set: { value: 'left' } } }, { right: { set: { value: 'right' } } }] },
        },
      },
    ]);
    const calls: TaskIdFactoryContext[] = [];
    buildGraph(workflow, {
      taskId: (factoryContext) => {
        calls.push(factoryContext);
        return undefined;
      },
    });

    const rightCall = calls.find((call) => call.name === 'right');
    expect(rightCall?.reference).toBe('/do/0/split/fork/branches/1/right');
    expect(rightCall?.defaultId).toBe('/do/split/fork/branches/right');
    expect(rightCall?.parentId).toBe('/do/split');
  });

  it('throws when two tasks resolve to the same id', () => {
    const workflow = workflowWith([{ a: { set: { value: 'a' } } }, { b: { set: { value: 'b' } } }]);
    expect(() => buildGraph(workflow, { taskId: () => 'same' })).toThrow(
      "The task id 'same' is assigned to both tasks '/do/0/a' and '/do/1/b'",
    );
  });

  it('resolves each task at most once, keeping ids stable for tasks reached through multiple transitions', () => {
    const workflow = workflowWith([
      {
        decide: {
          switch: [{ first: { when: '${ .x == 1 }', then: 'done' } }, { otherwise: { then: 'done' } }],
        },
      },
      { done: { set: { value: true } } },
    ]);
    let counter = 0;
    const graph = buildGraph(workflow, { taskId: ({ name }) => `${name}#${++counter}` });
    const taskNodeIds = graph.nodes.filter((node) => node.task).map((node) => node.id);

    expect(counter).toBe(2);
    expect(taskNodeIds).toEqual(['decide#1', 'done#2']);
  });

  it('rejects reserved and invalid factory results', () => {
    const workflow = workflowWith([{ a: { set: { value: 'a' } } }]);
    expect(() => buildGraph(workflow, { taskId: () => 'port-a' })).toThrow(
      "The task id factory returned the reserved id 'port-a' for task '/do/0/a'",
    );
    expect(() => buildGraph(workflow, { taskId: () => 'root' })).toThrow(
      "The task id factory returned the reserved id 'root' for task '/do/0/a'",
    );
    expect(() => buildGraph(workflow, { taskId: () => '' })).toThrow(
      "The task id factory returned an invalid id for task '/do/0/a'",
    );
  });

  it('throws when a custom id collides with a derived subgraph id', () => {
    const workflow = workflowWith([
      { guarded: { try: [{ attempt: { set: { value: 'try' } } }], catch: {} } },
      { other: { set: { value: 'other' } } },
    ]);
    const customIds = new Map([
      ['/do/0/guarded', 'X'],
      ['/do/1/other', 'X/try'],
    ]);
    expect(() => buildGraph(workflow, { taskId: ({ reference }) => customIds.get(reference) })).toThrow(
      "Duplicate node id 'X/try' produced with the provided task id factory",
    );
  });

  it('honors the factory through the generated Workflow class', () => {
    const workflow = Classes.Workflow.deserialize(`
document:
  dsl: '1.0.3'
  namespace: test
  name: build-options
  version: '0.1.0'
do:
  - initialize:
      set:
        foo: bar`);
    const staticGraph = Classes.Workflow.toGraph(workflow, { taskId: () => 'custom-init' });
    const instanceGraph = workflow.toGraph({ taskId: () => 'custom-init' });

    expect(staticGraph.nodes.some((node) => node.id === 'custom-init')).toBe(true);
    expect(instanceGraph.nodes.some((node) => node.id === 'custom-init')).toBe(true);
  });
});
