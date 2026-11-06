'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  life: number;
  char: string;
  isKanji: boolean;
};

const KANJI_RUNES = ['忍', '雷', '術', '写', '風', '火', '土', '水', '千', '鳥'];

/**
 * Background Anime Visual Effects:
 * - Floating fiery chakra embers and rising Shinobi kanji runes
 * - Periodic lightning crackle streaks (Chidori electrical discharge)
 */
export default function AnimeVFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    const particles: Particle[] = [];
    const count = 38;

    for (let i = 0; i < count; i++) {
      const isKanji = Math.random() < 0.28;
      particles.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.7,
        size: isKanji ? 14 + Math.random() * 8 : 1.5 + Math.random() * 3,
        alpha: 0.1 + Math.random() * 0.35,
        baseAlpha: 0.1 + Math.random() * 0.35,
        life: Math.random() * 100,
        char: KANJI_RUNES[Math.floor(Math.random() * KANJI_RUNES.length)],
        isKanji,
      });
    }

    // Lightning arcs
    let lightningTimer = 0;
    type LightningPoint = { x: number; y: number };
    let lightningBolt: LightningPoint[] | null = null;
    let boltAlpha = 0;

    const generateLightning = () => {
      const startX = Math.random() * vw;
      const startY = Math.random() * (vh * 0.4);
      const points: LightningPoint[] = [{ x: startX, y: startY }];
      let cx = startX;
      let cy = startY;

      const segments = 6 + Math.floor(Math.random() * 6);
      for (let i = 0; i < segments; i++) {
        cx += (Math.random() - 0.5) * 60;
        cy += 20 + Math.random() * 45;
        points.push({ x: cx, y: cy });
      }
      return points;
    };

    let raf = 0;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      ctx.clearRect(0, 0, vw, vh);

      // Trigger occasional faint lightning crackle
      lightningTimer += dt;
      if (lightningTimer > 4.5 && Math.random() < 0.04) {
        lightningBolt = generateLightning();
        boltAlpha = 0.55;
        lightningTimer = 0;
      }

      // Draw lightning bolt
      if (lightningBolt && boltAlpha > 0.01) {
        ctx.save();
        ctx.strokeStyle = `rgba(84, 160, 255, ${boltAlpha})`;
        ctx.shadowColor = '#54a0ff';
        ctx.shadowBlur = 12;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(lightningBolt[0].x, lightningBolt[0].y);
        for (let i = 1; i < lightningBolt.length; i++) {
          ctx.lineTo(lightningBolt[i].x, lightningBolt[i].y);
        }
        ctx.stroke();

        // Secondary glow line
        ctx.strokeStyle = `rgba(255, 255, 255, ${boltAlpha * 0.9})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();

        boltAlpha -= dt * 2.5; // Quick flash decay
      }

      // Draw floating chakra embers & kanji runes
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += dt;

        // Wrap around top
        if (p.y < -20) {
          p.y = vh + 20;
          p.x = Math.random() * vw;
        }
        if (p.x < 0) p.x = vw;
        if (p.x > vw) p.x = 0;

        ctx.save();
        const pulse = 0.8 + Math.sin(p.life * 2) * 0.2;
        ctx.globalAlpha = p.alpha * pulse;

        if (p.isKanji) {
          ctx.font = `${p.size}px serif`;
          ctx.fillStyle = '#e50914';
          ctx.shadowColor = '#e50914';
          ctx.shadowBlur = 8;
          ctx.fillText(p.char, p.x, p.y);
        } else {
          ctx.fillStyle = Math.random() < 0.2 ? '#54a0ff' : '#e50914';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="anime-vfx-canvas" aria-hidden />;
}

