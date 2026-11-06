'use client';

import { useEffect, useRef } from 'react';
import { soundManager } from '@/lib/sound';

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
};

/**
 * Anime-Themed Cursor:
 * - 4-Blade Ninja Shuriken (手裏剣) with sharp metallic facets and center hole
 * - Velocity-reactive spin: whirling faster as you move or hover on interactive elements
 * - Trailing steel sparks, Chidori lightning arcs, and chakra embers
 * - Click trigger that creates a burst of Chidori needles (千鳥千本) and metallic slash
 */
export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shurikenRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.documentElement.classList.add('has-cursor');

    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    const resize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      cv.width = vw;
      cv.height = vh;
    };
    resize();
    window.addEventListener('resize', resize);

    let x = vw / 2;
    let y = vh / 2;
    let prevX = x;
    let prevY = y;
    let rx = x;
    let ry = y;
    let raf = 0;
    let hot = false;
    let clicking = false;
    let spinAngle = 0;

    const sparks: Spark[] = [];
    const trailHistory: { x: number; y: number }[] = [];

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      hot = !!t.closest('a, button, [data-hot], .jutsu-tab-btn, .creed-card, .ms-inner');

      // Add trail point
      trailHistory.push({ x, y });
      if (trailHistory.length > 8) trailHistory.shift();

      // Emit metallic Shuriken sparks on cursor movement
      if (Math.random() < 0.7) {
        const isBlue = Math.random() < 0.4;
        const isSteel = Math.random() < 0.45;
        sparks.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 3.5,
          vy: (Math.random() - 0.5) * 3.5,
          life: 1,
          maxLife: 0.25 + Math.random() * 0.3,
          size: isSteel ? 1.5 + Math.random() * 2 : 2 + Math.random() * 2.5,
          color: isSteel ? '#ffffff' : isBlue ? '#54a0ff' : '#e50914',
        });
      }
    };

    const down = (e: PointerEvent) => {
      clicking = true;
      soundManager.playKunaiSlash();
      // Burst of Shuriken needle sparks
      for (let i = 0; i < 16; i++) {
        const ang = (Math.PI * 2 * i) / 16 + (Math.random() - 0.5) * 0.35;
        const spd = 2.5 + Math.random() * 5;
        const colType = i % 3;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          life: 1,
          maxLife: 0.4 + Math.random() * 0.35,
          size: 2 + Math.random() * 2.5,
          color: colType === 0 ? '#ffffff' : colType === 1 ? '#54a0ff' : '#e50914',
        });
      }
    };

    const up = () => {
      clicking = false;
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);

    let lastTime = performance.now();

    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - lastTime) / 1000);
      lastTime = t;

      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;

      // Velocity-reactive Shuriken rotation
      const dx = x - prevX;
      const dy = y - prevY;
      const mouseSpeed = Math.sqrt(dx * dx + dy * dy);
      prevX = x;
      prevY = y;

      if (hot) {
        spinAngle += 920 * dt; // High-speed whirlwind spin on interactive hover
      } else {
        spinAngle += (140 + mouseSpeed * 3.2) * dt; // Dynamic spin proportional to mouse velocity
      }

      if (shurikenRef.current) {
        const scale = hot ? 1.35 : clicking ? 0.8 : 1;
        shurikenRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${spinAngle}deg)`;
        shurikenRef.current.classList.toggle('hot', hot);
      }

      if (ringRef.current) {
        const ringScale = hot ? 1.5 : clicking ? 0.9 : 1;
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${ringScale})`;
        ringRef.current.classList.toggle('hot', hot);
      }

      // Draw canvas trail and sparks
      ctx.clearRect(0, 0, vw, vh);

      // Draw lightning trail connecting recent cursor coordinates
      if (trailHistory.length > 2) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(trailHistory[0].x, trailHistory[0].y);
        for (let i = 1; i < trailHistory.length; i++) {
          const xc = (trailHistory[i].x + trailHistory[i - 1].x) / 2;
          const yc = (trailHistory[i].y + trailHistory[i - 1].y) / 2;
          ctx.quadraticCurveTo(trailHistory[i - 1].x, trailHistory[i - 1].y, xc, yc);
        }
        ctx.strokeStyle = hot ? 'rgba(84, 160, 255, 0.45)' : 'rgba(229, 9, 20, 0.35)';
        ctx.lineWidth = hot ? 2.5 : 1.5;
        ctx.shadowColor = hot ? '#54a0ff' : '#e50914';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life -= dt / s.maxLife;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" aria-hidden />
      <div className="cur-ring" ref={ringRef} aria-hidden />

      {/* 4-Blade Ninja Shuriken (手裏剣) Cursor */}
      <div className="cur-shuriken" ref={shurikenRef} aria-hidden>
        <svg viewBox="0 0 48 48" className="shuriken-svg">
          {/* Outer Razor Cutting Edge Outline */}
          <path
            d="M24,2 L29,19 L46,24 L29,29 L24,46 L19,29 L2,24 L19,19 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.8"
            opacity="0.9"
          />

          {/* Facets: 4 Light Beveled Metallic Facets */}
          <path d="M24,24 L19,19 L24,2 Z" fill="#ecf0f1" />
          <path d="M24,24 L29,19 L46,24 Z" fill="#d2d7d9" />
          <path d="M24,24 L29,29 L24,46 Z" fill="#ecf0f1" />
          <path d="M24,24 L19,29 L2,24 Z" fill="#d2d7d9" />

          {/* Facets: 4 Dark Beveled Metallic Facets */}
          <path d="M24,24 L24,2 L29,19 Z" fill="#7f8c8d" />
          <path d="M24,24 L46,24 L29,29 Z" fill="#576574" />
          <path d="M24,24 L24,46 L19,29 Z" fill="#7f8c8d" />
          <path d="M24,24 L2,24 L19,19 Z" fill="#576574" />

          {/* Center Hub Steel Plate */}
          <circle cx="24" cy="24" r="6" fill="#1e272e" stroke="#8395a7" strokeWidth="1" />

          {/* Inner Chakra Ring (Red Inlay) */}
          <circle cx="24" cy="24" r="4.8" fill="none" stroke="#e50914" strokeWidth="0.8" opacity="0.85" />

          {/* Central Ninja Finger Hole */}
          <circle cx="24" cy="24" r="3" fill="#050505" />
        </svg>
      </div>
    </>
  );
}
