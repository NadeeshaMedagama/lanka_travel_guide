# 🌴 Lanka Travel Guide

> Discover Sri Lanka's finest attractions — beaches, history, nature and luxury — in a mobile-first Progressive Web App.

![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=flat-square&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Mobile--First-1572b6?style=flat-square&logo=css3&logoColor=white)
![Router](https://img.shields.io/badge/React_Router-v6-ca4245?style=flat-square&logo=react-router&logoColor=white)
![Assignment](https://img.shields.io/badge/SENG_41293-University_of_Kelaniya-1a7a4a?style=flat-square)

## About the Project
This is a Mobile Web Application (Track B) built for SENG 41293. It helps tourists explore Sri Lanka with 12 real attractions across 3 categories. Key features include an async REST API, HTML5 Geolocation, localStorage persistence, and SPA routing.

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
> **IMPORTANT:** You need **two terminal windows** running simultaneously.

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

## Available Routes
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Attraction grid with hero banner and category filter |
| `/attraction/:id` | Detail | Full attraction info, Geolocation distance, Maps link, Favorite toggle |
| `/favorites` | Favorites | All bookmarked attractions (from localStorage) |

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
├── db.json
├── index.html
├── json-server.json
├── package-lock.json
├── package.json
├── vite.config.js
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
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
    │   └── useGeolocation.js
    ├── pages/
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
    └── utils/
        └── distance.js
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
