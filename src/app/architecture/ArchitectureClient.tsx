'use client';

import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import SectionHeading from '@/components/ui/SectionHeading';

const LOADING_STYLE = {
  width: '100%',
  height: '80vh',
  background: '#0F1923',
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#4A5568',
  fontSize: 14,
  border: '1px solid #2D3748',
};

const MarutMindMap = dynamic(() => import('@/components/MarutMindMap'), {
  ssr: false,
  loading: () => (
    <div style={LOADING_STYLE}>
      Loading mind map…
    </div>
  ),
});

export default function ArchitectureClient() {
  return (
    <main className="bg-dark text-white min-h-screen flex flex-col justify-between">
      <Nav />

      <div className="pt-28 pb-16 flex-1 max-w-7xl mx-auto px-6 w-full">
        <div className="mb-12">
          <SectionHeading
            label="SYSTEM INTERNALS"
            heading="SYSTEM ARCHITECTURE"
            subheading="Interactive mind map of the Marut flight controller hardware and software stack"
          />
        </div>

        <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-white/40">
          Scroll to zoom &middot; Drag to pan &middot; Click &plusmn; to expand/collapse branches
        </p>

        <MarutMindMap />
      </div>

      <Footer />
    </main>
  );
}
