import SectionHeading from '@/components/ui/SectionHeading'
import { IconCheck } from '@tabler/icons-react'

type MilestoneStatus = 'done' | 'in-progress' | 'planned'

const milestones: { status: MilestoneStatus; text: string }[] = [
  { status: 'done',        text: 'Core firmware architecture' },
  { status: 'done',        text: 'Fixed Wing mode — alpha' },
  { status: 'in-progress', text: 'Multirotor mode — beta' },
  { status: 'in-progress', text: 'VTOL transition logic' },
  { status: 'planned',     text: 'Hardware reference design v1' },
  { status: 'planned',     text: 'Companion computer integration' },
  { status: 'planned',     text: 'Ground control station plugin' },
]

export default function Roadmap() {
  return (
    <section id="about" className="section-padding bg-dark-surface">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionHeading 
            label="ROADMAP" 
            heading="WHERE WE'RE GOING" 
          />
        </div>
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-dark-border" />
          
          {milestones.map((milestone, idx) => (
            <div key={idx} className="relative flex items-start gap-6 mb-10 last:mb-0">
              <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                milestone.status === 'done' ? 'border-yellow bg-dark-surface' : 
                milestone.status === 'in-progress' ? 'border-yellow bg-yellow animate-pulse' : 
                'border-dark-border bg-dark-surface'
              }`}>
                {milestone.status === 'done' && <IconCheck size={14} className="text-yellow" />}
                {milestone.status === 'in-progress' && <div className="w-2 h-2 rounded-full bg-dark" />}
                {milestone.status === 'planned' && <div className="w-2 h-2 rounded-full bg-dark-border" />}
              </div>
              
              <div className={`pt-1 ${
                milestone.status === 'done' ? 'text-white/80 text-base font-medium' : 
                milestone.status === 'in-progress' ? 'text-white text-base font-semibold' : 
                'text-white/30 text-base font-medium'
              }`}>
                {milestone.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
