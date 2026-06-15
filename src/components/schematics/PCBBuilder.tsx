'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { IconArrowDown } from '@tabler/icons-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

export default function PCBBuilder() {
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
            <IconArrowDown className="mx-auto text-yellow animate-pulse" size={24} />
          </div>
        </div>

        {/* Main content grid */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 relative">
          {/* Left Column: Assembly Steps */}
          <div className="lg:col-span-5 relative h-[220px] md:h-[260px] flex items-center bg-dark/40 border border-dark-border/60 rounded-xl p-6 md:p-8 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.3)] scroll-build-card">
            {buildSteps.map((step, idx) => (
              <div
                key={step.title}
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
                key={step.title}
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
  )
}
