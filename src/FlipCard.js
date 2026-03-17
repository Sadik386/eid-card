import React, { useState, useCallback } from 'react';

export default function FlipCard() {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  }, []);

  return (
    <div className="flip-card-wrapper">
      <div className="ornament ornament-tl" aria-hidden="true">✦</div>
      <div className="ornament ornament-tr" aria-hidden="true">✦</div>
      <div className="ornament ornament-bl" aria-hidden="true">✦</div>
      <div className="ornament ornament-br" aria-hidden="true">✦</div>

      <div
        id="flip-card-el"
        className={`flip-card${flipped ? ' flipped' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={
          flipped
            ? 'Card back: Eid greeting. Click to flip back.'
            : 'Card front: Eid Mubarak. Click to flip.'
        }
        aria-pressed={flipped}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
      >
        {/* ── FRONT FACE ── */}
        <div className="flip-face flip-front">
          <svg
            className="geometric-svg"
            aria-hidden="true"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.22 }}
          >
            <defs>
              <pattern
                id="geo-front"
                x="0" y="0"
                width="60" height="60"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="30,4 35,20 50,20 38,30 42,46 30,36 18,46 22,30 10,20 25,20"
                  fill="none" stroke="#d4af37" strokeWidth="0.8"
                />
                <polygon
                  points="30,14 36,22 30,30 24,22"
                  fill="none" stroke="#d4af37" strokeWidth="0.6"
                />
                <path d="M0,0 Q15,15 30,0" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                <path d="M60,0 Q45,15 30,0" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                <path d="M0,60 Q15,45 30,60" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                <path d="M60,60 Q45,45 30,60" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                <line x1="0" y1="30" x2="10" y2="30" stroke="#d4af37" strokeWidth="0.5" />
                <line x1="50" y1="30" x2="60" y2="30" stroke="#d4af37" strokeWidth="0.5" />
                <line x1="30" y1="0" x2="30" y2="14" stroke="#d4af37" strokeWidth="0.5" />
                <line x1="30" y1="46" x2="30" y2="60" stroke="#d4af37" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="120" height="120" fill="url(#geo-front)" />
          </svg>

          <div className="card-face-border top" />
          <div className="card-face-border bottom" />
          <div className="card-face-border left" />
          <div className="card-face-border right" />

          <div className="flip-front-content">
            <div className="flip-arabic" aria-label="Eid Mubarak in Arabic">عيد مبارك</div>
            <div className="flip-crescent" aria-hidden="true">☽</div>
            <h2 className="flip-title-eid">Eid Mubarak</h2>
            <div className="flip-divider" aria-hidden="true">
              <span></span>✦<span></span>
            </div>
            <p className="flip-year">1447 AH · 2025 CE</p>
            <div className="flip-stars" aria-hidden="true">
              <span style={{ animationDelay: '0s' }}>✦</span>
              <span style={{ animationDelay: '0.2s' }}>✦</span>
              <span style={{ animationDelay: '0.4s' }}>✦</span>
              <span style={{ animationDelay: '0.6s' }}>✦</span>
              <span style={{ animationDelay: '0.8s' }}>✦</span>
            </div>
          </div>

          <div className="flip-hint" aria-hidden="true">tap to reveal ↻</div>
        </div>

        {/* ── BACK FACE ── */}
        <div className="flip-face flip-back">
          <svg
            className="geometric-svg"
            aria-hidden="true"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.15 }}
          >
            <defs>
              <pattern
                id="geo-back"
                x="0" y="0"
                width="60" height="60"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="30,4 35,20 50,20 38,30 42,46 30,36 18,46 22,30 10,20 25,20"
                  fill="none" stroke="#d4af37" strokeWidth="0.8"
                />
                <polygon
                  points="30,14 36,22 30,30 24,22"
                  fill="none" stroke="#d4af37" strokeWidth="0.6"
                />
                <path d="M0,0 Q15,15 30,0" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                <path d="M60,0 Q45,15 30,0" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                <path d="M0,60 Q15,45 30,60" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                <path d="M60,60 Q45,45 30,60" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                <line x1="0" y1="30" x2="10" y2="30" stroke="#d4af37" strokeWidth="0.5" />
                <line x1="50" y1="30" x2="60" y2="30" stroke="#d4af37" strokeWidth="0.5" />
                <line x1="30" y1="0" x2="30" y2="14" stroke="#d4af37" strokeWidth="0.5" />
                <line x1="30" y1="46" x2="30" y2="60" stroke="#d4af37" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="120" height="120" fill="url(#geo-back)" />
          </svg>

          <div className="card-face-border top" />
          <div className="card-face-border bottom" />
          <div className="card-face-border left" />
          <div className="card-face-border right" />

          <div className="flip-back-content">
            <div className="flip-back-icon" aria-hidden="true">🌙</div>
            <p className="flip-back-greeting">
              Wishing you joy, peace &amp; blessings this Eid
            </p>
            <div className="flip-back-dua">
              <span className="flip-back-arabic">تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ</span>
              <span className="flip-back-trans">
                "May Allah accept from us and from you"
              </span>
            </div>
          </div>

          <div className="flip-hint" aria-hidden="true">↻ flip back</div>
        </div>
      </div>

      <p className="flip-instruction" aria-live="polite">
        {flipped ? 'Click card to flip back' : 'Click card to reveal your message'}
      </p>
    </div>
  );
}
