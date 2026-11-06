'use client';

import { useState } from 'react';

export default function ChakraMode() {
  const [active, setActive] = useState(false);

  const toggleChakra = () => {
    const next = !active;
    setActive(next);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('sharingan-mode', next);
    }

    // Play subtle synth blade hum using Web Audio API
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(next ? 150 : 300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(next ? 600 : 80, ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      }
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  return (
    <button
      className={`chakra-btn ${active ? 'active' : ''}`}
      onClick={toggleChakra}
      title="Toggle Sharingan / Chakra Surge"
      aria-label="Toggle Sharingan Chakra"
    >
      <span className="chakra-tomoe">写</span>
      <span className="chakra-label">{active ? 'SHARINGAN ACTIVE' : 'ACTIVATE SHARINGAN'}</span>
    </button>
  );
}

