# LIFEQUEST Dashboard / Command Center Implementation Specification

You are implementing the **LIFEQUEST Dashboard / Command Center**.

I have provided the Stitch-generated LIFEQUEST HTML UI files.

> **IMPORTANT:**  
> The Stitch HTML is the **VISUAL SOURCE OF TRUTH**.  
> Your job is **NOT** to redesign the Dashboard.  
> Your job is to implement the Dashboard in our existing Next.js + TypeScript + Tailwind project while preserving the exact visual language established by the Stitch HTML.

---

## Application Overview

* **Application Name:** LIFEQUEST
* **Concept:** LIFEQUEST turns real-life productivity into an RPG experience.
* **Core Mechanics:** Users create quests, complete quests, earn XP, earn Gold, level up, maintain Battle Streaks, improve character attributes, and unlock achievements.

### Core Application Routes
* `/dashboard`
* `/quests`
* `/character`
* `/achievements`
* `/settings`

### Authentication Routes
* `/login`
* `/signup`

> **CRITICAL ROUTING RULE:**  
> **Guild Shop has been REMOVED.**  
> * Do **NOT** create `/shop`.  
> * Do **NOT** add Guild Shop to the sidebar.  
> * Gold remains part of the progression/economy system.

---

## Most Important Requirement: Match Existing Stitch Design

The supplied Stitch HTML defines the LIFEQUEST visual system.

### DO NOT:
* Redesign the UI
* Create a generic SaaS dashboard
* Introduce a different color palette
* Introduce different typography
* Replace the sidebar or top header
* Use a different card style
* Add excessive glassmorphism or neon
* Use Bootstrap or generic dashboard templates

The Dashboard must look as if it was designed by the **SAME designer** who created the supplied Stitch HTML.

---

## 1. Existing Design Tokens

Use the exact existing Tailwind design tokens from the Stitch HTML. Re-use these tokens; do not invent replacements unless strictly necessary.

### Background Colors
* `surface`: `#111318`
* `surface-container-lowest`: `#0c0e13`
* `surface-container-low`: `#1a1b21`
* `surface-container`: `#1e1f25`
* `surface-container-high`: `#282a2f`
* `surface-container-highest`: `#33353a`
* `surface-bright`: `#37393f`

### Primary / Gold Colors
* `primary`: `#ffc659`
* `primary-container`: `#e5a92b`
* `primary-fixed`: `#ffdea8`
* `primary-fixed-dim`: `#fbbc3e`

### Secondary / Purple Colors
* `secondary`: `#ddb8ff`
* `secondary-container`: `#641ea3`
* `secondary-fixed`: `#f0dbff`

### Tertiary / Cyan Colors
* `tertiary`: `#57dffe`
* `tertiary-container`: `#2dc3e1`
* `tertiary-fixed`: `#acedff`

### Error Colors
* `error`: `#ffb4ab`
* `error-container`: `#93000a`

### Text & Outline Colors
* `on-surface`: `#e2e2e9`
* `on-surface-variant`: `#d4c4ae`
* `outline`: `#9d8f7b`
* `outline-variant`: `#504534`

---

## 2. Typography

### Font Families
* **Inter:** Navigation, labels, body text, buttons, descriptions, UI elements.
* **Playfair Display:** Dashboard main heading, major RPG headings, important progression numbers.

### Typography Scale
* `display-hero`: 48px / 56px
* `headline-lg`: 32px / 40px
* `headline-md`: 24px / 32px
* `headline-sm`: 20px / 28px
* `stat-counter`: 28px / 32px
* `body-lg`: 16px / 24px
* `body-md`: 14px / 20px
* `body-sm`: 12px / 16px
* `label-caps`: 11px / 16px

---

## 3. Global Sidebar Layout

Reuse the exact sidebar specs from the Stitch HTML.

### Layout & Placement (Desktop)
* **Width:** `288px`
* **Position:** `fixed` (`left: 0`, `top: 0`, `bottom: 0`)
* **Background:** `surface-container-lowest`

### Brand Header
* **Logo/Crest:** Positioned at top
* **Title:** `LIFEQUEST`
* **Subtitle:** `TURN YOUR LIFE INTO AN ADVENTURE`

### Navigation Links & Icons (Material Symbols)
1. **Dashboard:** `shield` *(Active State)*
2. **Quests:** `swords`
3. **Character:** `person`
4. **Achievements:** `military_tech`
5. **Settings:** `tune`

> **Active Dashboard Styling:**  
> `background`: `secondary-container` | `text`: `on-secondary-container` | `font`: `title-quest` | `shadow`: purple glow.

### Sidebar Footer Links
* Help & Codices
* Log Out

---

## 4. Global Top Header

Reuse the header structure from Stitch.

* **Height:** `64px`
* **Desktop Left:** Aligned after sidebar (`288px` margin offset).
* **Background:** `surface-container-low` with `backdrop blur`.

### Right-Side Indicators
* **Gold:** 🪙 `1,240 Gold` (`primary` color pill)
* **Battle Streak:** 🔥 `7 Day Streak` (`error` color pill)
* **Notifications:** 🔔 Bell icon with `tertiary` indicator dot
* **User Info & Avatar:** User display name, title (e.g., *"Arjun - Lvl 12 Warrior-Scholar"*), and avatar with `secondary-container` purple glow ring.

---

## 5. Dashboard Purpose & Layout Architecture

The Dashboard is named **COMMAND CENTER**. It acts as the post-login landing screen providing an instant snapshot of progression, active quests, attributes, and achievements.

### Desktop Layout Philosophy (>= 1024px Grid)
* **Container:** `max-width: 1440px`, centered, `px-10` horizontal padding, `24px–40px` vertical padding.
* **Structure:**
  1. **Page Header**
  2. **Player Progress Hero Panel**
  3. **12-Column Grid** (`gap: 24px`):
     * **Left Column (`col-span-8`):** Today's Quests
     * **Right Column (`col-span-4`):** Battle Streak, Attributes Summary, Recent Achievements, Character Summary

### Mobile Responsive Layout (< 768px)
* Sidebar hidden by default (toggled via Hamburger menu with background backdrop overlay).
* Single-column stacked layout: Header -> Player Progress -> Today's Quests -> Battle Streak -> Attributes -> Achievements -> Character Summary.
* Padding set to `px-4` with full-width touch-friendly components.

---

## 6. Detailed Dashboard Sections

### A. Dashboard Page Header
* **Top Eyebrow:** `COMMAND CENTER • DAILY QUEST LOG` (with `shield` or `shield_with_house` icon in `primary` gold).
* **Main Heading:** `Command Center` (*Playfair Display*, 48px desktop / 32px mobile).
* **Supporting Text:** *"Small steps create legendary results. Your next quest awaits."* (`on-surface-variant`, max-width ~600–650px).
* **Status Panel (Right Aligned):** `CLOUD CODEX LINK - Active & Synchronized` with a pulsing cyan indicator dot.

### B. Hero Progression Panel
* **Styling:** `surface-container-low`, `rounded-xl`, `shadow-md`, subtle atmospheric purple glow.
* **Title:** `PLAYER PROGRESSION`
* **Content:**
  * Character Avatar, Name (*ARJUN*), Subtitle (*Warrior-Scholar*), Level (*LEVEL 12*).
  * **XP Meter:** Standardized progress bar showing current/target XP (e.g., `840 / 1200 XP` - 70% completed) styled in `primary` gold glow (RPG-style UI meter, not generic SaaS).
  * Quick Stat Badges: 🪙 Gold (`1,240`), 🔥 Streak (`7 DAYS`), Next Level threshold (`360 XP remaining`).

### C. Today's Quests (Primary Area)
* **Header:** `TODAY'S QUESTS` — *"Conquer your objectives and strengthen your legend."*
* **Card Surface:** `surface-container-lowest` card nested inside `surface-container-low` with `rounded-lg` and subtle elevation on hover.
* **Card Accent Colors by Category:**
  * **Coding:** `tertiary` (Cyan)
  * **Knowledge:** `secondary` (Purple)
  * **Fitness:** `primary` (Gold)
  * **Wellness:** `tertiary` / `secondary`
* **Sample Card Structure:**
  ```text
  -------------------------------------------------
  ⚔️ SOLVE 2 LEETCODE PROBLEMS
  CODING                              EPIC

  Solve two algorithm problems to sharpen your intellect.

  +50 XP                            🪙 +20 GOLD

                               [ CONQUER QUEST ]
  -------------------------------------------------