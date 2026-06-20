'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IconZoomIn, IconZoomOut, IconMaximize, IconDownload, IconX, IconSitemap } from '@tabler/icons-react'

interface DiagramModalProps {
  onClose: () => void
  svgPath: string
  title: string
}

export default function DiagramModal({ onClose, svgPath, title }: DiagramModalProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  
  const containerRef = useRef<HTMLDivElement>(null)

  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // Manage body scroll lock and escape key
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Manage mouse wheel zoom
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const zoomFactor = 0.08
      if (e.deltaY < 0) {
        setScale((prev: number) => Math.min(prev + zoomFactor, 4))
      } else {
        setScale((prev: number) => Math.max(prev - zoomFactor, 0.5))
      }
    }

    // react-doctor-disable-next-line react-doctor/client-passive-event-listeners
    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const handleZoomIn = () => setScale((prev: number) => Math.min(prev + 0.25, 4))
  const handleZoomOut = () => setScale((prev: number) => Math.max(prev - 0.25, 0.5))
  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    })
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }

  // Touch drag handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      const touch = e.touches[0]
      dragStart.current = { x: touch.clientX - position.x, y: touch.clientY - position.y }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      setPosition({
        x: touch.clientX - dragStart.current.x,
        y: touch.clientY - dragStart.current.y
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300">
      {/* Modal Container */}
      <div className="relative w-[95vw] h-[90vh] max-w-7xl bg-dark-card border border-dark-border rounded-xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border bg-dark/40 backdrop-blur-sm z-10">
          <div>
            <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white">
              {title}
            </h3>
            <p className="text-[10px] text-white/50 tracking-wider font-mono mt-0.5">
              Drag to pan • Scroll or use buttons to zoom
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/architecture"
              className="px-4 py-2 bg-yellow hover:bg-yellow-hover text-dark text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 font-semibold"
              onClick={onClose}
            >
              <IconSitemap size={16} />
              <span className="hidden sm:inline">Interactive Mind Map</span>
              <span className="inline sm:hidden">Interactive</span>
            </Link>
            <button 
              type="button" 
              onClick={onClose}
              className="p-2 text-white/60 hover:text-yellow hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <IconX size={20} />
            </button>
          </div>
        </div>

        {/* Viewport Area */}
        <div 
          ref={containerRef}
          role="none"
          className={`flex-1 relative overflow-hidden bg-gray-950/80 cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Outer Grid lines for technical background aesthetic */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          ></div>

          {/* SVG Container */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out select-none"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center'
            }}
          >
            <Image 
              src={svgPath} 
              alt={title}
              width={1200}
              height={800}
              className="max-w-[90%] max-h-[90%] object-contain pointer-events-none"
              draggable="false"
              priority
            />
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-t border-dark-border bg-dark/40 backdrop-blur-sm z-10 gap-4">
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={handleZoomOut}
              className="p-2 bg-dark-surface/50 hover:bg-dark-surface border border-dark-border hover:border-yellow/50 rounded text-white hover:text-yellow transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Zoom Out"
            >
              <IconZoomOut size={16} />
            </button>
            <span className="text-xs font-mono text-white/60 min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button 
              type="button" 
              onClick={handleZoomIn}
              className="p-2 bg-dark-surface/50 hover:bg-dark-surface border border-dark-border hover:border-yellow/50 rounded text-white hover:text-yellow transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Zoom In"
            >
              <IconZoomIn size={16} />
            </button>
            <button 
              type="button" 
              onClick={handleReset}
              className="p-2 bg-dark-surface/50 hover:bg-dark-surface border border-dark-border hover:border-yellow/50 rounded text-white hover:text-yellow transition-all flex items-center gap-1.5 text-xs font-semibold ml-2"
              title="Reset View"
            >
              <IconMaximize size={16} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          <a 
            href={svgPath}
            download="marut_full_architecture.svg"
            className="px-4 py-2 bg-yellow hover:bg-yellow-hover text-dark rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <IconDownload size={16} />
            Download SVG
          </a>
        </div>
      </div>
    </div>
  )
}
