'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/sections/Footer'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import { IconStack, IconDownload, IconExternalLink, IconArrowDown } from '@tabler/icons-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const layersInfo = {
  top: {
    image: '/images_pcb/topside.png'
  },
  bottom: {
    image: '/images_pcb/bottomside.png'
  },
  complete: {
    image: '/images_pcb/all.png'
  }
}

const buildSteps = [
  {
    image: '/scroll_build/0_start.png',
    title: 'Start'
  },
  {
    image: '/scroll_build/1_top_silkscreen.png',
    title: 'Top Silkscreen'
  },
  {
    image: '/scroll_build/2_bottom_silkscreen.png',
    title: 'Bottom Silkscreen'
  },
  {
    image: '/scroll_build/3_topside_layer.png',
    title: 'Topside Layer'
  },
  {
    image: '/scroll_build/4_bottomside_layer.png',
    title: 'Bottomside Layer'
  },
  {
    image: '/scroll_build/6_final_board.png',
    title: 'Final Board'
  }
]

export default function SchematicsClient() {
  const [activeLayer, setActiveLayer] = useState<'top' | 'bottom' | 'complete'>('top')

  const scrollTriggerRef = useRef<HTMLDivElement>(null)
  const scrollPinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
    }

    const trigger = scrollTriggerRef.current
    const pin = scrollPinRef.current
    if (!trigger || !pin) return

    // Set initial GSAP states
    gsap.set('.scroll-build-card', { opacity: 0 })
    gsap.set('.scroll-build-step', { opacity: 0, y: 30, pointerEvents: 'none' })
    gsap.set('.scroll-build-image', { opacity: 0, scale: 0.95 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        pin: pin,
        pinSpacing: true,
      }
    })

    // Timeline stages
    // Step 0: Base
    tl.to('.scroll-build-card', { opacity: 1, duration: 1 })
      .to('.scroll-build-step-0', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1 }, '<')
      .to('.scroll-build-image-0', { opacity: 1, scale: 1, duration: 1 }, '<')
      .to('.scroll-build-hint', { opacity: 0, duration: 0.5 }, '<')
      .to({}, { duration: 1.5 }) // Hold

    // Step 1: Top Silkscreen
    tl.to('.scroll-build-step-0', { opacity: 0, y: -30, pointerEvents: 'none', duration: 1 })
      .to('.scroll-build-step-1', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1 }, '<')
      .to('.scroll-build-image-1', { opacity: 1, scale: 1, duration: 1 }, '<')
      .to({}, { duration: 1.5 }) // Hold

    // Step 2: Bottom Silkscreen
    tl.to('.scroll-build-step-1', { opacity: 0, y: -30, pointerEvents: 'none', duration: 1 })
      .to('.scroll-build-step-2', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1 }, '<')
      .to('.scroll-build-image-2', { opacity: 1, scale: 1, duration: 1 }, '<')
      .to({}, { duration: 1.5 }) // Hold

    // Step 3: Topside Layer
    tl.to('.scroll-build-step-2', { opacity: 0, y: -30, pointerEvents: 'none', duration: 1 })
      .to('.scroll-build-step-3', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1 }, '<')
      .to('.scroll-build-image-3', { opacity: 1, scale: 1, duration: 1 }, '<')
      .to({}, { duration: 1.5 }) // Hold

    // Step 4: Bottomside Layer
    tl.to('.scroll-build-step-3', { opacity: 0, y: -30, pointerEvents: 'none', duration: 1 })
      .to('.scroll-build-step-4', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1 }, '<')
      .to('.scroll-build-image-4', { opacity: 1, scale: 1, duration: 1 }, '<')
      .to({}, { duration: 1.5 }) // Hold

    // Step 5: Final Board
    tl.to('.scroll-build-step-4', { opacity: 0, y: -30, pointerEvents: 'none', duration: 1 })
      .to('.scroll-build-step-5', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1 }, '<')
      .to('.scroll-build-image-5', { opacity: 1, scale: 1, duration: 1 }, '<')
      .to({}, { duration: 1.5 }) // Hold

    // Progress percentage
    tl.to('.scroll-build-pct', {
      innerText: 100,
      snap: { innerText: 1 },
      duration: tl.duration(),
      ease: 'none'
    }, 0)

    // Progress bar width
    tl.to('.scroll-build-bar', {
      width: '100%',
      duration: tl.duration(),
      ease: 'none'
    }, 0)

    // Dynamic glow element animation
    tl.to('.scroll-build-glow', {
      scale: 1.4,
      opacity: 0.7,
      duration: tl.duration(),
      ease: 'none'
    }, 0)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <main className="bg-dark text-white min-h-screen flex flex-col justify-between">
      <Nav />

      <div className="pt-28 pb-16 flex-1 max-w-7xl mx-auto px-6 w-full">
        {/* Heading */}
        <div className="mb-12">
          <SectionHeading
            label="HARDWARE SPEC"
            heading="CAD & SCHEMATICS"
            subheading="Fully open hardware architectures. Download Gerber, layout, and schematic files."
          />
        </div>

        {/* Top Section: Interactive Layer Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Controls */}
          <div className="lg:col-span-4 bg-dark-card border border-dark-border rounded-lg p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-dark-border pb-4">
                <IconStack className="text-yellow" size={18} />
                <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white">Layer Visualizer</h3>
              </div>

              <p className="text-xs text-white/50 mb-6 leading-relaxed">
                Toggle through different PCB CAD layout slices. The viewer simulates physical trace groups and board layers.
              </p>

              <div className="space-y-3">
                {(Object.keys(layersInfo) as Array<keyof typeof layersInfo>).map((layerId) => (
                  <button
                    type="button"
                    key={layerId}
                    onClick={() => setActiveLayer(layerId)}
                    className={`w-full text-left p-3.5 rounded border transition-all ${activeLayer === layerId
                      ? 'border-yellow bg-yellow/5 text-yellow'
                      : 'border-dark-border bg-dark-surface/30 text-white/60 hover:text-white'
                      }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider">
                      {layerId === 'complete' ? 'COMPLETE BOARD' : `${layerId.toUpperCase()} LAYER`}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Viewer Panel */}
          <div className="lg:col-span-8 bg-gray-950 border border-dark-border rounded-lg overflow-hidden flex flex-col justify-center items-center p-6 relative min-h-[400px]">
            {/* Visualizer Frame */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-dark/80 px-3 py-1.5 rounded border border-dark-border z-10 font-mono text-[10px] text-yellow">
              <span className="size-1.5 bg-yellow rounded-full animate-ping"></span>
              RENDER: {activeLayer.toUpperCase()}
            </div>

            <div className="relative w-full h-[320px] md:h-[400px]">
              <Image
                src={layersInfo[activeLayer].image}
                alt="Marut FCU PCB Layer Render"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain transition-all duration-700 ease-in-out"
                priority
              />
            </div>
          </div>
        </div>

        {/* Scroll-Jacked PCB Builder Section */}
        <div
          ref={scrollTriggerRef}
          className="relative w-full h-[400vh] bg-gray-950/60 border border-dark-border rounded-lg mb-16 overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        >
          {/* Pinned viewport */}
          <div ref={scrollPinRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden p-6 md:p-12">

            {/* Glowing background */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full opacity-30 blur-3xl pointer-events-none z-0 scroll-build-glow"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)'
              }}
            ></div>

            {/* Scroll start helper hint */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none scroll-build-hint transition-opacity duration-500 z-20">
              <div className="text-center bg-dark/80 backdrop-blur-md px-6 py-4 rounded-lg border border-yellow/20 shadow-[0_0_30px_rgba(234,179,8,0.05)]">
                <div className="text-yellow text-xs font-bold uppercase tracking-widest mb-3 animate-pulse font-mono">SCROLL TO BUILD MARUT FCU</div>
                <IconArrowDown className="mx-auto text-yellow animate-bounce" size={24} />
              </div>
            </div>

            {/* Main content grid */}
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 relative">
              {/* Left Column: Assembly Steps */}
              <div className="lg:col-span-5 relative h-[220px] md:h-[260px] flex items-center bg-dark/40 border border-dark-border/60 rounded-xl p-6 md:p-8 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.3)] scroll-build-card">
                {buildSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-x-6 md:inset-x-8 flex flex-col justify-center scroll-build-step scroll-build-step-${idx}`}
                  >
                    <div className="text-yellow text-[10px] font-black tracking-widest uppercase mb-2 font-mono">
                      STAGE 0{idx + 1} / 06
                    </div>
                    <h3 className="text-xl md:text-2xl font-unbounded font-black uppercase text-white mb-3">
                      {step.title}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Right Column: Dynamic PCB Viewer */}
              <div className="lg:col-span-7 flex justify-center items-center relative aspect-square w-full max-w-[420px] mx-auto md:max-w-none md:h-[454px]">
                {buildSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 flex items-center justify-center scroll-build-image scroll-build-image-${idx}`}
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed Bottom Progress Bar */}
            <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 z-20 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-white/40 tracking-wider">
                <span>MARUT PCB PRODUCTION MONITOR</span>
                <span>
                  STATUS: <span className="scroll-build-pct font-bold text-yellow">0</span>% ASSEMBLED
                </span>
              </div>
              <div className="w-full h-1 bg-dark-border rounded-full overflow-hidden">
                <div className="h-full bg-yellow w-0 scroll-build-bar rounded-full"></div>
              </div>
            </div>

          </div>
        </div>

        {/* CAD Downloads Hub */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 md:p-8">
          <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white mb-6 border-b border-dark-border pb-4">
            CAD File Repositories
          </h3>
          <p className="text-xs text-white/50 mb-8 max-w-3xl leading-relaxed">
            All design schematics, CAD assembly files, BOM component specifications, and ready-to-fabricate Gerber files are completely open source. You are free to download, customize, and fabricate boards for your projects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'PDF Schematics',
                desc: 'Complete full multi-page hardware schematic drawing details, signal pathways, and component layouts.',
                format: 'PDF (v1.2)',
                btnLabel: 'DOWNLOAD SCHEMATIC',
                href: '/schematics/schematics_pdf.pdf',
                download: true,
                target: '_blank'
              },
              {
                title: 'Gerber Packages',
                desc: 'Ready-to-manufacture ZIP files containing drill coordinate files, cooper layer traces, and mask patterns.',
                format: 'ZIP (Standard RS-274X)',
                btnLabel: 'DOWNLOAD GERBERS',
                href: 'https://github.com/lawslefthand/Marut_FCU/',
                target: '_blank'
              },
              {
                title: 'EasyEDA Project Files',
                desc: 'Active design file directories. Edit schematics, adjust routing paths, or modify component sizes.',
                format: 'EASYEDA (v3.0)',
                btnLabel: 'CLONE DESIGN DIRECTORY',
                href: 'https://github.com/lawslefthand/Marut_FCU/',
                target: '_blank'
              }
            ].map((card) => (
              <div key={card.title} className="bg-dark border border-dark-border rounded p-6 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-extrabold text-yellow uppercase tracking-widest mb-1">{card.format}</div>
                  <h4 className="text-sm font-unbounded font-black uppercase text-white mb-3">{card.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed mb-6 font-sans">{card.desc}</p>
                </div>
                <Button variant="secondary" href={card.href} download={card.download} target={card.target} rel="noopener noreferrer">
                  <IconDownload size={14} className="inline mr-1" /> {card.btnLabel}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-white/40 font-mono">Licensed under CERN Open Hardware License v2 - Permissive</span>
            <a
              href="https://github.com/lawslefthand/Marut_FCU/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-yellow hover:text-yellow-hover flex items-center gap-1 transition-colors"
            >
              PROJECT REPOSITORY ON GITHUB <IconExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
