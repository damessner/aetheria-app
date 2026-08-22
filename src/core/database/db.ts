import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserState, QuestItem, TaskItem, MoodEntry, CombatCard, ThoughtFeedItem } from '../types';

const STORAGE_KEYS = {
  USER_STATE: '@aetheria_user_state_v2',
  QUESTS: '@aetheria_quests_v2',
  TASKS: '@aetheria_tasks_v2',
  MOOD_LOGS: '@aetheria_mood_logs_v2',
  VICTORY_CODEX: '@aetheria_codex_v2',
  SLEEP_LOGS: '@aetheria_sleep_logs_v2',
  PROBLEM_SOLVING: '@aetheria_problem_solving_v2',
  CAMPFIRE_CHATS: '@aetheria_campfire_chats_v2',
  THOUGHT_FEED: '@aetheria_thought_feed_v2',
};

export const INITIAL_COMBAT_DECK: CombatCard[] = [
  {
    id: 'crd_fact_check_1',
    name: 'Evidence Vault',
    category: 'FACT_CHECK',
    manaCost: 1,
    baseDamage: 25,
    shieldValue: 0,
    promptText: 'What is the actual factual evidence supporting or contradicting this thought?',
    targetDistortionBonus: {
      distortion: 'CATASTROPHIZING',
      multiplier: 1.6,
    },
  },
  {
    id: 'crd_compassion_1',
    name: 'Aura of Self-Compassion',
    category: 'COMPASSION',
    manaCost: 1,
    baseDamage: 15,
    shieldValue: 25,
    promptText: 'Would I speak to a dear friend with this level of harshness?',
    targetDistortionBonus: {
      distortion: 'ALL_OR_NOTHING',
      multiplier: 1.5,
    },
  },
  {
    id: 'crd_reframe_1',
    name: 'Alternative Horizon',
    category: 'REFRAME',
    manaCost: 2,
    baseDamage: 38,
    shieldValue: 10,
    promptText: 'What is a more balanced, realistic perspective on this situation?',
    targetDistortionBonus: {
      distortion: 'MIND_READING',
      multiplier: 1.7,
    },
  },
  {
    id: 'crd_action_1',
    name: 'Action Spark',
    category: 'ACTION_SPARK',
    manaCost: 1,
    baseDamage: 20,
    shieldValue: 15,
    promptText: 'Focus on what is directly inside my control right now.',
    targetDistortionBonus: {
      distortion: 'OVERGENERALIZATION',
      multiplier: 1.4,
    },
  },
];

export const INITIAL_USER_STATE: UserState = {
  schemaVersion: '2.0.0',
  userId: 'usr_' + Math.random().toString(36).substring(2, 9),
  createdAt: new Date().toISOString(),
  campaignWeek: 1,
  clinicalPhase: 'PHASE_1_BA_BI',
  vitalityResonance: 0.75,
  restResonanceBank: 1.0,
  energyTier: 'STEADY_40',
  vitalityPoints: 120,
  clarityMana: 3,
  restShields: 3,
  activeCards: INITIAL_COMBAT_DECK,
  equippedRelics: [],
  sanctuary: {
    currentBiomeId: 'GLOOMSPIRE_GROVE',
    gloomClearingPercentage: 35.0,
    vitalityFloraCount: 4,
    celestialConstellationsUnlocked: 1,
    companions: [
      {
        id: 'KAEL_OWL',
        name: 'Kael the Owl-Sage',
        title: 'Cognitive Restructuring & Logic Guardian',
        affinityLevel: 1,
        isActive: true,
      },
      {
        id: 'PYRA_FOX',
        name: 'Pyra the Ember-Fox',
        title: 'Behavioral Spark & Motivation',
        affinityLevel: 1,
        isActive: false,
      },
      {
        id: 'LIORA_NYMPH',
        name: 'Liora the Water-Nymph',
        title: 'Somatic Calm & Compassion',
        affinityLevel: 1,
        isActive: false,
      },
    ],
  },
  stats: {
    mindShield: 40,
    logicEdge: 50,
    compassionAura: 35,
  },
  preferences: {
    chronotype: 'STANDARD_DAYTIME',
    circadianMode: 'AUTO',
    wakeHour: 7,
    sleepHour: 23,
    geminiApiKey: '',
    geminiModel: 'gemini-3.7-flash',
    githubRepo: 'damessner/aetheria-app',
    biometricLock: false,
  },
};

export const INITIAL_QUESTS: QuestItem[] = [
  // 10% Low Spark Quests
  {
    id: 'qst_low_1',
    title: '30-Second Diaphragmatic Breath',
    description: 'Slow deep inhale for 4 seconds, hold 4 seconds, exhale 6 seconds.',
    category: 'SOMATIC',
    clinicalSkill: 'BI',
    energyCostTier: 'LOW_10',
    microSteps: ['Rest back', 'Slow inhale', 'Gentle exhale'],
    rewards: { vitalityPoints: 30, clarityMana: 1, sanctuaryGrowth: 5 },
    isCompleted: false,
    circadianFriendly: true,
  },
  {
    id: 'qst_low_2',
    title: 'Sensory Triad Grounding',
    description: 'Silently name 3 physical objects you can see around you right now.',
    category: 'MINDFULNESS',
    clinicalSkill: 'CR',
    energyCostTier: 'LOW_10',
    microSteps: ['Look around', 'Name 3 objects', 'Acknowledge present presence'],
    rewards: { vitalityPoints: 35, clarityMana: 1, sanctuaryGrowth: 6 },
    isCompleted: false,
    circadianFriendly: true,
  },
  // 40% Steady Flame Quests
  {
    id: 'qst_steady_1',
    title: 'Hydration Catalyst',
    description: 'Drink 1 full glass of fresh water away from your workstation screen.',
    category: 'HYDRATION',
    clinicalSkill: 'BA',
    energyCostTier: 'STEADY_40',
    microSteps: ['Stand up from chair', 'Walk to kitchen/water bottle', 'Drink full glass'],
    rewards: { vitalityPoints: 50, clarityMana: 2, sanctuaryGrowth: 10 },
    isCompleted: false,
    circadianFriendly: true,
  },
  {
    id: 'qst_steady_2',
    title: 'One-Square-Foot Sanctuary Cleanse',
    description: 'Clear and wipe just one square foot of your immediate desk or nightstand.',
    category: 'WORKSPACE',
    clinicalSkill: 'BA',
    energyCostTier: 'STEADY_40',
    microSteps: ['Pick up 2 clutter items', 'Wipe surface', 'Admire the clear space'],
    rewards: { vitalityPoints: 55, clarityMana: 2, sanctuaryGrowth: 12 },
    isCompleted: false,
    circadianFriendly: true,
  },
  // 80% Blazing Radiance Quests
  {
    id: 'qst_blazing_1',
    title: '15-Minute Daylight Walk',
    description: 'Step outside into natural sunlight for 15 minutes of gentle movement.',
    category: 'MOVEMENT',
    clinicalSkill: 'BA',
    energyCostTier: 'BLAZING_80',
    microSteps: ['Put on shoes', 'Step outdoors', 'Walk at comfortable pace'],
    rewards: { vitalityPoints: 90, clarityMana: 4, sanctuaryGrowth: 20 },
    isCompleted: false,
    circadianFriendly: true,
  },
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'tsk_sample_1',
    title: 'Review Project PR & Merge Route',
    description: 'Review code changes and execute tests before deployment.',
    category: 'WORK',
    energyTier: 'STEADY_40',
    subTasks: [
      { id: 'st_1', title: 'Open GitHub Pull Request', isCompleted: true },
      { id: 'st_2', title: 'Read diff line by line', isCompleted: false },
      { id: 'st_3', title: 'Run automated tests locally', isCompleted: false },
    ],
    isCompleted: false,
    relicDrop: {
      id: 'rel_chronos_lens',
      name: 'Lens of Clarity',
      description: '+10 Logic Edge in Arena Battles',
      statBoost: 'LOGIC_EDGE',
      boostAmount: 10,
    },
    createdAt: new Date().toISOString(),
  },
];

class DatabaseService {
  async getUserState(): Promise<UserState> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_STATE);
      if (!data) {
        await this.saveUserState(INITIAL_USER_STATE);
        return INITIAL_USER_STATE;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading UserState, returning fallback', e);
      return INITIAL_USER_STATE;
    }
  }

  async saveUserState(state: UserState): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_STATE, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save UserState', e);
    }
  }

  async getQuests(): Promise<QuestItem[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.QUESTS);
      if (!data) {
        await this.saveQuests(INITIAL_QUESTS);
        return INITIAL_QUESTS;
      }
      return JSON.parse(data);
    } catch (e) {
      return INITIAL_QUESTS;
    }
  }

  async saveQuests(quests: QuestItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));
    } catch (e) {
      console.error('Failed to save Quests', e);
    }
  }

  async getTasks(): Promise<TaskItem[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
      if (!data) {
        await this.saveTasks(INITIAL_TASKS);
        return INITIAL_TASKS;
      }
      return JSON.parse(data);
    } catch (e) {
      return INITIAL_TASKS;
    }
  }

  async saveTasks(tasks: TaskItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save Tasks', e);
    }
  }

  async getMoodLogs(): Promise<MoodEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MOOD_LOGS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  async saveMoodLog(entry: MoodEntry): Promise<void> {
    try {
      const logs = await this.getMoodLogs();
      logs.unshift(entry);
      await AsyncStorage.setItem(STORAGE_KEYS.MOOD_LOGS, JSON.stringify(logs.slice(0, 100)));
    } catch (e) {
      console.error('Failed to save MoodLog', e);
    }
  }

  async getVictoryCodex(): Promise<Array<{ id: string; bossName: string; thought: string; reframe: string; date: string }>> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.VICTORY_CODEX);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  async addVictoryCodexEntry(entry: { bossName: string; thought: string; reframe: string }): Promise<void> {
    try {
      const codex = await this.getVictoryCodex();
      codex.unshift({
        id: 'cdx_' + Date.now(),
        ...entry,
        date: new Date().toISOString(),
      });
      await AsyncStorage.setItem(STORAGE_KEYS.VICTORY_CODEX, JSON.stringify(codex.slice(0, 50)));
    } catch (e) {
      console.error('Failed to save Codex entry', e);
    }
  }

  async getSleepLogs(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SLEEP_LOGS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  async saveSleepLog(entry: any): Promise<void> {
    try {
      const logs = await this.getSleepLogs();
      logs.unshift(entry);
      await AsyncStorage.setItem(STORAGE_KEYS.SLEEP_LOGS, JSON.stringify(logs.slice(0, 60)));
    } catch (e) {
      console.error('Failed to save SleepLog', e);
    }
  }

  async getProblemSolvingWorksheets(): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PROBLEM_SOLVING);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  async saveProblemSolvingWorksheet(worksheet: any): Promise<void> {
    try {
      const list = await this.getProblemSolvingWorksheets();
      const existingIdx = list.findIndex((w) => w.id === worksheet.id);
      if (existingIdx >= 0) {
        list[existingIdx] = worksheet;
      } else {
        list.unshift(worksheet);
      }
      await AsyncStorage.setItem(STORAGE_KEYS.PROBLEM_SOLVING, JSON.stringify(list.slice(0, 30)));
    } catch (e) {
      console.error('Failed to save ProblemSolvingWorksheet', e);
    }
  }

  async getCampfireMessages(companionId: string): Promise<any[]> {
    try {
      const data = await AsyncStorage.getItem(`${STORAGE_KEYS.CAMPFIRE_CHATS}_${companionId}`);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  async saveCampfireMessages(companionId: string, messages: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        `${STORAGE_KEYS.CAMPFIRE_CHATS}_${companionId}`,
        JSON.stringify(messages.slice(-50))
      );
    } catch (e) {
      console.error('Failed to save CampfireMessages', e);
    }
  }

  async getThoughtFeed(): Promise<ThoughtFeedItem[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.THOUGHT_FEED);
      if (data) {
        return JSON.parse(data);
      }
      const initial = [
        {
          id: 'thg_seed_1',
          thought: 'I didn’t finish all 5 goals today, so the entire weekend was a complete waste.',
          contextDomain: 'PERFECTIONISM',
          correctDistortion: 'ALL_OR_NOTHING',
          explanation: 'Evaluating an entire day as either 100% successful or a total failure.',
          techniqueOptions: ['CBT_REALITY_CHECK', 'CFT_COMPASSION', 'BA_MICRO_ACTION'],
          suggestedReframe: 'Finishing 3 out of 5 goals is still meaningful progress. Rest and partial completion have value.',
          isSolved: false,
        },
        {
          id: 'thg_seed_2',
          thought: 'My heart is beating faster before this meeting. I am definitely going to have a panic attack and embarrass myself.',
          contextDomain: 'HEALTH_ANXIETY',
          correctDistortion: 'CATASTROPHIZING',
          explanation: 'Interpreting normal physiological arousal as an imminent catastrophe.',
          techniqueOptions: ['CBT_REALITY_CHECK', 'CFT_COMPASSION', 'ACT_DEFUSION'],
          suggestedReframe: 'A fast heart rate is simply my body preparing energy for focus. It is uncomfortable, but not dangerous.',
          isSolved: false,
        },
        {
          id: 'thg_seed_3',
          thought: 'My manager sent a calendar invite without a description. I must be getting fired or demoted.',
          contextDomain: 'WORK_BURNOUT',
          correctDistortion: 'MIND_READING',
          explanation: 'Assuming the worst possible motivation without factual data.',
          techniqueOptions: ['CBT_REALITY_CHECK', 'STOIC_CONTROL', 'ACT_DEFUSION'],
          suggestedReframe: 'Most calendar invites are standard check-ins or project syncs. I will wait for actual facts before stressing.',
          isSolved: false,
        },
      ];
      await this.saveThoughtFeed(initial as any);
      return initial as any;
    } catch (e) {
      return [];
    }
  }

  async saveThoughtFeed(items: ThoughtFeedItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THOUGHT_FEED, JSON.stringify(items.slice(0, 50)));
    } catch (e) {
      console.error('Failed to save ThoughtFeed', e);
    }
  }

  async markThoughtSolved(id: string, score: number, userReframe: string): Promise<void> {
    try {
      const feed = await this.getThoughtFeed();
      const updated = feed.map((item) =>
        item.id === id ? { ...item, isSolved: true, userScore: score, userReframe } : item
      );
      await this.saveThoughtFeed(updated);
    } catch (e) {
      console.error('Failed to mark thought solved', e);
    }
  }
}

export const Database = new DatabaseService();
