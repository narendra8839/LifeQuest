# LifeQuest — Life RPG Web Application

> **Turn Your Life Into An Adventure** — A tactile, gamified productivity engine that transforms mundane real-world habits into an engaging virtual progression system.

LifeQuest bridges the delay in real-world gratification by introducing instant dopamine feedback loops, quadratic leveling progression, battle streaks, character attribute growth, and an in-game rewards economy.

---

## ⚔️ Core Features & Capabilities

- **Alive & Tactile UI**: Procedural Web Audio API sound synthesizer (chimes for completed quests, coin clinks, and orchestral level-up fanfares) paired with celebratory confetti particle physics.
- **Thematically Cohesive RPG Atmosphere**: Obsidian dark aesthetic with gilded accents (`#ffc659`), amethyst purple (`#ddb8ff`, `#641ea3`), cyan intellect runes (`#57dffe`), and Playfair Display serif typography.
- **Robust Progression Engine**: Non-linear quadratic leveling curve ($XP = \text{Base} \cdot \text{Level} \cdot (\text{Level} + 1) / 2$) ensuring higher levels demand sustained discipline.
- **Aptitude & Attribute System**: Quests sharpen 5 core character traits (Discipline, Intellect, Vitality, Creativity, Strength) displayed via a dynamic 5-sided SVG Radar Chart.
- **Battle Streaks**: Tracks consecutive days of activity with multipliers ($\text{Streak} \times 1.4$) to reward daily consistency.
- **In-Game Rewards Economy**: Earned Gold can be exchanged in the **Rewards Vault & Armory** for cosmetic themes (Arcane, Golden, Night Realm), avatar sigils, titles, and relics.
- **Full-Stack Architecture**: Next.js 15 App Router + Supabase (PostgreSQL, Row Level Security, Supabase Auth) with a resilient hybrid client-side hero store for zero-config demo evaluation.
- **Fully Responsive & Accessible**: Mobile bottom navigation rail, desktop 288px sidebar, keyboard navigable (`Tab`, `Space`, `Enter`, `Escape`), and reduced-motion / high-contrast settings.

---

## 🏰 Core Routes & Screens

| Route           | Screen Name         | Description |
| --------------- | ------------------- | ----------- |
| `/login`        | Hero Authentication | Secure login with instant "⚡ Enter as Guest Hero" demo access |
| `/signup`       | Scroll Inscription  | Adventurer registration |
| `/dashboard`    | Command Center      | Post-login overview with Hero progression meter, today's bounties, streaks & stats |
| `/quests`       | Quest Board         | Full CRUD quest board with category filters, difficulty multipliers, and live search |
| `/character`    | Character Sanctum   | 5-sided SVG Radar chart, equipment relics, chronicle metrics, ascension milestones & shareable dossier |
| `/achievements` | Achievement Codex   | Great Archive progression banner, category tabs, rarity tiers, and lore detail inspection |
| `/settings`     | Realm Configuration | 4 live atmospheric themes (Dark, Night, Arcane, Golden), font scaling, audio & accessibility controls |

> ⚠️ *Note: In strict accordance with the project specifications, the standalone `/shop` route has been excluded from the navigation rail; the in-game economy is seamlessly integrated via the Header Gold Vault / Armory modal.*

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.18+ or Node.js 20+
- npm, yarn, or pnpm

### 2. Clone and Install Dependencies

```bash
git clone https://github.com/narendra8839/LifeQuest.git
cd LifeQuest
npm install
```

### 3. Environment Variables Configuration

Copy the example environment template:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

*(Note: If Supabase credentials are left blank, LifeQuest automatically activates its local persistent storage layer so the entire application can be tested immediately with full persistence!)*

### 4. Database Setup (Supabase)

If deploying with Supabase, run the schema migration and sample seed scripts in your Supabase SQL Editor:
1. `supabase/migrations/001_initial_schema.sql` (Creates tables, RLS policies, and new-user triggers)
2. `supabase/seed.sql` (Seeds initial achievement definitions)

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Production Build & Linting

```bash
npm run build
npm run lint
```

---

## 📐 Architecture & Tech Stack

```
lifequest/
├── app/
│   ├── (auth)/              # Login & Signup flows
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (protected)/         # Authenticated application shell
│   │   ├── dashboard/       # Command Center
│   │   ├── quests/          # Tactical Quest Board
│   │   ├── character/       # Character Sanctum & Radar Chart
│   │   ├── achievements/    # Great Archive Codex
│   │   └── settings/        # Realm Preferences & Themes
│   ├── layout.tsx           # Fonts (Playfair Display + Inter) & Metadata
│   ├── page.tsx             # Root redirect
│   └── globals.css          # Design tokens, themes, glow effects & animations
│
├── components/
│   ├── layout/              # Sidebar (288px), Header (64px), MobileNavigation
│   ├── dashboard/           # PlayerSummary, XPProgress, TodayQuests, StreakCard
│   ├── quests/              # QuestCard, QuestList, CreateQuestModal, EditQuestModal
│   ├── character/           # AttributeRadar (SVG), EquipmentGrid, LifetimeMetrics
│   ├── achievements/        # AchievementGrid, AchievementCard, AchievementDetailModal
│   ├── settings/            # AppearanceSettings (Themes), AccessibilitySettings
│   ├── rewards/             # RewardsVaultModal (Gold economy exchange)
│   └── ui/                  # Button, Card, Modal, Toast, ProgressBar
│
├── lib/
│   ├── stores/heroStore.ts  # Reactive client-side persistent game state
│   ├── utils/audio.ts       # Web Audio API procedural sound engine
│   ├── utils/confetti.ts    # Lightweight CSS celebratory particle engine
│   ├── utils/level.ts       # Quadratic progression math utilities
│   ├── utils/streak.ts      # Calendar streak algorithms
│   └── supabase/            # Browser and server Supabase clients with RLS
```

---

## 🎥 Demonstration Video Walkthrough (Checklist)

When recording the required 90–180 second demonstration video:
1. **Login / Guest Hero Access**: Navigate to `/login` and click *"⚡ Enter as Guest Hero"* (or sign in with email).
2. **Command Center Overview**: Show the hero progression panel, current level (Lvl 12), and XP meter.
3. **Conquer a Quest**: Click *"Conquer Quest"* on Today's Quests — highlight the procedural audio chime, floating particles, and XP/Gold increase.
4. **Quest Board CRUD**: Navigate to `/quests`, inscribe a new quest with custom difficulty and category, and edit/delete it.
5. **Leveling Up**: Complete enough quests to trigger the **Level Up Ascension Modal** with fanfare and particle burst.
6. **Character Sanctum**: Navigate to `/character` to show the dynamic 5-sided SVG Attribute Radar Chart and click *"Share Dossier"* to copy formatted stats.
7. **Rewards Vault**: Click the Gold indicator in the top header to spend Gold in the Vault.
8. **Theme Switching**: Navigate to `/settings` and toggle between Dark, Arcane, and Golden Realms.
9. **Persistence Proof**: Press `F5` (browser refresh) to prove that all data, XP, quests, and levels persist cleanly across reloads.
