'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import SectionHeading from '@/components/ui/SectionHeading'
import { IconX, IconChevronLeft, IconChevronRight, IconMaximize } from '@tabler/icons-react'

const galleryImages = [
  {
    src: '/progress/image 1.png',
    title: 'Top Assembly Render',
    description: '3D CAD render highlighting the top components placement, including the MCU, sensor array, and high-profile connectors of the Through-Hole (TH) PCB design.',
    badge: 'TOP VIEW'
  },
  {
    src: '/progress/image 2.png',
    title: 'Isometic Assembly',
    description: 'Angled perspective render showing the spatial layout and structural height clearance of the discrete capacitors, headers, and shield components.',
    badge: 'ISOMETRIC'
  },
  {
    src: '/progress/image 3.png',
    title: 'Bottom Component Layout',
    description: 'Render displaying trace routing geometry, ground planes, and bottom-side auxiliary components designed for ease of hand-soldering and community debugging.',
    badge: 'BOTTOM VIEW'
  }
]

export default function ProgressGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxIndex])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const navigateLightbox = useCallback((direction: 'next' | 'prev') => {
    if (lightboxIndex === null) return
    let newIndex = direction === 'next' ? lightboxIndex + 1 : lightboxIndex - 1
    if (newIndex >= galleryImages.length) newIndex = 0
    if (newIndex < 0) newIndex = galleryImages.length - 1
    setLightboxIndex(newIndex)
  }, [lightboxIndex])

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') navigateLightbox('next')
      if (e.key === 'ArrowLeft') navigateLightbox('prev')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, navigateLightbox])

  return (
    <section id="gallery" className="section-padding bg-dark border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <SectionHeading
            label="PCB EVOLUTION"
            heading="3D Renders (TH Version)"
            subheading="Visualizing the through-hole prototype board architecture"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryImages.map((image, idx) => (
            <div 
              key={idx} 
              className="group bg-dark-card border border-dark-border rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-yellow/40 hover:shadow-[0_0_20px_rgba(0,255,85,0.05)]"
            >
              {/* Image container */}
              <div 
                className="relative h-64 w-full overflow-hidden bg-black/40 cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-yellow font-semibold tracking-wider text-xs uppercase bg-dark/80 px-4 py-2 rounded border border-yellow/30">
                    <IconMaximize size={14} /> EXAMINE
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-yellow text-dark text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                  {image.badge}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-white font-unbounded font-semibold text-base mb-3 group-hover:text-yellow transition-colors">
                  {image.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">
                  {image.description}
                </p>
                <button
                  onClick={() => openLightbox(idx)}
                  className="text-yellow text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 hover:text-yellow-hover transition-colors w-fit pt-2 mt-auto"
                >
                  FULL VIEW <IconMaximize size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between p-6">
          {/* Header */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-yellow uppercase">
                Image {lightboxIndex + 1} of {galleryImages.length}
              </span>
              <h4 className="text-lg font-unbounded font-black uppercase">
                {galleryImages[lightboxIndex].title}
              </h4>
            </div>
            <button 
              onClick={closeLightbox}
              className="text-white/60 hover:text-white bg-dark-surface p-2 rounded-full border border-dark-border transition-colors"
            >
              <IconX size={24} />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full flex-1 my-4 gap-4 relative">
            {/* Left Nav */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="hidden sm:flex text-white bg-dark-surface/80 hover:bg-yellow hover:text-dark p-3 rounded-full border border-dark-border hover:border-yellow transition-all items-center justify-center z-10"
            >
              <IconChevronLeft size={24} />
            </button>

            {/* Image Wrapper */}
            <div className="relative flex-1 h-full w-full max-h-[70vh] flex items-center justify-center">
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Right Nav */}
            <button
              onClick={() => navigateLightbox('next')}
              className="hidden sm:flex text-white bg-dark-surface/80 hover:bg-yellow hover:text-dark p-3 rounded-full border border-dark-border hover:border-yellow transition-all items-center justify-center z-10"
            >
              <IconChevronRight size={24} />
            </button>
          </div>

          {/* Footer Description */}
          <div className="max-w-4xl mx-auto w-full text-center text-white/70 text-sm py-4 border-t border-dark-border/40">
            <p className="max-w-2xl mx-auto leading-relaxed">
              {galleryImages[lightboxIndex].description}
            </p>
            {/* Mobile swipe/nav hint */}
            <div className="flex sm:hidden justify-center gap-6 mt-4">
              <button 
                onClick={() => navigateLightbox('prev')}
                className="flex items-center gap-1 text-xs font-bold tracking-widest text-yellow uppercase"
              >
                <IconChevronLeft size={16} /> PREV
              </button>
              <button 
                onClick={() => navigateLightbox('next')}
                className="flex items-center gap-1 text-xs font-bold tracking-widest text-yellow uppercase"
              >
                NEXT <IconChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
