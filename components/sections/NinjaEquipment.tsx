'use client';

import { motion } from 'framer-motion';

const WEAPONS = [
  {
    icon: '⚡',
    name: 'Chidori Gauntlet (千鳥の手甲)',
    role: 'High-Throughput Real-Time Telemetry',
    desc: 'Harnesses concentrated lightning chakra to ingest, process, and stream IoT sensor events and live business analytics with microsecond latency.',
    tech: 'IoT Sensors · Real-Time Alerts · Stream Processing',
  },
  {
    icon: '🗡️',
    name: 'Tanto Katana (短刀)',
    role: 'Precision Data Extraction & Cleaning',
    desc: 'A razor-sharp tactical blade designed to slice through dirty unstructured datasets, amputate null values, and standardize features cleanly.',
    tech: 'Python · Pandas · Regular Expressions · Data Prep',
  },
  {
    icon: '📜',
    name: 'Sealing Scroll (封印の書)',
    role: 'ACID DBMS Schema Security',
    desc: 'Ancient scrolls containing impenetrable constraints, relational keys, and ACID durability to protect enterprise data from corruption.',
    tech: 'SQL · DBMS Fundamentals · Relational Models',
  },
  {
    icon: '🌀',
    name: 'Fūma Shuriken (風魔手裏剣)',
    role: 'Distributed Cloud Architecture',
    desc: 'A giant multi-bladed projectile that spins across distributed nodes in Microsoft Fabric and Oracle APEX Cloud to conquer big data.',
    tech: 'Microsoft Fabric (DP-600) · Oracle APEX Cloud',
  },
];

export default function NinjaEquipment() {
  return (
    <section className="equipment-section" id="arsenal-tools">
      <div className="sec-head center">
        <p className="eyebrow">TACTICAL INVENTORY & CLASSIFIED FILES</p>
        <h2>
          Bingo Book & <span>Armory</span>
        </h2>
        <p className="sec-sub">Official Shinobi Equipment & Bingo Book Dossier (手配書と忍具の目録)</p>
      </div>

      <div className="equipment-grid-wrap">
        {/* Bingo Book Classified Dossier */}
        <motion.div
          className="bingo-book-card"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bingo-header">
            <span className="bingo-wanted">BINGO BOOK · 手配書</span>
            <div className="bingo-stamp">CLASS S</div>
          </div>

          <div className="bingo-avatar-frame">
            <div className="bingo-avatar-img">
              <span className="bingo-kanji-bg">写</span>
              <div className="bingo-silhouette">
                <span className="sh-mask">DHIVAKAR B</span>
                <small>SPECIAL JŌNIN · DATA CORPS</small>
              </div>
            </div>
          </div>

          <div className="bingo-info">
            <div className="bingo-row">
              <span>TARGET CODENAME</span>
              <b>Copy Ninja of Data (写輪眼のディヴァカル)</b>
            </div>
            <div className="bingo-row">
              <span>PRIMARY ELEMENTS</span>
              <b>Lightning (Raiton) · Cloud Fabric</b>
            </div>
            <div className="bingo-row">
              <span>SPECIAL ABILITIES</span>
              <b>Exploratory Analysis · Real-Time Telemetry</b>
            </div>
            <div className="bingo-row">
              <span>BOUNTY ASSESSMENT</span>
              <b className="bingo-bounty">High-Impact Business Value</b>
            </div>
          </div>

          <div className="bingo-footer">
            <span className="bingo-leaf-mark">🍃 KONOHA ARCHIVES</span>
            <span className="bingo-classified">TOP SECRET · 極秘</span>
          </div>
        </motion.div>

        {/* Tactical Equipment Arsenal */}
        <div className="weapons-column">
          <h3 className="weapons-heading">NINJA TACTICAL GEAR</h3>
          <div className="weapons-list">
            {WEAPONS.map((w, i) => (
              <motion.article
                key={w.name}
                className="weapon-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <div className="weapon-icon-box">{w.icon}</div>
                <div className="weapon-body">
                  <div className="weapon-top">
                    <h4>{w.name}</h4>
                    <span className="weapon-role">{w.role}</span>
                  </div>
                  <p>{w.desc}</p>
                  <div className="weapon-tech">{w.tech}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

