'use client';

import { memo, useCallback, useMemo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { MarutNodeData } from './marutMindMapData';

const CATEGORY_STYLES: Record<
  MarutNodeData['category'],
  { bg: string; border: string; text: string; dot: string }
> = {
  root:    { bg: '#2D3748', border: '#4A5568', text: '#F7FAFC', dot: '#68D391' },
  branch:  { bg: '#2C4A3E', border: '#2D9E75', text: '#C6F6D5', dot: '#68D391' },
  section: { bg: '#1A365D', border: '#2B6CB0', text: '#BEE3F8', dot: '#63B3ED' },
  task:    { bg: '#44337A', border: '#6B46C1', text: '#E9D8FD', dot: '#B794F4' },
  leaf:    { bg: '#1A3A2A', border: '#276749', text: '#9AE6B4', dot: '#68D391' },
};

interface MarutNodeProps extends NodeProps<Node<MarutNodeData>> {
  onToggle?: (id: string) => void;
}

function MarutNode({ id, data, selected }: MarutNodeProps) {
  const style = CATEGORY_STYLES[data.category];
  const hasChildren = data.childIds && data.childIds.length > 0;

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      (window as unknown as { __marutToggle?: (id: string) => void }).__marutToggle?.(id);
    },
    [id]
  );

  const handleToggleLeft = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      (window as unknown as { __marutToggle?: (id: string) => void }).__marutToggle?.('root-left');
    },
    []
  );

  const handleToggleRight = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      (window as unknown as { __marutToggle?: (id: string) => void }).__marutToggle?.('root-right');
    },
    []
  );

  const isRoot = data.category === 'root';
  const side = data.side || 'right';

  const containerStyle = useMemo(() => ({
    background: style.bg,
    border: `1.5px solid ${selected ? '#F6AD55' : style.border}`,
    borderRadius: '8px',
    padding: '8px 14px',
    minWidth: data.category === 'root' ? 160 : data.category === 'section' ? 200 : 180,
    maxWidth: 240,
    cursor: 'default',
    boxShadow: selected ? `0 0 0 2px #F6AD5566` : 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    display: 'flex',
    flexDirection: (side === 'left' ? 'row-reverse' : 'row') as 'row-reverse' | 'row',
    alignItems: 'center',
    gap: 8,
    position: 'relative' as const,
  }), [style.bg, selected, style.border, data.category, side]);

  const leftButtonStyle = useMemo(() => ({
    position: 'absolute' as const,
    left: -9,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    background: '#2D3748',
    border: `1.5px solid ${style.border}`,
    borderRadius: '50%',
    width: 18,
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: style.text,
    fontSize: 12,
    lineHeight: 1,
    padding: 0,
  }), [style.border, style.text]);

  const rightButtonStyle = useMemo(() => ({
    position: 'absolute' as const,
    right: -9,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    background: '#2D3748',
    border: `1.5px solid ${style.border}`,
    borderRadius: '50%',
    width: 18,
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: style.text,
    fontSize: 12,
    lineHeight: 1,
    padding: 0,
  }), [style.border, style.text]);

  const toggleButtonStyle = useMemo(() => ({
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '50%',
    width: 18,
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    color: style.text,
    fontSize: 12,
    lineHeight: 1,
    padding: 0,
    transition: 'background 0.1s',
  }), [style.text]);

  return (
    <div style={containerStyle}>
      {/* Target Handle (for incoming connections) */}
      {!isRoot && (
        <Handle
          type="target"
          position={side === 'left' ? Position.Right : Position.Left}
          style={{ background: style.dot, border: 'none', width: 7, height: 7 }}
        />
      )}

      {/* Root Target Handle (if any back-references exist, optional) */}
      {isRoot && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: style.dot, border: 'none', width: 7, height: 7, opacity: 0 }}
        />
      )}

      {!isRoot && (
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: style.dot,
            flexShrink: 0,
          }}
        />
      )}

      <span
        style={{
          color: style.text,
          fontSize: data.category === 'root' ? 13 : 12,
          fontWeight: data.category === 'root' || data.category === 'branch' ? 600 : 400,
          lineHeight: 1.35,
          flex: 1,
          textAlign: isRoot ? 'center' : 'left',
          userSelect: 'none',
        }}
      >
        {data.label}
      </span>

      {/* Dual collapse buttons for root */}
      {isRoot && (
        <>
          <button
            onClick={handleToggleLeft}
            type="button"
            title={data.collapsedLeft ? 'Expand Hardware' : 'Collapse Hardware'}
            style={leftButtonStyle}
          >
            {data.collapsedLeft ? (
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 1V7M1 4H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
          <button
            onClick={handleToggleRight}
            type="button"
            title={data.collapsedRight ? 'Expand Software' : 'Collapse Software'}
            style={rightButtonStyle}
          >
            {data.collapsedRight ? (
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 1V7M1 4H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </>
      )}

      {hasChildren && !isRoot && (
        <button
          onClick={handleToggle}
          type="button"
          title={data.collapsed ? 'Expand' : 'Collapse'}
          style={toggleButtonStyle}
        >
          {data.collapsed ? (
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 1V7M1 4H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      )}

      {/* Source Handle (for outgoing connections) */}
      {isRoot ? (
        <>
          <Handle
            type="source"
            position={Position.Right}
            id="right"
            style={{ background: style.dot, border: 'none', width: 7, height: 7 }}
          />
          <Handle
            type="source"
            position={Position.Left}
            id="left"
            style={{ background: style.dot, border: 'none', width: 7, height: 7 }}
          />
        </>
      ) : (
        hasChildren && (
          <Handle
            type="source"
            position={side === 'left' ? Position.Left : Position.Right}
            style={{ background: style.dot, border: 'none', width: 7, height: 7 }}
          />
        )
      )}
    </div>
  );
}

export default memo(MarutNode);
