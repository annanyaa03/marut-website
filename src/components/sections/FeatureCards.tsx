import { IconLockOpen, IconBolt, IconStack2, IconUsersGroup } from '@tabler/icons-react'

const features = [
  {
    icon: IconLockOpen,
    title: 'FULLY OPEN SOURCE',
    body: 'Schematics, PCB, firmware, and docs — all open. No locks. No secrets.',
  },
  {
    icon: IconBolt,
    title: 'TRI-MODE SUPPORT',
    body: 'Fixed Wing, VTOL, Multirotor. One FCU. Any platform.',
  },
  {
    icon: IconStack2,
    title: 'UNIFIED ARCHITECTURE',
    body: 'One design. Maximum compatibility. Infinite possibilities.',
  },
  {
    icon: IconUsersGroup,
    title: 'BUILT BY COMMUNITY',
    body: 'By innovators. For innovators. Forever improving.',
  },
]

export default function FeatureCards() {
  return (
    <section className="border-t border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="border-r border-dark-border last:border-r-0 p-8">
                <Icon size={28} className="text-yellow mb-5" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
