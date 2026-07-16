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
import { buildersDir, definitionsDir, normalizeKnownAllCaps, reset, toKebabCase } from './utils';
import { getExportedDeclarations } from './reflection';
import { Type } from 'ts-morph';

const { readFile, writeFile } = fsPromises;

/**
 * Transforms PascalCase into camelCase
 * @para value A PascalCase string
 * @returns A camelCase string
 */
function toCamelCase(value: string): string {
  if (!value) return '';
  const transformable = value.trim();
  return transformable[0].toLowerCase() + transformable.slice(1);
}

/**
 * Creates an object builder for the provided type
 * @param name The name type to create the builder for
 */
const getObjectBuilderDeclaration = (name: string, type: Type): string =>
  `${fileHeader}
${inFileDisclaimer}

import { builder, Builder, BuildOptions } from "../../builder";
import { Classes } from "../classes";
import { ${name}Intersection } from '../classes/${toKebabCase(normalizeKnownAllCaps(name))}';
import { Specification } from "../definitions";

/**
 * The internal function used by the builder proxy to validate and return its underlying object
 * @param {Specification.${name}} model The proxied object
 * @param {BuildOptions} options The build options to use
 * @returns {${name}Intersection} The built object
 */
function buildingFn(model: Specification.${name}, options: BuildOptions): ${name}Intersection {
  const instance = new Classes.${name}(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) ${type.isTuple() ? 'as unknown ' : ''}as ${name}Intersection;
}

/**
 * A factory to create a builder proxy for the type \`${name}Intersection\`
 * @returns {Builder<${name}Intersection, ${name}Intersection>} A builder for \`${name}Intersection\`
 */
export const ${toCamelCase(name)}Builder = (model?: Partial<Specification.${name}>): Builder<Partial<Specification.${name}>, ${name}Intersection> => builder<Specification.${name}, ${name}Intersection>(model, buildingFn);`;

/**
 * Creates an array builder for the provided type
 * @param name The name type to create the builder for
 * @param arrayTypeName The type parameter of the underlying array
 */
const getArrayBuilderDeclaration = (name: string, arrayTypeName: string): string =>
  `${fileHeader}
${inFileDisclaimer}

import { arrayBuilder, ArrayBuilder, BuildOptions } from "../../builder";
import { Classes } from "../classes";
import { ${name}Intersection } from '../classes/${toKebabCase(normalizeKnownAllCaps(name))}';
import { Specification } from "../definitions";

/**
 * The internal function used by the builder proxy to validate and return its underlying array
 * @param {Specification.${name}} model The proxied array
 * @param {BuildOptions} options The build options to use
 * @returns {${name}Intersection} The built array
 */
function buildingFn(model: Specification.${name}, options: BuildOptions): ${name}Intersection {
  const instance = new Classes.${name}(model);
  if (options.validate) instance.validate();
  return (options.normalize ? instance.normalize() : instance) as unknown as ${name}Intersection;
}

/**
 * A factory to create a builder proxy for the type \`${name}Intersection\`
 * @returns {ArrayBuilder<${arrayTypeName}, ${name}Intersection>} A builder for \`${name}Intersection\`
 */
export const ${toCamelCase(name)}Builder = (model?: Specification.${name}): ArrayBuilder<${arrayTypeName}, ${name}Intersection> => arrayBuilder<${arrayTypeName}, ${name}Intersection>(model, buildingFn);`;

/**
 * Creates the builders index file
 * @param destDir The builders directory
 * @param aliases The list of types to create the index for
 * @returns
 */
async function createIndex(destDir: string, aliases: string[]): Promise<void> {
  try {
    const indexCode: string =
      fileHeader +
      aliases.reduce(
        (acc, alias) => acc + `export * from './${toKebabCase(normalizeKnownAllCaps(alias)) + '-builder'}';\n`,
        '',
      );
    const indexFile = path.resolve(destDir, 'index.ts');
    await writeFile(indexFile, indexCode);
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(ex);
  }
}

/**
 * Generates builders
 * @param definitionFile The definition file path
 * @param destDir The output directory for builders
 * @returns
 */
async function generate(definitionFile: string, destDir: string): Promise<void> {
  try {
    await reset(destDir);
    const definitions = await readFile(definitionFile, { encoding: 'utf-8' });
    const exportedDeclarations = getExportedDeclarations(definitions);
    const aliases = Array.from(exportedDeclarations.keys()).sort((a, b) => a.localeCompare(b));
    for (const [alias, node] of exportedDeclarations) {
      const exportedType = node![0].getType();
      let builderDeclaration: string = '';
      if (!exportedType.isArray()) {
        builderDeclaration = getObjectBuilderDeclaration(alias, exportedType);
      } else {
        const arrayType = exportedType
          .getArrayElementTypeOrThrow()
          .getText()
          .replace('import("/declarations")', 'Specification');
        builderDeclaration = getArrayBuilderDeclaration(alias, arrayType);
      }
      const destFile = path.resolve(destDir, toKebabCase(normalizeKnownAllCaps(alias)) + '-builder.ts');
      await writeFile(destFile, builderDeclaration);
    }
    createIndex(destDir, aliases);
    return Promise.resolve();
  } catch (ex) {
    return Promise.reject(ex);
  }
}

const definitionFile = path.resolve(definitionsDir, 'specification.ts');
generate(definitionFile, buildersDir).then(console.log.bind(console)).catch(console.error.bind(console));
