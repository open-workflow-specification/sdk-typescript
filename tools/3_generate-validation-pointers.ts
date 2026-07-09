/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
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

import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { fileHeader, inFileDisclaimer } from './consts';
import { definitionsDir, isObject, reset, schemaDir, vallidationDir } from './utils';
import { JSONSchema } from 'json-schema-to-typescript';
import { getChildTypes, getExportedDeclarations } from './reflection';
import * as yaml from 'js-yaml';

const { writeFile, readFile } = fsPromises;

/**
 * Gets the JSON pointer of the subschema with the provided title
 * @param schema The schema to get the pointer from
 * @param title The title to lookup
 * @param parentPath The JSON pointer of the parent schema
 * @returns The JSON pointer of the subschema with the provided title, or undefined if none is found
 */
function getJsonPointer(schema: JSONSchema, title: string, parentPointer: string = '#'): string | undefined {
  if (typeof schema.title === 'string' && schema.title.toLowerCase() === title.toLowerCase()) {
    return parentPointer;
  }
  for (const [key, value] of Object.entries(schema) as [string, any]) {
    if (!isObject(value) && !Array.isArray(value)) {
      continue;
    }
    if (!Array.isArray(value)) {
      const match = getJsonPointer(value, title, `${parentPointer}/${key}`);
      if (match) {
        return match;
      }
    } else {
      for (let i = 0, c = value.length; i < c; i++) {
        const match = getJsonPointer(value[i], title, `${parentPointer}/${key}/${i}`);
        if (match) {
          return match;
        }
      }
    }
  }
}

/**
 * Generates a file containing a mapping of type and their JSON pointers
 * @param schemaFile The schema to get the pointers from
 * @param definitionFile The definition file to get the declarations from
 * @param destFile The output file
 */
async function generate(schemaFile: string, definitionFile: string, destFile: string): Promise<void> {
  const definitions = await readFile(definitionFile, { encoding: 'utf-8' });
  const schemaTxt = await readFile(schemaFile, { encoding: 'utf-8' });
  const exportedDeclarations = getExportedDeclarations(definitions);
  const declarations = Array.from(exportedDeclarations.keys())
    .filter((name) => name !== 'Workflow')
    .sort((a, b) => a.localeCompare(b));
  const schema = yaml.load(schemaTxt) as JSONSchema;
  const baseUri = schema.$id.replace('.yaml', '.json') + '#';
  const jsonPointers = [
    ['Workflow', baseUri],
    ...declarations.map((name) => [name, getJsonPointer(schema, name, baseUri)]),
  ];
  const validationPointersSrc = `${fileHeader}
${inFileDisclaimer}

/**
* A map of type names and their corresponding schema
*/
export const validationPointers = {
${jsonPointers.reduce((src, [key, value]) => `${src}  ${key}: ${value ? `'${value}'` : 'undefined'},\n`, '')}
};
  `;
  const childEntries = Array.from(exportedDeclarations.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([alias, node]) => [alias, getChildTypes(node![0], node![0].getType())] as const)
    .filter(([, children]) => children.length > 0);
  const validationChildrenSrc = `${fileHeader}
${inFileDisclaimer}

/**
 * Describes a hydratable child reference of a type, used to drive recursive validation.
 */
export type ChildType =
  | { kind: 'object'; property: string; type: string }
  | { kind: 'record'; property: string; type: string }
  | { kind: 'indexed'; type: string; knownProperties: string[] }
  | { kind: 'array'; type: string }
  | { kind: 'array-record'; type: string };

/**
 * A map of type names and the typed children they hydrate, used to recurse validation hooks
 * into nested objects. Mirrors the constructor hydration of each generated class.
 */
export const childTypes: Record<string, ChildType[]> = {
${childEntries.reduce((src, [key, children]) => `${src}  ${key}: ${JSON.stringify(children)},\n`, '')}
};
  `;
  const destDir = path.dirname(destFile);
  await reset(destDir);
  await writeFile(destFile, validationPointersSrc);
  await writeFile(path.resolve(destDir, 'validation-children.ts'), validationChildrenSrc);
  await writeFile(
    path.resolve(destDir, 'index.ts'),
    fileHeader +
      "export { validationPointers } from './validation-pointers';\n" +
      "export { childTypes, type ChildType } from './validation-children';\n",
  );
}

const schemaFile = path.resolve(schemaDir, '__internal_workflow.json');
//const schemaFile = path.resolve(schemaDir, 'workflow.json');
const definitionFile = path.resolve(definitionsDir, 'specification.ts');
const destFile = path.resolve(vallidationDir, 'validation-pointers.ts');

generate(schemaFile, definitionFile, destFile).then(console.log.bind(console)).catch(console.error.bind(console));
