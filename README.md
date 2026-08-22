# Aetheria: The Cognitive Quest 🌌⚔️

[![Build & Release Android APK](https://github.com/damessner/aetheria-app/actions/workflows/build-apk.yml/badge.svg)](https://github.com/damessner/aetheria-app/actions/workflows/build-apk.yml)
[![Over-The-Air Update](https://github.com/damessner/aetheria-app/actions/workflows/ota-update.yml/badge.svg)](https://github.com/damessner/aetheria-app/actions/workflows/ota-update.yml)
[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?logo=react&logoColor=black)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-SDK_52-000020?logo=expo&logoColor=white)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-Flash_1.5-8E75B2?logo=google&logoColor=white)](https://ai.google.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

> **Aetheria** transforms evidence-based **Cognitive Behavioral Therapy (CBT)** and **Behavioral Activation (BA)** into an immersive, gamified fantasy realm-restoration mobile experience powered by **Google Gemini AI**.

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

### 📊 2D Valence-Arousal Mood Tracker
* 5-second Ecological Momentary Assessment (EMA) on a 2D grid (Pleasure vs Energy) paired with behavioral correlational insights.

### 🛡️ Offline Multi-Country Emergency Safety Bridge
* 100% offline-bundled emergency hotline directory with 1-tap dialer for **US (988)**, **Canada (988)**, **UK (111 / Samaritans)**, **Germany (0800 111 0 111)**, **Australia (13 11 14)**, and **Global (findahelpline.com)**.

---

## 4. Modular Codebase Architecture

```
src/
├── core/
│   ├── ai/gemini.ts            # Google Gemini AI Client (Socratic Reframe, Task Splitter)
│   ├── database/db.ts          # Encrypted Local Storage & Seed Persistence
│   ├── eventbus/EventBus.ts    # Decoupled Reactive Event Bus
│   ├── ota/UpdateManager.ts    # In-App GitHub Releases & OTA Update Checker
│   ├── ota/UpdateBanner.tsx    # 1-Tap Update Notification Banner
│   ├── security/crisisDirectory.ts # Offline International Crisis Database
│   ├── theme/index.ts          # Dark Astral & Circadian OLED Palette
│   └── types/index.ts          # Core Domain Interfaces
├── features/
│   ├── arena/                  # Mind Arena Card Battler Engine & Screens
│   ├── energy/                 # Dynamic Battery Selector
│   ├── mood/                   # 2D Valence-Arousal Mood Tracker
│   ├── quests/                 # Behavioral Activation Quest Board & Decomposition
│   ├── safety/                 # Crisis Bridge Modal
│   ├── sanctuary/              # Visual Biome & Totem Progression
│   ├── settings/               # API Key, GitHub Repo & Clinician PDF Export
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

Aetheria comes pre-configured with two automated GitHub Actions CI/CD workflows:

* **Automated APK Builder (`.github/workflows/build-apk.yml`):**
  Triggered when pushing a version tag or manually via Actions dispatch. Compiles a release Android APK and publishes it to your repository's GitHub Releases page using **Node.js 24 & Temurin JDK 17**.
* **Instant OTA Updates (`.github/workflows/ota-update.yml`):**
  Pushes instant Over-The-Air JavaScript/Asset bundle updates to active devices on `git push` to `main`.
* **In-App Updater (`UpdateBanner.tsx`):**
  The app polls your GitHub Releases API on startup and notifies users when a new APK release is available.

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

Run the automated unit test suite:
```bash
bun test
```
* **Combat Engine Mathematics:** Distortion affinity multipliers ($1.5\times$ vs $0.8\times$), shield absorption, and mana constraints.
* **Event Bus:** Cross-module event propagation.

Run TypeScript compiler typecheck:
```bash
bunx tsc --noEmit
```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for details.
