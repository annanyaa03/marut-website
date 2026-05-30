'use client'

import { useEffect, useCallback, useReducer, useRef } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/sections/Footer'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import { IconTerminal, IconCopy, IconCheck, IconDownload, IconSettings } from '@tabler/icons-react'

interface FirmwareState {
  targetBoard: string
  flightMode: string
  enableGPS: boolean
  copied: boolean
  isBuilding: boolean
  buildLogs: string[]
}

const initialFirmwareState: FirmwareState = {
  targetBoard: 'marut-v1',
  flightMode: 'quad',
  enableGPS: true,
  copied: false,
  isBuilding: false,
  buildLogs: [],
}

export default function FirmwareClient() {
  const [state, setState] = useReducer(
    (current: FirmwareState, next: Partial<FirmwareState>) => ({ ...current, ...next }),
    initialFirmwareState
  )
  const { targetBoard, flightMode, enableGPS, copied, isBuilding, buildLogs } = state
  
  const buildIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const cliCommand = `marut-fcu-cli compile --board=${targetBoard} --mode=${flightMode}${enableGPS ? ' --with-gps' : ''}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cliCommand)
    setState({ copied: true })
    setTimeout(() => setState({ copied: false }), 2000)
  }

  const runSimulatedBuild = useCallback(() => {
    if (buildIntervalRef.current) {
      clearInterval(buildIntervalRef.current)
    }

    setState({ isBuilding: true, buildLogs: [] })
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
        setState({ buildLogs: logs.slice(0, currentLogIndex + 1) })
        currentLogIndex++
      } else {
        clearInterval(interval)
        setState({ isBuilding: false })
      }
    }, 120)

    buildIntervalRef.current = interval
  }, [cliCommand, targetBoard, flightMode, enableGPS])

  useEffect(() => {
    runSimulatedBuild()
    const buildInterval = buildIntervalRef.current
    return () => {
      if (buildInterval) {
        clearInterval(buildInterval)
      }
    }
  }, [runSimulatedBuild])

  return (
    <main className="bg-dark text-white min-h-screen flex flex-col justify-between">
      <Nav />
      
      <div className="pt-28 pb-16 flex-1 max-w-7xl mx-auto px-6 w-full">
        <div className="mb-12">
          <SectionHeading
            label="CONTROL CORE"
            heading="FIRMWARE SUITE"
            subheading="India's first modular, multi-mode flight controller software stack"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-5 bg-dark-card border border-dark-border rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-dark-border pb-4">
              <IconSettings className="text-yellow" size={18} />
              <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white">Configurator</h3>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-2">Target Board</div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setState({ targetBoard: 'marut-v1' })}
                    className={`py-2 px-3 text-xs font-bold uppercase rounded border transition-colors ${
                      targetBoard === 'marut-v1'
                        ? 'border-yellow text-yellow bg-yellow/5'
                        : 'border-dark-border text-white/60 hover:text-white'
                    }`}
                  >
                    Marut v1 (F405)
                  </button>
                  <button
                    type="button"
                    onClick={() => setState({ targetBoard: 'marut-v2' })}
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

              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-2">Default Flight Mode</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'quad', label: 'Quadcopter' },
                    { id: 'fixedwing', label: 'Fixed Wing' },
                    { id: 'vtol', label: 'VTOL Core' }
                  ].map((mode) => (
                    <button
                    type="button"
                      key={mode.id}
                      onClick={() => setState({ flightMode: mode.id })}
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

              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-3">Auxiliary Modules</div>
                <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-white/80">
                  <input
                    id="enable-gps"
                    type="checkbox"
                    aria-label="Include UBLOX GPS Driver"
                    checked={enableGPS}
                    onChange={(e) => setState({ enableGPS: e.target.checked })}
                    className="size-4 rounded border-dark-border text-yellow focus:ring-0 focus:ring-offset-0 bg-dark"
                  />
                  <span>Include UBLOX GPS Driver</span>
                </label>
              </div>

              <div className="mt-4 pt-4 border-t border-dark-border">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">
                  <span>CLI Command</span>
                  <button type="button" onClick={copyToClipboard} className="text-yellow hover:text-yellow-hover flex items-center gap-1">
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

          <div className="lg:col-span-7 bg-gray-950 border border-dark-border rounded-lg overflow-hidden flex flex-col h-full min-h-[460px]">
            <div className="bg-dark-surface border-b border-dark-border px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconTerminal className="text-yellow" size={16} />
                <span className="font-mono text-xs text-white/60">Compiler Shell (Marut CLI toolchain)</span>
              </div>
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-red-500/80"></div>
                <div className="size-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="size-2.5 rounded-full bg-green-500/80"></div>
              </div>
            </div>

            <div className="p-6 font-mono text-[11px] leading-relaxed text-white/80 overflow-y-auto flex-1 flex flex-col gap-1.5 scrollbar-thin select-text">
              {buildLogs.map((log, idx) => (
                <div key={`${log}-${idx}`} className={`${
                  log.startsWith('$') ? 'text-white font-bold' :
                  log.includes('[SUCCESS]') ? 'text-yellow' :
                  log.includes('[COMP]') ? 'text-white/40' : 'text-white/70'
                }`}>
                  {log}
                </div>
              ))}
              {isBuilding && (
                <div className="text-yellow animate-pulse flex items-center gap-2">
                  <div className="w-1.5 h-3 bg-yellow"></div> Writing image?
                </div>
              )}
            </div>

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
            ].map((release) => (
              <div key={release.version} className="relative">
                <div className="absolute -left-[31px] top-1.5 size-4 rounded border-2 border-yellow bg-dark flex items-center justify-center">
                  <div className="size-1.5 bg-yellow rounded-sm" />
                </div>

                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h4 className="text-base font-unbounded font-black uppercase text-white">{release.version}</h4>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-yellow/10 text-yellow border border-yellow/20">
                    {release.status}
                  </span>
                  <span className="text-white/30 text-xs">{release.date}</span>
                </div>
                
                <ul className="list-disc list-inside space-y-1.5 text-xs text-white/50 leading-relaxed pl-2">
                  {release.notes.map((note) => (
                    <li key={note}>{note}</li>
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
