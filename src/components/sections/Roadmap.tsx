import SectionHeading from '@/components/ui/SectionHeading'
import { IconCheck, IconTerminal, IconCpu, IconGitMerge } from '@tabler/icons-react'

interface TrackItem {
  status: 'done' | 'in-progress' | 'planned'
  title: string
  desc?: string
  label?: string
}

const quadTrack: TrackItem[] = [
  { status: 'done', title: 'Quad (core)' },
  { status: 'done', title: 'Additional Controller tuning' },
  { status: 'in-progress', title: 'Addition of extra flight modes', desc: 'Acro, Stabilize, Basic Altitude hold', label: 'Active' },
  { status: 'planned', title: 'Quad specific telemetry items' },
]

const fwTrack: TrackItem[] = [
  { status: 'done', title: 'Fixed wing (core)' },
  { status: 'in-progress', title: 'Additional Controller tuning', label: 'Active' },
  { status: 'planned', title: 'Addition of extra flight modes', desc: 'Manual, Stabilize, FBWA, Circle' },
  { status: 'planned', title: 'FW specific telemetry items' },
]

const mergedTrack: TrackItem[] = [
  { status: 'planned', title: 'Additional RC protocol support', desc: 'SBUS, IBUS' },
  { status: 'planned', title: 'VTOL (core)', desc: 'Transition logic' },
  { status: 'planned', title: 'Development of In-situ + Transition flight dynamics' },
  { status: 'planned', title: 'Additional controller tuning' },
  { status: 'planned', title: 'Autonomous modes (TBD)' },
]

const hwTrack: TrackItem[] = [
  { status: 'done', title: 'Core component selection' },
  { status: 'done', title: 'Creation of Proto-PCB on Zero PCBs' },
  { status: 'done', title: 'Validation' },
  { status: 'done', title: 'Creation of Module based TH PCB' },
  { status: 'done', title: 'Validation' },
  { status: 'in-progress', title: 'Creation of full SMD based PCBs with miniaturization', label: 'Ongoing' },
  { status: 'planned', title: 'Validation' },
  { status: 'planned', title: 'Indigenization of components' },
]

function SubTrack({ items }: { items: TrackItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={`${item.title}-${i}`} className={`p-3.5 rounded border flex items-start gap-3 transition-all duration-300 ${item.status === 'in-progress'
          ? 'bg-yellow/5 border-yellow shadow-[0_0_15px_rgba(0,255,85,0.08)]'
          : 'bg-dark-surface/40 border-dark-border/40'
          }`}>
          <div className={`flex-shrink-0 w-3.5 h-3.5 mt-0.5 rounded-sm border flex items-center justify-center bg-dark ${item.status === 'done' ? 'border-yellow bg-yellow' :
            item.status === 'in-progress' ? 'border-yellow animate-pulse' : 'border-dark-border'
            }`}>
            {item.status === 'done' && <IconCheck size={8} className="text-dark font-black" />}
            {item.status === 'in-progress' && <div className="size-1.5 bg-yellow rounded-sm" />}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${item.status === 'planned' ? 'text-white/30' : 'text-white'
                }`}>
                {item.title}
              </h4>
              {item.label && (
                <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-yellow/10 text-yellow border border-yellow/20 animate-pulse">
                  {item.label}
                </span>
              )}
            </div>
            {item.desc && (
              <p className={`text-[11px] mt-1 leading-relaxed ${item.status === 'planned' ? 'text-white/20' : 'text-white/50'
                }`}>
                {item.desc}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="section-padding bg-dark-surface border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionHeading
            label="ROADMAP"
            heading="DEVELOPMENT TIMELINE"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SOFTWARE ROADMAP COLUMN */}
          <div className="lg:col-span-7 bg-dark border border-dark-border rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8 border-b border-dark-border pb-4">
              <IconTerminal className="text-yellow" size={20} />
              <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white">Software Development (SW)</h3>
            </div>

            {/* Parallel Tracks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-white/50 mb-4 border-b border-dark-border/40 pb-2">
                  Quad / Multirotor
                </h4>
                <SubTrack items={quadTrack} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-white/50 mb-4 border-b border-dark-border/40 pb-2">
                  Fixed Wing
                </h4>
                <SubTrack items={fwTrack} />
              </div>
            </div>

            {/* Merging Banner */}
            <div className="flex flex-col items-center my-8 py-4 border-y border-dark-border bg-dark-surface/30 rounded p-4 text-center">
              <IconGitMerge className="text-yellow mb-2 animate-pulse" size={20} />
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/40">
                Unified Protocol & VTOL Merge
              </span>
            </div>

            {/* Merged Timeline Track */}
            <div className="mt-4">
              <SubTrack items={mergedTrack} />
            </div>
          </div>

          {/* HARDWARE ROADMAP COLUMN */}
          <div className="lg:col-span-5 bg-dark border border-dark-border rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8 border-b border-dark-border pb-4">
              <IconCpu className="text-yellow" size={20} />
              <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white">Hardware Design (HW)</h3>
            </div>

            <div className="flex flex-col gap-3">
              {hwTrack.map((item, i) => (
                <div key={`${item.title}-${i}`} className={`p-3.5 rounded border flex items-center gap-3 transition-all duration-300 ${item.status === 'in-progress'
                  ? 'bg-yellow/5 border-yellow shadow-[0_0_15px_rgba(0,255,85,0.08)] scale-[1.01]'
                  : item.status === 'done'
                    ? 'bg-dark-surface/20 border-dark-border/40'
                    : 'bg-dark-surface/5 border-dark-border/10'
                  }`}>
                  {/* Status Indicator (Square) */}
                  <div className={`flex-shrink-0 size-4 rounded-sm border flex items-center justify-center bg-dark ${item.status === 'done' ? 'border-yellow bg-yellow' :
                    item.status === 'in-progress' ? 'border-yellow animate-pulse' :
                      'border-dark-border'
                    }`}>
                    {item.status === 'done' && <IconCheck size={10} className="text-dark font-black" />}
                    {item.status === 'in-progress' && <div className="size-1.5 bg-yellow rounded-sm" />}
                  </div>

                  {/* Content card */}
                  <div className="flex-1 flex items-center gap-2 flex-wrap justify-between">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${item.status === 'planned' ? 'text-white/20' : 'text-white'
                      }`}>
                      {item.title}
                    </h4>
                    {item.label && (
                      <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-yellow text-dark animate-pulse shadow-[0_0_8px_rgba(0,255,85,0.2)]">
                        {item.label}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
