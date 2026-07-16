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

import { _WorkflowTags } from './workflow-tags';
import { _WorkflowMetadata } from './workflow-metadata';
import { ObjectHydrator } from '../../hydrator';
import { Specification } from '../definitions';
import { getLifecycleHooks } from '../../lifecycle-hooks';
import { validate } from '../../validation';
import { isObject } from '../../utils';

/**
 * Represents the intersection between the Document class and type
 */
export type DocumentIntersection = Document & Specification.Document;

/**
 * Represents a constructor for the intersection of the Document class and type
 */
export interface DocumentConstructor {
  new (model?: Partial<Specification.Document>): DocumentIntersection;
}

/**
 * Represents a Document with methods for validation and normalization.
 * Inherits from ObjectHydrator which provides functionality for hydrating the state based on a model.
 */
export class Document extends ObjectHydrator<Specification.Document> {
  /**
   * Instanciates a new instance of the Document class.
   * Initializes properties based on the provided model if it is an object.
   *
   * @param model - Optional partial model object to initialize the Document.
   */
  constructor(model?: Partial<Specification.Document>) {
    super(model);
    const self = this as unknown as Specification.Document & object;
    if (isObject(model)) {
      if (typeof model.tags === 'object') self.tags = new _WorkflowTags(model.tags);
      if (typeof model.metadata === 'object') self.metadata = new _WorkflowMetadata(model.metadata);
    }
    getLifecycleHooks('Document')?.constructor?.(this);
  }

  /**
   * Validates the current instance of the Document.
   * Throws if invalid.
   */
  validate(workflow?: Partial<Specification.Workflow>) {
    const copy = new Document(this as any) as DocumentIntersection;
    validate('Document', copy, workflow);
  }

  /**
   * Normalizes the current instance of the Document.
   * Creates a copy of the Document, invokes normalization hooks if available, and returns the normalized copy.
   *
   * @returns A normalized version of the Document instance.
   */
  normalize(): Document & Specification.Document {
    const copy = new Document(this as any) as DocumentIntersection;
    return getLifecycleHooks('Document')?.normalize?.(copy) || copy;
  }
}

export const _Document = Document as DocumentConstructor;
