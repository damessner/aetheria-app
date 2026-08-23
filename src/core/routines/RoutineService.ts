import { BookRoutine, UserState, QuestItem } from '../types';
import { Database } from '../database/db';
import { EventBus } from '../eventbus/EventBus';

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

    let updatedList: BookRoutine[];
    if (isAlreadyScheduled) {
      updatedList = existing.map((r) =>
        r.id === routine.id
          ? { ...r, suggestedTime: timeStr || r.suggestedTime, reminderEnabled: true, isScheduled: true }
          : r
      );
    } else {
      updatedList = [
        ...existing,
        {
          ...routine,
          suggestedTime: timeStr || routine.suggestedTime,
          reminderEnabled: true,
          isScheduled: true,
        },
      ];
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
    const updatedList = existing.map((r) =>
      r.id === routineId ? { ...r, reminderEnabled: enabled } : r
    );

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
