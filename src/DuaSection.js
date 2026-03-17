import React, { useState } from 'react';

const DUAS = [
  {
    icon: '\uD83E\uDD32',
    title: "Du'a for Eid Day",
    arabic: '\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0623\u064E\u0647\u0650\u0644\u0651\u064E\u0647\u064F \u0639\u064E\u0644\u064E\u064A\u0652\u0646\u064E\u0627 \u0628\u0650\u0627\u0644\u0652\u064A\u064F\u0645\u0652\u0646\u0650 \u0648\u064E\u0627\u0644\u0625\u0650\u064A\u0645\u064E\u0627\u0646\u0650 \u0648\u064E\u0627\u0644\u0633\u0651\u064E\u0644\u0627\u0645\u064E\u0629\u0650 \u0648\u064E\u0627\u0644\u0625\u0650\u0633\u0652\u0644\u0627\u0645\u0650',
    translation: '"O Allah, bring it over us with blessing, faith, safety and Islam."',
    ref: 'At-Tirmidhi',
  },
  {
    icon: '\uD83C\uDF19',
    title: "Du'a for Forgiveness",
    arabic: '\u0631\u064E\u0628\u0651\u064E\u0646\u064E\u0627 \u0627\u063A\u0652\u0641\u0650\u0631\u0652 \u0644\u064E\u0646\u064E\u0627 \u0630\u064F\u0646\u064F\u0648\u0628\u064E\u0646\u064E\u0627 \u0648\u064E\u0625\u0650\u0633\u0652\u0631\u064E\u0627\u0641\u064E\u0646\u064E\u0627 \u0641\u0650\u064A \u0623\u064E\u0645\u0652\u0631\u0650\u0646\u064E\u0627 \u0648\u064E\u062B\u064E\u0628\u0651\u0650\u062A\u0652 \u0623\u064E\u0642\u0652\u062F\u064E\u0627\u0645\u064E\u0646\u064E\u0627 \u0648\u064E\u0627\u0646\u0635\u064F\u0631\u0652\u0646\u064E\u0627 \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0652\u0642\u064E\u0648\u0652\u0645\u0650 \u0627\u0644\u0652\u0643\u064E\u0627\u0641\u0650\u0631\u0650\u064A\u0646\u064E',
    translation: '"Our Lord, forgive us our sins and excesses, make firm our feet, and give us victory."',
    ref: 'Quran 3:147',
  },
  {
    icon: '\uD83D\uDCAB',
    title: "Du'a for Good in Both Worlds",
    arabic: '\u0631\u064E\u0628\u0651\u064E\u0646\u064E\u0627 \u0622\u062A\u0650\u0646\u064E\u0627 \u0641\u0650\u064A \u0627\u0644\u062F\u0651\u064F\u0646\u0652\u064A\u064E\u0627 \u062D\u064E\u0633\u064E\u0646\u064E\u0629\u064B \u0648\u064E\u0641\u0650\u064A \u0627\u0644\u0652\u0622\u062E\u0650\u0631\u064E\u0629\u0650 \u062D\u064E\u0633\u064E\u0646\u064E\u0629\u064B \u0648\u064E\u0642\u0650\u0646\u064E\u0627 \u0639\u064E\u0630\u064E\u0627\u0628\u064E \u0627\u0644\u0646\u0651\u064E\u0627\u0631\u0650',
    translation: '"Our Lord, give us good in this world and good in the next, and save us from the Fire."',
    ref: 'Quran 2:201',
  },
  {
    icon: '\u2764\uFE0F',
    title: "Du'a for Family Blessings",
    arabic: '\u0631\u064E\u0628\u0651\u064E\u0646\u064E\u0627 \u0647\u064E\u0628\u0652 \u0644\u064E\u0646\u064E\u0627 \u0645\u0650\u0646\u0652 \u0623\u064E\u0632\u0652\u0648\u064E\u0627\u062C\u0650\u0646\u064E\u0627 \u0648\u064E\u0630\u064F\u0631\u0651\u0650\u064A\u0651\u064E\u0627\u062A\u0650\u0646\u064E\u0627 \u0642\u064F\u0631\u0651\u064E\u0629\u064E \u0623\u064E\u0639\u0652\u064A\u064F\u0646\u064D \u0648\u064E\u0627\u062C\u0652\u0639\u064E\u0644\u0652\u0646\u064E\u0627 \u0644\u0650\u0644\u0652\u0645\u064F\u062A\u0651\u064E\u0642\u0650\u064A\u0646\u064E \u0625\u0650\u0645\u064E\u0627\u0645\u064B\u0627',
    translation: '"Our Lord, grant us spouses and offspring who are the comfort of our eyes, and make us leaders of the righteous."',
    ref: 'Quran 25:74',
  },
  {
    icon: '\uD83D\uDD4C',
    title: "Du'a for Acceptance",
    arabic: '\u0631\u064E\u0628\u0651\u064E\u0646\u064E\u0627 \u062A\u064E\u0642\u064E\u0628\u0651\u064E\u0644\u0652 \u0645\u0650\u0646\u0651\u064E\u0627 \u0625\u0650\u0646\u0651\u064E\u0643\u064E \u0623\u064E\u0646\u062A\u064E \u0627\u0644\u0633\u0651\u064E\u0645\u0650\u064A\u0639\u064F \u0627\u0644\u0652\u0639\u064E\u0644\u0650\u064A\u0645\u064F',
    translation: '"Our Lord, accept from us. Indeed, You are the Hearing, the Knowing."',
    ref: 'Quran 2:127',
  },
];

export default function DuaSection() {
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <section className="dua-section" id="duas">
      <div className="section-divider reveal"><div className="line" /><span className="ornament">{'\u2726'}</span><div className="line" /></div>
      <h2 className="section-heading reveal">Sacred Du'as</h2>
      <p className="section-sub reveal">Tap to expand a prayer</p>
      <div className="dua-grid reveal">
        {DUAS.map((dua, i) => (
          <div
            key={i}
            className={`dua-tile ${openIdx === i ? 'open' : ''}`}
            onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
          >
            <div className="dua-header">
              <div className="dua-header-left">
                <span className="dua-header-icon">{dua.icon}</span>
                <span className="dua-header-title">{dua.title}</span>
              </div>
              <span className="dua-chevron">{'\u25BC'}</span>
            </div>
            <div className="dua-body">
              <div className="dua-content">
                <div className="dua-arabic">{dua.arabic}</div>
                <div className="dua-translation">{dua.translation}</div>
                <div className="dua-ref">{dua.ref}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
