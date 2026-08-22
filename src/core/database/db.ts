import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UserState,
  QuestItem,
  TaskItem,
  MoodEntry,
  CombatCard,
  ThoughtFeedItem,
  WisdomScroll,
  DistortionType,
  ShadowDossier,
  ShadowFlawType,
  CardinalVirtues,
} from '../types';

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
  ACADEMY_SCROLLS: '@aetheria_academy_scrolls_v2',
  SHADOW_CRUCIBLE: '@aetheria_shadow_crucible_v2',
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

  async getWisdomScrolls(): Promise<WisdomScroll[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ACADEMY_SCROLLS);
      if (data) {
        return JSON.parse(data);
      }

      const initial: WisdomScroll[] = [
        {
          id: 'scr_stoic_1',
          title: 'The View from Above',
          subtitle: 'Marcus Aurelius & Psychological Decentering',
          authorOrTradition: 'Stoic Philosophy',
          readingMinutes: 2,
          category: 'STOICISM',
          contentMarkdown: `When entangled in anxiety or frustration, our field of vision shrinks to the immediate threat. Marcus Aurelius practiced zooming out mentally: looking down at your city, your continent, and the vast span of centuries.

From this cosmic altitude, what feels like a catastrophic crisis shrinks to its true size: a fleeting momentary occurrence. You gain the psychological breathing room to act with calm virtue rather than panic.`,
          keyTakeaway: 'Zooming out to a cosmic perspective shrinks acute anxiety and restores rational agency.',
          quiz: [
            {
              question: 'What is the primary psychological purpose of "The View from Above"?',
              options: [
                'To make yourself feel small and helpless',
                'To gain psychological distance and calm perspective',
                'To avoid taking responsibility for problems',
              ],
              correctIndex: 1,
              explanation: 'Decentering creates cognitive distance, helping you respond with clarity rather than reactive emotion.',
            },
            {
              question: 'When is this technique most clinically helpful?',
              options: [
                'During acute catastrophic spiral or social anxiety',
                'Only when you are asleep',
                'Never in real situations',
              ],
              correctIndex: 0,
              explanation: 'It acts as an immediate cognitive defusion tool when catastrophic thoughts arise.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_stoic_view_above',
            name: 'View from Above',
            category: 'FACT_CHECK',
            manaCost: 1,
            baseDamage: 36,
            shieldValue: 20,
            promptText: 'Zoom out 10 years into the future. How much will this moment actually matter?',
            targetDistortionBonus: { distortion: 'CATASTROPHIZING', multiplier: 1.6 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_neuro_2',
          title: 'The Amygdala Hijack',
          subtitle: 'Polyvagal Science & The Somatic Reset',
          authorOrTradition: 'Clinical Neuroscience',
          readingMinutes: 2,
          category: 'NEUROSCIENCE',
          contentMarkdown: `Before your rational prefrontal cortex can process an event, your amygdala scans for threats in 12 milliseconds. If it detects danger, it triggers the sympathetic nervous system: heart racing, tunnel vision, and racing thoughts.

You cannot logic your way out of a physiological alarm state. You must speak the body's language first: a physiological sigh (two quick inhales through the nose, one long slow exhale through the mouth) engages the vagal brake, lowering heart rate in under 30 seconds.`,
          keyTakeaway: 'Regulate the nervous system somatically before attempting cognitive restructuring.',
          quiz: [
            {
              question: 'Why does rational logic often fail during intense anxiety?',
              options: [
                'Because the amygdala has throttled prefrontal cognitive control',
                'Because you lack intelligence',
                'Because thoughts are always 100% true',
              ],
              correctIndex: 0,
              explanation: 'Sympathetic arousal shifts brain resources away from the prefrontal cortex toward survival reflexes.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_vagal_brake',
            name: 'Vagal Brake',
            category: 'COMPASSION',
            manaCost: 1,
            baseDamage: 22,
            shieldValue: 35,
            promptText: 'Double inhale through the nose, long slow exhale. My body is safe right now.',
            targetDistortionBonus: { distortion: 'EMOTIONAL_REASONING', multiplier: 1.7 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_rebt_3',
          title: 'Dismantling the "Should" Monster',
          subtitle: 'Albert Ellis & Rational Emotive Behavior Therapy',
          authorOrTradition: 'REBT / CBT',
          readingMinutes: 2,
          category: 'CBT_REBT',
          contentMarkdown: `Albert Ellis coined the term "Musterbation"—the irrational belief that things MUST, SHOULD, or OUGHT to be a certain way ("I must never make mistakes", "People must always treat me fairly").

When reality clashes with a dogmatic "should", rage, shame, and depression follow. The antidote is converting rigid demands into flexible preferences: "I would strongly PREFER to succeed, but if I do not, it is merely inconvenient, not catastrophic."`,
          keyTakeaway: 'Replace rigid dogmatic demands ("musts") with flexible, compassionate preferences.',
          quiz: [
            {
              question: 'What is the emotional consequence of rigid "should" statements?',
              options: [
                'Guaranteed perfection in all areas of life',
                'Chronic shame, guilt, and emotional rigidity',
                'Permanent peace of mind',
              ],
              correctIndex: 1,
              explanation: 'Rigid demands create inevitable dissonance whenever reality does not match ideal expectations.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_preferential_choice',
            name: 'Preferential Shield',
            category: 'FACT_CHECK',
            manaCost: 2,
            baseDamage: 40,
            shieldValue: 15,
            promptText: 'I would prefer perfection, but I can navigate human imperfection with grace.',
            targetDistortionBonus: { distortion: 'SHOULD_STATEMENTS', multiplier: 1.8 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_ba_4',
          title: 'The Momentum Paradox',
          subtitle: 'Action Precedes Motivation',
          authorOrTradition: 'Behavioral Activation',
          readingMinutes: 2,
          category: 'BEHAVIORAL_ACTIVATION',
          contentMarkdown: `A universal human cognitive trap is waiting to "feel like doing it" before taking action. Depression and fatigue create an illusion of inertia.

In behavioral activation science, motivation is not the cause of action—it is the byproduct. By committing to just 30 seconds of physical motion (opening the book, putting on sneakers), dopamine circuits activate, and kinetic momentum takes over.`,
          keyTakeaway: 'Action sparks motivation, never the reverse. Lower the activation hurdle to 30 seconds.',
          quiz: [
            {
              question: 'According to Behavioral Activation, how does genuine motivation arise?',
              options: [
                'By waiting until inspiration strikes',
                'As a neurochemical byproduct of taking the first micro-action',
                'By scolding yourself into action',
              ],
              correctIndex: 1,
              explanation: 'Action triggers dopamine release, which generates subsequent motivation and reduces friction.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_kinetic_spark',
            name: 'Kinetic Momentum',
            category: 'ACTION_SPARK',
            manaCost: 1,
            baseDamage: 38,
            shieldValue: 12,
            promptText: 'Take the single smallest 30-second physical step right now.',
            targetDistortionBonus: { distortion: 'ALL_OR_NOTHING', multiplier: 1.6 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_sleep_5',
          title: 'The 90-Minute Ultradian Rhythm',
          subtitle: 'Sleep Architecture & Adenosine Clearance',
          authorOrTradition: 'Sleep Medicine / BI',
          readingMinutes: 2,
          category: 'CIRCADIAN_SLEEP',
          contentMarkdown: `Sleep is not an on/off switch; it is an orchestrated 90-minute wave of light NREM, deep slow-wave repair, and REM cognitive integration.

If you toss and turn in bed for more than 20 minutes, your brain forms a conditioned arousal association between your mattress and frustration. Getting out of bed to read in dim light breaks this cycle and allows adenosine sleep pressure to rebuild naturally.`,
          keyTakeaway: 'Protect the bed as a sanctuary for sleep only; break conditioned arousal after 20 minutes.',
          quiz: [
            {
              question: 'Why should you leave bed if awake for longer than 20 minutes?',
              options: [
                'To punish your body',
                'To prevent conditioned association between bed and mental frustration',
                'Because sleep is unnecessary',
              ],
              correctIndex: 1,
              explanation: 'Stimulus control preserves the brain association of bed with effortless sleepiness.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_adenosine_wave',
            name: 'Adenosine Tide',
            category: 'COMPASSION',
            manaCost: 1,
            baseDamage: 25,
            shieldValue: 30,
            promptText: 'My body knows how to rest. I release the struggle and allow sleep to arrive.',
            targetDistortionBonus: { distortion: 'CATASTROPHIZING', multiplier: 1.5 },
          },
          isCompleted: false,
        },
      ];

      await AsyncStorage.setItem(STORAGE_KEYS.ACADEMY_SCROLLS, JSON.stringify(initial));
      return initial;
    } catch (e) {
      return [];
    }
  }

  async completeWisdomScroll(scrollId: string): Promise<void> {
    try {
      const scrolls = await this.getWisdomScrolls();
      const target = scrolls.find((s) => s.id === scrollId);
      if (!target) return;

      target.isCompleted = true;
      await AsyncStorage.setItem(STORAGE_KEYS.ACADEMY_SCROLLS, JSON.stringify(scrolls));

      // Add unlocked combat card to userState.activeCards
      const userState = await this.getUserState();
      const existingCard = userState.activeCards.find((c) => c.id === target.unlockedCardReward.id);
      const updatedCards = existingCard
        ? userState.activeCards
        : [...userState.activeCards, target.unlockedCardReward];

      const completedIds = userState.completedScrollIds || [];
      const updatedScrollIds = completedIds.includes(scrollId) ? completedIds : [...completedIds, scrollId];

      const updatedState: UserState = {
        ...userState,
        activeCards: updatedCards,
        completedScrollIds: updatedScrollIds,
        vitalityPoints: userState.vitalityPoints + 50,
        clarityMana: userState.clarityMana + 2,
      };
      await this.saveUserState(updatedState);
    } catch (e) {
      console.error('Failed to complete wisdom scroll', e);
    }
  }

  async getDistortionAnalytics(): Promise<{
    distribution: Record<DistortionType, number>;
    totalReframed: number;
    topDistortion: DistortionType;
  }> {
    const codex = await this.getVictoryCodex();
    const thoughtFeed = await this.getThoughtFeed();

    const counts: Record<DistortionType, number> = {
      CATASTROPHIZING: 0,
      ALL_OR_NOTHING: 0,
      MIND_READING: 0,
      EMOTIONAL_REASONING: 0,
      OVERGENERALIZATION: 0,
      SHOULD_STATEMENTS: 0,
      PERSONALIZATION: 0,
    };

    // Tally thought feed solved items
    thoughtFeed.forEach((item) => {
      if (item.isSolved && counts[item.correctDistortion] !== undefined) {
        counts[item.correctDistortion] += 1;
      }
    });

    // Default baseline distribution if newly started
    if (Object.values(counts).reduce((a, b) => a + b, 0) === 0) {
      counts.ALL_OR_NOTHING = 3;
      counts.CATASTROPHIZING = 4;
      counts.MIND_READING = 2;
      counts.SHOULD_STATEMENTS = 2;
      counts.EMOTIONAL_REASONING = 1;
    }

    let top: DistortionType = 'CATASTROPHIZING';
    let max = 0;
    Object.entries(counts).forEach(([dist, count]) => {
      if (count > max) {
        max = count;
        top = dist as DistortionType;
      }
    });

    return {
      distribution: counts,
      totalReframed: Object.values(counts).reduce((a, b) => a + b, 0) + codex.length,
      topDistortion: top,
    };
  }

  async updateValuesAlignment(pillar: 'CONNECTION' | 'CRAFT' | 'VITALITY' | 'WONDER', amount: number): Promise<void> {
    try {
      const state = await this.getUserState();
      const current = state.valuesAlignment || {
        CONNECTION: 30,
        CRAFT: 45,
        VITALITY: 50,
        WONDER: 25,
      };
      current[pillar] = Math.min(100, (current[pillar] || 0) + amount);

      const updated = {
        ...state,
        valuesAlignment: current,
      };
      await this.saveUserState(updated);
    } catch (e) {
      console.error('Failed to update values alignment', e);
    }
  }

  async getShadowDossiers(): Promise<ShadowDossier[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SHADOW_CRUCIBLE);
      if (data) {
        return JSON.parse(data);
      }

      const initial: ShadowDossier[] = [
        {
          id: 'FRAGILE_EGO',
          name: 'The Fragile Ego',
          title: 'Vanity, Intellectual Defensiveness & Superiority',
          iconName: 'Crown',
          color: '#FBBF24',
          unconsciousTerror: 'Terror of being exposed as ordinary, flawed, or unintelligent.',
          psychoanalyticAnatomy: 'Arises when self-worth is made contingent exclusively on performance, intelligence, or external praise. The ego constructs a fragile fortress: any criticism is treated as an existential threat, triggering immediate rationalization, counter-attacks, or condescension.',
          selfDeceptions: [
            '"I am not defensive; I am just explaining why I was actually right."',
            '"They only criticized my work because they don’t understand my high vision."',
            '"I don’t need advice from people who haven’t achieved what I have."',
          ],
          hiddenRelationalPoison: 'Suffocates honest communication. Makes teammates and partners walk on eggshells, leading to professional stagnation because nobody dares give you the truth.',
          razorProbes: [
            'When was the last time you admitted you were 100% wrong without adding a "but" or an excuse?',
            'What uncomfortable truth about your limitations are you terrified others will notice?',
            'How much mental energy do you waste curating an impression of competence rather than building real competence?',
          ],
          acuteEmergencyProtocol: 'When criticism stings: Close your mouth for 5 seconds. Place hands flat on your thighs. Say only: "Thank you for that perspective, let me sit with it."',
          crucibleVowText: 'Explicitly seek unvarnished critical feedback on a project or behavior from a peer, and respond ONLY with gratitude without offering a single defense.',
          associatedVirtue: 'HUMILITY',
          virtueForgedName: 'Radical Humility',
          isVowActive: false,
          isVowCompleted: false,
        },
        {
          id: 'CHRONIC_AVOIDANCE',
          name: 'The Chronic Evader',
          title: 'Sloth, Fake Productivity & Discomfort Phobia',
          iconName: 'Hourglass',
          color: '#60A5FA',
          unconsciousTerror: 'Terror of confronting difficult effort, potential failure, and the discomfort of sustained focus.',
          psychoanalyticAnatomy: 'A sophisticated escape mechanism where the nervous system treats cognitive strain or boredom as physical danger. It disguises sloth as "research," "reorganizing," or "waiting for inspiration," keeping you trapped in the comfortable purgatory of unfulfilled potential.',
          selfDeceptions: [
            '"I am just gathering more information before I start."',
            '"I work much better under pressure at the very last minute."',
            '"I am too tired right now; I will execute this with full energy tomorrow."',
          ],
          hiddenRelationalPoison: 'Destroys trust and reliability. Leaves partners carrying the emotional and logistical load while you remain in perpetual intention without execution.',
          razorProbes: [
            'What is the #1 hardest task you have been postponing for weeks while pretending to be busy?',
            'How many years of your life have dissolved into low-grade digital stimulation to avoid 20 minutes of boredom?',
            'If your actions over the last 30 days were broadcast publicly, what would they reveal about your actual discipline?',
          ],
          acuteEmergencyProtocol: 'The 10-Second Physical Ignition: Count backwards 5-4-3-2-1, stand up physically, and open the document without letting your mind debate.',
          crucibleVowText: 'Execute your single most dreaded, postponed task for 30 unbroken minutes first thing in the morning before opening any social media or news.',
          associatedVirtue: 'TEMPERANCE',
          virtueForgedName: 'Kinetic Discipline',
          isVowActive: false,
          isVowCompleted: false,
        },
        {
          id: 'BITTER_CYNIC',
          name: 'The Bitter Cynic',
          title: 'Resentment, Grudges & Self-Righteous Inaction',
          iconName: 'FlameKindling',
          color: '#8B5CF6',
          unconsciousTerror: 'Terror of vulnerability, hope, and the heartbreak of trying your best and still being disappointed.',
          psychoanalyticAnatomy: 'Resentment is the emotional weapon of the defeated. The cynic adopts a posture of intellectual superiority: by declaring that people are selfish, systems are rigged, and effort is futile, they insulate themselves from the terrifying risk of genuine earnestness.',
          selfDeceptions: [
            '"I am not cynical; I am just a realist about human nature."',
            '"Why bother trying hard when corrupt or shallow people always win anyway?"',
            '"They don’t deserve my forgiveness or kindness after what they did."',
          ],
          hiddenRelationalPoison: 'Radiates toxic negativity that drains the energy of everyone around you. Repels optimistic, high-agency collaborators and leaves you bitterly isolated.',
          razorProbes: [
            'Who are you silently holding a grudge against right now, and how is that resentment keeping you passive?',
            'What risk of heartbreak or failure are you avoiding by claiming "nothing matters anyway"?',
            'How much of your cynicism is merely a lazy rationalization for not stepping into the arena?',
          ],
          acuteEmergencyProtocol: 'The Sarcasm Brake: When about to make a disparaging remark, swallow the words and identify the underlying fear or unmet need.',
          crucibleVowText: 'Go 48 hours without uttering a single complaint, cynical remark, or sarcastic jab. If you slip, log it immediately and reset the clock.',
          associatedVirtue: 'COURAGE',
          virtueForgedName: 'Earnest Fortitude',
          isVowActive: false,
          isVowCompleted: false,
        },
        {
          id: 'PEOPLE_PLEASER',
          name: 'The People-Pleaser',
          title: 'Cowardice, Chameleonic Fawning & Dishonesty',
          iconName: 'Mask',
          color: '#F472B6',
          unconsciousTerror: 'Terror of conflict, rejection, abandonment, and someone being angry with you.',
          psychoanalyticAnatomy: 'Often mistaken for virtue, extreme people-pleasing is actually a manipulative covert contract: "If I never say no and always make you happy, you are not allowed to reject or criticize me." It breeds deep internal resentment because you betray your own needs to buy security.',
          selfDeceptions: [
            '"I just love helping people and hate being selfish."',
            '"It’s not a big deal; I’ll just do what they want to keep the peace."',
            '"If I speak my real opinion, it will destroy the relationship."',
          ],
          hiddenRelationalPoison: 'Creates shallow, dishonest relationships built on a false persona. Leads to sudden passive-aggressive explosions when the people-pleaser inevitably burns out.',
          razorProbes: [
            'Where in your life are you currently saying "yes" when your soul screams "no"?',
            'How is your chronic avoidance of conflict actually an act of dishonesty toward those you claim to love?',
            'What would happen if you let someone experience their disappointment without rushing to fix it for them?',
          ],
          acuteEmergencyProtocol: 'The 24-Hour Buffer: When asked for a favor, never say yes instantly. Say: "Let me check my priorities and get back to you by tomorrow."',
          crucibleVowText: 'Say a direct, unapologetic, and polite "No" to one request or obligation that violates your boundaries, offering ZERO excuses or over-explanations.',
          associatedVirtue: 'INTEGRITY',
          virtueForgedName: 'Authentic Backbone',
          isVowActive: false,
          isVowCompleted: false,
        },
        {
          id: 'CONTROL_TYRANT',
          name: 'The Control Tyrant',
          title: 'Micromanagement, Impatience & Inability to Trust',
          iconName: 'ShieldAlert',
          color: '#EF4444',
          unconsciousTerror: 'Terror of vulnerability, chaos, and reliance on fallible human beings.',
          psychoanalyticAnatomy: 'The tyrant equates control with safety. Deep down, they believe the universe is chaotic and people are fundamentally incompetent. To stave off panic, they police every minor detail, suffocate autonomy in others, and burn themselves out carrying every burden.',
          selfDeceptions: [
            '"If you want something done right, you have to do it yourself."',
            '"I am not micromanaging; I just have very high standards for quality."',
            '"People are grateful that I keep everything organized and on track."',
          ],
          hiddenRelationalPoison: 'Infantilizes colleagues, children, and partners. Crushes initiative in others, breeding resentment, learned helplessness, and high team turnover.',
          razorProbes: [
            'What catastrophic disaster do you secretly believe will occur if you let someone else manage this task their way?',
            'How is your chronic impatience actually an inability to tolerate your own inner anxiety?',
            'How much burnout have you inflicted upon yourself by refusing to share control?',
          ],
          acuteEmergencyProtocol: 'The Surrender Exhale: When feeling the urge to intervene, sit on your hands and take three deep breaths, repeating: "Outcome does not equal my safety."',
          crucibleVowText: 'Delegate one significant task or decision entirely to another person. Give ZERO unsolicited check-ins, corrections, or micromanagement for 72 hours.',
          associatedVirtue: 'TEMPERANCE',
          virtueForgedName: 'Radical Trust',
          isVowActive: false,
          isVowCompleted: false,
        },
        {
          id: 'PROFESSIONAL_VICTIM',
          name: 'The Professional Victim',
          title: 'Learned Helplessness, Resignation & Agency Surrender',
          iconName: 'Compass',
          color: '#A78BFA',
          unconsciousTerror: 'Terror of the terrifying burden of personal sovereignty and accountability.',
          psychoanalyticAnatomy: 'The victim archetype extracts psychological secondary gain from suffering. If you are helpless, no one can demand excellence from you; if fate is cruel, you never have to face the shame of trying and failing. Misery becomes an unassailable moral identity.',
          selfDeceptions: [
            '"You don’t understand how uniquely difficult my circumstances are."',
            '"I have tried everything; nothing ever works for someone like me."',
            '"I am just waiting for things to stabilize before I take action."',
          ],
          hiddenRelationalPoison: 'Exhausts the empathy of friends and mentors. Transforms every supportive conversation into an emotional black hole where solutions are systematically rejected.',
          razorProbes: [
            'What secret freedom or comfort does playing the helpless victim give you right now?',
            'How are you choosing the familiar misery of stagnation over the terrifying responsibility of growth?',
            'If you were forced to acknowledge that your current state is 100% your responsibility to fix, what would you start doing today?',
          ],
          acuteEmergencyProtocol: 'The Agency Shift: Strike the words "I can’t" and "It’s unfair" from your vocabulary. Replace with: "What is my immediate next move?"',
          crucibleVowText: 'Identify one recurring life complaint. Write down 3 concrete physical actions that YOU ALONE can take, and execute all 3 without asking for sympathy.',
          associatedVirtue: 'COURAGE',
          virtueForgedName: 'Sovereign Agency',
          isVowActive: false,
          isVowCompleted: false,
        },
        {
          id: 'SECRET_ENVIER',
          name: 'The Secret Envier',
          title: 'Malicious Social Comparison & Begrudging Success',
          iconName: 'Eye',
          color: '#10B981',
          unconsciousTerror: 'Terror of being left behind, outshined, or proven fundamentally inadequate.',
          psychoanalyticAnatomy: 'Envy views the world as a zero-sum game of status. When a peer succeeds, the envier feels personally diminished. Rather than converting this sting into inspiration, the shadow attempts to equalize status by privately diminishing, gossiping, or looking for flaws in the winner.',
          selfDeceptions: [
            '"They only succeeded because they got lucky or had unfair advantages."',
            '"I am happy for them, but their work really isn’t that impressive."',
            '"They are letting success get to their head; someone needs to humble them."',
          ],
          hiddenRelationalPoison: 'Eats away at your soul like acid. Prevents you from learning from those ahead of you and poisons authentic camaraderie in your social circle.',
          razorProbes: [
            'Whose recent victory secretly gave you a pang of bitterness or jealousy?',
            'How does obsessing over their advantages blind you to the disciplined effort they put in?',
            'What dormant greatness in yourself are you mourning when you look at their success?',
          ],
          acuteEmergencyProtocol: 'The Mudita Blessing: When envy strikes, silently say: "May their success continue to flourish, and may I cultivate my own craft."',
          crucibleVowText: 'Send a heartfelt, detailed, and unprompted message of praise to a competitor or peer whose success triggered your envy, celebrating their achievement.',
          associatedVirtue: 'HUMILITY',
          virtueForgedName: 'Mudita (Generous Joy)',
          isVowActive: false,
          isVowCompleted: false,
        },
        {
          id: 'EMOTIONAL_TYRANT',
          name: 'The Emotional Tyrant',
          title: 'Explosive Reactivity, Mood Drama & Eggshell Tyranny',
          iconName: 'Zap',
          color: '#F97316',
          unconsciousTerror: 'Terror of internal helplessness and being overwhelmed by unexpressed emotions.',
          psychoanalyticAnatomy: 'The emotional tyrant uses volatile moods as an unconscious weapon of coercion. When stressed, they explode in anger or retreat into punishing coldness, forcing everyone in the room to scramble to pacify them. They mistake emotional dysregulation for "authenticity."',
          selfDeceptions: [
            '"I am just a passionate, authentic person who wears their heart on their sleeve."',
            '"If people didn’t do stupid things, I wouldn’t have to lose my temper."',
            '"I apologized afterward, so they have no right to still be upset."',
          ],
          hiddenRelationalPoison: 'Creates a climate of chronic fear and walking on eggshells. Teaches your loved ones to hide the truth from you and slowly destroys emotional safety.',
          razorProbes: [
            'How often do you use your bad mood to intimidate or control the emotional atmosphere of your home or team?',
            'Why do you believe your temporary feelings give you a license to inflict verbal cruelty upon others?',
            'What childhood memory taught you that anger was the only way to feel powerful?',
          ],
          acuteEmergencyProtocol: 'The 60-Second Quarantine: When anger surges, immediately state: "I am overwhelmed right now. I am stepping outside for 5 minutes before I speak."',
          crucibleVowText: 'Commit to zero raised voices, door-slamming, or passive-aggressive silent treatment for 7 consecutive days. If you lose control, make a formal, humble apology within 1 hour.',
          associatedVirtue: 'TEMPERANCE',
          virtueForgedName: 'Stoic Self-Regulation',
          isVowActive: false,
          isVowCompleted: false,
        },
        {
          id: 'SCARCITY_HOARDER',
          name: 'The Scarcity Hoarder',
          title: 'Stinginess with Money, Time, Praise & Vulnerability',
          iconName: 'Coins',
          color: '#EAB308',
          unconsciousTerror: 'Terror of starvation, running out, and having nothing left when catastrophe strikes.',
          psychoanalyticAnatomy: 'Rooted in deep emotional deprivation, the hoarder operates from constant panic: "There is never enough." They hoard finances, refuse to give genuine praise, guard their time obsessively, and treat emotional intimacy as an expensive transaction where they might get shortchanged.',
          selfDeceptions: [
            '"I am not cheap; I am just responsible and financially prudent."',
            '"If I praise them too much, they will get lazy and stop working hard."',
            '"I have to look out for myself first because no one else will."',
          ],
          hiddenRelationalPoison: 'Starves relationships of warmth, joy, and spontaneous generosity. Leaves you rich in assets or protected time, but deeply impoverished in human connection.',
          razorProbes: [
            'Where are you clutching resources, time, or validation out of terror rather than genuine prudence?',
            'When was the last time you gave something meaningful to someone with zero expectation of return or recognition?',
            'How is your scarcity mentality actually creating the very poverty of spirit you fear?',
          ],
          acuteEmergencyProtocol: 'The Generosity Reflex: Whenever you feel the urge to pinch pennies or hold back a compliment, deliberately give 20% more.',
          crucibleVowText: 'Perform three radical acts of anonymous generosity this week: give an unexpectedly generous tip, gift something valuable, or spend 1 hour mentoring someone for free.',
          associatedVirtue: 'INTEGRITY',
          virtueForgedName: 'Magnanimous Abundance',
          isVowActive: false,
          isVowCompleted: false,
        },
        {
          id: 'HYPOCRITICAL_MORALIST',
          name: 'The Hypocritical Moralist',
          title: 'Self-Righteousness, Double Standards & Virtue Posturing',
          iconName: 'Scale',
          color: '#38BDF8',
          unconsciousTerror: 'Terror of being seen as ordinary, dirty, corrupt, or ethically compromised.',
          psychoanalyticAnatomy: 'The moralist splits human nature into pure virtue and evil. By loudly condemning the moral failings of politicians, coworkers, or public figures, they project their own disowned dark impulses onto others, granting themselves a hallucination of moral purity while quietly indulging in hypocrisy.',
          selfDeceptions: [
            '"I only call people out because ethics and justice matter to me."',
            '"My mistakes were understandable accidents, but their mistakes were malicious."',
            '"The world would be a better place if everyone followed my standards."',
          ],
          hiddenRelationalPoison: 'Breeds suffocating self-righteousness. Makes you impossible to live with because you hold others to standards of perfection that you yourself do not meet.',
          razorProbes: [
            'What specific behavior do you loudly condemn in others that you secretly indulge in behind closed doors?',
            'How much of your ethical outrage is actually a cheap dopamine hit of moral superiority?',
            'If your private thoughts and private hypocrisies were made public, how pure would you look?',
          ],
          acuteEmergencyProtocol: 'The Mirror Check: Before criticizing anyone, ask yourself: "Where have I done something comparable in my own life?"',
          crucibleVowText: 'Identify someone you have judged or criticized recently. Privately write down 3 ways you are guilty of the exact same flaw, and confess one to a trusted confidant.',
          associatedVirtue: 'INTEGRITY',
          virtueForgedName: 'Uncompromising Integrity',
          isVowActive: false,
          isVowCompleted: false,
        },
      ];

      await AsyncStorage.setItem(STORAGE_KEYS.SHADOW_CRUCIBLE, JSON.stringify(initial));
      return initial;
    } catch (e) {
      return [];
    }
  }

  async completeCrucibleVow(flawId: ShadowFlawType): Promise<void> {
    try {
      const dossiers = await this.getShadowDossiers();
      const target = dossiers.find((d) => d.id === flawId);
      if (!target) return;

      target.isVowCompleted = true;
      target.isVowActive = false;
      await AsyncStorage.setItem(STORAGE_KEYS.SHADOW_CRUCIBLE, JSON.stringify(dossiers));

      // Update UserState Virtues & Rewards
      const userState = await this.getUserState();
      const currentVirtues = userState.cardinalVirtues || {
        courage: 25,
        integrity: 25,
        temperance: 25,
        humility: 25,
      };

      const virtueKey = target.associatedVirtue.toLowerCase() as keyof CardinalVirtues;
      currentVirtues[virtueKey] = Math.min(100, (currentVirtues[virtueKey] || 0) + 15);

      const activeVows = (userState.activeCrucibleVows || []).filter((id) => id !== flawId);

      const updatedState: UserState = {
        ...userState,
        vitalityPoints: userState.vitalityPoints + 60,
        clarityMana: userState.clarityMana + 3,
        cardinalVirtues: currentVirtues,
        activeCrucibleVows: activeVows,
      };
      await this.saveUserState(updatedState);
    } catch (e) {
      console.error('Failed to complete crucible vow', e);
    }
  }

  async getCardinalVirtues(): Promise<CardinalVirtues> {
    const state = await this.getUserState();
    return (
      state.cardinalVirtues || {
        courage: 30,
        integrity: 35,
        temperance: 25,
        humility: 20,
      }
    );
  }
}

export const Database = new DatabaseService();
