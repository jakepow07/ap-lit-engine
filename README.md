# AP Literature Engine

An AP Literature analysis and essay grading tool powered by **Anthropic's Claude API**.

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Add your API key
Open `.env.local` and replace the placeholder with your real key:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```
Get your key at: https://console.anthropic.com/settings/keys

### 3. Run the dev server
```bash
npm run dev
```
Then open http://localhost:3000

---

## Project Structure

```
ap-lit-engine/
├── app/
│   ├── layout.js                   # Root layout
│   ├── page.js                     # Main UI (Home component)
│   └── api/
│       ├── generate/
│       │   └── route.js            # Literary analysis via Claude
│       ├── grade-essay/
│       │   └── route.js            # Essay grading via Claude
│       └── generate-pdf/
│           └── route.js            # PDF generation via pdfkit
├── .env.local                      # Your API key (never commit this)
├── next.config.mjs
└── package.json
```

---

## API Routes

| Route | Input | Output |
|---|---|---|
| `POST /api/generate` | `{ title }` | `{ synopsis, characters, themes, quotes, thesis }` |
| `POST /api/grade-essay` | `{ essay, title? }` | `{ grammar, originality, clarity, fidelity, total, feedback }` |
| `POST /api/generate-pdf` | full result object | PDF binary download |

---

## Tips

- **Swap model for testing:** Replace `claude-opus-4-6` with `claude-haiku-4-5-20251001` in the route files for faster, cheaper responses during development.
- **API key is server-side only** — it's never exposed to the browser.
- The `.gitignore` already excludes `.env.local` so your key won't be accidentally committed.
# ap-lit-engine
