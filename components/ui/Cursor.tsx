'use client';

import { useEffect, useRef } from 'react';

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
 * - Kakashi's Mangekyō Sharingan eye that rotates and expands on hover
 * - Trailing Chidori lightning sparks and chakra embers as you slice across the screen
 * - Click trigger that creates a burst of Chidori needles (千鳥千本)
 */
export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
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

      // Emit lightning sparks on cursor movement
      if (Math.random() < 0.65) {
        const isLightning = Math.random() < 0.35;
        sparks.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 1,
          maxLife: 0.25 + Math.random() * 0.3,
          size: isLightning ? 1.5 + Math.random() * 2 : 2 + Math.random() * 2.5,
          color: isLightning ? '#54a0ff' : '#e50914',
        });
      }
    };

    const down = (e: PointerEvent) => {
      clicking = true;
      // Burst of Chidori needles
      for (let i = 0; i < 14; i++) {
        const ang = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.4;
        const spd = 2 + Math.random() * 4.5;
        const isBlue = i % 2 === 0;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          life: 1,
          maxLife: 0.4 + Math.random() * 0.35,
          size: 2 + Math.random() * 2,
          color: isBlue ? '#54a0ff' : '#e50914',
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

      // Update Sharingan rotation
      if (hot) {
        spinAngle += 480 * dt; // Rapid Kamui spin on interactive hover
      } else {
        spinAngle += 45 * dt; // Gentle ambient rotation
      }

      if (eyeRef.current) {
        const scale = hot ? 1.4 : clicking ? 0.85 : 1;
        eyeRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      }

      if (ringRef.current) {
        const ringScale = hot ? 1.6 : clicking ? 0.9 : 1;
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
        ctx.shadowBlur = 8;
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

      {/* Kakashi Mangekyō Sharingan Eye as Cursor Center */}
      <div className="cur-sharingan-eye" ref={eyeRef} aria-hidden>
        <svg viewBox="0 0 36 36" className="sharingan-svg">
          {/* Outer Iris */}
          <circle cx="18" cy="18" r="16" fill="#b20710" stroke="#831010" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="14.5" fill="#e50914" />
          
          {/* Inner Chakra Ring */}
          <circle cx="18" cy="18" r="10" fill="none" stroke="#220002" strokeWidth="0.8" opacity="0.6" />

          {/* Kakashi's Iconic 3 Pinwheel Mangekyō Blades */}
          <g className="sharingan-blades">
            <path
              d="M18,18 C15.5,10 9,7 18,2 C19.5,8 21.5,11.5 18,18 Z"
              fill="#080808"
            />
            <path
              d="M18,18 C15.5,10 9,7 18,2 C19.5,8 21.5,11.5 18,18 Z"
              fill="#080808"
              transform="rotate(120 18 18)"
            />
            <path
              d="M18,18 C15.5,10 9,7 18,2 C19.5,8 21.5,11.5 18,18 Z"
              fill="#080808"
              transform="rotate(240 18 18)"
            />
          </g>

          {/* Center Pupil */}
          <circle cx="18" cy="18" r="3.2" fill="#000" />
          <circle cx="16.5" cy="16.5" r="1" fill="#ffffff" opacity="0.75" />
        </svg>
      </div>
    </>
  );
}
