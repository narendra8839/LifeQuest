# LIFEQUEST — Achievements Codex
## Antigravity Implementation Specification

> **Build this page from the supplied Stitch Achievement HTML.**
>
> The Stitch HTML is the **visual source of truth**. This Markdown is the **implementation source of truth** for converting the prototype into the existing LIFEQUEST application.
>
> Do not redesign the screen. Reproduce the Stitch UI closely, then replace prototype/static data and vanilla JavaScript with the existing Next.js/React/Supabase architecture.

---

# 1. Project Context

LIFEQUEST is a gamified productivity/RPG application.

The application turns real-life tasks into quests and rewards users with:

- XP
- Levels
- Streaks
- Gold
- Character attributes
- Achievements
- Titles/badges

This screen is the user's **Achievement Codex**.

The achievement page must feel like an RPG achievement/archive system, not a generic admin dashboard.

---

# 2. Finalized Tech Stack

Use the existing LIFEQUEST stack:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Supabase**
  - Supabase Auth
  - PostgreSQL
  - Row Level Security
- **Material Symbols Outlined**
- **Inter**
- **Playfair Display**

Do not introduce another frontend framework.

Do not replace Tailwind.

Do not add unnecessary dependencies.

---

# 3. Route

Implement:

```text
/achievements
```

The route must be protected.

Unauthenticated users should be redirected using the project's existing auth mechanism.

Do not create a second authentication implementation.

---

# 4. Critical Product Scope Rule

The Stitch prototype contains a **Guild Shop / Guild Treasury** navigation item and a link:

```text
View in Guild Treasury
```

The final LIFEQUEST product decision is:

## Guild Shop is REMOVED.

Therefore:

- Do not implement `/shop`.
- Do not create a Guild Shop page.
- Do not add Guild Shop to navigation.
- Do not make `View in Guild Treasury` navigate to `/shop`.
- Replace that action with a safe alternative or remove it if necessary.
- The Achievement page must still display the **Ascended Rewards Unlocked** section because it is part of the visual design, but it must not depend on a Shop implementation.

This is important because the Shop/Guild system is intentionally out of scope for the one-day implementation.

---

# 5. Stitch Visual Source

The supplied Stitch HTML defines:

- dark RPG layout
- 288px sidebar
- 64px fixed header
- 1440px max content width
- Achievement Codex header
- Codex Rank card
- Great Archive Progression banner
- progress bar
- four summary counters
- category tabs
- filter chips
- sorting indicator
- responsive achievement grid
- achievement cards
- artifact/reward gallery
- achievement detail modal
- mobile sidebar drawer

Preserve these elements.

The HTML currently uses:

- static demo values
- inline styles
- vanilla DOM manipulation
- `onclick`
- `alert()`

Convert those into React state, props, and services.

---

# 6. LIFEQUEST Design Tokens

Use the existing LIFEQUEST theme.

```text
surface: #111318
surface-container-lowest: #0c0e13
surface-container-low: #1a1b21
surface-container: #1e1f25
surface-container-high: #282a2f
surface-container-highest: #33353a
surface-bright: #37393f

primary: #ffc659
primary-container: #e5a92b

secondary: #ddb8ff
secondary-container: #641ea3

tertiary: #57dffe
tertiary-container: #2dc3e1

error: #ffb4ab
error-container: #93000a

on-surface: #e2e2e9
on-surface-variant: #d4c4ae

outline: #9d8f7b
outline-variant: #504534
```

Preserve the gold/purple/cyan/error accent system.

---

# 7. Typography

### Playfair Display

Use for:

- `Achievements`
- major section headings
- large achievement/stat values

### Inter

Use for:

- navigation
- descriptions
- metadata
- labels
- buttons
- filters
- tabs

Preserve the uppercase/caps styling used by Stitch.

---

# 8. Global Sidebar

Reuse the application's existing sidebar.

Desktop:

```text
288px / w-72
```

Navigation should be:

```text
Dashboard
Quests
Character
Achievements
Settings
```

Achievements is the active route.

Active styling:

```text
bg-secondary-container
text-on-secondary-container
purple glow
```

Bottom:

```text
Help & Codices
Log Out
```

## Do not show:

```text
Guild Shop
```

Remove it from the shared sidebar globally if it still exists.

The supplied HTML contains Guild Shop, but this is explicitly overridden by the finalized product scope.

---

# 9. Global Header

Reuse the existing LIFEQUEST header.

Desktop:

```text
left = sidebar
right = application content
height = 64px
```

Header contains:

### Gold

Prototype:

```text
1,240 Gold
```

### Streak

Prototype:

```text
7 Day Streak
```

### Notifications

Notification icon with small cyan indicator.

### User

Prototype:

```text
Arjun
Lvl 12 Warrior-Scholar
```

All of these are prototype values.

Production values should come from the authenticated user's application data.

Do not hardcode them in the component.

---

# 10. Page Container

Desktop maximum width:

```text
1440px
```

Use the Stitch spacing system.

The content begins below the fixed header.

Suggested structure:

```tsx
<main>
  <div className="max-w-[1440px] mx-auto">
    ...
  </div>
</main>
```

Preserve mobile horizontal padding.

---

# 11. Achievement Page Header

Top eyebrow:

```text
Codex Memoria • Record of the Ascended
```

Icon:

```text
auto_stories
```

Main title:

```text
Achievements
```

Description:

```text
Every quest leaves a permanent mark upon the annals of time. Catalog your heroic triumphs, unearth secret boons, and elevate your standing among the guild lorekeepers.
```

Do not rewrite the visual hierarchy.

---

# 12. Codex Rank Status Card

The top-right header card contains:

Icon:

```text
history_edu
```

Label:

```text
CODEX RANK STATUS
```

Title:

```text
Tome-Keeper Tier III
```

Points:

```text
1,850 Codex Points Earned
```

These are prototype values.

In production:

```text
codexRank
codexPoints
```

should be derived from the user's achievement/progression data.

---

# 13. Great Archive Progression Banner

Main banner:

```text
Great Archive Progression
```

Icon:

```text
workspace_premium
```

Prototype:

```text
24 / 60 UNLOCKED
(40% Completion)
```

Progress bar:

```text
40%
```

The production implementation must calculate:

```ts
unlockedCount / totalAchievementCount
```

Do not hardcode 40%.

---

# 14. Progression Counter Ribbon

Display four counters.

### Unlocked

Prototype:

```text
24
Unlocked
```

Icon:

```text
emoji_events
```

Accent:

```text
primary
```

### Locked

Prototype:

```text
36
Locked
```

Icon:

```text
lock
```

Accent:

```text
outline
```

### Rare Feats

Prototype:

```text
6
Rare Feats
```

Icon:

```text
hotel_class
```

Accent:

```text
tertiary
```

### Legendary

Prototype:

```text
2
Legendary
```

Icon:

```text
crown
```

Accent:

```text
secondary
```

All counts should be derived from the achievement collection.

---

# 15. Achievement Data Model

Create a central type.

Example:

```ts
type AchievementStatus =
  | "unlocked"
  | "in_progress"
  | "locked";

type AchievementRarity =
  | "common"
  | "rare"
  | "legendary"
  | "secret";

interface Achievement {
  id: string;
  title: string;
  category: string;
  attribute?: string;
  description: string;
  quote?: string;

  icon: string;

  status: AchievementStatus;
  rarity: AchievementRarity;

  currentProgress: number;
  targetProgress: number;

  xpReward?: number;
  goldReward?: number;
  itemReward?: string;

  unlockedAt?: string;

  isSecret?: boolean;
}
```

Adapt this to the existing database/types if they already exist.

Do not duplicate an existing achievement type.

---

# 16. Category Tabs

Implement horizontally scrollable category tabs.

Tabs from Stitch:

```text
ALL       60
QUESTS    18
STREAKS   12
LEVEL     10
DISCIPLINE 12
EXPLORATION 8
```

The exact counts must be calculated from the achievement dataset.

Active tab:

```text
ALL
```

Active styling:

```text
secondary-container
text-on-secondary-container
purple glow
```

Inactive:

```text
surface-container
text-on-surface-variant
```

Clicking a category should filter the achievement grid.

---

# 17. Category Filter Logic

Example:

```ts
selectedCategory === "ALL"
  ? allAchievements
  : achievements.filter(...)
```

Do not reload the entire page when switching categories.

Use client-side filtering over already loaded achievement data where practical.

If the dataset becomes large, pagination can be introduced later.

For the current implementation, keep it simple.

---

# 18. Quick Filter Chips

Implement:

```text
Show All
Unlocked Only (24)
In Progress (18)
Secret Feats (4)
```

These must be functional.

### Show All

Displays achievements matching the selected category.

### Unlocked Only

Displays:

```text
status === "unlocked"
```

### In Progress

Displays:

```text
status === "in_progress"
```

### Secret Feats

Displays:

```text
isSecret === true
```

Counts must be dynamic.

---

# 19. Sort Indicator

Stitch displays:

```text
Sort by: Recency & Rarity
```

Icon:

```text
sort
```

For the first implementation, implement this as a real sort control if simple.

Recommended sort order:

1. recently unlocked
2. in-progress
3. rare/legendary
4. locked

If an existing sorting system exists, reuse it.

Do not build a complicated sorting UI.

---

# 20. Achievement Grid

Desktop:

```text
4 columns
```

Tablet:

```text
2 columns
```

Mobile:

```text
1 column
```

Stitch:

```html
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

Gap:

```text
gutter-desktop
```

Achievement cards must have equal visual structure.

---

# 21. Achievement Card — Shared Structure

Every achievement card contains:

```text
Icon
Status Badge
Category Label
Title
Description
Progress
Reward
Time/status metadata
```

Use:

```text
components/achievements/AchievementCard.tsx
```

The entire card is clickable.

Do not use:

```html
onclick="..."
```

Use React:

```tsx
onClick={() => setSelectedAchievement(achievement)}
```

---

# 22. Achievement Card Visual Style

Base:

```text
bg-surface-container-low
rounded-xl
p-space-md
shadow-xl
```

Hover:

```text
subtle colored glow
title color changes to accent
```

Use the achievement's accent color.

Do not create excessive animation.

---

# 23. Achievement Status Badges

## Unlocked

Badge:

```text
Unlocked
```

Icon:

```text
check_circle
```

Gold styling.

---

## Active Streak

Badge:

```text
Active Streak
```

Icon:

```text
bolt
```

Error/red styling.

---

## In Progress

Badge:

```text
In Progress
```

Icon:

```text
timelapse
```

Cyan or purple depending on achievement.

---

## Legendary

Badge:

```text
Legendary
```

Icon:

```text
military_tech
```

Purple styling.

---

## Secret Feat

Badge:

```text
Secret Feat
```

Icon:

```text
visibility_off
```

Muted styling.

---

# 24. Prototype Achievement Cards

The Stitch screen contains these visible achievements.

Keep them as seed/configuration data if the database does not yet contain achievement definitions.

## Early Riser

Category:

```text
Discipline • Daily Habit
```

Description:

```text
Complete a morning quest before 07:00 AM 7 times.
```

Progress:

```text
7 / 7
100%
```

Reward:

```text
+50 XP
+25 Gold
```

Status:

```text
Unlocked
```

---

# 25. 7 Day Warrior

Category:

```text
Streak • Endurance
```

Description:

```text
Maintain a 7-day Battle Streak without dropping momentum.
```

Progress:

```text
7 / 7
100%
```

Reward:

```text
+100 XP
+150 Gold
```

Status:

```text
Active Streak
```

---

# 26. Quest Hunter

Category:

```text
Combat • Quest Mastery
```

Description:

```text
Conquer 50 total quests across all disciplines.
```

Progress:

```text
42 / 50
84%
```

Reward:

```text
+200 XP
+100 Gold
```

Status:

```text
In Progress
```

---

# 27. Bookworm

Category:

```text
Intellect • Knowledge
```

Description:

```text
Complete 20 knowledge quests or technical reading logs.
```

Progress:

```text
13 / 20
65%
```

Reward:

```text
+120 XP
+50 Gold
```

Status:

```text
In Progress
```

---

# 28. Level 10 Hero

Category:

```text
Level • Ascension
```

Description:

```text
Reach Level 10 and ascend to Tier II Vanguard rank.
```

Prototype:

```text
Level 12 / 10
100%
```

Reward:

```text
+300 XP
+200 Gold
```

Status:

```text
Ascended
```

Rarity:

```text
Legendary
```

---

# 29. Golden Adventurer

Category:

```text
Wealth • Vault Mastery
```

Description:

```text
Accumulate 5,000 Gold from conquered bounties.
```

Progress:

```text
3,820 / 5,000
76.4%
```

Reward:

```text
+250 XP
Avatar Frame
```

Status:

```text
In Progress
```

---

# 30. Iron Discipline

Category:

```text
Discipline • Flawless Day
```

Description:

```text
Clear 100% of scheduled daily rituals in a single cycle.
```

Progress:

```text
10 / 10
100%
```

Reward:

```text
+80 XP
+40 Gold
```

Status:

```text
Unlocked
```

---

# 31. Shadow of Procrastination

This is a secret locked achievement.

Category:

```text
Hidden Milestone
```

Title:

```text
Shadow of Procrastination
```

Quote:

```text
"Overcome the midnight temptation and strike before the hour resets."
```

Progress:

```text
0 / 1
```

Status:

```text
Locked • Seal Intact
```

Label:

```text
Secret Feat
```

Important:

Do not expose hidden requirements if the achievement is genuinely secret.

The prototype description is:

```text
Conquer an overdue quest within 15 minutes of stardate reset.
```

If the product wants this to remain secret, keep the requirement hidden from the user and only show:

```text
Requirement Unknown
```

---

# 32. Progress Bar

Each achievement has:

```text
currentProgress / targetProgress
```

Calculate:

```ts
percentage = Math.min(
  100,
  Math.round((currentProgress / targetProgress) * 100)
)
```

Do not store the same percentage independently.

The bar width must derive from the same progress values.

---

# 33. Rewards

Use:

```text
XP
Gold
Items/Titles
```

Prototype examples:

```text
+50 XP
+25 Gold
+100 XP
+150 Gold
Avatar Frame
```

Rewards should come from the achievement definition.

When the achievement is unlocked, the reward must not be granted repeatedly by merely opening the modal.

Reward granting must be handled by the existing progression/achievement backend logic.

---

# 34. Achievement Detail Modal

This is an important interactive part of the page.

Create:

```text
components/achievements/AchievementDetailModal.tsx
```

When a card is clicked:

```text
selectedAchievement = achievement
modal = open
```

Do not use DOM IDs to populate the modal.

---

# 35. Modal Layout

Preserve Stitch.

Modal:

```text
max-width: lg
width: 100%
rounded-xl
bg-surface-container-low
```

Backdrop:

```text
bg-surface-container-lowest/80
backdrop-blur-md
```

Header contains:

- achievement emblem
- category
- title
- status

---

# 36. Modal Content

Display:

### Category

Example:

```text
Streak • Endurance
```

### Title

Example:

```text
7 Day Warrior
```

### Status

Example:

```text
Unlocked • September 12, 2026
```

### Lore Quote

Example:

```text
"Consistency creates legends. A warrior who conquers the sunrise fears no battle."
```

### Trial Requirement

Example:

```text
Maintain a 7-day Battle Streak without dropping momentum across any quest discipline.
```

### Rewards Claimed

Example:

```text
+100 XP
+150 Gold
Ignis Flame Aura
```

All values must come from the selected achievement object.

---

# 37. Modal Close Behavior

Support:

1. Close button
2. Dismiss button
3. Clicking backdrop
4. Escape key

Use React event handlers.

Do not attach:

```js
document.getElementById(...).addEventListener(...)
```

from the component.

---

# 38. Modal Accessibility

When open:

- focus should move into the dialog
- Escape closes it
- close button has an accessible label
- background content should not be treated as active interaction
- use appropriate dialog semantics

Example:

```html
role="dialog"
aria-modal="true"
```

---

# 39. Share Achievement

The Stitch prototype uses:

```js
navigator.share(...)
```

and falls back to `alert()`.

Convert this into a proper React action.

Preferred behavior:

### If Web Share is supported

Use:

```ts
navigator.share({
  title,
  text,
  url
})
```

### If Web Share is unavailable

Copy the achievement share text/link to clipboard.

Then show a LIFEQUEST toast.

Never use:

```js
alert()
```

---

# 40. Share Text

Use:

```text
I unlocked {achievement.title} on LifeQuest! Turn your life into an adventure.
```

Use the current achievement title dynamically.

---

# 41. Toast

Create/reuse the application's shared toast.

Prototype fallback message:

```text
Codex Achievement link copied to your grimoire clipboard!
```

Show a small LIFEQUEST-style notification.

Do not use browser alerts.

---

# 42. Achievement Detail Data

The Stitch prototype defines these detail records:

```text
7 Day Warrior
Early Riser
Quest Hunter
Bookworm
Level 10 Hero
Golden Adventurer
Iron Discipline
Shadow of Procrastination
```

Use the same content for initial seed data if necessary.

The data should be stored centrally, not inside the modal component.

Suggested:

```text
lib/constants/achievements.ts
```

or the existing achievement configuration.

---

# 43. Achievement Service

If the project already has an achievement service, reuse it.

Otherwise create:

```text
lib/services/achievement.service.ts
```

Responsibilities:

```text
getAchievements()
getUserAchievementProgress(userId)
getAchievementStats(userId)
getUnlockedAchievements(userId)
getInProgressAchievements(userId)
```

Do not put Supabase queries directly inside every card.

---

# 44. User Achievement Data

The user's achievement status should be based on real data.

Conceptual structure:

```text
achievement definition
        +
user progress
        ↓
rendered achievement
```

Do not create a separate hardcoded achievement list for the UI if the database already contains the definitions.

---

# 45. Progression Integration

Achievements must connect to LIFEQUEST progression.

For example:

```text
Complete quest
    ↓
XP awarded
    ↓
Gold awarded
    ↓
attribute updated
    ↓
achievement progress updated
    ↓
achievement unlocked if requirement reached
```

Do not make achievement unlocking dependent on frontend-only state.

---

# 46. Achievement Unlocking

The actual unlock decision must be server/database backed.

The frontend can display:

```text
in_progress
unlocked
locked
```

but should not be the sole authority for awarding:

- XP
- Gold
- items
- titles

This is important for security and persistence.

---

# 47. Database / Supabase

Use the existing Supabase schema.

If the project does not yet have achievement tables, keep the schema minimal.

Suggested conceptual tables:

```text
achievements
user_achievements
```

Possible fields:

### achievements

```text
id
title
description
category
rarity
icon
target_value
xp_reward
gold_reward
item_reward
is_secret
created_at
```

### user_achievements

```text
id
user_id
achievement_id
progress
unlocked_at
created_at
updated_at
```

Adapt to the actual project schema rather than blindly creating duplicates.

---

# 48. Row Level Security

Users must only access their own achievement progress.

Conceptually:

```text
auth.uid() = user_id
```

Use the existing RLS strategy.

A user must never be able to:

```text
read another user's achievement progress
modify another user's progress
claim another user's rewards
```

---

# 49. Single Source of Truth

The Achievement page must agree with:

```text
Dashboard
Quests
Character
Settings
```

For example:

If the user completes a quest and unlocks:

```text
Quest Hunter
```

then:

- Achievement page shows it as unlocked
- Character page badge count updates
- XP/Gold updates
- Dashboard progression updates

Do not maintain separate fake counters.

---

# 50. Character Page Integration

The Character Sanctum page already has:

```text
Collectible Badges Showcase
```

That section should use the same achievement system.

Do not create:

```text
character achievements
```

and:

```text
achievement page achievements
```

as separate systems.

Use one canonical achievement source.

---

# 51. Ascended Rewards / Artifacts Gallery

Preserve the Stitch section:

```text
Hall of Artifacts & Titles
Ascended Rewards Unlocked
```

It contains three prototype artifacts.

### Vanguard's Sigil

```text
Level 10 Hero Reward
Equipped Title
```

### Ignis Aura Glow

```text
7 Day Warrior Perk
Profile Halo Active
```

### Disciplined Crest

```text
Early Riser Badge
Shield Inscription
```

These should be derived from unlocked achievement rewards where practical.

---

# 52. Guild Treasury Link — OVERRIDDEN

The Stitch HTML includes:

```text
View in Guild Treasury
```

Do not implement this as a Shop link.

Options:

### Preferred

Replace with:

```text
View Unlocked Rewards
```

and scroll/open the reward section.

OR:

Remove the action entirely while preserving the visual header.

Do not create a fake `/shop` route.

---

# 53. Responsive Artifact Gallery

Desktop:

```text
3 columns
```

Mobile:

```text
1 column
```

Tablet:

```text
3 columns where space permits
```

Preserve Stitch card styling.

---

# 54. Loading State

Create a LIFEQUEST skeleton.

Skeletons should cover:

- page header
- Codex Rank
- progression banner
- counters
- tabs
- achievement cards
- reward gallery

Do not show a blank page.

Do not use only:

```text
Loading...
```

---

# 55. Error State

Use a styled LIFEQUEST error state.

Example:

```text
CODEX SYNCHRONIZATION FAILED
```

Message:

```text
The archive could not be synchronized with your realm records.
```

Button:

```text
TRY AGAIN
```

Do not expose raw Supabase errors.

---

# 56. Empty State

If no achievements match the selected filter:

Display an RPG-themed empty state.

Example:

```text
NO RECORDS FOUND
```

Message:

```text
No achievements match this codex filter yet.
```

Do not show an empty blank grid.

---

# 57. Mobile Navigation

Reuse the global mobile sidebar.

Behavior:

```text
hamburger
↓
sidebar opens
↓
backdrop appears
```

Close with:

- backdrop click
- navigation
- Escape

Do not create another sidebar implementation.

---

# 58. Responsive Layout

### Desktop

```text
sidebar: 288px
header: 64px
achievement grid: 4 columns
```

### Tablet

```text
achievement grid: 2 columns
```

### Mobile

```text
achievement grid: 1 column
horizontal category tabs
wrapped quick filters
stacked header/card content
```

No horizontal overflow.

---

# 59. Accessibility

Requirements:

- semantic HTML
- real buttons
- real links where navigation exists
- keyboard navigation
- focus states
- dialog semantics
- Escape closes modal
- accessible button labels
- screen-reader friendly progress
- no color-only meaning
- reduced motion support

Achievement progress should have an accessible label.

Example:

```html
aria-label="Quest Hunter progress: 42 of 50 quests completed"
```

---

# 60. Performance

- Prefer Server Components for data that does not require browser state.
- Use Client Components only for filters/modal/share interactions.
- Do not make the entire application client-side unnecessarily.
- Avoid repeated Supabase calls.
- Fetch achievement data efficiently.
- Use one source of achievement data for counters, filters and cards.
- Do not add a charting library.

---

# 61. Suggested Component Structure

Use existing project structure if equivalent components already exist.

Recommended:

```text
components/
└── achievements/
    ├── AchievementPage.tsx
    ├── CodexRankCard.tsx
    ├── ArchiveProgress.tsx
    ├── AchievementFilters.tsx
    ├── AchievementCard.tsx
    ├── AchievementGrid.tsx
    ├── AchievementDetailModal.tsx
    ├── AchievementRewards.tsx
    └── AchievementEmptyState.tsx
```

Services:

```text
lib/
└── services/
    └── achievement.service.ts
```

Constants/types:

```text
lib/
├── constants/
│   └── achievements.ts
└── types/
    └── achievement.ts
```

Do not create duplicates if the project already has equivalent files.

---

# 62. Suggested Page Composition

Conceptually:

```tsx
<AchievementsPage>
  <PageHeader />

  <CodexRankCard />

  <ArchiveProgress />

  <AchievementFilters />

  <AchievementGrid>
    {filteredAchievements.map(...)}
  </AchievementGrid>

  <RewardGallery />

  <AchievementDetailModal />
</AchievementsPage>
```

Keep responsibilities separated.

---

# 63. Important Prototype-to-React Conversion

The Stitch HTML contains:

```js
function openDetailModal(key)
function closeDetailModal()
function shareAchievement()
```

Do NOT copy those functions.

Replace them with React:

```tsx
const [selectedAchievement, setSelectedAchievement] =
  useState<Achievement | null>(null);

const [isModalOpen, setIsModalOpen] =
  useState(false);
```

Then:

```tsx
onClick={() => setSelectedAchievement(achievement)}
```

and render the modal based on state.

---

# 64. No Direct DOM Manipulation

Do not use:

```text
document.getElementById()
document.querySelector()
innerHTML
classList.add()
classList.remove()
```

for application behavior.

React state should control:

- modal visibility
- selected achievement
- filters
- tabs
- sorting
- sidebar state

---

# 65. No Browser Alerts

The prototype uses:

```js
alert(...)
```

Do not keep this.

Use the LIFEQUEST toast.

---

# 66. Prototype Dates

The Stitch prototype contains dates such as:

```text
September 12, 2026
September 9, 2026
August 28, 2026
Yesterday
3d ago
```

Do not permanently hardcode these.

Use `unlockedAt` and format dates in the UI.

For relative timestamps, use a small utility rather than a large dependency unless the project already has one.

---

# 67. Prototype Counts

The Stitch contains:

```text
60 total
24 unlocked
36 locked
6 rare
2 legendary
18 in progress
4 secret
```

These are visual prototype values.

Production should calculate them from the achievement data.

---

# 68. Product Requirements Alignment

The original project requirements require:

- secure authentication
- user-owned data
- CRUD tasks
- non-linear XP progression
- streaks
- attribute progression
- rewards/economy
- responsive accessible UI
- database persistence

The Achievement page must therefore be connected to the actual progression engine instead of becoming a static showcase.

The requirements specifically expect user data to persist in the backend rather than relying only on localStorage. fileciteturn19file4L253-L277

The project is also evaluated on visual polish, responsiveness, accessibility, performance, gamification quality, robustness and persistence. fileciteturn19file5L315-L328

---

# 69. Do Not Use localStorage as the Primary Database

Do not implement achievements like:

```text
localStorage.setItem(...)
```

as the primary persistence mechanism.

Supabase is the source of truth.

Local state is acceptable for:

- selected filter
- selected tab
- modal open/closed
- temporary UI state

It is not acceptable as the primary storage for:

- achievement progress
- XP
- Gold
- unlocked achievements

---

# 70. Security Requirements

Never trust browser-provided:

```text
user_id
achievement progress
reward amount
XP amount
Gold amount
```

The backend/database must control ownership and reward persistence.

---

# 71. Implementation Order

Because implementation time is extremely limited, work in this order.

## Phase 1 — Visual

1. `/achievements`
2. shared sidebar
3. shared header
4. page header
5. Codex Rank card
6. progression banner
7. counters
8. category tabs
9. filters
10. achievement cards
11. reward gallery
12. modal

## Phase 2 — Functional UI

1. category filtering
2. status filtering
3. secret filtering
4. sorting
5. modal open/close
6. Escape
7. backdrop close
8. Share Achievement
9. toast

## Phase 3 — Backend

1. load authenticated user
2. load achievements
3. load user progress
4. calculate counters
5. calculate completion
6. integrate rewards
7. integrate unlocking

## Phase 4 — Integration

Verify:

```text
Quest completion
      ↓
progress
      ↓
achievement
      ↓
Character badges
```

## Phase 5 — QA

Check desktop/mobile and refresh persistence.

---

# 72. Acceptance Checklist

## Routing

- [ ] `/achievements` works
- [ ] route is protected
- [ ] unauthenticated users are redirected
- [ ] no `/shop`

## Navigation

- [ ] Dashboard link works
- [ ] Quests link works
- [ ] Character link works
- [ ] Achievements active
- [ ] Settings link works
- [ ] Guild Shop removed

## Visual

- [ ] Stitch design closely reproduced
- [ ] dark RPG theme preserved
- [ ] Playfair Display headings
- [ ] Inter UI
- [ ] gold/purple/cyan accents
- [ ] correct card styling
- [ ] correct glows
- [ ] correct spacing
- [ ] correct responsive grid

## Archive

- [ ] Codex Rank card works
- [ ] progression banner works
- [ ] completion percentage is calculated
- [ ] unlocked count is dynamic
- [ ] locked count is dynamic
- [ ] rare count is dynamic
- [ ] legendary count is dynamic

## Filters

- [ ] All works
- [ ] Quests works
- [ ] Streaks works
- [ ] Level works
- [ ] Discipline works
- [ ] Exploration works
- [ ] Show All works
- [ ] Unlocked Only works
- [ ] In Progress works
- [ ] Secret Feats works
- [ ] sort works

## Cards

- [ ] cards render
- [ ] status badges render
- [ ] progress is dynamic
- [ ] rewards render
- [ ] timestamps are dynamic
- [ ] card hover works
- [ ] card click opens modal

## Modal

- [ ] modal opens
- [ ] selected achievement data is correct
- [ ] icon changes correctly
- [ ] category changes correctly
- [ ] title changes correctly
- [ ] status changes correctly
- [ ] quote changes correctly
- [ ] requirement changes correctly
- [ ] rewards change correctly
- [ ] close button works
- [ ] dismiss works
- [ ] backdrop click works
- [ ] Escape works

## Sharing

- [ ] Web Share works when supported
- [ ] clipboard fallback works
- [ ] toast appears
- [ ] no `alert()`

## Backend

- [ ] Supabase data loads
- [ ] user data is scoped correctly
- [ ] RLS is respected
- [ ] refresh preserves progress
- [ ] achievement progress is not localStorage-only

## Integration

- [ ] quest completion can update achievement progress
- [ ] unlocked achievements appear on Character page
- [ ] achievement counts remain consistent
- [ ] XP/Gold rewards remain consistent

## Responsive

- [ ] desktop works
- [ ] tablet works
- [ ] mobile works
- [ ] tabs scroll horizontally without page overflow
- [ ] filters wrap
- [ ] cards stack correctly
- [ ] modal works on mobile
- [ ] sidebar drawer works

## Accessibility

- [ ] keyboard navigation works
- [ ] buttons have labels
- [ ] modal has dialog semantics
- [ ] Escape works
- [ ] focus states visible
- [ ] progress has accessible labels
- [ ] color is not the only status indicator
- [ ] reduced motion respected

---

# 73. Final Antigravity Instruction

Before coding, inspect the existing repository.

Determine:

1. Current Next.js structure
2. Existing routes
3. Existing sidebar/header
4. Existing Supabase client
5. Existing auth protection
6. Existing task/progression services
7. Existing achievement tables/types if present
8. Existing Tailwind tokens
9. Existing toast/modal components

Reuse them.

Do not create duplicate architecture.

Then implement:

```text
/achievements
```

using the supplied Stitch HTML as the visual reference.

The final result must be:

```text
Stitch visual fidelity
+
Next.js
+
React
+
TypeScript
+
Tailwind
+
Supabase
+
real achievement/progression data
+
responsive accessible UI
```

The page must be a **working application screen**, not a static HTML mockup.

Most importantly:

```text
NO GUILD SHOP
NO /shop
NO FAKE PERSISTENCE
NO BROWSER ALERTS
NO DUPLICATE ACHIEVEMENT SYSTEM
NO PERMANENT HARDCODED USER PROGRESSION
```

Build only what is required for a polished, reliable LIFEQUEST Achievement Codex within the limited implementation timeline.
