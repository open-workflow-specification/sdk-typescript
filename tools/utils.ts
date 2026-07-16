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
import { rimraf } from 'rimraf';
import { readMeDisclaimer } from './consts';
import { URL } from 'url';
import yargs from 'yargs';
import { schemaVersion } from '../package.json';

const { writeFile, mkdir } = fsPromises;

/** Resets the destination directory, recursively deletes everything and adds the README */
export const reset = async (destDir: string) =>
  rimraf(destDir)
    .then(() => mkdir(destDir, { recursive: true }))
    .then(() => writeFile(path.resolve(destDir, 'README.md'), readMeDisclaimer));

/**
 * Check if the provided value is an object but not an array
 * @param value The value to check
 * @returns True if the value is an object
 */
export const isObject = (value: unknown): boolean => {
  if (!value) return false;
  return typeof value === 'object' && !Array.isArray(value);
};

/**
 * Transforms a PascalCased string or with space into a kebab-cased one
 * @param source
 * @returns
 */
export const toKebabCase = (source: string): string =>
  source
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/_+/g, '-')
    .toLowerCase();

/**
 * Converts a string to pascal case (PascalCase)
 * @param source string The string to convert to pascal case
 * @returns string The pascal case string
 */
export const toPascalCase = (source: string): string => {
  if (!source) return '';
  return source
    .replace(/-+/g, ' ')
    .replace(/_+/g, ' ')
    .replace(/\.+/g, ' ')
    .replace(/\s+(.)(\w+)/g, ($1, $2, $3) => `${$2.toUpperCase()}${$3.toLowerCase()}`)
    .replace(/\s/g, '')
    .replace(/\w/, (s) => s.toUpperCase());
};

/**
 * Normalize to capitalize first letter only convention for know accronyms, eg HTTP -> Http
 * @param source
 * @returns
 */
export const normalizeKnownAllCaps = (source: string): string =>
  source
    .replace('API', 'Api')
    .replace('GRPC', 'Grpc')
    .replace('HTTP', 'Http')
    .replace('OAuth2', 'Oauth2')
    .replace('A2A', 'A2a')
    .replace('MCP', 'Mcp');

/** Schemas directory */
export const schemaDir = path.resolve(process.cwd(), 'src/lib/generated/schema');
/** Definitions directory */
export const definitionsDir = path.resolve(process.cwd(), 'src/lib/generated/definitions');
/** Vallidation directory */
export const vallidationDir = path.resolve(process.cwd(), 'src/lib/generated/validation');
/** Classes directory */
export const classesDir = path.resolve(process.cwd(), 'src/lib/generated/classes');
/** Builders directory */
export const buildersDir = path.resolve(process.cwd(), 'src/lib/generated/builders');

const argv = yargs(process.argv.slice(2))
  .options({
    url: { type: 'string' },
  })
  .parseSync();
/** The URL to download the schema from */
export const yamlSchemaUrl: URL = new URL(
  argv.url || `https://open-workflow-specification.org/schemas/${schemaVersion}/workflow.yaml`,
);
export const jsonSchemaUrl: URL = new URL(
  argv.url || `https://open-workflow-specification.org/schemas/${schemaVersion}/workflow.json`,
);
