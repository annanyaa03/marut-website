'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { IconBrandGithub, IconMenu2 } from '@tabler/icons-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const pathname = usePathname()
  const isHome = pathname === '/'

  const navItems = [
    { href: isHome ? '#' : '/', id: 'home', label: 'HOME' },
    { href: isHome ? '#technology' : '/#technology', id: 'technology', label: 'TECHNOLOGY' },
    { href: isHome ? '#open-source' : '/#open-source', id: 'open-source', label: 'OPEN SOURCE' },
    { href: isHome ? '#roadmap' : '/#roadmap', id: 'roadmap', label: 'ROADMAP' },
    { href: isHome ? '#blog' : '/#blog', id: 'blog', label: 'BLOG' },
    { href: isHome ? '#contact' : '/#contact', id: 'contact', label: 'CONTACT' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // 1. Scrolled state for backdrop
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // 2. Active section tracking based on viewport
      if (!isHome) {
        setActiveSection('')
        return
      }

      const sections = ['technology', 'open-source', 'roadmap', 'blog', 'contact']
      
      // If we are at the very top of the page, HOME is active
      if (window.scrollY < 120) {
        setActiveSection('home')
        return
      }

      // Check which section occupies the main viewport area (40% from top)
      let currentSection = 'home'
      const threshold = window.innerHeight * 0.4

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= threshold && rect.bottom >= threshold) {
            currentSection = sectionId
            break
          }
        }
      }

      // Proactively group the progress gallery under the OPEN SOURCE section highlight
      const galleryElement = document.getElementById('gallery')
      if (galleryElement) {
        const rect = galleryElement.getBoundingClientRect()
        if (rect.top <= threshold && rect.bottom >= threshold) {
          currentSection = 'open-source'
        }
      }

      setActiveSection(currentSection)
    }

    // Establish initial active state on load
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors border-b ${
      scrolled ? 'bg-dark/80 backdrop-blur-sm border-dark-border' : 'bg-dark/80 backdrop-blur-sm border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="inline-flex items-center gap-2">
          <Image src="/marut_logo.png" alt="Marut FCU Logo" width={28} height={28} className="object-contain" />
          <span className="font-black uppercase tracking-widest text-white text-lg">MARUT</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`text-xs font-semibold uppercase tracking-widest transition-colors pb-0.5 border-b-2 ${
                activeSection === item.id
                  ? 'text-white border-yellow font-bold'
                  : 'text-white/70 hover:text-white border-transparent'
              }`}
            >
              {item.label}
            </a>
          ))}
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
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-xs font-semibold uppercase tracking-widest transition-colors pb-0.5 border-b-2 w-fit ${
                activeSection === item.id
                  ? 'text-white border-yellow font-bold'
                  : 'text-white/70 hover:text-white border-transparent'
              }`}
            >
              {item.label}
            </a>
          ))}
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
