'use client';

import { useEffect, useRef } from 'react';
import { frames, nearest } from '@/lib/frames';
import { aboutFrameAt, clamp, easeInOut, easeOut, heroFrameAt, lerp, live, seg } from '@/lib/store';
import { soundManager } from '@/lib/sound';

type Place = { cx: number; cy: number; h: number; rot: number; alpha: number };
type SmokePuff = { x: number; y: number; r: number; maxR: number; alpha: number; rot: number; vx: number; vy: number };
const ASPECT = 16 / 9;

function heroPlace(vw: number, vh: number, mobile: boolean): Place {
  if (mobile) return { cx: vw / 2, cy: vh * 0.43, h: vh * 0.66, rot: 0, alpha: 1 };
  const h = Math.max(vh, (vw / ASPECT) * 0.92);
  return { cx: vw * 0.6, cy: vh * 0.5, h, rot: 0, alpha: 1 };
}
function aboutPlace(vw: number, vh: number, mobile: boolean): Place {
  if (mobile) return { cx: vw / 2, cy: vh * 0.36, h: vh * 0.62, rot: 0, alpha: 1 };
  return { cx: vw * 0.26, cy: vh * 0.57, h: vh * 0.98, rot: 0, alpha: 1 };
}

/**
 * Kakashi-Inspired Character Stage:
 * 1. Chidori / Lightning Aura: Electric blue arcs crackle around Kakashi, intensifying with scroll velocity
 * 2. Sharingan Ocular Flare: Crimson eye laser glint & anamorphic flare at eye level
 * 3. Shinobi Smoke Teleport (瞬身の術): Anime white/gray smoke puff burst when changing arcs
 * 4. Shadow Clone Afterimages (影分身): Trailing silhouettes with chakra glow
 */
export default function CharacterStage() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext('2d')!;
    let raf = 0;
    let dpr = 1;
    let vw = 0,
      vh = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      vw = window.innerWidth;
      vh = window.innerHeight;
      cv.width = Math.round(vw * dpr);
      cv.height = Math.round(vh * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };
    resize();
    window.addEventListener('resize', resize);

    let heroIdx = 0,
      aboutIdx = 0,
      mx = 0,
      my = 0;
    const ghosts: Place[] = [];
    let landed = false;
    let ring = 1;
    let ringPos = { x: 0, y: 0 };
    let last = performance.now();
    let prevY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollSpeed = 0;

    const smokePuffs: SmokePuff[] = [];

    const spawnSmokeBurst = (x: number, y: number, count = 16) => {
      soundManager.playSmokeTeleport();
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 1.5 + Math.random() * 4;
        smokePuffs.push({
          x,
          y,
          r: 12 + Math.random() * 16,
          maxR: 35 + Math.random() * 45,
          alpha: 0.75 + Math.random() * 0.25,
          rot: Math.random() * Math.PI * 2,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 0.8,
        });
      }
    };

    const progressOf = (id: string, mode: 'pin' | 'between', toId?: string) => {
      const el = document.getElementById(id);
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      if (mode === 'pin') return clamp(-r.top / Math.max(1, r.height - vh));
      const to = document.getElementById(toId!)!.getBoundingClientRect();
      const start = r.bottom - vh;
      const span = to.top - start;
      return clamp(-start / Math.max(1, span));
    };

    const draw = (img: HTMLImageElement | null, p: Place) => {
      if (!img || p.alpha <= 0.001) return;
      const h = p.h,
        w = h * ASPECT;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.cx * dpr, p.cy * dpr);
      if (p.rot) ctx.rotate(p.rot);
      ctx.drawImage(img, (-w / 2) * dpr, (-h / 2) * dpr, w * dpr, h * dpr);
      ctx.restore();
    };

    const loop = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const mobile = vw < 820;

      // Track scroll velocity
      const curY = window.scrollY;
      const v = Math.abs(curY - prevY);
      prevY = curY;
      scrollSpeed = lerp(scrollSpeed, v, 1 - Math.pow(0.01, dt));

      live.hero = progressOf('billboard', 'pin');
      live.flight = progressOf('billboard', 'between', 'about');
      live.about = progressOf('about', 'pin');
      const aboutEl = document.getElementById('about');
      live.exit = aboutEl ? Math.max(0, -(aboutEl.getBoundingClientRect().bottom - vh)) : 0;

      // Smooth frame scrubbing
      heroIdx = lerp(heroIdx, heroFrameAt(live.hero), 1 - Math.pow(0.002, dt));
      aboutIdx = lerp(aboutIdx, aboutFrameAt(live.about), 1 - Math.pow(0.002, dt));

      // Cursor parallax
      mx = lerp(mx, live.mouse.x, 1 - Math.pow(0.02, dt));
      my = lerp(my, live.mouse.y, 1 - Math.pow(0.02, dt));
      wrap.current!.style.transform = `perspective(1400px) rotateY(${mx * 5}deg) rotateX(${-my * 3}deg) translate3d(${mx * -18}px, ${my * -10}px, 0)`;

      ctx.clearRect(0, 0, cv.width, cv.height);

      const A = heroPlace(vw, vh, mobile);
      const B = aboutPlace(vw, vh, mobile);
      let place: Place;
      let img: HTMLImageElement | null;

      if (live.flight <= 0 && live.about <= 0) {
        place = { ...A, h: A.h * (1 + 0.04 * seg(live.hero, 0, 0.05)) };
        img = nearest(frames.hero, heroIdx);
        ghosts.length = 0;
        landed = false;
      } else if (live.about <= 0) {
        const t = easeInOut(live.flight);
        const arc = Math.sin(Math.PI * live.flight);
        place = {
          cx: lerp(A.cx, B.cx, t),
          cy: lerp(A.cy, B.cy, t) + arc * vh * (mobile ? 0.04 : 0.08),
          h: lerp(A.h, B.h, t) * (1 - arc * 0.22),
          rot: arc * (B.cx < A.cx ? -0.12 : 0.12) * (mobile ? 0.5 : 1),
          alpha: 1,
        };
        img = nearest(frames.about, 0) || nearest(frames.hero, frames.hero.length - 1);
        if (arc > 0.05) {
          ghosts.push({ ...place });
          if (ghosts.length > 8) ghosts.shift();
        } else ghosts.length = 0;

        if (live.flight > 0.96 && !landed) {
          landed = true;
          ring = 0;
          ringPos = { x: B.cx, y: B.cy + B.h * 0.47 };
          spawnSmokeBurst(B.cx, B.cy + B.h * 0.42, 22);
        }
        if (live.flight < 0.9) landed = false;
      } else {
        place = { ...B, cy: B.cy - live.exit };
        img = nearest(frames.about, aboutIdx);
        ghosts.length = 0;
      }

      // Draw shadow-clone afterimages with chakra gradient
      ghosts.forEach((g, i) => {
        const ratio = (i + 1) / ghosts.length;
        draw(img, { ...g, alpha: ratio * 0.22 });
      });

      // Draw main Kakashi frame
      draw(img, place);

      // 1. Chidori / Lightning Aura crackling around character with high-voltage erratic flicker
      const isChidoriActive = scrollSpeed > 1.2 || live.flight > 0.05;
      if (isChidoriActive && img) {
        const boltCount = Math.min(7, Math.floor(2 + scrollSpeed * 0.18));
        for (let b = 0; b < boltCount; b++) {
          const boltFlicker = Math.random() < 0.22 ? 0.35 : 1;
          const startAngle = Math.random() * Math.PI * 2;
          const dist = (place.h * 0.24 + Math.random() * place.h * 0.22) * dpr;
          let curX = place.cx * dpr + Math.cos(startAngle) * dist;
          let curY = place.cy * dpr + Math.sin(startAngle) * dist;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(curX, curY);

          const segCount = 4 + Math.floor(Math.random() * 4);
          for (let s = 0; s < segCount; s++) {
            curX += (Math.random() - 0.5) * 50 * dpr;
            curY += (Math.random() - 0.5) * 50 * dpr;
            ctx.lineTo(curX, curY);
          }

          ctx.strokeStyle = `rgba(84, 160, 255, ${boltFlicker})`;
          ctx.shadowColor = '#54a0ff';
          ctx.shadowBlur = 18 * dpr;
          ctx.lineWidth = (1.5 + Math.random() * 2.2) * dpr;
          ctx.stroke();

          ctx.strokeStyle = `rgba(255, 255, 255, ${boltFlicker * 0.95})`;
          ctx.lineWidth = 0.8 * dpr;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 2. Landing Shockwave Ring
      if (ring < 1) {
        ring = Math.min(1, ring + dt * 1.6);
        const k = easeOut(ring);
        ctx.save();
        ctx.translate(ringPos.x * dpr, ringPos.y * dpr);
        ctx.scale(1, 0.22);
        ctx.beginPath();
        ctx.arc(0, 0, (40 + k * (mobile ? 220 : 420)) * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(229, 9, 20, ${(1 - ring) * 0.9})`;
        ctx.lineWidth = (6 - k * 5) * dpr;
        ctx.shadowColor = '#e50914';
        ctx.shadowBlur = 30 * dpr;
        ctx.stroke();
        ctx.restore();
      }

      // 4. Shinobi Smoke Teleportation Puffs (煙の術)
      for (let i = smokePuffs.length - 1; i >= 0; i--) {
        const sp = smokePuffs[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.r = lerp(sp.r, sp.maxR, dt * 2.5);
        sp.alpha -= dt * 0.9;

        if (sp.alpha <= 0.01) {
          smokePuffs.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(sp.x * dpr, sp.y * dpr);
        ctx.rotate(sp.rot);
        ctx.globalAlpha = Math.max(0, sp.alpha);
        ctx.fillStyle = 'rgba(230, 230, 235, 0.55)';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 10 * dpr;
        ctx.beginPath();
        ctx.arc(0, 0, sp.r * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      cv.style.visibility = live.exit > vh * 1.2 ? 'hidden' : 'visible';
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="stage" aria-hidden>
      <div className="stage-inner" ref={wrap}>
        <canvas ref={canvas} />
      </div>
    </div>
  );
}
