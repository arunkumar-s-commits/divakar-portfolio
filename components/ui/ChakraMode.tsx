'use client';

import { useState } from 'react';
import { soundManager } from '@/lib/sound';

export default function ChakraMode() {
  const [active, setActive] = useState(false);

  const toggleChakra = () => {
    const next = !active;
    setActive(next);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('sharingan-mode', next);
    }

    if (next) {
      soundManager.playSharinganWithThunder();
    } else {
      soundManager.playKunaiSlash();
    }
  };

  return (
    <button
      className={`chakra-btn ${active ? 'active' : ''}`}
      onClick={toggleChakra}
      title="Toggle Sharingan Mode & Chakra Surge"
      aria-label="Toggle Sharingan Chakra"
    >
      <span className="chakra-tomoe">写</span>
      <span className="chakra-label">{active ? 'SHARINGAN ACTIVE' : 'ACTIVATE SHARINGAN'}</span>
    </button>
  );
}
