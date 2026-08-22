# Aetheria: The Cognitive Quest (V2.0 Master Specification)
## Production-Grade Android Product Requirements & Technical Architecture Document

---

## 1. Executive Review & Strategic Critique of Initial Plan

### 1.1 What the Initial Plan Got Right
* **Evidence-Based Dual-Skill Paradigm:** Grounding the curriculum in Furukawa et al. (2025) ($\Delta\text{PHQ-9} = -0.67$) gives the application real clinical credibility over generic wellness trackers.
* **Depression-Safe Philosophy:** Eliminating punitive streak resets and introducing Rest Shields directly addresses the shame/guilt avoidance spirals that plague standard habit-tracking apps.
* **Targeted Intervention Duration:** Restricting the core campaign to 6 weeks aligns with Bae et al. (2023) meta-analyses showing peak engagement and effect sizes ($SMD = 0.77$).

### 1.2 Critical Gaps & Areas for Dramatic Improvement
1. **Combat & Reframing Game Feel (Too Rigid):** The initial combat formula (`Length Penalty * Keyword Match`) feels like an archaic regex validator. Players will feel graded by a bot rather than empowered. Reframing must feel like an intuitive tactical card deckbuilder (combining Evidence, Cognitive Tools, and Compassion).
2. **Executive Dysfunction & "Zero-Energy" Barrier:** Depression causes acute cognitive fatigue. If a user opens the app with 5% personal battery, even a "5-minute walk" feels impossible. The app needs a **Dynamic Energy Slider (10% / 40% / 80%)** and a **Zero-Energy Micro-Win Engine** (e.g., 30-second sensory grounding).
3. **Missing Android Platform Capabilities:** The initial spec treated Android as a generic viewport. A top-tier Android app must leverage:
   * **Android Health Connect API:** Automatically validates real-world Behavioral Activation (e.g., steps, outdoor sunlight, sleep duration) to remove manual logging friction.
   * **Jetpack Glance Widgets:** Home screen and lock screen sanctuary status and 1-tap micro-quest logging.
   * **Material You / Dynamic Theming:** Adapts seamlessly to system wallpaper palette with strict Circadian/Night-Owl OLED low-blue-light overrides.
   * **Android Keystore & BiometricPrompt:** Zero-friction fingerprint/face unlock for encrypted local reflection vaults.
4. **Globalized Crisis Safety:** PHQ-9 Item 9 check is necessary but insufficient. Emergency routing must support international emergency hotlines (US 988, UK 111, EU 112, etc.) based on device locale/MCC, with 100% offline fallback directory.
5. **Therapist / Clinician Export Bridge:** Bridging digital self-care and professional therapy via one-click encrypted PDF clinical summary exports (PHQ-9/GAD-7 trajectories, distortion patterns, behavioral compliance).

---

## 2. Core Game Loop & Psychological Engine

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
                                            │  (Health Connect Verified)│
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
                                                          │
                                                          ▼
                                            ┌───────────────────────────┐
                                            │ SANCTUARY REST & RECOVERY │
                                            │  Rest Shields & Sync      │
                                            └───────────────────────────┘
```

### 2.1 The "Energy Battery" Adaptive Engine
Upon launching the app, the user is greeted with a gentle, non-judgmental prompt: *"How much energy do you have today?"*
* **Low Spark (10-30% Energy):**
  * Quests: Zero-movement or single-step grounding (e.g., "Look out the window and find 2 green objects", "Take 3 deep breaths with the Spirit Animal").
  * Rewards: Full VP and Rest Shields (no penalty for low energy).
* **Steady Flame (40-70% Energy):**
  * Quests: Micro-activation (e.g., "Drink 1 glass of water", "Stretch for 2 minutes", "Open IDE and write one function signature").
* **Blazing Radiance (80-100% Energy):**
  * Quests: Value-based social or physical engagement (e.g., "20-minute brisk walk", "Text a friend", "Complete stalled chore").

### 2.2 Anti-Frustration & Depression-Safe Architecture
1. **Never Break a Streak (Cumulative Momentum):**
   * Traditional streaks are replaced by **Vitality Resonance (0% to 100%)**.
   * Missing a day causes a gentle 5% drift, but automatically bankrolls **"Rest Resonance"**, giving 2x rewards on the next active session.
2. **The "Break It Down" Deconstructor Button:**
   * Any overwhelming quest features a one-tap AI/Heuristic sub-task splitter.
   * Example: *"Clean Kitchen"* $\rightarrow$ [1. Put away 1 mug] $\rightarrow$ [2. Wipe one counter spot] $\rightarrow$ [3. Stop or continue].
3. **Circadian / Night-Owl Mode (23:00 - 06:00):**
   * UI switches automatically to pure OLED black (`#0A0A0E`) with amber/warm accents (blue-light filtered).
   * High-intensity quests are hidden; replaced by Sleep Hygiene & Diaphragmatic Somatics.

---

## 3. The Mind Arena: Card Battler Cognitive Restructuring

Instead of passive text fields, cognitive reframing is gamified as a tactical, rewarding card encounter against **Distortion Phantoms** (e.g., *The Catastro-Phantom*, *The Black-and-White Golem*, *The Mind-Reader Imp*).

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Boss: Catastro-Phantom]  HP: [████████████░░░░] 60/100   Distortion: ???        │
│ Quote: "If this code review fails, I will be fired and lose everything."        │
├─────────────────────────────────────────────────────────────────────────────────┤
│ PHASE 1: TARGETING (Identify Thinking Trap)                                     │
│ [ (A) Catastrophizing ]  [ (B) Personalization ]  [ (C) Emotional Reasoning ]   │
├─────────────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: COMBAT HAND (Play 2 Cards)                                             │
│ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐               │
│ │ EVIDENCE VAULT    │ │ COMPASSION SHIELD │ │ DE-CATASTROPHIZER │               │
│ │ Cost: 1 MP        │ │ Cost: 1 MP        │ │ Cost: 2 MP        │               │
│ │ "I have fixed     │ │ "One review does  │ │ "What is the most │               │
│ │  hard bugs before"│ │  not define worth"│ │  probable outcome"│               │
│ │ ATK: 25 DMG       │ │ SHIELD: 30 Block  │ │ ATK: 40 DMG (x1.5)│               │
│ └───────────────────┘ └───────────────────┘ └───────────────────┘               │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Combat Formula & Resolution
$$\text{Damage Dealt} = \left(\text{Card Base Damage} \times \text{Distortion Affinity}\right) + \text{Evidence Shard Bonus} + \text{Synergy Multiplier}$$

* **Distortion Affinity:**
  * If the player accurately identifies the distortion in Phase 1: Affinity $= 1.5\times$.
  * If partially correct (related distortion): Affinity $= 1.0\times$.
  * If incorrect: Affinity $= 0.8\times$ (Encouraging feedback: *"The Phantom resisted slightly — examine its words again"*).
* **Physical-to-Digital Synergy:**
  * Completing real-world BA quests generates **Clarity Mana (MP)** required to cast high-tier legendary Reframing Cards.
* **Post-Battle Journal Synthesis:**
  * When the Phantom is defeated, the selected cards are automatically stitched into a polished, positive counter-thought and saved to the player's encrypted **Codex of Wisdom**.

---

## 4. Visual Realm & Sanctuary Rebuilding

The visual progression acts as a tangible metaphor for neural plasticity and cognitive recovery.
* **Biome 1 (Week 1-2): Gloomspire Grove:** Foggy, withered forest $\rightarrow$ Clears into vibrant twilight flora as BA micro-quests are completed.
* **Biome 2 (Week 3-4): The Shattered Obelisk:** Fractured marble ruins $\rightarrow$ Reconstructs into an illuminated sanctuary as Cognitive Restructuring battles are won.
* **Biome 3 (Week 5-6): The Celestial Beacon:** Restores circadian skies, dynamic night sky constellations mapped to completed weeks.
* **Spirit Companions (Totems):**
  * *Pyra the Ember-Fox:* Represents Behavioral Spark & Motivation.
  * *Kael the Owl-Sage:* Represents Cognitive Clarity & Logic.
  * *Liora the Water-Nymph:* Represents Self-Compassion & Somatic Calm.

---

## 5. Technical Architecture for Android (Native High Performance)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            ANDROID CLIENT (Kotlin)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  UI & Presentation Layer (Jetpack Compose + Material 3 Dynamic Color)       │
│  ├── Sanctuary Canvas (Rive Vector 60fps Runtime)                           │
│  ├── Mind Arena Card Battler (Compose Animation Spec)                       │
│  └── Glance App Widgets (Home Screen / Lock Screen Micro-Interactions)      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Domain & State Layer (Clean Architecture + Kotlin Coroutines & Flow)       │
│  ├── QuestEngine (Energy Adaptive Pipeline)                                 │
│  ├── CombatEngine (Deterministic Card Resolution)                           │
│  ├── HealthConnectSyncEngine (Background Activity Extraction)               │
│  └── ClinicalSafetyGuard (Real-Time Heuristic Monitor)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Local-First Persistence & Cryptography Layer                               │
│  ├── Encrypted Room Database (SQLCipher AES-256-GCM)                        │
│  ├── Android Keystore + BiometricPrompt (Hardware-Backed Master Key)        │
│  └── Offline Crisis Hotline Directory (Pre-bundled SQLite)                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Background Tasks & OS Bridges (Jetpack WorkManager)                        │
│  ├── Health Connect Periodic Pull (Steps / Sleep Session)                   │
│  ├── Circadian Night-Owl Schedule Controller                                │
│  └── Zero-Knowledge Encrypted Backup Worker                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                               (Opt-in E2EE Sync)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      SECURE CLOUD LAYER (Zero-Knowledge)                    │
│  • KTor / FastAPI Backend (E2EE Encrypted Blobs only)                       │
│  • Client-Derived Argon2id Passphrase Key (Zero Server-Side Decryption)     │
│  • Async Email Digest Worker (Weekly Summaries without intrusive push)      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.1 Android Platform Stack Recommendations
* **Language & UI:** 100% Kotlin with **Jetpack Compose** for lightning-fast, reactive UI rendering.
* **Animation & Visuals:** **Rive for Android (C++ Runtime)** for vector-based sanctuary rendering (< 2MB asset footprint, 60/120fps refresh rate with near-zero CPU drain).
* **Activity Tracking:** **Android Health Connect API** (permits reading `StepsRecord`, `SleepSessionRecord`, and `TotalCaloriesBurnedRecord` with granular user permission).
* **Widgets:** **Jetpack Glance** for modern, battery-efficient interactive home screen widgets.
* **Local Cryptography:** **SQLCipher on Room DB** backed by hardware-isolated `AndroidKeyStore` (`MasterKey` with AES256-GCM and biometric authentication gates for journal access).
* **Target APK Specs:** Under **28MB** initial download size, ProGuard/R8 Full Mode enabled, Baseline Profiles generated for **< 350ms cold-start time**.

---

## 6. Complete Data Models & Schemas (V2.0)

### 6.1 User State & Progression (`UserState.json`)
```json
{
  "schemaVersion": "2.0",
  "userId": "usr_7a8f9c12e",
  "createdAt": "2026-08-22T19:00:00Z",
  "campaignWeek": 3,
  "vitalityResonance": 0.82,
  "energyLevel": "STEADY_40",
  "vitalityPoints": 540,
  "clarityMana": 4,
  "restShields": 2,
  "activeBiome": "SHATTERED_OBELISK",
  "sanctuaryProgression": {
    "gloomClearingPercentage": 65.5,
    "unlockedCompanions": ["PYRA_FOX", "KAEL_OWL"],
    "activeCompanion": "KAEL_OWL"
  },
  "stats": {
    "mindShield": 55,
    "logicEdge": 70,
    "compassionAura": 48
  },
  "deckConfiguration": {
    "equippedCardIds": [
      "crd_evidence_vault",
      "crd_compassion_shield",
      "crd_decatastrophize_v2",
      "crd_action_spark"
    ]
  },
  "preferences": {
    "healthConnectEnabled": true,
    "circadianMode": "AUTOMATIC",
    "biometricVaultLock": true,
    "localeEmergencyCode": "auto"
  }
}
```

### 6.2 Health Connect Integrated Quest (`QuestItem.json`)
```json
{
  "questId": "qst_act_sunlight_003",
  "category": "BEHAVIORAL_ACTIVATION",
  "clinicalSkill": "BA",
  "energyTier": "STEADY_40",
  "title": "Sunlight Resonance",
  "description": "Step outdoors for 10 minutes to synchronize your circadian clock.",
  "microDecomposition": [
    "Put on shoes and step to the door",
    "Step outside into natural daylight",
    "Breathe deeply for 10 minutes"
  ],
  "verificationMode": {
    "type": "HEALTH_CONNECT_OR_MANUAL",
    "healthConnectMetric": "STEPS",
    "targetDelta": 800,
    "fallbackManualConfirm": true
  },
  "rewards": {
    "vitalityPoints": 60,
    "clarityMana": 2,
    "biomeGrowthPoints": 15
  }
}
```

### 6.3 Tactical Card Battle Object (`CardBattle.json`)
```json
{
  "encounterId": "enc_boss_mind_reader_02",
  "enemy": {
    "name": "Shadow of Assumption",
    "archetype": "Mind-Reading / Jumping to Conclusions",
    "healthPoints": 80,
    "maxHealthPoints": 80,
    "dialoguePrompt": "They didn't reply to my message within 10 minutes. They must be angry with me.",
    "distortionClues": ["mind_reading", "catastrophizing"]
  },
  "distortionOptions": [
    { "id": "mind_reading", "label": "Mind Reading", "isCorrect": true },
    { "id": "all_or_nothing", "label": "All-or-Nothing Thinking", "isCorrect": false },
    { "id": "emotional_reasoning", "label": "Emotional Reasoning", "isCorrect": false }
  ],
  "availableHand": [
    {
      "cardId": "crd_reality_check",
      "name": "Alternative Hypothesis",
      "manaCost": 1,
      "baseDamage": 30,
      "distortionBonus": { "target": "mind_reading", "multiplier": 1.6 },
      "quote": "There are dozens of neutral reasons they haven't replied yet (busy, away, working)."
    },
    {
      "cardId": "crd_compassion_shield",
      "name": "Inner Sanctuary",
      "manaCost": 1,
      "shieldValue": 35,
      "quote": "My sense of safety does not depend on immediate external validation."
    }
  ]
}
```

---

## 7. Clinical Safety, Crisis Bridge & Clinician Export

### 7.1 International Multi-Tier Emergency Safety Engine

```
                             [JOURNAL ENTRY / PHQ-9 INPUT]
                                          │
                                          ▼
                      ┌───────────────────────────────────────┐
                      │    Real-Time Heuristic Crisis Scan    │
                      └───────────────────────────────────────┘
                                          │
                       ┌──────────────────┴──────────────────┐
                       ▼                                     ▼
             [Standard Progression]                [Crisis Pattern Detected]
             (Continue Campaign)             (PHQ-9 Q9 >= 2 OR High-Risk Keyword)
                                                             │
                                                             ▼
                                                ┌─────────────────────────┐
                                                │   EMERGENCY OVERLAY     │
                                                │  (Non-dismissable Top)  │
                                                ├─────────────────────────┤
                                                │ • Soft Serene UI Palette│
                                                │ • 1-Tap Geolocation Call│
                                                │ • Direct SMS Crisis Link│
                                                │ • Emergency Safety Plan │
                                                └─────────────────────────┘
```

#### Multi-Country Crisis Database (Bundled Offline)
* **United States & Canada:** Call / Text `988`
* **United Kingdom:** Call `111` (NHS Mental Health) or Call `116 123` (Samaritans)
* **European Union:** Call `112` or local national helpline (e.g., Germany: `0800 111 0 111`)
* **Australia:** Call `13 11 14` (Lifeline)
* **Global Fallback:** `https://findahelpline.com` integrated web intent + Offline Safety Plan Generator.

### 7.2 Clinician / Therapist PDF Export Engine
Patients can generate a clean, cryptographically signed, HIPAA/GDPR-compliant PDF report on device to bring to their therapist:
1. **Symptom Trajectories:** 6-week line charts of PHQ-9 and GAD-7 scores with baseline vs. current delta ($\Delta$).
2. **Top Cognitive Distortions Identified:** Pie chart showing the user's most frequent thinking traps (e.g., 42% Catastrophizing, 28% All-or-Nothing).
3. **Behavioral Activation Log:** Cumulative step counts, outdoor sunlight duration, and completed real-world challenges.
4. **Crisis Plan Summary:** Pre-filled warning signs, internal coping strategies, and trusted emergency contacts.

---

## 8. Android APK Implementation Roadmap & Milestones

| Sprint / Phase | Deliverables & Milestones | Clinical / Technical Verification |
| :--- | :--- | :--- |
| **Phase 1: Core Foundation (Weeks 1-2)** | • Project setup (Jetpack Compose, Room, SQLCipher, Keystore)<br>• User State & Dynamic Energy Engine (10/40/80%)<br>• Local encrypted offline database setup | • 100% offline data integrity tests<br>• Biometric vault unlock validation |
| **Phase 2: Game Loop & Battler (Weeks 3-4)** | • Rive Sanctuary 60fps canvas integration<br>• The Mind Arena Card Battler (Turn-based logic & hand management)<br>• Cognitive Distortion Bestiary & Codex | • Deck balancing and combat state unit tests<br>• Memory leak & 60fps frame rate audit |
| **Phase 3: Sensor & Android Magic (Weeks 5-6)** | • Android Health Connect API integration (Steps & Sleep)<br>• Jetpack Glance Home/Lock screen widgets<br>• Circadian / Night-Owl low-blue-light OLED theme engine | • Battery drain benchmark (< 2% daily overhead)<br>• Permissions graceful degradation tests |
| **Phase 4: Safety & Clinical Bridge (Weeks 7-8)** | • PHQ-9 & GAD-7 Weekly Soul Check Survey engine<br>• Multi-country Emergency Crisis Bridge (Offline)<br>• Therapist PDF Report generation engine | • High-risk trigger heuristic automated testing<br>• PDF rendering and formatting verification |
| **Phase 5: Polish & APK Hardening (Weeks 9-10)** | • R8/ProGuard shrinking & obfuscation<br>• Android Baseline Profiles generation (<350ms cold start)<br>• Google Play Store compliance & SaMD disclaimer audits | • APK size verification (< 28MB)<br>• Strict zero-tracker network traffic audit |

---

## 9. Modular Architecture & Future Feature Extensibility

To support seamless future upgrades (Calendar, Task Management, Comprehensive Activity Tracking, and Longitudinal Mood Analytics), the Android application uses a **Multi-Module Feature Architecture** with decoupled Clean Architecture boundaries.

### 9.1 Multi-Module Gradle Structure

```
:app (Application entrypoint, Navigation Graph, Dependency Injection Assembly)
│
├── :core
│   ├── :core:database       (Encrypted Room DB, SQLCipher, Migration Manager)
│   ├── :core:network        (Zero-Knowledge Sync, Retrofit/Ktor)
│   ├── :core:security       (Android Keystore, BiometricAuth, Heuristic Safety)
│   ├── :core:designsystem   (Material 3, Rive Engine Canvas, Dynamic Themes)
│   └── :core:model          (Shared Domain Entities: User, Timestamp, EnergyTier)
│
└── :feature
    ├── :feature:campaign    (6-Week Narrative & Biome Visuals)
    ├── :feature:arena       (Card Battler & Cognitive Distortion Codex)
    ├── :feature:calendar    [PLANNED] (Circadian Energy Timeboxing & Event Bridge)
    ├── :feature:tasks       [PLANNED] (Decomposable GTD Tasks & Relic Drops)
    ├── :feature:activities  [PLANNED] (Health Connect, Habit Streaks, Time Tracker)
    ├── :feature:mood        [PLANNED] (Valence-Arousal Grid, EMA, Correlational AI)
    └── :feature:focus       [PLANNED] (Ambient Pomodoro Dungeons & Binaural Beats)
```

### 9.2 Shared Event Bus & Reactive Data Contracts
Every modular feature communicates with the Core Engine through decoupled Kotlin `StateFlow` and domain use cases:
* **Task Engine $\rightarrow$ Arena Synergy:** Completing any custom task (e.g. Work/Study) emits a `TaskCompletedEvent(category, difficulty)` $\rightarrow$ yields `ClarityMana` for the card battler and drops crafting relics.
* **Calendar Engine $\rightarrow$ Energy Engine:** Calendar events automatically adjust the daily dynamic energy curve based on scheduled commitments.
* **Mood Engine $\rightarrow$ Quest Engine:** When momentary mood drops below a threshold, the Quest Engine instantly swivels to low-battery grounding micro-interventions.
* **Correlational Analytics Layer:** Intersects activity data (Health Connect + Task logs) with mood data to generate actionable insights:
  $$\text{Mood Variance} = f(\text{Sleep Quality}, \text{Physical Steps}, \text{Completed Tasks}, \text{Cognitive Reframes})$$
