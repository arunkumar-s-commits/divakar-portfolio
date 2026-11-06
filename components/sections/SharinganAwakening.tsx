'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '@/lib/sound';

const STAGES = [
  {
    stage: 1,
    title: 'One Tomoe (一巴 · 基礎)',
    kanji: '目覚め',
    subtitle: 'Awakening · Mathematical Foundations',
    desc: 'The initial spark of quantitative pattern recognition. Forged during Higher Secondary Certificate (83%) at SBK School with core mathematics and analytical inquiry.',
    stat: '83% HSC Score',
    affinity: 'Pattern Recognition',
  },
  {
    stage: 2,
    title: 'Two Tomoe (二巴 · 鍛錬)',
    kanji: '分析',
    subtitle: 'Analytical Perception · Academic Rigor',
    desc: 'Sharpened algorithmic perception across Python, SQL, and relational DBMS architecture at SNS College of Engineering (B.Tech in Artificial Intelligence & Data Science).',
    stat: 'CGPA 7.7 in AI & DS',
    affinity: 'Relational & Algorithmic Logic',
  },
  {
    stage: 3,
    title: 'Three Tomoe (三巴 · 洞察)',
    kanji: '実践',
    subtitle: 'Full Perception · Field Experience',
    desc: 'Unlocking real-time predictive vision and business intelligence during dual internships at Kevell Guru (responsive web architecture) and Osiz Technologies (Power BI & Tableau analytics).',
    stat: '2 Industry Internships',
    affinity: 'Business Intelligence & Telemetry',
  },
  {
    stage: 4,
    title: 'Mangekyō Sharingan (万華鏡 · 神威)',
    kanji: '神威',
    subtitle: 'Dimensional Cloud Mastery · Enterprise Scale',
    desc: 'Transcending local computing into unified Microsoft Fabric cloud lakehouses (DP-600) and Oracle APEX Cloud enterprise database systems.',
    stat: '2 Cloud Certifications',
    affinity: 'Enterprise Lakehouse & Cloud Architecture',
  },
];

const HAND_SEALS = [
  { kanji: '寅', name: 'Tiger (Tora)', color: '#ff9f43' },
  { kanji: '巳', name: 'Snake (Mi)', color: '#10ac84' },
  { kanji: '辰', name: 'Dragon (Tatsu)', color: '#54a0ff' },
  { kanji: '申', name: 'Monkey (Saru)', color: '#ee5253' },
  { kanji: '子', name: 'Rat (Ne)', color: '#a29bfe' },
];

export default function SharinganAwakening() {
  const [activeStage, setActiveStage] = useState(4);
  const [activeSeal, setActiveSeal] = useState<string | null>(null);
  const current = STAGES.find((s) => s.stage === activeStage) || STAGES[3];

  const triggerSeal = (sealName: string) => {
    setActiveSeal(sealName);
    soundManager.playHandSeal();
    setTimeout(() => soundManager.playElectricZap(), 80);
    setTimeout(() => setActiveSeal(null), 900);
  };

  const handleStageSelect = (stageNum: number) => {
    setActiveStage(stageNum);
    soundManager.playSharinganWithThunder();
  };

  return (
    <section className="awakening-section" id="awakening">
      <div className="sec-head center">
        <p className="eyebrow">CHAPTER II-B · OCULAR EVOLUTION</p>
        <h2>
          Sharingan <span>Awakening</span>
        </h2>
        <p className="sec-sub">
          The four stages of Dōjutsu (瞳術) development — trace the evolution from fundamental logic to cloud mastery.
        </p>
      </div>

      <div className="awakening-wrapper">
        {/* Hand Seals Bar (印) */}
        <div className="hand-seals-bar">
          <span className="hsb-label">NINJUTSU HAND SEALS (印):</span>
          <div className="hsb-buttons">
            {HAND_SEALS.map((hs) => (
              <button
                key={hs.name}
                className={`hsb-btn ${activeSeal === hs.name ? 'cast' : ''}`}
                onClick={() => triggerSeal(hs.name)}
                title={`Form ${hs.name} Hand Seal`}
              >
                <span className="hsb-kanji" style={{ color: hs.color }}>{hs.kanji}</span>
                <span className="hsb-name">{hs.name}</span>
              </button>
            ))}
          </div>
          {activeSeal && (
            <motion.div
              className="seal-cast-notice"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              CHAKRA SURGE: {activeSeal.toUpperCase()} SEAL ACTIVE!
            </motion.div>
          )}
        </div>

        <div className="aw-content-grid">
          {/* Ocular Disc Visual */}
          <div className="aw-eye-column">
            <div className={`aw-eye-disc-large ${activeSeal ? 'chakra-flare' : ''}`}>
              <svg viewBox="0 0 100 100" className="aw-eye-svg-large">
                {/* Outer Iris */}
                <circle cx="50" cy="50" r="46" fill="#7a0006" stroke="#3d0003" strokeWidth="3" />
                <circle cx="50" cy="50" r="42" fill="#e50914" />
                <circle cx="50" cy="50" r="28" fill="none" stroke="#220002" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4" />

                {/* Stage 1: Single Tomoe */}
                {activeStage === 1 && (
                  <g className="tomoe-group single-tomoe">
                    <circle cx="50" cy="27" r="4.2" fill="#050505" />
                    <path d="M50,23 C55,23 57.5,31 50,33 C45.5,31 45.5,25 50,23 Z" fill="#050505" />
                  </g>
                )}

                {/* Stage 2: Double Tomoe */}
                {activeStage === 2 && (
                  <g className="tomoe-group double-tomoe">
                    <g transform="translate(50, 50) rotate(0) translate(-50, -50)">
                      <circle cx="50" cy="27" r="4.2" fill="#050505" />
                      <path d="M50,23 C55,23 57.5,31 50,33 C45.5,31 45.5,25 50,23 Z" fill="#050505" />
                    </g>
                    <g transform="translate(50, 50) rotate(180) translate(-50, -50)">
                      <circle cx="50" cy="27" r="4.2" fill="#050505" />
                      <path d="M50,23 C55,23 57.5,31 50,33 C45.5,31 45.5,25 50,23 Z" fill="#050505" />
                    </g>
                  </g>
                )}

                {/* Stage 3: Triple Tomoe */}
                {activeStage === 3 && (
                  <g className="tomoe-group triple-tomoe">
                    <g transform="translate(50, 50) rotate(0) translate(-50, -50)">
                      <circle cx="50" cy="27" r="4.2" fill="#050505" />
                      <path d="M50,23 C55,23 57.5,31 50,33 C45.5,31 45.5,25 50,23 Z" fill="#050505" />
                    </g>
                    <g transform="translate(50, 50) rotate(120) translate(-50, -50)">
                      <circle cx="50" cy="27" r="4.2" fill="#050505" />
                      <path d="M50,23 C55,23 57.5,31 50,33 C45.5,31 45.5,25 50,23 Z" fill="#050505" />
                    </g>
                    <g transform="translate(50, 50) rotate(240) translate(-50, -50)">
                      <circle cx="50" cy="27" r="4.2" fill="#050505" />
                      <path d="M50,23 C55,23 57.5,31 50,33 C45.5,31 45.5,25 50,23 Z" fill="#050505" />
                    </g>
                  </g>
                )}

                {/* Stage 4: Mangekyō Sharingan Pinwheel */}
                {activeStage === 4 && (
                  <g className="tomoe-group mangekyo-blades">
                    <path d="M50,50 C43,28 26,22 50,5 C55,22 64,30 50,50 Z" fill="#050505" />
                    <path d="M50,50 C43,28 26,22 50,5 C55,22 64,30 50,50 Z" fill="#050505" transform="rotate(120 50 50)" />
                    <path d="M50,50 C43,28 26,22 50,5 C55,22 64,30 50,50 Z" fill="#050505" transform="rotate(240 50 50)" />
                  </g>
                )}

                {/* Center Pupil */}
                <circle cx="50" cy="50" r="7.5" fill="#000" />
                <circle cx="47" cy="47" r="2.2" fill="#fff" opacity="0.8" />
              </svg>
              <div className="aw-scanner-line" />
              <div className="aw-large-glow" />
            </div>

            <div className="aw-stage-indicator">
              <span>OCULAR RANK: <b>STAGE 0{activeStage} / 04</b></span>
            </div>
          </div>

          {/* Selector & Stage Dossier Card */}
          <div className="aw-dossier-column">
            <div className="aw-stage-tabs">
              {STAGES.map((s) => (
                <button
                  key={s.stage}
                  className={`aw-stage-tab ${s.stage === activeStage ? 'active' : ''}`}
                  onClick={() => handleStageSelect(s.stage)}
                >
                  <span className="ast-num">0{s.stage}</span>
                  <div className="ast-text">
                    <b>{s.title.split(' ')[0]} {s.title.split(' ')[1]}</b>
                    <small>{s.kanji}</small>
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={current.stage}
                className="aw-full-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="aw-fc-watermark">{current.kanji}</div>
                <div className="aw-fc-header">
                  <span className="aw-fc-phase">EVOLUTION PHASE {current.stage}</span>
                  <span className="aw-fc-affinity">{current.affinity}</span>
                </div>

                <h3 className="aw-fc-title">{current.title}</h3>
                <p className="aw-fc-subtitle">{current.subtitle}</p>
                <p className="aw-fc-desc">{current.desc}</p>

                <div className="aw-fc-stats-box">
                  <div className="af-stat-item">
                    <small>PROVEN MILESTONE</small>
                    <b>{current.stat}</b>
                  </div>
                  <div className="af-stat-item">
                    <small>STATUS</small>
                    <b className="verified">MASTERED & VERIFIED ✓</b>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
