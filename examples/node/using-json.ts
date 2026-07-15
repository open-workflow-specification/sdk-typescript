import { Classes } from /*'@openworkflowspec/sdk';*/ '../../dist';

const myJsonWorkflow = `
{
  "document": {
    "dsl": "1.0.3",
    "name": "using-json",
    "version": "1.0.0",
    "namespace": "default"
  },
  "do": [
    {
      "step1": {
        "set": {
          "variable": "my first workflow"
        }
      }
    }
  ]
}`;
const workflow = Classes.Workflow.deserialize(myJsonWorkflow);
console.log(`--- YAML ---\n${workflow.serialize()}\n\n--- JSON ---\n${workflow.serialize('json')}`);
