"use client";

import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');

  :root {
    --navy: #0f2044;
    --navy-mid: #1a3460;
    --navy-light: #234580;
    --accent: #c9a84c;
    --accent-light: #e8c96a;
    --bg: #f5f4f0;
    --surface: #ffffff;
    --border: #ddd9d0;
    --text-primary: #0f2044;
    --text-secondary: #4a5568;
    --text-muted: #8a8f9a;
    --success: #1a7a4a;
    --success-bg: #edfaf3;
    --error: #b91c1c;
    --error-bg: #fef2f2;
    --shadow-sm: 0 1px 3px rgba(15,32,68,0.08), 0 1px 2px rgba(15,32,68,0.04);
    --shadow-md: 0 4px 16px rgba(15,32,68,0.10), 0 2px 6px rgba(15,32,68,0.06);
    --radius: 6px;
    --radius-lg: 10px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Source Sans 3', sans-serif; background: var(--bg); color: var(--text-primary); min-height: 100vh; }
  .app-wrapper { min-height: 100vh; display: flex; flex-direction: column; }

  /* HEADER */
  .header { background: var(--navy); border-bottom: 3px solid var(--accent); position: sticky; top: 0; z-index: 100; }
  .header-inner { max-width: 1000px; margin: 0 auto; padding: 0 40px; height: 72px; display: flex; align-items: center; justify-content: space-between; }
  .header-brand { display: flex; align-items: center; gap: 14px; }
  .header-icon { width: 38px; height: 38px; background: var(--accent); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .header-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #fff; }
  .header-subtitle { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 300; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; }
  .header-badge { font-size: 11px; font-weight: 600; color: var(--accent); border: 1px solid rgba(201,168,76,0.4); padding: 4px 10px; border-radius: 20px; letter-spacing: 0.06em; text-transform: uppercase; }

  /* NAV TABS */
  .nav-tabs { background: var(--navy-mid); border-bottom: 1px solid rgba(255,255,255,0.08); }
  .nav-tabs-inner { max-width: 1000px; margin: 0 auto; padding: 0 40px; display: flex; gap: 4px; }
  .nav-tab { padding: 12px 20px; font-family: 'Source Sans 3', sans-serif; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.5); border: none; background: none; cursor: pointer; border-bottom: 3px solid transparent; letter-spacing: 0.05em; text-transform: uppercase; transition: all 0.15s; }
  .nav-tab:hover { color: rgba(255,255,255,0.8); }
  .nav-tab.active { color: var(--accent); border-bottom-color: var(--accent); }

  /* MAIN */
  .main { max-width: 1000px; margin: 0 auto; padding: 48px 40px; flex: 1; width: 100%; }
  .tab-panel { display: none; }
  .tab-panel.active { display: block; }

  .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }

  /* CARDS */
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-md); padding: 32px; margin-bottom: 28px; }
  .card-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: var(--navy); margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .card-title-icon { width: 28px; height: 28px; background: rgba(201,168,76,0.12); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px; }

  .input-row { display: grid; grid-template-columns: 1fr auto auto; gap: 12px; align-items: center; }
  .input-field { width: 100%; border: 1px solid var(--border); border-radius: var(--radius); padding: 11px 16px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; color: var(--text-primary); background: var(--bg); outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
  .input-field:focus { border-color: var(--navy-light); box-shadow: 0 0 0 3px rgba(15,32,68,0.08); background: #fff; }
  .input-field::placeholder { color: var(--text-muted); }
  .textarea-field { width: 100%; border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; color: var(--text-primary); background: var(--bg); resize: vertical; outline: none; line-height: 1.6; transition: border-color 0.15s, box-shadow 0.15s; }
  .textarea-field:focus { border-color: var(--navy-light); box-shadow: 0 0 0 3px rgba(15,32,68,0.08); background: #fff; }
  .textarea-field::placeholder { color: var(--text-muted); }

  /* BUTTONS */
  .btn-primary { background: var(--navy); color: #fff; border: none; padding: 11px 24px; border-radius: var(--radius); font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; letter-spacing: 0.04em; transition: background 0.15s, transform 0.1s, box-shadow 0.15s; white-space: nowrap; box-shadow: var(--shadow-sm); }
  .btn-primary:hover { background: var(--navy-light); box-shadow: var(--shadow-md); transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .btn-secondary { background: transparent; color: var(--navy); border: 1.5px solid var(--navy); padding: 10px 20px; border-radius: var(--radius); font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; letter-spacing: 0.04em; transition: all 0.15s; white-space: nowrap; }
  .btn-secondary:hover { background: var(--navy); color: #fff; transform: translateY(-1px); }
  .btn-accent { background: var(--accent); color: var(--navy); border: none; padding: 11px 24px; border-radius: var(--radius); font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; letter-spacing: 0.04em; transition: all 0.15s; white-space: nowrap; }
  .btn-accent:hover { background: var(--accent-light); transform: translateY(-1px); }
  .btn-accent:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .loading-bar { margin-top: 20px; display: flex; align-items: center; gap: 12px; color: var(--navy-mid); font-size: 14px; font-weight: 500; }
  .spinner { width: 18px; height: 18px; border: 2px solid rgba(15,32,68,0.15); border-top-color: var(--navy); border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .grade-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 24px; }
  .grade-item { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 18px; }
  .grade-item.total { grid-column: span 2; background: var(--navy); border-color: var(--navy); }
  .grade-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
  .grade-item.total .grade-label { color: rgba(255,255,255,0.5); }
  .grade-value { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--navy); margin-top: 4px; }
  .grade-item.total .grade-value { color: var(--accent); font-size: 28px; }
  .grade-feedback { background: rgba(201,168,76,0.08); border-left: 3px solid var(--accent); border-radius: 0 var(--radius) var(--radius) 0; padding: 16px 20px; font-size: 15px; color: var(--text-secondary); line-height: 1.65; }

  .results-grid { display: flex; flex-direction: column; gap: 24px; }
  .result-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); overflow: hidden; animation: fadeUp 0.3s ease both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .result-header { background: var(--navy); padding: 14px 28px; display: flex; align-items: center; gap: 10px; }
  .result-header-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 600; color: #fff; }
  .result-body { padding: 24px 28px; }
  .char-item, .theme-item { padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 15px; line-height: 1.6; color: var(--text-secondary); }
  .char-item:last-child, .theme-item:last-child { border-bottom: none; }
  .item-name { font-weight: 600; color: var(--text-primary); margin-right: 6px; }
  .quote-block { border: 1px solid #dce3ef; border-radius: var(--radius); padding: 20px 24px; background: #f8f9fc; margin-bottom: 14px; }
  .quote-block:last-child { margin-bottom: 0; }
  .quote-text { font-family: 'Playfair Display', serif; font-size: 16px; font-style: italic; color: var(--navy); line-height: 1.65; margin-bottom: 6px; }
  .quote-speaker { font-size: 13px; color: var(--text-muted); font-weight: 500; margin-bottom: 10px; }
  .quote-sig { font-size: 14px; color: var(--text-secondary); line-height: 1.55; }
  .thesis-text { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 600; color: var(--navy); line-height: 1.7; background: rgba(201,168,76,0.07); border-left: 4px solid var(--accent); padding: 16px 22px; border-radius: 0 var(--radius) var(--radius) 0; }
  .synopsis-text { font-size: 15px; color: var(--text-secondary); line-height: 1.75; }

  /* ── TRIVIA ── */
  .trivia-scoreboard { background: var(--navy); border-radius: var(--radius-lg); padding: 24px 32px; margin-bottom: 28px; display: grid; grid-template-columns: repeat(3, 1fr); position: relative; overflow: hidden; }
  .trivia-scoreboard::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 80px); }
  .score-block { text-align: center; position: relative; z-index: 1; }
  .score-block + .score-block { border-left: 1px solid rgba(255,255,255,0.1); }
  .score-block-label { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 6px; }
  .score-block-value { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--accent); line-height: 1; }
  .score-block-value.white { color: #fff; }
  .score-block-sub { font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 4px; }

  .diff-badge { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; }
  .diff-easy     { background: #dcfce7; color: #15803d; }
  .diff-medium   { background: #fef9c3; color: #a16207; }
  .diff-hard     { background: #fee2e2; color: #b91c1c; }
  .diff-fiendish { background: #ede9fe; color: #6d28d9; }

  .cat-pill { display: inline-block; font-size: 11px; font-weight: 600; color: var(--text-muted); background: var(--bg); border: 1px solid var(--border); border-radius: 20px; padding: 3px 10px; }
  .points-tag { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--accent); }

  .trivia-question-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
  .trivia-question-text { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 600; color: var(--navy); line-height: 1.45; margin-bottom: 28px; }

  .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .option-btn { background: var(--bg); border: 2px solid var(--border); border-radius: var(--radius); padding: 16px 20px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 500; color: var(--text-primary); cursor: pointer; text-align: left; transition: all 0.15s; line-height: 1.4; }
  .option-btn:hover:not(:disabled) { border-color: var(--navy-light); background: #fff; transform: translateY(-1px); box-shadow: var(--shadow-sm); }
  .option-btn:disabled { cursor: default; }
  .option-btn.correct { background: var(--success-bg); border-color: var(--success); color: var(--success); font-weight: 600; }
  .option-btn.wrong   { background: var(--error-bg);   border-color: var(--error);   color: var(--error); }

  .trivia-feedback { border-radius: var(--radius); padding: 18px 22px; margin-bottom: 20px; animation: fadeUp 0.25s ease both; }
  .trivia-feedback.correct-fb { background: var(--success-bg); border: 1px solid #bbf7d0; }
  .trivia-feedback.wrong-fb   { background: var(--error-bg);   border: 1px solid #fecaca; }
  .fb-title { font-weight: 700; font-size: 16px; margin-bottom: 6px; }
  .fb-title.correct-fb { color: var(--success); }
  .fb-title.wrong-fb   { color: var(--error); }
  .fb-fact { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-top: 8px; }
  .fb-fact strong { color: var(--text-primary); }

  @keyframes pointsPop { 0% { opacity:0; transform: translateY(-10px) scale(0.8); } 30% { opacity:1; transform: translateY(0) scale(1.1); } 100% { opacity:1; transform: translateY(0) scale(1); } }
  .points-flash { animation: pointsPop 0.4s ease both; display: inline-block; }

  .trivia-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 0; gap: 16px; }
  .trivia-loading-text { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--navy-mid); }
  .trivia-spinner { width: 36px; height: 36px; border: 3px solid rgba(15,32,68,0.1); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.9s linear infinite; }

  .trivia-actions { display: flex; justify-content: space-between; align-items: center; }
  @keyframes pulse { from { transform: scale(1); } to { transform: scale(1.2); } }
  .streak-fire { font-size: 18px; display: inline-block; animation: pulse 1s ease infinite alternate; }

  /* FOOTER */
  .footer { background: var(--navy); border-top: 1px solid rgba(255,255,255,0.08); margin-top: auto; }
  .footer-inner { max-width: 1000px; margin: 0 auto; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; }
  .footer-copy { font-size: 13px; color: rgba(255,255,255,0.4); }
  .footer-mark { font-size: 12px; color: var(--accent); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
`;

// ─── Trivia Component ────────────────────────────────────────────────────────

function TriviaGame() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [pointsFlash, setPointsFlash] = useState(null);

  async function fetchQuestion() {
    setLoading(true);
    setSelected(null);
    setPointsFlash(null);
    try {
      const res = await fetch("/api/trivia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ previousQuestions: previousQuestions.slice(-10) }),
      });
      const data = await res.json();
      setQuestion(data);
      setPreviousQuestions((prev) => [...prev, data.question]);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => { fetchQuestion(); }, []);

  function handleAnswer(option) {
    if (selected) return;
    setSelected(option);
    setQuestionsAnswered((q) => q + 1);
    const correct = option === question.answer;
    if (correct) {
      const streakBonus = streak >= 2 ? Math.floor(question.points * 0.5) : 0;
      const earned = question.points + streakBonus;
      setScore((s) => s + earned);
      setStreak((s) => s + 1);
      setPointsFlash({ earned, bonus: streakBonus > 0 });
    } else {
      setStreak(0);
    }
  }

  const diffClass = { easy: "diff-easy", medium: "diff-medium", hard: "diff-hard", fiendish: "diff-fiendish" };

  return (
    <div>
      <div className="trivia-scoreboard">
        <div className="score-block">
          <div className="score-block-label">Score</div>
          <div className="score-block-value">{score.toLocaleString()}</div>
          <div className="score-block-sub">points</div>
        </div>
        <div className="score-block">
          <div className="score-block-label">
            Streak {streak >= 3 && <span className="streak-fire">🔥</span>}
          </div>
          <div className="score-block-value white">{streak}</div>
          <div className="score-block-sub">{streak >= 2 ? "+50% bonus active!" : "build a streak for bonuses"}</div>
        </div>
        <div className="score-block">
          <div className="score-block-label">Answered</div>
          <div className="score-block-value">{questionsAnswered}</div>
          <div className="score-block-sub">questions</div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="trivia-loading">
            <div className="trivia-spinner" />
            <div className="trivia-loading-text">Consulting the literary canon…</div>
          </div>
        ) : question ? (
          <>
            <div className="trivia-question-meta">
              <span className={`diff-badge ${diffClass[question.difficulty] ?? "diff-medium"}`}>
                {question.difficulty}
              </span>
              <span className="cat-pill">{question.category}</span>
              <span style={{ marginLeft: "auto" }}>
                <span className="points-tag">
                  {pointsFlash && selected === question.answer ? (
                    <span className="points-flash">+{pointsFlash.earned}{pointsFlash.bonus ? " 🔥" : ""}</span>
                  ) : (
                    `${question.points} pts`
                  )}
                </span>
              </span>
            </div>

            <div className="trivia-question-text">{question.question}</div>

            <div className="options-grid">
              {question.options?.map((opt, i) => {
                let cls = "option-btn";
                if (selected) {
                  if (opt === question.answer) cls += " correct";
                  else if (opt === selected) cls += " wrong";
                }
                return (
                  <button key={i} className={cls} onClick={() => handleAnswer(opt)} disabled={!!selected}>
                    <span style={{ opacity: 0.4, marginRight: 8, fontSize: 13 }}>{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {selected && (
              <>
                <div className={`trivia-feedback ${selected === question.answer ? "correct-fb" : "wrong-fb"}`}>
                  <div className={`fb-title ${selected === question.answer ? "correct-fb" : "wrong-fb"}`}>
                    {selected === question.answer
                      ? streak >= 2 ? `🔥 Correct! ${streak} in a row!` : "✓ Correct!"
                      : `✗ Not quite — the answer was "${question.answer}"`}
                  </div>
                  {question.funFact && (
                    <div className="fb-fact"><strong>Did you know?</strong> {question.funFact}</div>
                  )}
                </div>
                <div className="trivia-actions">
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    {selected === question.answer ? `+${pointsFlash?.earned ?? question.points} points earned` : "No points this round — keep going!"}
                  </span>
                  <button className="btn-accent" onClick={fetchQuestion}>Next Question →</button>
                </div>
              </>
            )}

            {!selected && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-secondary" style={{ fontSize: 13 }} onClick={fetchQuestion}>Skip</button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
            Failed to load.{" "}<button className="btn-accent" onClick={fetchQuestion}>Try again</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab] = useState("analysis");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [essay, setEssay] = useState("");
  const [grade, setGrade] = useState(null);

  async function gradeEssay() {
    const res = await fetch("/api/grade-essay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ essay, title }),
    });
    const data = await res.json();
    setGrade(data);
  }

  async function handleGenerate() {
    if (!title) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  async function downloadPDF() {
    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AP_Lit_Packet.pdf";
    a.click();
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrapper">

        <header className="header">
          <div className="header-inner">
            <div className="header-brand">
              <div className="header-icon">📖</div>
              <div>
                <div className="header-title">AP Literature Engine</div>
                <div className="header-subtitle">Literary Analysis Platform</div>
              </div>
            </div>
            <div className="header-badge">AP Level</div>
          </div>
        </header>

        <nav className="nav-tabs">
          <div className="nav-tabs-inner">
            {[
              { id: "analysis", label: "📚 Analysis" },
              { id: "grader",   label: "✏️ Essay Grader" },
              { id: "trivia",   label: "🎯 Lit Trivia" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="main">

          {/* ANALYSIS */}
          <div className={`tab-panel ${activeTab === "analysis" ? "active" : ""}`}>
            <div className="section-label">Analysis Generator</div>
            <div className="card">
              <div className="card-title">
                <div className="card-title-icon">✦</div>
                Enter a Literary Title
              </div>
              <div className="input-row">
                <input
                  type="text"
                  placeholder="e.g. The Great Gatsby, Hamlet, 1984…"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  className="input-field"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                />
                <button onClick={handleGenerate} className="btn-primary" disabled={loading}>
                  {loading ? "Generating…" : "Generate"}
                </button>
                <button onClick={downloadPDF} className="btn-secondary" disabled={!result}>
                  ↓ Study Packet
                </button>
              </div>
              {loading && (
                <div className="loading-bar">
                  <div className="spinner" /> Generating literary analysis…
                </div>
              )}
            </div>

            {result && (
              <div className="results-grid">
                <ResultCard icon="📋" title="Synopsis">
                  <p className="synopsis-text">{result.synopsis}</p>
                </ResultCard>
                <ResultCard icon="👤" title="Major Characters">
                  {result.characters?.map((c, i) => (
                    <div className="char-item" key={i}><span className="item-name">{c.name}:</span>{c.description}</div>
                  ))}
                </ResultCard>
                <ResultCard icon="💡" title="Key Themes">
                  {result.themes?.map((t, i) => (
                    <div className="theme-item" key={i}><span className="item-name">{t.theme}:</span>{t.explanation}</div>
                  ))}
                </ResultCard>
                <ResultCard icon="❝" title="Important Quotes">
                  {result.quotes?.map((q, i) => (
                    <div className="quote-block" key={i}>
                      <p className="quote-text">"{q.quote}"</p>
                      <p className="quote-speaker">— {q.speaker}</p>
                      <p className="quote-sig">{q.significance}</p>
                    </div>
                  ))}
                </ResultCard>
                <ResultCard icon="🎯" title="Sample Thesis">
                  <p className="thesis-text">{result.thesis}</p>
                </ResultCard>
              </div>
            )}
          </div>

          {/* ESSAY GRADER */}
          <div className={`tab-panel ${activeTab === "grader" ? "active" : ""}`}>
            <div className="section-label">Essay Grader</div>
            <div className="card">
              <div className="card-title">
                <div className="card-title-icon">✏️</div>
                Submit Essay for Grading
              </div>
              <textarea
                className="textarea-field"
                rows={10}
                placeholder="Paste your essay here…"
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              />
              <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                <button onClick={gradeEssay} className="btn-accent">Grade Essay →</button>
              </div>
            </div>
            {grade && (
              <div className="card">
                <div className="card-title"><div className="card-title-icon">📊</div>Grading Results</div>
                <div className="grade-grid">
                  <div className="grade-item"><div className="grade-label">Grammar</div><div className="grade-value">{grade.grammar}/10</div></div>
                  <div className="grade-item"><div className="grade-label">Originality</div><div className="grade-value">{grade.originality}/10</div></div>
                  <div className="grade-item"><div className="grade-label">Clarity</div><div className="grade-value">{grade.clarity}/10</div></div>
                  <div className="grade-item"><div className="grade-label">Text Fidelity</div><div className="grade-value">{grade.fidelity}/10</div></div>
                  <div className="grade-item total"><div className="grade-label">Total Score</div><div className="grade-value">{grade.total}</div></div>
                </div>
                <div className="grade-feedback">{grade.feedback}</div>
              </div>
            )}
          </div>

          {/* TRIVIA */}
          <div className={`tab-panel ${activeTab === "trivia" ? "active" : ""}`}>
            <div className="section-label">Infinite Literary Trivia</div>
            <TriviaGame />
          </div>

        </main>

        <footer className="footer">
          <div className="footer-inner">
            <span className="footer-copy">AP Literature Engine © 2026</span>
            <span className="footer-mark">Academic Tools</span>
          </div>
        </footer>

      </div>
    </>
  );
}

function ResultCard({ icon, title, children }) {
  return (
    <div className="result-card">
      <div className="result-header">
        <span>{icon}</span>
        <span className="result-header-title">{title}</span>
      </div>
      <div className="result-body">{children}</div>
    </div>
  );
}