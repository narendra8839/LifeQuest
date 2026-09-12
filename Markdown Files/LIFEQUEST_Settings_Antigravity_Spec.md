# LIFEQUEST — Settings / Sanctum Preferences
## Antigravity Implementation Specification

> **Purpose:** Build the `/settings` screen from the supplied Stitch HTML and integrate it into the existing LIFEQUEST application.
>
> **Visual source of truth:** supplied Stitch HTML.
>
> **Technical source of truth:** existing LIFEQUEST repository and finalized stack.
>
> Do not redesign the page. Convert the static Stitch prototype into a working React/Next.js screen using the existing application architecture.

---

# 1. Finalized Tech Stack

Use the existing LIFEQUEST stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
  - Supabase Auth
  - PostgreSQL
  - Row Level Security
- Material Symbols Outlined
- Inter
- Playfair Display

Do not introduce another frontend framework.

Do not add unnecessary dependencies.

---

# 2. Route

Implement:

```text
/settings
```

The page must be protected.

Unauthenticated users must use the existing authentication redirect mechanism.

Do not create a second authentication system.

---

# 3. Important Product Scope

The final product does **not** include Guild Shop/Guild functionality.

Therefore:

- Do not implement Guild Shop.
- Do not create `/shop`.
- Do not add Guild Shop to the global navigation.
- Do not build Guild management.
- Do not build Guild announcements as a real feature.

The Stitch Settings HTML contains some Guild-related prototype text. Treat this as legacy visual content and adapt it to the final product.

For example:

```text
Guild Announcements
```

should either:

1. be removed, or
2. be converted into a disabled/placeholder setting if the existing product architecture requires the row.

Preferred for the one-day implementation: **remove Guild-specific settings that have no real backend functionality.**

---

# 4. Visual Design Source

The supplied Stitch Settings page contains:

- 288px fixed sidebar
- 64px fixed header
- LIFEQUEST dark RPG theme
- Settings hero header
- Cloud Codex synchronization indicator
- two-column settings layout
- Character Profile
- Realm Appearance
- Accessibility
- Account & Credentials
- Notifications & Wards
- Privacy & Security
- sticky bottom settings action bar

Preserve the visual hierarchy and styling.

The supplied HTML currently contains static data and vanilla JavaScript.

Convert it into React components and application state.

---

# 5. LIFEQUEST Theme

Use the existing design tokens.

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

Keep the dark obsidian + gold + amethyst + cyan RPG aesthetic.

Do not turn Settings into a conventional SaaS admin page.

---

# 6. Typography

### Playfair Display

Use for:

- Settings page title
- major section headings where appropriate
- large RPG-style values

### Inter

Use for:

- body text
- labels
- controls
- navigation
- buttons
- helper text

Preserve uppercase letter spacing for `label-caps`.

---

# 7. Global Sidebar

Reuse the existing LIFEQUEST sidebar.

Desktop:

```text
288px / w-72
```

Navigation:

```text
Dashboard
Quests
Character
Achievements
Settings
```

Settings must be active.

Active style:

```text
secondary-container
on-secondary-container
purple glow
```

Bottom:

```text
Help & Codices
Log Out
```

## Important

Do not include:

```text
Guild Shop
```

in the final navigation.

The supplied Stitch HTML still contains it, but the final product scope explicitly removes it.

---

# 8. Global Header

Reuse the existing application header.

Header height:

```text
64px
```

Include the existing shared values:

```text
Gold
Battle Streak
Notifications
User
Level/Class
Avatar
```

These values must come from the existing user/progression state.

Do not hardcode:

```text
1,240 Gold
7 Day Streak
Arjun
Lvl 12 Warrior-Scholar
```

Those are only Stitch prototype values.

---

# 9. Settings Hero

Eyebrow:

```text
Sanctum Preferences • Realm Configuration
```

Icon:

```text
shield_with_house
```

Main title:

```text
Settings
```

Description:

```text
Configure your realm, notifications, aesthetic auras, and security wards to sustain peak operational focus across all heroic pursuits.
```

Preserve:

- gold eyebrow
- Playfair title
- subtle spacing
- dark background
- responsive layout

---

# 10. Cloud Codex Status

Top-right status card:

```text
Cloud Codex Link
Active & Synchronized
```

Use:

- animated cyan status dot
- dark card
- cyan text

This should represent actual application sync state where possible.

Do not claim synchronized if the initial data request has failed.

Possible states:

```text
Syncing...
Active & Synchronized
Sync Failed
Offline
```

For the initial implementation, at minimum support:

```text
Syncing
Active
Error
```

---

# 11. Main Layout

Desktop:

```text
12-column grid
LEFT  = 6 columns
RIGHT = 6 columns
```

Equivalent:

```text
grid-cols-1 lg:grid-cols-12
lg:col-span-6
lg:col-span-6
```

Mobile:

```text
single column
```

Preserve Stitch spacing.

---

# 12. Left Column

Sections:

```text
1. Character Profile
2. Realm Appearance
3. Accessibility
```

Each section:

```text
bg-surface-container-low
p-space-lg
rounded-xl
shadow-md
```

---

# 13. Character Profile

Section heading:

```text
Character Profile
```

Icon:

```text
account_circle
```

Action:

```text
Edit Dossier
```

The Edit Dossier action should use the existing Character/profile editing functionality where available.

Do not create duplicate profile-editing logic.

---

# 14. Character Identity Block

Display:

```text
Avatar
Name
Class
Title
Level
Rank
Guild/organization information only if the application actually supports it
Email verification status
```

Prototype:

```text
ARJUN
Warrior-Scholar

Lvl 12 Arcane Blade • Vanguard Rank: Silver III

Guild: Knights of Perpetual Focus
Ward Email: arjun@example.com
Verified
```

These are prototype values.

Production values must come from the authenticated user's profile/progression data.

---

# 15. Guild Field Handling

Because Guild functionality is out of scope:

Do not build a Guild backend.

If the existing database has no Guild system:

Prefer removing:

```text
Guild: Knights of Perpetual Focus
```

from the production Settings page.

Do not fake a Guild relationship.

---

# 16. Avatar

Reuse the existing avatar/profile system.

Actions:

```text
Edit Profile
Change Avatar
```

### Edit Profile

Open the existing profile editor if one exists.

### Change Avatar

Use the existing avatar upload/storage flow if implemented.

If not implemented, provide a lightweight profile-avatar flow using Supabase Storage only if the project already supports it.

Do not spend time creating an elaborate avatar marketplace.

---

# 17. Realm Appearance

Section:

```text
Realm Appearance
```

Icon:

```text
palette
```

Description:

```text
Select the atmospheric aura and runic aesthetic of your LIFEQUEST command realm.
```

Four theme choices:

```text
Dark Realm
Night Realm
Arcane Realm
Golden Realm
```

---

# 18. Theme Cards

## Dark Realm

Description:

```text
Obsidian, gold & amethyst glow
```

Prototype state:

```text
Active
```

## Night Realm

Description:

```text
Starlit black, cyan & cool silver
```

## Arcane Realm

Description:

```text
Purple nebula & shimmering lavender
```

## Golden Realm

Description:

```text
Warm sepia, brass & sunburst runes
```

Preserve the colored preview circles from Stitch.

---

# 19. Theme Selection

Theme cards must be functional.

Use React state:

```ts
const [theme, setTheme] = useState<RealmTheme>("dark");
```

Recommended type:

```ts
type RealmTheme =
  | "dark"
  | "night"
  | "arcane"
  | "golden";
```

When selected:

- update the active card
- update the visual theme if the application supports multiple themes
- persist the preference

Do not reload the entire page.

---

# 20. Theme Persistence

Use Supabase-backed user preferences if the project has a settings/preferences table.

Conceptual:

```text
user_preferences
  user_id
  theme
  font_scale
  runic_borders
  reduce_motion
  high_contrast
  dyslexic_typography
  ...
```

Adapt to the existing schema.

Do not create duplicate preference tables if one already exists.

---

# 21. Font Scale Metric

Settings:

```text
Font Scale Metric
Adjust interface density for codices and journals
```

Options:

```text
STANDARD
COMPACT
```

Make both functional.

Suggested type:

```ts
type FontScale = "standard" | "compact";
```

Behavior:

### Standard

Use normal LIFEQUEST spacing/font sizing.

### Compact

Reduce density slightly.

Do not make text unreadably small.

Persist the preference.

---

# 22. Runic Border Accents

Setting:

```text
Runic Border Accents
```

Description:

```text
Display gilded filigree hairline highlights on legendary modules
```

Default prototype:

```text
ON
```

Implement as a boolean preference.

When enabled:

- legendary/high-priority cards can display the decorative border accent.

When disabled:

- remove decorative border accents.

Do not change core layout.

---

# 23. Accessibility Section

Section:

```text
Accessibility
```

Icon:

```text
accessibility_new
```

Settings:

```text
Reduce Motion
High Contrast Mode
Dyslexic-Friendly Typography
Full Keyboard Navigation
```

All toggles should be real settings.

---

# 24. Reduce Motion

Label:

```text
Reduce Motion
```

Description:

```text
Minimize particle effects and animated leveling transitions
```

When enabled:

- disable/reduce decorative animations
- disable unnecessary particle effects
- reduce transition durations
- respect `prefers-reduced-motion`

Also respect the browser/system preference.

---

# 25. High Contrast Mode

Label:

```text
High Contrast Mode
```

Description:

```text
Elevate luminosity deltas on ambient parchment cards
```

When enabled:

- increase text contrast
- strengthen borders where necessary
- preserve accessible contrast ratios

Do not simply invert the entire UI.

---

# 26. Dyslexic-Friendly Typography

Label:

```text
Dyslexic-Friendly Typography
```

Description:

```text
Override serif titling with hyper-legible weighted glyphs
```

When enabled:

- replace Playfair Display headings with a highly legible sans-serif stack
- preserve hierarchy
- maintain readable line heights

Do not add a large typography library solely for this unless the project already has one.

---

# 27. Full Keyboard Navigation

Label:

```text
Full Keyboard Navigation
```

Prototype:

```text
ON
```

Icon:

```text
keyboard
```

The application should already support keyboard navigation.

This setting can control optional keyboard shortcuts if the project has them.

Do not disable basic keyboard accessibility.

**Important:** accessibility fundamentals must always remain available regardless of this toggle.

---

# 28. Accessibility Persistence

Persist these settings:

```text
reduce_motion
high_contrast
dyslexic_typography
keyboard_navigation
```

Use the authenticated user's preference record.

If persistence is unavailable during initial implementation, maintain local UI state temporarily but structure the service so Supabase persistence can be connected.

For the final build, Supabase should be the source of truth.

---

# 29. Account & Credentials

Right column section:

```text
Account & Credentials
```

Icon:

```text
key
```

Prototype ID:

```text
ID: LQ-9942
```

Do not expose internal database IDs if they are sensitive.

Prefer a safe public character/profile identifier if one exists.

---

# 30. Credentials

Display:

```text
Adventurer Username
Registered Email
Guild Passcode
```

### Username

Read-only.

### Email

Read-only display with verified status.

### Password

Never display the actual password.

The Stitch prototype uses:

```text
••••••••••••
```

This is acceptable only as a visual representation.

Do not store or retrieve a user's password.

---

# 31. Change Password

Button:

```text
Change Password
```

Icon:

```text
vpn_key
```

Use Supabase Auth's existing password update flow.

Do not implement custom password storage.

Recommended flow:

```text
Change Password
      ↓
password modal/form
      ↓
validate password
      ↓
Supabase Auth update
      ↓
toast
```

---

# 32. Manage Active Sessions

Button:

```text
Manage Active Sessions
```

Icon:

```text
devices
```

If the current Supabase setup supports session management, connect it.

If not:

- do not create a fake session-management system
- either provide a minimal "session management unavailable" state
- or omit the action until backend support exists

Do not fabricate security functionality.

---

# 33. Notifications & Wards

Section:

```text
Notifications & Wards
```

Icon:

```text
notifications_active
```

Description:

```text
Tether tactical dispatches and audio fanfares directly to your waking rituals.
```

Settings:

```text
Quest Completion Sound & Particles
Daily Ritual Morning Reminder
Battle Streak Defense Warning
Achievement & Codex Unlocks
Level-Up Milestone Fanfare
```

Do not implement Guild Announcements because Guild functionality is removed.

---

# 34. Quest Completion Sound & Particles

Default prototype:

```text
ON
```

Description:

```text
Harmonic chime and gilded rune burst upon checklist clearing
```

When ON:

- completion sound/particles can play when a quest is completed.

When OFF:

- suppress those effects.

The setting should integrate with the existing quest completion UI.

---

# 35. Daily Ritual Morning Reminder

Prototype:

```text
ON
07:00 AM
```

Setting should store:

```text
enabled: boolean
time: HH:mm
timezone: IANA timezone
```

Do not permanently store:

```text
Eastern Watch
```

Use the user's actual timezone where available.

A reminder should not be falsely claimed to be dispatched unless a real notification mechanism exists.

---

# 36. Battle Streak Defense Warning

Prototype:

```text
ON
```

Description:

```text
Alert dispatched 2 hours before streak resets at midnight
```

Store:

```text
enabled: boolean
```

The actual alert system can consume this preference.

Do not create a background notification service if it does not already exist.

---

# 37. Achievement & Codex Unlocks

Default:

```text
ON
```

When enabled:

```text
achievement unlocked
       ↓
notification
```

Connect to the existing notification system if available.

Do not create duplicate achievement notifications.

---

# 38. Level-Up Milestone Fanfare

Default:

```text
ON
```

When enabled:

- play the existing level-up audio/visual effect.

When disabled:

- suppress the fanfare.

Do not add an external audio framework just for this setting.

---

# 39. Guild Announcements

The Stitch prototype has:

```text
Guild Announcements
```

with default OFF.

Final product decision:

## Remove this setting.

Reason:

```text
Guild system is intentionally out of scope.
```

Do not create Guild backend functionality to support it.

---

# 40. Privacy & Security

Section:

```text
Privacy & Security
```

Icon:

```text
security
```

Settings:

```text
Public Dossier Visibility
Export Quest Codices
Dissolution Protocol
```

---

# 41. Public Dossier Visibility

Prototype:

```text
PUBLIC TO GUILD
```

Because Guild is removed, adapt the setting.

Preferred options:

```text
Private
Public
```

or, if public profiles are not yet implemented:

```text
Private
```

Do not display "Public to Guild" if there is no Guild system.

The setting controls whether another user can inspect:

```text
stats
build
streak history
```

Only expose information that the backend/API actually supports.

---

# 42. Export Quest Codices

Button:

```text
Export JSON / CSV
```

Icon:

```text
download
```

This should be functional.

Recommended flow:

```text
authenticated user
      ↓
fetch owned quest/progression data
      ↓
generate JSON or CSV
      ↓
browser download
```

Do not expose another user's data.

---

# 43. Export Data Security

Export only the current authenticated user's data.

Potential export fields:

```text
quests
quest completion status
XP history
Gold history where appropriate
streak history
achievement progress
achievement unlock dates
character attributes
```

Do not export:

```text
password
auth tokens
private session secrets
internal security credentials
```

Do not export another user's data.

---

# 44. Delete Character / Account

Dangerous section:

```text
Dissolution Protocol
```

Warning:

```text
Permanently forfeit all levels, gold, achievements, and quest history.
This action cannot be undone.
```

Button:

```text
Delete Character
```

This is a destructive account action.

---

# 45. Delete Confirmation

Never delete immediately after one click.

Required flow:

```text
Delete Character
       ↓
Confirmation modal
       ↓
User explicitly confirms
       ↓
Re-authentication if required
       ↓
Delete user-owned application data
       ↓
Delete/auth-disable account
       ↓
Sign out
       ↓
Redirect to login/landing
```

The confirmation modal should clearly state:

```text
This permanently deletes your LIFEQUEST progression.
```

Require an explicit confirmation action.

Recommended additional confirmation:

```text
Type DELETE
```

before proceeding.

---

# 46. Delete Security

The frontend must not be the sole authority for deletion.

Use a secure server/backend flow.

Do not allow a random client request to delete arbitrary user IDs.

Use the authenticated Supabase user.

Never trust:

```text
user_id
```

from browser input.

---

# 47. Sticky Bottom Action Bar

Preserve the Stitch sticky bottom bar.

It contains:

```text
Realm Settings Saved
Auto-saved to cloud codex 2 seconds ago
```

and:

```text
Discard Draft
Log Out of LIFEQUEST
```

---

# 48. Autosave

Settings should preferably autosave.

Flow:

```text
User changes setting
      ↓
local React state
      ↓
debounced persistence
      ↓
Supabase
      ↓
Saved status
```

Do not write to Supabase on every tiny UI event if it causes excessive requests.

Use a small debounce where appropriate.

---

# 49. Save Status

Support states:

```text
Unsaved Changes
Saving...
Saved
Save Failed
```

The Stitch currently shows:

```text
Realm Settings Saved
Auto-saved to cloud codex 2 seconds ago
```

Do not permanently claim "Saved" when persistence failed.

---

# 50. Discard Draft

Button:

```text
Discard Draft
```

Behavior:

```text
restore last saved settings
```

Do not delete database data.

If there are no unsaved changes, the button can be disabled.

---

# 51. Log Out

Button:

```text
Log Out of LIFEQUEST
```

Use the existing Supabase Auth logout function.

After logout:

```text
redirect to /login
```

or the application's existing public landing route.

Do not implement a second auth system.

---

# 52. Settings State Model

Use a central settings object.

Example:

```ts
interface UserSettings {
  theme: "dark" | "night" | "arcane" | "golden";
  fontScale: "standard" | "compact";
  runicBorders: boolean;

  reduceMotion: boolean;
  highContrast: boolean;
  dyslexicTypography: boolean;
  keyboardNavigation: boolean;

  completionEffects: boolean;
  morningReminderEnabled: boolean;
  morningReminderTime: string;
  streakWarningEnabled: boolean;
  achievementNotifications: boolean;
  levelUpFanfare: boolean;

  dossierVisibility: "private" | "public";
}
```

Adapt to the actual project schema.

Do not duplicate these values across components.

---

# 53. Recommended Component Structure

Reuse existing components where available.

If missing, use:

```text
components/
└── settings/
    ├── SettingsPage.tsx
    ├── CharacterProfileSettings.tsx
    ├── RealmAppearanceSettings.tsx
    ├── AccessibilitySettings.tsx
    ├── AccountCredentials.tsx
    ├── NotificationSettings.tsx
    ├── PrivacySecuritySettings.tsx
    ├── ThemeCard.tsx
    ├── SettingsToggle.tsx
    ├── SettingsAction.tsx
    ├── DeleteAccountModal.tsx
    └── SettingsSaveBar.tsx
```

Services:

```text
lib/
└── services/
    ├── settings.service.ts
    ├── profile.service.ts
    └── export.service.ts
```

Only create files that do not already exist.

---

# 54. Data Flow

Preferred:

```text
Authenticated User
       ↓
Supabase
       ↓
Settings Service
       ↓
Settings State
       ↓
Settings Components
       ↓
UI
```

Avoid direct Supabase calls from every individual toggle.

---

# 55. Supabase Preferences

If no settings table exists, use a minimal user preferences table.

Conceptually:

```text
user_settings
-------------
user_id
theme
font_scale
runic_borders
reduce_motion
high_contrast
dyslexic_typography
keyboard_navigation
completion_effects
morning_reminder_enabled
morning_reminder_time
streak_warning_enabled
achievement_notifications
level_up_fanfare
dossier_visibility
updated_at
```

Use the actual project schema if one exists.

Do not create unnecessary relational complexity.

---

# 56. Row Level Security

User settings must be private to the authenticated user.

Policy concept:

```text
auth.uid() = user_id
```

Users must only:

```text
SELECT their settings
INSERT their settings
UPDATE their settings
```

Do not allow one user to edit another user's preferences.

---

# 57. Loading State

Create LIFEQUEST skeletons for:

```text
Hero header
Character Profile
Realm Appearance
Accessibility
Account
Notifications
Privacy
Bottom save bar
```

Do not show a blank page.

---

# 58. Error State

Example:

```text
CODEX CONNECTION LOST
```

Message:

```text
Your realm preferences could not be synchronized.
```

Action:

```text
TRY AGAIN
```

Do not expose raw Supabase errors.

---

# 59. Responsive Design

## Desktop

```text
288px sidebar
64px header
12-column grid
6/6 column split
```

## Tablet

Use a reduced two-column or single-column layout depending on available width.

## Mobile

Stack all sections:

```text
Hero
Cloud status
Character Profile
Realm Appearance
Accessibility
Account
Notifications
Privacy
Save bar
```

Theme cards:

```text
1 column
```

Buttons:

```text
full-width where necessary
```

No horizontal overflow.

---

# 60. Mobile Sidebar

Reuse the global mobile navigation.

Behavior:

```text
hamburger
→ sidebar
→ backdrop
```

Close with:

- backdrop click
- navigation
- Escape

Do not create a second navigation system.

---

# 61. Accessibility

All settings controls must be keyboard accessible.

Use real:

```text
button
input
label
dialog
```

not clickable divs.

Every toggle requires an accessible label.

Example:

```html
<button
  role="switch"
  aria-checked={enabled}
  aria-label="Toggle Reduce Motion"
/>
```

Support:

```text
Tab
Enter
Space
Escape
```

---

# 62. Toggle Component

Create/reuse a shared:

```text
SettingsToggle
```

It should support:

```ts
checked
onChange
label
description
disabled?
```

Visual states:

### ON

```text
primary-container
thumb on-primary
```

### OFF

```text
surface-container-highest
thumb outline
```

Preserve Stitch's pill/toggle appearance.

---

# 63. Theme Card Accessibility

Theme selectors should be keyboard accessible.

Prefer:

```html
<button>
```

or:

```text
radio group
```

with:

```text
aria-checked
```

Do not make a plain `<div>` clickable.

---

# 64. Edit Dossier / Profile

If the Character page already implements:

```text
Edit Title & Sigils
```

reuse that flow.

Do not duplicate character editing logic in Settings.

Settings should call the shared profile service.

---

# 65. No Hardcoded User Data

Prototype values include:

```text
Arjun
Warrior-Scholar
Lvl 12
Silver III
arjun@example.com
LQ-9942
1,240 Gold
7 Day Streak
```

These must not become permanent production values.

Load them from:

```text
authenticated profile
progression
settings
```

---

# 66. No Password Storage

Never store or fetch plaintext passwords.

The Settings UI may display:

```text
••••••••••••
```

as a visual placeholder only.

Use Supabase Auth for password management.

---

# 67. No Guild Functionality

Explicitly do not implement:

```text
Guild Shop
Guild Treasury
Guild Announcements
Guild management
Guild membership
Guild passcode system
```

If a Guild field exists in the Stitch HTML only for visual context, remove it from the production UI unless the existing application genuinely supports it.

---

# 68. No Fake Notification System

Do not claim:

```text
Reminder dispatched
Alert scheduled
Fanfare enabled
```

unless the underlying system actually supports it.

Settings should store preferences.

Existing application systems consume those preferences.

---

# 69. Performance

- Prefer Server Components for initial data where practical.
- Use Client Components for interactive settings.
- Avoid making the whole application client-side unnecessarily.
- Fetch user settings once.
- Avoid writing to Supabase for every keystroke.
- Debounce autosave.
- Reuse shared components.
- Do not add unnecessary libraries.

---

# 70. Implementation Order

Because the project has a very limited deadline, implement in this order.

## Phase 1 — Visual

1. `/settings`
2. shared sidebar
3. shared header
4. hero
5. cloud status
6. Character Profile
7. Realm Appearance
8. Accessibility
9. Account
10. Notifications
11. Privacy
12. sticky save bar

## Phase 2 — UI State

1. theme selection
2. font scale
3. runic borders
4. accessibility toggles
5. notification toggles
6. visibility setting
7. discard draft
8. logout

## Phase 3 — Supabase

1. load settings
2. update settings
3. autosave
4. save status
5. profile integration
6. export data

## Phase 4 — Security

1. RLS
2. account deletion confirmation
3. auth integration
4. password update

## Phase 5 — QA

1. desktop
2. tablet
3. mobile
4. keyboard
5. refresh persistence
6. failure states

---

# 71. Acceptance Checklist

## Route

- [ ] `/settings` loads
- [ ] route is protected
- [ ] unauthenticated redirect works

## Navigation

- [ ] Settings is active
- [ ] Dashboard works
- [ ] Quests works
- [ ] Character works
- [ ] Achievements works
- [ ] Guild Shop is absent

## Visual

- [ ] Stitch layout closely reproduced
- [ ] dark LIFEQUEST theme preserved
- [ ] correct typography
- [ ] correct colors
- [ ] correct cards
- [ ] correct glows
- [ ] correct spacing
- [ ] correct responsive behavior

## Character Profile

- [ ] profile data is dynamic
- [ ] avatar renders
- [ ] edit profile works or connects to existing flow
- [ ] change avatar uses existing system where available
- [ ] no fake Guild system

## Appearance

- [ ] Dark Realm works
- [ ] Night Realm works
- [ ] Arcane Realm works
- [ ] Golden Realm works
- [ ] active state updates
- [ ] preference persists
- [ ] font scale works
- [ ] runic borders work

## Accessibility

- [ ] Reduce Motion works
- [ ] High Contrast works
- [ ] Dyslexic Typography works
- [ ] Keyboard Navigation preference works
- [ ] browser reduced-motion preference respected

## Account

- [ ] username is read-only
- [ ] email is read-only
- [ ] password is never exposed
- [ ] Change Password works
- [ ] session management does not pretend to work if unsupported

## Notifications

- [ ] completion effects setting works
- [ ] morning reminder setting works
- [ ] streak warning setting works
- [ ] achievement notification setting works
- [ ] level-up fanfare setting works
- [ ] Guild Announcements removed

## Privacy

- [ ] dossier visibility works
- [ ] no fake "Public to Guild"
- [ ] export JSON/CSV works
- [ ] export only includes current user's data

## Account Deletion

- [ ] destructive action requires confirmation
- [ ] confirmation clearly explains consequences
- [ ] user ownership is enforced
- [ ] account/data deletion uses secure backend flow
- [ ] logout/redirect occurs afterward

## Save

- [ ] autosave works
- [ ] saving state appears
- [ ] saved state appears only after success
- [ ] failed save is visible
- [ ] discard restores last saved values
- [ ] logout works

## Responsive

- [ ] desktop works
- [ ] tablet works
- [ ] mobile works
- [ ] no horizontal overflow
- [ ] mobile sidebar works
- [ ] sticky save bar works on mobile

## Accessibility

- [ ] all toggles keyboard accessible
- [ ] theme selectors keyboard accessible
- [ ] visible focus states
- [ ] proper labels
- [ ] dialog accessible
- [ ] Escape works
- [ ] color is not the only status indicator

---

# 72. Final Antigravity Instruction

Before coding:

1. Inspect the current repository.
2. Find the existing Next.js route structure.
3. Find the shared sidebar.
4. Find the shared header.
5. Find Supabase client setup.
6. Find authentication protection.
7. Find profile service.
8. Find existing settings/preferences schema.
9. Find existing toast/modal components.
10. Find existing theme/design-token system.

Reuse them.

Do not create duplicate architecture.

Then implement:

```text
/settings
```

using the supplied Stitch HTML as the visual source of truth.

The final screen must be:

```text
Stitch-level visual fidelity
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
real authenticated user data
+
persistent settings
+
responsive accessible UI
```

This must be a **working Settings screen**, not a static HTML mockup.

Critical scope rules:

```text
NO GUILD SHOP
NO /shop
NO GUILD SYSTEM
NO GUILD ANNOUNCEMENTS
NO FAKE NOTIFICATIONS
NO PLAINTEXT PASSWORDS
NO HARDCODED USER DATA
NO BROWSER ALERTS
NO DUPLICATE AUTH SYSTEM
NO DUPLICATE SETTINGS SYSTEM
```

Prioritize the required settings functionality and visual fidelity over adding new RPG systems.
