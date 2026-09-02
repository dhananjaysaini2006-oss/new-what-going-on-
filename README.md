# What's Going On (WGO) – Premier Editorial News Platform

**What's Going On** is an authoritative digital newsroom and media publication platform focusing on Indian national affairs, global geopolitics, market trends, technological innovations, and live Google News wire aggregation.

---

## Key Capabilities

1. **Editorial Publishing Desk & Newsroom Workflow**:
   - Role-based authorization for Editor-in-Chief, Senior Editor, Staff Writer, and Desk Reporter.
   - Comprehensive article management: Drafts, Scheduled Publications, Live Breaking Tickers, and Multi-Category Feeds.
   - Secure HTTP-only cookies with HMAC signing for newsroom session management.

2. **Gemini AI Intelligence Bureau (`@google/genai`)**:
   - **Executive TL;DR**: 3 crisp strategic takeaways, key statistical figures, and sentiment analysis powered by Gemini 3.7 Flash.
   - **ELI5 Explanations**: Accessible, intuitive everyday analogies explaining complex policy and economic events.
   - **Fact Dossiers**: Structured investigative context, timeline milestones, and verified regulatory sources.
   - **Indic Language Translation**: Accurate, idiomatic translations into 7 Indian languages (Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada).

3. **Live Google News Feeds & Feeds Automation**:
   - Real-time RSS sync across major Indian news wires (PTI, ANI, NDTV, The Hindu, Indian Express, Livemint, etc.).
   - Automated RSS feeds (`/rss.xml`), Google News sitemaps (`/sitemap-news.xml`), and standard sitemaps (`/sitemap.xml`).

---

## Storage & Cloud Persistence Architecture

The platform uses **Google Cloud Firestore** (integrated via the Firebase Admin SDK on the server and Firebase Client SDK on the frontend) for zero-loss, scalable persistence across distributed and ephemeral container environments (such as Google Cloud Run).

- **Articles Collection (`articles`)**: All syndicated dispatches and editorial articles are stored durably in Firestore. In-memory indexing ensures sub-millisecond response latency with instant write-through synchronization on every mutation.
- **Users Collection (`users`)**: Editorial and newsroom staff accounts are stored in Firestore with salted `bcrypt` password hashes.
- **Sessions Collection (`sessions`)**: Cryptographically random 256-bit session tokens with automatic expiration cleanup.
- **Client Preferences (`user_bookmarks`, `newsletter_subscriptions`)**: Synchronized client-side with Firestore.

---

## Configuration & AI Studio Secrets Panel

To run the application in the hosted environment with full capabilities, ensure the following secrets and environment variables are configured in the **AI Studio Secrets / Settings Panel**:

| Variable | Description |
| :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini API key used server-side for AI summaries, ELI5 breakdowns, fact dossiers, and Indic translations. |
| `FIREBASE_PROJECT_ID` | The Google Cloud / Firebase Project ID (`essential-guard-367s8`). Automatically resolved from `firebase-applet-config.json`. |
| `FIRESTORE_DATABASE_ID` | The Firestore Database ID (`ai-studio-whatsgoingon-08c9deb8-856d-4b4f-b54d-7f154f149592`). |
| `SESSION_SECRET` | Secret salt used by `cookie-parser` and HMAC token signing for secure session integrity. |
| `PUBLISHER_PASSWORD` | Optional password override for initial seed editor accounts (`editor@whatsgoingon.com`). |
| `APP_URL` | Public base URL of the hosted application. |
