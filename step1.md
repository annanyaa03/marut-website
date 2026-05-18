# Agentic Prompt: Build the Marut FCU Website (v1)

## Context & Goal

You are building **v1 of the Marut FCU website** — a fully functional, multi-section HTML/CSS/JS single-page site based on the design screenshot provided (`screen.png`). The site is for **Marut**, India's first fully open-source tri-mode Flight Control Unit (FCU). The visual language is bold, dark, and technical: black backgrounds, yellow (#FFD600 or similar) as the primary accent, white typography, and a minimal geometric grid aesthetic.

Your job is to produce a **single `index.html` file** (with all CSS and JS inlined or in sibling files if you prefer) that:
1. Faithfully recreates the hero section from the screenshot
2. Expands the site with additional sections that logically follow (detailed below)
3. Is clean, responsive, and a solid foundation for future development

---

## Design System

Derive these tokens from the screenshot and apply them consistently:

| Token | Value |
|---|---|
| Background (primary) | `#0A0A0A` or `#0D0D0D` (near-black) |
| Background (surface) | `#111111` or `#141414` (cards, nav) |
| Background (card border) | `#1F1F1F` |
| Accent (primary) | `#FFD600` (yellow) |
| Accent (hover) | `#FFC200` (slightly deeper yellow) |
| Text (primary) | `#FFFFFF` |
| Text (secondary) | `#A0A0A0` |
| Text (muted) | `#555555` |
| Font family | `'Inter', 'Space Grotesk', or system-ui` — load via Google Fonts |
| Hero heading weight | 900 (ultra bold / black) |
| Nav / label weight | 600 |
| Border radius (card) | `4px` to `8px` (sharp, technical aesthetic — not rounded) |
| Border radius (button) | `4px` |

---

## Sections to Build

Build the following sections **in order**, top to bottom:

---

### 1. Navigation Bar (sticky)

- Left: Marut logo — a yellow geometric/stack icon SVG followed by the wordmark "MARUT" in bold white caps
- Center: nav links — HOME · ABOUT · TECHNOLOGY · OPEN SOURCE · BLOG · CONTACT — all uppercase, spaced, white, with the active link underlined in yellow
- Right: a "GITHUB" button with a GitHub icon, outlined style (yellow border, yellow text, transparent background), hover fills yellow with black text
- Sticky on scroll; add a subtle `border-bottom: 1px solid #1F1F1F` when scrolled (JS scroll listener)
- Mobile: collapse to a hamburger menu

---

### 2. Hero Section

Recreate faithfully from the screenshot:

- Full viewport height (`100vh`)
- Top-left text block (left-aligned, ~45% width max):
  - Small yellow uppercase label: "BUILT BY THE COMMUNITY. NOT CONTROLLED BY CORPORATIONS."
  - Yellow horizontal rule / accent line beneath it
  - Giant display heading (font-size clamp ~60px–100px, weight 900):
    - "INDIA'S FIRST" (white)
    - "FULLY OPEN" (yellow)  
    - "SOURCE" (yellow)  
    - "TRI-MODE FCU" (white)
  - Sub-heading: "Under a unified architecture." (white, bold, ~20px)
  - Body paragraph: "A fully open source tri-mode Flight Control Unit. All in the making by a community of passionate innovators and contributors."
  - Two CTA buttons side by side:
    - Primary: yellow fill, black text, `</> EXPLORE TECHNOLOGY →`
    - Secondary: transparent, white border/text, GitHub icon, `VIEW ON GITHUB`
- Background: pure black. No hero image needed — the typography IS the hero.
- Subtle animated grid or dot-pattern overlay on the right half (CSS only, low opacity ~0.04) to add texture without distraction

---

### 3. Feature Cards Row (from screenshot)

Four cards in a horizontal grid (2×2 on mobile):

| Icon (Tabler outline) | Title | Body |
|---|---|---|
| `ti-lock-open` | FULLY OPEN SOURCE | Schematics, PCB, firmware, and docs — all open. No locks. No secrets. |
| `ti-bolt` | TRI-MODE SUPPORT | Fixed Wing, VTOL, Multirotor. One FCU. Any platform. |
| `ti-layers` | UNIFIED ARCHITECTURE | One design. Maximum compatibility. Infinite possibilities. |
| `ti-users-group` | BUILT BY COMMUNITY | By innovators. For innovators. Forever improving. |

Card style: `#111` background, `1px solid #1F1F1F` border, `4px` radius. Icon in yellow at top-left. Title in white uppercase bold. Body in muted gray.

---

### 4. Technology Deep-Dive Section

Heading: "THE TECHNOLOGY" (white, large, bold)  
Sub-heading: "One FCU. Three modes. Infinite possibilities." (yellow)

Three column layout, each column covering one flight mode:

**Fixed Wing**
- Icon: an airplane outline SVG or `ti-plane`
- Description: Optimised PID loops for fixed-wing aerodynamics, with full support for traditional rudder/elevator/aileron configurations.

**VTOL**
- Icon: a helicopter or `ti-drone` style
- Description: Seamless transition logic between hover and cruise modes. Handles tilt-rotor, tailsitter, and hybrid VTOL configurations.

**Multirotor**
- Icon: `ti-propeller` or four-dot grid
- Description: Battle-tested multirotor firmware with support for quadcopters, hexacopters, octocopters, and custom frame geometries.

Each column: dark card, yellow icon, white title, gray body. Add a subtle yellow-left-border accent on hover.

Below the three columns, add a full-width banner-style callout:
> "All three modes. One unified codebase. One community."  
> `[EXPLORE THE ARCHITECTURE →]` (yellow button)

---

### 5. Open Source Section

Background: slightly lighter dark (`#111`), full-width section.

Left column (~55%):
- Heading: "FULLY OPEN. FULLY YOURS."
- Body: "Every schematic, every firmware commit, every PCB layout — open to the world. Fork it, improve it, build on it. No CLAs. No commercial locks. Just open collaboration."
- Two stat callouts side by side:
  - `[GitHub Stars]` — placeholder "★ 0 Stars" (yellow star icon)
  - `[Contributors]` — placeholder "👥 0 Contributors"
- CTA: `[VIEW ON GITHUB →]` yellow button

Right column (~45%): 
- A stylised terminal/code block (dark `#0A0A0A` bg, monospace font, yellow prompt `$`, white text) showing a fake but realistic git clone command:
```
$ git clone https://github.com/marut-fcuproject/marut-fcu
$ cd marut-fcu
$ make configure TARGET=VTOL
> Configuring Marut FCU v0.1.0...
> Target: VTOL ✓
> Build system: Ready ✓
```

---

### 6. Community / Contributors Section

Heading: "BUILT BY THE COMMUNITY"  
Sub-heading: "Join a growing team of engineers, pilots, and open-source enthusiasts."

Three feature boxes (horizontal):
- **Contribute Code** — `ti-code` icon — Submit PRs, fix bugs, build features.
- **Report Issues** — `ti-bug` icon — Help us find and squash problems.
- **Spread the Word** — `ti-share` icon — Star the repo. Tell your friends.

Below: a row of avatar placeholder circles (10–12 circles, gray gradient fill with initials or generic icon) labeled "Our Contributors" with a `[JOIN US ON GITHUB →]` link.

---

### 7. Roadmap / Status Section

Heading: "ROADMAP"  
A vertical timeline (left border line in yellow, dots at each milestone):

| Status | Milestone |
|---|---|
| ✅ Done | Core firmware architecture |
| ✅ Done | Fixed Wing mode — alpha |
| 🔄 In Progress | Multirotor mode — beta |
| 🔄 In Progress | VTOL transition logic |
| 🔲 Planned | Hardware reference design v1 |
| 🔲 Planned | Companion computer integration |
| 🔲 Planned | Ground control station plugin |

Style: yellow dot for done, pulsing yellow dot for in-progress (CSS animation), gray dot for planned.

---

### 8. Blog / Updates Section (Placeholder)

Heading: "LATEST UPDATES"  
Three placeholder blog card stubs in a grid:

Each card:
- Dark card, `1px` border
- Yellow category tag (e.g. "ANNOUNCEMENT", "DEVELOPMENT", "COMMUNITY")
- White bold title
- Gray date + reading time
- Muted excerpt (2 lines, lorem ipsum ok)
- `[Read More →]` yellow text link

---

### 9. Footer

Two-column layout:
- Left: Marut logo + wordmark, tagline: "India's first fully open source tri-mode FCU.", social links row (GitHub icon link, Twitter/X icon link — placeholder hrefs)
- Right: four nav columns:
  - **Product**: Technology, Open Source, Roadmap
  - **Community**: GitHub, Contributors, Blog
  - **Resources**: Documentation, Schematics, Firmware
  - **Project**: About, Contact, License

Bottom bar: `© 2024 Marut FCU Project. Released under the GPL-3.0 License.`

---

## Technical Requirements

- **Single file preferred**: `index.html` with `<style>` in `<head>` and `<script>` before `</body>`. Sibling CSS/JS files are acceptable if you prefer.
- **Fonts**: Load Inter (weights 400, 600, 900) from Google Fonts via `<link>` in `<head>`.
- **Icons**: Use [Tabler Icons](https://tabler.io/icons) via CDN webfont **or** inline SVG for the key icons. Do NOT use emoji for icons.
- **No frameworks**: Vanilla HTML/CSS/JS only. No React, Vue, or build steps. It must open with `file://` or a simple static server.
- **Responsive**: Mobile breakpoints at `640px` and `1024px`. Stack all grids to single column on mobile.
- **Scroll behavior**: `scroll-behavior: smooth` on `html`. Sections have enough `padding` for anchor link offsets.
- **Animations**: Keep subtle — fade-in on scroll (IntersectionObserver), the pulsing roadmap dot, and the hover effects are sufficient. No heavy JS animation libraries.
- **Accessibility**: Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>`, `<button>`, `<a>`). Alt text on any `<img>`. Sufficient color contrast (yellow on black passes AAA).

---

## Files to Produce

```
/
├── index.html          ← Main deliverable (all CSS/JS inline or linked)
├── styles.css          ← (optional, if you split CSS out)
└── README.md           ← One-paragraph description + how to run locally
```

---

## Definition of Done

- [ ] All 9 sections render correctly in Chrome and Firefox at 1440px desktop width
- [ ] Site is fully responsive down to 375px (iPhone SE)
- [ ] Nav sticky behavior works on scroll
- [ ] Smooth scroll to sections from nav links
- [ ] All CTA buttons have correct hover states
- [ ] No console errors on load
- [ ] Yellow accent color (`#FFD600`) is used consistently throughout
- [ ] Typography hierarchy matches the screenshot (giant hero heading, smaller section headings, muted body)
- [ ] Code terminal block in Open Source section renders in monospace with correct line breaks
- [ ] Roadmap pulsing animation works

---

## Style Notes & Do Nots

- **Do** keep the aesthetic sharp and technical — this is engineering, not lifestyle branding.
- **Do** use ALL CAPS for section labels and card titles (it's part of the brand voice).
- **Do** let whitespace breathe — generous padding between sections (~100px–120px vertical).
- **Don't** add any illustrations, stock photos, or hero images — the design is intentionally typographic.
- **Don't** use rounded pill buttons — keep `border-radius: 4px` for that precise, technical feel.
- **Don't** introduce any color outside the design system (no blues, greens, reds) unless it's a semantic status indicator in the roadmap.
- **Don't** add a cookie banner, analytics, or any third-party scripts beyond fonts and icons.
