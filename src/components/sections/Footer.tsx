import { IconBrandGithub, IconBrandX } from '@tabler/icons-react'

export default function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <a href="/" className="inline-flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="14" width="14" height="4" fill="#00FF55" />
              <rect x="5" y="10" width="14" height="4" fill="#00FF55" />
              <rect x="8" y="6" width="14" height="4" fill="#00FF55" />
            </svg>
            <span className="font-black uppercase tracking-widest text-white text-lg">MARUT</span>
          </a>
          <p className="text-white/40 text-sm mt-4 max-w-xs leading-relaxed">
            India&apos;s first fully open source tri-mode Flight Control Unit.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://github.com/lawslefthand/Marut_FCU/" target="_blank" rel="noopener noreferrer"><IconBrandGithub size={20} className="text-white/40 hover:text-white transition-colors" /></a>
            <a href="#"><IconBrandX size={20} className="text-white/40 hover:text-white transition-colors" /></a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Product</h4>
            <a href="#technology" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Technology</a>
            <a href="#open-source" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Open Source</a>
            <a href="#roadmap" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Roadmap</a>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Community</h4>
            <a href="https://github.com/lawslefthand/Marut_FCU/" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">GitHub</a>
            <a href="#contact" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Contributors</a>
            <a href="#blog" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Blog</a>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Resources</h4>
            <a href="/documentation" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Documentation</a>
            <a href="/schematics" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Schematics</a>
            <a href="/firmware" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Firmware</a>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Project</h4>
            <a href="#roadmap" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">About</a>
            <a href="#contact" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">Contact</a>
            <a href="#" className="block text-sm text-white/40 hover:text-white transition-colors mb-2">License</a>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/30">© 2026 Marut FCU Project. Released under the MIT License.</div>
          <div className="text-xs text-white/30">Built by the Marut Team.</div>
        </div>
      </div>
    </footer>
  )
}
