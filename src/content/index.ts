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
export { ARENA_BOSSES, getBossForDistortion } from './arenaBosses';
