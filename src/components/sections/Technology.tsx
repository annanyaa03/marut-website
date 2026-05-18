import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { IconPlane, IconDrone, IconPropeller } from '@tabler/icons-react'

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
    body: 'Battle-tested multirotor firmware with support for quadcopters, hexacopters, octocopters, and custom frame geometries.',
  },
]

export default function Technology() {
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
        {modes.map((mode, idx) => {
          const Icon = mode.icon
          return (
            <div key={idx} className="relative bg-dark-card border border-dark-border rounded-lg p-8 group hover:border-yellow/40 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-yellow opacity-0 group-hover:opacity-100 transition-opacity rounded-l-lg" />
              <Icon size={32} className="text-yellow mb-6" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">{mode.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{mode.body}</p>
            </div>
          )
        })}
      </div>
      
      <div className="border border-dark-border rounded-lg p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="text-xl font-bold text-white">&quot;All three modes. One unified codebase. One community.&quot;</p>
        <Button variant="primary">EXPLORE THE ARCHITECTURE →</Button>
      </div>
    </section>
  )
}
