import type React from 'react';
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
  if (toggledId === 'root-left' || toggledId === 'root-right') {
    const rootNode = nodes.find((n) => n.id === 'root');
    if (!rootNode) return { nodes, edges };

    const isLeft = toggledId === 'root-left';
    const field = isLeft ? 'collapsedLeft' : 'collapsedRight';
    const nextCollapsed = !rootNode.data[field];

    const branchId = isLeft ? 'hw' : 'sw';
    const descendants = collectDescendants(branchId, nodes);
    const allTargetIds = [branchId, ...descendants];

    const updatedNodes = nodes.map((n) => {
      if (n.id === 'root') {
        return { ...n, data: { ...n.data, [field]: nextCollapsed } };
      }
      if (allTargetIds.includes(n.id)) {
        return { ...n, data: { ...n.data, collapsed: nextCollapsed } };
      }
      return n;
    });

    return { nodes: updatedNodes, edges };
  }

  const toggled = nodes.find((n) => n.id === toggledId);
  if (!toggled) return { nodes, edges };

  const nextCollapsed = !toggled.data.collapsed;
  const descendants = collectDescendants(toggledId, nodes);

  const updatedNodes = nodes.map((n) => {
    if (n.id === toggledId) {
      return { ...n, data: { ...n.data, collapsed: nextCollapsed } };
    }
    if (descendants.includes(n.id)) {
      return { ...n, data: { ...n.data, collapsed: nextCollapsed } };
    }
    return n;
  });

  return { nodes: updatedNodes, edges };
}

export function getLayoutedElements(
  nodes: Node<MarutNodeData>[],
  edges: Edge[]
): { nodes: Node<MarutNodeData>[]; edges: Edge[] } {
  const parentMap = new Map<string, string>();
  edges.forEach((edge) => {
    parentMap.set(edge.target, edge.source);
  });

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const layoutedNodes = nodes.map((node) => {
    let currentId = node.id;
    let isHidden = false;
    let nearestVisibleAncestor = node;

    // Traverse up the parent tree
    while (parentMap.has(currentId)) {
      const parentId = parentMap.get(currentId)!;
      const parent = nodeMap.get(parentId);
      if (!parent) break;

      if (parentId === 'root') {
        const isLeft = node.data.side === 'left';
        const rootCollapsed = isLeft ? parent.data.collapsedLeft : parent.data.collapsedRight;
        if (rootCollapsed) {
          isHidden = true;
          nearestVisibleAncestor = parent;
        }
      } else if (parent.data.collapsed) {
        isHidden = true;
        nearestVisibleAncestor = parent;
      }

      currentId = parentId;
    }

    const position = isHidden
      ? { x: nearestVisibleAncestor.position.x, y: nearestVisibleAncestor.position.y }
      : { x: node.position.x, y: node.position.y };

    return {
      ...node,
      style: {
        ...node.style,
        opacity: isHidden ? 0 : 1,
        pointerEvents: (isHidden ? 'none' : 'auto') as React.CSSProperties['pointerEvents'],
      },
      position,
    };
  });

  const layoutedEdges = edges.map((edge) => {
    const targetNode = layoutedNodes.find((n) => n.id === edge.target);
    const sourceNode = layoutedNodes.find((n) => n.id === edge.source);
    const isHidden = (targetNode?.style?.opacity === 0) || (sourceNode?.style?.opacity === 0);

    return {
      ...edge,
      style: {
        ...edge.style,
        opacity: isHidden ? 0 : 1,
        transition: 'opacity 0.35s ease-out',
      },
    };
  });

  return { nodes: layoutedNodes, edges: layoutedEdges };
}
