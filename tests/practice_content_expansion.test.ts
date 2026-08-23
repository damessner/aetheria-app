import { describe, it, expect } from 'bun:test';
import { ARENA_BOSSES } from '../src/content/arenaBosses';
import { INITIAL_THOUGHT_FEED } from '../src/content';
import { THOUGHT_FEED_WAVE2 } from '../src/content/thoughtFeedWave2';
import { INITIAL_SCROLLS_RICH } from '../src/content/wisdomScrollsRich';
import { SHADOW_DEEP_DIVES } from '../src/content/shadowDeepDives';
import { DistortionType, ThoughtDomain, ShadowFlawType, WisdomScroll } from '../src/core/types';

describe('Practice Content Expansion (Phases A-D)', () => {
  it('Arena: one boss per cognitive distortion', () => {
    const distortions: DistortionType[] = [
      'CATASTROPHIZING',
      'ALL_OR_NOTHING',
      'MIND_READING',
      'EMOTIONAL_REASONING',
      'OVERGENERALIZATION',
      'SHOULD_STATEMENTS',
      'PERSONALIZATION',
    ];
    expect(ARENA_BOSSES.length).toBe(7);
    for (const d of distortions) {
      const bosses = ARENA_BOSSES.filter((b) => b.distortionType === d);
      expect(bosses.length).toBe(1);
      expect(bosses[0].thoughtQuote.length).toBeGreaterThan(10);
    }
    // All bosses have valid combat stats
    for (const b of ARENA_BOSSES) {
      expect(b.maxHp).toBeGreaterThan(0);
      expect(b.attackPower).toBeGreaterThan(0);
    }
  });

  it('Stream: wave 2 scenarios have complete clinical structure', () => {
    expect(THOUGHT_FEED_WAVE2.length).toBeGreaterThanOrEqual(9);

    const domains = new Set<string>();
    for (const item of THOUGHT_FEED_WAVE2) {
      domains.add(item.contextDomain);
      // Quiz structure: exactly 3 balanced choices
      expect(item.reframeOptions?.length).toBe(3);
      const types = item.reframeOptions!.map((r) => r.type).sort();
      expect(types).toEqual(['OPTIMAL', 'RATIONALIZATION', 'TOXIC_POSITIVITY']);
      // Optimal scores highest
      const optimal = item.reframeOptions!.find((r) => r.type === 'OPTIMAL')!;
      expect(optimal.score).toBeGreaterThanOrEqual(90);
      for (const r of item.reframeOptions!) {
        if (r.type !== 'OPTIMAL') expect(r.score).toBeLessThan(optimal.score);
        expect(r.clinicalFeedback.length).toBeGreaterThan(20);
      }
    }
    // Covers all four core domains
    expect(domains.has('FATHERHOOD_PARENTING')).toBe(true);
    expect(domains.has('TEACHING_EDUCATOR')).toBe(true);
    expect(domains.has('PARTNERSHIP_INTIMACY')).toBe(true);
    expect(domains.has('SELF_RESTORATION')).toBe(true);
  });

  it('Stream: combined offline feed has no duplicate ids', () => {
    const ids = INITIAL_THOUGHT_FEED.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(INITIAL_THOUGHT_FEED.length).toBeGreaterThanOrEqual(33);
  });

  it('Academy: all 24 rich scrolls ship Level-2 + routines + recall offline', () => {
    expect(INITIAL_SCROLLS_RICH.length).toBe(24);
    for (const s of INITIAL_SCROLLS_RICH) {
      expect(s.level2Expansion).toBeDefined();
      expect(s.level2Expansion!.advancedQuiz.length).toBeGreaterThan(0);
      expect((s.suggestedRoutines || []).length).toBeGreaterThan(0);
      expect((s.spacedRecallChallenges || []).length).toBeGreaterThan(0);
      // Fresh seed state
      expect(s.isCompleted).toBe(false);
      expect(s.memoryLevel).toBe(1);
    }
    // Unique scroll and routine ids
    const scrollIds = INITIAL_SCROLLS_RICH.map((s) => s.id);
    expect(new Set(scrollIds).size).toBe(24);
    const routineIds = INITIAL_SCROLLS_RICH.flatMap((s) =>
      (s.suggestedRoutines || []).map((r) => r.id)
    );
    expect(new Set(routineIds).size).toBe(routineIds.length);
  });

  it('Crucible: every shadow flaw has a complete deep dive', () => {
    const flaws: ShadowFlawType[] = [
      'FRAGILE_EGO',
      'CHRONIC_AVOIDANCE',
      'BITTER_CYNIC',
      'PEOPLE_PLEASER',
      'CONTROL_TYRANT',
      'PROFESSIONAL_VICTIM',
      'SECRET_ENVIER',
      'EMOTIONAL_TYRANT',
      'SCARCITY_HOARDER',
      'HYPOCRITICAL_MORALIST',
    ];
    expect(Object.keys(SHADOW_DEEP_DIVES).length).toBe(10);
    for (const flaw of flaws) {
      const dd = SHADOW_DEEP_DIVES[flaw];
      expect(dd).toBeDefined();
      expect(dd.originStory.length).toBeGreaterThan(100);
      expect(dd.seductivePayoff.length).toBeGreaterThan(100);
      expect(dd.bodySignature.length).toBeGreaterThan(50);
      expect(dd.relationalReplay.length).toBeGreaterThan(100);
      expect(dd.dailyMicroPractices.length).toBe(3);
      expect(dd.disconfirmationExercises.length).toBe(3);
    }
  });
});
