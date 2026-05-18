import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { IconStar, IconUsers } from '@tabler/icons-react'

export default function OpenSource() {
  return (
    <section id="open-source" className="section-padding bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading heading="FULLY OPEN. FULLY YOURS." />

            <p className="text-white/60 text-base leading-relaxed mt-6 mb-8">
              Every schematic, every firmware commit, every PCB layout remains open to the world. Fork it, improve it, build on it. No CLAs. No commercial locks. Just open collaboration. FOREVER.
            </p>

            <div className="flex gap-8 mb-8">
              <div>
                <IconStar size={20} className="text-yellow mr-2 inline" />
                <span className="text-white font-bold">★ 13 Stars</span>
                <span className="text-white/40 text-sm ml-1">on GitHub</span>
              </div>
              <div>
                <IconUsers size={20} className="text-yellow mr-2 inline" />
                <span className="text-white font-bold">5 Contributors</span>
              </div>
            </div>

            <Button variant="primary" href="https://github.com/lawslefthand/Marut_FCU/">VIEW ON GITHUB →</Button>
          </div>

          <div className="bg-dark rounded-lg border border-dark-border overflow-hidden">
            <div className="bg-dark-surface border-b border-dark-border px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-dark-border" />
              <div className="w-3 h-3 rounded-full bg-dark-border" />
              <div className="w-3 h-3 rounded-full bg-dark-border" />
              <div className="text-xs text-white/30 ml-2 font-mono">bash</div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div><span className="text-yellow">$</span> <span className="text-white">git clone https://github.com/lawslefthand/Marut_FCU.git</span></div>
              <div><span className="text-yellow">$</span> <span className="text-white">cd Marut_FCU</span></div>
              <div><span className="text-yellow">$</span> <span className="text-white">make configure TARGET=VTOL</span></div>
              <div><br /></div>
              <div><span className="text-white/50">&gt; Configuring Marut FCU v0.1.0...</span></div>
              <div><span className="text-green-400">&gt; Target: VTOL ✓</span></div>
              <div><span className="text-green-400">&gt; Build system: Ready ✓</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
