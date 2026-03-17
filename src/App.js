import React, { useState, useEffect, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import IntroAnimation from './IntroAnimation';
import MosqueScene from './MosqueScene';
import ThemeSwitcher from './ThemeSwitcher';
import Confetti from './Confetti';

import DuaSection from './DuaSection';
import TasbihCounter from './TasbihCounter';
import FlipCard from './FlipCard';
import './styles.css';

// ── Theme definitions ─────────────────────────────────────────────────────────
export const THEMES = {
  gold: {
    id: 'gold', label: 'Gold Night',
    primary: '#d4af37', secondary: '#f5d76e', accent: '#c8860a',
    bg: '#0b0b2a', bgMid: '#12124a', bgFar: '#07071a',
    surface: 'rgba(212,175,55,0.10)', border: 'rgba(212,175,55,0.35)',
    text: '#f8f0d0', subtext: 'rgba(248,240,208,0.65)',
    glow: '0 0 40px rgba(212,175,55,0.55)',
    skyColor: '#0b0b2a', moonColor: '#f5d76e',
    domeColor: '#1a1a4a', minaretColor: '#141440',
    groundColor: '#080820', lightColor: '#d4af37', particleColor: '#f5d76e',
  },
  emerald: {
    id: 'emerald', label: 'Emerald',
    primary: '#2ecc71', secondary: '#a8f0c6', accent: '#1a7a44',
    bg: '#071a10', bgMid: '#0d2b1a', bgFar: '#040f0a',
    surface: 'rgba(46,204,113,0.10)', border: 'rgba(46,204,113,0.35)',
    text: '#d0f5e2', subtext: 'rgba(208,245,226,0.65)',
    glow: '0 0 40px rgba(46,204,113,0.55)',
    skyColor: '#071a10', moonColor: '#a8f0c6',
    domeColor: '#0d3320', minaretColor: '#0a2818',
    groundColor: '#040f09', lightColor: '#2ecc71', particleColor: '#a8f0c6',
  },
  purple: {
    id: 'purple', label: 'Royal Purple',
    primary: '#9b59b6', secondary: '#d7bde2', accent: '#6c3483',
    bg: '#0d0720', bgMid: '#180b38', bgFar: '#080412',
    surface: 'rgba(155,89,182,0.10)', border: 'rgba(155,89,182,0.35)',
    text: '#ede0f5', subtext: 'rgba(237,224,245,0.65)',
    glow: '0 0 40px rgba(155,89,182,0.55)',
    skyColor: '#0d0720', moonColor: '#d7bde2',
    domeColor: '#1e0f3a', minaretColor: '#160b2e',
    groundColor: '#070411', lightColor: '#9b59b6', particleColor: '#d7bde2',
  },
};

// ── Lantern data ──────────────────────────────────────────────────────────────
const BLESSINGS = [
  { icon: '☀️', arabic: 'السَّلَامُ عَلَيْكُمْ', english: 'Peace be upon you' },
  { icon: '🤲', arabic: 'بَارَكَ اللَّهُ فِيكُمْ', english: 'May Allah bless you' },
  { icon: '🌙', arabic: 'عِيدُكُمْ مُبَارَك', english: 'Joy & Happiness' },
  { icon: '✨', arabic: 'جَعَلَكَ اللَّهُ مِنَ العَائِدِين', english: 'Prosperity & Health' },
  { icon: '💛', arabic: 'رَحْمَةٌ وَمَوَدَّة', english: 'Love & Mercy' },
];
const LANTERN_COLORS = ['#d4a853', '#e07b5d', '#5dba8e', '#5d8eba', '#ba5d8e'];
const LANTERN_DURATIONS = [4.5, 5.0, 3.7, 5.3, 4.1];

// ── Wishes data ───────────────────────────────────────────────────────────────
const WISHES = [
  { icon: '\uD83E\uDD32', title: 'Peace', text: 'May Allah fill your days with peace and your heart with serenity this Eid and always.' },
  { icon: '\uD83C\uDF19', title: 'Blessings', text: 'May every moment of this blessed day be showered with divine blessings and mercy.' },
  { icon: '\uD83D\uDCAB', title: 'Joy', text: 'May your celebrations be filled with laughter, love, and beautiful memories to cherish.' },
  { icon: '\uD83D\uDD4C', title: 'Gratitude', text: 'May we always be grateful for the blessings we have and share them with those around us.' },
  { icon: '\uD83C\uDF1F', title: 'Prosperity', text: 'May this Eid open new doors of success, health, and happiness for you and your family.' },
  { icon: '\u2764\uFE0F', title: 'Unity', text: 'May the spirit of Eid bring us closer together and strengthen the bonds of love.' },
];

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [theme, setTheme] = useState(THEMES.gold);
  const [celebrateKey, setCelebrateKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [activeLanterns, setActiveLanterns] = useState({});
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef(null);
  const fireworkRef = useRef(null);

  const [recipientName] = useState('');
  const [senderName] = useState('');

  // Apply CSS variables
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, val]) => {
      root.style.setProperty(`--${key}`, val);
    });
    root.style.setProperty('--font-display', "'Cinzel Decorative', serif");
    root.style.setProperty('--font-body', "'Cormorant Garamond', serif");
    root.style.setProperty('--font-arabic', "'Amiri', serif");
  }, [theme]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [introComplete]);

  // Click sparkle effect
  useEffect(() => {
    if (!introComplete) return;
    function sparkle(e) {
      for (let i = 0; i < 6; i++) {
        const spark = document.createElement('div');
        const angle = Math.random() * Math.PI * 2;
        const dist = 15 + Math.random() * 25;
        Object.assign(spark.style, {
          position: 'fixed', left: e.clientX + 'px', top: e.clientY + 'px',
          width: '4px', height: '4px', borderRadius: '50%',
          background: theme.primary, boxShadow: `0 0 6px ${theme.primary}`,
          pointerEvents: 'none', zIndex: '9998',
          transition: 'all .5s ease-out', opacity: '1',
        });
        document.body.appendChild(spark);
        requestAnimationFrame(() => {
          spark.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
          spark.style.opacity = '0';
        });
        setTimeout(() => spark.remove(), 600);
      }
    }
    document.addEventListener('click', sparkle);
    return () => document.removeEventListener('click', sparkle);
  }, [introComplete, theme.primary]);

  // Fireworks
  const launchFireworks = useCallback((count) => {
    const container = fireworkRef.current;
    if (!container) return;
    const colors = [theme.primary, '#e07b5d', '#5dba8e', '#fff', '#ba5d8e', '#5d8eba'];
    for (let f = 0; f < count; f++) {
      setTimeout(() => {
        const x = 15 + Math.random() * 70;
        const y = 10 + Math.random() * 40;
        for (let i = 0; i < 30; i++) {
          const spark = document.createElement('div');
          const angle = (Math.PI * 2 * i) / 30;
          const dist = 40 + Math.random() * 60;
          const dx = Math.cos(angle) * dist;
          const dy = Math.sin(angle) * dist;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const size = 2 + Math.random() * 3;
          Object.assign(spark.style, {
            position: 'absolute', left: x + '%', top: y + '%',
            width: size + 'px', height: size + 'px', borderRadius: '50%',
            background: color, boxShadow: `0 0 6px ${color}`,
            transition: `all ${0.6 + Math.random() * 0.6}s cubic-bezier(.25,.46,.45,.94)`,
            opacity: '1', pointerEvents: 'none',
          });
          container.appendChild(spark);
          requestAnimationFrame(() => {
            spark.style.transform = `translate(${dx}px, ${dy}px)`;
            spark.style.opacity = '0';
          });
          setTimeout(() => spark.remove(), 1500);
        }
      }, f * 400);
    }
  }, [theme.primary]);

  const handleCelebrate = useCallback(() => {
    setCelebrateKey((k) => k + 1);
    setShowConfetti(true);
    launchFireworks(5);
    setTimeout(() => setShowConfetti(false), 6000);
  }, [launchFireworks]);

  const handleCardFlip = useCallback(() => {
    setCardFlipped((f) => {
      if (!f) launchFireworks(3);
      return !f;
    });
  }, [launchFireworks]);

  const handleDownload = useCallback(() => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    html2canvas(cardRef.current, { backgroundColor: null, scale: 2, useCORS: true, logging: false })
      .then((canvas) => {
        const link = document.createElement('a');
        link.download = 'eid-mubarak-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      })
      .finally(() => setDownloading(false));
  }, [downloading]);

  const toggleLantern = useCallback((i) => {
    setActiveLanterns((prev) => ({ ...prev, [i]: !prev[i] }));
  }, []);

  if (!introComplete) {
    return <IntroAnimation theme={theme} onComplete={() => setIntroComplete(true)} />;
  }

  const heroTitle = recipientName ? `Eid Mubarak, ${recipientName}!` : 'Eid Mubarak';
  const signature = senderName ? `\u2014 With love, ${senderName}` : '\u2014 With love & warm wishes';

  return (
    <div className="app-root" role="application" aria-label="Eid Mubarak Interactive Card">
      {/* ── Fixed Background: 3D Scene ── */}
      <div className="canvas-layer" aria-hidden="true">
        <MosqueScene theme={theme} />
      </div>

      {/* ── Confetti Layer ── */}
      {showConfetti && <Confetti key={celebrateKey} theme={theme} />}

      {/* ── Firework Container ── */}
      <div className="firework-container" ref={fireworkRef} aria-hidden="true" />

      {/* ── Fixed Controls ── */}
      <div className="controls-bar" role="toolbar" aria-label="Card controls">
        <ThemeSwitcher themes={THEMES} current={theme} onChange={setTheme} />
      </div>

      {/* ── FAB Celebrate Button ── */}
      <button className="fab" onClick={handleCelebrate} title="Celebrate!">{'\uD83C\uDF86'}</button>

      {/* ════════════════════════════════════════════
           SCROLLABLE CONTENT
         ════════════════════════════════════════════ */}
      <main className="scroll-container">

        {/* ── Scene Gradient Overlay ── */}
        <div className="scene-overlay" aria-hidden="true" />

        {/* ═══ HERO SECTION ═══ */}
        <section className="hero" id="hero">
          <div className="stars" aria-hidden="true" />
          <div className="hero-bg-glow" aria-hidden="true" />
          <div className="crescent-moon">{'\u262A'}</div>
          <h1 className="arabic-greeting">{'\u0639\u064A\u062F \u0645\u0628\u0627\u0631\u0643'}</h1>
          <h2 className="hero-title-text">{heroTitle}</h2>
          <p className="hero-subtitle">
            May this blessed occasion bring peace to your heart,
            joy to your soul, and love to your life.
          </p>
          <div className="scroll-indicator">
            <span>Explore</span>
            <div className="scroll-arrow" />
          </div>
        </section>

        {/* ═══ LANTERNS SECTION ═══ */}
        <section className="lanterns-section" id="lanterns">
          <div className="section-divider reveal"><div className="line" /><span className="ornament">{'\u2726'}</span><div className="line" /></div>
          <h2 className="section-heading reveal">Lanterns of Blessings</h2>
          <p className="section-sub reveal">Tap each lantern to reveal a blessing</p>
          <div className="lanterns-row reveal">
            {BLESSINGS.map((blessing, i) => {
              const color = LANTERN_COLORS[i];
              const dur = LANTERN_DURATIONS[i];
              const isActive = activeLanterns[i];
              return (
                <div
                  key={i}
                  className={`lantern ${isActive ? 'active' : ''}`}
                  onClick={() => toggleLantern(i)}
                  style={{ '--glow-color': color + '80', '--swing-dur': dur + 's' }}
                >
                  <svg viewBox="0 0 80 160" xmlns="http://www.w3.org/2000/svg">
                    <line x1="40" y1="0" x2="40" y2="30" stroke={color} strokeWidth="1.5" opacity=".6"/>
                    <ellipse cx="40" cy="28" rx="4" ry="4" fill={color} opacity=".8"/>
                    <path d="M25 45 Q25 28 40 28 Q55 28 55 45" fill="none" stroke={color} strokeWidth="1.5"/>
                    <rect x="24" y="44" width="32" height="60" rx="3" fill={color} opacity=".15" stroke={color} strokeWidth="1.2"/>
                    <line x1="40" y1="48" x2="40" y2="100" stroke={color} strokeWidth=".5" opacity=".3"/>
                    <line x1="28" y1="65" x2="52" y2="65" stroke={color} strokeWidth=".5" opacity=".3"/>
                    <line x1="28" y1="85" x2="52" y2="85" stroke={color} strokeWidth=".5" opacity=".3"/>
                    <path d="M24 104 Q24 115 40 118 Q56 115 56 104" fill={color} opacity=".2" stroke={color} strokeWidth="1"/>
                    <ellipse cx="40" cy="122" rx="3" ry="5" fill={color} opacity=".3"/>
                    <ellipse cx="40" cy="75" rx="18" ry="30" fill={color} opacity=".06"/>
                  </svg>
                  <div
                    className={`lantern-blessing ${isActive ? 'visible' : ''}`}
                    aria-hidden={!isActive}
                    role="tooltip"
                  >
                    <span className="blessing-icon">{blessing.icon}</span>
                    <span className="blessing-arabic">{blessing.arabic}</span>
                    <span className="blessing-english">{blessing.english}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ FLIP CARD SECTION ═══ */}
        <section className="card-section" id="card">
          <div className="eid-card reveal" ref={cardRef}>
            <div className={`card-inner ${cardFlipped ? 'flipped' : ''}`} onClick={handleCardFlip}>
              <div className="card-face card-front">
                <div className="geometric-pattern" aria-hidden="true">
                  <svg width="100%" height="100%">
                    {Array.from({ length: 15 }).map((_, xi) =>
                      Array.from({ length: 18 }).map((_, yi) => (
                        <rect key={`${xi}-${yi}`} x={xi * 40} y={yi * 40} width="40" height="40"
                          fill="none" stroke={theme.primary} strokeWidth=".5"
                          transform={`rotate(45 ${xi * 40 + 20} ${yi * 40 + 20})`} />
                      ))
                    )}
                  </svg>
                </div>
                <div className="card-crescent">{'\u262A'}</div>
                <h2 className="card-arabic">{'\u0639\u064A\u062F \u0645\u0628\u0627\u0631\u0643'}</h2>
                <h3 className="card-title-en">Eid Mubarak</h3>
                <div className="card-rule" />
                <p className="card-hint">TAP TO OPEN YOUR CARD</p>
              </div>
              <div className="card-face card-back">
                <p className="card-message">
                  On this joyous day of <em>Eid</em>,<br />
                  may your heart be filled with <em>gratitude</em>,<br />
                  your home with <em>laughter</em>,<br />
                  and your life with <em>endless blessings</em>.<br /><br />
                  May every prayer you've made<br />
                  during the holy month<br />
                  be answered with grace.
                </p>
                <div className="card-signature">{signature}</div>
                <p className="card-tap-hint">tap to flip back</p>
              </div>
            </div>
          </div>
          <button className="download-btn" onClick={handleDownload} disabled={downloading}>
            {downloading ? '\u23F3 Generating...' : '\uD83D\uDCE5 Download Card'}
          </button>
        </section>

        {/* ═══ ORNATE FLIP CARD ═══ */}
        <section className="flip-card-section reveal" id="flip-card">
          <div className="section-divider"><div className="line" /><span className="ornament">{'\u2726'}</span><div className="line" /></div>
          <h2 className="section-heading">Your Eid Card</h2>
          <p className="section-sub">Tap the card to reveal a personal blessing</p>
          <FlipCard />
        </section>

        {/* ═══ MOSQUE SVG SECTION ═══ */}
        <section className="mosque-section" id="mosque">
          <div className="mosque-verse reveal">
            <blockquote>"And He found you lost and guided you."</blockquote>
            <cite>{'\u2014'} Quran 93:7</cite>
          </div>
          <svg className="mosque-svg" viewBox="0 0 900 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="450" cy="160" rx="120" ry="100" fill={theme.bg} stroke="rgba(212,168,83,.25)" strokeWidth="1" />
            <text x="445" y="85" fontSize="28" fill={theme.primary} textAnchor="middle">{'\u262A'}</text>
            <rect x="330" y="155" width="240" height="145" fill={theme.bg} stroke="rgba(212,168,83,.15)" strokeWidth="1" />
            <rect x="280" y="80" width="30" height="220" fill={theme.bg} stroke="rgba(212,168,83,.2)" strokeWidth="1" />
            <ellipse cx="295" cy="80" rx="15" ry="20" fill={theme.bg} stroke="rgba(212,168,83,.2)" strokeWidth="1" />
            <text x="295" y="68" fontSize="14" fill={theme.primary} textAnchor="middle">{'\u262A'}</text>
            <rect x="590" y="80" width="30" height="220" fill={theme.bg} stroke="rgba(212,168,83,.2)" strokeWidth="1" />
            <ellipse cx="605" cy="80" rx="15" ry="20" fill={theme.bg} stroke="rgba(212,168,83,.2)" strokeWidth="1" />
            <text x="605" y="68" fontSize="14" fill={theme.primary} textAnchor="middle">{'\u262A'}</text>
            <path d="M430 300 V220 Q450 190 470 220 V300" fill="none" stroke="rgba(212,168,83,.3)" strokeWidth="1.5" />
            <circle cx="390" cy="210" r="12" fill="none" stroke="rgba(212,168,83,.2)" strokeWidth="1" />
            <circle cx="510" cy="210" r="12" fill="none" stroke="rgba(212,168,83,.2)" strokeWidth="1" />
            <ellipse cx="370" cy="165" rx="35" ry="30" fill={theme.bg} stroke="rgba(212,168,83,.15)" strokeWidth="1" />
            <ellipse cx="530" cy="165" rx="35" ry="30" fill={theme.bg} stroke="rgba(212,168,83,.15)" strokeWidth="1" />
            <line x1="100" y1="300" x2="800" y2="300" stroke="rgba(212,168,83,.15)" strokeWidth="1" />
            <rect x="140" y="230" width="100" height="70" fill={theme.bg} stroke="rgba(212,168,83,.08)" strokeWidth="1" />
            <ellipse cx="190" cy="235" rx="40" ry="25" fill={theme.bg} stroke="rgba(212,168,83,.08)" strokeWidth="1" />
            <rect x="660" y="240" width="90" height="60" fill={theme.bg} stroke="rgba(212,168,83,.08)" strokeWidth="1" />
            <ellipse cx="705" cy="245" rx="35" ry="22" fill={theme.bg} stroke="rgba(212,168,83,.08)" strokeWidth="1" />
          </svg>
        </section>


        {/* ═══ DU'A SECTION ═══ */}
        <DuaSection />

        {/* ═══ TASBIH SECTION ═══ */}
        <TasbihCounter />

        {/* ═══ WISHES SECTION ═══ */}
        <section className="wishes-section" id="wishes">
          <div className="section-divider reveal"><div className="line" /><span className="ornament">{'\u2726'}</span><div className="line" /></div>
          <h2 className="section-heading reveal">Heartfelt Wishes</h2>
          <div className="wishes-grid">
            {WISHES.map((w, i) => (
              <div key={i} className="wish-card reveal">
                <span className="wish-icon">{w.icon}</span>
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="site-footer">
          <div className="footer-crescent">{'\u262A'}</div>
          <p className="footer-text">Eid Mubarak to you and your loved ones</p>
          <p className="footer-sub">Made with love and code &bull; 2026</p>
        </footer>
      </main>
    </div>
  );
}
