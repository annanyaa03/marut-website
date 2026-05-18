# Agentic Prompt: Migrate Marut FCU Site to Next.js 14 (App Router) + Tailwind CSS

## Your Role

You are a senior frontend engineer migrating an existing static HTML/CSS/JS website into a production-ready Next.js 14 application. You will follow every instruction in this prompt exactly as written. You will not make any decisions that are not explicitly covered here. If something is not specified, stop and ask before proceeding.

---

## Source Material

- The existing site lives in `index.html` (and optionally `styles.css`) in the current working directory.
- A design reference screenshot is at `screen.png` in the current working directory.
- Your job is to migrate all existing content, layout, and styles into the new stack. Do not add, remove, or rephrase any content unless this prompt explicitly instructs you to.

---

## Target Stack — Exact Versions

Install these exact packages. Do not substitute alternatives or add extras not listed here.

| Package | Version | Purpose |
|---|---|---|
| `next` | `14.2.x` (latest patch of 14.2) | Framework |
| `react` | `18.x` | UI runtime |
| `react-dom` | `18.x` | DOM renderer |
| `typescript` | `5.x` | Type safety |
| `tailwindcss` | `3.4.x` | Utility-first CSS |
| `postcss` | `8.x` | Tailwind peer dependency |
| `autoprefixer` | `10.x` | Tailwind peer dependency |
| `@types/node` | `20.x` | Node type definitions |
| `@types/react` | `18.x` | React type definitions |
| `@types/react-dom` | `18.x` | React DOM type definitions |
| `@tabler/icons-react` | latest | Icon components |

**Bootstrap command:**

```bash
npx create-next-app@14.2 . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-experimental-app
```

Run this in the repo root. Answer every interactive prompt with the default (press Enter). After scaffolding, install the additional package:

```bash
npm install @tabler/icons-react
```

Do not install `framer-motion`, `shadcn/ui`, `radix-ui`, `lucide-react`, `heroicons`, `headlessui`, or any other UI or animation library. If you believe one is needed, stop and ask.

---

## Project Structure

After scaffolding, the repository must have exactly this structure. Do not create any files or folders not listed here unless this prompt explicitly says to.

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout: html, body, font, metadata
│   │   ├── page.tsx            ← Home page: imports and composes all sections
│   │   └── globals.css         ← Global styles: Tailwind directives + CSS custom properties
│   └── components/
│       ├── Nav.tsx
│       ├── sections/
│       │   ├── Hero.tsx
│       │   ├── FeatureCards.tsx
│       │   ├── Technology.tsx
│       │   ├── OpenSource.tsx
│       │   ├── Community.tsx
│       │   ├── Roadmap.tsx
│       │   ├── Blog.tsx
│       │   └── Footer.tsx
│       └── ui/
│           ├── Button.tsx
│           └── SectionHeading.tsx
├── public/
│   └── (empty — no assets needed for v1)
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json               ← Do not modify from scaffold default
├── next.config.js              ← Do not modify from scaffold default
├── .eslintrc.json              ← Do not modify from scaffold default
└── package.json
```

---

## Tailwind Configuration

Replace the contents of `tailwind.config.ts` with exactly the following. Do not add or remove any keys.

```ts
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
```

---

## Global CSS

Replace the contents of `src/app/globals.css` with exactly the following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #0A0A0A;
    color: #FFFFFF;
  }

  ::selection {
    background-color: #FFD600;
    color: #0A0A0A;
  }
}

@layer utilities {
  .section-padding {
    padding-top: 7rem;
    padding-bottom: 7rem;
  }
}
```

---

## Root Layout (`src/app/layout.tsx`)

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '900'],
  variable: '--font-inter',
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
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-dark text-white">
        {children}
      </body>
    </html>
  )
}
```

---

## Home Page (`src/app/page.tsx`)

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import FeatureCards from '@/components/sections/FeatureCards'
import Technology from '@/components/sections/Technology'
import OpenSource from '@/components/sections/OpenSource'
import Community from '@/components/sections/Community'
import Roadmap from '@/components/sections/Roadmap'
import Blog from '@/components/sections/Blog'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <FeatureCards />
      <Technology />
      <OpenSource />
      <Community />
      <Roadmap />
      <Blog />
      <Footer />
    </main>
  )
}
```

---

## Reusable UI Components

### `src/components/ui/Button.tsx`

This component must support exactly these props and no others:

```tsx
type ButtonProps = {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  href?: string
  onClick?: () => void
}
```

- `variant="primary"`: yellow background (`bg-yellow`), black text (`text-dark`), hover darkens to `bg-yellow-hover`. No border.
- `variant="secondary"`: transparent background, white border (`border border-white`), white text. Hover: white background, black text.
- Shape: `rounded` (which maps to `border-radius: 4px` from config), `px-6 py-3`, `text-sm font-semibold uppercase tracking-widest`.
- If `href` is provided, render an `<a>` tag. If `onClick` is provided, render a `<button>` tag. Both cases must apply the same classes.
- Do not add any icon logic inside this component. Icons are passed as part of `children` by the caller.

### `src/components/ui/SectionHeading.tsx`

Props:

```tsx
type SectionHeadingProps = {
  label?: string       // Small uppercase yellow label above heading (optional)
  heading: string      // Main heading text (white)
  subheading?: string  // Secondary line below heading (yellow, optional)
}
```

- `label`: `text-xs font-semibold uppercase tracking-[0.2em] text-yellow mb-3`
- `heading`: `text-4xl md:text-5xl font-black uppercase text-white leading-tight`
- `subheading`: `text-lg text-yellow mt-2 font-semibold`

---

## Component Specifications

Implement each component exactly as described. Do not invent props, add animations, or change copy unless stated.

---

### `src/components/Nav.tsx`

**Behaviour:**
- Fixed to top of viewport: `fixed top-0 left-0 right-0 z-50`
- Default background: `bg-dark/80 backdrop-blur-sm`
- On scroll (Y > 10px): add `border-b border-dark-border` via a `useEffect` + `useState` scroll listener
- The scroll listener must be cleaned up in the `useEffect` return function

**Layout (desktop, `md:` breakpoint and above):**
- Full-width flex row: logo left, nav links center, GitHub button right
- Container: `max-w-7xl mx-auto px-6 h-16 flex items-center justify-between`

**Logo (left):**
- A yellow SVG stack/layer icon (3 stacked rectangles, each offset slightly, all filled `#FFD600`) followed by the text "MARUT" in `font-black uppercase tracking-widest text-white text-lg`
- Wrap in `<a href="/">` 

**Nav links (center, desktop only — hidden on mobile):**
- Links: HOME · ABOUT · TECHNOLOGY · OPEN SOURCE · BLOG · CONTACT
- Each: `text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors`
- The "HOME" link has an additional `border-b-2 border-yellow pb-0.5 text-white` class (active state — hardcoded for v1)
- IDs to link to: `#about`, `#technology`, `#open-source`, `#blog`, `#contact` — HOME links to `#`

**GitHub button (right, desktop):**
- Use the `Button` component: `variant="secondary"`
- Children: `<IconBrandGithub size={16} className="mr-2 inline" /> GITHUB`
- `href="https://github.com"` (placeholder)

**Mobile menu:**
- A hamburger icon button (`<IconMenu2 size={24} />`) visible only below `md:` breakpoint, right-aligned
- On click: toggle a full-width dropdown below the nav bar containing all links stacked vertically
- Dropdown: `bg-dark-surface border-b border-dark-border px-6 py-4 flex flex-col gap-4`
- Each mobile link: same text style as desktop links
- GitHub button also appears at bottom of mobile dropdown
- Use `useState` for open/closed toggle. No animation required.

---

### `src/components/sections/Hero.tsx`

**Layout:**
- Full viewport height: `min-h-screen flex items-center`
- Container: `max-w-7xl mx-auto px-6 pt-16` (pt-16 offsets fixed nav)
- Content is left-aligned, max-width `max-w-2xl`

**Elements in order (top to bottom):**

1. Label: `text-xs font-semibold uppercase tracking-[0.2em] text-yellow leading-relaxed mb-4`
   - Text: "BUILT BY THE COMMUNITY." on line 1, "NOT CONTROLLED BY CORPORATIONS." on line 2
   - Followed by a `<div className="w-8 h-0.5 bg-yellow mt-3 mb-8" />`

2. Display heading: `text-display font-black uppercase leading-none mb-6`
   - Line 1: `<span className="text-white">INDIA'S FIRST</span>`
   - Line 2: `<span className="text-white">FULLY </span><span className="text-yellow">OPEN</span>`
   - Line 3: `<span className="text-yellow">SOURCE</span>`
   - Line 4: `<span className="text-white">TRI-MODE FCU</span>`
   - Render as a single `<h1>` with `<br />` between lines

3. Sub-heading: `text-xl font-bold text-white mb-3`
   - Text: "Under a unified architecture."

4. Body paragraph: `text-white/60 text-base leading-relaxed mb-8 max-w-lg`
   - Text: "A fully open source tri-mode Flight Control Unit. All in the making by a community of passionate innovators and contributors."

5. Button row: `flex flex-wrap gap-4`
   - Button 1: `Button variant="primary"` — children: `<IconCode size={16} className="mr-2 inline" /> EXPLORE TECHNOLOGY →`
   - Button 2: `Button variant="secondary"` — children: `VIEW ON GITHUB <IconBrandGithub size={16} className="ml-2 inline" />`

**Background decoration:**
- A `<div>` absolutely positioned right-half of the section, full height, with a CSS dot-grid pattern:
  ```tsx
  <div
    className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
    style={{
      backgroundImage: 'radial-gradient(circle, rgba(255,214,0,0.07) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
    }}
  />
  ```
- The Hero section container must have `relative overflow-hidden` for this to work

---

### `src/components/sections/FeatureCards.tsx`

**Layout:**
- No section padding top — this section sits directly below the hero
- `border-t border-b border-dark-border`
- Four cards in a `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` — no container max-width, full bleed
- Each card: `border-r border-dark-border last:border-r-0 p-8`

**Cards data (define as a const array inside the component file):**

```ts
const features = [
  {
    icon: IconLockOpen,
    title: 'FULLY OPEN SOURCE',
    body: 'Schematics, PCB, firmware, and docs — all open. No locks. No secrets.',
  },
  {
    icon: IconBolt,
    title: 'TRI-MODE SUPPORT',
    body: 'Fixed Wing, VTOL, Multirotor. One FCU. Any platform.',
  },
  {
    icon: IconStack2,
    title: 'UNIFIED ARCHITECTURE',
    body: 'One design. Maximum compatibility. Infinite possibilities.',
  },
  {
    icon: IconUsersGroup,
    title: 'BUILT BY COMMUNITY',
    body: 'By innovators. For innovators. Forever improving.',
  },
]
```

**Each card renders:**
- Icon: `<Icon size={28} className="text-yellow mb-5" />`
- Title: `text-xs font-bold uppercase tracking-widest text-white mb-3`
- Body: `text-sm text-white/50 leading-relaxed`

---

### `src/components/sections/Technology.tsx`

**Section:** `id="technology"` `section-padding` `max-w-7xl mx-auto px-6`

**Header:** Use `SectionHeading` with:
- `label="THE TECHNOLOGY"`
- `heading="One FCU. Three Modes."`
- `subheading="Infinite possibilities."`
- Add `className="mb-16"` wrapper div

**Three column grid:** `grid grid-cols-1 md:grid-cols-3 gap-6 mb-16`

**Columns data:**

```ts
const modes = [
  {
    icon: IconPlane,
    title: 'FIXED WING',
    body: 'Optimised PID loops for fixed-wing aerodynamics, with full support for traditional rudder, elevator, and aileron configurations.',
  },
  {
    icon: IconDrone,
    title: 'VTOL',
    body: 'Seamless transition logic between hover and cruise modes. Handles tilt-rotor, tailsitter, and hybrid VTOL configurations.',
  },
  {
    icon: IconPropeller,
    title: 'MULTIROTOR',
    body: 'Battle-tested multirotor firmware with support for quadcopters, hexacopters, octocopters, and custom frame geometries.',
  },
]
```

**Each column card:**
- `bg-dark-card border border-dark-border rounded-lg p-8 group hover:border-yellow/40 transition-colors`
- Icon: `<Icon size={32} className="text-yellow mb-6" />`
- Title: `text-xs font-bold uppercase tracking-widest text-white mb-4`
- Body: `text-sm text-white/50 leading-relaxed`
- Left border accent on hover: add `border-l-2 border-l-yellow` via the `group-hover` — do this by wrapping the card in a relative div and adding an absolutely positioned `<div className="absolute left-0 top-0 bottom-0 w-0.5 bg-yellow opacity-0 group-hover:opacity-100 transition-opacity rounded-l-lg" />`

**Callout banner below the grid:**
- `border border-dark-border rounded-lg p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6`
- Left: `<p className="text-xl font-bold text-white">"All three modes. One unified codebase. One community."</p>`
- Right: `Button variant="primary"` — children: `EXPLORE THE ARCHITECTURE →`

---

### `src/components/sections/OpenSource.tsx`

**Section:** `id="open-source"` `section-padding bg-dark-surface`

**Container:** `max-w-7xl mx-auto px-6`

**Two-column grid:** `grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`

**Left column:**
- `SectionHeading` with `heading="FULLY OPEN. FULLY YOURS."` (no label, no subheading)
- Body paragraph: `text-white/60 text-base leading-relaxed mt-6 mb-8`
  - Text: "Every schematic, every firmware commit, every PCB layout — open to the world. Fork it, improve it, build on it. No CLAs. No commercial locks. Just open collaboration."
- Stats row: `flex gap-8 mb-8`
  - Stat 1: `<IconStar size={20} className="text-yellow mr-2 inline" /> <span className="text-white font-bold">★ 0 Stars</span> <span className="text-white/40 text-sm ml-1">on GitHub</span>`
  - Stat 2: `<IconUsers size={20} className="text-yellow mr-2 inline" /> <span className="text-white font-bold">0 Contributors</span>`
- `Button variant="primary"` — children: `VIEW ON GITHUB →` — `href="https://github.com"`

**Right column — Terminal block:**
- Outer wrapper: `bg-dark rounded-lg border border-dark-border overflow-hidden`
- Terminal header bar: `bg-dark-surface border-b border-dark-border px-4 py-3 flex items-center gap-2`
  - Three circles: `w-3 h-3 rounded-full bg-dark-border` (three of them, side by side)
  - Label: `text-xs text-white/30 ml-2 font-mono`  — text: "bash"
- Terminal body: `p-6 font-mono text-sm leading-relaxed`
- Lines to render (exact text, exact colors):

```
$ git clone https://github.com/marut-fcuproject/marut-fcu    → text-yellow for $, text-white for the rest
$ cd marut-fcu                                                → same
$ make configure TARGET=VTOL                                  → same
                                                              → blank line
> Configuring Marut FCU v0.1.0...                            → text-white/50
> Target: VTOL ✓                                             → text-green-400
> Build system: Ready ✓                                       → text-green-400
```

Render each line as a `<div>` with a `<span>` for the `$` or `>` prompt in the appropriate color, followed by a `<span>` for the rest of the line. Do not use a `<pre>` or `<code>` block — use divs with font-mono.

---

### `src/components/sections/Community.tsx`

**Section:** `id="contact"` `section-padding` `max-w-7xl mx-auto px-6`

**Header:** `SectionHeading` with `heading="BUILT BY THE COMMUNITY"` and `subheading="Join a growing team of engineers, pilots, and open-source enthusiasts."` — centered: add `text-center` wrapper div with `mb-16`

**Three-box grid:** `grid grid-cols-1 md:grid-cols-3 gap-6 mb-16`

**Boxes data:**

```ts
const ways = [
  {
    icon: IconCode,
    title: 'CONTRIBUTE CODE',
    body: 'Submit PRs, fix bugs, build features. All skill levels welcome.',
  },
  {
    icon: IconBug,
    title: 'REPORT ISSUES',
    body: 'Help us find and squash problems. Open an issue on GitHub.',
  },
  {
    icon: IconShare,
    title: 'SPREAD THE WORD',
    body: 'Star the repo. Tell your community. Help the project grow.',
  },
]
```

**Each box:** `bg-dark-card border border-dark-border rounded-lg p-8 text-center`
- Icon: `<Icon size={32} className="text-yellow mb-5 mx-auto" />`
- Title: `text-xs font-bold uppercase tracking-widest text-white mb-3`
- Body: `text-sm text-white/50 leading-relaxed`

**Contributors row below grid:**
- Label: `text-sm font-semibold uppercase tracking-widest text-white/40 mb-6 text-center`
  - Text: "OUR CONTRIBUTORS"
- Avatar row: `flex flex-wrap justify-center gap-3 mb-8`
  - Render 12 placeholder avatar circles
  - Each: `w-10 h-10 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center`
  - Inside each: `<IconUser size={16} className="text-white/30" />`
- CTA: centered `Button variant="secondary"` — children: `JOIN US ON GITHUB →` — `href="https://github.com"`

---

### `src/components/sections/Roadmap.tsx`

**Section:** `id="about"` `section-padding bg-dark-surface`

**Container:** `max-w-3xl mx-auto px-6`

**Header:** `SectionHeading` with `label="ROADMAP"` `heading="WHERE WE'RE GOING"` — centered, `mb-16`

**Timeline data (define as const inside file):**

```ts
type MilestoneStatus = 'done' | 'in-progress' | 'planned'

const milestones: { status: MilestoneStatus; text: string }[] = [
  { status: 'done',        text: 'Core firmware architecture' },
  { status: 'done',        text: 'Fixed Wing mode — alpha' },
  { status: 'in-progress', text: 'Multirotor mode — beta' },
  { status: 'in-progress', text: 'VTOL transition logic' },
  { status: 'planned',     text: 'Hardware reference design v1' },
  { status: 'planned',     text: 'Companion computer integration' },
  { status: 'planned',     text: 'Ground control station plugin' },
]
```

**Timeline layout:**
- Outer wrapper: `relative`
- Vertical line: `absolute left-4 top-0 bottom-0 w-px bg-dark-border` (runs through all items)
- Each item: `relative flex items-start gap-6 mb-10 last:mb-0`

**Dot per item (positioned over the vertical line):**
- Base classes for all dots: `relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center`
- `done`: `border-yellow bg-dark-surface` + inside: `<IconCheck size={14} className="text-yellow" />`
- `in-progress`: `border-yellow bg-yellow animate-pulse` + inside: `<div className="w-2 h-2 rounded-full bg-dark" />`
- `planned`: `border-dark-border bg-dark-surface` + inside: `<div className="w-2 h-2 rounded-full bg-dark-border" />`

**Text next to dot:**
- `done`: `text-white/80 text-base font-medium pt-1`
- `in-progress`: `text-white text-base font-semibold pt-1`
- `planned`: `text-white/30 text-base font-medium pt-1`

---

### `src/components/sections/Blog.tsx`

**Section:** `id="blog"` `section-padding` `max-w-7xl mx-auto px-6`

**Header:** `SectionHeading` with `label="LATEST UPDATES"` `heading="FROM THE BUILD LOG"` — `mb-16`

**Blog card data (define as const inside file):**

```ts
const posts = [
  {
    category: 'ANNOUNCEMENT',
    title: 'Marut FCU Project Goes Public',
    date: 'December 2024',
    readTime: '3 min read',
    excerpt: 'After months of private development, we are opening the doors. The schematics, firmware, and all documentation are now live on GitHub.',
  },
  {
    category: 'DEVELOPMENT',
    title: 'Fixed Wing Alpha: What We Learned',
    date: 'November 2024',
    readTime: '6 min read',
    excerpt: 'Our first public alpha of the fixed wing flight mode is out. Here is a deep dive into the PID tuning challenges we faced and how we solved them.',
  },
  {
    category: 'COMMUNITY',
    title: 'How to Contribute to Marut FCU',
    date: 'October 2024',
    readTime: '4 min read',
    excerpt: 'Whether you are a firmware engineer, PCB designer, or just someone passionate about open aviation — here is how you can get involved.',
  },
]
```

**Grid:** `grid grid-cols-1 md:grid-cols-3 gap-6`

**Each card:** `bg-dark-card border border-dark-border rounded-lg p-8 flex flex-col`
- Category badge: `inline-block text-xs font-bold uppercase tracking-widest text-yellow border border-yellow/30 rounded px-2 py-1 mb-4 w-fit`
- Title: `text-white font-bold text-lg leading-snug mb-3`
- Meta row: `text-white/30 text-xs mb-4 flex gap-3` — date + `·` + read time
- Excerpt: `text-white/50 text-sm leading-relaxed flex-1 mb-6`
- Link: `text-yellow text-sm font-semibold uppercase tracking-wide hover:text-yellow-hover transition-colors mt-auto` — text: `READ MORE →` — `href="#"` (placeholder)

---

### `src/components/sections/Footer.tsx`

**Layout:** `bg-dark-surface border-t border-dark-border`

**Upper section:** `max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12`

**Left column:**
- Logo (same as Nav — reuse exact same JSX structure, do not import Nav)
- Tagline: `text-white/40 text-sm mt-4 max-w-xs leading-relaxed`
  - Text: "India's first fully open source tri-mode Flight Control Unit."
- Social links row: `flex gap-4 mt-6`
  - GitHub: `<a href="https://github.com"><IconBrandGithub size={20} className="text-white/40 hover:text-white transition-colors" /></a>`
  - Twitter/X: `<a href="#"><IconBrandX size={20} className="text-white/40 hover:text-white transition-colors" /></a>`

**Right column:** `grid grid-cols-2 sm:grid-cols-4 gap-8`

Four nav groups (each a `<div>`):
- **Product**: Technology · Open Source · Roadmap
- **Community**: GitHub · Contributors · Blog
- **Resources**: Documentation · Schematics · Firmware
- **Project**: About · Contact · License

Each group:
- Group heading: `text-xs font-bold uppercase tracking-widest text-white mb-4`
- Each link: `block text-sm text-white/40 hover:text-white transition-colors mb-2` — all `href="#"` (placeholder)

**Bottom bar:** `border-t border-dark-border`
- Inner: `max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4`
- Left: `text-xs text-white/30` — text: `© 2024 Marut FCU Project. Released under the GPL-3.0 License.`
- Right: `text-xs text-white/30` — text: `Built by the community.`

---

## TypeScript Rules

- Every component file must have a `.tsx` extension
- Props interfaces must be defined with `type`, not `interface`
- Do not use `any` anywhere
- All Tabler icon imports must come from `@tabler/icons-react`
- The `'use client'` directive must be added at the top of `Nav.tsx` and any other component that uses `useState` or `useEffect`. All other components are React Server Components by default — do not add `'use client'` to them.

---

## Linting & Formatting

- Do not modify `.eslintrc.json`
- After generating all files, run `npm run lint` and fix every reported error before considering the task done
- Do not disable any ESLint rules with `// eslint-disable` comments

---

## Definition of Done

Check every item before reporting completion:

- [ ] `npm run dev` starts without errors on port 3000
- [ ] `npm run build` completes without errors or warnings
- [ ] `npm run lint` returns zero errors
- [ ] All 9 sections are visible in the browser at `http://localhost:3000`
- [ ] Nav is fixed to top and does not overlap content (hero has `pt-16`)
- [ ] Nav border-bottom appears after scrolling past 10px
- [ ] Mobile hamburger menu opens and closes correctly at < `md` breakpoint (768px)
- [ ] All nav anchor links scroll to the correct section
- [ ] Hero dot-grid background decoration renders on right half
- [ ] Yellow accent (`#FFD600`) appears on all interactive elements (hover states, icons, labels)
- [ ] Terminal block in OpenSource section shows correct line colors (yellow prompt, green ✓ lines)
- [ ] Roadmap pulsing dot animates on `in-progress` items
- [ ] All three blog cards render with correct category badge styles
- [ ] Footer nav links and social icons render correctly
- [ ] Zero TypeScript errors (`npx tsc --noEmit` passes)
- [ ] No `console.error` or `console.warn` in browser DevTools on page load
- [ ] Page is fully responsive at 375px viewport width — no horizontal scroll

---

## What To Do If Anything Is Unclear

Stop. Do not guess. Do not use your own judgment. Ask the user to clarify before writing any code related to that specific item. Continue with all other items that are clear.
