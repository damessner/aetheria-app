/**
 * Barrel file for static seed content.
 * Content modules are pure data — no persistence or business logic.
 */
import { INITIAL_THOUGHT_FEED as WAVE1 } from './thoughtFeed';
import { THOUGHT_FEED_WAVE2 } from './thoughtFeedWave2';

/** Combined offline thought stream (seed + expansion waves) */
export const INITIAL_THOUGHT_FEED = [...WAVE1, ...THOUGHT_FEED_WAVE2];

export { INITIAL_COMBAT_DECK } from './combat';
export { INITIAL_USER_STATE } from './userSeed';
export { INITIAL_QUESTS } from './quests';
export { INITIAL_TASKS } from './tasks';
export { INITIAL_SCROLLS } from './wisdomScrolls';
import { INITIAL_SCROLLS_RICH } from './wisdomScrollsRich';
import { SCROLLS_WAVE3 } from './wisdomScrollsWave3';
import { SCROLLS_WAVE4A } from './wisdomScrollsWave4a';
import { SCROLLS_WAVE4C } from './wisdomScrollsWave4c';
export {
  INITIAL_SCROLLS_RICH,
  SCROLLS_WAVE3,
  SCROLLS_WAVE4A,
  SCROLLS_WAVE4C,
};

/** Depth upgrades (4a + 4c) replace thin base-scroll versions by id */
const WAVE4 = [...SCROLLS_WAVE4A, ...SCROLLS_WAVE4C];

/** Full offline academy library: upgraded base set + role-deep wave 3 */
export const INITIAL_SCROLLS_FULL = [
  ...INITIAL_SCROLLS_RICH.filter((r) => !WAVE4.some((w) => w.id === r.id)),
  ...WAVE4,
  ...SCROLLS_WAVE3,
];
export { ARENA_BOSSES, getBossForDistortion } from './arenaBosses';
