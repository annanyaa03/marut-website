import { IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="font-black uppercase tracking-widest text-white text-lg">MARUT</span>
          </Link>
          <p className="text-white/40 text-sm mt-4 max-w-xs leading-relaxed">
            India&apos;s first fully open source tri-mode Flight Control Unit.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://github.com/lawslefthand/Marut_FCU/" target="_blank" rel="noopener noreferrer"><IconBrandGithub size={20} className="text-white/40 hover:text-white transition-colors" /></a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Product</h4>
            <Link href="/#technology" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Technology</Link>
            <Link href="/#open-source" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Open Source</Link>
            <Link href="/#roadmap" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Roadmap</Link>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Community</h4>
            <a href="https://github.com/lawslefthand/Marut_FCU/" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">GitHub</a>
            <Link href="/#contact" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Contributors</Link>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Resources</h4>
            <Link href="/documentation" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Documentation</Link>
            <Link href="/schematics" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Schematics</Link>
            <Link href="/firmware" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Firmware</Link>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Project</h4>
            <Link href="/#roadmap" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">About</Link>
            <Link href="/#contact" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Contact</Link>
            <a href="https://github.com/lawslefthand/Marut_FCU/blob/main/LICENSE.txt" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">License</a>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/30">© 2026 Marut FCU Project. Released under the MIT License.</div>
          <div className="text-xs text-white/30">Built by the Marut Team.</div>
        </div>
      </div>
    </footer>
  )
}
