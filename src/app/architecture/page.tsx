import type { Metadata } from 'next';
import ArchitectureClient from './ArchitectureClient';

export const metadata: Metadata = {
  title: 'SYSTEM ARCHITECTURE | Marut FCU',
  description: 'Interactive system architecture mind map for the Marut UAV Flight Control Unit.',
};

export default function Page() {
  return <ArchitectureClient />;
}
