import type { Metadata } from 'next'
import SchematicsClient from './SchematicsClient'

export const metadata: Metadata = {
  title: 'SCHEMATICS | Marut FCU',
  description: 'Marut FCU schematic views, board details, and hardware design resources.',
}

export default function Page() {
  return <SchematicsClient />
}
