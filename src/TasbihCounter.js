import React, { useState, useMemo } from 'react';

const NAMES = [
  { ar: '\u0627\u0644\u0631\u0651\u064E\u062D\u0652\u0645\u064E\u0646\u064F', en: 'Ar-Rahman', meaning: 'The All-Compassionate' },
  { ar: '\u0627\u0644\u0631\u0651\u064E\u062D\u0650\u064A\u0645\u064F', en: 'Ar-Raheem', meaning: 'The All-Merciful' },
  { ar: '\u0627\u0644\u0652\u0645\u064E\u0644\u0650\u0643\u064F', en: 'Al-Malik', meaning: 'The King' },
  { ar: '\u0627\u0644\u0652\u0642\u064F\u062F\u0651\u064F\u0648\u0633\u064F', en: 'Al-Quddus', meaning: 'The Pure One' },
  { ar: '\u0627\u0644\u0633\u0651\u064E\u0644\u0627\u0645\u064F', en: 'As-Salam', meaning: 'The Source of Peace' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0624\u0652\u0645\u0650\u0646\u064F', en: "Al-Mu'min", meaning: 'The Inspirer of Faith' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0647\u064E\u064A\u0652\u0645\u0650\u0646\u064F', en: 'Al-Muhaymin', meaning: 'The Guardian' },
  { ar: '\u0627\u0644\u0652\u0639\u064E\u0632\u0650\u064A\u0632\u064F', en: 'Al-Aziz', meaning: 'The Victorious' },
  { ar: '\u0627\u0644\u0652\u062C\u064E\u0628\u0651\u064E\u0627\u0631\u064F', en: 'Al-Jabbar', meaning: 'The Compeller' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u062A\u064E\u0643\u064E\u0628\u0651\u0650\u0631\u064F', en: 'Al-Mutakabbir', meaning: 'The Supreme' },
  { ar: '\u0627\u0644\u0652\u062E\u064E\u0627\u0644\u0650\u0642\u064F', en: 'Al-Khaliq', meaning: 'The Creator' },
  { ar: '\u0627\u0644\u0652\u0628\u064E\u0627\u0631\u0650\u0626\u064F', en: 'Al-Bari', meaning: 'The Maker of Order' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0635\u064E\u0648\u0651\u0650\u0631\u064F', en: 'Al-Musawwir', meaning: 'The Shaper of Beauty' },
  { ar: '\u0627\u0644\u0652\u063A\u064E\u0641\u0651\u064E\u0627\u0631\u064F', en: 'Al-Ghaffar', meaning: 'The Forgiving' },
  { ar: '\u0627\u0644\u0652\u0642\u064E\u0647\u0651\u064E\u0627\u0631\u064F', en: 'Al-Qahhar', meaning: 'The Subduer' },
  { ar: '\u0627\u0644\u0652\u0648\u064E\u0647\u0651\u064E\u0627\u0628\u064F', en: 'Al-Wahhab', meaning: 'The Giver of All' },
  { ar: '\u0627\u0644\u0631\u0651\u064E\u0632\u0651\u064E\u0627\u0642\u064F', en: 'Ar-Razzaq', meaning: 'The Sustainer' },
  { ar: '\u0627\u0644\u0652\u0641\u064E\u062A\u0651\u064E\u0627\u062D\u064F', en: 'Al-Fattah', meaning: 'The Opener' },
  { ar: '\u0627\u0644\u0652\u0639\u064E\u0644\u0650\u064A\u0645\u064F', en: 'Al-Alim', meaning: 'The Knower of All' },
  { ar: '\u0627\u0644\u0652\u0642\u064E\u0627\u0628\u0650\u0636\u064F', en: 'Al-Qabid', meaning: 'The Constrictor' },
  { ar: '\u0627\u0644\u0652\u0628\u064E\u0627\u0633\u0650\u0637\u064F', en: 'Al-Basit', meaning: 'The Reliever' },
  { ar: '\u0627\u0644\u0652\u062E\u064E\u0627\u0641\u0650\u0636\u064F', en: 'Al-Khafid', meaning: 'The Abaser' },
  { ar: '\u0627\u0644\u0631\u0651\u064E\u0627\u0641\u0650\u0639\u064F', en: 'Ar-Rafi', meaning: 'The Exalter' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0639\u0650\u0632\u0651\u064F', en: "Al-Mu'izz", meaning: 'The Bestower of Honours' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0630\u0650\u0644\u0651\u064F', en: 'Al-Mudhill', meaning: 'The Humiliator' },
  { ar: '\u0627\u0644\u0633\u0651\u064E\u0645\u0650\u064A\u0639\u064F', en: 'As-Sami', meaning: 'The Hearer of All' },
  { ar: '\u0627\u0644\u0652\u0628\u064E\u0635\u0650\u064A\u0631\u064F', en: 'Al-Basir', meaning: 'The Seer of All' },
  { ar: '\u0627\u0644\u0652\u062D\u064E\u0643\u064E\u0645\u064F', en: 'Al-Hakam', meaning: 'The Judge' },
  { ar: '\u0627\u0644\u0652\u0639\u064E\u062F\u0652\u0644\u064F', en: 'Al-Adl', meaning: 'The Just' },
  { ar: '\u0627\u0644\u0644\u0651\u064E\u0637\u0650\u064A\u0641\u064F', en: 'Al-Latif', meaning: 'The Subtle One' },
  { ar: '\u0627\u0644\u0652\u062E\u064E\u0628\u0650\u064A\u0631\u064F', en: 'Al-Khabir', meaning: 'The All-Aware' },
  { ar: '\u0627\u0644\u0652\u062D\u064E\u0644\u0650\u064A\u0645\u064F', en: 'Al-Halim', meaning: 'The Forbearing' },
  { ar: '\u0627\u0644\u0652\u0639\u064E\u0638\u0650\u064A\u0645\u064F', en: 'Al-Azim', meaning: 'The Magnificent' },
  { ar: '\u0627\u0644\u0652\u063A\u064E\u0641\u064F\u0648\u0631\u064F', en: 'Al-Ghafur', meaning: 'The Forgiver & Hider of Faults' },
  { ar: '\u0627\u0644\u0634\u0651\u064E\u0643\u064F\u0648\u0631\u064F', en: 'Ash-Shakur', meaning: 'The Rewarder of Thankfulness' },
  { ar: '\u0627\u0644\u0652\u0639\u064E\u0644\u0650\u064A\u0651\u064F', en: 'Al-Ali', meaning: 'The Highest' },
  { ar: '\u0627\u0644\u0652\u0643\u064E\u0628\u0650\u064A\u0631\u064F', en: 'Al-Kabir', meaning: 'The Greatest' },
  { ar: '\u0627\u0644\u0652\u062D\u064E\u0641\u0650\u064A\u0638\u064F', en: 'Al-Hafiz', meaning: 'The Preserver' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0642\u0650\u064A\u062A\u064F', en: 'Al-Muqit', meaning: 'The Nourisher' },
  { ar: '\u0627\u0644\u0652\u062D\u064E\u0633\u0650\u064A\u0628\u064F', en: 'Al-Hasib', meaning: 'The Accounter' },
  { ar: '\u0627\u0644\u0652\u062C\u064E\u0644\u0650\u064A\u0644\u064F', en: 'Al-Jalil', meaning: 'The Mighty' },
  { ar: '\u0627\u0644\u0652\u0643\u064E\u0631\u0650\u064A\u0645\u064F', en: 'Al-Karim', meaning: 'The Generous' },
  { ar: '\u0627\u0644\u0631\u0651\u064E\u0642\u0650\u064A\u0628\u064F', en: 'Ar-Raqib', meaning: 'The Watchful One' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u062C\u0650\u064A\u0628\u064F', en: 'Al-Mujib', meaning: 'The Responder to Prayer' },
  { ar: '\u0627\u0644\u0652\u0648\u064E\u0627\u0633\u0650\u0639\u064F', en: 'Al-Wasi', meaning: 'The All-Comprehending' },
  { ar: '\u0627\u0644\u0652\u062D\u064E\u0643\u0650\u064A\u0645\u064F', en: 'Al-Hakim', meaning: 'The Perfectly Wise' },
  { ar: '\u0627\u0644\u0652\u0648\u064E\u062F\u064F\u0648\u062F\u064F', en: 'Al-Wadud', meaning: 'The Loving One' },
  { ar: '\u0627\u0644\u0652\u0645\u064E\u062C\u0650\u064A\u062F\u064F', en: 'Al-Majid', meaning: 'The Majestic One' },
  { ar: '\u0627\u0644\u0652\u0628\u064E\u0627\u0639\u0650\u062B\u064F', en: "Al-Ba'ith", meaning: 'The Resurrector' },
  { ar: '\u0627\u0644\u0634\u0651\u064E\u0647\u0650\u064A\u062F\u064F', en: 'Ash-Shahid', meaning: 'The Witness' },
  { ar: '\u0627\u0644\u0652\u062D\u064E\u0642\u0651\u064F', en: 'Al-Haqq', meaning: 'The Truth' },
  { ar: '\u0627\u0644\u0652\u0648\u064E\u0643\u0650\u064A\u0644\u064F', en: 'Al-Wakil', meaning: 'The Trustee' },
  { ar: '\u0627\u0644\u0652\u0642\u064E\u0648\u0650\u064A\u0651\u064F', en: 'Al-Qawi', meaning: 'The Possessor of All Strength' },
  { ar: '\u0627\u0644\u0652\u0645\u064E\u062A\u0650\u064A\u0646\u064F', en: 'Al-Matin', meaning: 'The Forceful One' },
  { ar: '\u0627\u0644\u0652\u0648\u064E\u0644\u0650\u064A\u0651\u064F', en: 'Al-Wali', meaning: 'The Governor' },
  { ar: '\u0627\u0644\u0652\u062D\u064E\u0645\u0650\u064A\u062F\u064F', en: 'Al-Hamid', meaning: 'The Praised One' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u062D\u0652\u0635\u0650\u064A', en: 'Al-Muhsi', meaning: 'The Appraiser' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0628\u0652\u062F\u0650\u0626\u064F', en: 'Al-Mubdi', meaning: 'The Originator' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0639\u0650\u064A\u062F\u064F', en: "Al-Mu'id", meaning: 'The Restorer' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u062D\u0652\u064A\u0650\u064A', en: 'Al-Muhyi', meaning: 'The Giver of Life' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0645\u0650\u064A\u062A\u064F', en: 'Al-Mumit', meaning: 'The Taker of Life' },
  { ar: '\u0627\u0644\u0652\u062D\u064E\u064A\u0651\u064F', en: 'Al-Hayy', meaning: 'The Ever Living One' },
  { ar: '\u0627\u0644\u0652\u0642\u064E\u064A\u0651\u064F\u0648\u0645\u064F', en: 'Al-Qayyum', meaning: 'The Self-Existing One' },
  { ar: '\u0627\u0644\u0652\u0648\u064E\u0627\u062C\u0650\u062F\u064F', en: 'Al-Wajid', meaning: 'The Finder' },
  { ar: '\u0627\u0644\u0652\u0645\u064E\u0627\u062C\u0650\u062F\u064F', en: 'Al-Majid', meaning: 'The Glorious' },
  { ar: '\u0627\u0644\u0652\u0648\u064E\u0627\u062D\u0650\u062F\u064F', en: 'Al-Wahid', meaning: 'The One' },
  { ar: '\u0627\u0644\u0635\u0651\u064E\u0645\u064E\u062F\u064F', en: 'As-Samad', meaning: 'The Satisfier of All Needs' },
  { ar: '\u0627\u0644\u0652\u0642\u064E\u0627\u062F\u0650\u0631\u064F', en: 'Al-Qadir', meaning: 'The All Powerful' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0642\u0652\u062A\u064E\u062F\u0650\u0631\u064F', en: 'Al-Muqtadir', meaning: 'The Creator of All Power' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0642\u064E\u062F\u0651\u0650\u0645\u064F', en: 'Al-Muqaddim', meaning: 'The Expediter' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0624\u064E\u062E\u0651\u0650\u0631\u064F', en: "Al-Mu'akhkhir", meaning: 'The Delayer' },
  { ar: '\u0627\u0644\u0652\u0623\u064E\u0648\u0651\u064E\u0644\u064F', en: 'Al-Awwal', meaning: 'The First' },
  { ar: '\u0627\u0644\u0652\u0622\u062E\u0650\u0631\u064F', en: 'Al-Akhir', meaning: 'The Last' },
  { ar: '\u0627\u0644\u0638\u0651\u064E\u0627\u0647\u0650\u0631\u064F', en: 'Az-Zahir', meaning: 'The Manifest One' },
  { ar: '\u0627\u0644\u0652\u0628\u064E\u0627\u0637\u0650\u0646\u064F', en: 'Al-Batin', meaning: 'The Hidden One' },
  { ar: '\u0627\u0644\u0652\u0648\u064E\u0627\u0644\u0650\u064A', en: 'Al-Wali', meaning: 'The Protecting Friend' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u062A\u064E\u0639\u064E\u0627\u0644\u0650\u064A', en: "Al-Muta'ali", meaning: 'The Supreme One' },
  { ar: '\u0627\u0644\u0652\u0628\u064E\u0631\u0651\u064F', en: 'Al-Barr', meaning: 'The Doer of Good' },
  { ar: '\u0627\u0644\u062A\u0651\u064E\u0648\u0651\u064E\u0627\u0628\u064F', en: 'At-Tawwab', meaning: 'The Guide to Repentance' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0646\u0652\u062A\u064E\u0642\u0650\u0645\u064F', en: 'Al-Muntaqim', meaning: 'The Avenger' },
  { ar: '\u0627\u0644\u0652\u0639\u064E\u0641\u064F\u0648\u0651\u064F', en: 'Al-Afuw', meaning: 'The Forgiver' },
  { ar: '\u0627\u0644\u0631\u0651\u064E\u0624\u064F\u0648\u0641\u064F', en: "Ar-Ra'uf", meaning: 'The Clement' },
  { ar: '\u0645\u064E\u0627\u0644\u0650\u0643\u064F \u0627\u0644\u0652\u0645\u064F\u0644\u0652\u0643\u0650', en: 'Malik-al-Mulk', meaning: 'The Owner of All' },
  { ar: '\u0630\u064F\u0648 \u0627\u0644\u0652\u062C\u064E\u0644\u064E\u0627\u0644\u0650 \u0648\u064E\u0627\u0644\u0652\u0625\u0650\u0643\u0652\u0631\u064E\u0627\u0645\u0650', en: 'Dhul-Jalali-Wal-Ikram', meaning: 'Lord of Majesty and Bounty' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u0642\u0652\u0633\u0650\u0637\u064F', en: 'Al-Muqsit', meaning: 'The Equitable One' },
  { ar: '\u0627\u0644\u0652\u062C\u064E\u0627\u0645\u0650\u0639\u064F', en: 'Al-Jami', meaning: 'The Gatherer' },
  { ar: '\u0627\u0644\u0652\u063A\u064E\u0646\u0650\u064A\u0651\u064F', en: 'Al-Ghani', meaning: 'The Rich One' },
  { ar: '\u0627\u0644\u0652\u0645\u064F\u063A\u0652\u0646\u0650\u064A', en: 'Al-Mughni', meaning: 'The Enricher' },
  { ar: '\u0627\u0644\u0652\u0645\u064E\u0627\u0646\u0650\u0639\u064F', en: 'Al-Mani', meaning: 'The Preventer of Harm' },
  { ar: '\u0627\u0644\u0636\u0651\u064E\u0627\u0631\u0651\u064F', en: 'Ad-Darr', meaning: 'The Creator of The Harmful' },
  { ar: '\u0627\u0644\u0646\u0651\u064E\u0627\u0641\u0650\u0639\u064F', en: 'An-Nafi', meaning: 'The Creator of Good' },
  { ar: '\u0627\u0644\u0646\u0651\u064F\u0648\u0631\u064F', en: 'An-Nur', meaning: 'The Light' },
  { ar: '\u0627\u0644\u0652\u0647\u064E\u0627\u062F\u0650\u064A', en: 'Al-Hadi', meaning: 'The Guide' },
  { ar: '\u0627\u0644\u0652\u0628\u064E\u062F\u0650\u064A\u0639\u064F', en: 'Al-Badi', meaning: 'The Originator' },
  { ar: '\u0627\u0644\u0652\u0628\u064E\u0627\u0642\u0650\u064A', en: 'Al-Baqi', meaning: 'The Everlasting One' },
  { ar: '\u0627\u0644\u0652\u0648\u064E\u0627\u0631\u0650\u062B\u064F', en: 'Al-Warith', meaning: 'The Inheritor of All' },
  { ar: '\u0627\u0644\u0631\u0651\u064E\u0634\u0650\u064A\u062F\u064F', en: 'Ar-Rashid', meaning: 'The Righteous Teacher' },
  { ar: '\u0627\u0644\u0635\u0651\u064E\u0628\u064F\u0648\u0631\u064F', en: 'As-Sabur', meaning: 'The Patient One' },
];

const CIRC = 2 * Math.PI * 54;

export default function TasbihCounter() {
  const [nameIdx, setNameIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [msg, setMsg] = useState('');

  const n = NAMES[nameIdx];

  const dots = useMemo(() => {
    return Array.from({ length: target }, (_, i) => i);
  }, [target]);

  function handleTap() {
    if (count >= target) return;
    const next = count + 1;
    setCount(next);
    setNameIdx((prev) => (prev + 1) % 99);
    if (next >= target) setMsg('\u0645\u0627 \u0634\u0627\u0621 \u0627\u0644\u0644\u0647 \u2014 Complete!');
  }

  function changeName(dir) {
    setNameIdx((prev) => (prev + dir + 99) % 99);
    setCount(0);
    setMsg('');
  }

  function changeTarget(t) {
    setTarget(t);
    setCount(0);
    setMsg('');
  }

  const offset = CIRC * (1 - count / target);

  return (
    <section className="tasbih-section" id="tasbih">
      <div className="section-divider reveal"><div className="line" /><span className="ornament">{'\u2726'}</span><div className="line" /></div>
      <h2 className="section-heading reveal">{'\u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0644\u0647 \u0627\u0644\u062D\u0633\u0646\u0649'}</h2>
      <p className="section-sub reveal">The 99 Beautiful Names of Allah {'\u2014'} Tap to count your Tasbih</p>
      <div className="tasbih-card reveal">
        <div className="tasbih-nav-row">
          <button className="tasbih-nav-btn" onClick={() => changeName(-1)}>{'\u2190'}</button>
          <span className="tasbih-pos">{nameIdx + 1} / 99</span>
          <button className="tasbih-nav-btn" onClick={() => changeName(1)}>{'\u2192'}</button>
        </div>
        <div className="tasbih-arabic">{n.ar}</div>
        <div className="tasbih-name">{n.en}</div>
        <div className="tasbih-meaning">{n.meaning}</div>
        <div className="tasbih-ring-wrap">
          <svg className="tasbih-ring-svg" viewBox="0 0 120 120">
            <circle className="tasbih-ring-bg" cx="60" cy="60" r="54" />
            <circle className="tasbih-ring-prog" cx="60" cy="60" r="54" style={{ strokeDashoffset: offset }} />
          </svg>
          <div className="tasbih-count-display">
            <span className="tasbih-count-num">{count}</span>
            <span className="tasbih-count-target">/ {target}</span>
          </div>
        </div>
        <button className="tasbih-tap-btn" onClick={handleTap}>{'\uD83E\uDD32'} Tap to Count</button>
        <div className="tasbih-target-row">
          <span>Target:</span>
          {[33, 99, 100].map((t) => (
            <button
              key={t}
              className={`tasbih-target-btn ${target === t ? 'active' : ''}`}
              onClick={() => changeTarget(t)}
            >{t}</button>
          ))}
        </div>
        {msg && <div className="tasbih-complete-msg">{msg}</div>}
      </div>
      <div className="tasbih-dots">
        {dots.map((i) => (
          <div key={i} className={`tasbih-dot ${i < count ? 'done' : ''} ${i === count ? 'current' : ''}`} />
        ))}
      </div>
    </section>
  );
}
