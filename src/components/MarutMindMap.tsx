'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  type ReactFlowInstance,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import MarutNode from './MarutNode';
import { initialNodes, initialEdges, MarutNodeData } from './marutMindMapData';
import { toggleCollapse } from './collapseUtils';

const NODE_TYPES = { marutNode: MarutNode };

const MINIMAP_NODE_COLOR = (node: Node) => {
  const data = node.data as MarutNodeData | undefined;
  switch (data?.category) {
    case 'root':    return '#4A5568';
    case 'branch':  return '#2D9E75';
    case 'section': return '#2B6CB0';
    case 'task':    return '#6B46C1';
    default:        return '#276749';
  }
};

function MindMapCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<MarutNodeData>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<Node<MarutNodeData>> | null>(null);
  const initialized = useRef(false);

  const handleToggle = useCallback(
    (nodeId: string) => {
      setNodes((nds: Node<MarutNodeData>[]) => {
        setEdges((eds: Edge[]) => {
          const result = toggleCollapse(nodeId, nds, eds);
          setNodes(result.nodes as Node<MarutNodeData>[]);
          setEdges(result.edges);
          return result.edges;
        });
        return nds;
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
    rfInstance?.fitView({ padding: 0.12, duration: 500 });
  }, [rfInstance]);

  const onInit = useCallback(
    (instance: ReactFlowInstance<Node<MarutNodeData>>) => {
      setRfInstance(instance);
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
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={NODE_TYPES}
        onInit={onInit}
        fitView
        minZoom={0.15}
        maxZoom={2}
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

        <Controls
          style={{
            background: '#1A2535',
            border: '1px solid #2D3748',
            borderRadius: 8,
          }}
        />

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
              Marut UAV System
            </span>
            <span style={{ color: '#4A5568', fontSize: 12 }}>|</span>
            <button
              onClick={fitView}
              style={{
                background: 'transparent',
                border: '1px solid #2D3748',
                borderRadius: 6,
                color: '#BEE3F8',
                fontSize: 11,
                padding: '3px 10px',
                cursor: 'pointer',
              }}
            >
              Fit view
            </button>
            <button
              onClick={collapseAll}
              style={{
                background: 'transparent',
                border: '1px solid #2D3748',
                borderRadius: 6,
                color: '#E9D8FD',
                fontSize: 11,
                padding: '3px 10px',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </div>
        </Panel>

        <Panel position="top-right">
          <div
            style={{
              background: '#1A2535',
              border: '1px solid #2D3748',
              borderRadius: 8,
              padding: '8px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            {[
              { color: '#68D391', label: 'Root / Branch' },
              { color: '#63B3ED', label: 'Section' },
              { color: '#B794F4', label: 'Task' },
              { color: '#9AE6B4', label: 'Leaf' },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 11, color: '#A0AEC0' }}>{label}</span>
              </div>
            ))}
            <div
              style={{
                borderTop: '1px solid #2D3748',
                marginTop: 4,
                paddingTop: 4,
                fontSize: 10,
                color: '#4A5568',
              }}
            >
              Click ± to expand/collapse
            </div>
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
