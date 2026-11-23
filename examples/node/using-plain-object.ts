import { Classes, Specification, validate } from /*'@openworkflowspec/sdk';*/ '../../dist';

const workflowDefinition = {
  document: {
    dsl: '1.1.0',
    name: 'using-plain-object',
    version: '1.0.0',
    namespace: 'default',
  },
  do: [
    {
      step1: {
        set: {
          variable: 'my first workflow',
        },
      },
    },
  ],
} as Specification.Workflow;
try {
  validate('Workflow', workflowDefinition);
  console.log(
    `--- YAML ---\n${Classes.Workflow.serialize(workflowDefinition)}\n\n--- JSON ---\n${Classes.Workflow.serialize(workflowDefinition, { format: 'json' })}`,
  );
} catch (ex) {
  console.error('Invalid workflow', ex);
}
