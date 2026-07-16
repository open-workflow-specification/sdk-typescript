import { Classes } from '../../src/lib/generated/classes';
import { Specification } from '../../src/lib/generated/definitions';
import { convertToMermaidCode, MermaidDiagram } from '../../src/lib/mermaid-converter';

describe('Workflow to MermaidJS Flowchart', () => {
  it('should build a Mermaid diagram for a workflow with a Set task, using the convertToMermaidCode function', () => {
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
    const mermaidCode = convertToMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    n0(( ))
    n1((( )))
    n2["initialize"]
    n2 --> n1
    n0 --> n2


classDef hidden width: 1px, height: 1px;`.trim(),
    );
  });

  it('should build a Mermaid diagram for a workflow with a Set task, using the instance method', () => {
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
    const mermaidCode = workflow.toMermaidCode().trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    n0(( ))
    n1((( )))
    n2["initialize"]
    n2 --> n1
    n0 --> n2


classDef hidden width: 1px, height: 1px;`.trim(),
    );
  });

  it('should build a Mermaid diagram for a workflow with a Set task, using the static method', () => {
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
    const mermaidCode = Classes.Workflow.toMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    n0(( ))
    n1((( )))
    n2["initialize"]
    n2 --> n1
    n0 --> n2


classDef hidden width: 1px, height: 1px;`.trim(),
    );
  });

  it('should build a Mermaid diagram for a workflow with a Set task, using the legacy MermaidDiagram class', () => {
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
    const mermaidCode = new MermaidDiagram(workflow).sourceCode().trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    n0(( ))
    n1((( )))
    n2["initialize"]
    n2 --> n1
    n0 --> n2


classDef hidden width: 1px, height: 1px;`.trim(),
    );
  });

  it('should build a Mermaid diagram with an alternative, labelled, edge', () => {
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
    const mermaidCode = convertToMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    n0(( ))
    n1((( )))
    n2["initialize"]
    n2 --> n1
    n0 --"\${ input.data == true }"--> n2
    n0 --> n1


classDef hidden width: 1px, height: 1px;`.trim(),
    );
  });

  it('should build a Mermaid diagram for a workflow with a For task', () => {
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
    const mermaidCode = convertToMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    n0(( ))
    n1((( )))
    subgraph n2 ["checkup"]
        n3["waitForCheckup"]
        
    end
    n3["waitForCheckup"]
    n0 --> n3
    n3 --> n1


classDef hidden width: 1px, height: 1px;`.trim(),
    );
  });

  it('should keep the diagram valid when task names contain Mermaid-significant characters', () => {
    const workflow = {
      document: {
        dsl: '1.0.3',
        name: 'special-characters',
        version: '1.0.0',
        namespace: 'test',
      },
      do: [
        {
          'say "hello world" (loudly)': {
            set: {
              foo: 'bar',
            },
          },
        },
      ],
    } as Specification.Workflow;
    const mermaidCode = Classes.Workflow.toMermaidCode(workflow).trim();
    expect(mermaidCode).toBe(
      `flowchart TD
    n0(( ))
    n1((( )))
    n2["say #quot;hello world#quot; (loudly)"]
    n2 --> n1
    n0 --> n2


classDef hidden width: 1px, height: 1px;`.trim(),
    );
  });
});
