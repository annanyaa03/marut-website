'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/sections/Footer'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import { IconTerminal, IconCopy, IconCheck, IconDownload, IconSettings } from '@tabler/icons-react'

export default function FirmwarePage() {
  const [targetBoard, setTargetBoard] = useState('marut-v1')
  const [flightMode, setFlightMode] = useState('quad')
  const [enableGPS, setEnableGPS] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildLogs, setBuildLogs] = useState<string[]>([])
  
  const buildIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const cliCommand = `marut-fcu-cli compile --board=${targetBoard} --mode=${flightMode}${enableGPS ? ' --with-gps' : ''}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cliCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const runSimulatedBuild = useCallback(() => {
    // Clear any existing active build interval
    if (buildIntervalRef.current) {
      clearInterval(buildIntervalRef.current)
    }

    setIsBuilding(true)
    setBuildLogs([])
    const logs = [
      `$ ${cliCommand}`,
      `[SYS] Initializing Marut compiler toolchain...`,
      `[SYS] Hardware Target: ${targetBoard.toUpperCase()} (${targetBoard === 'marut-v1' ? 'STM32F405' : 'STM32H743'})`,
      `[SYS] Flight Mode Controller: ${flightMode.toUpperCase()}_CORE v1.2.0`,
      `[SYS] Resolving driver dependencies...`,
      `[SYS] Drivers loaded: ICM-42688-P (Gyro/Accel), BMP388 (Baro), HMC5883L (Mag)`,
      enableGPS ? `[SYS] Enabling UBLOX GNSS parser subsystem...` : `[SYS] Skipping GPS integration module...`,
      `[COMP] Optimization level: -Os (optimize for size)`,
      `[COMP] Compiling main.c...`,
      `[COMP] Compiling control_loops.c...`,
      `[COMP] Compiling telemetry.c...`,
      `[LINK] Linking binary artifacts...`,
      `[SUCCESS] Build completed in 1.45s!`,
      `[SUCCESS] Artifact: build/marut_${targetBoard}_${flightMode}.hex (384 KB)`
    ]

    let currentLogIndex = 0
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        const nextLog = logs[currentLogIndex]
        setBuildLogs((prev) => [...prev, nextLog])
        currentLogIndex++
      } else {
        clearInterval(interval)
        setIsBuilding(false)
      }
    }, 120)

    buildIntervalRef.current = interval
  }, [cliCommand, targetBoard, flightMode, enableGPS])

  // Pre-run build once on load and handle unmount cleanup
  useEffect(() => {
    runSimulatedBuild()
    return () => {
      if (buildIntervalRef.current) {
        clearInterval(buildIntervalRef.current)
      }
    }
  }, [runSimulatedBuild])

  return (
    <main className="bg-dark text-white min-h-screen flex flex-col justify-between">
      <Nav />
      
      <div className="pt-28 pb-16 flex-1 max-w-7xl mx-auto px-6 w-full">
        {/* Heading */}
        <div className="mb-12">
          <SectionHeading
            label="CONTROL CORE"
            heading="FIRMWARE SUITE"
            subheading="India's first modular, multi-mode flight controller software stack"
          />
        </div>

        {/* Two-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* CLI Builder Panel */}
          <div className="lg:col-span-5 bg-dark-card border border-dark-border rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-dark-border pb-4">
              <IconSettings className="text-yellow" size={18} />
              <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white">Configurator</h3>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-6">
              {/* Target Board */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-2">Target Board</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTargetBoard('marut-v1')}
                    className={`py-2 px-3 text-xs font-bold uppercase rounded border transition-colors ${
                      targetBoard === 'marut-v1'
                        ? 'border-yellow text-yellow bg-yellow/5'
                        : 'border-dark-border text-white/60 hover:text-white'
                    }`}
                  >
                    Marut v1 (F405)
                  </button>
                  <button
                    onClick={() => setTargetBoard('marut-v2')}
                    className={`py-2 px-3 text-xs font-bold uppercase rounded border transition-colors ${
                      targetBoard === 'marut-v2'
                        ? 'border-yellow text-yellow bg-yellow/5'
                        : 'border-dark-border text-white/60 hover:text-white'
                    }`}
                  >
                    Marut v2 (H743)
                  </button>
                </div>
              </div>

              {/* Flight Mode */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-2">Default Flight Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'quad', label: 'Quadcopter' },
                    { id: 'fixedwing', label: 'Fixed Wing' },
                    { id: 'vtol', label: 'VTOL Core' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setFlightMode(mode.id)}
                      className={`py-2 px-1 text-[10px] font-bold uppercase rounded border transition-colors ${
                        flightMode === mode.id
                          ? 'border-yellow text-yellow bg-yellow/5'
                          : 'border-dark-border text-white/60 hover:text-white'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Features */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-3">Auxiliary Modules</label>
                <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-white/80">
                  <input
                    type="checkbox"
                    checked={enableGPS}
                    onChange={(e) => setEnableGPS(e.target.checked)}
                    className="w-4 h-4 rounded border-dark-border text-yellow focus:ring-0 focus:ring-offset-0 bg-dark"
                  />
                  <span>Include UBLOX GPS Driver</span>
                </label>
              </div>

              {/* CLI Command Box */}
              <div className="mt-4 pt-4 border-t border-dark-border">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">
                  <span>CLI Command</span>
                  <button onClick={copyToClipboard} className="text-yellow hover:text-yellow-hover flex items-center gap-1">
                    {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
                    {copied ? 'COPIED' : 'COPY'}
                  </button>
                </div>
                <div className="bg-dark p-3.5 rounded border border-dark-border font-mono text-[11px] text-yellow select-all break-all leading-normal">
                  {cliCommand}
                </div>
              </div>
            </div>
          </div>

          {/* Simulated Terminal Readout */}
          <div className="lg:col-span-7 bg-black border border-dark-border rounded-lg overflow-hidden flex flex-col h-full min-h-[460px]">
            {/* Terminal Window Header */}
            <div className="bg-dark-surface border-b border-dark-border px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconTerminal className="text-yellow" size={16} />
                <span className="font-mono text-xs text-white/60">Compiler Shell (Marut CLI toolchain)</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
            </div>

            {/* Terminal Console Output */}
            <div className="p-6 font-mono text-[11px] leading-relaxed text-white/80 overflow-y-auto flex-1 flex flex-col gap-1.5 scrollbar-thin select-text">
              {buildLogs.map((log, idx) => (
                <div key={idx} className={`${
                  log.startsWith('$') ? 'text-white font-bold' :
                  log.includes('[SUCCESS]') ? 'text-yellow' :
                  log.includes('[COMP]') ? 'text-white/40' : 'text-white/70'
                }`}>
                  {log}
                </div>
              ))}
              {isBuilding && (
                <div className="text-yellow animate-pulse flex items-center gap-2">
                  <div className="w-1.5 h-3 bg-yellow"></div> Writing image...
                </div>
              )}
            </div>

            {/* Terminal Actions */}
            <div className="p-4 bg-dark-surface border-t border-dark-border flex flex-col sm:flex-row justify-between gap-3 items-center">
              <span className="text-[10px] text-white/40 font-mono">Status: Ready to flash target</span>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="secondary" onClick={runSimulatedBuild}>
                  REBUILD CODE
                </Button>
                <Button variant="primary">
                  <IconDownload size={14} className="inline mr-1" /> HEX FILE
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specs List */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 md:p-8 mb-16">
          <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white mb-6 border-b border-dark-border pb-4">
            Control Algorithms & Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-yellow mb-2">PID Loop Rates</h4>
              <p className="text-white/60 text-xs leading-relaxed">
                Firmware operates at 4kHz loop frequency. High-precision sensor polling handles gyro calculations in hard real-time interrupt priorities.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-yellow mb-2">Tri-Mode Kernel</h4>
              <p className="text-white/60 text-xs leading-relaxed">
                Shared controller parameters allowing smooth flight dynamics switching for multirotors, fixed-wing airframes, and complex transitional VTOL structures.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-yellow mb-2">Blackbox Analytics</h4>
              <p className="text-white/60 text-xs leading-relaxed">
                High-speed logging onto standard SPI flash chips. Logs include gyroscope data, setpoints, RC commands, and PID outputs for tuning analysis.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-yellow mb-2">Open SDK Interface</h4>
              <p className="text-white/60 text-xs leading-relaxed">
                Written completely in clean ANSI C. Fully compatible with GCC compiler pipelines and customizable for educational and industrial research.
              </p>
            </div>
          </div>
        </div>

        {/* Changelog Sections */}
        <div className="max-w-3xl">
          <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white mb-8">
            RELEASES & BUILD HISTORY
          </h3>

          <div className="space-y-8 border-l border-dark-border pl-6 relative ml-2">
            {[
              {
                version: 'v1.2.0-beta',
                date: 'May 2026',
                status: 'BETA',
                notes: [
                  'Added Fixed-Wing control module with manual/altitude flight modes.',
                  'Implemented ICM-42688-P inertial sensor drivers via high-speed SPI.',
                  'Fixed calibration routine drift issues during board initialization.'
                ]
              },
              {
                version: 'v1.1.0-stable',
                date: 'February 2026',
                status: 'STABLE',
                notes: [
                  'Stable launch version for multirotor operations.',
                  'Robust telemetry configurations supporting FrSky/FlySky protocols.',
                  'Optimized PID cascade scheduler for STM32F405 microcontroller.'
                ]
              }
            ].map((release, index) => (
              <div key={index} className="relative">
                {/* Visual marker dot */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded border-2 border-yellow bg-dark flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-yellow rounded-sm" />
                </div>

                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h4 className="text-base font-unbounded font-black uppercase text-white">{release.version}</h4>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-yellow/10 text-yellow border border-yellow/20">
                    {release.status}
                  </span>
                  <span className="text-white/30 text-xs">{release.date}</span>
                </div>
                
                <ul className="list-disc list-inside space-y-1.5 text-xs text-white/50 leading-relaxed pl-2">
                  {release.notes.map((note, noteIdx) => (
                    <li key={noteIdx}>{note}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
