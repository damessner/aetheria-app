import { BookRoutine, UserState, QuestItem } from '../types';
import { Database } from '../database/db';
import { EventBus } from '../eventbus/EventBus';

/**
 * Lazy-loaded so pure-logic unit tests (bun test) can import this module
 * without pulling react-native/expo-notifications into the runtime.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let NotificationService: any = null;
function getNotificationService(): any {
  if (!NotificationService) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    NotificationService =
      require('../notifications/NotificationService').NotificationService;
  }
  return NotificationService;
}

export class RoutineServiceImpl {
  getScheduledRoutines(userState: UserState): BookRoutine[] {
    return userState.scheduledRoutines || [];
  }

  async scheduleRoutine(
    userState: UserState,
    routine: BookRoutine,
    timeStr?: string
  ): Promise<UserState> {
    const existing = userState.scheduledRoutines || [];
    const isAlreadyScheduled = existing.some((r) => r.id === routine.id);

    const effectiveTime = timeStr || routine.suggestedTime;

    let updatedList: BookRoutine[];
    if (isAlreadyScheduled) {
      updatedList = existing.map((r) =>
        r.id === routine.id
          ? { ...r, suggestedTime: effectiveTime, reminderEnabled: true, isScheduled: true }
          : r
      );
    } else {
      updatedList = [
        ...existing,
        {
          ...routine,
          suggestedTime: effectiveTime,
          reminderEnabled: true,
          isScheduled: true,
        },
      ];
    }

    // Real local notification (no-op when permission denied or unavailable)
    try {
      await getNotificationService().scheduleDailyReminder(
        routine.id,
        '📖 Routine Reminder',
        `${routine.title} — ${routine.description}`,
        effectiveTime
      );
    } catch (e) {
      console.warn('[Routines] Could not schedule notification', e);
    }

    const updatedState: UserState = {
      ...userState,
      scheduledRoutines: updatedList,
    };

    await Database.saveUserState(updatedState);
    EventBus.emit('quest:completed', { questId: `routine_${routine.id}`, vpEarned: 15, manaEarned: 1 });
    return updatedState;
  }

  async removeScheduledRoutine(userState: UserState, routineId: string): Promise<UserState> {
    const existing = userState.scheduledRoutines || [];
    const updatedList = existing.filter((r) => r.id !== routineId);

    try {
      await getNotificationService().cancelReminder(routineId);
    } catch (e) {
      console.warn('[Routines] Could not cancel notification', e);
    }

    const updatedState: UserState = {
      ...userState,
      scheduledRoutines: updatedList,
    };

    await Database.saveUserState(updatedState);
    return updatedState;
  }

  async toggleReminder(
    userState: UserState,
    routineId: string,
    enabled: boolean
  ): Promise<UserState> {
    const existing = userState.scheduledRoutines || [];
    const target = existing.find((r) => r.id === routineId);
    const updatedList = existing.map((r) =>
      r.id === routineId ? { ...r, reminderEnabled: enabled } : r
    );

    // Sync the platform notification with the toggle
    try {
      if (!enabled) {
        await getNotificationService().cancelReminder(routineId);
      } else if (target) {
        await getNotificationService().scheduleDailyReminder(
          target.id,
          '📖 Routine Reminder',
          `${target.title} — ${target.description}`,
          target.suggestedTime
        );
      }
    } catch (e) {
      console.warn('[Routines] Could not sync notification', e);
    }

    const updatedState: UserState = {
      ...userState,
      scheduledRoutines: updatedList,
    };

    await Database.saveUserState(updatedState);
    return updatedState;
  }

  convertRoutinesToQuests(routines: BookRoutine[]): QuestItem[] {
    return routines.map((r) => ({
      id: `quest_rtn_${r.id}`,
      title: `[${r.suggestedTime}] ${r.title}`,
      description: `${r.description} (From "${r.bookTitle}")`,
      category: 'MINDFULNESS',
      clinicalSkill: 'BA',
      energyCostTier: r.energyTier,
      microSteps: [
        `Set reminder for ${r.suggestedTime}`,
        r.clinicalRationale,
        'Reflect on state after completion',
      ],
      rewards: {
        vitalityPoints: 35,
        clarityMana: 2,
        sanctuaryGrowth: 8,
      },
      isCompleted: false,
      circadianFriendly: true,
    }));
  }
}

export const RoutineService = new RoutineServiceImpl();
