# Eid Mubarak - Interactive 3D Greeting Card

A cinematic, prize-winning interactive Eid greeting card built with **React**, **Three.js**, **React Three Fiber**, and **GSAP**. Features a multi-section scrollable experience with 3D mosque scene, flip card, interactive lanterns, Tasbih counter, sacred Du'as, and celebration effects.

---

## Features

| Feature | Details |
|---|---|
| Cinematic Intro | GSAP 9-phase timeline: stars, crescent moon rise, calligraphy burst, fade transition |
| 3D Mosque Scene | React Three Fiber procedural mosque with domes, minarets, star particles, dynamic lighting |
| Interactive Lanterns | 5 swinging SVG lanterns — tap to reveal a blessing message |
| 3D Flip Card | CSS perspective card with geometric Islamic pattern, flips to reveal message + fireworks |
| Download as PNG | html2canvas exports the personalized card as high-res image |
| Sacred Du'as | 5 expandable Quranic prayer tiles with Arabic, translation, and reference |
| Tasbih Counter | 99 Names of Allah with progress ring, dot tracker, tap counter (33/99/100 targets) |
| Heartfelt Wishes | 6 animated wish cards in responsive grid |
| Fireworks | DOM-based fireworks on card flip and celebrate button |
| Click Sparkle | Gold particle burst on every click across the page |
| Confetti | Canvas particle system with stars, crescents, rectangles in theme colors |
| 3 Themes | Gold Night, Emerald, Royal Purple — live CSS variable switching |
| Scroll Reveals | IntersectionObserver-powered section entrance animations |
| Staggered Entry | Hero text, controls, FAB all animate in with choreographed delays |

---

## Quick Start

### Prerequisites
- Node.js 16+
- npm 8+

### Install & Run
```bash
cd eid-card
npm install
npm start
```
Opens at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
```
Output in `build/` — ready for static hosting.

---

## Project Structure

```
src/
  App.js              Main app — layout, state, themes, all sections
  IntroAnimation.js   GSAP cinematic intro sequence (9 phases)
  MosqueScene.js      React Three Fiber 3D mosque with lighting
  Confetti.js         Canvas confetti particle system
  ThemeSwitcher.js    Theme swatch selector with GSAP animation
  DuaSection.js       Expandable prayer accordion (5 du'as)
  TasbihCounter.js    99 Names of Allah counter with progress ring
  styles.css          Complete styles, animations, responsive, a11y
  index.js            React entry point + service worker cleanup
public/
  index.html          HTML shell with dark background preloader
  manifest.json       PWA manifest
  service-worker.js   Service worker
```

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React | 18.2 | UI framework |
| Three.js | 0.160 | 3D rendering engine |
| @react-three/fiber | 8.15 | React renderer for Three.js |
| @react-three/drei | 9.92 | Three.js helpers |
| GSAP | 3.12 | Timeline & tween animations |
| html2canvas | 1.4 | Card download as PNG |

---

## Design

### Typography
- **Cinzel Decorative** — display/headings (ornate, ceremonial)
- **Cormorant Garamond** — body text (elegant, classical)
- **Amiri** — Arabic calligraphy (authentic script)

### Color System
All colors exposed as CSS custom properties (`--primary`, `--secondary`, etc.) — the entire UI responds instantly to theme changes via a single `useEffect`.

### 3D Architecture
The mosque is built from primitive Three.js geometries (Box, Sphere, Cylinder, Cone) — no external 3D models needed. Keeps bundle size minimal and load times fast.

### Performance
- Stars: single `Points` mesh (1 draw call for 350+ particles)
- Camera: GSAP initial reveal, then lightweight `useFrame` sine wave orbit
- CSS animations preferred over JS where possible
- Confetti: `requestAnimationFrame` loop with auto-cleanup

---

## Deployment

### Netlify
```bash
npm run build
netlify deploy --prod --dir=build
```

Add `netlify.toml` for SPA routing:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel
```bash
vercel --prod
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
npx gh-pages -d build
```

---

## Accessibility

- ARIA labels and roles on all interactive elements
- Keyboard navigation support
- `prefers-reduced-motion` disables all animations
- `prefers-contrast: high` increases text contrast
- Semantic HTML throughout

---

## Contest Checklist

  - [x] Original implementation — no copied components
  - [x] React 18 + Three.js + GSAP
  - [x] Cinematic GSAP intro animation
  - [x] 3D mosque with dome, minarets, crescent, stars
  - [x] 3D flip card with geometric pattern
  - [x] Interactive lanterns with blessings
  - [x] Download card as PNG
  - [x] Sacred Du'as with Arabic + translation
  - [x] 99 Names of Allah Tasbih counter
  - [x] Heartfelt wishes grid
  - [x] Fireworks + confetti + click sparkle effects
  - [x] 3 theme options (Gold / Emerald / Purple)
  - [x] Scroll reveal animations
  - [x] Staggered entrance choreography
  - [x] Responsive (mobile + desktop)
  - [x] Accessibility (ARIA, keyboard, reduced-motion, high-contrast)
  - [x] Production build ready
  - [x] Deployment instructions

  ---

  *Made with love for Eid 1447 AH*
