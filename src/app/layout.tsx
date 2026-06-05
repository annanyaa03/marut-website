import type { Metadata } from 'next'
import { Inter_Tight, Unbounded } from 'next/font/google'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '600', '900'],
  variable: '--font-inter-tight',
})

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '900'],
  variable: '--font-unbounded',
})

export const metadata: Metadata = {
  title: 'Marut FCU — India\'s First Fully Open Source Tri-Mode Flight Control Unit',
  description: 'A fully open source tri-mode Flight Control Unit. Built by the community. Not controlled by corporations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${interTight.variable} ${unbounded.variable}`}>
      <body className="font-sans antialiased bg-dark text-white">
        {children}
      </body>
    </html>
  )
}
