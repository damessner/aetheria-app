import { create } from 'zustand';
import { UserState, QuestItem, TaskItem } from '../types';
import { Database } from '../database/db';
import { EventBus } from '../eventbus/EventBus';

/**
 * Single source of truth for cross-screen app state.
 *
 * Screens previously fetched from Database independently AND received
 * prop-drilled copies from AppNavigator, which caused stale-state bugs
 * (e.g. double quest rewards). All mutations now flow through these
 * actions, which persist via Database and notify subscribers.
 */
interface AppStore {
  userState: UserState | null;
  quests: QuestItem[];
  tasks: TaskItem[];
  /** True once the initial Database read has completed */
  hydrated: boolean;

  /** Load everything from persistence. Called at startup and after sync events. */
  hydrate: () => Promise<void>;

  setUserState: (updater: (prev: UserState) => UserState) => Promise<void>;
  completeQuest: (questId: string) => Promise<void>;
  setQuests: (quests: QuestItem[]) => Promise<void>;
  setTasks: (tasks: TaskItem[]) => Promise<void>;
}

export const useAppStore = create<AppStore>((set, get) => ({
  userState: null,
  quests: [],
  tasks: [],
  hydrated: false,

  hydrate: async () => {
    const [userState, quests, tasks] = await Promise.all([
      Database.getUserState(),
      Database.getQuests(),
      Database.getTasks(),
    ]);
    set({ userState, quests, tasks, hydrated: true });
  },

  setUserState: async (updater) => {
    const prev = get().userState;
    if (!prev) return;
    const next = updater(prev);
    set({ userState: next });
    await Database.saveUserState(next);
  },

  completeQuest: async (questId) => {
    const { quests, userState } = get();
    const quest = quests.find((q) => q.id === questId);
    // Idempotency guard: never grant rewards twice for the same quest
    if (!quest || quest.isCompleted || !userState) return;

    const updatedQuests = quests.map((q) =>
      q.id === questId ? { ...q, isCompleted: true, completedAt: new Date().toISOString() } : q
    );
    set({ quests: updatedQuests });
    await Database.saveQuests(updatedQuests);

    await get().setUserState((prev) => ({
      ...prev,
      vitalityPoints: prev.vitalityPoints + quest.rewards.vitalityPoints,
      clarityMana: prev.clarityMana + quest.rewards.clarityMana,
      sanctuary: {
        ...prev.sanctuary,
        gloomClearingPercentage: Math.min(
          100,
          prev.sanctuary.gloomClearingPercentage + quest.rewards.sanctuaryGrowth
        ),
        vitalityFloraCount: prev.sanctuary.vitalityFloraCount + 1,
      },
    }));

    EventBus.emit('quest:completed', {
      questId,
      vpEarned: quest.rewards.vitalityPoints,
      manaEarned: quest.rewards.clarityMana,
    });
  },

  setQuests: async (quests) => {
    set({ quests });
    await Database.saveQuests(quests);
  },

  setTasks: async (tasks) => {
    set({ tasks });
    await Database.saveTasks(tasks);
  },
}));
