'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { onFrameProgress } from '@/lib/frames';
import { PROFILE } from '@/lib/data';
import { soundManager } from '@/lib/sound';

const EASE = [0.76, 0, 0.24, 1] as const;

const HAND_SEAL_STEPS = [
  { kanji: '寅', name: 'TIGER', threshold: 20, color: '#ff9f43' },
  { kanji: '巳', name: 'SNAKE', threshold: 40, color: '#10ac84' },
  { kanji: '辰', name: 'DRAGON', threshold: 60, color: '#54a0ff' },
  { kanji: '申', name: 'MONKEY', threshold: 80, color: '#ee5253' },
  { kanji: '忍', name: 'SHINOBI', threshold: 100, color: '#e50914' },
];

/**
 * ⚡ Glitch Shinobi Summoning / Chakra Synchronization Loading Phase:
 * - Plays the authentic `intro.mpeg` glitch audio theme
 * - CRT Cyber Scanlines & Chromatic Aberration RGB Glitch Text
 * - Dynamic Glitch Slices & Voltage Jitter synced to audio
 * - Spinning Fūma Shuriken with concentric chakra seals
 * - Ninjutsu Hand Seals unlocking in real-time as frames load (寅 → 巳 → 辰 → 申 → 忍)
 * - Katana blade slash screen cut on finish with smooth audio transition
 */
export default function Intro({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  const [open, setOpen] = useState(false);
  const [slashed, setSlashed] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const done = useRef(false);

  // Play intro audio on mount
  useEffect(() => {
    soundManager.playIntro();

    // Glitch jitter interval
    const glitchInterval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 140 + Math.random() * 120);
    }, 900 + Math.random() * 800);

    return () => {
      clearInterval(glitchInterval);
    };
  }, []);

  useEffect(() => onFrameProgress(setP), []);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setSlashed(true);
    soundManager.playKunaiSlash();
    soundManager.stopIntro();

    setTimeout(() => {
      soundManager.playThunder();
      soundManager.playChidoriElectric();
      setOpen(true);
      setTimeout(onDone, 1100);
    }, 280);
  };

  useEffect(() => {
    if (p > 0.22) {
      const t = setTimeout(finish, 850);
      return () => clearTimeout(t);
    }
  }, [p]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const t = setTimeout(finish, 6500);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pct = Math.min(100, Math.round((p / 0.22) * 100));

  return (
    <div
      className={`intro ${open ? 'open' : ''} ${glitching ? 'is-glitching' : ''}`}
      onClick={() => {
        // Guarantee audio start on user click if autoplay was initially gated
        soundManager.playIntro();
      }}
    >
      {/* CRT Scanline and Glitch Slices */}
      <div className="intro-scanlines" />
      <div className="intro-glitch-bar" />
      {glitching && <div className="intro-noise-flash" />}

      {/* Top and Bottom Cinematic Split Gates */}
      <motion.div
        className="intro-half top"
        animate={{ y: open ? '-100%' : '0%' }}
        transition={{ duration: 1.05, ease: EASE, delay: 0.12 }}
      >
        <div className="intro-gate-stripe top" />
      </motion.div>
      <motion.div
        className="intro-half bot"
        animate={{ y: open ? '100%' : '0%' }}
        transition={{ duration: 1.05, ease: EASE, delay: 0.12 }}
      >
        <div className="intro-gate-stripe bot" />
      </motion.div>

      {/* Diagonal Katana Slash Flash */}
      {slashed && (
        <motion.div
          className="intro-slash-cut"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        />
      )}

      <AnimatePresence>
        {!open && (
          <motion.div
            className="intro-core"
            exit={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
            transition={{ duration: 0.45 }}
          >
            {/* Top Tactical Glitch HUD Label */}
            <motion.div
              className="intro-kicker-group"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="intro-shinobi-badge">
                <i className="intro-glitch-pulse" />
                木ノ葉隠れの里 · LEAF ARCHIVES
              </span>
              <span className="intro-classified-tag">雷遁 · GLITCH PROTOCOL</span>
            </motion.div>

            {/* Central Spinning Fūma Shuriken with Concentric Chakra Rings */}
            <div className="intro-shuriken-stage">
              <div className="intro-chakra-ring outer" />
              <div className="intro-chakra-ring inner" />
              <div
                className="intro-fuma-shuriken"
                style={{ transform: `rotate(${pct * 14.4}deg)` }}
              >
                <svg viewBox="0 0 64 64" className="intro-shuriken-svg">
                  {/* Outer Razor Outline */}
                  <path
                    d="M32,2 L39,25 L62,32 L39,39 L32,62 L25,39 L2,32 L25,25 Z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    opacity="0.9"
                  />
                  {/* 4 Light Facets */}
                  <path d="M32,32 L25,25 L32,2 Z" fill="#f5f6fa" />
                  <path d="M32,32 L39,25 L62,32 Z" fill="#dcdde1" />
                  <path d="M32,32 L39,39 L32,62 Z" fill="#f5f6fa" />
                  <path d="M32,32 L25,39 L2,32 Z" fill="#dcdde1" />
                  {/* 4 Dark Facets */}
                  <path d="M32,32 L32,2 L39,25 Z" fill="#718093" />
                  <path d="M32,32 L62,32 L39,39 Z" fill="#2f3640" />
                  <path d="M32,32 L32,62 L25,39 Z" fill="#718093" />
                  <path d="M32,32 L2,32 L25,25 Z" fill="#2f3640" />
                  {/* Center Plate & Red Chakra Core */}
                  <circle cx="32" cy="32" r="8" fill="#1e272e" stroke="#8395a7" strokeWidth="1.2" />
                  <circle cx="32" cy="32" r="6" fill="none" stroke="#e50914" strokeWidth="1" />
                  <circle cx="32" cy="32" r="3.5" fill="#000" />
                </svg>
              </div>
            </div>

            {/* Profile Identity with RGB Glitch Split */}
            <h2
              className="intro-shinobi-title intro-glitch-text"
              data-text={PROFILE.realName.toUpperCase()}
            >
              {PROFILE.realName.toUpperCase()}
              <small>{PROFILE.role.toUpperCase()} // CHAKRA CALIBRATION</small>
            </h2>

            {/* Ninjutsu Hand Seals Progression (印) */}
            <div className="intro-seals-row">
              {HAND_SEAL_STEPS.map((s) => {
                const isUnlocked = pct >= s.threshold;
                return (
                  <div
                    key={s.name}
                    className={`intro-seal-box ${isUnlocked ? 'active' : ''}`}
                    style={isUnlocked ? { borderColor: s.color, boxShadow: `0 0 14px ${s.color}` } : undefined}
                  >
                    <span className="isb-kanji" style={isUnlocked ? { color: s.color } : undefined}>
                      {s.kanji}
                    </span>
                    <span className="isb-name">{s.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Electric Chidori Lightning Progress Bar */}
            <div className="intro-line">
              <i style={{ transform: `scaleX(${pct / 100})` }}>
                <span className="intro-line-spark" />
              </i>
            </div>

            {/* Bottom Telemetry HUD with Audio Status indicator */}
            <div className="intro-pct">
              <span>
                <i className="intro-blink-dot" />
                NEURAL LINK // GLITCH TELEMETRY
              </span>
              <b>
                {String(pct).padStart(3, '0')}
                <i>%</i>
              </b>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
