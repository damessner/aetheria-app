import { DistortionEnemy } from '../core/types';

/**
 * The Distortion Phantoms of the Mind Arena.
 * One boss per cognitive distortion, escalating HP/attack by difficulty tier.
 */
export const ARENA_BOSSES: DistortionEnemy[] = [
  {
    id: 'boss_catastro_1',
    name: 'Catastro-Phantom',
    distortionType: 'CATASTROPHIZING',
    maxHp: 80,
    currentHp: 80,
    attackPower: 15,
    thoughtQuote: 'If this deployment breaks, my entire career is over.',
    visualTheme: 'gloom',
  },
  {
    id: 'boss_allornothing_1',
    name: 'The Binary Warden',
    distortionType: 'ALL_OR_NOTHING',
    maxHp: 85,
    currentHp: 85,
    attackPower: 14,
    thoughtQuote: 'If I can’t do it perfectly, why start at all?',
    visualTheme: 'fracture',
  },
  {
    id: 'boss_mindreading_1',
    name: 'The Thought Thief',
    distortionType: 'MIND_READING',
    maxHp: 75,
    currentHp: 75,
    attackPower: 16,
    thoughtQuote: 'They didn’t reply. They finally see you clearly — and they’re done.',
    visualTheme: 'veil',
  },
  {
    id: 'boss_emotional_1',
    name: 'The Feeling Tyrant',
    distortionType: 'EMOTIONAL_REASONING',
    maxHp: 90,
    currentHp: 90,
    attackPower: 15,
    thoughtQuote: 'It feels hopeless, therefore it IS hopeless.',
    visualTheme: 'tide',
  },
  {
    id: 'boss_overgeneral_1',
    name: 'The Eternal Echo',
    distortionType: 'OVERGENERALIZATION',
    maxHp: 80,
    currentHp: 80,
    attackPower: 17,
    thoughtQuote: 'You ALWAYS ruin everything. You NEVER get it right.',
    visualTheme: 'spiral',
  },
  {
    id: 'boss_personaliz_1',
    name: 'The Weight Bearer',
    distortionType: 'PERSONALIZATION',
    maxHp: 95,
    currentHp: 95,
    attackPower: 14,
    thoughtQuote: 'Their bad mood is your fault. Everything is your fault.',
    visualTheme: 'chain',
  },
  {
    id: 'boss_should_1',
    name: 'The Iron Decree',
    distortionType: 'SHOULD_STATEMENTS',
    maxHp: 100,
    currentHp: 100,
    attackPower: 18,
    thoughtQuote: 'You SHOULD be further along by now. Everyone else already is.',
    visualTheme: 'anvil',
  },
];

/** Returns a fresh copy (fresh HP) of the boss matching the distortion */
export function getBossForDistortion(distortion: string): DistortionEnemy {
  const found = ARENA_BOSSES.find((b) => b.distortionType === distortion);
  return found ? { ...found } : { ...ARENA_BOSSES[0] };
}
