# LIFEQUEST — Character Sanctum Screen Specification

## Purpose

This document is the implementation specification for the finalized **Character Sanctum** screen of LIFEQUEST.

The Stitch-generated HTML is the **visual source of truth**. The production screen should preserve its visual design while replacing demo/static values with real application data.

---

## Route

`/character`

The route is protected.

Unauthenticated users should be redirected to `/login`.

---

## Global Navigation

Reuse the shared LIFEQUEST:

- Sidebar
- Header
- Typography
- Color tokens
- Buttons
- Cards
- Icons
- Responsive behavior

### Sidebar navigation

- Dashboard
- Quests
- Character — active
- Achievements
- Settings

**Guild Shop must not appear.**

There must be no `/shop` route.

---

## Visual Theme

The Character Sanctum uses the established LIFEQUEST dark RPG visual system.

### Core colors

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

### Typography

- **Playfair Display:** major RPG headings and important progression values
- **Inter:** navigation, labels, body text, metadata, buttons

Preserve the Stitch typography hierarchy.

---

# Page Header

Eyebrow:

`Vanguard Dossier • Codex Sanctorum`

Main heading:

`CHARACTER SANCTUM`

Description:

`Track your growth, inspect your battle statistics, and witness your evolution into a legend.`

The header includes summary badges:

- Vanguard Rank — Silver III
- Title — The Resilient Scholar
- Guild — Knights of Perpetual Focus

These values are examples and should be loaded from user/profile data where supported.

The header uses subtle ambient purple/gold blurred effects.

---

# Main Character Layout

Desktop layout uses a 12-column grid.

### Left side

Character portrait, XP progression, next perk, equipment/relics.

### Right side

Core Attributes Matrix, radar visualization, attribute breakdown.

---

# Character Portrait

Create:

`components/character/CharacterPortrait.tsx`

Display:

- Character portrait
- Rank/class
- Character name
- Level
- Streak multiplier

Example Stitch data:

```text
Arjun
Level 12
Arcane Blade
STREAK × 1.4
```

These are demo values only.

Use a stable application asset or Supabase Storage for the production character image.

If no image exists, use a LIFEQUEST-themed fallback.

---

# XP Progression

Section:

`XP PROGRESSION`

Example:

```text
840 / 1,200 XP
70%
```

Use the Stitch recessed/gauged visual style with purple/gold gradient treatment.

The values must come from the user's progression data.

Do not hardcode XP or level.

---

# Next Perk

Display the next level reward.

Example:

```text
Next perk at Lvl 13
Focus Aura II
+15% Study XP
```

The production implementation should derive the next perk from progression configuration.

Suggested location:

`lib/constants/characterMilestones.ts`

or the existing progression configuration.

---

# Equipment / Relics

Section:

`Enchanted Gear & Relics (4/4 Equipped)`

Example items:

1. Helm of Clarity — +8 Intellect
2. Cloak of Deep Work — +12 Discipline
3. Ring of Iron Will — +10 Vitality
4. Codex Algorithms — +14 Arcana

Create:

- `EquipmentGrid.tsx`
- `EquipmentSlot.tsx`

Preserve the Stitch icon containers, dark inner surfaces, hover states and responsive grid.

Do not build a full marketplace/inventory system unless already required.

**Do not create a Shop.**

---

# Core Attributes Matrix

Section:

`Character Aptitudes`

Subheading:

`Core Attributes Matrix`

Display:

`COMBINED POWER`

Example:

`378 PTS`

The combined power must be calculated from actual attributes.

Five core attributes:

- Discipline — 91
- Intellect — 82
- Vitality — 72
- Creativity — 68
- Strength — 65

The example values are Stitch demo values.

Create:

`components/character/AttributesMatrix.tsx`

---

# Attribute Radar

Create:

`components/character/AttributeRadar.tsx`

The Stitch design uses a five-sided SVG/radar visualization.

Do not replace it with a generic chart.

The visualization must dynamically represent:

- Discipline
- Intellect
- Vitality
- Creativity
- Strength

It should update automatically when attribute values change.

Preserve:

- dark pentagon grid
- purple polygon
- subtle cyan/gold/error points
- glow
- attribute labels

SVG is preferred.

---

# Attribute Breakdown

Create:

`components/character/AttributeBreakdown.tsx`

Each attribute should show:

- Icon
- Attribute name
- Value
- Progress bar
- Supporting statistics

Example Stitch content:

### Discipline — 91

- 7-Day streak multiplier active
- Zero daily rituals missed

### Intellect — 82

- 42 Coding quests
- 28 Reading sessions
- 12h Strategy

### Vitality — 72

- Sleep index 88%
- Hydration habit done
- Wholesome Fuel

### Creativity — 68

- Design sprint mastery
- Journaling logs
- Music practice

### Strength — 65

- 35 Gym workouts logged
- 18 Cardio runs

Supporting statistics should use real activity data where available.

If the underlying activity system does not yet exist, keep the data layer structured so it can be connected later.

---

# Lifetime Progression Metrics

Section:

`Chronicle Records`

Subheading:

`Lifetime Progression Metrics`

Six metrics:

1. Current Level
2. Total XP Gained
3. Quests Conquered
4. Days Active In Realm
5. Gold Accumulated
6. Highest Streak

Example Stitch values:

```text
Current Level: 12
Tier: Silver Blade

Total XP: 8,420
+320 this week

Quests Conquered: 124
98.4% success rate

Days Active In Realm: 37
Season 1 Veteran

Gold Accumulated: 5,820
1,240 currently in vault

Highest Streak: 14 DAYS
Current: 7 Days
```

All values must be derived from the user's actual progression/activity data in production.

---

# Evolution Milestones

Section:

`Ascension Path`

Subheading:

`Character Evolution Milestones`

Milestones:

```text
Level 1  — Novice Wanderer
Level 5  — Apprentice Seeker
Level 10 — Ascendant Warrior
Level 15 — Grand Spellblade
Level 20 — Mythic Titan of Discipline
```

Possible visual states:

- Unlocked
- Current
- Locked
- Near Future
- Zenith

Current state must be calculated from the user's actual level.

For example, at Level 12:

- Level 10 = current
- Level 15 = near future
- Level 20 = locked

Keep milestone definitions centralized.

---

# Collectible Badges

Section:

`Insignias & Accolades`

Subheading:

`Collectible Badges Showcase`

Show:

- Earned count
- In-progress count
- Badge grid

Example badges:

### Earned

- Deep Focus Sage
- Flame of Fortitude
- Binary Alchemist

### In Progress

- Tome Devourer — 24 / 30 — 75%

Create:

`components/character/BadgeCard.tsx`

States:

- earned
- in-progress
- locked

In-progress badges should use the Stitch-style circular SVG progress indicator.

The Character screen should reuse the same achievement system as `/achievements` rather than creating a separate achievement database.

---

# Footer Actions

Footer panel:

`Sanctum Codex v1.4`

Text:

`All progression points sync directly to your weekly guild rank.`

Actions:

- Share Dossier
- Edit Title & Sigils

---

# Share Dossier

Implement as a real action.

On click:

- generate/copy a shareable character dossier summary
- use `navigator.clipboard` when available
- show a LIFEQUEST toast
- do not use `alert()`

Example success message:

`Vanguard Dossier #12 Copied to Arcane Scroll!`

---

# Edit Title & Sigils

Implement a lightweight modal:

`EditCharacterModal.tsx`

Possible fields:

- Character title
- Character display name
- Sigil/avatar selection

Keep this simple.

Do not build a large character customization system.

---

# Data Architecture

Use Supabase as the source of truth.

Character data includes, where supported:

- profile
- display name
- title
- character image
- level
- XP
- Gold
- streak
- attributes
- achievements
- progression metrics

Recommended services:

```text
lib/services/profile.service.ts
lib/services/progression.service.ts
lib/services/achievement.service.ts
lib/services/character.service.ts
```

Reuse existing services instead of creating duplicates.

Do not put raw Supabase queries into individual UI components.

---

# Single Source of Truth

Do not maintain separate copies of:

- XP
- level
- Gold
- streak
- attributes
- achievement counts

The same progression data must be reflected consistently across:

`/dashboard`

`/quests`

`/character`

`/achievements`

For example:

If a quest awards XP, the updated XP must be reflected on the Character page and Dashboard.

---

# Security

Character data must be scoped to the authenticated user.

Use Supabase Auth user ID.

Users must not be able to access another user's:

- profile
- progression
- attributes
- achievements
- character metadata

Use Row Level Security.

Never trust a user ID supplied by the browser.

---

# Loading State

Create Stitch-style skeleton states for:

- portrait
- XP
- equipment
- attributes
- radar
- metrics
- milestones
- badges

Use LIFEQUEST dark surfaces.

Avoid plain `Loading...` pages.

---

# Error State

Use:

`SANCTUM CONNECTION LOST`

Message:

`Unable to synchronize your character records.`

Action:

`TRY AGAIN`

Do not expose raw database errors.

---

# Responsive Behavior

### Desktop

- 288px sidebar
- 12-column main layout
- portrait/progression/equipment on left
- attributes on right

### Tablet

Adapt the grid without clipping.

### Mobile

Stack sections vertically:

1. Page header
2. Character portrait
3. XP progression
4. Equipment
5. Attributes
6. Radar
7. Attribute breakdown
8. Lifetime metrics
9. Evolution milestones
10. Badges
11. Footer actions

Use mobile drawer navigation.

No horizontal overflow.

---

# Component Structure

Recommended:

```text
components/character/
├── CharacterSanctum.tsx
├── CharacterPortrait.tsx
├── CharacterXP.tsx
├── EquipmentGrid.tsx
├── EquipmentSlot.tsx
├── AttributesMatrix.tsx
├── AttributeRadar.tsx
├── AttributeBreakdown.tsx
├── LifetimeMetrics.tsx
├── EvolutionMilestones.tsx
├── CollectibleBadges.tsx
├── BadgeCard.tsx
└── EditCharacterModal.tsx
```

Reuse shared:

```text
components/layout/
├── Sidebar.tsx
└── Header.tsx

components/ui/
├── Card.tsx
├── Button.tsx
├── ProgressBar.tsx
├── Toast.tsx
├── LoadingSkeleton.tsx
└── EmptyState.tsx
```

Only create components that are actually needed.

---

# Performance

- Prefer Server Components.
- Use Client Components only where interaction is required.
- Do not make the entire page client-side unnecessarily.
- Implement the radar chart using SVG rather than adding a large chart dependency.
- Avoid unnecessary libraries.

---

# Accessibility

Use:

- semantic HTML
- real buttons and links
- accessible labels
- keyboard navigation
- visible focus states
- accessible chart description
- proper dialog focus management
- Escape to close dialogs

Do not communicate information by color alone.

Respect reduced-motion preferences.

---

# Explicitly Do NOT Implement

Because development time is limited, do not add:

- Guild system
- Guild Shop
- `/shop`
- Marketplace
- Trading
- Complex inventory system
- Crafting
- PvP
- Combat engine
- Multiplayer
- Unnecessary animation systems
- Unnecessary third-party libraries

---

# Final Acceptance Checklist

Before marking the Character Sanctum complete:

- [ ] `/character` works
- [ ] Authentication protection works
- [ ] Stitch layout is preserved
- [ ] Sidebar matches LIFEQUEST
- [ ] Character navigation is active
- [ ] Guild Shop is absent
- [ ] Header matches LIFEQUEST
- [ ] Character portrait works
- [ ] XP is dynamic
- [ ] XP progress is dynamic
- [ ] Next perk is structured/dynamic
- [ ] Equipment cards render
- [ ] Five attributes render
- [ ] Combined Power is calculated
- [ ] Radar chart works
- [ ] Radar chart reflects actual attributes
- [ ] Attribute breakdown renders
- [ ] Lifetime metrics are dynamic
- [ ] Evolution milestones reflect current level
- [ ] Badges render
- [ ] Badge progress is dynamic
- [ ] Share Dossier works
- [ ] Toast works
- [ ] Edit Title & Sigils works where supported
- [ ] Loading state works
- [ ] Error state works
- [ ] Mobile layout works
- [ ] No horizontal overflow
- [ ] Keyboard navigation works
- [ ] Reduced motion is respected
- [ ] No browser `alert()`
- [ ] No unnecessary dependencies
- [ ] No `/shop` route
- [ ] No Guild Shop navigation
- [ ] No permanently hardcoded progression values

---

## Final Goal

The implemented `/character` page should look like the supplied Stitch Character Sanctum design while behaving like a real authenticated LIFEQUEST application.

Visual source:

**Stitch**

Application:

**Next.js + React + TypeScript + Tailwind**

Backend:

**Supabase**

Authentication:

**Supabase Auth**

Data:

**Real user progression and achievement data**

The final result should feel like a premium RPG character progression screen, not a conventional profile/settings page.
