'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/sections/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import { IconSearch, IconBook, IconCopy, IconCheck, IconAlertTriangle } from '@tabler/icons-react'

interface DocSection {
  id: string
  title: string
  category: string
  content: React.ReactNode
}

export default function DocumentationPage() {
  const [activeTopic, setActiveTopic] = useState('intro')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (codeText: string, id: string) => {
    navigator.clipboard.writeText(codeText)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const sections: DocSection[] = [
    {
      id: 'intro',
      title: 'Introduction & Features',
      category: 'GETTING STARTED',
      content: (
        <div className="space-y-6">
          <p className="text-white/70 text-sm leading-relaxed">
            Welcome to the official Marut Flight Control Unit (FCU) documentation. Marut is India&apos;s first fully open-source, tri-mode flight control unit designed for quadcopters, fixed-wing aircraft, and VTOL (Vertical Take-Off and Landing) airframes.
          </p>
          <div className="bg-yellow/5 border border-yellow/20 rounded p-4">
            <h5 className="text-xs font-bold text-yellow uppercase mb-2">Key Hardware Specifications:</h5>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-white/60">
              <li>High-speed STM32F405 / STM32H743 Cortex-M processor cores.</li>
              <li>Dual SPI-based IMU arrays (ICM-42688-P) for fault-tolerant gyro filtering.</li>
              <li>Integrated BMP388 high-resolution barometer for altitude-hold algorithms.</li>
              <li>Built-in OSD (On-Screen Display) chips and microSD card logs reader.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'power',
      title: 'Powering the FCU',
      category: 'HARDWARE SETUP',
      content: (
        <div className="space-y-6">
          <p className="text-white/70 text-sm leading-relaxed">
            Marut FCU features robust onboard power filtering. You can power the board using either the onboard 5V regulator BEC lines or directly through the main battery sense leads (for telemetry voltage monitoring up to 6S Lipo).
          </p>
          
          <div className="border border-red-500/20 bg-red-500/5 rounded p-4 flex gap-3 items-start">
            <IconAlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <h5 className="text-xs font-bold text-red-500 uppercase mb-1">Warning: Voltage Input Limits</h5>
              <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                Never exceed 26V (6S) on the battery sense pin. Always verify that your external BEC supplies a clean, regulated 5.0V - 5.2V to prevent damage to the high-frequency IMU sensors.
              </p>
            </div>
          </div>

          <h5 className="text-xs font-bold text-white uppercase border-b border-dark-border pb-2">Status LED Codes:</h5>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-dark p-3 rounded border border-dark-border text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 mb-2"></span>
              <div className="text-[10px] font-bold text-white">RED LED</div>
              <div className="text-[9px] text-white/40 mt-1">POWER STATUS OK</div>
            </div>
            <div className="bg-dark p-3 rounded border border-dark-border text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse mb-2"></span>
              <div className="text-[10px] font-bold text-white">BLUE LED</div>
              <div className="text-[9px] text-white/40 mt-1">BOOTING / IMU RUNNING</div>
            </div>
            <div className="bg-dark p-3 rounded border border-dark-border text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 mb-2"></span>
              <div className="text-[10px] font-bold text-white">GREEN LED</div>
              <div className="text-[9px] text-white/40 mt-1">GPS LOCK ESTABLISHED</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cli',
      title: 'Toolchain & CLI Flashing',
      category: 'SOFTWARE SETUP',
      content: (
        <div className="space-y-6">
          <p className="text-white/70 text-sm leading-relaxed">
            The Marut firmware can be compiled and loaded on your flight control unit using our open source terminal tools. Make sure you have the GNU Arm Embedded Toolchain (`arm-none-eabi-gcc`) installed.
          </p>

          <div className="relative">
            <div className="absolute right-3 top-3 z-10">
              <button 
                onClick={() => copyCode('npm install -g marut-fcu-cli\nmarut-fcu flash --board=v1 --mode=quad', 'cli-inst')}
                className="text-white/40 hover:text-white flex items-center gap-1 text-[10px] font-bold"
              >
                {copiedCode === 'cli-inst' ? <IconCheck size={12} className="text-yellow" /> : <IconCopy size={12} />}
                {copiedCode === 'cli-inst' ? 'COPIED' : 'COPY'}
              </button>
            </div>
            <pre className="bg-black border border-dark-border p-4 pt-6 rounded text-xs font-mono text-yellow leading-relaxed overflow-x-auto">
{`# Install the official command-line interface tool
$ npm install -g marut-fcu-cli

# Run flashing sequence over standard DFU connection
$ marut-fcu flash --board=v1 --mode=quad`}
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'sensors',
      title: 'Sensor Calibration Guide',
      category: 'SOFTWARE SETUP',
      content: (
        <div className="space-y-6">
          <p className="text-white/70 text-sm leading-relaxed">
            Proper accelerometer and compass calibration is critical for stable drone hover flight loops. Ensure the board is placed on a perfectly flat surface when performing the accelerometer calibration.
          </p>

          <div className="relative">
            <div className="absolute right-3 top-3 z-10">
              <button 
                onClick={() => copyCode('marut-fcu calibrate --type=accel\nmarut-fcu calibrate --type=mag', 'cli-cal')}
                className="text-white/40 hover:text-white flex items-center gap-1 text-[10px] font-bold"
              >
                {copiedCode === 'cli-cal' ? <IconCheck size={12} className="text-yellow" /> : <IconCopy size={12} />}
                {copiedCode === 'cli-cal' ? 'COPIED' : 'COPY'}
              </button>
            </div>
            <pre className="bg-black border border-dark-border p-4 pt-6 rounded text-xs font-mono text-yellow leading-relaxed overflow-x-auto">
{`# Calibrate internal accelerometer (keep board level and still)
$ marut-fcu calibrate --type=accel

# Calibrate internal magnetometer (rotate board 360 degrees on all axes)
$ marut-fcu calibrate --type=mag`}
            </pre>
          </div>
        </div>
      )
    }
  ]

  // Filter sections by search query
  const filteredSections = sections.filter(sec => 
    sec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sec.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Categorize sections
  const categories = Array.from(new Set(sections.map(s => s.category)))
  
  const currentSection = sections.find(s => s.id === activeTopic) || sections[0]

  return (
    <main className="bg-dark text-white min-h-screen flex flex-col justify-between">
      <Nav />

      <div className="pt-28 pb-16 flex-1 max-w-7xl mx-auto px-6 w-full">
        {/* Heading */}
        <div className="mb-12">
          <SectionHeading
            label="DEVELOPER HUB"
            heading="DOCUMENTATION"
            subheading="Technical integration tutorials, CLI command maps, and developer setup instructions"
          />
        </div>

        {/* Documentation Framework */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Menu */}
          <div className="md:col-span-4 lg:col-span-3 bg-dark-card border border-dark-border rounded-lg p-5">
            {/* Search Input */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark border border-dark-border rounded px-3 py-2 pl-9 text-xs text-white placeholder-white/30 focus:outline-none focus:border-yellow transition-colors font-sans"
              />
              <IconSearch className="absolute left-3 top-2.5 text-white/30" size={14} />
            </div>

            {/* Navigation Lists */}
            <div className="space-y-6">
              {categories.map((category) => {
                const categoryTopics = filteredSections.filter(t => t.category === category)
                if (categoryTopics.length === 0) return null

                return (
                  <div key={category}>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 border-b border-dark-border/40 pb-1">
                      {category}
                    </h4>
                    <div className="flex flex-col gap-1.5">
                      {categoryTopics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => setActiveTopic(topic.id)}
                          className={`text-left text-xs font-semibold px-2 py-1.5 rounded transition-all ${
                            activeTopic === topic.id
                              ? 'bg-yellow/5 border border-yellow/20 text-yellow'
                              : 'border border-transparent text-white/60 hover:text-white hover:bg-dark-surface/30'
                          }`}
                        >
                          {topic.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}

              {filteredSections.length === 0 && (
                <div className="text-center text-xs text-white/30 py-6">No matching documents found</div>
              )}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="md:col-span-8 lg:col-span-9 bg-dark-card border border-dark-border rounded-lg p-6 md:p-8 min-h-[450px] flex flex-col justify-between">
            <div>
              {/* Header Details */}
              <div className="flex items-center gap-2 text-[9px] font-extrabold text-yellow uppercase tracking-widest mb-2">
                <IconBook size={12} /> {currentSection.category}
              </div>
              <h2 className="text-xl font-unbounded font-black uppercase text-white mb-6 border-b border-dark-border pb-4">
                {currentSection.title}
              </h2>

              {/* Dynamic Content */}
              <div className="font-sans text-sm leading-relaxed text-white/80">
                {currentSection.content}
              </div>
            </div>

            {/* Footer Pagination Mock */}
            <div className="mt-12 pt-6 border-t border-dark-border flex items-center justify-between text-xs text-white/30 font-sans">
              <span>Last updated: May 2026</span>
              <a 
                href="https://github.com/lawslefthand/Marut_FCU/issues" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-yellow text-white/50 transition-colors"
              >
                Report issue / Edit on GitHub
              </a>
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </main>
  )
}
