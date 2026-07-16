/*
 * Copyright 2021-Present The Open Workflow Specification Authors
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
import { classesDir, definitionsDir, normalizeKnownAllCaps, reset, toKebabCase } from './utils';
import {
  getArrayHydration,
  getExportedDeclarations,
  getObjectHydration,
  getTypeName,
  getUnderlyingTypes,
} from './reflection';
import { Node, Type } from 'ts-morph';

const { writeFile, readFile } = fsPromises;

/**
 * Returns the declaration for a class
 * @param name The name of the class
 * @param baseClass The inherited class, if any
 * @returns The declaration of the class
 */
function getObjectClassDeclaration(name: string, node: Node, type: Type, baseClass?: string): string {
  const hydrationResult = getObjectHydration(node, type);
  return `${fileHeader}
${inFileDisclaimer}

${hydrationResult.imports.map((type) => `import { _${type} } from './${toKebabCase(normalizeKnownAllCaps(type))}';`).join('\n')}
${baseClass ? `import { _${baseClass} } from './${toKebabCase(normalizeKnownAllCaps(baseClass))}';` : "import { ObjectHydrator } from '../../hydrator';"}
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
${hydrationResult.code ? `import { isObject } from '../../utils';` : ''}
${
  name === 'Workflow'
    ? `import * as yaml from 'js-yaml';
import { buildGraph, Graph } from '../../graph-builder';
import { convertToMermaidCode } from '../../mermaid-converter';`
    : ''
}

/**
 * Represents the intersection between the ${name} class and type
 */
export type ${name}Intersection = ${name} & Specification.${name};

/**
 * Represents a constructor for the intersection of the ${name} class and type
 */
export interface ${name}Constructor {
  new (model?: Partial<Specification.${name}>): ${name}Intersection;
}

/**
 * Represents a ${name} with methods for validation ${name === 'Workflow' ? 'normalization, and serialization.' : 'and normalization.'}
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class ${name} extends ${baseClass ? '_' + baseClass : `ObjectHydrator<Specification.${name}>`} {
  /**
   * Instanciates a new instance of the ${name} class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the ${name}.
   */
  constructor(model?: Partial<Specification.${name}>) {
    super(model);
    ${
      hydrationResult.code
        ? `const self = (this as unknown) as Specification.${name} & object;
      if (isObject(model)) {
        ${hydrationResult.code}
      }`
        : ''
    }
    getLifecycleHooks('${name}')?.constructor?.(this);
  }
  
  /**
   * Validates the current instance of the ${name}.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ${name}(this as any) as ${name}Intersection;
    validate('${name}', copy, workflow);
  }
  
  /**
   * Normalizes the current instance of the ${name}.
   * Creates a copy of the ${name}, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ${name} instance.
   */
  normalize(): ${name} & Specification.${name} {
    const copy = new ${name}(this as any) as ${name}Intersection;
    return getLifecycleHooks('${name}')?.normalize?.(copy) || copy;
  }
  ${
    name === 'Workflow'
      ? `
  static deserialize(text: string): WorkflowIntersection {
    const model = yaml.load(text) as Partial<Specification.Workflow>;
    validate('Workflow', model);
    return new Workflow(model) as WorkflowIntersection;
  }

  static serialize(
    model: Partial<WorkflowIntersection>,
    format: 'yaml' | 'json' = 'yaml',
    normalize: boolean = true,
  ): string {
    const workflow = new Workflow(model);
    workflow.validate();
    const normalized = normalize ? workflow.normalize() : workflow;
    if (format === 'json') {
      return JSON.stringify(normalized);
    }
    return yaml.dump(normalized);
  }

  static toGraph(model: Partial<WorkflowIntersection>): Graph {
    return buildGraph(model as unknown as WorkflowIntersection);
  }

  static toMermaidCode(model: Partial<WorkflowIntersection>): string {
    return convertToMermaidCode(model as unknown as WorkflowIntersection);
  }
  
  /**
   * Serializes the workflow to YAML or JSON
   * @param format The format, 'yaml' or 'json', default is 'yaml'
   * @param normalize If the workflow should be normalized before serialization, default true
   * @returns A string representation of the workflow
   */
  serialize(format: 'yaml' | 'json' = 'yaml', normalize: boolean = true): string {
    return Workflow.serialize(this as unknown as WorkflowIntersection, format, normalize);
  }

  /**
   * Creates a directed graph representation of the workflow
   * @returns A directed graph of the workflow
   */
  toGraph(): Graph {
    return Workflow.toGraph(this as unknown as WorkflowIntersection);
  }

  /**
   * Generates the MermaidJS code corresponding to the workflow
   * @returns The MermaidJS code
   */
  toMermaidCode(): string {
    return Workflow.toMermaidCode(this as unknown as WorkflowIntersection);
  }`
      : ''
  }
}

export const _${name} = ${name} as ${name}Constructor${
    name === 'Workflow'
      ? `& { 
  /**
   * Deserializes the provided string as a Workflow
   * @param text The YAML or JSON representation of a workflow
   * @returns A new Workflow instance
   */
  deserialize(text: string): WorkflowIntersection;
  
  /**
   * Serializes the provided Workflow to YAML or JSON
   * @param workflow The workflow to serialize
   * @param format The format, 'yaml' or 'json', default is 'yaml'
   * @param normalize If the workflow should be normalized before serialization, default true
   * @returns A string representation of the workflow
   */
  serialize(workflow: Partial<WorkflowIntersection>, format?: 'yaml' | 'json', normalize?: boolean): string;

  /**
   * Creates a directed graph representation of the provided workflow
   * @param workflow The workflow to convert
   * @returns A directed graph of the provided workflow
   */
  toGraph(workflow: Partial<WorkflowIntersection>): Graph;

  /**
   * Generates the MermaidJS code corresponding to the provided workflow
   * @param workflow The workflow to convert
   * @returns The MermaidJS code
   */
  toMermaidCode(workflow: Partial<WorkflowIntersection>): string;
}`
      : ''
  };`;
}

/**
 * Returns the declaration for a class that behaves like an array
 * @param name The name of the class
 * @param arrayTypeName The type parameter of the underlying array
 * @returns The declaration of the array-like class
 */
function getArrayLikeClassDeclaration(name: string, arrayTypeName: string, type: Type): string {
  const hydrationResult = getArrayHydration(type);
  return `${fileHeader}
${inFileDisclaimer}

${hydrationResult.imports.map((type) => `import { _${type} } from './${toKebabCase(normalizeKnownAllCaps(type))}';`)}
import { Specification } from '../definitions';
import { ArrayHydrator } from '../../hydrator';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';


/**
 * Represents the intersection between the ${name} class and type
 */
export type ${name}Intersection = ${name} & Specification.${name};

/**
 * Represents a constructor for the intersection of the ${name} class and type
 */
export interface ${name}Constructor {
  new (model?: Array<${arrayTypeName}> | number): ${name}Intersection;
}

/**
 * Represents a collection of ${arrayTypeName}.
 * Inherits from ArrayHydrator to handle array-specific hydration.
 */
export class ${name} extends ArrayHydrator<${arrayTypeName}> {
  /**
   * Constructs a new instance of the ${name} class.
   *
   * @param model - Optional parameter which can be an array of objects or a number representing the array length.
   */
  constructor(model?: Array<${arrayTypeName}> | number) {
    super(model);
    if (Array.isArray(model)) {
      ${hydrationResult.code}
    }
    Object.setPrototypeOf(this, Object.create(${name}.prototype));
    getLifecycleHooks('${name}')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the ${name}.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new ${name}(this);
    validate('${name}', copy, workflow);
  }
  
  /**
   * Normalizes the current instance of the ${name}.
   * Creates a copy of the ${name}, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the ${name} instance.
   */
  normalize(): ${name} {
    const copy = new ${name}(this);
    return getLifecycleHooks('${name}')?.normalize?.(copy) || copy;
  }
}

export const _${name} = ${name} as unknown as ${name}Constructor;
//export const _${name} = ${name}; // could be exported directly, but it makes the job of building the index more straightforward as it's consistant with "object" classes
`;
}

/**
 * Generates classes
 * @param definitionFile The declaration file to generate the classes from
 * @param destDir The directory to save the declaration at
 */
async function generate(definitionFile: string, destDir: string): Promise<void> {
  const definitions = await readFile(definitionFile, { encoding: 'utf-8' });
  const exportedDeclarations = getExportedDeclarations(definitions);
  const aliases = Array.from(exportedDeclarations.keys()).sort((a, b) => a.localeCompare(b));
  await reset(destDir);
  for (const [alias, node] of exportedDeclarations) {
    const exportedType = node![0].getType();
    let classDeclaration: string = '';
    if (!exportedType.isArray() && !exportedType.isTuple()) {
      const baseClass = exportedType.getIntersectionTypes()?.[0];
      const baseClassName = baseClass ? getTypeName(baseClass) : undefined;
      classDeclaration = getObjectClassDeclaration(alias, node![0], exportedType, baseClassName);
    } else {
      const arrayType = getTypeName(
        exportedType.getArrayElementType() || getUnderlyingTypes(exportedType)[0],
        'Specification.',
      );
      classDeclaration = getArrayLikeClassDeclaration(alias, arrayType, exportedType);
    }
    const destFile = path.resolve(destDir, toKebabCase(normalizeKnownAllCaps(alias)) + '.ts');
    await writeFile(destFile, classDeclaration);
  }
  const indexSrc = `${fileHeader}
${aliases.reduce((imports, alias) => `${imports}import { _${alias} } from './${toKebabCase(normalizeKnownAllCaps(alias))}';\n`, '')}
export const Classes = {
${aliases.reduce((exports, alias) => `${exports}  ${alias}: _${alias},\n`, '')}
};`;
  const destFile = path.resolve(destDir, 'index.ts');
  await writeFile(destFile, indexSrc);
}

const definitionFile = path.resolve(definitionsDir, 'specification.ts');

generate(definitionFile, classesDir).then(console.log.bind(console)).catch(console.error.bind(console));
