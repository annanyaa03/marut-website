import { type Node, type Edge } from '@xyflow/react';
import { MarutNodeData } from './marutMindMapData';

/**
 * Given the full node list, collect ALL descendant IDs of `nodeId`
 * by walking childIds recursively.
 */
function collectDescendants(nodeId: string, allNodes: Node<MarutNodeData>[]): string[] {
  const nodeMap = new Map(allNodes.map((n) => [n.id, n]));
  const result: string[] = [];
  const queue = [nodeId];

  while (queue.length) {
    const current = queue.shift()!;
    const node = nodeMap.get(current);
    if (!node) continue;
    for (const childId of node.data.childIds ?? []) {
      result.push(childId);
      queue.push(childId);
    }
  }

  return result;
}

/**
 * Toggle collapse state on a node.
 * Returns updated nodes + edges with hidden flags applied.
 */
export function toggleCollapse(
  toggledId: string,
  nodes: Node<MarutNodeData>[],
  edges: Edge[]
): { nodes: Node<MarutNodeData>[]; edges: Edge[] } {
  const toggled = nodes.find((n) => n.id === toggledId);
  if (!toggled) return { nodes, edges };

  const nextCollapsed = !toggled.data.collapsed;
  const descendants = collectDescendants(toggledId, nodes);

  const updatedNodes = nodes.map((n) => {
    if (n.id === toggledId) {
      return { ...n, data: { ...n.data, collapsed: nextCollapsed } };
    }
    if (descendants.includes(n.id)) {
      return { ...n, hidden: nextCollapsed };
    }
    return n;
  });

  const updatedEdges = edges.map((e) => {
    if (
      (descendants.includes(e.source) && e.source !== toggledId) ||
      descendants.includes(e.target) ||
      (e.source === toggledId && nextCollapsed)
    ) {
      return { ...e, hidden: nextCollapsed };
    }
    return e;
  });

  return { nodes: updatedNodes, edges: updatedEdges };
}
