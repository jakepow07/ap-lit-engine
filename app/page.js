"use client";

import { useState, useEffect, useRef } from "react";

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
    --shadow-sm: 0 1px 3px rgba(15,32,68,0.08);
    --shadow-md: 0 4px 16px rgba(15,32,68,0.10), 0 2px 6px rgba(15,32,68,0.06);
    --radius: 6px;
    --radius-lg: 10px;

    --ann-omit:      #fde68a;
    --ann-omit-dark: #92400e;
    --ann-omit-border: #f59e0b;
    --ann-clarity:      #bfdbfe;
    --ann-clarity-dark: #1e3a8a;
    --ann-clarity-border: #3b82f6;
    --ann-para:      #bbf7d0;
    --ann-para-dark: #14532d;
    --ann-para-border: #22c55e;
    --ann-word:      #f5d0fe;
    --ann-word-dark: #581c87;
    --ann-word-border: #a855f7;
    --ann-grammar:        #fee2e2;
    --ann-grammar-dark:   #7f1d1d;
    --ann-grammar-border: #ef4444;
    --ann-rhetoric:        #ffedd5;
    --ann-rhetoric-dark:   #7c2d12;
    --ann-rhetoric-border: #f97316;
    --ann-fallacy:        #e0e7ff;
    --ann-fallacy-dark:   #1e1b4b;
    --ann-fallacy-border: #6366f1;
    --ann-text:        #d1fae5;
    --ann-text-dark:   #064e3b;
    --ann-text-border: #10b981;
  }

   { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Source Sans 3', sans-serif; background: var(--bg); color: var(--text-primary); min-height: 100vh; }
  .app-wrapper { min-height: 100vh; display: flex; flex-direction: column; }

  .header { background: var(--navy); border-bottom: 3px solid var(--accent); position: sticky; top: 0; z-index: 100; }
  .header-inner { max-width: 1000px; margin: 0 auto; padding: 0 40px; height: 72px; display: flex; align-items: center; justify-content: space-between; }
  .header-brand { display: flex; align-items: center; gap: 14px; }
  .header-icon { width: 38px; height: 38px; background: var(--accent); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .header-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #fff; }
  .header-subtitle { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 300; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; }
  .header-badge { font-size: 11px; font-weight: 600; color: var(--accent); border: 1px solid rgba(201,168,76,0.4); padding: 4px 10px; border-radius: 20px; letter-spacing: 0.06em; text-transform: uppercase; }

  .nav-tabs { background: var(--navy-mid); border-bottom: 1px solid rgba(255,255,255,0.08); }
  .nav-tabs-inner { max-width: 1000px; margin: 0 auto; padding: 0 40px; display: flex; gap: 4px; }
  .nav-tab { padding: 12px 20px; font-family: 'Source Sans 3', sans-serif; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.5); border: none; background: none; cursor: pointer; border-bottom: 3px solid transparent; letter-spacing: 0.05em; text-transform: uppercase; transition: all 0.15s; }
  .nav-tab:hover { color: rgba(255,255,255,0.8); }
  .nav-tab.active { color: var(--accent); border-bottom-color: var(--accent); }

  .main { max-width: 1000px; margin: 0 auto; padding: 48px 40px; flex: 1; width: 100%; }
  .tab-panel { display: none; }
  .tab-panel.active { display: block; }

  .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }

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

  .btn-primary { background: var(--navy); color: #fff; border: none; padding: 11px 24px; border-radius: var(--radius); font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; letter-spacing: 0.04em; transition: background 0.15s, transform 0.1s; white-space: nowrap; }
  .btn-primary:hover { background: var(--navy-light); transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .btn-secondary { background: transparent; color: var(--navy); border: 1.5px solid var(--navy); padding: 10px 20px; border-radius: var(--radius); font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; letter-spacing: 0.04em; transition: all 0.15s; white-space: nowrap; }
  .btn-secondary:hover { background: var(--navy); color: #fff; transform: translateY(-1px); }
  .btn-accent { background: var(--accent); color: var(--navy); border: none; padding: 11px 24px; border-radius: var(--radius); font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; letter-spacing: 0.04em; transition: all 0.15s; white-space: nowrap; }
  .btn-accent:hover { background: var(--accent-light); transform: translateY(-1px); }
  .btn-accent:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .loading-bar { margin-top: 20px; display: flex; align-items: center; gap: 12px; color: var(--navy-mid); font-size: 14px; font-weight: 500; }
  .spinner { width: 18px; height: 18px; border: 2px solid rgba(15,32,68,0.15); border-top-color: var(--navy); border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Streaming progress bar */
  .stream-progress { margin-top: 16px; }
  .stream-progress-bar { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; margin-bottom: 8px; }
  .stream-progress-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 0.3s ease; animation: shimmer 1.5s infinite; }
  @keyframes shimmer { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }
  .stream-status { font-size: 13px; color: var(--text-muted); display: flex; align-items: center; gap: 8px; }
  .stream-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse-dot 1s ease infinite alternate; }
  @keyframes pulse-dot { from { opacity: 1; transform: scale(1); } to { opacity: 0.4; transform: scale(0.7); } }

  /* Skeleton loaders */
  .skeleton { background: linear-gradient(90deg, var(--border) 25%, #e8e4dc 50%, var(--border) 75%); background-size: 200% 100%; animation: skeleton-wave 1.5s infinite; border-radius: 4px; }
  @keyframes skeleton-wave { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  /* Results */
  .results-grid { display: flex; flex-direction: column; gap: 24px; }
  .result-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); overflow: hidden; animation: fadeUp 0.4s ease both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
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

  /* Annotation styles */
  .annotator-layout { display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start; }
  .essay-display { background: #fffdf7; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px 36px; font-family: 'Playfair Display', serif; font-size: 16px; line-height: 1.85; color: var(--text-primary); white-space: pre-wrap; word-break: break-word; position: relative; }
  .essay-display mark { border-radius: 3px; padding: 1px 0; cursor: pointer; transition: filter 0.15s; border-bottom: 2px solid transparent; }
  .essay-display mark:hover { filter: brightness(0.92); }
  .essay-display mark.active { filter: brightness(0.88); outline: 2px solid rgba(0,0,0,0.2); outline-offset: 1px; }
  .mark-OMIT_NEEDLESS_WORDS { background: var(--ann-omit); border-bottom-color: var(--ann-omit-border); }
  .mark-CLARITY { background: var(--ann-clarity); border-bottom-color: var(--ann-clarity-border); }
  .mark-PARAGRAPH_STRUCTURE { background: var(--ann-para); border-bottom-color: var(--ann-para-border); }
  .mark-WORD_CHOICE { background: var(--ann-word); border-bottom-color: var(--ann-word-border); }
  .mark-GRAMMAR_ERROR    { background: var(--ann-grammar);  border-bottom-color: var(--ann-grammar-border); }
  .mark-RHETORICAL_ERROR { background: var(--ann-rhetoric); border-bottom-color: var(--ann-rhetoric-border); }
  .mark-LOGICAL_FALLACY  { background: var(--ann-fallacy);  border-bottom-color: var(--ann-fallacy-border); }
  .mark-TEXT_ADHERENCE   { background: var(--ann-text);     border-bottom-color: var(--ann-text-border); }
  .margin-panel { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 10px; max-height: 80vh; overflow-y: auto; }
  .margin-note { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px 14px; cursor: pointer; transition: all 0.15s; border-left: 4px solid transparent; animation: slideIn 0.2s ease both; }
  @keyframes slideIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
  .margin-note:hover { box-shadow: var(--shadow-md); transform: translateX(-2px); }
  .margin-note.active { box-shadow: var(--shadow-md); transform: translateX(-2px); }
  .margin-note.type-OMIT_NEEDLESS_WORDS { border-left-color: var(--ann-omit-border); }
  .margin-note.type-CLARITY { border-left-color: var(--ann-clarity-border); }
  .margin-note.type-PARAGRAPH_STRUCTURE { border-left-color: var(--ann-para-border); }
  .margin-note.type-WORD_CHOICE { border-left-color: var(--ann-word-border); }
  .margin-note.type-GRAMMAR_ERROR    { border-left-color: var(--ann-grammar-border); }
  .margin-note.type-RHETORICAL_ERROR { border-left-color: var(--ann-rhetoric-border); }
  .margin-note.type-LOGICAL_FALLACY  { border-left-color: var(--ann-fallacy-border); }
  .margin-note.type-TEXT_ADHERENCE   { border-left-color: var(--ann-text-border); }
  .note-type-label { font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
  .label-OMIT_NEEDLESS_WORDS { color: var(--ann-omit-dark); }
  .label-CLARITY { color: var(--ann-clarity-dark); }
  .label-PARAGRAPH_STRUCTURE { color: var(--ann-para-dark); }
  .label-WORD_CHOICE { color: var(--ann-word-dark); }
  .label-GRAMMAR_ERROR    { color: var(--ann-grammar-dark); }
  .label-RHETORICAL_ERROR { color: var(--ann-rhetoric-dark); }
  .label-LOGICAL_FALLACY  { color: var(--ann-fallacy-dark); }
  .label-TEXT_ADHERENCE   { color: var(--ann-text-dark); }
  .note-text { font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px; }
  .note-suggestion { font-size: 12px; color: var(--success); font-style: italic; line-height: 1.4; }
  .note-original { font-size: 12px; color: var(--text-muted); text-decoration: line-through; margin-bottom: 2px; }
  .ann-legend { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; }
  .legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-secondary); }
  .legend-swatch { width: 14px; height: 14px; border-radius: 3px; border: 1.5px solid transparent; }
  .sw-omit { background: var(--ann-omit); border-color: var(--ann-omit-border); }
  .sw-clarity { background: var(--ann-clarity); border-color: var(--ann-clarity-border); }
  .sw-para { background: var(--ann-para); border-color: var(--ann-para-border); }
  .sw-word { background: var(--ann-word); border-color: var(--ann-word-border); }
  .sw-grammar  { background: var(--ann-grammar);  border-color: var(--ann-grammar-border); }
  .sw-rhetoric { background: var(--ann-rhetoric); border-color: var(--ann-rhetoric-border); }
  .sw-fallacy  { background: var(--ann-fallacy);  border-color: var(--ann-fallacy-border); }
  .sw-text     { background: var(--ann-text);     border-color: var(--ann-text-border); }
  .score-bar-wrap { margin-bottom: 20px; }
  .score-number { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: var(--navy); }
  .score-label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .score-bar-bg { height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; }
  .score-bar-fill { height: 100%; border-radius: 4px; background: var(--accent); transition: width 1s ease; }
  .summary-text { font-size: 15px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px; font-style: italic; border-left: 3px solid var(--accent); padding-left: 16px; }
  .strengths-list li { font-size: 14px; color: var(--text-secondary); padding: 4px 0 4px 20px; position: relative; line-height: 1.5; }
  .strengths-list li::before { content: '✓'; position: absolute; left: 0; color: var(--success); font-weight: 700; }
  .issues-list li { font-size: 14px; color: var(--text-secondary); padding: 4px 0 4px 20px; position: relative; line-height: 1.5; }
  .issues-list li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
  .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
  .filter-btn { font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 20px; border: 1.5px solid var(--border); background: transparent; cursor: pointer; transition: all 0.15s; color: var(--text-secondary); letter-spacing: 0.04em; }
  .filter-btn:hover { border-color: var(--navy); color: var(--navy); }
  .filter-btn.active-filter { background: var(--navy); color: #fff; border-color: var(--navy); }

  /* Trivia */
  .trivia-scoreboard { background: var(--navy); border-radius: var(--radius-lg); padding: 24px 32px; margin-bottom: 28px; display: grid; grid-template-columns: repeat(3, 1fr); position: relative; overflow: hidden; }
  .trivia-scoreboard::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 80px); }
  .score-block { text-align: center; position: relative; z-index: 1; }
  .score-block + .score-block { border-left: 1px solid rgba(255,255,255,0.1); }
  .score-block-label { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 6px; }
  .score-block-value { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--accent); line-height: 1; }
  .score-block-value.white { color: #fff; }
  .score-block-sub { font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 4px; }
  .diff-badge { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; }
  .diff-easy { background: #dcfce7; color: #15803d; }
  .diff-medium { background: #fef9c3; color: #a16207; }
  .diff-hard { background: #fee2e2; color: #b91c1c; }
  .diff-fiendish { background: #ede9fe; color: #6d28d9; }
  .cat-pill { display: inline-block; font-size: 11px; font-weight: 600; color: var(--text-muted); background: var(--bg); border: 1px solid var(--border); border-radius: 20px; padding: 3px 10px; }
  .points-tag { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--accent); }
  .trivia-question-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
  .trivia-question-text { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 600; color: var(--navy); line-height: 1.45; margin-bottom: 28px; }
  .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .option-btn { background: var(--bg); border: 2px solid var(--border); border-radius: var(--radius); padding: 16px 20px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 500; color: var(--text-primary); cursor: pointer; text-align: left; transition: all 0.15s; line-height: 1.4; }
  .option-btn:hover:not(:disabled) { border-color: var(--navy-light); background: #fff; transform: translateY(-1px); }
  .option-btn:disabled { cursor: default; }
  .option-btn.correct { background: var(--success-bg); border-color: var(--success); color: var(--success); font-weight: 600; }
  .option-btn.wrong { background: var(--error-bg); border-color: var(--error); color: var(--error); }
  .trivia-feedback { border-radius: var(--radius); padding: 18px 22px; margin-bottom: 20px; animation: fadeUp 0.25s ease both; }
  .trivia-feedback.correct-fb { background: var(--success-bg); border: 1px solid #bbf7d0; }
  .trivia-feedback.wrong-fb { background: var(--error-bg); border: 1px solid #fecaca; }
  .fb-title { font-weight: 700; font-size: 16px; margin-bottom: 6px; }
  .fb-title.correct-fb { color: var(--success); }
  .fb-title.wrong-fb { color: var(--error); }
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

  .footer { background: var(--navy); border-top: 1px solid rgba(255,255,255,0.08); margin-top: auto; }
  .footer-inner { max-width: 1000px; margin: 0 auto; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; }
  .footer-copy { font-size: 13px; color: rgba(255,255,255,0.4); }
  .footer-mark { font-size: 12px; color: var(--accent); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }


 

 

  @media (max-width: 640px) {

    /* Header */
    .header-inner {
      padding: 0 16px;
      height: 60px;
    }
    .header-title { font-size: 18px; }
    .header-subtitle { display: none; }
    .header-badge { display: none; }

    /* Nav tabs — scrollable row on mobile */
    .nav-tabs-inner {
      padding: 0 8px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .nav-tabs-inner::-webkit-scrollbar { display: none; }
    .nav-tab {
      padding: 10px 14px;
      font-size: 11px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* Main padding */
    .main { padding: 24px 16px; }

    /* Cards */
    .card { padding: 20px 16px; }
    .card-title { font-size: 17px; }

    /* Input row — stack vertically on mobile */
    .input-row {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .input-row .btn-primary,
    .input-row .btn-secondary {
      width: 100%;
      text-align: center;
      padding: 13px 16px;
    }

    /* Buttons — bigger tap targets */
    .btn-primary,
    .btn-secondary,
    .btn-accent {
      padding: 13px 20px;
      font-size: 15px;
      min-height: 48px;
    }

    /* Input fields — prevent iOS zoom on focus (font-size must be 16px+) */
    .input-field,
    .textarea-field {
      font-size: 16px;
      padding: 13px 14px;
    }

    /* Result cards */
    .result-header { padding: 12px 16px; }
    .result-body { padding: 16px; }
    .quote-block { padding: 14px 16px; }
    .trivia-question-text { font-size: 18px; }


    .options-grid {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .option-btn {
      padding: 14px 16px;
      font-size: 15px;
      min-height: 52px;
    }

   
    .trivia-scoreboard { padding: 16px 12px; }
    .score-block-value { font-size: 24px; }
    .score-block-sub { font-size: 10px; }
    .score-block-label { font-size: 9px; }

   
    .trivia-actions {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
    .trivia-actions .btn-accent {
      width: 100%;
      text-align: center;
    }

   
    .annotator-layout {
      grid-template-columns: 1fr;
    }
    .margin-panel {
      position: static;
      max-height: none;
      overflow-y: visible;
    }
    .essay-display {
      padding: 20px 16px;
      font-size: 15px;
    }

    
    .grade-score-grid {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }

    
    .ann-legend { gap: 10px; }
    .legend-item { font-size: 11px; }

    
    .filter-row {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding-bottom: 4px;
    }
    .filter-row::-webkit-scrollbar { display: none; }
    .filter-btn { flex-shrink: 0; }

    .footer-inner {
      padding: 16px;
      flex-direction: column;
      gap: 4px;
      text-align: center;
    }

   
    .score-summary-grid {
      grid-template-columns: 1fr !important;
    }
  }


  @media (max-width: 768px) {
    .header-inner { padding: 0 24px; }
    .main { padding: 32px 24px; }
    .nav-tabs-inner { padding: 0 16px; }
    .annotator-layout { grid-template-columns: 1fr; }
    .margin-panel { position: static; max-height: none; }
  }
`;

// ─── Annotation helpers ───────────────────────────────────────────────────────
const ANN_CONFIG = {
  OMIT_NEEDLESS_WORDS:  { label: "Omit needless words", short: "Omit",      swClass: "sw-omit" },
  CLARITY:              { label: "Clarity",              short: "Clarity",   swClass: "sw-clarity" },
  PARAGRAPH_STRUCTURE:  { label: "Paragraph structure",  short: "Paragraph", swClass: "sw-para" },
  WORD_CHOICE:          { label: "Word choice",          short: "Word",      swClass: "sw-word" },
  GRAMMAR_ERROR:        { label: "Grammar error",        short: "Grammar",   swClass: "sw-grammar" },
  RHETORICAL_ERROR:     { label: "Rhetorical error",     short: "Rhetoric",  swClass: "sw-rhetoric" },
  LOGICAL_FALLACY:      { label: "Logical fallacy",      short: "Fallacy",   swClass: "sw-fallacy" },
  TEXT_ADHERENCE:       { label: "Text adherence",       short: "Text",      swClass: "sw-text" },
};
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildAnnotatedHTML(essay, annotations, activeId, filter) {
  const filtered = filter === "ALL" ? annotations : annotations.filter((a) => a.type === filter);
  const sorted = [...filtered].sort((a, b) => a.startIndex - b.startIndex);
  const clean = [];
  let cursor = 0;
  for (const ann of sorted) {
    if (ann.startIndex >= cursor) { clean.push(ann); cursor = ann.endIndex; }
  }
  let html = "";
  let pos = 0;
  for (const ann of clean) {
    if (ann.startIndex > pos) html += escapeHtml(essay.slice(pos, ann.startIndex));
    const isActive = ann.id === activeId;
    html += `<mark class="mark-${ann.type} sev-${ann.severity}${isActive ? " active" : ""}" data-id="${ann.id}">${escapeHtml(essay.slice(ann.startIndex, ann.endIndex))}</mark>`;
    pos = ann.endIndex;
  }
  if (pos < essay.length) html += escapeHtml(essay.slice(pos));
  return html;
}

// ─── Streaming progress labels ────────────────────────────────────────────────
const STREAM_LABELS = [
  "Opening the literary archive…",
  "Gathering characters and themes…",
  "Selecting the finest quotes…",
  "Composing thesis statement…",
  "Finalizing analysis…",
];

// ─── Analysis Generator with Streaming ───────────────────────────────────────
function AnalysisGenerator() {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);
  const [streamLabel, setStreamLabel] = useState("");
  const labelTimerRef = useRef(null);

  async function handleGenerate() {
    if (!title.trim()) return;
    setStreaming(true);
    setResult(null);
    setStreamProgress(5);
    setStreamLabel(STREAM_LABELS[0]);

    // Cycle through status labels
    let labelIdx = 0;
    labelTimerRef.current = setInterval(() => {
      labelIdx = Math.min(labelIdx + 1, STREAM_LABELS.length - 1);
      setStreamLabel(STREAM_LABELS[labelIdx]);
      setStreamProgress((p) => Math.min(p + 18, 90));
    }, 3500);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
      }

      // Parse the completed JSON
      const clean = accumulated.replace(/```json|```/g, "").trim();
      const data = JSON.parse(clean);
      setStreamProgress(100);
      setResult(data);
    } catch (err) {
      console.error("Streaming error:", err);
    } finally {
      clearInterval(labelTimerRef.current);
      setStreaming(false);
      setStreamProgress(0);
    }
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
    <div>
      <div className="card">
        <div className="card-title"><div className="card-title-icon">✦</div>Enter a Literary Title</div>
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
          <button onClick={handleGenerate} className="btn-primary" disabled={streaming}>
            {streaming ? "Generating…" : "Generate"}
          </button>
          <button onClick={downloadPDF} className="btn-secondary" disabled={!result || streaming}>
            ↓ Study Packet
          </button>
        </div>

        {streaming && (
          <div className="stream-progress">
            <div className="stream-progress-bar">
              <div className="stream-progress-fill" style={{ width: `${streamProgress}%` }} />
            </div>
            <div className="stream-status">
              <div className="stream-dot" />
              {streamLabel}
            </div>
          </div>
        )}
      </div>

      {/* Skeleton cards while streaming */}
      {streaming && !result && (
        <div className="results-grid">
          {["Synopsis", "Major Characters", "Key Themes", "Important Quotes", "Sample Thesis"].map((t, i) => (
            <div className="result-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="result-header"><span className="result-header-title">{t}</span></div>
              <div className="result-body">
                <div className="skeleton" style={{ height: 14, width: "90%", marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 14, width: "75%", marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 14, width: "82%" }} />
              </div>
            </div>
          ))}
        </div>
      )}

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
  );
}

// ─── Essay Grader ─────────────────────────────────────────────────────────────
function EssayGrader({ title }) {
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const essayRef = useRef(null);

  async function handleAnnotate() {
    if (!essay.trim()) return;
    setLoading(true);
    setResult(null);
    setActiveId(null);
    try {
      const res = await fetch("/api/annotate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essay, title }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  }

  function handleMarkClick(e) {
    const mark = e.target.closest("mark[data-id]");
    if (!mark) { setActiveId(null); return; }
    setActiveId((prev) => (prev === mark.getAttribute("data-id") ? null : mark.getAttribute("data-id")));
  }

  function handleNoteClick(id) {
    setActiveId((prev) => (prev === id ? null : id));
    if (essayRef.current) {
      const mark = essayRef.current.querySelector(`mark[data-id="${id}"]`);
      if (mark) mark.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  const filteredNotes = result
    ? (filter === "ALL" ? result.annotations : result.annotations.filter((a) => a.type === filter))
    : [];

  return (
    <div>
      {!result && (
        <div className="card">
          <div className="card-title"><div className="card-title-icon">✏️</div>Submit Essay for Annotation</div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
            Annotated using the principles of <em>The Elements of Style</em> by William Strunk Jr.
          </p>
          <textarea
            className="textarea-field"
            rows={12}
            placeholder="Paste your essay here…"
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          />
          <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handleAnnotate} className="btn-accent" disabled={loading || !essay.trim()}>
              {loading ? "Analyzing…" : "Annotate Essay →"}
            </button>
          </div>
          {loading && <div className="loading-bar" style={{ marginTop: 16 }}><div className="spinner" /> Applying Elements of Style analysis…</div>}
        </div>
      )}

      {result && (
        <>
          <div className="card" style={{ marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
              <div>
                <div className="score-label" style={{ marginBottom: 8 }}>Overall Score</div>
                <div className="score-number">{result.overallScore}<span style={{ fontSize: 20, color: "var(--text-muted)" }}>/100</span></div>
                <div className="score-bar-bg" style={{ marginTop: 10 }}>
                  <div className="score-bar-fill" style={{ width: `${result.overallScore}%` }} />
                </div>
              </div>
              <div>
                <div className="score-label" style={{ marginBottom: 8 }}>Strengths</div>
                <ul className="strengths-list" style={{ listStyle: "none" }}>
                  {result.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <div className="score-label" style={{ marginBottom: 8 }}>Top Issues</div>
                <ul className="issues-list" style={{ listStyle: "none" }}>
                  {result.topIssues?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
            {result.summary && <div className="summary-text" style={{ marginTop: 20 }}>{result.summary}</div>}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
              <button className="btn-secondary" style={{ fontSize: 13 }} onClick={() => { setResult(null); setEssay(""); }}>← New Essay</button>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div className="ann-legend" style={{ marginBottom: 12 }}>
              {Object.entries(ANN_CONFIG).map(([type, cfg]) => (
                <div className="legend-item" key={type}>
                  <div className={`legend-swatch ${cfg.swClass}`} />
                  <span>{cfg.label}</span>
                </div>
              ))}
            </div>
            <div className="filter-row">
              <button className={`filter-btn ${filter === "ALL" ? "active-filter" : ""}`} onClick={() => setFilter("ALL")}>All ({result.annotations.length})</button>
              {Object.entries(ANN_CONFIG).map(([type, cfg]) => {
                const count = result.annotations.filter((a) => a.type === type).length;
                if (!count) return null;
                return <button key={type} className={`filter-btn ${filter === type ? "active-filter" : ""}`} onClick={() => setFilter(type)}>{cfg.short} ({count})</button>;
              })}
            </div>
          </div>

          <div className="annotator-layout">
            <div className="essay-display" ref={essayRef} onClick={handleMarkClick}
              dangerouslySetInnerHTML={{ __html: buildAnnotatedHTML(essay, result.annotations, activeId, filter) }} />
            <div className="margin-panel">
              {filteredNotes.length === 0 && (
                <div style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", paddingTop: 20 }}>No annotations for this filter.</div>
              )}
              {filteredNotes.map((ann, i) => (
                <div key={ann.id} className={`margin-note type-${ann.type} sev-${ann.severity} ${activeId === ann.id ? "active" : ""}`}
                  onClick={() => handleNoteClick(ann.id)} style={{ animationDelay: `${i * 0.04}s` }}>
                  <div className={`note-type-label label-${ann.type}`}>{ANN_CONFIG[ann.type]?.label}</div>
                  <div className="note-text">{ann.note}</div>
                  {ann.suggestion && (
                    <>
                      <div className="note-original">"{ann.text?.slice(0, 40)}{ann.text?.length > 40 ? "…" : ""}"</div>
                      <div className="note-suggestion">→ "{ann.suggestion?.slice(0, 60)}{ann.suggestion?.length > 60 ? "…" : ""}"</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Trivia ───────────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
// DROP-IN REPLACEMENT for the TriviaGame function in page.js
//
// HOW TO USE:
// 1. Open page.js in your editor
// 2. Find the line:  function TriviaGame() {
// 3. Delete everything from that line down to (and including) the closing }
//    that ends the TriviaGame function
// 4. Paste this entire file's contents in its place
// ─────────────────────────────────────────────────────────────────────────────

// Spaced repetition intervals (in number of questions)
const SR_INTERVALS = {
  WRONG_FIRST:    2,   // Seen once, got it wrong  → repeat after 2 questions
  WRONG_AGAIN:    1,   // Got it wrong again        → repeat after 1 question (next!)
  CORRECT_ONCE:   8,   // Got it right first try    → repeat after 8 questions
  CORRECT_RETRY:  4,   // Got it right after wrong  → repeat after 4 questions
};

function TriviaGame() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [pointsFlash, setPointsFlash] = useState(null);

  // Spaced repetition queue
  // Each entry: { question: <full question object>, dueAt: <questionsAnswered count when to show> }
  const [srQueue, setSrQueue] = useState([]);

  // Track which questions were previously wrong (so we know if a retry was needed)
  const [wrongSet, setWrongSet] = useState(new Set());

  async function fetchQuestion(currentCount) {
    setLoading(true);
    setSelected(null);
    setPointsFlash(null);

    try {
      // Check if any spaced repetition card is due
      const due = srQueue.find((entry) => entry.dueAt <= currentCount);

      let data;
      if (due) {
        // Remove from queue and serve the review question
        setSrQueue((q) => q.filter((e) => e !== due));
        const res = await fetch("/api/trivia", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ repeatQuestion: due.question }),
        });
        data = await res.json();
      } else {
        // Fetch a fresh question, avoiding recent ones
        const res = await fetch("/api/trivia", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            previousQuestions: previousQuestions.slice(-15),
          }),
        });
        data = await res.json();
        setPreviousQuestions((prev) => [...prev, data.question]);
      }

      setQuestion(data);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
    }

  useEffect(() => { fetchQuestion(0); }, []);

  function handleAnswer(option) {
    if (selected || !question) return;

    setSelected(option);
    const newCount = questionsAnswered + 1;
    setQuestionsAnswered(newCount);

    const correct = option === question.answer;
    const wasWrong = wrongSet.has(question.question);

    if (correct) {
      // Award points
      const streakBonus = streak >= 2 ? Math.floor(question.points * 0.5) : 0;
      const earned = question.points + streakBonus;
      setScore((s) => s + earned);
      setStreak((s) => s + 1);
      setPointsFlash({ earned, bonus: streakBonus > 0 });

      // Schedule a future review (correct answers still get reviewed, just later)
      const interval = wasWrong ? SR_INTERVALS.CORRECT_RETRY : SR_INTERVALS.CORRECT_ONCE;
      setSrQueue((q) => [
        ...q,
        { question, dueAt: newCount + interval },
      ]);

      // Remove from wrong set if they got it right
      if (wasWrong) {
        setWrongSet((prev) => {
          const next = new Set(prev);
          next.delete(question.question);
          return next;
        });
      }
    } else {
      // Wrong answer
      setStreak(0);

      // Schedule a sooner review
      const interval = wasWrong ? SR_INTERVALS.WRONG_AGAIN : SR_INTERVALS.WRONG_FIRST;
      setSrQueue((q) => [
        ...q.filter((e) => e.question.question !== question.question), // remove old entry if exists
        { question, dueAt: newCount + interval },
      ]);

      // Mark as wrong
      setWrongSet((prev) => new Set(prev).add(question.question));
    }
  }

  function handleNext() {
    fetchQuestion(questionsAnswered);
  }

  const diffClass = {
    easy: "diff-easy",
    medium: "diff-medium",
    hard: "diff-hard",
    fiendish: "diff-fiendish",
  };

  const reviewDue = srQueue.filter((e) => e.dueAt <= questionsAnswered).length;

  return (
    <div>
      {/* Scoreboard */}
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
          <div className="score-block-sub">
            {streak >= 2 ? "+50% bonus active!" : "build a streak for bonuses"}
          </div>
        </div>
        <div className="score-block">
          <div className="score-block-label">Answered</div>
          <div className="score-block-value">{questionsAnswered}</div>
          <div className="score-block-sub">
            {reviewDue > 0
              ? `${reviewDue} review${reviewDue > 1 ? "s" : ""} queued`
              : srQueue.length > 0
              ? `${srQueue.length} in review queue`
              : "questions"}
          </div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="trivia-loading">
            <div className="trivia-spinner" />
            <div className="trivia-loading-text">
              {reviewDue > 0
                ? "Retrieving a question for review…"
                : "Consulting the literary canon…"}
            </div>
          </div>
        ) : question ? (
          <>
            {/* Question metadata */}
            <div className="trivia-question-meta">
              <span className={`diff-badge ${diffClass[question.difficulty] ?? "diff-medium"}`}>
                {question.difficulty}
              </span>
              <span className="cat-pill">{question.category}</span>

              {/* Review badge */}
              {question.isReview && (
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: wrongSet.has(question.question) ? "#fee2e2" : "#dbeafe",
                  color: wrongSet.has(question.question) ? "#991b1b" : "#1e40af",
                  padding: "3px 10px",
                  borderRadius: 20,
                }}>
                  {wrongSet.has(question.question) ? "⟳ Review — you missed this" : "⟳ Spaced review"}
                </span>
              )}

              <span style={{ marginLeft: "auto" }}>
                <span className="points-tag">
                  {pointsFlash && selected === question.answer ? (
                    <span className="points-flash">
                      +{pointsFlash.earned}{pointsFlash.bonus ? " 🔥" : ""}
                    </span>
                  ) : (
                    `${question.points} pts`
                  )}
                </span>
              </span>
            </div>

            <div className="trivia-question-text">{question.question}</div>

            {/* Answer options */}
            <div className="options-grid">
              {question.options?.map((opt, i) => {
                let cls = "option-btn";
                if (selected) {
                  if (opt === question.answer) cls += " correct";
                  else if (opt === selected) cls += " wrong";
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleAnswer(opt)}
                    disabled={!!selected}
                  >
                    <span style={{ opacity: 0.4, marginRight: 8, fontSize: 13 }}>
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {selected && (
              <>
                <div className={`trivia-feedback ${selected === question.answer ? "correct-fb" : "wrong-fb"}`}>
                  <div className={`fb-title ${selected === question.answer ? "correct-fb" : "wrong-fb"}`}>
                    {selected === question.answer
                      ? streak >= 2
                        ? `🔥 Correct! ${streak} in a row!`
                        : question.isReview
                        ? "✓ Correct — you've got it now!"
                        : "✓ Correct!"
                      : `✗ Not quite — the answer was "${question.answer}"`}
                  </div>

                  {/* Spaced repetition notice */}
                  {selected !== question.answer && (
                    <div style={{
                      fontSize: 13,
                      marginTop: 8,
                      color: "#b91c1c",
                      fontWeight: 600,
                    }}>
                      {wrongSet.has(question.question)
                        ? "You'll see this again next question — keep at it!"
                        : "You'll see this again in 2 questions to help it stick."}
                    </div>
                  )}

                  {selected === question.answer && question.isReview && (
                    <div style={{ fontSize: 13, marginTop: 8, color: "#1a7a4a", fontWeight: 600 }}>
                      Great recall! This question has been retired from your review queue.
                    </div>
                  )}

                  {question.funFact && (
                    <div className="fb-fact">
                      <strong>Did you know?</strong> {question.funFact}
                    </div>
                  )}
                </div>

                <div className="trivia-actions">
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    {selected === question.answer
                      ? `+${pointsFlash?.earned ?? question.points} points earned`
                      : "No points this round — keep going!"}
                    {srQueue.length > 0 && (
                      <span style={{ marginLeft: 10, color: "var(--accent)", fontWeight: 600 }}>
                        {srQueue.length} question{srQueue.length > 1 ? "s" : ""} in review queue
                      </span>
                    )}
                  </span>
                  <button className="btn-accent" onClick={handleNext}>
                    Next Question →
                  </button>
                </div>
              </>
            )}

            {!selected && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  className="btn-secondary"
                  style={{ fontSize: 13 }}
                  onClick={handleNext}
                >
                  Skip
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
            Failed to load.{" "}
            <button className="btn-accent" onClick={() => fetchQuestion(questionsAnswered)}>
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState("analysis");

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
            {[{ id: "analysis", label: "📚 Analysis" }, { id: "grader", label: "✏️ Essay Grader" }, { id: "trivia", label: "🎯 Lit Trivia" }].map((tab) => (
              <button key={tab.id} className={`nav-tab ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
            ))}
          </div>
        </nav>

        <main className="main">
          <div className={`tab-panel ${activeTab === "analysis" ? "active" : ""}`}>
            <div className="section-label">Analysis Generator</div>
            <AnalysisGenerator />
          </div>
          <div className={`tab-panel ${activeTab === "grader" ? "active" : ""}`}>
            <div className="section-label">Essay Grader — Elements of Style</div>
            <EssayGrader />
          </div>
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
      <div className="result-header"><span>{icon}</span><span className="result-header-title">{title}</span></div>
      <div className="result-body">{children}</div>
    </div>
  );
}
