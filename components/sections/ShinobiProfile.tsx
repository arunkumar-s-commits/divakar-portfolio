'use client';

import { motion } from 'framer-motion';
import { NINJA_DOSSIER, PROFILE } from '@/lib/data';

export default function ShinobiProfile() {
  return (
    <section className="shinobi-section" id="dossier">
      <div className="sec-head center">
        <p className="eyebrow">SPECIAL CLASSIFIED</p>
        <h2>
          Shinobi <span>Registration</span>
        </h2>
        <p className="sec-sub">Official Ninja Registration Dossier (木ノ葉隠れの里 忍者登録証)</p>
      </div>

      <div className="shinobi-container">
        {/* Main Ninja ID Card */}
        <motion.div
          className="shinobi-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="shinobi-card-header">
            <div className="shinobi-emblem">
              <span className="leaf-symbol">🍃</span>
              <div>
                <span className="sh-reg">{NINJA_DOSSIER.regNumber}</span>
                <h3 className="sh-name">{PROFILE.realName}</h3>
                <span className="sh-alias">ALIAS: {PROFILE.name} · {NINJA_DOSSIER.codename}</span>
              </div>
            </div>
            <div className="shinobi-stamp">
              <span>{NINJA_DOSSIER.rank}</span>
            </div>
          </div>

          <div className="shinobi-grid">
            <div className="shinobi-meta-col">
              <div className="sh-meta-item">
                <label>VILLAGE & AFFILIATION</label>
                <p>{NINJA_DOSSIER.village}</p>
              </div>
              <div className="sh-meta-item">
                <label>DIVISION</label>
                <p>{NINJA_DOSSIER.division}</p>
              </div>
              <div className="sh-meta-item">
                <label>SIGNATURE JUTSU</label>
                <p className="highlight-jutsu">{NINJA_DOSSIER.signatureJutsu}</p>
              </div>
              <div className="sh-meta-item">
                <label>CHAKRA NATURE AFFINITIES</label>
                <div className="chakra-badges">
                  {NINJA_DOSSIER.natures.map((nat) => (
                    <div key={nat.name} className="chakra-badge" style={{ borderColor: nat.color }}>
                      <span className="chakra-kanji" style={{ color: nat.color }}>{nat.kanji}</span>
                      <div>
                        <b>{nat.name}</b>
                        <small>{nat.desc}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Radar / Skill Assessment Bars */}
            <div className="shinobi-radar-col">
              <h4>SHINOBI ATTRIBUTE ASSESSMENT</h4>
              <div className="sh-bars">
                {NINJA_DOSSIER.radar.map((r, i) => (
                  <div key={r.stat} className="sh-bar-item">
                    <div className="sh-bar-label">
                      <span>{r.stat}</span>
                      <b>{r.score}<i>/{r.max}</i></b>
                    </div>
                    <div className="sh-bar-track">
                      <motion.div
                        className="sh-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${r.score}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="shinobi-footer-quote">
            <p>
              “In the data realm, surface assumptions are mere illusions. Only verified signals reveal the path.”
            </p>
            <span>— Dhivakar B (Special Jōnin, Data Analytics)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

