import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { IconCode, IconBug, IconShare, IconUser } from '@tabler/icons-react'

const ways = [
  {
    icon: IconCode,
    title: 'CONTRIBUTE CODE',
    body: 'Submit PRs, fix bugs, build features. All skill levels welcome.',
  },
  {
    icon: IconBug,
    title: 'REPORT ISSUES',
    body: 'Help us find and squash problems. Open an issue on GitHub.',
  },
  {
    icon: IconShare,
    title: 'SPREAD THE WORD',
    body: 'Star the repo. Tell your community. Help the project grow.',
  },
]

export default function Community() {
  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <SectionHeading 
          heading="BUILT BY THE COMMUNITY" 
          subheading="Join a growing team of engineers, pilots, and open-source enthusiasts."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {ways.map((way, idx) => {
          const Icon = way.icon
          return (
            <div key={idx} className="bg-dark-card border border-dark-border rounded-lg p-8 text-center">
              <Icon size={32} className="text-yellow mb-5 mx-auto" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-3">{way.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{way.body}</p>
            </div>
          )
        })}
      </div>
      
      <div className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-6 text-center">
        OUR CONTRIBUTORS
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className="w-10 h-10 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center">
            <IconUser size={16} className="text-white/30" />
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="secondary" href="https://github.com/lawslefthand/Marut_FCU/">JOIN US ON GITHUB →</Button>
      </div>
    </section>
  )
}
