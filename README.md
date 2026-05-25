# TeaBrew

TeaBrew is a modern React social media platform prototype with a dark, neon-inspired UI, animated route transitions, and interactive feed components.

## What’s Included

- 🎨 Dark/violet theme with glassmorphism-inspired UI
- ⚡ Page transitions driven by Framer Motion
- 🧠 Global state management with Redux Toolkit
- 📍 Client-side routing via React Router
- 🧪 Login experience with password + OTP options
- 💬 Feed cards with reactions, chatroom preview, and heat metrics
- 🧾 Category filters and interactive post actions
- 🔧 Settings, profile, alerts, games, and discover pages

## Tech Stack

- React 19
- Vite 7
- Redux Toolkit
- React Router DOM
- React Hook Form + Zod
- Framer Motion
- Sonner toast notifications
- Lucide Icons
- Tailwind CSS + custom styles

## Pages / Routes

- `/home` — Main feed with posts and filters
- `/discover` — Discover page for tea-room style content
- `/spill` — Spill feed
- `/hype` — Hype / trending content
- `/alerts` — Notifications view
- `/profile` — Signed-in user profile
- `/user/:username` — Public user profile view
- `/games` — Games content page
- `/settings` — App settings
- `/tea-spread/:postId` — Post detail / tea spread view

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/CruelFury15/TeaBrew.git
cd TeaBrew
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local development URL shown by Vite.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Authentication

Authentication is currently handled locally in the app using Redux actions in `src/store/slices/authSlice.js`.

The login flow supports:
- Email + password
- OTP login field with an OTP generator
- OAuth button placeholders for Google / Apple

> Note: `src/lib/supabase.js` is currently stubbed and does not connect to a real Supabase backend.

## Project Structure

```text
src/
├── assets/            # Images and static media
├── components/        # Reusable UI components
│   ├── alerts/
│   ├── auth/
│   ├── hype/
│   ├── leaderboard/
│   ├── tea/
│   └── ui/
├── lib/               # External integrations / config
├── pages/             # Route page components
├── providers/         # Context / provider wrappers
├── schemas/           # Zod validation schemas
├── store/             # Redux store and slices
└── utils/             # Utility helpers
```

## Available Scripts

- `npm run dev` — Start Vite development server
- `npm run build` — Build production assets
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint checks

## Notes

- The app is designed as a frontend prototype and uses mock state flows for authentication and posts.
- If you want to add backend support, restore the Supabase integration in `src/lib/supabase.js` and wire it into the auth flow.

## License

MIT
