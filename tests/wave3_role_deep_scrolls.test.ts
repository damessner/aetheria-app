import { describe, it, expect } from 'bun:test';
import * as fs from 'fs';
import { SCROLLS_WAVE3 } from '../src/content/wisdomScrollsWave3';
import { WisdomScroll, BookRoutine } from '../src/core/types';

/**
 * Wave 3 (Role-Deep Expansion): Dad / Marriage / Teacher.
 * These scrolls are hand-authored "bigger models" — enforce the depth
 * contract that distinguishes them from the base 24-scroll library.
 */
describe('Wave 3 Role-Deep Scrolls (Dad, Marriage, Teacher)', () => {
  it('ships exactly 9 scrolls: 3 dad + 3 marriage + 3 teacher', () => {
    expect(SCROLLS_WAVE3.length).toBe(9);
    const dad = SCROLLS_WAVE3.filter((s) => s.id.startsWith('scr_dad_'));
    const marriage = SCROLLS_WAVE3.filter((s) => s.id.startsWith('scr_marriage_'));
    const teach = SCROLLS_WAVE3.filter((s) => s.id.startsWith('scr_teach_deescalate') || s.id.startsWith('scr_teach_attribution') || s.id.startsWith('scr_teach_emotional'));
    expect(dad.length).toBe(3);
    expect(marriage.length).toBe(3);
    expect(teach.length).toBe(3);
  });

  it('enforces the "bigger model" depth contract on every scroll', () => {
    for (const s of SCROLLS_WAVE3) {
      // Long-form masterclass text (~500+ words ≈ 2300+ chars)
      expect(s.contentMarkdown.length).toBeGreaterThan(2000);
      // 4-question Level-1 quiz
      expect(s.quiz.length).toBe(4);
      // Deep Level-2 with 3-question advanced quiz and real case study
      expect(s.level2Expansion).toBeDefined();
      expect(s.level2Expansion!.deepCaseStudy.length).toBeGreaterThan(200);
      expect(s.level2Expansion!.contentMarkdown.length).toBeGreaterThan(1000);
      expect(s.level2Expansion!.advancedQuiz.length).toBe(3);
      expect(s.level2Expansion!.unlockedMasteryRelic).toBeDefined();
      // 2-3 routines and 2 spaced-recall challenges
      expect((s.suggestedRoutines || []).length).toBeGreaterThanOrEqual(2);
      expect((s.spacedRecallChallenges || []).length).toBe(2);
      // Reading time reflects the long form
      expect(s.readingMinutes).toBeGreaterThanOrEqual(5);
    }
  });

  it('marriage scrolls use the new MARRIAGE_EFT category', () => {
    for (const s of SCROLLS_WAVE3.filter((x) => x.id.startsWith('scr_marriage_'))) {
      expect(s.category).toBe('MARRIAGE_EFT');
    }
  });

  it('quiz answer keys are valid and distributed (not always index 0)', () => {
    for (const s of SCROLLS_WAVE3) {
      for (const q of s.quiz) {
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
      }
      for (const q of s.level2Expansion!.advancedQuiz) {
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
      }
      for (const c of s.spacedRecallChallenges!) {
        expect(c.correctIndex).toBeLessThan(c.options.length);
      }
    }
    const correctPositions = SCROLLS_WAVE3.flatMap((s) => s.quiz.map((q) => q.correctIndex));
    expect(new Set(correctPositions).size).toBeGreaterThan(1);
  });

  it('routine ids are globally unique across the full 33-scroll library', () => {
    const base = JSON.parse(
      fs.readFileSync('./content/wisdom_scrolls.json', 'utf-8')
    ) as WisdomScroll[];
    const ids = base.flatMap((s) => (s.suggestedRoutines as BookRoutine[]).map((r) => r.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});
