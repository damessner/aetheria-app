// Auto-extracted seed content from core/database/db.ts (Phase 3 refactor)
import { UserState } from '../core/types';
import { INITIAL_COMBAT_DECK } from './combat';

export const INITIAL_USER_STATE: UserState = {
  schemaVersion: '2.0.0',
  userId: 'usr_' + Math.random().toString(36).substring(2, 9),
  createdAt: new Date().toISOString(),
  campaignWeek: 1,
  clinicalPhase: 'PHASE_1_BA_BI',
  vitalityResonance: 0.75,
  restResonanceBank: 1.0,
  energyTier: 'STEADY_40',
  vitalityPoints: 120,
  clarityMana: 3,
  restShields: 3,
  activeCards: INITIAL_COMBAT_DECK,
  equippedRelics: [],
  sanctuary: {
    currentBiomeId: 'GLOOMSPIRE_GROVE',
    gloomClearingPercentage: 35.0,
    vitalityFloraCount: 4,
    celestialConstellationsUnlocked: 1,
    companions: [
      {
        id: 'KAEL_OWL',
        name: 'Kael the Owl-Sage',
        title: 'Cognitive Restructuring & Logic Guardian',
        affinityLevel: 1,
        isActive: true,
      },
      {
        id: 'PYRA_FOX',
        name: 'Pyra the Ember-Fox',
        title: 'Behavioral Spark & Motivation',
        affinityLevel: 1,
        isActive: false,
      },
      {
        id: 'LIORA_NYMPH',
        name: 'Liora the Water-Nymph',
        title: 'Somatic Calm & Compassion',
        affinityLevel: 1,
        isActive: false,
      },
    ],
  },
  stats: {
    mindShield: 40,
    logicEdge: 50,
    compassionAura: 35,
  },
  preferences: {
    chronotype: 'STANDARD_DAYTIME',
    circadianMode: 'AUTO',
    wakeHour: 7,
    sleepHour: 23,
    geminiApiKey: '',
    geminiModel: 'gemini-3.7-flash',
    githubRepo: 'damessner/aetheria-app',
    biometricLock: false,
  },
};
