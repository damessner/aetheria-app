import { describe, it, expect } from 'bun:test';
import { StreakService } from '../src/core/streak/StreakService';
import { AchievementService, ALL_ACHIEVEMENT_DEFINITIONS } from '../src/core/achievements/AchievementService';
import { UserState, ThoughtFeedItem, WisdomScroll } from '../src/core/types';

describe('Visual Analytics, Gamification, Streaks & Badges Engine', () => {
  const mockUserState: UserState = {
    schemaVersion: '1.0.0',
    userId: 'usr_test',
    createdAt: new Date().toISOString(),
    campaignWeek: 1,
    clinicalPhase: 'PHASE_1_BA_BI',
    vitalityResonance: 0.8,
    restResonanceBank: 0,
    energyTier: 'STEADY_40',
    vitalityPoints: 200,
    clarityMana: 5,
    restShields: 2,
    activeCards: [],
    equippedRelics: [],
    completedScrollIds: ['scr_stoic_1', 'scr_stoic_2'],
    cardinalVirtues: { courage: 60, integrity: 70, temperance: 40, humility: 80 },
    unlockedAchievementIds: [],
    sanctuary: {
      currentBiomeId: 'GLOOMSPIRE_GROVE',
      gloomClearingPercentage: 35.5,
      vitalityFloraCount: 4,
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

  it('calculates streak multipliers accurately across milestones', () => {
    expect(StreakService.calculateMultiplier(1)).toBe(1.0);
    expect(StreakService.calculateMultiplier(2)).toBe(1.0);
    expect(StreakService.calculateMultiplier(3)).toBe(1.15); // +15%
    expect(StreakService.calculateMultiplier(6)).toBe(1.15);
    expect(StreakService.calculateMultiplier(7)).toBe(1.3); // +30%
    expect(StreakService.calculateMultiplier(14)).toBe(1.5); // +50%
  });

  it('records activity and updates weekly activity trajectory graph', () => {
    const res = StreakService.recordActivity(mockUserState, 'THOUGHT', 30);
    expect(res.updatedState.streakData).toBeDefined();
    expect(res.updatedState.streakData?.weeklyActivity.length).toBe(7);

    const todayEntry = res.updatedState.streakData?.weeklyActivity[6];
    expect(todayEntry?.vpEarned).toBeGreaterThanOrEqual(30);
  });

  it('evaluates all 8 achievement trophies and tracks live progress', () => {
    const solvedThoughts: ThoughtFeedItem[] = [
      {
        id: 'thg_p1',
        thought: 'Tantrum test',
        contextDomain: 'FATHERHOOD_PARENTING',
        correctDistortion: 'ALL_OR_NOTHING',
        explanation: 'Test',
        techniqueOptions: ['SOMATIC_COREGULATION'],
        suggestedReframe: 'Test',
        isSolved: true,
        userScore: 98,
      },
      {
        id: 'thg_p2',
        thought: 'Tantrum test 2',
        contextDomain: 'FATHERHOOD_PARENTING',
        correctDistortion: 'CATASTROPHIZING',
        explanation: 'Test',
        techniqueOptions: ['SOMATIC_COREGULATION'],
        suggestedReframe: 'Test',
        isSolved: true,
        userScore: 95,
      },
    ];

    const badges = AchievementService.evaluateAchievements(mockUserState, solvedThoughts, []);
    expect(badges.length).toBe(8);

    const fatherhoodBadge = badges.find((b) => b.id === 'ach_fatherhood_anchor');
    expect(fatherhoodBadge).toBeDefined();
    expect(fatherhoodBadge?.currentProgress).toBe(2);
    expect(fatherhoodBadge?.maxProgress).toBe(5);

    const shadowBadge = badges.find((b) => b.id === 'ach_shadow_slayer');
    expect(shadowBadge).toBeDefined();
    expect(shadowBadge?.currentProgress).toBeGreaterThan(50); // Avg virtue > 50%
  });

  it('verifies initial 7-day activity map generates Sun-Sat weekday labels', () => {
    const activity = StreakService.getInitialWeeklyActivity();
    expect(activity.length).toBe(7);
    for (const day of activity) {
      expect(day.dayOfWeek).toBeDefined();
      expect(day.dateStr).toBeDefined();
      expect(day.vpEarned).toBeGreaterThan(0);
    }
  });
});
