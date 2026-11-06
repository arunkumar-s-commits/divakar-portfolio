'use client';

import { motion } from 'framer-motion';
import { SHINOBI_CREED } from '@/lib/data';

export default function ShinobiCode() {
  return (
    <section className="shinobi-code-section" id="creed">
      <div className="sec-head center">
        <p className="eyebrow">CHAPTER VII · THE PHILOSOPHY</p>
        <h2>
          Way of the <span>Shinobi</span>
        </h2>
        <p className="sec-sub">The unshakeable code governing modern data engineering & mission execution.</p>
      </div>

      <div className="creed-grid">
        {SHINOBI_CREED.map((rule, i) => (
          <motion.article
            key={rule.title}
            className="creed-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="creed-kanji-watermark">{rule.kanji}</div>
            <div className="creed-card-inner">
              <div className="creed-rule-num">RULE {String(i + 1).padStart(2, '0')}</div>
              <h3 className="creed-title">{rule.title}</h3>
              <blockquote className="creed-quote">
                “{rule.quote}”
              </blockquote>
              <div className="creed-divider" />
              <div className="creed-footer">
                <span className="creed-meaning"><b>Shinobi Pillar:</b> {rule.meaning}</span>
                <span className="creed-author">— {rule.author}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

