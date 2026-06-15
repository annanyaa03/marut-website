'use client'

import { useState } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { IconPlane, IconDrone, IconPropeller } from '@tabler/icons-react'
import DiagramModal from '@/components/ui/DiagramModal'

const modes = [
  {
    icon: IconPlane,
    title: 'FIXED WING',
    body: 'Optimised PID loops for fixed-wing aerodynamics, with full support for traditional rudder, elevator, and aileron configurations.',
  },
  {
    icon: IconDrone,
    title: 'VTOL',
    body: 'Seamless transition logic between hover and cruise modes. Handles tilt-rotor, tailsitter, and hybrid VTOL configurations.',
  },
  {
    icon: IconPropeller,
    title: 'MULTIROTOR',
    body: 'Proposed multirotor firmware with support for quadcopters, hexacopters and custom frame geometries.',
  },
]

export default function Technology() {
  const [viewerOpen, setViewerOpen] = useState(false)

  return (
    <section id="technology" className="section-padding max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <SectionHeading
          label="THE TECHNOLOGY"
          heading="One FCU. Three Modes."
          subheading="Infinite possibilities."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {modes.map((mode) => {
          const Icon = mode.icon
          return (
            <div key={mode.title} className="relative bg-dark-card border border-dark-border rounded-lg p-8 group hover:border-yellow/40 hover:shadow-[0_0_20px_rgba(0,255,85,0.15)] transition-all duration-300">
              <Icon size={32} className="text-yellow mb-6" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">{mode.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{mode.body}</p>
            </div>
          )
        })}
      </div>

      <div className="border border-dark-border rounded-lg p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="text-xl font-bold text-white">&quot;All three modes. One unified codebase. One community.&quot;</p>
        
        <Button variant="primary" onClick={() => setViewerOpen(true)}>
          EXPLORE THE ARCHITECTURE
        </Button>
      </div>

      {viewerOpen && (
        <DiagramModal
          onClose={() => setViewerOpen(false)}
          svgPath="/assets/marut_full_architecture.svg"
          title="Marut Full Architecture Diagram"
        />
      )}
    </section>
  )
}
