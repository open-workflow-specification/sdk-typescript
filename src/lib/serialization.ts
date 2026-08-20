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
 *
 */

import type { DumpOptions } from 'js-yaml';

/**
 * The options shared by every operation that can validate a workflow as part of its work
 */
export type ValidationOptions = {
  /**
   * Whether the workflow should be validated. Default true.
   *
   * Set to false to process a work in progress document, which is structurally invalid most of the
   * time. Note that this skips *validation*, not *hydration*: a document whose shape is structurally
   * impossible, e.g. `do` as a mapping rather than a sequence, still throws while the class graph is
   * built.
   */
  validate?: boolean;
};

/**
 * The options used to customize the YAML output.
 *
 * Deliberately a curated subset of, and independent from, js-yaml's own `DumpOptions`: v5 renamed
 * several of those options and moved others onto `PresenterOptions`, so re-exporting that type would
 * make the SDK's public API change shape on every js-yaml major.
 */
export type YamlSerializationOptions = {
  /**
   * The indentation width, in spaces. Default 2, minimum 1.
   *
   * Values below 1 are raised to 1: js-yaml no longer clamps them, and an indent of 0 emits nested
   * mappings at column 0, which parses back as a different document.
   */
  indent?: number;
  /**
   * The maximum line width before long scalars are folded into a block, -1 for unlimited. Default 80
   */
  lineWidth?: number;
  /**
   * Whether the mapping keys should be sorted. Default false
   */
  sortKeys?: boolean;
  /**
   * The nesting level at which collections switch to flow style, -1 to never switch. Default -1
   */
  flowLevel?: number;
};

/**
 * The options used when serializing a workflow
 */
export type SerializationOptions = ValidationOptions & {
  /**
   * The output format. Default 'yaml'
   */
  format?: 'yaml' | 'json';
  /**
   * Whether the workflow should be normalized before serialization. Default true
   */
  normalize?: boolean;
  /**
   * The options used to customize the YAML output. Ignored when the format is 'json'
   */
  yaml?: YamlSerializationOptions;
};

/**
 * The options used when deserializing a workflow.
 *
 * `format` is excluded because `yaml.load` parses both YAML and JSON, JSON being a subset of YAML, so
 * the reader does not need to be told which one it was handed. `normalize` is excluded because
 * normalizing on read would silently rewrite the caller's document; normalization stays an explicit,
 * caller driven step.
 */
export type DeserializationOptions = ValidationOptions;

/**
 * Maps the SDK's YAML output options onto the options expected by js-yaml's dumper.
 *
 * The fields are mapped one by one rather than spread, so that a js-yaml release renaming or dropping
 * one of them fails this file at compile time instead of silently becoming a no-op. Only the options
 * the caller actually set are forwarded: js-yaml merges what it is given over its own defaults, so an
 * explicitly undefined field would overwrite a default and rely on the dumper filtering it back out.
 *
 * @param options The SDK's YAML output options
 * @returns The equivalent js-yaml dump options
 */
export const toYamlDumpOptions = (options?: YamlSerializationOptions | null): DumpOptions => {
  const dumpOptions: DumpOptions = {};
  if (options?.indent != null) {
    dumpOptions.indent = Math.max(1, options.indent);
  }
  if (options?.lineWidth != null) {
    dumpOptions.lineWidth = options.lineWidth;
  }
  if (options?.sortKeys != null) {
    dumpOptions.sortKeys = options.sortKeys;
  }
  if (options?.flowLevel != null) {
    dumpOptions.flowLevel = options.flowLevel;
  }
  return dumpOptions;
};

/**
 * Normalizes the arguments of `serialize` into a single options object, accepting both the current
 * options payload and the deprecated positional form.
 *
 * The positional form is recognized by the absence of an options payload rather than by the presence
 * of a format, because the format was optional there: `serialize(undefined, false)` is a legacy call
 * that asks not to normalize, and reading it as an empty payload would silently normalize anyway.
 *
 * @param formatOrOptions The serialization options, or the deprecated positional format argument
 * @param legacyNormalize The deprecated positional normalize argument, only read for the positional form
 * @returns The equivalent serialization options
 */
export const toSerializationOptions = (
  formatOrOptions?: 'yaml' | 'json' | SerializationOptions | null,
  legacyNormalize?: boolean,
): SerializationOptions => {
  if (formatOrOptions != null && typeof formatOrOptions !== 'string') {
    return formatOrOptions;
  }
  return { format: formatOrOptions ?? undefined, normalize: legacyNormalize };
};
