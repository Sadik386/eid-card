import React, { useRef } from 'react';
import { gsap } from 'gsap';

export default function ThemeSwitcher({ themes, current, onChange }) {
  const swatchRefs = useRef({});

  const handleChange = (theme) => {
    if (theme.id === current.id) return;
    const el = swatchRefs.current[theme.id];
    if (el) {
      gsap.fromTo(
        el,
        { scale: 0.7, rotate: -15 },
        { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(2)' }
      );
    }
    onChange(theme);
  };

  return (
    <div
      className="theme-switcher"
      role="radiogroup"
      aria-label="Select card theme"
    >
      <span className="controls-label">Theme</span>
      {Object.values(themes).map((theme) => (
        <button
          key={theme.id}
          ref={(el) => (swatchRefs.current[theme.id] = el)}
          className={`theme-swatch ${theme.id === current.id ? 'active' : ''}`}
          onClick={() => handleChange(theme)}
          aria-label={`${theme.label} theme`}
          aria-pressed={theme.id === current.id}
          title={theme.label}
          style={{
            '--swatch-color': theme.primary,
            '--swatch-bg': theme.bg,
          }}
        >
          <span
            className="swatch-dot"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${theme.secondary}, ${theme.primary} 60%, ${theme.accent})`,
            }}
          />
        </button>
      ))}
    </div>
  );
}
