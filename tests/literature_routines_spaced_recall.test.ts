import { describe, it, expect } from 'bun:test';
import * as fs from 'fs';
import { RoutineService } from '../src/core/routines/RoutineService';
import { SpacedRepetitionService } from '../src/core/spacedrepetition/SpacedRepetitionService';
import { UserState, WisdomScroll, BookRoutine } from '../src/core/types';

describe('Deep Literature Masterclasses, Level 2 Expansions, Routines & Spaced Recall', () => {
  const mockUserState: UserState = {
    schemaVersion: '1.0.0',
    userId: 'usr_test_lit',
    createdAt: new Date().toISOString(),
    campaignWeek: 1,
    clinicalPhase: 'PHASE_1_BA_BI',
    vitalityResonance: 0.9,
    restResonanceBank: 0,
    energyTier: 'STEADY_40',
    vitalityPoints: 100,
    clarityMana: 5,
    restShields: 2,
    activeCards: [],
    equippedRelics: [],
    completedScrollIds: ['scr_stoic_1', 'scr_parent_5', 'scr_gottman_15'],
    scheduledRoutines: [],
    spacedRepetitionReviews: {},
    sanctuary: {
      currentBiomeId: 'GLOOMSPIRE_GROVE',
      gloomClearingPercentage: 40,
      vitalityFloraCount: 3,
      celestialConstellationsUnlocked: 1,
      companions: [],
    },
    stats: { mindShield: 10, logicEdge: 10, compassionAura: 10 },
    preferences: {
      chronotype: 'STANDARD_DAYTIME',
      circadianMode: 'AUTO',
      wakeHour: 7,
      sleepHour: 23,
      biometricLock: false,
    },
  };

  const sampleRoutine: BookRoutine = {
    id: 'rtn_test_1',
    scrollId: 'scr_parent_1',
    bookTitle: 'The Whole-Brain Child',
    title: 'Connect-Before-Direct Bedtime Anchor',
    description: 'Drop to eye level and offer somatic touch before boundaries.',
    suggestedTime: '19:45',
    frequency: 'EVENING',
    energyTier: 'LOW_10',
    reminderEnabled: true,
    clinicalRationale: 'De-escalates amygdala downstairs panic.',
    isScheduled: false,
  };

  it('schedules a book routine and converts it to active daily quests', async () => {
    const updatedState = await RoutineService.scheduleRoutine(mockUserState, sampleRoutine, '20:00');
    expect(updatedState.scheduledRoutines?.length).toBe(1);
    expect(updatedState.scheduledRoutines?.[0].suggestedTime).toBe('20:00');
    expect(updatedState.scheduledRoutines?.[0].isScheduled).toBe(true);

    const quests = RoutineService.convertRoutinesToQuests(updatedState.scheduledRoutines || []);
    expect(quests.length).toBe(1);
    expect(quests[0].id).toBe('quest_rtn_rtn_test_1');
    expect(quests[0].title).toContain('[20:00]');
    expect(quests[0].energyCostTier).toBe('LOW_10');
  });

  it('calculates due spaced repetition flash recalls for completed scrolls', () => {
    const raw = fs.readFileSync('./content/wisdom_scrolls.json', 'utf-8');
    const scrolls: WisdomScroll[] = JSON.parse(raw);

    const dueList = SpacedRepetitionService.getDueSpacedReviews(mockUserState, scrolls);
    expect(dueList.length).toBeGreaterThanOrEqual(1);

    const first = dueList[0];
    expect(first.challenge).toBeDefined();
    expect(first.challenge.options.length).toBeGreaterThan(1);
    expect(first.memoryStars).toBe(1);
  });

  it('advances spaced repetition memory level upon correct answer', async () => {
    const res = await SpacedRepetitionService.recordReviewResult(mockUserState, 'scr_parent_5', true);
    expect(res.memoryStars).toBe(2);
    expect(res.newStage).toBe(2);
    expect(res.manaAwarded).toBe(2);
    expect(res.vpAwarded).toBe(30);

    const record = res.updatedState.spacedRepetitionReviews?.['scr_parent_5'];
    expect(record).toBeDefined();
    expect(record?.reviewStage).toBe(2);
  });

  it('validates all 33 scrolls in /content/wisdom_scrolls.json have rich Level 2 expansions & routines', () => {
    const raw = fs.readFileSync('./content/wisdom_scrolls.json', 'utf-8');
    const scrolls: WisdomScroll[] = JSON.parse(raw);

    expect(scrolls.length).toBe(33);
    for (const s of scrolls) {
      expect(s.suggestedRoutines).toBeDefined();
      expect(s.suggestedRoutines?.length).toBeGreaterThan(0);
      expect(s.level2Expansion).toBeDefined();
      expect(s.level2Expansion?.deepCaseStudy).toBeDefined();
      expect(s.level2Expansion?.advancedQuiz.length).toBeGreaterThan(0);
      expect(s.spacedRecallChallenges).toBeDefined();
      expect(s.spacedRecallChallenges?.length).toBeGreaterThan(0);
    }
  });
});
