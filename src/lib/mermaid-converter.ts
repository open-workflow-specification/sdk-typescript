import { Workflow } from './generated/definitions/specification';
import { buildFlatGraph, FlatGraph, FlatGraphNode, GraphEdge, GraphNodeType } from './graph-builder';

/**
 * Resolves the renderer-local alias of a node id.
 */
type AliasResolver = (id: string) => string;

/**
 * Adds indentation to each line of the provided code
 * @param code The code to indent
 * @returns The indented code
 */
const indent = (code: string) =>
  code
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n');

/**
 * Escapes Mermaid-significant characters in a displayed label
 * @param label The label to escape
 * @returns The escaped label
 */
const escapeLabel = (label: string): string => label.replace(/"/g, '#quot;');

/**
 * Builds a resolver mapping node ids to renderer-local aliases (`n0`, `n1`, ...), so arbitrary
 * task names cannot break the Mermaid syntax. Aliases are assigned in node declaration order,
 * making them deterministic for a given graph.
 * @param root The flattened graph to alias
 * @returns The alias resolver
 */
function buildAliases(root: FlatGraph): AliasResolver {
  const aliases = new Map<string, string>();
  const alias: AliasResolver = (id) => {
    let value = aliases.get(id);
    if (!value) {
      value = `n${aliases.size}`;
      aliases.set(id, value);
    }
    return value;
  };
  root.nodes.forEach((node) => alias(node.id));
  return alias;
}

/**
 * Converts a graph to Mermaid code
 * @param root The root graph
 * @param alias The node id alias resolver
 * @param subgraphNode The graph to convert
 * @returns The converted graph
 */
function convertGraphToCode(root: FlatGraph, alias: AliasResolver, subgraphNode?: FlatGraphNode): string {
  const nodes = !subgraphNode ? root.nodes : root.nodes.filter((n) => n.parentId === subgraphNode.id);
  const edges = !subgraphNode ? root.edges : [];
  const code = `${!subgraphNode ? 'flowchart TD' : `subgraph ${alias(subgraphNode.id)} ["${escapeLabel(subgraphNode.label || subgraphNode.id)}"]`}
${indent(nodes.map((node) => convertNodeToCode(root, alias, node)).join('\n'))}
${indent(edges.map((edge) => convertEdgeToCode(edge, alias)).join('\n'))}
${!subgraphNode ? '' : 'end'}`;
  return code;
}

/**
 * Converts a node to Mermaid code
 * @param root The root graph
 * @param alias The node id alias resolver
 * @param node The node to convert
 * @returns The converted node
 */
function convertNodeToCode(root: FlatGraph, alias: AliasResolver, node: FlatGraphNode): string {
  let code = '';
  if (root.nodes.filter((n) => n.parentId === node.id).length) {
    code = convertGraphToCode(root, alias, node);
  } else {
    code = alias(node.id);
    switch (node.type) {
      case GraphNodeType.Entry: // shouldn't exist in a simplified graph
      case GraphNodeType.Exit:
        code += '[ ]:::hidden';
        break;
      case GraphNodeType.Start:
        code += '(( ))'; // alt '@{ shape: circle, label: " "}';
        break;
      case GraphNodeType.End:
        code += '((( )))'; // alt '@{ shape: dbl-circ, label: " "}';
        break;
      default:
        code += `["${escapeLabel(node.label || ' ')}"]`; // alt `@{ label: "${node.label}" }`
    }
  }
  return code;
}

/**
 * Converts an edge to Mermaid code
 * @param edge The edge to convert
 * @param alias The node id alias resolver
 * @returns The converted edge
 */
function convertEdgeToCode(edge: GraphEdge, alias: AliasResolver): string {
  const ignoreEndArrow =
    edge.targetId.startsWith('port-') &&
    (edge.targetId.endsWith('-entry-node') || edge.targetId.endsWith('-exit-node'));
  const code = `${alias(edge.sourceId)} ${edge.label ? `--"${escapeLabel(edge.label)}"` : ''}--${ignoreEndArrow ? '-' : '>'} ${alias(edge.targetId)}`;
  return code;
}

/**
 * Converts the provided workflow to Mermaid code.
 * Nodes are rendered under renderer-local aliases (`n0`, `n1`, ...) rather than their graph ids,
 * so the output stays valid whatever characters task names contain.
 * @param workflow The workflow to convert
 * @returns The Mermaid diagram
 */
export function convertToMermaidCode(workflow: Workflow): string {
  const graph = buildFlatGraph(workflow, true);
  const alias = buildAliases(graph);
  return (
    convertGraphToCode(graph, alias) +
    `

classDef hidden width: 1px, height: 1px;` // should be "classDef hidden display: none;" but it can induce a Mermaid bug - https://github.com/mermaid-js/mermaid/issues/6452
  );
}

/**
 * Represents a Mermaid diagram generator for a given workflow.
 * This class takes a workflow definition and converts it into a Mermaid.js-compatible diagram.
 */
export class MermaidDiagram {
  constructor(private workflow: Workflow) {}

  /**
   * Generates the Mermaid code representation of the workflow.
   * @returns The Mermaid diagram source code as a string.
   */
  sourceCode(): string {
    return convertToMermaidCode(this.workflow);
  }
}
