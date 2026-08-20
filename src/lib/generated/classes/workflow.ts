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

/*****************************************************************************************
 *
 * /!\ This file is computer generated. Any manual modification can and will be lost. /!\
 *
 *****************************************************************************************/

import { _Document } from './document';
import { _Input } from './input';
import { _Use } from './use';
import { _TaskList } from './task-list';
import { _WorkflowTimeout } from './workflow-timeout';
import { _Output } from './output';
import { _Schedule } from './schedule';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';
import * as yaml from 'js-yaml';
import {
  DeserializationOptions,
  SerializationOptions,
  toSerializationOptions,
  toYamlDumpOptions,
} from '../../serialization';
import { buildGraph, Graph, GraphBuildOptions } from '../../graph-builder';
import { convertToMermaidCode } from '../../mermaid-converter';

/**
 * Represents the intersection between the Workflow class and type
 */
export type WorkflowIntersection = Workflow & Specification.Workflow;

/**
 * Represents a constructor for the intersection of the Workflow class and type
 */
export interface WorkflowConstructor {
  new (model?: Partial<Specification.Workflow>): WorkflowIntersection;
}

/**
 * Represents a Workflow with methods for validation normalization, and serialization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Workflow extends ObjectHydrator<Specification.Workflow> {
  /**
   * Instanciates a new instance of the Workflow class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Workflow.
   */
  constructor(model?: Partial<Specification.Workflow>) {
    super(model);
    const self = this as unknown as Specification.Workflow & object;
    if (isObject(model)) {
      if (typeof model.document === 'object') self.document = new _Document(model.document);
      if (typeof model.input === 'object') self.input = new _Input(model.input);
      if (typeof model.use === 'object') self.use = new _Use(model.use);
      if (typeof model.do === 'object') self.do = new _TaskList(model.do);
      if (typeof model.timeout === 'object') self.timeout = new _WorkflowTimeout(model.timeout);
      if (typeof model.output === 'object') self.output = new _Output(model.output);
      if (typeof model.schedule === 'object') self.schedule = new _Schedule(model.schedule);
    }
    getLifecycleHooks('Workflow')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Workflow.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Workflow(this as any) as WorkflowIntersection;
    validate('Workflow', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Workflow.
   * Creates a copy of the Workflow, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Workflow instance.
   */
  normalize(): Workflow & Specification.Workflow {
    const copy = new Workflow(this as any) as WorkflowIntersection;
    return getLifecycleHooks('Workflow')?.normalize?.(copy) || copy;
  }

  /**
   * Deserializes the provided string as a Workflow.
   *
   * When validation is skipped, the parsed document is still checked to be a mapping: hydration
   * ignores anything else, so a scalar or a sequence would otherwise yield a blank Workflow rather
   * than an error. See issue #309.
   *
   * @param text The YAML or JSON representation of a workflow
   * @param options The deserialization options, e.g. to opt out of validation
   * @returns A new Workflow instance
   */
  static deserialize(text: string, options?: DeserializationOptions): WorkflowIntersection {
    const model = yaml.load(text) as Partial<Specification.Workflow>;
    if (options?.validate ?? true) {
      validate('Workflow', model);
    } else if (!isObject(model)) {
      throw new Error(
        `The provided text does not describe a workflow: expected a mapping, got ${Array.isArray(model) ? 'a sequence' : typeof model}`,
      );
    }
    return new Workflow(model) as WorkflowIntersection;
  }

  /**
   * Serializes the provided workflow to YAML or JSON.
   *
   * Both formats serialize the same plain representation of the document, obtained via
   * `asPlainObject()`: js-yaml cannot dump hydrated class instances. See issue #308.
   *
   * @param model The workflow to serialize
   * @param options The serialization options, e.g. the format or whether to validate
   * @returns A string representation of the workflow
   */
  static serialize(model: Partial<WorkflowIntersection>, options?: SerializationOptions): string;

  /**
   * Serializes the provided workflow to YAML or JSON
   * @deprecated Pass a `SerializationOptions` object instead, e.g. `serialize(workflow, { format: 'json' })`
   * @param model The workflow to serialize
   * @param format The format, 'yaml' or 'json', default is 'yaml'
   * @param normalize If the workflow should be normalized before serialization, default true
   * @returns A string representation of the workflow
   */
  static serialize(model: Partial<WorkflowIntersection>, format?: 'yaml' | 'json', normalize?: boolean): string;

  static serialize(
    model: Partial<WorkflowIntersection>,
    formatOrOptions?: 'yaml' | 'json' | SerializationOptions,
    legacyNormalize?: boolean,
  ): string {
    const options = toSerializationOptions(formatOrOptions, legacyNormalize);
    const format = options.format ?? 'yaml';
    const shouldNormalize = options.normalize ?? true;
    const shouldValidate = options.validate ?? true;
    const workflow = new Workflow(model);
    if (shouldValidate) {
      workflow.validate();
    }
    const plainWorkflow = (shouldNormalize ? workflow.normalize() : workflow).asPlainObject();
    return format === 'json'
      ? JSON.stringify(plainWorkflow)
      : yaml.dump(plainWorkflow, toYamlDumpOptions(options.yaml));
  }

  /**
   * Creates a directed graph representation of the provided workflow
   * @param model The workflow to convert
   * @param options The options used to customize how the graph is built, e.g. to provide custom node ids
   * @returns A directed graph of the provided workflow
   */
  static toGraph(model: Partial<WorkflowIntersection>, options?: GraphBuildOptions): Graph {
    return buildGraph(model as unknown as WorkflowIntersection, options);
  }

  /**
   * Generates the MermaidJS code corresponding to the provided workflow
   * @param model The workflow to convert
   * @returns The MermaidJS code
   */
  static toMermaidCode(model: Partial<WorkflowIntersection>): string {
    return convertToMermaidCode(model as unknown as WorkflowIntersection);
  }

  /**
   * Serializes the workflow to YAML or JSON
   * @param options The serialization options, e.g. the format or whether to validate
   * @returns A string representation of the workflow
   */
  serialize(options?: SerializationOptions): string;

  /**
   * Serializes the workflow to YAML or JSON
   * @deprecated Pass a `SerializationOptions` object instead, e.g. `serialize({ format: 'json' })`
   * @param format The format, 'yaml' or 'json', default is 'yaml'
   * @param normalize If the workflow should be normalized before serialization, default true
   * @returns A string representation of the workflow
   */
  serialize(format?: 'yaml' | 'json', normalize?: boolean): string;

  serialize(formatOrOptions?: 'yaml' | 'json' | SerializationOptions, legacyNormalize?: boolean): string {
    return Workflow.serialize(
      this as unknown as WorkflowIntersection,
      toSerializationOptions(formatOrOptions, legacyNormalize),
    );
  }

  /**
   * Creates a directed graph representation of the workflow
   * @param options The options used to customize how the graph is built, e.g. to provide custom node ids
   * @returns A directed graph of the workflow
   */
  toGraph(options?: GraphBuildOptions): Graph {
    return Workflow.toGraph(this as unknown as WorkflowIntersection, options);
  }

  /**
   * Generates the MermaidJS code corresponding to the workflow
   * @returns The MermaidJS code
   */
  toMermaidCode(): string {
    return Workflow.toMermaidCode(this as unknown as WorkflowIntersection);
  }
}

export const _Workflow = Workflow as WorkflowConstructor & {
  /**
   * Deserializes the provided string as a Workflow
   * @param text The YAML or JSON representation of a workflow
   * @param options The deserialization options, e.g. to opt out of validation
   * @returns A new Workflow instance
   */
  deserialize(text: string, options?: DeserializationOptions): WorkflowIntersection;

  /**
   * Serializes the provided Workflow to YAML or JSON
   * @param workflow The workflow to serialize
   * @param options The serialization options, e.g. the format or whether to validate
   * @returns A string representation of the workflow
   */
  serialize(workflow: Partial<WorkflowIntersection>, options?: SerializationOptions): string;

  /**
   * Serializes the provided Workflow to YAML or JSON
   * @deprecated Pass a `SerializationOptions` object instead, e.g. `serialize(workflow, { format: 'json' })`
   * @param workflow The workflow to serialize
   * @param format The format, 'yaml' or 'json', default is 'yaml'
   * @param normalize If the workflow should be normalized before serialization, default true
   * @returns A string representation of the workflow
   */
  serialize(workflow: Partial<WorkflowIntersection>, format?: 'yaml' | 'json', normalize?: boolean): string;

  /**
   * Creates a directed graph representation of the provided workflow
   * @param workflow The workflow to convert
   * @param options The options used to customize how the graph is built, e.g. to provide custom node ids
   * @returns A directed graph of the provided workflow
   */
  toGraph(workflow: Partial<WorkflowIntersection>, options?: GraphBuildOptions): Graph;

  /**
   * Generates the MermaidJS code corresponding to the provided workflow
   * @param workflow The workflow to convert
   * @returns The MermaidJS code
   */
  toMermaidCode(workflow: Partial<WorkflowIntersection>): string;
};
