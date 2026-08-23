// Auto-extracted seed content from core/database/db.ts (Phase 3 refactor)
import { CombatCard } from '../core/types';

export const INITIAL_COMBAT_DECK: CombatCard[] = [
  {
    id: 'crd_fact_check_1',
    name: 'Evidence Vault',
    category: 'FACT_CHECK',
    manaCost: 1,
    baseDamage: 25,
    shieldValue: 0,
    promptText: 'What is the actual factual evidence supporting or contradicting this thought?',
    targetDistortionBonus: {
      distortion: 'CATASTROPHIZING',
      multiplier: 1.6,
    },
  },
  {
    id: 'crd_compassion_1',
    name: 'Aura of Self-Compassion',
    category: 'COMPASSION',
    manaCost: 1,
    baseDamage: 15,
    shieldValue: 25,
    promptText: 'Would I speak to a dear friend with this level of harshness?',
    targetDistortionBonus: {
      distortion: 'ALL_OR_NOTHING',
      multiplier: 1.5,
    },
  },
  {
    id: 'crd_reframe_1',
    name: 'Alternative Horizon',
    category: 'REFRAME',
    manaCost: 2,
    baseDamage: 38,
    shieldValue: 10,
    promptText: 'What is a more balanced, realistic perspective on this situation?',
    targetDistortionBonus: {
      distortion: 'MIND_READING',
      multiplier: 1.7,
    },
  },
  {
    id: 'crd_action_1',
    name: 'Action Spark',
    category: 'ACTION_SPARK',
    manaCost: 1,
    baseDamage: 20,
    shieldValue: 15,
    promptText: 'Focus on what is directly inside my control right now.',
    targetDistortionBonus: {
      distortion: 'OVERGENERALIZATION',
      multiplier: 1.4,
    },
  },
];
