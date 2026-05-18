import Button from '@/components/ui/Button'
import { IconCode, IconBrandGithub } from '@tabler/icons-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-dark">
      {/* Background Backdrop Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-40">
        <Image
          src="/backdrop.png"
          alt="Hero Backdrop"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay gradients for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow leading-relaxed mb-4">
              BUILT BY THE COMMUNITY.<br />NOT CONTROLLED BY CORPORATIONS.
            </div>
            <div className="w-8 h-0.5 bg-yellow mt-3 mb-8" />
            
            <h1 className="text-display-sm font-unbounded font-black uppercase leading-none mb-6">
              <span className="text-white">INDIA&apos;S FIRST</span><br />
              <span className="text-white">FULLY </span><span className="text-yellow">OPEN</span><br />
              <span className="text-yellow">SOURCE</span><br />
              <span className="text-white">TRI-MODE FCU</span>
            </h1>
            
            <h2 className="text-xl font-bold text-white mb-3">Under a unified architecture.</h2>
            
            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-lg">
              A fully open source tri-mode Flight Control Unit. All in the making by a community of passionate innovators and contributors.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">
                <IconCode size={16} className="mr-2 inline" /> EXPLORE TECHNOLOGY →
              </Button>
              <Button variant="secondary" href="https://github.com/lawslefthand/Marut_FCU/">
                VIEW ON GITHUB <IconBrandGithub size={16} className="ml-2 inline" />
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex lg:col-span-5 justify-end items-center relative">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-yellow/5 rounded-full blur-[100px] pointer-events-none" />
            <Image 
              src="/pcb_image_hero.png" 
              alt="Marut FCU PCB" 
              width={500}
              height={500}
              priority
              className="relative z-10 max-w-full max-h-[500px] h-auto object-contain select-none filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:scale-[1.03] transition-transform duration-500" 
            />
          </div>
        </div>
      </div>
      
      <div
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-none z-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,214,0,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
    </section>
  )
}
