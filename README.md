# LinguBridge — AI Language Translation Tool

An AI internship project: a full-stack, real-time language translator with a
React frontend and a secure Node/Express backend that proxies requests to a
live translation API. No mock data, no hardcoded translations — every
translation you see comes back from a real API call.

## Description

LinguBridge lets a user type text, pick a source and target language, and get
a real translation back instantly. It's built the way a production translation
feature would be: the browser never talks to the translation provider or
holds any API key — it only calls LinguBridge's own backend, which does that
work server-side. This project demonstrates a complete, working three-tier
flow: **React UI → Express API → external translation service**.

## Features

- Enter text and translate between 17 languages
- Source and target language selectors
- One-click **Translate** with real API-backed results
- **Swap Languages** button (also swaps the text already typed/translated)
- **Copy Translation** to clipboard, with a confirmation state
- **Clear** button to reset the input
- **Text-to-Speech** playback of the translated text (browser Web Speech API)
- Loading spinner while a translation is in flight
- Error handling for empty input, same-language selection, network failures,
  and provider/quota errors — each with a clear on-screen message
- Live character counter (2,000 character limit) with a near-limit warning
- **Translation history** for the current session (most recent 25, cleared on
  refresh or with the "Clear history" button)
- Fully responsive layout — desktop, tablet, and mobile
- Keyboard shortcut: `Ctrl`/`⌘` + `Enter` to translate
- Accessible: labeled controls, visible focus states, `aria-live` status
  regions, `prefers-reduced-motion` support

## Technologies

**Frontend**
- React 18 (Vite)
- Plain modern CSS (custom properties, CSS grid/flexbox, no UI framework)
- Web Speech API (`SpeechSynthesis`) for text-to-speech

**Backend**
- Node.js + Express
- `dotenv` for environment variables
- `express-rate-limit` for basic abuse protection
- `cors` for locked-down cross-origin access
- `node-fetch` to call the translation provider server-side

**Translation API**
- [MyMemory Translation API](https://mymemory.translated.net/) — free,
  reliable, and requires **no API key** for normal project-scale use. The
  backend is written so you can swap in any other provider (Google Cloud
  Translation, DeepL, Azure Translator, etc.) by changing `TRANSLATION_API_URL`
  and `TRANSLATION_API_KEY` in `backend/.env` — see `routes/translate.js`.

## Project Structure

```
lingubridge/
├── backend/
│   ├── routes/
│   │   └── translate.js      # POST /api/translate — calls the translation provider
│   ├── server.js             # Express app, middleware, rate limiting
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   ├── TextPanel.jsx
│   │   │   ├── TranslatorWorkspace.jsx
│   │   │   ├── HistoryPanel.jsx
│   │   │   └── Footer.jsx
│   │   ├── utils/
│   │   │   ├── languages.js  # supported language list + codes
│   │   │   └── api.js        # fetch wrapper for /api/translate
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js        # dev proxy: /api → localhost:5000
│   └── package.json
├── .gitignore
└── README.md
```

## Installation Instructions

You'll need [Node.js](https://nodejs.org/) 18+ and npm installed on your
Windows laptop. Check with:

```bash
node -v
npm -v
```

Then, from the extracted project folder, install both apps:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Environment Variable Setup

The backend reads its configuration from a `.env` file (never commit this
file — it's already in `.gitignore`).

```bash
cd backend
copy .env.example .env
```

(On macOS/Linux use `cp .env.example .env` instead.)

Open `backend/.env` and review the values:

```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
TRANSLATION_API_URL=https://api.mymemory.translated.net/get
TRANSLATION_API_EMAIL=
TRANSLATION_API_KEY=
```

The defaults work out of the box with **no signup required**.

## API Setup

This project ships pointed at the free MyMemory Translation API, which needs
no key for normal use (about 5,000 words/day per IP).

- **Optional — raise your free quota:** register a free email at
  <https://mymemory.translated.net/doc/keygen.php> and put it in
  `TRANSLATION_API_EMAIL` to raise the daily limit to 50,000 words/day.
- **Optional — use a different provider:** if you'd rather use Google Cloud
  Translation, DeepL, Azure Translator, or a RapidAPI translation endpoint,
  set `TRANSLATION_API_URL` accordingly and put your key in
  `TRANSLATION_API_KEY`. Because the key is only ever read inside
  `backend/routes/translate.js` on the server, it's never exposed to the
  browser or bundled into frontend code.

## Local Running Instructions

Run the backend and frontend in two separate terminals.

**Terminal 1 — backend:**
```bash
cd backend
npm start
```
You should see `LinguBridge backend running on http://localhost:5000`.

**Terminal 2 — frontend:**
```bash
cd frontend
npm run dev
```
Vite will print a local URL, typically `http://localhost:5173`. Open it in
your browser.

The frontend's dev server proxies `/api/*` calls to the backend automatically
(configured in `frontend/vite.config.js`), so no extra setup is needed.

### Building for production

```bash
cd frontend
npm run build
```
This outputs a static, optimized build to `frontend/dist/`, which you can
serve with any static file host (the backend still needs to run separately
to serve `/api/translate`).

## How to Use

1. Start the backend and frontend as described above.
2. Choose the **From** and **To** languages.
3. Type or paste text into the left panel (up to 2,000 characters).
4. Click **Translate** (or press `Ctrl`/`⌘` + `Enter`).
5. Read the result in the right panel. Use the toolbar icons to **listen**
   to it, **copy** it, or **clear** the input.
6. Use the swap button between the two language dropdowns to reverse the
   translation direction in one click.
7. Scroll down to **Session history** to review everything you've translated
   this session.

## Future Improvements

- Persist translation history to a database or local storage across sessions
- Detect the source language automatically
- Support file/document translation (e.g. `.txt`, `.docx`)
- Add user accounts to save favorite phrases
- Batch translation for multiple sentences at once
- Offline fallback with a cached dictionary for common phrases
- Add automated tests (frontend component tests + backend API tests)
