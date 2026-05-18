'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import { IconBrandGithub, IconMenu2 } from '@tabler/icons-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
      scrolled ? 'bg-dark/80 backdrop-blur-sm border-b border-dark-border' : 'bg-dark/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="inline-flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="14" width="14" height="4" fill="#FFD600" />
            <rect x="5" y="10" width="14" height="4" fill="#FFD600" />
            <rect x="8" y="6" width="14" height="4" fill="#FFD600" />
          </svg>
          <span className="font-black uppercase tracking-widest text-white text-lg">MARUT</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-xs font-semibold uppercase tracking-widest text-white border-b-2 border-yellow pb-0.5 transition-colors">HOME</a>
          <a href="#about" className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors">ABOUT</a>
          <a href="#technology" className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors">TECHNOLOGY</a>
          <a href="#open-source" className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors">OPEN SOURCE</a>
          <a href="#blog" className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors">BLOG</a>
          <a href="#contact" className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors">CONTACT</a>
        </div>

        <div className="hidden md:block">
          <Button variant="secondary" href="https://github.com/lawslefthand/Marut_FCU/">
            <IconBrandGithub size={16} className="mr-2 inline" /> GITHUB
          </Button>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <IconMenu2 size={24} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="bg-dark-surface border-b border-dark-border px-6 py-4 flex flex-col gap-4 md:hidden">
          <a href="#" className="text-xs font-semibold uppercase tracking-widest text-white border-b-2 border-yellow pb-0.5 transition-colors w-fit">HOME</a>
          <a href="#about" className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors w-fit">ABOUT</a>
          <a href="#technology" className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors w-fit">TECHNOLOGY</a>
          <a href="#open-source" className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors w-fit">OPEN SOURCE</a>
          <a href="#blog" className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors w-fit">BLOG</a>
          <a href="#contact" className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors w-fit">CONTACT</a>
          <div className="mt-2">
            <Button variant="secondary" href="https://github.com/lawslefthand/Marut_FCU/">
              <IconBrandGithub size={16} className="mr-2 inline" /> GITHUB
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
