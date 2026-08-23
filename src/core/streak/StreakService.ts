import { StreakData, UserState } from '../types';

export class StreakServiceImpl {
  /**
   * Generates initial 7-day activity structure for weekly bar chart
   */
  getInitialWeeklyActivity(): StreakData['weeklyActivity'] {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const result: StreakData['weeklyActivity'] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayOfWeek = days[d.getDay()];
      const dateStr = d.toISOString().split('T')[0];
      result.push({
        dayOfWeek,
        dateStr,
        vpEarned: i === 0 ? 30 : Math.floor(Math.random() * 40) + 15,
        thoughtsReframed: i === 0 ? 1 : Math.floor(Math.random() * 2) + 1,
        questsCompleted: i === 0 ? 1 : Math.floor(Math.random() * 2),
      });
    }

    return result;
  }

  /**
   * Calculates multiplier based on streak count
   */
  calculateMultiplier(streak: number): number {
    if (streak >= 14) return 1.5; // +50% bonus
    if (streak >= 7) return 1.3; // +30% bonus
    if (streak >= 3) return 1.15; // +15% bonus
    return 1.0;
  }

  /**
   * Records user activity (reflection, thought reframe, quest) and updates streak & weekly graph
   */
  recordActivity(
    userState: UserState,
    activityType: 'THOUGHT' | 'QUEST' | 'SCROLL' | 'BATTLE',
    vpEarned = 0
  ): { updatedState: UserState; streakGained: boolean; shieldUsed: boolean; bonusVp: number } {
    const today = new Date().toISOString().split('T')[0];
    const streak = userState.streakData || {
      currentStreak: 1,
      bestStreak: 1,
      lastActiveDate: today,
      freezeShieldsAvailable: 2,
      multiplier: 1.0,
      weeklyActivity: this.getInitialWeeklyActivity(),
    };

    let streakGained = false;
    let shieldUsed = false;

    if (streak.lastActiveDate !== today) {
      const lastDate = new Date(streak.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day streak advance!
        streak.currentStreak += 1;
        streakGained = true;
      } else if (diffDays === 2 && streak.freezeShieldsAvailable > 0) {
        // Protected by grace freeze shield!
        streak.freezeShieldsAvailable -= 1;
        streak.currentStreak += 1;
        shieldUsed = true;
        streakGained = true;
      } else if (diffDays > 1) {
        // Streak reset
        streak.currentStreak = 1;
      }

      if (streak.currentStreak > streak.bestStreak) {
        streak.bestStreak = streak.currentStreak;
      }

      streak.lastActiveDate = today;
    }

    streak.multiplier = this.calculateMultiplier(streak.currentStreak);

    // Update today's entry in weekly activity
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayName = days[new Date().getDay()];

    const existingDayIdx = streak.weeklyActivity.findIndex((w) => w.dateStr === today);
    if (existingDayIdx !== -1) {
      streak.weeklyActivity[existingDayIdx].vpEarned += vpEarned;
      if (activityType === 'THOUGHT') streak.weeklyActivity[existingDayIdx].thoughtsReframed += 1;
      if (activityType === 'QUEST') streak.weeklyActivity[existingDayIdx].questsCompleted += 1;
    } else {
      streak.weeklyActivity.shift();
      streak.weeklyActivity.push({
        dayOfWeek: currentDayName,
        dateStr: today,
        vpEarned,
        thoughtsReframed: activityType === 'THOUGHT' ? 1 : 0,
        questsCompleted: activityType === 'QUEST' ? 1 : 0,
      });
    }

    // Apply streak multiplier bonus VP
    const bonusVp = Math.round(vpEarned * (streak.multiplier - 1.0));

    const updatedState: UserState = {
      ...userState,
      vitalityPoints: userState.vitalityPoints + bonusVp,
      streakData: streak,
    };

    return {
      updatedState,
      streakGained,
      shieldUsed,
      bonusVp,
    };
  }
}

export const StreakService = new StreakServiceImpl();
