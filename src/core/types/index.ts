// Core Domain Types for Aetheria: The Cognitive Quest

export type EnergyTier = 'LOW_10' | 'STEADY_40' | 'BLAZING_80';

export interface EnergyProfile {
  tier: EnergyTier;
  label: string;
  percentage: number;
  description: string;
  recommendedActivityType: 'SOMATIC_GROUNDING' | 'MICRO_ACTIVATION' | 'DEEP_VALUE_QUEST';
}

export type DistortionType =
  | 'CATASTROPHIZING'
  | 'ALL_OR_NOTHING'
  | 'MIND_READING'
  | 'EMOTIONAL_REASONING'
  | 'OVERGENERALIZATION'
  | 'SHOULD_STATEMENTS'
  | 'PERSONALIZATION';

export interface DistortionInfo {
  type: DistortionType;
  displayName: string;
  description: string;
  example: string;
  iconName: string;
}

export type CardCategory = 'FACT_CHECK' | 'COMPASSION' | 'REFRAME' | 'ACTION_SPARK';

export interface CombatCard {
  id: string;
  name: string;
  category: CardCategory;
  manaCost: number;
  baseDamage: number;
  shieldValue: number;
  promptText: string;
  targetDistortionBonus?: {
    distortion: DistortionType;
    multiplier: number;
  };
  isGeminiGenerated?: boolean;
}

export interface DistortionEnemy {
  id: string;
  name: string;
  distortionType: DistortionType;
  maxHp: number;
  currentHp: number;
  attackPower: number;
  thoughtQuote: string;
  visualTheme: string;
}

export interface CardBattleState {
  encounterId: string;
  enemy: DistortionEnemy;
  playerHp: number;
  playerMaxHp: number;
  playerShield: number;
  playerMana: number;
  playerMaxMana: number;
  hand: CombatCard[];
  selectedDistortion: DistortionType | null;
  phase: 'IDENTIFY_DISTORTION' | 'PLAY_CARDS' | 'ENEMY_TURN' | 'VICTORY' | 'DEFEAT';
  turnCount: number;
  battleLog: string[];
  evidenceShardsCount: number;
}

export type ClinicalSkill = 'BA' | 'CR' | 'PS' | 'BI' | 'RELAPSE_PREVENTION';

export interface QuestItem {
  id: string;
  title: string;
  description: string;
  category: 'MOVEMENT' | 'HYDRATION' | 'WORKSPACE' | 'SOMATIC' | 'MINDFULNESS' | 'SOCIAL';
  clinicalSkill: ClinicalSkill;
  energyCostTier: EnergyTier;
  microSteps: string[];
  rewards: {
    vitalityPoints: number;
    clarityMana: number;
    sanctuaryGrowth: number;
  };
  isCompleted: boolean;
  circadianFriendly: boolean;
  completedAt?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  category: 'WORK' | 'CHORE' | 'STUDY' | 'CREATIVE' | 'HEALTH';
  energyTier: EnergyTier;
  subTasks: { id: string; title: string; isCompleted: boolean }[];
  isCompleted: boolean;
  relicDrop?: {
    id: string;
    name: string;
    description: string;
    statBoost: 'MIND_SHIELD' | 'LOGIC_EDGE' | 'COMPASSION_AURA';
    boostAmount: number;
  };
  createdAt: string;
}

export interface MoodEntry {
  id: string;
  timestamp: string;
  valence: number; // -5 (Extremely Unpleasant) to +5 (Extremely Pleasant)
  arousal: number; // -5 (Extremely Low Energy/Lethargic) to +5 (High Energy/Agitated)
  primaryEmotion: string;
  notes?: string;
  tags: string[];
}

export interface SanctuaryState {
  currentBiomeId: 'GLOOMSPIRE_GROVE' | 'SHATTERED_OBELISK' | 'CELESTIAL_BEACON';
  gloomClearingPercentage: number; // 0 to 100
  vitalityFloraCount: number;
  celestialConstellationsUnlocked: number;
  companions: {
    id: 'PYRA_FOX' | 'KAEL_OWL' | 'LIORA_NYMPH';
    name: string;
    title: string;
    affinityLevel: number;
    isActive: boolean;
  }[];
}

export type Chronotype = 'STANDARD_DAYTIME' | 'NIGHT_OWL' | 'ROTATING_SHIFT';

export type ClinicalPhase = 'PHASE_1_BA_BI' | 'PHASE_2_CR_PS';

export interface SleepEfficiencyEntry {
  id: string;
  date: string;
  bedTime: string; // e.g. "23:30"
  wakeTime: string; // e.g. "07:30"
  timeInBedMinutes: number;
  timeAsleepMinutes: number;
  sleepEfficiencyPercentage: number; // (asleep / inBed) * 100
  nightWakingsCount: number;
  stimulusControlFollowed: boolean; // got out of bed if awake >20m
}

export interface ProblemSolvingWorksheet {
  id: string;
  title: string;
  createdAt: string;
  step1_problemDefinition: string;
  step2_brainstormedSolutions: string[];
  step3_evaluatedOptions: { solution: string; pros: string[]; cons: string[]; feasibilityScore: number }[];
  step4_selectedSolution: string;
  step5_actionSteps: { step: string; isDone: boolean }[];
  step6_offlineExecutionAnchor: string;
  step7_outcomeReview?: string;
  isCompleted: boolean;
}

export interface CampfireMessage {
  id: string;
  companionId: 'KAEL_OWL' | 'PYRA_FOX' | 'LIORA_NYMPH';
  sender: 'user' | 'companion';
  text: string;
  timestamp: string;
  insightExtracted?: boolean;
}

export interface UserState {
  schemaVersion: string;
  userId: string;
  createdAt: string;
  campaignWeek: number; // 1 to 8 (4w BA+BI -> 4w CR+PS)
  clinicalPhase: ClinicalPhase;
  vitalityResonance: number; // 0.0 to 1.0 (replaces streak)
  restResonanceBank: number; // Accumulated 2x bonus for rest days
  energyTier: EnergyTier;
  vitalityPoints: number;
  clarityMana: number;
  restShields: number;
  activeCards: CombatCard[];
  equippedRelics: TaskItem['relicDrop'][];
  sanctuary: SanctuaryState;
  stats: {
    mindShield: number;
    logicEdge: number;
    compassionAura: number;
  };
  preferences: {
    chronotype: Chronotype;
    circadianMode: 'AUTO' | 'FORCE_NIGHT' | 'DISABLED';
    wakeHour: number; // default 7 (or 14 for night owls)
    sleepHour: number; // default 23 (or 4 for night owls)
    geminiApiKey?: string;
    geminiModel?: 'gemini-3.7-flash' | 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gemini-2.0-flash';
    githubRepo?: string;
    biometricLock: boolean;
  };
}

export interface CrisisContact {
  countryCode: string;
  countryName: string;
  helplineName: string;
  phoneNumber: string;
  smsNumber?: string;
  website: string;
  availableHours: string;
}

export interface OTAReleaseInfo {
  version: string;
  releaseTag: string;
  releaseNotes: string;
  publishedAt: string;
  downloadUrl?: string;
  isUpdateAvailable: boolean;
}
