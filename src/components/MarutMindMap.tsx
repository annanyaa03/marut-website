'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  type Node,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  type ReactFlowInstance,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import MarutNode from './MarutNode';
import { initialNodes, initialEdges, MarutNodeData } from './marutMindMapData';
import { toggleCollapse, getLayoutedElements } from './collapseUtils';

const NODE_TYPES = { marutNode: MarutNode };

const MINIMAP_NODE_COLOR = (node: Node) => {
  const data = node.data as MarutNodeData | undefined;
  switch (data?.category) {
    case 'root': return '#4A5568';
    case 'branch': return '#2D9E75';
    case 'section': return '#2B6CB0';
    case 'task': return '#6B46C1';
    default: return '#276749';
  }
};

function MindMapCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<MarutNodeData>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const rfInstance = useRef<ReactFlowInstance<Node<MarutNodeData>> | null>(null);
  const initialized = useRef(false);
  const [isInteractive, setIsInteractive] = useState(true);

  const handleToggle = useCallback(
    (nodeId: string) => {
      setNodes((currentNodes) => {
        setEdges((currentEdges) => {
          const { nodes: newNodes, edges: newEdges } = toggleCollapse(nodeId, currentNodes, currentEdges);
          // We must update the edges using the functional state updater
          // and we will update the nodes by returning the newNodes from the outer updater
          setTimeout(() => setNodes(newNodes), 0);
          return newEdges;
        });
        return currentNodes;
      });
    },
    [setNodes, setEdges]
  );

  useEffect(() => {
    (window as unknown as { __marutToggle?: (id: string) => void }).__marutToggle = handleToggle;
    return () => {
      delete (window as unknown as { __marutToggle?: (id: string) => void }).__marutToggle;
    };
  }, [handleToggle]);

  const fitView = useCallback(() => {
    rfInstance.current?.fitView({ padding: 0.12, duration: 500 });
  }, []);

  const onInit = useCallback(
    (instance: ReactFlowInstance<Node<MarutNodeData>>) => {
      rfInstance.current = instance;
      if (!initialized.current) {
        initialized.current = true;
        setTimeout(() => instance.fitView({ padding: 0.12, duration: 600 }), 100);
      }
    },
    []
  );

  const collapseAll = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);

  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        background: '#0F1923',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #2D3748',
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .react-flow__pane {
          cursor: ${isInteractive ? 'grab' : 'default'} !important;
        }
        .react-flow__pane:active {
          cursor: ${isInteractive ? 'grabbing' : 'default'} !important;
        }
        .react-flow__node {
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-out !important;
        }
        .react-flow__edge-path {
          transition: opacity 0.35s ease-out !important;
        }
        .react-flow__controls {
          box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid #2D3748 !important;
        }
        .react-flow__controls-button {
          background: #1A2535 !important;
          color: #BEE3F8 !important;
          fill: #BEE3F8 !important;
          border: none !important;
          border-bottom: 1px solid #2D3748 !important;
          transition: background 0.15s, color 0.15s !important;
          width: 26px !important;
          height: 26px !important;
        }
        .react-flow__controls-button:last-child {
          border-bottom: none !important;
        }
        .react-flow__controls-button:hover {
          background: #2D3748 !important;
          color: #9AE6B4 !important;
        }
        .react-flow__controls-button svg {
          fill: currentColor !important;
        }
      `}} />
      <ReactFlow
        nodes={layoutedNodes}
        edges={layoutedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={NODE_TYPES}
        onInit={onInit}
        fitView
        minZoom={0.15}
        maxZoom={2}
        nodesDraggable={isInteractive}
        nodesConnectable={isInteractive}
        elementsSelectable={isInteractive}
        panOnDrag={isInteractive}
        zoomOnScroll={isInteractive}
        zoomOnPinch={isInteractive}
        zoomOnDoubleClick={isInteractive}
        defaultEdgeOptions={{
          style: { stroke: '#4A5568', strokeWidth: 1.5 },
          animated: false,
        }}
        proOptions={{ hideAttribution: false }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#1E2D3D"
        />

        <Controls onInteractiveChange={setIsInteractive} />

        <MiniMap
          nodeColor={MINIMAP_NODE_COLOR}
          maskColor="rgba(0,0,0,0.5)"
          style={{
            background: '#0D1520',
            border: '1px solid #2D3748',
            borderRadius: 8,
          }}
        />

        <Panel position="top-left">
          <div
            style={{
              display: 'flex',
              gap: 8,
              background: '#1A2535',
              border: '1px solid #2D3748',
              borderRadius: 8,
              padding: '8px 12px',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#9AE6B4',
                letterSpacing: '0.02em',
              }}
            >
              Marut FCU
            </span>
            <span style={{ color: '#4A5568', fontSize: 12 }}>|</span>
            <button
              onClick={fitView}
              type="button"
              style={{
                background: 'transparent',
                border: '1px solid #2D3748',
                borderRadius: 6,
                color: '#BEE3F8',
                fontSize: 12,
                padding: '3px 10px',
                cursor: 'pointer',
              }}
            >
              Fit view
            </button>
            <button
              onClick={collapseAll}
              type="button"
              style={{
                background: 'transparent',
                border: '1px solid #2D3748',
                borderRadius: 6,
                color: '#E9D8FD',
                fontSize: 12,
                padding: '3px 10px',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </div>
        </Panel>

      </ReactFlow>
    </div>
  );
}

export default function MarutMindMap() {
  return (
    <ReactFlowProvider>
      <MindMapCanvas />
    </ReactFlowProvider>
  );
}
