import React, { useEffect, useRef } from 'react';

const SHAPES = ['rect', 'circle', 'star', 'crescent'];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticle(canvas, theme) {
  const colors = [
    theme.primary,
    theme.secondary,
    theme.accent,
    '#ffffff',
    '#ffe066',
    '#a8f0c6',
  ];
  return {
    x: randomBetween(0, canvas.width),
    y: randomBetween(-canvas.height * 0.3, -20),
    vx: randomBetween(-2, 2),
    vy: randomBetween(2.5, 6),
    rotation: randomBetween(0, Math.PI * 2),
    rotSpeed: randomBetween(-0.08, 0.08),
    size: randomBetween(6, 16),
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    opacity: 1,
    gravity: randomBetween(0.05, 0.12),
    drift: randomBetween(-0.03, 0.03),
    wobble: randomBetween(0, Math.PI * 2),
    wobbleSpeed: randomBetween(0.03, 0.08),
  };
}

function drawStar(ctx, x, y, size) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 4) / 5 - Math.PI / 2;
    const innerAngle = angle + Math.PI / 5;
    if (i === 0) ctx.moveTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
    else ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
    ctx.lineTo(x + (size * 0.4) * Math.cos(innerAngle), y + (size * 0.4) * Math.sin(innerAngle));
  }
  ctx.closePath();
}

function drawCrescent(ctx, x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x + size * 0.4, y - size * 0.1, size * 0.75, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

export default function Confetti({ theme }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create initial burst
    for (let i = 0; i < 180; i++) {
      particlesRef.current.push(createParticle(canvas, theme));
    }

    // Secondary wave
    setTimeout(() => {
      for (let i = 0; i < 120; i++) {
        particlesRef.current.push(createParticle(canvas, theme));
      }
    }, 800);

    let startTime = performance.now();

    const animate = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = now - startTime;
      if (elapsed > 5500 && particlesRef.current.length === 0) {
        cancelAnimationFrame(animRef.current);
        return;
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        // Update
        p.wobble += p.wobbleSpeed;
        p.vx += p.drift + Math.sin(p.wobble) * 0.05;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Fade out near bottom
        if (p.y > canvas.height * 0.7) {
          p.opacity = Math.max(0, p.opacity - 0.025);
        }

        if (p.opacity <= 0 || p.y > canvas.height + 50) return false;

        // Draw
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'star') {
          drawStar(ctx, 0, 0, p.size / 2);
          ctx.fill();
        } else if (p.shape === 'crescent') {
          drawCrescent(ctx, 0, 0, p.size / 2);
        }

        ctx.restore();
        return true;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
      particlesRef.current = [];
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  );
}
