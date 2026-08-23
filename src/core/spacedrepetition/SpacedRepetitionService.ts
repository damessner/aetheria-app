import { WisdomScroll, SpacedRecallChallenge, UserState } from '../types';
import { Database } from '../database/db';
import { EventBus } from '../eventbus/EventBus';

export const EBBINGHAUS_INTERVAL_DAYS = [1, 3, 7, 14, 30];

export class SpacedRepetitionServiceImpl {
  /**
   * Returns all spaced recall challenges that are currently due for memory consolidation
   */
  getDueSpacedReviews(
    userState: UserState,
    scrolls: WisdomScroll[]
  ): {
    scroll: WisdomScroll;
    challenge: SpacedRecallChallenge;
    reviewStage: number;
    memoryStars: number;
    isDue: boolean;
  }[] {
    const completedIds = new Set(userState.completedScrollIds || []);
    const completedScrolls = scrolls.filter((s) => s.isCompleted || completedIds.has(s.id));
    const reviewsMap = userState.spacedRepetitionReviews || {};
    const now = new Date();

    const results: {
      scroll: WisdomScroll;
      challenge: SpacedRecallChallenge;
      reviewStage: number;
      memoryStars: number;
      isDue: boolean;
    }[] = [];

    for (const scroll of completedScrolls) {
      if (!scroll.spacedRecallChallenges || scroll.spacedRecallChallenges.length === 0) {
        continue;
      }

      const reviewRecord = reviewsMap[scroll.id];
      const stage = reviewRecord ? reviewRecord.reviewStage : 1;
      const memoryStars = reviewRecord ? reviewRecord.memoryStars : 1;

      // Check if due
      let isDue = true;
      if (reviewRecord?.nextDueAt) {
        const nextDueDate = new Date(reviewRecord.nextDueAt);
        isDue = now >= nextDueDate;
      }

      // Pick challenge corresponding to stage (or wrap around)
      const challengeIdx = (stage - 1) % scroll.spacedRecallChallenges.length;
      const challenge = scroll.spacedRecallChallenges[challengeIdx];

      results.push({
        scroll,
        challenge,
        reviewStage: stage,
        memoryStars,
        isDue,
      });
    }

    return results;
  }

  /**
   * Records outcome of a spaced memory flash recall quiz
   */
  async recordReviewResult(
    userState: UserState,
    scrollId: string,
    isCorrect: boolean
  ): Promise<{
    updatedState: UserState;
    memoryStars: number;
    newStage: number;
    manaAwarded: number;
    vpAwarded: number;
  }> {
    const reviewsMap = { ...(userState.spacedRepetitionReviews || {}) };
    const current = reviewsMap[scrollId] || {
      lastReviewedAt: new Date().toISOString(),
      reviewStage: 1,
      nextDueAt: new Date().toISOString(),
      memoryStars: 1,
    };

    let newStage = current.reviewStage;
    let memoryStars = current.memoryStars;
    let manaAwarded = 0;
    let vpAwarded = 0;

    const now = new Date();

    if (isCorrect) {
      newStage = Math.min(5, current.reviewStage + 1);
      memoryStars = Math.min(5, current.memoryStars + 1);
      manaAwarded = 2;
      vpAwarded = 30;

      const intervalDays = EBBINGHAUS_INTERVAL_DAYS[newStage - 1] || 30;
      const nextDue = new Date(now);
      nextDue.setDate(nextDue.getDate() + intervalDays);

      reviewsMap[scrollId] = {
        lastReviewedAt: now.toISOString(),
        reviewStage: newStage,
        nextDueAt: nextDue.toISOString(),
        memoryStars,
      };
    } else {
      // Memory decay relapse: reset to stage 1
      newStage = 1;
      memoryStars = Math.max(1, current.memoryStars - 1);
      vpAwarded = 10; // Effort consolation reward

      const nextDue = new Date(now);
      nextDue.setDate(nextDue.getDate() + 1); // Review again tomorrow

      reviewsMap[scrollId] = {
        lastReviewedAt: now.toISOString(),
        reviewStage: 1,
        nextDueAt: nextDue.toISOString(),
        memoryStars,
      };
    }

    const updatedState: UserState = {
      ...userState,
      vitalityPoints: userState.vitalityPoints + vpAwarded,
      clarityMana: userState.clarityMana + manaAwarded,
      spacedRepetitionReviews: reviewsMap,
    };

    await Database.saveUserState(updatedState);
    EventBus.emit('quest:completed', {
      questId: `spaced_recall_${scrollId}`,
      vpEarned: vpAwarded,
      manaEarned: manaAwarded,
    });

    return {
      updatedState,
      memoryStars,
      newStage,
      manaAwarded,
      vpAwarded,
    };
  }
}

export const SpacedRepetitionService = new SpacedRepetitionServiceImpl();
