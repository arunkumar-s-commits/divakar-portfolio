'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JUTSU_LIST } from '@/lib/data';

export default function JutsuScroll() {
  const [selectedId, setSelectedId] = useState(JUTSU_LIST[0].id);
  const activeJutsu = JUTSU_LIST.find((j) => j.id === selectedId) || JUTSU_LIST[0];

  return (
    <section className="jutsu-section" id="jutsu">
      <div className="sec-head">
        <p className="eyebrow">CHAPTER III-B · THE CODEX</p>
        <h2>
          1,000 <span>Jutsu</span> Codex
        </h2>
        <p className="sec-sub">
          Legendary techniques copied and mastered with the Sharingan. Click any technique to unfurl the scroll.
        </p>
      </div>

      <div className="jutsu-wrapper">
        {/* Navigation list / tabs */}
        <div className="jutsu-tabs">
          {JUTSU_LIST.map((j, i) => {
            const isSelected = j.id === selectedId;
            return (
              <button
                key={j.id}
                className={`jutsu-tab-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedId(j.id)}
              >
                <span className="jt-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="jt-icon">{j.icon}</span>
                <div className="jt-title-group">
                  <span className="jt-name">{j.name}</span>
                  <span className="jt-kanji">{j.kanji}</span>
                </div>
                <span className="jt-rank">{j.rank}</span>
              </button>
            );
          })}
        </div>

        {/* Display Scroll */}
        <div className="jutsu-display-scroll">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeJutsu.id}
              className="jutsu-scroll-inner"
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
            >
              <div className="js-watermark">{activeJutsu.kanji.split(' ')[0]}</div>

              <div className="js-header">
                <div className="js-rank-pill">{activeJutsu.rank} TECHNIQUE</div>
                <div className="js-chakra-pill">{activeJutsu.chakra}</div>
              </div>

              <h3 className="js-title">{activeJutsu.name}</h3>
              <p className="js-kanji-sub">{activeJutsu.kanji}</p>

              <p className="js-summary">{activeJutsu.summary}</p>

              <div className="js-seal-box">
                <span className="seal-label">HAND SEALS (印):</span>
                <span className="seal-seq">{activeJutsu.seal}</span>
              </div>

              <div className="js-tech-stack">
                <span className="stack-label">MODERN EQUIVALENT TECH:</span>
                <div className="stack-tags">
                  {activeJutsu.tech.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>

              <div className="js-scroll-roller top" />
              <div className="js-scroll-roller bottom" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

