import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function IntroAnimation({ theme, onComplete }) {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const crescentRef = useRef(null);
  const starsRef = useRef(null);
  const arabicRef = useRef(null);
  const eidRef = useRef(null);
  const mubarakRef = useRef(null);
  const dividerRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    // Phase 1: Deep space fade in
    tl.fromTo(
      bgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.8, ease: 'power1.in' }
    );

    // Phase 2: Stars appear
    tl.fromTo(
      starsRef.current?.querySelectorAll('.intro-star') || [],
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: { each: 0.04, from: 'random' },
        ease: 'back.out(2)',
      },
      '-=0.8'
    );

    // Phase 3: Crescent moon rises
    tl.fromTo(
      crescentRef.current,
      { y: 80, opacity: 0, scale: 0.6, rotation: -20 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.6,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    // Phase 4: Glow pulse
    tl.fromTo(
      glowRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=1.2'
    );

    // Phase 5: Arabic title
    tl.fromTo(
      arabicRef.current,
      { opacity: 0, y: -20, letterSpacing: '0.5em' },
      { opacity: 1, y: 0, letterSpacing: '0.15em', duration: 1, ease: 'power2.out' },
      '-=0.3'
    );

    // Phase 6: "Eid" explodes in
    tl.fromTo(
      eidRef.current,
      { opacity: 0, scale: 3, y: -60 },
      { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'expo.out' },
      '+=0.1'
    );

    // Phase 7: "Mubarak" rises
    tl.fromTo(
      mubarakRef.current,
      { opacity: 0, y: 50, letterSpacing: '0.6em' },
      { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 1.2, ease: 'power3.out' },
      '-=0.6'
    );

    // Phase 8: Divider & subtitle
    tl.fromTo(
      dividerRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );

    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );

    // Phase 9: Enter button
    tl.fromTo(
      btnRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.2'
    );

    // Ambient crescent float
    gsap.to(crescentRef.current, {
      y: -12,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 3,
    });

    // Glow breathe
    gsap.to(glowRef.current, {
      scale: 1.15,
      opacity: 0.7,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 3,
    });

    return () => { tl.kill(); gsap.killTweensOf('*'); };
  }, [onComplete]);

  // Generate star positions once
  const stars = React.useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 75}%`,
      size: `${1 + Math.random() * 2.5}px`,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div
      ref={containerRef}
      className="intro-container"
      role="presentation"
      aria-hidden="false"
      aria-label="Eid Mubarak intro animation"
      style={{ '--primary': theme.primary, '--bg': theme.bg }}
    >
      {/* Background */}
      <div ref={bgRef} className="intro-bg" style={{ opacity: 0 }} />

      {/* Stars */}
      <div ref={starsRef} className="intro-stars" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="intro-star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Glow orb */}
      <div ref={glowRef} className="intro-glow" aria-hidden="true" style={{ opacity: 0 }} />

      {/* Crescent Moon (CSS-drawn) */}
      <div ref={crescentRef} className="intro-crescent" aria-hidden="true" style={{ opacity: 0 }}>
        <div className="crescent-inner" />
      </div>

      {/* Card content */}
      <div className="intro-card">
        <div ref={arabicRef} className="intro-arabic" style={{ opacity: 0 }}>عيد مبارك</div>

        <h1 className="intro-title">
          <span ref={eidRef} className="intro-eid" style={{ opacity: 0 }}>Eid</span>
          <span ref={mubarakRef} className="intro-mubarak" style={{ opacity: 0 }}>Mubarak</span>
        </h1>

        <div ref={dividerRef} className="intro-divider" aria-hidden="true" style={{ opacity: 0 }}>
          <span className="divider-line" />
          <span>✦ ☽ ✦</span>
          <span className="divider-line" />
        </div>

        <p ref={subRef} className="intro-sub" style={{ opacity: 0 }}>
          A celebration of gratitude, peace &amp; togetherness
        </p>

        <button
          ref={btnRef}
          className="intro-enter-btn"
          onClick={onComplete}
          aria-label="Enter the Eid card"
          style={{ opacity: 0 }}
        >
          Enter the Celebration
          <span className="btn-arrow" aria-hidden="true"> →</span>
        </button>
      </div>
    </div>
  );
}
