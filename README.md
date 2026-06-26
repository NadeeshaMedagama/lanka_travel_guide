# 🌴 Lanka Travel Guide

> Discover Sri Lanka's finest attractions — beaches, history, nature and luxury — in a mobile-first Progressive Web App.

![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=flat-square&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Mobile--First-1572b6?style=flat-square&logo=css3&logoColor=white)
![Router](https://img.shields.io/badge/React_Router-v6-ca4245?style=flat-square&logo=react-router&logoColor=white)
![Assignment](https://img.shields.io/badge/SENG_41293-University_of_Kelaniya-1a7a4a?style=flat-square)

## 🚀 Live Demo
Try the live application here: **https://lanka-travel-guide.vercel.app/**

## About the Project
This is a Mobile Web Application (Track B) built for SENG 41293. It helps tourists explore Sri Lanka with 12 real attractions across 3 categories. Key features include an async REST API, HTML5 Geolocation, localStorage persistence, SPA routing, a fully client-side-validated trip-inquiry form, and full Progressive Web App (offline) support.

## Features
- ✅ Mobile-first responsive grid — 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- ✅ 12 real Sri Lanka attractions across 3 categories: Nature, Historical, Hotels
- ✅ Dynamic category filtering via REST API (json-server mock backend)
- ✅ Rich detail view with full description, opening hours, entry fee, and star rating
- ✅ HTML5 Geolocation API — calculates real-time distance using the Haversine formula
- ✅ Google Maps deep-linking — opens attraction in Google Maps for turn-by-turn navigation
- ✅ ❤️ Favorites bookmarking system — persists across browser sessions via localStorage
- ✅ Asynchronous data fetching via native Fetch API with loading and error states
- ✅ SPA routing with React Router v6 — no full page reloads
- ✅ Touch-optimized UI — 48×48px minimum touch targets (WCAG 2.1 compliant)
- ✅ Zero external CSS dependencies — pure CSS3 Custom Properties (design tokens)
- ✅ Image error fallback handling (broken images show placeholder)
- ✅ "Plan Your Trip" inquiry form with strict client-side validation (text, email, phone, number, select, date, textarea) and accessible inline error messages
- ✅ Installable Progressive Web App with a custom service worker for offline access (cache-first assets, network-first API)
- ✅ Environment-configurable API base URL (`VITE_API_URL`) so the same code runs on localhost or a hosted backend
- ✅ Unit tests (Vitest + Testing Library) covering the Haversine distance util, form validators, and the favorites hook

## Tech Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2 | UI framework |
| Vite | 5.0 | Build tool & dev server |
| React Router | 6.20 | SPA client-side routing |
| json-server | 0.17 | Mock REST API |
| Fetch API | native | Async HTTP requests |
| localStorage | native | Data persistence |
| Geolocation API | native | HTML5 hardware API |
| CSS3 Custom Properties | native | Responsive styling |
| Service Worker + Manifest | native | PWA / offline support |
| Vitest + Testing Library | 2.x / 16.x | Unit & hook testing |

## Getting Started

### Prerequisites
- **Node.js** v18 or v20 LTS — download from [nodejs.org](https://nodejs.org)
- A modern browser (Chrome recommended for Geolocation on localhost)

### Installation
```bash
# Clone the repository (or unzip the downloaded folder)
git clone https://github.com/YOUR_USERNAME/lanka-travel-guide.git
cd lanka-travel-guide

# Install all dependencies
npm install
```

### ⚡ Running the Application
> **IMPORTANT:** To use the json-server mock REST API locally, copy `.env.example` to `.env`, then run **two terminal windows** simultaneously. (Without a `.env`, the app falls back to the static snapshot and needs only Terminal 2.)

**Terminal 1 — Start the Mock REST API:**
```bash
npm run api
# json-server starts on http://localhost:3001
# Test it: open http://localhost:3001/attractions in your browser
```

**Terminal 2 — Start the React Application:**
```bash
npm run dev
# Vite starts on http://localhost:5173
```

Open **Chrome** and navigate to: **http://localhost:5173**

### 🔧 Data Source: Local vs Deployed
Attraction data has two interchangeable sources, both consumed via the async Fetch API:

| Environment | Data source | Setup |
|-------------|-------------|-------|
| **Local dev** (`npm run dev`) | json-server mock **REST API** at `http://localhost:3001` | copy `.env.example` → `.env`, then run `npm run api` |
| **Production / Vercel** | bundled **static snapshot** `public/attractions.json` (auto-regenerated from `db.json` on every build) | none — works with no backend |

Local development reads `VITE_API_URL` from `.env`. Production builds deliberately ignore it and never compile a `localhost` URL into the bundle, so the deployed site is fully self-contained.

> **Why this matters:** `.env` is git-ignored, so it is never pushed to GitHub/Vercel. A hardcoded `localhost` API would therefore fail once deployed — which is exactly why production serves the static snapshot instead.

### ▲ Deploying to Vercel
1. Push to GitHub and import the repo in Vercel (framework preset: **Vite**, build command `npm run build`, output `dist`).
2. **No environment variables are required** — the static snapshot is used automatically.
3. `vercel.json` rewrites all paths to `index.html` so client-side routing (deep links & page refresh) works.

### 📴 Running as a PWA (offline demo)
The service worker is enabled in **production builds only**, so it never interferes with Vite's hot-reload during development. To demo install + offline:
```bash
npm run build
npm run preview        # serves the built PWA, e.g. http://localhost:4173
```
Then in Chrome DevTools → **Application** tab: inspect the **Manifest**, confirm the registered **Service Worker**, tick **Offline**, and reload — the app shell and previously loaded attractions still work.

### 🧪 Running Tests
```bash
npm test               # run the unit test suite once (Vitest)
npm run test:watch     # watch mode
```

## Available Routes
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Attraction grid with hero banner and category filter |
| `/attraction/:id` | Detail | Full attraction info, Geolocation distance, Maps link, Favorite toggle |
| `/favorites` | Favorites | All bookmarked attractions (from localStorage) |
| `/contact` | Plan Your Trip | Validated trip-inquiry form (saved to localStorage) |

## Testing Mobile Responsiveness
1. Open Chrome → go to http://localhost:5173
2. Press F12 to open Developer Tools
3. Click the **Toggle Device Toolbar** icon (or press Ctrl+Shift+M / Cmd+Shift+M on Mac)
4. Test these viewport presets from the dropdown:
   - 📱 iPhone SE — 375×667px (1-column grid)
   - 📱 Pixel 7 — 412×915px (1-column grid)
   - 📱 Samsung Galaxy S20 Ultra — 412×915px
   - 📟 iPad Mini — 768×1024px (2-column grid)
5. Verify: layout adjusts correctly, all buttons are tap-friendly, text scales with viewport

## Browser Compatibility
| Browser | Version | Geolocation | Status |
|---------|---------|-------------|--------|
| Chrome | 90+ | ✅ (use 127.0.0.1) | ✅ Recommended |
| Firefox | 89+ | ✅ | ✅ Supported |
| Safari | 15+ | ✅ (HTTPS only) | ✅ Supported |
| Edge | 90+ | ✅ | ✅ Supported |

> **Geolocation on localhost:** If Chrome blocks location permission, access the app via `http://127.0.0.1:5173` instead of `http://localhost:5173`.

## Project Structure
```text
Lanka_Travel_Guide/
├── README.md
├── .env.example
├── db.json
├── index.html
├── json-server.json
├── package-lock.json
├── package.json
├── vite.config.js
├── public/                     # static assets served at the web root (PWA)
│   ├── icon.svg
│   ├── manifest.webmanifest
│   ├── sw.js                   # custom service worker (offline support)
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── registerSW.js           # registers the service worker (production only)
    ├── components/
    │   ├── AttractionCard/
    │   │   ├── AttractionCard.css
    │   │   └── AttractionCard.jsx
    │   ├── CategoryFilter/
    │   │   ├── CategoryFilter.css
    │   │   └── CategoryFilter.jsx
    │   ├── LoadingSpinner/
    │   │   ├── LoadingSpinner.css
    │   │   └── LoadingSpinner.jsx
    │   └── Navbar/
    │       ├── Navbar.css
    │       └── Navbar.jsx
    ├── hooks/
    │   ├── useFavorites.js
    │   ├── useFavorites.test.jsx
    │   └── useGeolocation.js
    ├── pages/
    │   ├── Contact/
    │   │   ├── Contact.css
    │   │   └── Contact.jsx
    │   ├── Detail/
    │   │   ├── Detail.css
    │   │   └── Detail.jsx
    │   ├── Favorites/
    │   │   ├── Favorites.css
    │   │   └── Favorites.jsx
    │   └── Home/
    │       ├── Home.css
    │       └── Home.jsx
    ├── services/
    │   └── api.js
    ├── test/
    │   └── setup.js
    └── utils/
        ├── distance.js
        ├── distance.test.js
        ├── validators.js
        └── validators.test.js
```

## Assignment Details
| Field | Details |
|-------|---------|
| Course | SENG 41293 — Mobile Web Application Development |
| University | University of Kelaniya, Sri Lanka |
| Faculty | Faculty of Science |
| Degree | BSc Honours in Software Engineering |
| Track | B — Local Tour & Travel Web Guide |
| Submission Deadline | June 26, 2026 |
| Presentation | Via localhost using Chrome DevTools device simulation |

## Troubleshooting

<details>
<summary><strong>Q: Attractions not loading — "Could not load attractions" error.</strong></summary>
<p>A: Make sure <code>npm run api</code> is running in a separate terminal. Visit http://localhost:3001/attractions to verify the API is active.</p>
</details>

<details>
<summary><strong>Q: Category filter shows no results.</strong></summary>
<p>A: Category names are case-sensitive. Ensure <code>db.json</code> uses "Nature", "Historical", "Hotels" (capitalised exactly).</p>
</details>

<details>
<summary><strong>Q: Geolocation permission is denied or blocked.</strong></summary>
<p>A: Access the app via http://127.0.0.1:5173 instead of localhost. Click the padlock icon in Chrome → Site settings → Location → Allow.</p>
</details>

<details>
<summary><strong>Q: Images are broken (showing grey placeholder).</strong></summary>
<p>A: This is expected fallback behaviour. The app handles broken image URLs gracefully. The functionality is not affected.</p>
</details>

<details>
<summary><strong>Q: Build errors on npm install.</strong></summary>
<p>A: Ensure you are using Node.js v18 or v20. Run <code>node --version</code> to check. Delete <code>node_modules</code> and <code>package-lock.json</code> then run <code>npm install</code> again.</p>
</details>
