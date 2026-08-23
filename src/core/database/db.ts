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
  // 10% Low Spark Quests (Low battery, under 60 seconds)
  {
    id: 'qst_low_1',
    title: 'The Father’s Physiological Sigh',
    description: 'Take 2 rapid nasal inhales followed by 1 long unforced mouth sigh before entering the house or classroom.',
    category: 'SOMATIC',
    clinicalSkill: 'BI',
    energyCostTier: 'LOW_10',
    microSteps: ['Pause at door', 'Double nasal inhale', 'Long slow sigh'],
    rewards: { vitalityPoints: 30, clarityMana: 1, sanctuaryGrowth: 5 },
    isCompleted: false,
    circadianFriendly: true,
  },
  {
    id: 'qst_low_2',
    title: '1-Sentence Partner Appreciation',
    description: 'Send a quick text to your partner expressing gratitude for one specific thing today.',
    category: 'MINDFULNESS',
    clinicalSkill: 'CR',
    energyCostTier: 'LOW_10',
    microSteps: ['Open messaging', 'Type 1 sentence of genuine thanks', 'Send with no expectation of reply'],
    rewards: { vitalityPoints: 35, clarityMana: 1, sanctuaryGrowth: 6 },
    isCompleted: false,
    circadianFriendly: true,
  },
  {
    id: 'qst_low_3',
    title: 'Cold Water Sensory Grounding',
    description: 'Splash cold water on your face or hold an ice cube to rapidly downregulate sympathetic arousal.',
    category: 'SOMATIC',
    clinicalSkill: 'BI',
    energyCostTier: 'LOW_10',
    microSteps: ['Step to sink', 'Splash cold water', 'Take 1 slow breath'],
    rewards: { vitalityPoints: 35, clarityMana: 1, sanctuaryGrowth: 6 },
    isCompleted: false,
    circadianFriendly: true,
  },

  // 40% Steady Flame Quests (3–5 minutes)
  {
    id: 'qst_steady_1',
    title: 'Phone-Free Floor Play (5 Mins)',
    description: 'Leave your phone in another room and sit on the carpet with your child for 5 unbroken minutes of play.',
    category: 'MOVEMENT',
    clinicalSkill: 'BA',
    energyCostTier: 'STEADY_40',
    microSteps: ['Place phone on charger in other room', 'Sit on floor at child eye-level', 'Follow their lead in play'],
    rewards: { vitalityPoints: 55, clarityMana: 2, sanctuaryGrowth: 12 },
    isCompleted: false,
    circadianFriendly: true,
  },
  {
    id: 'qst_steady_2',
    title: 'Educator’s Decompression Perimeter Walk',
    description: 'Walk one complete lap around the school building during lunch or prep period in quiet reflection.',
    category: 'WORKSPACE',
    clinicalSkill: 'BA',
    energyCostTier: 'STEADY_40',
    microSteps: ['Step away from grading desk', 'Walk outdoors around building', 'Breathe fresh air'],
    rewards: { vitalityPoints: 50, clarityMana: 2, sanctuaryGrowth: 10 },
    isCompleted: false,
    circadianFriendly: true,
  },
  {
    id: 'qst_steady_3',
    title: 'Evening 60-Second Decompression Hug',
    description: 'Share an unbroken 60-second hug with your partner to stimulate mutual oxytocin release.',
    category: 'MINDFULNESS',
    clinicalSkill: 'CR',
    energyCostTier: 'STEADY_40',
    microSteps: ['Put down dishes/devices', 'Embrace partner warmly', 'Synchronize breathing for 60 seconds'],
    rewards: { vitalityPoints: 60, clarityMana: 2, sanctuaryGrowth: 14 },
    isCompleted: false,
    circadianFriendly: true,
  },

  // 80% Blazing Radiance Quests (15–30 minutes)
  {
    id: 'qst_blazing_1',
    title: 'Weekend Family Nature Micro-Adventure',
    description: 'Take your children or partner for a 20-minute walk in a local park or trail without agenda.',
    category: 'MOVEMENT',
    clinicalSkill: 'BA',
    energyCostTier: 'BLAZING_80',
    microSteps: ['Pack water & snacks', 'Walk in green space', 'Observe nature together'],
    rewards: { vitalityPoints: 95, clarityMana: 4, sanctuaryGrowth: 22 },
    isCompleted: false,
    circadianFriendly: true,
  },
  {
    id: 'qst_blazing_2',
    title: 'Weekly 1-on-1 Date Walk (No Logistics Talk)',
    description: 'Take a 20-minute walk with your partner with a strict rule: zero discussion of chores, bills, or logistics.',
    category: 'MINDFULNESS',
    clinicalSkill: 'BA',
    energyCostTier: 'BLAZING_80',
    microSteps: ['Step out together', 'Ask about dreams/feelings', 'Hold hands'],
    rewards: { vitalityPoints: 100, clarityMana: 4, sanctuaryGrowth: 25 },
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
      const initial: ThoughtFeedItem[] = [
        {
          id: 'thg_parent_1',
          thought: 'My 4-year-old is having a screaming bedtime meltdown. I must be failing as a father because good parents have calm children.',
          contextDomain: 'FATHERHOOD_PARENTING',
          correctDistortion: 'ALL_OR_NOTHING',
          explanation: 'Equating a child’s normal developmental emotional dysregulation with complete parental failure.',
          techniqueOptions: ['SOMATIC_COREGULATION', 'CFT_COMPASSION', 'CBT_REALITY_CHECK'],
          suggestedReframe: 'Toddler tantrums are neurological overwhelm, not a referendum on my parenting. My job is to be the calm anchor.',
          reframeOptions: [
            {
              id: 'ref_p1_opt',
              text: 'Toddler meltdowns are a normal part of nervous system development, not proof of bad parenting. My role is to stay calm and co-regulate.',
              type: 'OPTIMAL',
              score: 98,
              explanation: 'Applies Somatic Co-Regulation and CBT evidence testing; removes shame.',
              clinicalFeedback: 'Masterful reframe. Decouples your worth from toddler dysregulation.',
            },
            {
              id: 'ref_p1_toxic',
              text: 'Everything is fine! Children are a blessing and I should feel lucky and smile through every scream!',
              type: 'TOXIC_POSITIVITY',
              score: 45,
              explanation: 'Invalidates genuine exhaustion with superficial positivity.',
              clinicalFeedback: 'Toxic positivity suppresses real emotional strain and leads to sudden snapping.',
            },
            {
              id: 'ref_p1_rat',
              text: 'Other kids never scream like this. My child is just defiant and I am doomed to have a chaotic home.',
              type: 'RATIONALIZATION',
              score: 25,
              explanation: 'Maintains all-or-nothing thinking and learned helplessness.',
              clinicalFeedback: 'Reinforces helplessness and creates adversarial tension with your child.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_parent_2',
          thought: 'I snapped and raised my voice at the kids during the morning rush. I have permanently damaged our bond and their trust in me.',
          contextDomain: 'FATHERHOOD_PARENTING',
          correctDistortion: 'CATASTROPHIZING',
          explanation: 'Blowing a moment of morning frustration into irreversible psychological trauma.',
          techniqueOptions: ['CFT_COMPASSION', 'CBT_REALITY_CHECK', 'SCHEMA_HEALTHY_ADULT'],
          suggestedReframe: 'Losing my temper is human under stress. What builds secure attachment is humble, swift repair and apology.',
          reframeOptions: [
            {
              id: 'ref_p2_opt',
              text: 'Raising my voice was a mistake born of stress, but attachment research proves swift, humble repair and apology actually strengthens trust.',
              type: 'OPTIMAL',
              score: 96,
              explanation: 'Emphasizes repair over perfection, backed by developmental science.',
              clinicalFeedback: 'Excellent. Demonstrates that authentic repair models emotional maturity for your children.',
            },
            {
              id: 'ref_p2_toxic',
              text: 'They won’t even remember it when they grow up, so there is no point in apologizing or dwelling on it.',
              type: 'TOXIC_POSITIVITY',
              score: 40,
              explanation: 'Dismisses accountability to avoid temporary discomfort.',
              clinicalFeedback: 'Bypassing repair prevents children from learning how healthy adults take ownership.',
            },
            {
              id: 'ref_p2_rat',
              text: 'If they just put their shoes on the first time I asked, I wouldn’t have had to yell. It’s entirely their fault.',
              type: 'RATIONALIZATION',
              score: 20,
              explanation: 'Projects adult emotional dysregulation onto young children.',
              clinicalFeedback: 'Blaming children for adult reactivity keeps you stuck in reactive parenting loops.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_parent_3',
          thought: 'I worked late and missed family dinner. A good father should never prioritize work over family time.',
          contextDomain: 'FATHERHOOD_PARENTING',
          correctDistortion: 'SHOULD_STATEMENTS',
          explanation: 'Applying an impossible, rigid moral standard that ignores realistic professional constraints.',
          techniqueOptions: ['REBT_DISPUTE', 'CFT_COMPASSION', 'ACT_DEFUSION'],
          suggestedReframe: 'I prefer to be at every dinner, but providing for my family requires flexibility. I can be fully present at bedtime.',
          reframeOptions: [
            {
              id: 'ref_p3_opt',
              text: 'I prefer to make every dinner, but working late to provide is also an act of care. I will make our bedtime reading 100% focused.',
              type: 'OPTIMAL',
              score: 95,
              explanation: 'Converts a rigid "should" into a healthy preference and pivots to quality connection.',
              clinicalFeedback: 'Balances realistic career duty with warm, intentional presence.',
            },
            {
              id: 'ref_p3_toxic',
              text: 'Work is all that matters because money buys happiness for the family anyway!',
              type: 'TOXIC_POSITIVITY',
              score: 35,
              explanation: 'Overcompensates with materialism to avoid emotional guilt.',
              clinicalFeedback: 'Avoids addressing the core desire for meaningful family connection.',
            },
            {
              id: 'ref_p3_rat',
              text: 'I might as well give up on being present during the week since my career completely owns my life.',
              type: 'RATIONALIZATION',
              score: 25,
              explanation: 'All-or-nothing defeatism that abandons micro-moments of evening connection.',
              clinicalFeedback: 'Treats binary trade-offs as absolute, ignoring micro-moments of genuine bonding.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_teach_1',
          thought: 'Half the students were restless and talking during my lesson today. I am a terrible teacher and have lost all classroom control.',
          contextDomain: 'TEACHING_EDUCATOR',
          correctDistortion: 'ALL_OR_NOTHING',
          explanation: 'Interpreting a single restless period as total pedagogical incompetence.',
          techniqueOptions: ['STOIC_CONTROL', 'CBT_REALITY_CHECK', 'SOMATIC_COREGULATION'],
          suggestedReframe: 'Student energy fluctuates due to time of day and attention spans. One noisy period is feedback for pacing, not a verdict on my skill.',
          reframeOptions: [
            {
              id: 'ref_t1_opt',
              text: 'Classroom energy fluctuates with weather, time of day, and fatigue. One restless session is diagnostic feedback to adjust pacing, not a referendum on my competence.',
              type: 'OPTIMAL',
              score: 97,
              explanation: 'Separates pedagogical data from personal identity and applies Stoic control.',
              clinicalFeedback: 'Pivots from shame to reflective practitioner mindset.',
            },
            {
              id: 'ref_t1_toxic',
              text: 'It was the best lesson ever, the kids were just expressing their vibrant creative spirits!',
              type: 'TOXIC_POSITIVITY',
              score: 40,
              explanation: 'Ignores actual classroom management needs with romanticized delusion.',
              clinicalFeedback: 'Prevents effective boundary setting and classroom management adjustments.',
            },
            {
              id: 'ref_t1_rat',
              text: 'This generation of students is completely unteachable and there is no point in trying creative lessons.',
              type: 'RATIONALIZATION',
              score: 20,
              explanation: 'Bitter cynicism that relieves the educator from trying.',
              clinicalFeedback: 'Cynical surrender that leads directly to educator burnout.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_teach_2',
          thought: 'It is Sunday 8 PM and I still have 35 essays left to grade. If I don’t finish them all tonight with detailed comments, I am failing my students.',
          contextDomain: 'TEACHING_EDUCATOR',
          correctDistortion: 'SHOULD_STATEMENTS',
          explanation: 'Sacrificing essential sleep and health to meet an unsustainable standard of perfectionism.',
          techniqueOptions: ['REBT_DISPUTE', 'BA_MICRO_ACTION', 'CFT_COMPASSION'],
          suggestedReframe: 'A rested, emotionally patient teacher in the morning benefits students far more than exhaustive midnight grading.',
          reframeOptions: [
            {
              id: 'ref_t2_opt',
              text: 'A rested, emotionally grounded teacher in the morning is more impactful than midnight feedback. I will grade 10 essays focused on key criteria, then sleep.',
              type: 'OPTIMAL',
              score: 96,
              explanation: 'Balances teacher sustainability with student utility.',
              clinicalFeedback: 'Protects circadian health and models healthy boundaries.',
            },
            {
              id: 'ref_t2_toxic',
              text: 'I will just stay up until 3 AM with 4 energy drinks! Sleep is for the weak when students depend on me!',
              type: 'TOXIC_POSITIVITY',
              score: 30,
              explanation: 'Hero/martyr syndrome that guarantees severe burnout.',
              clinicalFeedback: 'Martyrdom leads directly to Monday irritability and morning classroom snap.',
            },
            {
              id: 'ref_t2_rat',
              text: 'Students don’t even read feedback anyway, so I should just give everyone an A and stop grading.',
              type: 'RATIONALIZATION',
              score: 25,
              explanation: 'Defensive dismissiveness that erodes professional pride.',
              clinicalFeedback: 'Devalues your own craft rather than managing workload strategically.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_teach_3',
          thought: 'A parent sent an email saying "We need to talk about my son’s grade." They definitely think I am incompetent and are trying to get me reprimanded.',
          contextDomain: 'TEACHING_EDUCATOR',
          correctDistortion: 'MIND_READING',
          explanation: 'Projecting acute catastrophic intentions onto a neutral, standard communication.',
          techniqueOptions: ['CBT_REALITY_CHECK', 'STOIC_CONTROL', 'ACT_DEFUSION'],
          suggestedReframe: 'Parents inquire because they are anxious about their child. I have clear rubrics and can have a collaborative, professional conversation.',
          reframeOptions: [
            {
              id: 'ref_t3_opt',
              text: 'Parents reach out out of anxiety for their child. I have clear rubrics and objective data. I will approach the call as a collaborative team meeting.',
              type: 'OPTIMAL',
              score: 95,
              explanation: 'Tests the mind-reading assumption and approaches the meeting with professional equanimity.',
              clinicalFeedback: 'Defuses threat-defense alarm and establishes collaborative educator boundaries.',
            },
            {
              id: 'ref_t3_toxic',
              text: 'Every parent interaction is a wonderful joy! I will just agree to change the grade immediately to make everyone smile!',
              type: 'TOXIC_POSITIVITY',
              score: 35,
              explanation: 'People-pleasing that compromises educational integrity.',
              clinicalFeedback: 'Sacrifices professional standards to avoid mild conflict.',
            },
            {
              id: 'ref_t3_rat',
              text: 'Entitled parents always ruin education. I will write a harsh defensive email right now before they attack me.',
              type: 'RATIONALIZATION',
              score: 20,
              explanation: 'Pre-emptive attack driven by defensive fear.',
              clinicalFeedback: 'Escalates conflict unnecessarily before establishing basic facts.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_rel_1',
          thought: 'My partner came home exhausted and barely looked up when I spoke. They must be growing distant and falling out of love with me.',
          contextDomain: 'PARTNERSHIP_INTIMACY',
          correctDistortion: 'MIND_READING',
          explanation: 'Interpreting another adult’s workplace exhaustion as personal emotional rejection.',
          techniqueOptions: ['CBT_REALITY_CHECK', 'CFT_COMPASSION', 'SCHEMA_HEALTHY_ADULT'],
          suggestedReframe: 'Their quietness is depletion from a grueling day, not a lack of love. I can offer a glass of water and space rather than taking it personally.',
          reframeOptions: [
            {
              id: 'ref_r1_opt',
              text: 'Their flat affect is physiological fatigue from a long day, not an indictment of our relationship. I will offer warmth and give them 20 minutes to decompress.',
              type: 'OPTIMAL',
              score: 96,
              explanation: 'Separates fatigue from relational bond and offers low-pressure connection.',
              clinicalFeedback: 'Deeply empathic. Breaks the cycle of demand-withdrawal in relationships.',
            },
            {
              id: 'ref_r1_toxic',
              text: 'True soulmates never feel tired around each other! Everything is perfect in our paradise!',
              type: 'TOXIC_POSITIVITY',
              score: 35,
              explanation: 'Unrealistic fairy-tale standard that breeds dissatisfaction.',
              clinicalFeedback: 'Denies normal human biology and creates artificial pressure.',
            },
            {
              id: 'ref_r1_rat',
              text: 'If they can’t even say hello, I will give them the silent treatment for the rest of the evening.',
              type: 'RATIONALIZATION',
              score: 15,
              explanation: 'Punitive retaliation that accelerates marital estrangement.',
              clinicalFeedback: 'Weaponizes passive-aggressive silence, escalating distance.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_rel_2',
          thought: 'I did the dishes, packed school lunches, and put the kids to bed while my partner sat on the couch. I do EVERYTHING in this house.',
          contextDomain: 'PARTNERSHIP_INTIMACY',
          correctDistortion: 'ALL_OR_NOTHING',
          explanation: 'Using absolute terms ("everything / nothing") that erase the partner’s invisible or daily contributions.',
          techniqueOptions: ['CBT_REALITY_CHECK', 'REBT_DISPUTE', 'CFT_COMPASSION'],
          suggestedReframe: 'I carried a heavy load tonight and feel tired. That doesn’t mean they do nothing. I can make a clear, gentle request for help tomorrow.',
          reframeOptions: [
            {
              id: 'ref_r2_opt',
              text: 'I carried a heavy load tonight and feel depleted. Instead of stewing in silent resentment ("I do everything"), I will clearly and kindly ask for specific help tomorrow.',
              type: 'OPTIMAL',
              score: 97,
              explanation: 'Validates real fatigue while dropping binary blame in favor of assertive communication.',
              clinicalFeedback: 'Replaces passive resentment with constructive, collaborative partnership.',
            },
            {
              id: 'ref_r2_toxic',
              text: 'I love doing all the chores by myself! It’s my secret superpower and I will never complain!',
              type: 'TOXIC_POSITIVITY',
              score: 40,
              explanation: 'Martyr posture that inevitably leads to an explosive blowout.',
              clinicalFeedback: 'Masks burnout with false cheer until emotional exhaustion hits.',
            },
            {
              id: 'ref_r2_rat',
              text: 'My partner is completely useless and I have to accept being a single parent in a marriage.',
              type: 'RATIONALIZATION',
              score: 20,
              explanation: 'Contemptuous schema that permanently poisons marital goodwill.',
              clinicalFeedback: 'Contempt is the #1 predictor of relational decay; traps you in victimhood.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_rest_1',
          thought: 'I took a 45-minute nap on Sunday afternoon while there was laundry to fold. I am so lazy and wasting precious life.',
          contextDomain: 'SELF_RESTORATION',
          correctDistortion: 'ALL_OR_NOTHING',
          explanation: 'Equating essential biological restoration with moral defectiveness or laziness.',
          techniqueOptions: ['CFT_COMPASSION', 'CBT_REALITY_CHECK', 'ACT_DEFUSION'],
          suggestedReframe: 'Rest is not a reward you earn only after total exhaustion; it is biological maintenance required to be a patient father and teacher.',
          reframeOptions: [
            {
              id: 'ref_s1_opt',
              text: 'Rest is not laziness; it is biological maintenance. Resting 45 minutes restores my prefrontal patience so I can show up with warmth for my family.',
              type: 'OPTIMAL',
              score: 98,
              explanation: 'Reframes rest as essential fuel for parental and pedagogical presence.',
              clinicalFeedback: 'Flawless reframe. Dissolves capitalist hustle guilt with biological reality.',
            },
            {
              id: 'ref_s1_toxic',
              text: 'I must never stop moving! High achievers only sleep 4 hours a night and hustle 24/7!',
              type: 'TOXIC_POSITIVITY',
              score: 25,
              explanation: 'Toxic hustle mythology that leads directly to adrenal collapse.',
              clinicalFeedback: 'Glorifies sleep deprivation, accelerating cognitive and somatic breakdown.',
            },
            {
              id: 'ref_s1_rat',
              text: 'Since I took a nap, the whole afternoon is ruined so I might as well scroll on my phone until midnight.',
              type: 'RATIONALIZATION',
              score: 20,
              explanation: 'All-or-nothing spiraling into revenge bedtime procrastination.',
              clinicalFeedback: 'Uses minor deviation as an excuse for reckless avoidance.',
            },
          ],
          isSolved: false,
        },
        // --- FATHERHOOD & PARENTING (Continued) ---
        {
          id: 'thg_parent_4',
          thought: 'My 3-year-old refused all vegetables and threw their plate. If I don’t force them to eat now, they will have horrible nutritional habits and poor health for life.',
          contextDomain: 'FATHERHOOD_PARENTING',
          correctDistortion: 'CATASTROPHIZING',
          explanation: 'Extrapolating a toddler’s normal developmental sensory picky phase into permanent lifelong physical ruin.',
          techniqueOptions: ['STOIC_CONTROL', 'CBT_REALITY_CHECK', 'SOMATIC_COREGULATION'],
          suggestedReframe: 'Toddlers explore autonomy through food. My job is offering nutritious options; their job is deciding how much to eat. One meal does not determine their lifetime health.',
          reframeOptions: [
            {
              id: 'ref_p4_opt',
              text: 'Toddler picky eating is an autonomy developmental milestone. My duty is offering nutritious food calmly; forcing them creates mealtime anxiety. Long-term health is built over years, not one dinner.',
              type: 'OPTIMAL',
              score: 97,
              explanation: 'Applies Division of Responsibility in feeding and Stoic control.',
              clinicalFeedback: 'Masterful perspective. Dissolves mealtime power struggles.',
            },
            {
              id: 'ref_p4_toxic',
              text: 'Vegetables are overrated anyway, nuggets and candy are full of pure childhood joy!',
              type: 'TOXIC_POSITIVITY',
              score: 30,
              explanation: 'Avoids responsible parenting guidance with dismissive cheer.',
              clinicalFeedback: 'Avoids healthy boundary setting.',
            },
            {
              id: 'ref_p4_rat',
              text: 'My child is manipulative and testing me. I must wage a war of attrition at the table to prove who is boss.',
              type: 'RATIONALIZATION',
              score: 15,
              explanation: 'Adversarial power struggle that creates feeding aversions.',
              clinicalFeedback: 'Escalates table battles and increases child autonomic defiance.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_parent_5',
          thought: 'My kids are screaming and wrestling on the living room floor. I cannot take this noise for another second; my household is totally out of control.',
          contextDomain: 'FATHERHOOD_PARENTING',
          correctDistortion: 'ALL_OR_NOTHING',
          explanation: 'Interpreting normal high physical sibling energy as a complete breakdown of domestic order.',
          techniqueOptions: ['SOMATIC_COREGULATION', 'BA_MICRO_ACTION', 'STOIC_CONTROL'],
          suggestedReframe: 'High physical play is natural energy discharge. I will take 2 physiological sighs and redirect them outdoors or to an obstacle course.',
          reframeOptions: [
            {
              id: 'ref_p5_opt',
              text: 'Rough-and-tumble play is natural mammalian development, not domestic collapse. I will breathe deeply, step in with calm energy, and channel their physical drive outside.',
              type: 'OPTIMAL',
              score: 96,
              explanation: 'Applies Somatic Co-Regulation and proactive behavioral redirection.',
              clinicalFeedback: 'Reframes chaotic noise as kinetic energy that just needs an outlet.',
            },
            {
              id: 'ref_p5_toxic',
              text: 'Screaming is the song of angels! I will just sit here smiling while lamps get knocked over!',
              type: 'TOXIC_POSITIVITY',
              score: 35,
              explanation: 'Passive neglect disguised as patience.',
              clinicalFeedback: 'Fails to provide safe physical containment.',
            },
            {
              id: 'ref_p5_rat',
              text: 'I should ban all playing in the living room forever since they can never behave like civilized adults.',
              type: 'RATIONALIZATION',
              score: 20,
              explanation: 'Punitive overreaction expecting adult restraint from young children.',
              clinicalFeedback: 'Imposes unrealistic developmental expectations.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_parent_6',
          thought: 'I saw other dads at the park running effortlessly with their kids while I was sitting exhausted on the bench. I am an inferior, lazy father.',
          contextDomain: 'FATHERHOOD_PARENTING',
          correctDistortion: 'PERSONALIZATION',
          explanation: 'Comparing your internal fatigue to other parents’ external snapshot highlights.',
          techniqueOptions: ['CFT_COMPASSION', 'CBT_REALITY_CHECK', 'ACT_DEFUSION'],
          suggestedReframe: 'I am seeing a 5-minute highlight reel of other families. Being present at the park while honoring my body’s fatigue is dedicated fatherhood.',
          reframeOptions: [
            {
              id: 'ref_p6_opt',
              text: 'Comparing my internal exhaustion to someone else’s 2-minute snapshot is unfair. Bringing my kids to the park and holding space while tired is an act of deep parental love.',
              type: 'OPTIMAL',
              score: 98,
              explanation: 'Disarms social comparison with compassionate reality testing.',
              clinicalFeedback: 'Validates that showing up while tired is genuine heroism.',
            },
            {
              id: 'ref_p6_toxic',
              text: 'I am the greatest dad on Earth and have zero flaws whatsoever!',
              type: 'TOXIC_POSITIVITY',
              score: 35,
              explanation: 'Inflated grandiosity that hides underlying insecurity.',
              clinicalFeedback: 'Bypasses the real need for self-acceptance.',
            },
            {
              id: 'ref_p6_rat',
              text: 'I am just genetically unsuited for parenting and should let my partner handle all outings.',
              type: 'RATIONALIZATION',
              score: 15,
              explanation: 'Ego evasion to escape physical effort.',
              clinicalFeedback: 'Withdraws from family bonding rather than pacing energy.',
            },
          ],
          isSolved: false,
        },

        // --- TEACHING & EDUCATOR (Continued) ---
        {
          id: 'thg_teach_4',
          thought: 'The principal walked in for an unannounced observation during our rowdiest group activity. My annual evaluation is completely ruined.',
          contextDomain: 'TEACHING_EDUCATOR',
          correctDistortion: 'CATASTROPHIZING',
          explanation: 'Assuming an administrator interprets collaborative student noise as pedagogical incompetence.',
          techniqueOptions: ['STOIC_CONTROL', 'CBT_REALITY_CHECK', 'ACT_DEFUSION'],
          suggestedReframe: 'Good administrators know that authentic group learning looks active and loud. My clear rubric and student engagement will speak for themselves.',
          reframeOptions: [
            {
              id: 'ref_t4_opt',
              text: 'Constructivist active learning naturally looks and sounds dynamic. I will welcome the administrator calmly, explain the activity objective, and stay anchored in my lesson plan.',
              type: 'OPTIMAL',
              score: 96,
              explanation: 'Applies Stoic composure and professional pedagogical confidence.',
              clinicalFeedback: 'Demonstrates executive composure under evaluation pressure.',
            },
            {
              id: 'ref_t4_toxic',
              text: 'Observations don’t matter at all! Evaluations are meaningless and I don’t care what anyone thinks!',
              type: 'TOXIC_POSITIVITY',
              score: 30,
              explanation: 'Defensive indifference that rejects professional feedback.',
              clinicalFeedback: 'Masks anxiety with false apathy.',
            },
            {
              id: 'ref_t4_rat',
              text: 'Administration is out to get me. I should freeze the lesson and make students sit in silent rows immediately.',
              type: 'RATIONALIZATION',
              score: 20,
              explanation: 'Reactive panic that disrupts student learning.',
              clinicalFeedback: 'Lets performance anxiety derail sound teaching practice.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_teach_5',
          thought: 'A student muttered a sarcastic insult under their breath when I asked them to open their textbook. They have zero respect for me and the room is laughing.',
          contextDomain: 'TEACHING_EDUCATOR',
          correctDistortion: 'PERSONALIZATION',
          explanation: 'Taking a student’s adolescent posturing or emotional defense as a personal attack on your dignity.',
          techniqueOptions: ['SCHEMA_HEALTHY_ADULT', 'STOIC_CONTROL', 'REBT_DISPUTE'],
          suggestedReframe: 'Adolescent defiance is often a defense mechanism against academic insecurity. I will address it privately with calm neutrality, not a public power struggle.',
          reframeOptions: [
            {
              id: 'ref_t5_opt',
              text: 'A student’s sarcastic remark is an expression of their own stress or peer insecurity, not my worth. I will not engage in a public power struggle; I will speak with them privately with calm boundaries.',
              type: 'OPTIMAL',
              score: 97,
              explanation: 'Maintains adult dignity, avoids power struggles, and protects classroom culture.',
              clinicalFeedback: 'Gold-standard educator response. De-escalates conflict seamlessly.',
            },
            {
              id: 'ref_t5_toxic',
              text: 'They are just joking! Sarcasm is how teenagers show deep love and appreciation!',
              type: 'TOXIC_POSITIVITY',
              score: 35,
              explanation: 'Ignores necessary boundary enforcement.',
              clinicalFeedback: 'Fails to model healthy boundaries for the classroom.',
            },
            {
              id: 'ref_t5_rat',
              text: 'I must humiliate this student in front of the whole class right now to re-establish total dominance.',
              type: 'RATIONALIZATION',
              score: 10,
              explanation: 'Ego tyranny that damages the teacher-student relationship.',
              clinicalFeedback: 'Creates deep resentment and escalates future defiance.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_teach_6',
          thought: 'In the faculty meeting, colleagues presented intricate digital portfolios while I am barely surviving weekly grading. I am a complete imposter.',
          contextDomain: 'TEACHING_EDUCATOR',
          correctDistortion: 'ALL_OR_NOTHING',
          explanation: 'Comparing your daily survival reality with colleagues’ curated professional showcases.',
          techniqueOptions: ['CBT_REALITY_CHECK', 'CFT_COMPASSION', 'BA_MICRO_ACTION'],
          suggestedReframe: 'Every educator has different strengths and stages. My relationship with my students and steady consistency have profound value.',
          reframeOptions: [
            {
              id: 'ref_t6_opt',
              text: 'Every educator has different strengths; aesthetic slide decks do not equal student connection. My warmth, steady consistency, and dedication in the room are what truly impact students.',
              type: 'OPTIMAL',
              score: 98,
              explanation: 'Disarms imposter syndrome by valuing authentic relational teaching.',
              clinicalFeedback: 'Reclaims personal pedagogical integrity.',
            },
            {
              id: 'ref_t6_toxic',
              text: 'I will copy their exact slides and work 90 hours this week to outshine everyone!',
              type: 'TOXIC_POSITIVITY',
              score: 30,
              explanation: 'Competitive overcompensation leading straight to medical burnout.',
              clinicalFeedback: 'Drives exhaustion without improving actual student outcomes.',
            },
            {
              id: 'ref_t6_rat',
              text: 'All other teachers are fake politicians. I will isolate myself in my classroom and stop speaking to faculty.',
              type: 'RATIONALIZATION',
              score: 20,
              explanation: 'Bitter cynicism that isolates you from supportive community.',
              clinicalFeedback: 'Isolates you from peer support.',
            },
          ],
          isSolved: false,
        },

        // --- PARTNERSHIP & MARRIAGE (Continued) ---
        {
          id: 'thg_rel_4',
          thought: 'We disagreed in front of the kids about bedtime rules. We are terrible parents who are confusing our children with mixed signals.',
          contextDomain: 'PARTNERSHIP_INTIMACY',
          correctDistortion: 'CATASTROPHIZING',
          explanation: 'Viewing a minor parenting calibration disagreement as irreversible damage to child psychology.',
          techniqueOptions: ['CFT_COMPASSION', 'CBT_REALITY_CHECK', 'SCHEMA_HEALTHY_ADULT'],
          suggestedReframe: 'Occasional differing perspectives are normal. When we debrief calmly and show unity afterward, we model healthy communication for our children.',
          reframeOptions: [
            {
              id: 'ref_r4_opt',
              text: 'Parents will occasionally differ in the moment. What matters is supporting each other in real-time, debriefing privately later, and showing our kids that loving adults can calibrate respectfully.',
              type: 'OPTIMAL',
              score: 97,
              explanation: 'Reframes minor parenting friction into an opportunity for modeled adult teamwork.',
              clinicalFeedback: 'Promotes marital teamwork and healthy child modeling.',
            },
            {
              id: 'ref_r4_toxic',
              text: 'We never disagree! Our parenting philosophies are 100% identical in every universe!',
              type: 'TOXIC_POSITIVITY',
              score: 35,
              explanation: 'Denies normal human differences.',
              clinicalFeedback: 'Suppresses constructive co-parenting dialogue.',
            },
            {
              id: 'ref_r4_rat',
              text: 'My partner deliberately undermines my authority in front of the kids to make me look like the bad guy.',
              type: 'RATIONALIZATION',
              score: 15,
              explanation: 'Paranoid mind-reading that creates marital hostility.',
              clinicalFeedback: 'Fuels adversarial resentment in marriage.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_rel_5',
          thought: 'I tried to initiate intimacy tonight and my partner said they are too tired. They no longer find me attractive and our romantic life is dead.',
          contextDomain: 'PARTNERSHIP_INTIMACY',
          correctDistortion: 'MIND_READING',
          explanation: 'Conflating physiological bodily exhaustion from childcare/work with personal sexual rejection.',
          techniqueOptions: ['CBT_REALITY_CHECK', 'CFT_COMPASSION', 'STOIC_CONTROL'],
          suggestedReframe: 'Exhaustion after parenting and working is physical, not an absence of desire. I can offer a back massage and cuddle without pressure.',
          reframeOptions: [
            {
              id: 'ref_r5_opt',
              text: 'Physical exhaustion from parenting and work is a biological reality, not a loss of attraction. I will offer a warm hug, cuddle without pressure, and schedule focused time when energy allows.',
              type: 'OPTIMAL',
              score: 98,
              explanation: 'Decouples tiredness from self-worth and preserves relational warmth.',
              clinicalFeedback: 'Prevents the deadly shame-pressure-withdrawal cycle in intimacy.',
            },
            {
              id: 'ref_r5_toxic',
              text: 'Romance is overrated; as long as the mortgage is paid, marriages don’t need closeness!',
              type: 'TOXIC_POSITIVITY',
              score: 30,
              explanation: 'Rationalizes emotional drift to avoid vulnerability.',
              clinicalFeedback: 'Resigns to roommate marriage syndrome.',
            },
            {
              id: 'ref_r5_rat',
              text: 'I will pull away emotionally and withhold affection until they prove they still care about me.',
              type: 'RATIONALIZATION',
              score: 10,
              explanation: 'Punitive withdrawal that damages attachment security.',
              clinicalFeedback: 'Accelerates marital disconnection.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_rel_6',
          thought: 'An unexpected major car repair bill arrived. We will never get ahead financially and I am failing to provide security for our family.',
          contextDomain: 'PARTNERSHIP_INTIMACY',
          correctDistortion: 'CATASTROPHIZING',
          explanation: 'Treating a standard unforeseen life maintenance cost as permanent financial catastrophe.',
          techniqueOptions: ['STOIC_CONTROL', 'CBT_REALITY_CHECK', 'BA_MICRO_ACTION'],
          suggestedReframe: 'Unexpected expenses are an inevitable part of owning assets. We have weathered challenges before; we will review our budget calmly as a team.',
          reframeOptions: [
            {
              id: 'ref_r6_opt',
              text: 'Unexpected expenses are routine bumps in life, not evidence of financial doom or failure. We will review our budget calmly as a team and adjust this month’s discretionary spending.',
              type: 'OPTIMAL',
              score: 96,
              explanation: 'Applies Stoic reality testing and active problem-solving.',
              clinicalFeedback: 'Transforms catastrophic panic into calm marital financial stewardship.',
            },
            {
              id: 'ref_r6_toxic',
              text: 'Money is an illusion! The universe will miraculously drop cash into our bank account tomorrow!',
              type: 'TOXIC_POSITIVITY',
              score: 25,
              explanation: 'Magical thinking that evades financial responsibility.',
              clinicalFeedback: 'Avoids practical budget calibration.',
            },
            {
              id: 'ref_r6_rat',
              text: 'It’s my partner’s fault for driving the car so much. I will complain about this for the next month.',
              type: 'RATIONALIZATION',
              score: 15,
              explanation: 'Blaming partner to discharge personal anxiety.',
              clinicalFeedback: 'Creates marital resentment over unavoidable maintenance.',
            },
          ],
          isSolved: false,
        },

        // --- SELF-RESTORATION & REST (Continued) ---
        {
          id: 'thg_rest_4',
          thought: 'I feel deeply sad and overwhelmed today, but I cannot show any weakness or emotion because a father and teacher must be an unshakable rock.',
          contextDomain: 'SELF_RESTORATION',
          correctDistortion: 'SHOULD_STATEMENTS',
          explanation: 'Believing that suppression of human emotion equals strength, leading to sudden emotional explosion or numbness.',
          techniqueOptions: ['SCHEMA_HEALTHY_ADULT', 'CFT_COMPASSION', 'ACT_DEFUSION'],
          suggestedReframe: 'True strength is acknowledging vulnerability and processing it with dignity. Modeling emotional honesty teaches my children and students how to handle hardship.',
          reframeOptions: [
            {
              id: 'ref_s4_opt',
              text: 'Suppressing emotions does not make me strong; it makes me brittle. Acknowledging my strain, taking a quiet moment of self-care, and modeling authentic resilience is the highest form of leadership.',
              type: 'OPTIMAL',
              score: 98,
              explanation: 'Replaces toxic emotional repression with mature Healthy Adult sovereignty.',
              clinicalFeedback: 'Profoundly restorative. Protects long-term psychological health.',
            },
            {
              id: 'ref_s4_toxic',
              text: 'Men don’t feel sadness! Just bottle everything up and swallow it forever!',
              type: 'TOXIC_POSITIVITY',
              score: 15,
              explanation: 'Toxic emotional suppression that drives psychosomatic illness.',
              clinicalFeedback: 'Directly causes cardiovascular strain and emotional explosion.',
            },
            {
              id: 'ref_s4_rat',
              text: 'Since no one cares how hard my life is, I might as well numb out with alcohol and video games.',
              type: 'RATIONALIZATION',
              score: 15,
              explanation: 'Self-pitying avoidance that avoids constructive support.',
              clinicalFeedback: 'Escapes into destructive numbing behaviors.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_rest_5',
          thought: 'It is Sunday 6 PM and my chest is tight with dread about tomorrow’s school schedule. My entire weekend was wasted and I am already exhausted.',
          contextDomain: 'SELF_RESTORATION',
          correctDistortion: 'EMOTIONAL_REASONING',
          explanation: 'Treating Sunday evening anticipatory anxiety as proof that the entire weekend was futile and tomorrow will be terrible.',
          techniqueOptions: ['ACT_DEFUSION', 'SOMATIC_COREGULATION', 'BA_MICRO_ACTION'],
          suggestedReframe: 'Anticipatory anxiety is just my nervous system shifting gears. Tonight is still my evening; I will take a warm shower and enjoy dinner in the present moment.',
          reframeOptions: [
            {
              id: 'ref_s5_opt',
              text: 'Sunday evening dread is just anticipatory mental noise, not reality. Tonight is still my time. I will do 2 physiological sighs, enjoy dinner with my family, and focus only on the present hour.',
              type: 'OPTIMAL',
              score: 97,
              explanation: 'Defuses anticipatory anxiety and reclaims Sunday evening presence.',
              clinicalFeedback: 'Stops tomorrow’s worries from stealing tonight’s peace.',
            },
            {
              id: 'ref_s5_toxic',
              text: 'Mondays are the greatest days in human history! I am overjoyed to work 12 hours tomorrow!',
              type: 'TOXIC_POSITIVITY',
              score: 30,
              explanation: 'Forced cheer that feels dishonest to the nervous system.',
              clinicalFeedback: 'Invalidates genuine work fatigue.',
            },
            {
              id: 'ref_s5_rat',
              text: 'My career is a prison. I will lie on the floor and doomscroll until 2 AM to avoid tomorrow.',
              type: 'RATIONALIZATION',
              score: 20,
              explanation: 'Revenge bedtime procrastination that sabotages Monday.',
              clinicalFeedback: 'Guarantees the exact exhaustion you fear.',
            },
          ],
          isSolved: false,
        },
        {
          id: 'thg_rest_6',
          thought: 'It is 11:30 PM and I am still scrolling on my phone in bed. I know I will regret this tomorrow, but this is the only time nobody is asking me for something.',
          contextDomain: 'SELF_RESTORATION',
          correctDistortion: 'ALL_OR_NOTHING',
          explanation: 'Sacrificing restorative sleep to claim a counterfeit sense of nocturnal freedom.',
          techniqueOptions: ['BA_MICRO_ACTION', 'CFT_COMPASSION', 'SCHEMA_HEALTHY_ADULT'],
          suggestedReframe: 'My desire for autonomy is valid, but digital scrolling steals the deep rest I need to feel good tomorrow. I will put the phone on the dresser and read 5 minutes in dim light.',
          reframeOptions: [
            {
              id: 'ref_s6_opt',
              text: 'My need for quiet personal time is completely valid, but screen scrolling steals tomorrow’s vitality. I will honor my need for rest by plugging my phone across the room and reading a physical book for 5 minutes.',
              type: 'OPTIMAL',
              score: 98,
              explanation: 'Validates the legitimate need for autonomy while choosing true restorative sleep.',
              clinicalFeedback: 'Directly breaks the revenge bedtime procrastination loop.',
            },
            {
              id: 'ref_s6_toxic',
              text: 'Phone scrolling is pure self-care and I should do it all night long without guilt!',
              type: 'TOXIC_POSITIVITY',
              score: 35,
              explanation: 'Mistaking dopaminergic stimulation for restorative care.',
              clinicalFeedback: 'Reinforces sleep deprivation.',
            },
            {
              id: 'ref_s6_rat',
              text: 'My life has so little freedom that scrolling until 1 AM is my only rebellion against duty.',
              type: 'RATIONALIZATION',
              score: 20,
              explanation: 'Victim mentality that harms your own body.',
              clinicalFeedback: 'Punishes your own nervous system to feel a momentary illusion of rebellion.',
            },
          ],
          isSolved: false,
        },
      ];

      await this.saveThoughtFeed(initial);
      return initial;
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
          subtitle: 'Marcus Aurelius & Cosmic Decentering',
          authorOrTradition: 'Stoic Philosophy',
          readingMinutes: 2,
          category: 'STOICISM',
          contentMarkdown: `When acute stress narrows your vision—a crying child, a pile of ungraded exams, or a sharp comment—your amygdala perceives an immediate existential threat.

The ancient Stoics practiced "The View from Above": closing your eyes and mentally zooming out. Rise above your room, above your city, above the continent, and into the cosmic expanse of time. Zoom forward 10 years: will this specific spilled milk or missed deadline matter?

Decentering shrinks acute catastrophic anxiety to its true proportions, restoring the calm vantage point of reason.`,
          keyTakeaway: 'Zooming out to a cosmic and temporal perspective shrinks catastrophic anxiety instantly.',
          quiz: [
            {
              question: 'When is "The View from Above" most clinically helpful?',
              options: [
                'During acute catastrophic panic, parental overwhelm, or workplace stress',
                'Only when you are asleep',
                'Never in real life',
              ],
              correctIndex: 0,
              explanation: 'It acts as an immediate cognitive defusion tool when acute emotional stress narrows your vision.',
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
          title: 'The Amygdala Hijack & Vagal Brake',
          subtitle: 'Polyvagal Somatics & The Physiological Reset',
          authorOrTradition: 'Clinical Neuroscience',
          readingMinutes: 2,
          category: 'NEUROSCIENCE',
          contentMarkdown: `Before your rational prefrontal cortex can evaluate a situation, your amygdala scans for threats in 12 milliseconds. If triggered, it throttles cognitive control: heart pounding, shallow breathing, and racing anger.

You cannot logic your way out of autonomic panic. You must speak the nervous system’s somatic language first: The Physiological Sigh (two rapid inhales through the nose, one long slow unforced exhale through the mouth).

This simple breath pattern re-engages the Vagal Brake on the sinoatrial node of the heart, slowing heart rate and lowering blood pressure in under 30 seconds.`,
          keyTakeaway: 'Regulate the nervous system somatically before attempting complex cognitive problem-solving.',
          quiz: [
            {
              question: 'Why does pure logical reasoning often fail when you are overwhelmed or furious?',
              options: [
                'Because the amygdala has throttled prefrontal executive resources',
                'Because you are not smart enough',
                'Because all negative thoughts are completely true',
              ],
              correctIndex: 0,
              explanation: 'Sympathetic arousal redirects metabolic brain energy toward fight-or-flight survival circuits.',
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
          contentMarkdown: `Albert Ellis identified "Musterbation"—the irrational belief that life, our children, our students, or ourselves MUST, SHOULD, or OUGHT to conform to our expectations.

When reality clashes with a dogmatic "should", rage, shame, and burnout follow. The antidote is converting demands into flexible preferences:

"I strongly PREFER that my children listen on the first try and that my lesson goes smoothly. But if they don't, it is merely inconvenient and human—not catastrophic."`,
          keyTakeaway: 'Transform dogmatic "musts" and "shoulds" into flexible, realistic preferences.',
          quiz: [
            {
              question: 'What is the psychological consequence of rigid "should" statements?',
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
          subtitle: 'Action Precedes Motivation in Burnout',
          authorOrTradition: 'Behavioral Activation',
          readingMinutes: 2,
          category: 'BEHAVIORAL_ACTIVATION',
          contentMarkdown: `A universal human trap is waiting to "feel like doing it" before starting an uncomfortable duty. Fatigue creates an illusion of impossible inertia.

Behavioral Activation proves that motivation is an emotional byproduct of action, not its prerequisite. By shrinking the task to an absurdly small 30-second kinetic spark (opening 1 book, sitting on the floor with your kids), striatal dopamine is released.

Once momentum begins, cognitive friction drops by over 80%.`,
          keyTakeaway: 'Never wait for motivation. Take a 30-second micro-step to generate dopamine momentum.',
          quiz: [
            {
              question: 'According to Behavioral Activation, what generates genuine motivation?',
              options: [
                'Waiting passively until energy naturally returns',
                'Taking a small physical action that initiates momentum',
                'Feeling guilty about procrastination',
              ],
              correctIndex: 1,
              explanation: 'Action triggers positive reinforcement and striatal dopamine loops that create subsequent motivation.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_kinetic_momentum',
            name: 'Kinetic Momentum',
            category: 'ACTION',
            manaCost: 1,
            baseDamage: 38,
            shieldValue: 12,
            promptText: 'Just 30 seconds of physical action. Momentum will carry the rest.',
            targetDistortionBonus: { distortion: 'ALL_OR_NOTHING', multiplier: 1.6 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_parent_5',
          title: 'The Father’s Co-Regulation Mirror',
          subtitle: 'Polyvagal Co-Regulation in Family Storms',
          authorOrTradition: 'Parenting & Polyvagal Science',
          readingMinutes: 2,
          category: 'PARENTING_COREGULATION',
          contentMarkdown: `Young children do not possess fully myelinated prefrontal cortexes. When dysregulated, they cannot self-soothe with internal logic.

Through mirror neurons and neuroception, a child's nervous system literally "borrows" the autonomic state of the adult in the room. If a father meets a screaming tantrum with clenched jaws and sharp commands, the child’s threat-defense system escalates.

When you drop your shoulders, soften your gaze, lower your vocal pitch, and breathe slowly, your regulated physiology serves as an external nervous system for your child to anchor to.`,
          keyTakeaway: 'You cannot calm a storm by shouting into it. Regulate your own nervous system to let your child borrow your calm.',
          quiz: [
            {
              question: 'How do children primarily absorb emotional regulation during meltdowns?',
              options: [
                'Through long lectures on logic and rules',
                'Through neuroceptive mirroring of the parent’s calm physiological state',
                'By being left in isolation',
              ],
              correctIndex: 1,
              explanation: 'Co-regulation precedes self-regulation in child development.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_coregulation_mirror',
            name: 'Co-Regulation Mirror',
            category: 'COMPASSION',
            manaCost: 1,
            baseDamage: 28,
            shieldValue: 30,
            promptText: 'I am the calm anchor. My child borrows my peace.',
            targetDistortionBonus: { distortion: 'PERSONALIZATION', multiplier: 1.7 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_teach_6',
          title: 'The Educator’s Sovereign Citadel',
          subtitle: 'Stoic Pedagogy & Managing Classroom Chaos',
          authorOrTradition: 'Stoicism for Educators',
          readingMinutes: 2,
          category: 'STOICISM',
          contentMarkdown: `Teaching is an occupation filled with uncontrollable variables: student mood swings, socioeconomic stressors, sudden policy shifts, and administrative burdens.

Epictetus taught that suffering arises not from events, but from demanding that external variables obey our desires. In the classroom, your Sovereign Citadel consists of three things: your preparation, your calm demeanor, and your unwavering fairness.

Everything else—whether a student listens today, how a parent reacts, or what the committee decides—lies outside your citadel. Do your duty with excellence, and release the rest.`,
          keyTakeaway: 'Focus 100% of your energy on your preparation and demeanor; release attachment to uncontrollable student moods.',
          quiz: [
            {
              question: 'What belongs inside the educator’s circle of control?',
              options: [
                'Every student’s home life and emotional mood',
                'Your own emotional stability, clarity of instruction, and fairness',
                'External school district standardized test outcomes',
              ],
              correctIndex: 1,
              explanation: 'Mastery over your own actions and attitude is the foundation of sustainable teaching.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_sovereign_citadel',
            name: 'Sovereign Citadel',
            category: 'FACT_CHECK',
            manaCost: 2,
            baseDamage: 42,
            shieldValue: 25,
            promptText: 'My inner citadel is unshakable. I command my calm and perform my duty.',
            targetDistortionBonus: { distortion: 'MIND_READING', multiplier: 1.7 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_cft_7',
          title: 'The Gentle Inner Dialogue',
          subtitle: 'Paul Gilbert’s Compassion in Overwhelm & Exhaustion',
          authorOrTradition: 'Compassion-Focused Therapy',
          readingMinutes: 2,
          category: 'PARENTING_COREGULATION',
          contentMarkdown: `When exhausted fathers and educators make mistakes, the inner critic attacks: "You are inadequate, you can’t handle this."

Neuroimaging reveals that self-criticism activates the exact same brain areas as physical pain and external hostility (the insula and amygdala). Self-attack paralyzes you with shame, reducing your capacity for warmth.

Compassion-Focused Therapy replaces the harsh inner tyrant with the voice of a wise, deeply kind mentor: "You are carrying a massive load today. It is completely understandable that you feel strained. Take a breath; you are doing your best."`,
          keyTakeaway: 'Self-criticism creates neurological threat; self-compassion releases oxytocin to restore executive resilience.',
          quiz: [
            {
              question: 'What is the biological effect of self-compassion during moments of failure?',
              options: [
                'It leads to laziness and zero ambition',
                'It downregulates cortisol and activates the soothing-safety oxytocin system',
                'It guarantees that you make more mistakes',
              ],
              correctIndex: 1,
              explanation: 'Self-compassion provides psychological safety, which enables faster recovery and constructive problem-solving.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_self_kindness_aegis',
            name: 'Self-Kindness Aegis',
            category: 'COMPASSION',
            manaCost: 1,
            baseDamage: 24,
            shieldValue: 38,
            promptText: 'I meet my exhaustion with kindness. I am a devoted human doing my best.',
            targetDistortionBonus: { distortion: 'EMOTIONAL_REASONING', multiplier: 1.8 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_act_8',
          title: 'Leaves on a Stream',
          subtitle: 'ACT Cognitive Defusion & Unfusing from Thoughts',
          authorOrTradition: 'Acceptance & Commitment Therapy',
          readingMinutes: 2,
          category: 'CBT_REBT',
          contentMarkdown: `When you are fused with a thought ("I am failing at everything"), the thought acts as tinted sunglasses: you cannot see the world except through the lens of failure.

Cognitive defusion is the practice of stepping back and seeing thoughts as passing mental weather rather than literal truth.

Visualize sitting by a gentle, flowing forest stream with autumn leaves floating on the surface. Whenever an anxious thought arises, place it on a leaf and watch it float downstream without arguing with it, clinging to it, or trying to push it away.`,
          keyTakeaway: 'Thoughts are mental events, not facts or commands. Observe them and let them pass like leaves on water.',
          quiz: [
            {
              question: 'What is the goal of cognitive defusion in ACT?',
              options: [
                'To permanently destroy all negative thoughts forever',
                'To change your relationship with thoughts so they no longer control your actions',
                'To obsessively analyze every single thought for hours',
              ],
              correctIndex: 1,
              explanation: 'Defusion creates psychological distance so you can take values-aligned action despite uncomfortable thoughts.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_defusion_current',
            name: 'Defusion Current',
            category: 'FACT_CHECK',
            manaCost: 1,
            baseDamage: 30,
            shieldValue: 22,
            promptText: 'I notice I am having the thought that I am overwhelmed. It is just passing weather.',
            targetDistortionBonus: { distortion: 'ALL_OR_NOTHING', multiplier: 1.5 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_shadow_9',
          title: 'The Disowned Shadow & Family Projections',
          subtitle: 'Carl Jung’s Shadow Integration in Close Relationships',
          authorOrTradition: 'Jungian Depth Psychology',
          readingMinutes: 2,
          category: 'SHADOW_INTEGRATION',
          contentMarkdown: `Carl Jung observed: "Everything that irritates us about others can lead us to an understanding of ourselves."

When a father feels disproportionate rage when his child is messy or lazy, it is often because the father disowned his own need for spontaneous rest in childhood to earn approval. When we disown an impulse, we violently attack it when we see it in our children or partners.

Integrating the shadow means recognizing your own disowned vulnerabilities, removing the projection, and responding to your loved ones with conscious empathy rather than triggered rage.`,
          keyTakeaway: 'Intense irritation toward loved ones is often a mirror of our own repressed childhood shadow.',
          quiz: [
            {
              question: 'According to Jung, what is psychological projection in family life?',
              options: [
                'A movie shown in the living room',
                'Attributing our own disowned impulses or fears onto our children and partners',
                'A flawless assessment of someone else’s character',
              ],
              correctIndex: 1,
              explanation: 'Projection happens when we disown a trait in ourselves and react with disproportionate emotion when others exhibit it.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_shadow_integration',
            name: 'Shadow Integration',
            category: 'COMPASSION',
            manaCost: 2,
            baseDamage: 34,
            shieldValue: 28,
            promptText: 'I withdraw my projection. What irritates me points to a part of me needing healing.',
            targetDistortionBonus: { distortion: 'PERSONALIZATION', multiplier: 1.8 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_frankl_10',
          title: 'The Meaning in the Burden',
          subtitle: 'Viktor Frankl’s Logotherapy for Tired Caregivers',
          authorOrTradition: 'Existential Logotherapy',
          readingMinutes: 2,
          category: 'LOGOTHERAPY',
          contentMarkdown: `Viktor Frankl wrote: "He who has a why to live can bear almost any how."

Caregiving, parenting, and teaching are inherently demanding. When viewed purely as exhausting chores (cleaning dishes, grading stacks of papers, managing tantrums), the soul burns out under perceived meaningless labor.

When reframed through Logotherapy, these exact moments are transformed into sacred acts of devotion: you are shaping young minds, providing shelter, and modeling resilience. The exhaustion is the price of deeply meaningful love.`,
          keyTakeaway: 'Suffering ceases to be suffering the moment it finds a transcendent meaning and purpose.',
          quiz: [
            {
              question: 'How does Logotherapy transform caregiving and teaching fatigue?',
              options: [
                'By denying that fatigue exists',
                'By connecting the daily burden to a deep transcendent purpose and love',
                'By quitting all responsibilities',
              ],
              correctIndex: 1,
              explanation: 'When daily duties are anchored in deep personal values, stamina and fulfillment replace burnout.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_will_to_meaning',
            name: 'Will to Meaning',
            category: 'ACTION',
            manaCost: 2,
            baseDamage: 45,
            shieldValue: 20,
            promptText: 'This burden is my honor. I pour my energy into the lives of those I love.',
            targetDistortionBonus: { distortion: 'SHOULD_STATEMENTS', multiplier: 1.9 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_sleep_11',
          title: 'The 90-Minute Ultradian Rhythm',
          subtitle: 'Circadian Biology & Stimulus Control',
          authorOrTradition: 'Circadian Sleep Medicine',
          readingMinutes: 2,
          category: 'CIRCADIAN_SLEEP',
          contentMarkdown: `Human sleep operates in ultradian cycles of ~90 minutes. Sleep drive builds through adenosine accumulation during wakefulness.

When you lie awake tossing and turning for over 20 minutes, your brain forms a conditioned pavlovian association: "Bed = Frustration & Worry."

Stimulus control breaks this loop: if awake after 20 minutes, leave the bed, sit in dim light with a physical book, and return ONLY when the next wave of adenosine sleepiness arrives.`,
          keyTakeaway: 'Break the conditioned bed-anxiety loop by getting up after 20 minutes of wakefulness.',
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
        {
          id: 'scr_circadian_12',
          title: 'The Cortisol Awakening Reset',
          subtitle: 'Morning Sunlight & Circadian Photobiology',
          authorOrTradition: 'Photobiology & Neurobiology',
          readingMinutes: 2,
          category: 'CIRCADIAN_SLEEP',
          contentMarkdown: `Your master circadian clock (the Suprachiasmatic Nucleus in the hypothalamus) synchronizes all metabolic and cognitive functions.

Getting 10–15 minutes of outdoor sunlight within 45 minutes of waking stimulates intrinsically photosensitive Retinal Ganglion Cells (ipRGCs). This triggers a healthy morning cortisol awakening surge for daytime focus, and starts a biological countdown timer for nighttime melatonin release 14–16 hours later.`,
          keyTakeaway: 'Early morning sunlight anchors daytime focus and sets the circadian timer for deep evening sleep.',
          quiz: [
            {
              question: 'What is the primary benefit of viewing morning sunlight within 45 minutes of waking?',
              options: [
                'It sets the master circadian clock for daytime alertness and evening melatonin timing',
                'It cures all illnesses permanently',
                'It replaces the need to eat food',
              ],
              correctIndex: 0,
              explanation: 'Morning photic stimulation anchors the master circadian rhythm and optimizes cortisol/melatonin phasing.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_dawn_light_anchor',
            name: 'Dawn Light Anchor',
            category: 'ACTION',
            manaCost: 1,
            baseDamage: 32,
            shieldValue: 20,
            promptText: 'Morning light anchors my circadian clock. I align my energy with the sun.',
            targetDistortionBonus: { distortion: 'ALL_OR_NOTHING', multiplier: 1.5 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_rupture_13',
          title: 'The Rupture and Repair Principle',
          subtitle: 'Building Secure Attachment in Imperfect Parenting',
          authorOrTradition: 'Developmental Attachment Theory (Dr. Ed Tronick)',
          readingMinutes: 2,
          category: 'PARENTING_COREGULATION',
          contentMarkdown: `Dr. Edward Tronick's landmark attachment research revealed that even the most securely attached parents are out of sync with their children up to 70% of the time.

What creates deep psychological security is not perfection—it is the consistency and humility of the **REPAIR**. When a father loses his temper or misinterprets a child, coming back with a humble, heartfelt apology ("I was frustrated earlier and spoke too loudly. It was not your fault. I love you") teaches the child that relationships survive conflict and that love is unbreakable.`,
          keyTakeaway: 'Secure attachment is forged in the humility of repair, not in the illusion of perfect parenting.',
          quiz: [
            {
              question: 'According to developmental attachment science, what builds true resilience and security in children?',
              options: [
                'Never making a mistake or showing any emotion',
                'Humble, consistent rupture repair after moments of disconnect or conflict',
                'Strict punishment for any display of tears',
              ],
              correctIndex: 1,
              explanation: 'Repairing ruptures teaches children that relationships can withstand distress and restores autonomic safety.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_attachment_repair',
            name: 'Attachment Repair',
            category: 'COMPASSION',
            manaCost: 1,
            baseDamage: 30,
            shieldValue: 25,
            promptText: 'I repair with humility and love. Our connection is stronger than any momentary storm.',
            targetDistortionBonus: { distortion: 'CATASTROPHIZING', multiplier: 1.7 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_compassion_fatigue_14',
          title: 'The Shield Against Compassion Fatigue',
          subtitle: 'Sustainable Empathy for Educators and Caregivers',
          authorOrTradition: 'Educator Traumatology (Dr. Charles Figley)',
          readingMinutes: 2,
          category: 'PARENTING_COREGULATION',
          contentMarkdown: `Teachers and devoted fathers often suffer from secondary traumatic stress or 'compassion fatigue'—the biological exhaustion caused by absorbing the emotional pain, chaos, and needs of students and family without replenishment.

To maintain sustainable empathy, you must distinguish between **Empathic Distress** (feeling overwhelmed and drowning in another's suffering) and **Compassionate Presence** (standing firmly on the riverbank holding out a steady hand). Your calm stability is the greatest gift you offer.`,
          keyTakeaway: 'Stand on the riverbank with open compassion; do not jump into the rapids of secondary panic.',
          quiz: [
            {
              question: 'What is the crucial difference between empathic distress and compassionate presence?',
              options: [
                'Compassionate presence maintains an anchored, grounded boundary while offering warmth and support',
                'Empathic distress is the only way to prove you care',
                'There is no difference; caring always destroys your physical health',
              ],
              correctIndex: 0,
              explanation: 'Grounded presence prevents caregiver burnout and models true psychological stability.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_empathic_boundary',
            name: 'Empathic Boundary',
            category: 'REFRAME',
            manaCost: 2,
            baseDamage: 38,
            shieldValue: 30,
            promptText: 'I hold space with warmth and firm boundaries. My peace is an anchor for others.',
            targetDistortionBonus: { distortion: 'EMOTIONAL_REASONING', multiplier: 1.8 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_gottman_15',
          title: 'The 5:1 Magic Ratio in Marriage',
          subtitle: 'Disarming Relational Decay and The Four Horsemen',
          authorOrTradition: 'Gottman Institute Couples Science (Dr. John & Julie Gottman)',
          readingMinutes: 2,
          category: 'PARENTING_COREGULATION',
          contentMarkdown: `Over 40 years of empirical research by Dr. John Gottman demonstrated that stable, thriving marriages maintain a ratio of at least **5 positive interactions for every 1 negative interaction** during moments of conflict (and 20:1 during everyday peace).

The four predictors of divorce (The Four Horsemen) are:
1. **Criticism:** Attacking character rather than behavior.
2. **Defensiveness:** Making excuses or counter-attacking.
3. **Contempt:** Sneering, sarcasm, eye-rolling (the #1 predictor of decay).
4. **Stonewalling:** Physiological shutdown and withdrawal.

The antidote: Softened startup, taking responsibility, daily micro-appreciation, and somatic self-soothing.`,
          keyTakeaway: 'Deposit daily micro-appreciations into your marital bank account to withstand inevitable conflict.',
          quiz: [
            {
              question: 'What is the empirical positive-to-negative interaction ratio required for relationship stability during conflict?',
              options: [
                '1:1',
                '5:1',
                '100:1',
              ],
              correctIndex: 1,
              explanation: 'The Gottman 5:1 ratio buffers relationships and protects goodwill during difficult conversations.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_magic_ratio',
            name: 'Magic Ratio Aegis',
            category: 'COMPASSION',
            manaCost: 1,
            baseDamage: 26,
            shieldValue: 36,
            promptText: 'I choose appreciation over contempt. I build up our emotional bank account with kindness.',
            targetDistortionBonus: { distortion: 'MIND_READING', multiplier: 1.7 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_nvc_16',
          title: 'The Non-Violent Communication Matrix',
          subtitle: 'Expressing Needs Without Blame or Demands',
          authorOrTradition: 'Non-Violent Communication (Dr. Marshall Rosenberg)',
          readingMinutes: 2,
          category: 'CBT_REBT',
          contentMarkdown: `When exhausted, human communication often defaults to blame and demands: "You never help!" or "You must obey me right now!" This immediately triggers the listener's defensive fight-or-flight circuits.

NVC provides a 4-step algorithm that connects directly with heart and reason:
1. **Observation (Fact):** "When I see the dishes in the sink after a 9-hour teaching day..."
2. **Feeling (Somatic state):** "I feel deeply exhausted and overwhelmed..."
3. **Need (Universal value):** "Because I need shared teamwork and rest tonight..."
4. **Request (Concrete & actionable):** "Would you be willing to wash these while I put the kids to bed?"`,
          keyTakeaway: 'State clear observable facts, somatic feelings, underlying needs, and actionable requests.',
          quiz: [
            {
              question: 'Which of the following is a clean NVC observation free of evaluation or blame?',
              options: [
                '"You are always lazy and ignoring me."',
                '"When the toys were left across the hallway at 9 PM..."',
                '"You deliberately tried to make me trip."',
              ],
              correctIndex: 1,
              explanation: 'A clean observation describes sensory facts that a video camera could capture, without moral judgment.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_nvc_request',
            name: 'Compassionate Request',
            category: 'FACT_CHECK',
            manaCost: 2,
            baseDamage: 44,
            shieldValue: 18,
            promptText: 'I state my needs with clear facts and warmth. I invite cooperation without coercion.',
            targetDistortionBonus: { distortion: 'SHOULD_STATEMENTS', multiplier: 1.8 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_window_tolerance_17',
          title: 'The Window of Tolerance',
          subtitle: 'Navigating Hyperarousal and Hypoarousal in Family Storms',
          authorOrTradition: 'Interpersonal Neurobiology (Dr. Dan Siegel & Pat Ogden)',
          readingMinutes: 2,
          category: 'PARENTING_COREGULATION',
          contentMarkdown: `The Window of Tolerance describes the optimal autonomic arousal zone in which you can process information, connect with empathy, and respond with executive wisdom.

When life pushes you **above the window (Hyperarousal)**, sympathetic fight-or-flight spikes: you feel sudden rage, racing heartbeat, or the urge to scream. When pushed **below the window (Hypoarousal)**, dorsal vagal shutdown takes over: you feel emotionally numb, disconnected, and exhausted.

Learning your body's early warning signs (tight jaw, shallow breathing) allows you to use somatic interventions (cold water, physiological sighs) *before* snapping at your children or students.`,
          keyTakeaway: 'Monitor your nervous system zone; regulate physiology before attempting cognitive reasoning.',
          quiz: [
            {
              question: 'What characterizes the hyperarousal state above the Window of Tolerance?',
              options: [
                'Emotional numbness, dissociation, and heavy lethargy',
                'Sympathetic spikes: racing heart, sudden irritability, and defensive urges to yell',
                'Deep calm, philosophical clarity, and relaxed muscles',
              ],
              correctIndex: 1,
              explanation: 'Hyperarousal represents sympathetic fight-or-flight activation requiring immediate somatic down-regulation.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_tolerance_anchor',
            name: 'Tolerance Anchor',
            category: 'COMPASSION',
            manaCost: 1,
            baseDamage: 32,
            shieldValue: 28,
            promptText: 'I sense my autonomic state. I anchor my nervous system in the zone of safety.',
            targetDistortionBonus: { distortion: 'EMOTIONAL_REASONING', multiplier: 1.7 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_pygmalion_18',
          title: 'The Pygmalion Effect in Education',
          subtitle: 'How Teacher Expectations Shape Student Neurological Potential',
          authorOrTradition: 'Educational Psychology (Dr. Robert Rosenthal)',
          readingMinutes: 2,
          category: 'CBT_REBT',
          contentMarkdown: `Dr. Robert Rosenthal's Harvard experiments proved that teacher expectations act as unconscious self-fulfilling prophecies. When teachers were led to believe random students had high academic potential, those students demonstrated statistically significant IQ and performance gains over the school year.

Students constantly read subtle micro-cues: vocal tone, wait-time when answering questions, and body language. When a teacher or father holds an unwavering belief in a child's dignity and growth capacity, it creates a neurological canopy of psychological safety that allows the child to flourish.`,
          keyTakeaway: 'Your belief in a student or child is an active catalyst for their developmental blossoming.',
          quiz: [
            {
              question: 'How do high teacher and parental expectations positively influence student performance?',
              options: [
                'By communicating unconscious warmth, patience, and encouraging cues that build neurological confidence',
                'By enforcing harsh punishments whenever errors occur',
                'Expectations have zero measurable effect on human learning',
              ],
              correctIndex: 0,
              explanation: 'Warm, positive expectancies provide the emotional safety required for neuroplastic learning and risk-taking.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_pygmalion_catalyst',
            name: 'Pygmalion Catalyst',
            category: 'FACT_CHECK',
            manaCost: 2,
            baseDamage: 45,
            shieldValue: 20,
            promptText: 'I see your potential and dignity. My belief calls forth your highest capability.',
            targetDistortionBonus: { distortion: 'ALL_OR_NOTHING', multiplier: 1.8 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_zpd_scaffold_19',
          title: 'Scaffolding the Zone of Proximal Development',
          subtitle: 'Fostering Autonomy Without Overwhelm in Children & Students',
          authorOrTradition: 'Constructivist Psychology (Lev Vygotsky & Jerome Bruner)',
          readingMinutes: 2,
          category: 'PARENTING_COREGULATION',
          contentMarkdown: `Lev Vygotsky defined the **Zone of Proximal Development (ZPD)** as the sweet spot between what a learner can do independently and what they cannot do even with assistance.

If a task is too easy, children experience boredom; if too hard, they experience dysregulated panic. The role of the father and teacher is **Scaffolding**: providing temporary structural supports (breaking steps down, modeling the first move, offering supportive presence) and systematically removing the support as the child achieves mastery.`,
          keyTakeaway: 'Support the struggle with scaffolding; do not rob children of the victory of independent mastery.',
          quiz: [
            {
              question: 'What is the purpose of pedagogical scaffolding in parenting and teaching?',
              options: [
                'Doing the entire assignment for the child so they never make a mistake',
                'Providing temporary supportive structures that are gradually removed as competence develops',
                'Leaving the child completely alone with zero guidance on complex tasks',
              ],
              correctIndex: 1,
              explanation: 'Scaffolding bridges the gap between current ability and emerging potential.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_scaffold_aegis',
            name: 'Scaffold Aegis',
            category: 'REFRAME',
            manaCost: 1,
            baseDamage: 28,
            shieldValue: 34,
            promptText: 'I build the scaffold of support. I celebrate the emergence of independent strength.',
            targetDistortionBonus: { distortion: 'CATASTROPHIZING', multiplier: 1.6 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_four_tendencies_20',
          title: 'The Four Tendencies Motivation Matrix',
          subtitle: 'Decoding Inner & Outer Accountability in Yourself and Others',
          authorOrTradition: 'Behavioral Science (Gretchen Rubin)',
          readingMinutes: 2,
          category: 'CBT_REBT',
          contentMarkdown: `Every human responds differently to inner expectations (personal vows, self-improvement) and outer expectations (work deadlines, parental requests):

1. **Upholders:** Readily meet both outer and inner expectations without needing reminders.
2. **Questioners:** Only meet expectations if they make logical sense; they resist arbitrary rules.
3. **Obligers:** Readily meet outer expectations for others, but struggle to meet self-imposed promises (needs external accountability).
4. **Rebels:** Resist both outer and inner rules; motivated strictly by authentic identity and choice ("I choose to because this is who I am").

Understanding your tendency—and your partner's or student's—ends frustrating arguments over motivation.`,
          keyTakeaway: 'Align the motivation strategy with the person’s accountability style rather than demanding they change.',
          quiz: [
            {
              question: 'What is the most effective strategy to help an "Obliger" follow through on personal health or rest habits?',
              options: [
                'Tell them to rely solely on willpower',
                'Create positive external accountability structures (e.g. workout partner, coach, or check-in system)',
                'Shame them for lacking internal discipline',
              ],
              correctIndex: 1,
              explanation: 'Obligers require external accountability structures to protect their personal commitments.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_accountability_matrix',
            name: 'Accountability Matrix',
            category: 'FACT_CHECK',
            manaCost: 1,
            baseDamage: 35,
            shieldValue: 22,
            promptText: 'I understand the architecture of human motivation. I design systems that honor human nature.',
            targetDistortionBonus: { distortion: 'SHOULD_STATEMENTS', multiplier: 1.7 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_positivity_resonance_21',
          title: 'Positivity Resonance & Micro-Connections',
          subtitle: 'The Biology of Love and Vagal Tone in Everyday Family Life',
          authorOrTradition: 'Positive Neurobiology (Dr. Barbara Fredrickson)',
          readingMinutes: 2,
          category: 'PARENTING_COREGULATION',
          contentMarkdown: `Dr. Barbara Fredrickson demonstrated that love is not a static romantic ideal; biologically, love is **Positivity Resonance**—a transient micro-moment of shared positive emotion, bio-behavioral synchrony, and mutual care.

During a 5-second moment of genuine eye contact and shared laughter with your child or partner:
- Oxytocin surges in both brains simultaneously.
- Heart rate variability synchronizes.
- The vagus nerve strengthens, elevating cardiovascular resilience.

Accumulating dozens of these 5-second micro-connections throughout a chaotic day buffers family health more than grand once-a-year vacations.`,
          keyTakeaway: 'Love is a biological micro-moment of connection. Sprinkle micro-moments throughout your everyday routine.',
          quiz: [
            {
              question: 'According to neurobiological research, what physiological event occurs during micro-moments of positivity resonance?',
              options: [
                'Immediate surge in stress hormones and cortisol',
                'Simultaneous oxytocin release, synchronized heart variability, and vagal tone strengthening',
                'No measurable physiological change occurs',
              ],
              correctIndex: 1,
              explanation: 'Micro-connections create real-time bio-behavioral synchrony that fortifies somatic health.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_resonance_pulse',
            name: 'Resonance Pulse',
            category: 'COMPASSION',
            manaCost: 1,
            baseDamage: 25,
            shieldValue: 40,
            promptText: 'In this micro-moment, I connect with presence. Our shared warmth heals the nervous system.',
            targetDistortionBonus: { distortion: 'PERSONALIZATION', multiplier: 1.8 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_stoic_archer_22',
          title: 'The Archer’s Arrow in Family & Classroom',
          subtitle: 'Stoic Duty and Total Outcome Detachment',
          authorOrTradition: 'Classical Stoic Philosophy (Musonius Rufus & Epictetus)',
          readingMinutes: 2,
          category: 'STOICISM',
          contentMarkdown: `The Stoic philosopher Antipater used the metaphor of the Archer to explain how to live with profound peace:

The Archer selects the straightest arrow, oils the bow, draws the string with precise muscular focus, and aligns the crosshair. Up until the instant of release, everything is under his sovereign control (Effort).

The moment the arrow leaves the bow, the Archer is at peace. A sudden gust of wind, a leaping deer, or an unexpected shield may deflect the arrow. The true Stoic father and educator finds 100% of his honor in how cleanly he released the arrow, not in whether external circumstances produced the target hit.`,
          keyTakeaway: 'Your duty is the flawless release of the arrow (effort, virtue, love); release anxiety over where it lands.',
          quiz: [
            {
              question: 'In the Stoic archer metaphor, where does the father or educator find true honor and peace?',
              options: [
                'Only when the arrow hits the bullseye 100% of the time without exception',
                'In the virtuous, dedicated effort of drawing and releasing the bow cleanly, regardless of external wind or outcomes',
                'By blaming the bow whenever things go wrong',
              ],
              correctIndex: 1,
              explanation: 'Stoic virtue resides entirely in your intent and effort, completely unhooked from uncontrollable external outcomes.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_archers_virtue',
            name: 'Archer’s Virtue',
            category: 'REFRAME',
            manaCost: 2,
            baseDamage: 48,
            shieldValue: 15,
            promptText: 'I loose the arrow of effort with noble focus. I remain unshakeable whatever the wind brings.',
            targetDistortionBonus: { distortion: 'PERSONALIZATION', multiplier: 1.9 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_polyvagal_ladder_23',
          title: 'The Autonomic Nervous System Ladder',
          subtitle: 'Ventral Vagal Safety, Sympathetic Fight/Flight & Dorsal Vagal Shutdown',
          authorOrTradition: 'Polyvagal Somatics (Dr. Stephen Porges & Deb Dana)',
          readingMinutes: 2,
          category: 'NEUROSCIENCE',
          contentMarkdown: `Deb Dana conceptualized the human autonomic nervous system as a 3-rung biological ladder:

1. **Top Rung: Ventral Vagal (Safe & Social):** Heart rate is calm, eye contact is warm, the prefrontal cortex is online. You can learn, parent, teach, and listen.
2. **Middle Rung: Sympathetic (Fight or Flight):** Senses narrow, heart races, urgency and frustration dominate.
3. **Bottom Rung: Dorsal Vagal (Freeze & Collapse):** Energy plummets into heavy despair, hopeless "I can't", and emotional numbness.

Crucial somatic law: You cannot jump straight from dorsal freeze to ventral joy. You must gently mobilize through mild physical movement (walking, stretching) to reach safety.`,
          keyTakeaway: 'Identify which rung of the ladder you and your family are standing on before communicating.',
          quiz: [
            {
              question: 'What is the biological rule for climbing out of a dorsal vagal "freeze" or emotional shutdown state?',
              options: [
                'Demand that the person instantly smile and perform complex intellectual work',
                'Engage in gentle physical mobilization (mild movement, walking, stretching) to safely climb through sympathetic arousal back to ventral safety',
                'Shout loudly to shock the nervous system',
              ],
              correctIndex: 1,
              explanation: 'Movement unlocks dorsal immobilization, transitioning physiology back toward safe connection.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_ventral_ladder',
            name: 'Ventral Ladder',
            category: 'COMPASSION',
            manaCost: 2,
            baseDamage: 36,
            shieldValue: 36,
            promptText: 'I climb the ladder of safety step by step. My body finds its way back to connection.',
            targetDistortionBonus: { distortion: 'ALL_OR_NOTHING', multiplier: 1.7 },
          },
          isCompleted: false,
        },
        {
          id: 'scr_socratic_elenchus_24',
          title: 'Socratic Elenchus in Modern Cognitive Restructuring',
          subtitle: 'Questioning Automatic Thoughts Without Intellectual Violence',
          authorOrTradition: 'Classical Philosophy & CBT (Socrates & Dr. Aaron Beck)',
          readingMinutes: 2,
          category: 'CBT_REBT',
          contentMarkdown: `Socrates revolutionized human understanding with *Elenchus*—a form of cooperative, cross-examining inquiry that reveals hidden inconsistencies in rigid dogmas.

In modern cognitive restructuring, we never attack a catastrophic thought with aggressive denial ("That's stupid!"). Instead, we apply gentle, surgical Socratic questions:
1. **Evidence Check:** "What concrete facts support this thought, and what facts contradict it?"
2. **Alternative View:** "If a loving friend were in this exact situation, what would I tell them?"
3. **Worst-Case & Coping:** "If the worst happened, what concrete actions would I take to survive and adapt?"
4. **Utility:** "Does holding onto this thought help me protect what I love today?"`,
          keyTakeaway: 'Cross-examine automatic distortions with loving, surgical inquiry rather than bitter self-criticism.',
          quiz: [
            {
              question: 'Why is gentle Socratic inquiry more therapeutically effective than harsh intellectual self-criticism?',
              options: [
                'Because it non-defensively unpacks cognitive errors and opens up psychological flexibility',
                'Because thoughts should never be examined under any circumstances',
                'Because it proves that all logic is useless',
              ],
              correctIndex: 0,
              explanation: 'Socratic questioning bypasses ego defensiveness and illuminates objective reality.',
            },
          ],
          unlockedCardReward: {
            id: 'crd_socratic_blade',
            name: 'Socratic Blade',
            category: 'FACT_CHECK',
            manaCost: 1,
            baseDamage: 40,
            shieldValue: 15,
            promptText: 'I question every assumption with gentle reason. Truth is my unshakeable armor.',
            targetDistortionBonus: { distortion: 'MIND_READING', multiplier: 1.8 },
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
