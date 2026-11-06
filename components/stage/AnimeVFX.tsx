'use client';

import { useEffect, useRef } from 'react';
import { soundManager } from '@/lib/sound';

type Leaf = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  rotSpeed: number;
  flip: number;
  flipSpeed: number;
  alpha: number;
};

type ChakraParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  char: string;
  isKanji: boolean;
  isChidoriBlue: boolean;
  life: number;
};

const KANJI_RUNES = ['忍', '雷', '術', '写', '風', '火', '土', '水', '千', '鳥', '命', '神'];

/**
 * Kakashi-Themed Cinematic Anime Visual Effects Engine:
 * - Dynamic Anime Speed Lines (集中線 - Shūchūsen) during high-speed scroll
 * - Chidori Blue Electric Particle swarm & glowing crimson chakra embers
 * - Falling Konoha Leaves with 3D tumble physics
 * - Sudden Chidori Lightning Strike screen flashes
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

    // Falling Konoha Leaves
    const leaves: Leaf[] = [];
    const leafCount = 18;
    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        vx: 0.4 + Math.random() * 0.8,
        vy: 0.6 + Math.random() * 1.1,
        size: 14 + Math.random() * 10,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 1.2 + Math.random() * 2,
        alpha: 0.35 + Math.random() * 0.4,
      });
    }

    // Chakra & Chidori Particles
    const particles: ChakraParticle[] = [];
    const particleCount = 42;
    for (let i = 0; i < particleCount; i++) {
      const isKanji = Math.random() < 0.25;
      const isChidoriBlue = Math.random() < 0.45;
      particles.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -0.4 - Math.random() * 1.2,
        size: isKanji ? 14 + Math.random() * 10 : 2 + Math.random() * 3.5,
        alpha: 0.2 + Math.random() * 0.4,
        char: KANJI_RUNES[Math.floor(Math.random() * KANJI_RUNES.length)],
        isKanji,
        isChidoriBlue,
        life: Math.random() * 100,
      });
    }

    // Lightning Flash Trigger
    let lightningTimer = 0;
    type LightningPoint = { x: number; y: number };
    let bolt: LightningPoint[] | null = null;
    let boltAlpha = 0;

    const generateLightning = () => {
      const startX = Math.random() * vw;
      const startY = Math.random() * (vh * 0.35);
      const pts: LightningPoint[] = [{ x: startX, y: startY }];
      let cx = startX;
      let cy = startY;
      const segs = 7 + Math.floor(Math.random() * 6);
      for (let i = 0; i < segs; i++) {
        cx += (Math.random() - 0.5) * 85;
        cy += 25 + Math.random() * 55;
        pts.push({ x: cx, y: cy });
      }
      return pts;
    };

    let raf = 0;
    let lastTime = performance.now();
    let prevScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollSpeed = 0;

    const loop = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      // Track scroll velocity
      const curY = window.scrollY;
      const v = Math.abs(curY - prevScrollY);
      prevScrollY = curY;
      scrollSpeed += (v - scrollSpeed) * 0.12;

      ctx.clearRect(0, 0, vw, vh);

      // 1. Anime Speed Lines (集中線 - Shūchūsen) on high-speed scroll
      if (scrollSpeed > 8) {
        const lineCount = Math.min(28, Math.floor(scrollSpeed * 0.8));
        const centerX = vw * 0.5;
        const centerY = vh * 0.5;
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.35, scrollSpeed * 0.015)})`;
        ctx.lineWidth = 1.2;

        for (let i = 0; i < lineCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const innerDist = Math.min(vw, vh) * 0.32 + Math.random() * 80;
          const outerDist = Math.max(vw, vh) * 0.8;

          const x1 = centerX + Math.cos(angle) * innerDist;
          const y1 = centerY + Math.sin(angle) * innerDist;
          const x2 = centerX + Math.cos(angle) * outerDist;
          const y2 = centerY + Math.sin(angle) * outerDist;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Chidori Lightning Discharge with Strobe Flicker
      lightningTimer += dt;
      if (lightningTimer > 4.2 && Math.random() < 0.06) {
        bolt = generateLightning();
        boltAlpha = 0.8;
        lightningTimer = 0;
      }

      if (bolt && boltAlpha > 0.01) {
        const lightningFlicker = Math.random() < 0.25 ? 0.35 : 1;
        const currentAlpha = boltAlpha * lightningFlicker;

        ctx.save();
        ctx.strokeStyle = `rgba(84, 160, 255, ${currentAlpha})`;
        ctx.shadowColor = '#54a0ff';
        ctx.shadowBlur = 24;
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.moveTo(bolt[0].x, bolt[0].y);
        for (let i = 1; i < bolt.length; i++) {
          ctx.lineTo(bolt[i].x, bolt[i].y);
        }
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // Screen ambient lightning strobe flash
        if (boltAlpha > 0.35 && Math.random() < 0.45) {
          ctx.save();
          ctx.fillStyle = `rgba(84, 160, 255, ${boltAlpha * 0.08})`;
          ctx.fillRect(0, 0, vw, vh);
          ctx.restore();
        }

        boltAlpha -= dt * 2.6;
      }

      // 3. Falling Konoha Leaves (木ノ葉)
      for (const lf of leaves) {
        lf.y += lf.vy + scrollSpeed * 0.1;
        lf.x += lf.vx + Math.sin(lf.y * 0.015) * 0.8;
        lf.rot += lf.rotSpeed * dt;
        lf.flip += lf.flipSpeed * dt;

        if (lf.y > vh + 30) {
          lf.y = -30;
          lf.x = Math.random() * vw;
        }
        if (lf.x > vw + 30) lf.x = -30;

        ctx.save();
        ctx.translate(lf.x, lf.y);
        ctx.rotate(lf.rot);
        ctx.scale(1, Math.cos(lf.flip));
        ctx.globalAlpha = lf.alpha;

        ctx.fillStyle = '#b20710';
        ctx.shadowColor = '#e50914';
        ctx.shadowBlur = 7;
        ctx.beginPath();
        ctx.moveTo(0, -lf.size * 0.6);
        ctx.quadraticCurveTo(lf.size * 0.45, 0, 0, lf.size * 0.6);
        ctx.quadraticCurveTo(-lf.size * 0.45, 0, 0, -lf.size * 0.6);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -lf.size * 0.5);
        ctx.lineTo(0, lf.size * 0.5);
        ctx.stroke();

        ctx.restore();
      }

      // 4. Chakra & Chidori Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy - scrollSpeed * 0.08;
        p.life += dt;

        if (p.y < -20) {
          p.y = vh + 20;
          p.x = Math.random() * vw;
        }
        if (p.x < 0) p.x = vw;
        if (p.x > vw) p.x = 0;

        ctx.save();
        const pulse = 0.8 + Math.sin(p.life * 2.5) * 0.2;
        ctx.globalAlpha = p.alpha * pulse;

        if (p.isKanji) {
          ctx.font = `${p.size}px serif`;
          ctx.fillStyle = p.isChidoriBlue ? '#54a0ff' : '#e50914';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 9;
          ctx.fillText(p.char, p.x, p.y);
        } else {
          ctx.fillStyle = p.isChidoriBlue ? '#54a0ff' : '#e50914';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 8;
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
