# Fire Horse 2026 Forecast MVP

A self-contained web app that generates deterministic, Chinese-metaphysics-inspired 2026 forecasts.

## What it includes

- Inputs:
  - Name
  - Date of birth
  - Country of residence
  - Optional: city/timezone, birth time, gender
- Flow:
  - User fills the form on `index.html`
  - On click of **Generate 2026 Forecast**, app computes deterministic forecast
  - App redirects to `report.html` and displays a clear, sectioned report
- Outputs:
  - Career
  - Relationships
  - Money
  - Health / energy
  - Key months
  - Do / Avoid actions
  - Confidence + assumptions
  - Horse-year date note (lunar-year method)
- Guardrails:
  - Entertainment/self-reflection disclaimer
  - No medical/legal/financial certainty claims
  - Explicit precision warning when birth time/timezone are missing

## Files

- `index.html`: input form page
- `report.html`: forecast report page
- `styles.css`: shared styling (desktop + mobile)
- `forecast-engine.js`: deterministic rules engine
- `app.js`: form submit + redirect handler
- `report.js`: report-page rendering

## Run locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Make it public (share with others)

This app is static HTML/CSS/JS, so deployment is simple.

### Option 1: Render

1. Push this project to GitHub.
2. In Render, click **New +** -> **Blueprint**.
3. Connect your GitHub repo.
4. Render will detect `render.yaml`.
5. Deploy and copy the generated `https://...onrender.com` URL.

`render.yaml` is already included.

### Option 2: Vercel (quickest)

1. Push this project to GitHub.
2. Import the repo in Vercel.
3. Framework preset: `Other`.
4. Build command: empty.
5. Output directory: `.`
6. Deploy.

`vercel.json` is already included.

### Option 3: Netlify

1. Push to GitHub.
2. In Netlify, **Add new site** -> **Import from Git**.
3. Build command: empty.
4. Publish directory: `.`
5. Deploy.

`netlify.toml` is already included.

### Option 4: GitHub Pages

A workflow is already included at `.github/workflows/deploy-pages.yml`.

1. Push to `main` branch.
2. In GitHub repo settings -> **Pages**:
   - Source: **GitHub Actions**
3. Wait for action `Deploy static site to GitHub Pages` to complete.
4. Share the generated Pages URL.

## Architecture

This MVP uses **Option A (rules-based engine)** and includes a deterministic I-Ching-style mapping seed.

- Deterministic profile attributes:
  - Birth element from DOB day-of-year mapping
  - Birth-year pillar from Gregorian year index
  - Fixed 2026 pillar = Bing Wu (Fire Horse)
- Narrative sections are assembled directly from rule tables (no LLM dependency).
- Forecast payload is passed from form page to report page via `sessionStorage`.

## Next upgrades (v1)

- Add exact timezone validation and IANA timezone picker
- Persist `UserProfile`, `MetaphysicsProfile`, `Forecast2026` in Postgres
- Add API endpoints (`/computeProfile`, `/forecast/2026`)
- Add birth-time-aware Zi Wei calculations with calendar conversion tables
