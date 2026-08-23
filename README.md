# Aetheria: The Cognitive Quest 🌌⚔️

[![Build & Release Android APK](https://github.com/damessner/aetheria-app/actions/workflows/build-apk.yml/badge.svg)](https://github.com/damessner/aetheria-app/actions/workflows/build-apk.yml)
[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?logo=react&logoColor=black)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-SDK_52-000020?logo=expo&logoColor=white)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-3.7_Flash-8E75B2?logo=google&logoColor=white)](https://ai.google.dev)
[![License: MIT](https://github.com/damessner/aetheria-app/raw/main/LICENSE)](LICENSE)

> **Aetheria** transforms evidence-based **Cognitive Behavioral Therapy (CBT)** and **Behavioral Activation (BA)** into an immersive, gamified fantasy realm-restoration mobile experience powered by **Google Gemini AI**.

> ⚠️ **Aetheria is a self-help tool, not a medical device.** It is not a substitute for professional diagnosis, therapy, or emergency care. In crisis, contact your local emergency number or visit [findahelpline.com](https://findahelpline.com).

---

## 📖 Table of Contents
* [1. Evidence-Based Clinical Foundation](#1-evidence-based-clinical-foundation)
* [2. Core Gameplay & Psychological Architecture](#2-core-gameplay--psychological-architecture)
* [3. Standout Features](#3-standout-features)
* [4. Modular Codebase Architecture](#4-modular-codebase-architecture)
* [5. Gemini AI Cognitive Engine](#5-gemini-ai-cognitive-engine)
* [6. GitHub Actions & Automated Releases](#6-github-actions--automated-releases)
* [7. Getting Started](#7-getting-started)
* [8. Testing & Verification](#8-testing--verification)

---

## 1. Evidence-Based Clinical Foundation

Unlike generic habit trackers that trigger avoidance and shame spirals through rigid streak resets, Aetheria directly operationalizes findings from clinical trials and meta-analyses:

* **Dual-Skill Clinical Synergy (*Furukawa et al., 2025*):** Prioritizes paired interventions—specifically **Behavioral Activation (BA) + Cognitive Restructuring (CR)** ($\Delta\text{PHQ-9} = -0.67$) to deliver durable symptom reduction up to 26 weeks.
* **Depression-Safe Economics:** Replaces single-day streak resets with **Vitality Resonance (0-100%)** and **Rest Shields**. Missing days bankrolls **Rest XP** for $2\times$ rewards upon return.
* **4-to-6-Week Program Window (*Bae et al., 2023*):** Maximizes adherence and effect sizes ($SMD = 0.77$) while eliminating program fatigue.
* **Circadian & Shift-Worker Adaptations:** Automatic low-blue-light OLED Dark Astral transitions between 23:00 and 06:00.

---

## 2. Core Gameplay & Psychological Architecture

```
                                  ┌──────────────────────────────────────────────┐
                                  │           DAILY RECOVERY CYCLE               │
                                  └──────────────────────────────────────────────┘
                                                          │
                   ┌──────────────────────────────────────┼──────────────────────────────────────┐
                   ▼                                      ▼                                      ▼
        [10% Battery: Somatics]                [40% Battery: Micro-BA]                [80% Battery: Deep Quest]
        • 30s Diaphragmatic Breath             • 1 Glass Water away from desk         • 15-min Outdoor Sunlight Walk
        • Name 3 Sensory Anchors               • Clean 1 Square Foot of Desk          • Complete Difficult Work Task
                   │                                      │                                      │
                   └──────────────────────────────────────┼──────────────────────────────────────┘
                                                          │
                                                          ▼
                                            ┌───────────────────────────┐
                                            │ Real-World Activation (BA)│
                                            └───────────────────────────┘
                                                          │
                                         ┌────────────────┴────────────────┐
                                         ▼                                 ▼
                             [Vitality Shards (VP)]             [Clarity Mana (MP)]
                             • Rebuild Sanctuary Flora          • Fuels Card Battle Deck
                             • Restore Realm Visuals            • Unlocks Reframing Cards
                                         │                                 │
                                         └────────────────┬────────────────┘
                                                          │
                                                          ▼
                                            ┌───────────────────────────┐
                                            │    THE MIND ARENA (CR)    │
                                            │ Turn-Based Distortion Boss│
                                            └───────────────────────────┘
```

---

## 3. Standout Features

### ⚔️ The Mind Arena (Tactical Socratic Card Battler)
* **Distortion Identification Phase:** Accurately diagnosing thinking traps (*Catastrophizing*, *Mind Reading*, *All-or-Nothing*, etc.) grants a **$1.5\times$ Damage Affinity Multiplier**.
* **Tactical Deckbuilding:** Play *Evidence Vaults*, *Compassion Shields*, and *Action Sparks* with turn-based Mana costs.
* **Codex of Wisdom:** Winning encounters stitches played cards into an encrypted permanent journal of balanced thoughts.

### 🔋 Dynamic Energy Slider (10% / 40% / 80%)
* User-selectable daily energy battery dynamically scales all quests from **30-second sensory grounding** to **micro-steps** and **outdoor daylight quests**.

### 🏛️ Living Sanctuary Realm & Totems
* Real-time visual Gloom clearance percentage (0% to 100%), blooming Vitality Flora, and Spirit Companions (*Kael the Owl-Sage*, *Pyra the Ember-Fox*, *Liora the Water-Nymph*).

### 📝 GTD Tasks with Relic Loot Drops
* Built-in task manager with one-tap Gemini task decomposition. Completing real-life tasks drops mythical relics (*Lens of Clarity*, *Aegis of Calm*) that permanently boost Arena combat stats.

### 🔥 The Campfire & Socratic Companion Dialogue
* Real-time Socratic self-discovery chat with the 3 Spirit Guardians powered by **Gemini 3.7 Flash**:
  * **🦉 Kael the Owl-Sage:** Cognitive restructuring, reality testing, and challenging cognitive distortions.
  * **🦊 Pyra the Ember-Fox:** Behavioral activation, micro-steps, and breaking task inertia.
  * **💧 Liora the Water-Nymph:** Compassion-focused therapy, somatic soothing, and radical self-kindness.
* **Insight Extraction:** 1-tap extraction of conversation breakthroughs into the **Codex of Wisdom** with $+25\text{ VP}$ and $+1\text{ Mana}$.

### 🌊 The Cognitive Stream (Streamlined Quiz & Family/Teaching Focus)
* Endless interactive feed of realistic everyday thoughts focused on:
  * **👨‍👧 Fatherhood & Parenting:** Bedtime tantrums, father guilt, losing patience, screen time vs presence.
  * **🏫 Teaching & Educator Mind:** Classroom chaos, grading exhaustion on Sunday night, parent inquiries, curriculum overwhelm.
  * **💑 Partnership & Marriage:** Unspoken resentment, division of household tasks, emotional withdrawal, rekindling warmth.
  * **🔋 Self-Restoration & Rest:** Dismantling rest guilt, sleep anxiety, chronic hurry sickness.
* **3-Tap Frictionless Quiz Architecture (Zero Mandatory Typing):**
  1. **Diagnose Thinking Trap (Quiz):** 6 interactive cards with instant color feedback & clinical explanation.
  2. **Select Therapeutic Technique & Method Codex:** Instant access to *why* and *how* the method works neurobiologically.
  3. **Select Optimal Reframe (Quiz):** Compare **Balanced Therapeutic Reframe** ($+30\text{ VP}$) vs **Toxic Positivity / Bypassing** vs **Defeatist Rationalization** with instant clinical scoring. *(Optional write-in toggle for advanced custom entry).*

### 📖 The Method Codex (Deep Theory & Neurobiology Guide)
* In-depth clinical guide covering **8 core therapeutic frameworks**:
  1. **CBT Evidence Vault (Aaron Beck):** dlPFC prefrontal down-regulation of amygdala panic.
  2. **Stoic Control (Epictetus & Marcus Aurelius):** Conserving ACC bandwidth; releasing external classroom/tantrum chaos.
  3. **Compassionate Friend (CFT - Paul Gilbert):** Oxytocin soothing-system activation against fatherhood/educator shame.
  4. **ACT Defusion Stream (Steven Hayes):** Decoupling linguistic default mode loops; values-driven action.
  5. **Behavioral Spark (Neil Jacobson):** Striatal dopamine momentum; 30-second kinetic activation.
  6. **Polyvagal Somatic Co-Regulation (Porges & Levine):** Ventral vagal brake & physiological sighs so children/students borrow your calm.
  7. **REBT Demand Disputer (Albert Ellis):** Converting dogmatic "musts/shoulds" into flexible preferences.
  8. **Schema Healthy Adult (Jeffrey Young):** Strengthening mature executive presence to protect vulnerable inner child.

### 📜 The Academy of Inner Alchemy (24 Masterclass Scrolls & Category Filter)
* Interactive 2-minute illustrated masterclasses that forge exclusive Combat Cards upon passing Socratic quizzes:
  1. *The View from Above (Stoic Decentering)* $\rightarrow$ `View from Above`
  2. *The Amygdala Hijack & Vagal Brake (Polyvagal Somatics)* $\rightarrow$ `Vagal Brake`
  3. *Dismantling the "Should" Monster (REBT Preferences)* $\rightarrow$ `Preferential Shield`
  4. *The Momentum Paradox (Behavioral Activation)* $\rightarrow$ `Kinetic Momentum`
  5. *The Father’s Co-Regulation Mirror (Parenting Somatics)* $\rightarrow$ `Co-Regulation Mirror`
  6. *The Educator’s Sovereign Citadel (Teaching Stoicism)* $\rightarrow$ `Sovereign Citadel`
  7. *The Gentle Inner Dialogue (Gilbert's Compassion)* $\rightarrow$ `Self-Kindness Aegis`
  8. *Leaves on a Stream (ACT Cognitive Defusion)* $\rightarrow$ `Defusion Current`
  9. *The Disowned Shadow (Jungian Projection in Family)* $\rightarrow$ `Shadow Integration`
  10. *The Meaning in the Burden (Viktor Frankl’s Logotherapy)* $\rightarrow$ `Will to Meaning`
  11. *The 90-Minute Ultradian Rhythm (Circadian Sleep)* $\rightarrow$ `Adenosine Tide`
  12. *The Cortisol Awakening Reset (Circadian Morning Anchor)* $\rightarrow$ `Dawn Light Anchor`
  13. *The Rupture and Repair Principle (Tronick Attachment)* $\rightarrow$ `Attachment Repair`
  14. *The Shield Against Compassion Fatigue (Figley Caregiver Science)* $\rightarrow$ `Empathic Boundary`
  15. *The 5:1 Magic Ratio in Marriage (Gottman Couples Therapy)* $\rightarrow$ `Magic Ratio Aegis`
  16. *The Non-Violent Communication Matrix (Rosenberg NVC)* $\rightarrow$ `Compassionate Request`
  17. *The Window of Tolerance (Siegel & Ogden Somatics)* $\rightarrow$ `Tolerance Anchor`
  18. *The Pygmalion Effect in Education (Rosenthal Expectancies)* $\rightarrow$ `Pygmalion Catalyst`
  19. *Scaffolding the Zone of Proximal Development (Vygotsky & Bruner)* $\rightarrow$ `Scaffold Aegis`
  20. *The Four Tendencies Motivation Matrix (Gretchen Rubin)* $\rightarrow$ `Accountability Matrix`
  21. *Positivity Resonance & Micro-Connections (Fredrickson Love Biology)* $\rightarrow$ `Resonance Pulse`
  22. *The Archer’s Arrow in Family & Classroom (Stoic Duty)* $\rightarrow$ `Archer’s Virtue`
  23. *The Autonomic Nervous System Ladder (Polyvagal Somatics)* $\rightarrow$ `Ventral Ladder`
  24. *Socratic Elenchus in Cognitive Restructuring (Socrates & Beck)* $\rightarrow$ `Socratic Blade`

### 🪞 The Mind Mirror (Visual Analytics, Progress Hub & Self-Understanding)
* **Visual Progress & Trophies Hub (`ProgressDashboard.tsx`):**
  * **7-Day Vitality Trajectory Bar Chart:** Interactive day-by-day vertical bar chart showing daily Vitality Points (VP) earned and active day tracking.
  * **Dynamic Streak Flame & Multiplier:** Daily reflection streak counter with active multipliers ($1.0\times \rightarrow 1.15\times \rightarrow 1.3\times \rightarrow 1.5\times$ VP boost) and **Grace Freeze Shields** to protect parents and teachers on chaotic days.
  * **4 Cardinal Virtues Matrix:** Visual progress gauges for *Courage*, *Integrity*, *Temperance*, and *Humility* ranging from *Novice Initiate* to *Sovereign Master*.
  * **Sanctuary Biome Metamorphosis Gauge:** Visual percentage tracker of gloom dispersal across *Gloomspire Grove*, *The Shattered Obelisk*, and *The Celestial Beacon*.
  * **8 Tiered Alchemical Trophies & Badges:** Unlockable achievement trophies (*The Father’s Anchor*, *The Sovereign Educator*, *Relational Architect*, *Stoic Sage*, *Vagal Alchemist*, *Crucible Vanguard*, *Unshakeable Flame*, *Circadian Guardian*) with claimable VP rewards.
* **Distortion Heatmap:** Visual breakdown of your personal cognitive distortion traps and total thoughts reframed.
* **Circadian Energy Correlations:** Analytics linking low battery periods (10%) with distortion vulnerability.
* **Schema Archetype Mirror (Young's Schema Therapy):** Socratic excavation of core survival rules (*The Unrelenting Perfectionist*, *The Vigilant Sentinel*, *The Selfless Caretaker*) and conversion to healthy adult truths.
* **ACT Values Constellation Sky:** 4 celestial pillars (*Connection & Love*, *Craft & Mastery*, *Vitality & Body*, *Play & Wonder*) that illuminate as you take aligned actions.

### 🌑 The Shadow Crucible (10 Core Character Flaws & Radical Honesty)
* An uncompromising psychological crucible rooted in **Jungian Shadow Work, Stoic Virtue Ethics, and Psychoanalytic Defense Analysis**:
  1. **🦚 The Fragile Ego:** Vanity, intellectual defensiveness & need for validation $\rightarrow$ *Radical Humility*.
  2. **⏳ The Chronic Evader:** Sloth, digital dopamine addiction & discomfort avoidance $\rightarrow$ *Kinetic Discipline*.
  3. **🧊 The Bitter Cynic:** Resentment, silent grudges & moral superiority $\rightarrow$ *Earnest Fortitude*.
  4. **🎭 The People-Pleaser:** Cowardice, chameleonic fawning & conflict avoidance $\rightarrow$ *Authentic Backbone*.
  5. **👑 The Control Tyrant:** Micromanagement, impatience & distrust of others $\rightarrow$ *Radical Trust*.
  6. **🕳️ The Professional Victim:** Learned helplessness, wallowing & agency surrender $\rightarrow$ *Sovereign Agency*.
  7. **🐍 The Secret Envier:** Malicious social comparison & begrudging peers' success $\rightarrow$ *Mudita (Generous Joy)*.
  8. **🌪️ The Emotional Tyrant:** Explosive reactivity, mood drama & walking-on-eggshells $\rightarrow$ *Stoic Self-Regulation*.
  9. **💰 The Scarcity Hoarder:** Stinginess with money, time, praise & vulnerability $\rightarrow$ *Magnanimous Abundance*.
  10. **🥀 The Hypocritical Moralist:** Self-righteous double standards & virtue posturing $\rightarrow$ *Uncompromising Integrity*.
* **Deep Psychological Dossiers:** Detailed psychoanalytic root anatomy, seductive self-deceptions, hidden relational poison, and Socratic razor probes.
* **Socratic Blindspot Inquest (Gemini 3.7 Flash):** Uncompromising AI interrogation that cuts through excuses and rationalizations.
* **Real-World Anti-Flaw Vows:** Concrete friction challenges that forge the **4 Cardinal Virtues (Courage, Integrity, Temperance, Humility)**.

### 🌙 Behavior Therapy for Insomnia (BI) & Somatics
* **Sleep Efficiency Diary:** Clinically validates time-in-bed vs time-asleep with $\ge 85\%$ target thresholds.
* **Stimulus Control:** Dedicated 20-minute bed reset protocol to recondition healthy sleep-bed associations.
* **Diaphragmatic Breath Pacer:** Integrated 4-4-6 somatic parasympathetic pulse generator for pre-sleep calming.

### 🔨 7-Step Structured Problem-Solving (PS)
* Arean et al. / Furukawa et al. clinical 7-step wizard: Concrete stressor definition, Gemini-assisted divergent brainstorming, feasibility matrix, baby-step decomposition, and offline physical execution anchors.

### 🌓 Circadian Phenotyping & Shift-Worker Engine
* Full multi-chronotype support: **Standard Daytime (07:00–23:00)**, **Night-Owl / Delayed Phase (14:00–04:00)**, and **Rotating Shift Worker**.

### 📊 2D Valence-Arousal Mood Tracker
* 5-second Ecological Momentary Assessment (EMA) on a 2D grid (Pleasure vs Energy) paired with behavioral correlational insights.

### 🛡️ Offline Multi-Country Emergency Safety Bridge
* 100% offline-bundled emergency hotline directory with 1-tap dialer for **US (988)**, **Canada (988)**, **UK (111 / Samaritans)**, **Germany (0800 111 0 111)**, **Australia (13 11 14)**, and **Global (findahelpline.com)**.

---

## 4. Modular Codebase Architecture

```
src/
├── components/              # Shared UI kit (SectionCard, ScreenHeader, buttons) & error boundary
├── content/                 # Static seed content (combat deck, quests, thought feed, wisdom scrolls)
├── core/
│   ├── ai/gemini.ts            # Google Gemini AI Client (Gemini 3.7 Flash default, SecureStore key)
│   ├── database/db.ts          # Local persistence (AsyncStorage) — seeds live in src/content
│   ├── eventbus/EventBus.ts    # Decoupled Reactive Event Bus
│   ├── export/                 # Clinician progress summary (share sheet)
│   ├── notifications/          # Real local notification scheduling for routines
│   ├── ota/                    # GitHub Releases APK update checker + banner
│   ├── routines/               # Book routine scheduling w/ daily reminders
│   ├── security/               # Crisis-language detection, crisis directory, secure key storage
│   ├── spacedrepetition/       # Ebbinghaus-style recall scheduler
│   ├── state/appStore.ts       # Zustand single source of truth for app state
│   ├── sync/                   # GitHub content sync with SHA-256 integrity checks
│   ├── theme/index.ts          # Dark Astral & Circadian OLED Palette
│   └── types/index.ts          # Core Domain Interfaces & Chronotypes
├── features/
│   ├── academy/                # Academy of Inner Alchemy & Wisdom Scrolls (REBT, Stoicism, Neuroscience)
│   ├── analytics/              # The Mind Mirror (Distortion Heatmap, Schemas, ACT Values)
│   ├── arena/                  # Mind Arena Card Battler Engine & Screens (CR)
│   ├── campfire/               # The Campfire Socratic Companion Dialogue (Gemini 3.7 Flash)
│   ├── energy/                 # Dynamic Battery Selector (10%, 40%, 80%)
│   ├── mood/                   # 2D Valence-Arousal Mood Tracker
│   ├── problemsolving/         # 7-Step Structured Problem Solving (PS)
│   ├── quests/                 # Behavioral Activation Quest Board & Decomposition (BA)
│   ├── safety/                 # Crisis Bridge Modal
│   ├── sanctuary/              # Visual Biome & Totem Progression (8-Week Roadmap)
│   ├── settings/               # API Key, Model Selection, Chronotypes & Clinician PDF Export
│   ├── shadow/                 # The Shadow Crucible (10 Character Flaws, Socratic Inquests & Vows)
│   ├── sleep/                  # Sleep Efficiency & Stimulus Control Therapy (BI)
│   ├── thoughtstream/          # The Cognitive Stream & Thought Alchemy Dojo
│   └── tasks/                  # GTD Tasks & Relic Loot Drops
└── navigation/AppNavigator.tsx # Bottom Tabs & Global Event Subscriptions
```

---

## 5. Gemini AI Cognitive Engine

Aetheria integrates **Google Gemini (defaulting to Gemini 3.7 Flash with selectable 2.5 Flash / 2.5 Pro models)** for three key clinical capabilities:

1. **Socratic Reframe Mirror:** Type in any raw, distressing thought. Gemini identifies the cognitive distortion, constructs a personalized Distortion Phantom boss, and generates 3 tailored counter-cards.
2. **Intelligent Task Decomposer ("Break Down" Button):** Deconstructs overwhelming tasks into 3 gentle, atomic micro-steps based on the user's current energy tier.
3. **Dynamic Quest Weaver:** Crafts custom Behavioral Activation quests tailored to the user's context.

*Note: If offline, Aetheria seamlessly activates local heuristic fallbacks with zero crash risk.*

---

## 6. GitHub Actions & Automated Releases

* **Automated APK Builder (`.github/workflows/build-apk.yml`):**
  Triggered on pushes to `main` and version tags (`v*`). Gates every build on
  TypeScript typecheck + unit tests, compiles release & debug APKs, signs them
  with a stable keystore (so updates install over previous versions), stamps
  `versionName`/`versionCode` from the tag, and attaches APKs to a GitHub Release.
  The in-app updater polls your repo's Releases API on startup.
* **Content sync integrity:** remote content payloads are verified against
  SHA-256 hashes declared in `content/manifest.json` before being applied.

---

## 7. Getting Started

### Prerequisites
* [Node.js](https://nodejs.org) (v24+) or [Bun](https://bun.sh) (v1.4+)
* [Expo Go](https://expo.dev/go) app (SDK 52) on your Android physical device

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/damessner/aetheria-app.git
cd aetheria-app

# 2. Install dependencies
bun install   # or npm install

# 3. Start development server
bun start     # or npx expo start
```

### Running on Android
* **Physical Device:** Open the **Expo Go** app on your phone and scan the terminal QR code.
* **Android Emulator:** Press `a` in the terminal to launch the Android emulator.
* **Web Preview:** Press `w` in the terminal.

---

## 8. Testing & Verification

Run the automated unit test suite (63 tests: combat math, crisis detection, content integrity, clinical modules):
```bash
bun test
```

Run TypeScript compiler typecheck:
```bash
bunx tsc --noEmit
```
Both gates run automatically in CI before any APK is built.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for details.
