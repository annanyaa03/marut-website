'use client'

import { useState, useEffect, useReducer } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { IconBrandGithub, IconMenu2, IconChevronDown, IconBook, IconCpu, IconBinary, IconSitemap } from '@tabler/icons-react'

interface NavState {
  scrolled: boolean
  activeSection: string
}

export default function Nav() {
  const [state, dispatch] = useReducer(
    (current: NavState, next: Partial<NavState>) => ({ ...current, ...next }),
    { scrolled: false, activeSection: 'home' }
  )
  const { scrolled, activeSection } = state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const navItems = [
    { href: isHome ? '#' : '/', id: 'home', label: 'HOME', isDropdown: false },
    { href: isHome ? '#technology' : '/#technology', id: 'technology', label: 'TECHNOLOGY', isDropdown: false },
    { href: isHome ? '#open-source' : '/#open-source', id: 'open-source', label: 'OPEN SOURCE', isDropdown: false },
    {
      id: 'resources',
      label: 'RESOURCES',
      isDropdown: true,
      dropdownItems: [
        { href: '/architecture', label: 'System Architecture', desc: 'Interactive system mind map', icon: IconSitemap },
        { href: '/documentation', label: 'Documentation', desc: 'Guides & API manuals', icon: IconBook },
        { href: '/schematics', label: 'Schematics', desc: 'Interactive 3D PCB layout', icon: IconCpu },
        { href: '/firmware', label: 'Firmware', desc: 'Downloadable binaries & source', icon: IconBinary },
      ]
    },
    { href: isHome ? '#roadmap' : '/#roadmap', id: 'roadmap', label: 'ROADMAP', isDropdown: false },
    { href: isHome ? '#contact' : '/#contact', id: 'contact', label: 'CONTACT', isDropdown: false },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 10
      let nextActiveSection = 'home'

      if (!isHome) {
        nextActiveSection = ''
      } else if (window.scrollY >= 120) {
        const sectionsWithGallery = [
          { id: 'technology', navId: 'technology' },
          { id: 'open-source', navId: 'open-source' },
          { id: 'gallery', navId: 'open-source' },
          { id: 'developer-resources', navId: 'resources' },
          { id: 'roadmap', navId: 'roadmap' },
          { id: 'contact', navId: 'contact' },
        ]

        const threshold = window.innerHeight * 0.4
        let currentSection = 'home'
        let minDistance = Infinity

        for (const sec of sectionsWithGallery) {
          const el = document.getElementById(sec.id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= threshold && rect.bottom >= 0) {
              const distance = Math.abs(rect.top - threshold)
              if (distance < minDistance) {
                minDistance = distance
                currentSection = sec.navId
              }
            }
          }
        }

        // Check if user has scrolled to the bottom of the page
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
        if (isAtBottom) {
          currentSection = 'contact'
        }

        if (currentSection !== 'home') {
          nextActiveSection = currentSection
        }
      }

      dispatch({ scrolled: nextScrolled, activeSection: nextActiveSection })
    }

    // Establish initial active state on load
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors border-b ${
      scrolled ? 'bg-dark/80 backdrop-blur-sm border-dark-border' : 'bg-dark/80 backdrop-blur-sm border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="font-black uppercase tracking-widest text-white text-lg">MARUT</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            if (item.isDropdown) {
              return (
                <div key={item.id} className="relative group">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest transition-colors"
                  >
                    <span className={`pb-0.5 border-b-2 transition-colors ${
                      activeSection === item.id
                        ? 'text-white border-yellow font-bold'
                        : 'text-white/70 border-transparent hover:text-white'
                    }`}>
                      {item.label}
                    </span>
                    <IconChevronDown size={12} className="text-white/70 group-hover:text-white group-hover:rotate-180 transition-all duration-200" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-dark-card border border-dark-border rounded-lg shadow-xl py-3 px-2.5 grid gap-1.5">
                      {item.dropdownItems?.map((sub) => {
                        const SubIcon = sub.icon
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="flex items-start gap-3 p-2 rounded-md hover:bg-white/5 transition-colors group/item"
                          >
                            <SubIcon size={16} className="text-yellow mt-0.5" />
                            <div>
                              <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">{sub.label}</div>
                              <div className="text-[10px] text-white/40 leading-snug">{sub.desc}</div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={item.id}
                href={item.href!}
                className={`text-xs font-semibold uppercase tracking-widest transition-colors pb-0.5 border-b-2 ${
                  activeSection === item.id
                    ? 'text-white border-yellow font-bold'
                    : 'text-white/70 hover:text-white border-transparent'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:block">
          <Button variant="secondary" href="https://github.com/lawslefthand/Marut_FCU/">
            <IconBrandGithub size={16} className="mr-2 inline" /> GITHUB
          </Button>
        </div>

        <button 
          type="button"
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <IconMenu2 size={24} />
        </button>
      </div>

      {mobileMenuOpen && (
        <>
          {/* Backdrop to collapse when clicking empty space below menu */}
          <button 
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-16 bg-black/60 md:hidden z-40 cursor-default w-full text-left"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 bg-dark-surface border-b border-dark-border px-6 py-4 flex flex-col gap-4 md:hidden">
            {navItems.map((item) => {
              if (item.isDropdown) {
                return (
                  <div key={item.id} className="flex flex-col gap-2">
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${
                      activeSection === item.id ? 'text-yellow' : 'text-white/40'
                    }`}>
                      {item.label}
                    </div>
                    <div className="pl-4 flex flex-col gap-3 border-l border-dark-border">
                      {item.dropdownItems?.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.id}
                  href={item.href!}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors pb-0.5 border-b-2 w-fit ${
                    activeSection === item.id
                      ? 'text-white border-yellow font-bold'
                      : 'text-white/70 hover:text-white border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="mt-2">
              <Button variant="secondary" href="https://github.com/lawslefthand/Marut_FCU/">
                <IconBrandGithub size={16} className="mr-2 inline" /> GITHUB
              </Button>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
