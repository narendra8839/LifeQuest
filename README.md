# LifeQuest

> **Gamify Your Life** — Turn real tasks into epic quests. Earn XP, level up, conquer your goals.

LifeQuest is a gamified productivity/RPG application built with **Next.js 15 App Router**, **Supabase**, and **Tailwind CSS**.

---

## Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Framework     | Next.js 15 (App Router)             |
| Language      | TypeScript                          |
| Styling       | Tailwind CSS v4                     |
| Auth & DB     | Supabase (Auth + PostgreSQL + RLS)  |
| Icons         | Material Symbols + Lucide React     |
| Deployment    | Vercel                              |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your Supabase project credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set up the database

In your Supabase project, run the migration SQL:

```
supabase/migrations/001_initial_schema.sql
```

Optionally seed sample achievements:

```
supabase/seed.sql
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
lifequest/
├── app/
│   ├── (auth)/              # Login & Signup screens (no sidebar)
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (protected)/         # Authenticated app screens
│   │   ├── dashboard/       # Command Center
│   │   ├── quests/          # Quest Board
│   │   ├── character/       # Character Sanctum
│   │   ├── achievements/    # Achievement Codex
│   │   └── settings/        # Realm Settings
│   ├── layout.tsx           # Root layout (fonts, metadata)
│   ├── page.tsx             # Redirects → /dashboard
│   └── globals.css          # Global styles + RPG utilities
│
├── components/
│   ├── layout/              # Sidebar, Header, MobileNavigation, ProtectedLayout
│   ├── dashboard/           # Dashboard-specific components
│   ├── quests/              # Quest CRUD components & modals
│   ├── character/           # Character profile, attributes, level-up
│   ├── achievements/        # Achievement grid, progress, detail modal
│   ├── settings/            # Settings section components
│   └── ui/                  # Reusable primitives (Button, Card, Modal, etc.)
│
├── lib/
│   ├── supabase/            # Browser client, server client, middleware helper
│   ├── services/            # All Supabase queries (auth, quest, profile, etc.)
│   ├── utils/               # Pure RPG calculations (xp, level, streak, achievements)
│   └── constants.ts         # XP rewards, routes, DB table names
│
├── hooks/                   # React hooks (useAuth, useQuests, useProfile, etc.)
├── types/                   # TypeScript types for all DB entities
├── supabase/
│   ├── migrations/          # SQL schema migrations
│   └── seed.sql             # Sample achievement data
├── public/                  # Static assets
└── middleware.ts             # Auth route protection
```

---

## Routes

| URL            | Screen              | Auth Required |
| -------------- | ------------------- | ------------- |
| `/login`       | Login               | ❌            |
| `/signup`      | Signup              | ❌            |
| `/dashboard`   | Command Center      | ✅            |
| `/quests`      | Quest Board         | ✅            |
| `/character`   | Character Sanctum   | ✅            |
| `/achievements`| Achievement Codex   | ✅            |
| `/settings`    | Realm Settings      | ✅            |

> ⚠️ There is **no `/shop`** route. Guild Shop has been intentionally excluded.

---

## Environment Variables

| Variable                        | Description                            |
| ------------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL              |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key          |
| `NEXT_PUBLIC_SITE_URL`          | App base URL (for auth email redirects)|

---

## Architecture Principles

1. **No Supabase queries in UI components** — all DB access goes through `lib/services/`
2. **Typed everywhere** — all DB shapes derived from `types/database.ts`
3. **Pure utility functions** — XP/level/streak calculations in `lib/utils/` with no side effects
4. **Separate Supabase clients** — browser client for Client Components, server client for Server Components/Route Handlers
5. **Row-Level Security** — every table enforces user-scoped access via Supabase RLS policies

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repository in Vercel
3. Set the three environment variables in Vercel project settings
4. Deploy — Vercel auto-detects Next.js

---

## Design System

LifeQuest uses a **dark fantasy RPG aesthetic**:

- **Background**: Near-black navy (`#0a0b14`)
- **Primary**: Gold (`#f59e0b`) — XP, rewards, headings
- **Secondary**: Purple (`#a855f7`) — magic, attributes
- **Tertiary**: Cyan (`#06b6d4`) — tech, intellect
- **Typography**: Playfair Display (headings) + Inter (body)
- **Icons**: Material Symbols Rounded
