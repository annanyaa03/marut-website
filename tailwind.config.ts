import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: '#FFD600',
          hover: '#FFC200',
        },
        dark: {
          DEFAULT: '#0A0A0A',
          surface: '#111111',
          card: '#141414',
          border: '#1F1F1F',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter-tight)', 'system-ui', 'sans-serif'],
        unbounded: ['var(--font-unbounded)', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        black: '900',
      },
      fontSize: {
        'display-sm': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.05', fontWeight: '900' }],
        'display': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.0', fontWeight: '900' }],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '8px',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
