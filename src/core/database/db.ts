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

// Seed content lives in dedicated content modules (Phase 3 split).
// Imported for internal seed fallbacks and re-exported for backwards
// compatibility with existing external imports.
import {
  INITIAL_COMBAT_DECK,
  INITIAL_USER_STATE,
  INITIAL_QUESTS,
  INITIAL_TASKS,
  INITIAL_THOUGHT_FEED,
} from '../../content';
import { INITIAL_SCROLLS_RICH } from '../../content/wisdomScrollsRich';
import { SCROLLS_WAVE3 } from '../../content/wisdomScrollsWave3';
import { SCROLLS_WAVE4A } from '../../content/wisdomScrollsWave4a';
import { SHADOW_DEEP_DIVES } from '../../content/shadowDeepDives';

/**
 * Canonical bundled scroll seed: FULL library — base 24 with wave-4a depth
 * replacements (4a entries win by id over the thin rich versions), plus the
 * role-deep wave-3 scrolls.
 */
const INITIAL_SCROLLS = [
  ...INITIAL_SCROLLS_RICH.filter(
    (r) => !SCROLLS_WAVE4A.some((w) => w.id === r.id)
  ),
  ...SCROLLS_WAVE4A,
  ...SCROLLS_WAVE3,
];

export {
  INITIAL_COMBAT_DECK,
  INITIAL_USER_STATE,
  INITIAL_QUESTS,
  INITIAL_TASKS,
  INITIAL_THOUGHT_FEED,
};
export { INITIAL_SCROLLS_RICH } from '../../content/wisdomScrollsRich';

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
      await this.saveThoughtFeed(INITIAL_THOUGHT_FEED);
      return INITIAL_THOUGHT_FEED;
    } catch (e) {
      return INITIAL_THOUGHT_FEED;
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
        const scrolls: WisdomScroll[] = JSON.parse(data);
        // One-time migration: early installs were seeded with thin scroll
        // content (no Level-2 expansions, routines, or recall challenges).
        // Upgrade them to the bundled rich set while preserving progress.
        return this.migrateThinScrollsIfNeeded(scrolls);
      }
      await AsyncStorage.setItem(STORAGE_KEYS.ACADEMY_SCROLLS, JSON.stringify(INITIAL_SCROLLS));
      return INITIAL_SCROLLS;
    } catch (e) {
      return INITIAL_SCROLLS;
    }
  }

  /**
   * Replaces stale thin scroll records with the bundled rich versions
   * (Level 2, routines, recall challenges) when the stored copy is missing
   * that content. User progress fields are carried over untouched.
   */
  private async migrateThinScrollsIfNeeded(stored: WisdomScroll[]): Promise<WisdomScroll[]> {
    const richById = new Map(INITIAL_SCROLLS.map((r) => [r.id, r]));
    // Stale = an old thin record missing its Level-2 expansion, or the whole
    // wave-3 role-deep set absent (pre-expansion install).
    const needsMigration =
      stored.some((s) => {
        const rich = richById.get(s.id);
        return !s.level2Expansion && !!rich?.level2Expansion;
      }) || stored.length < INITIAL_SCROLLS.length;

    if (!needsMigration) {
      return stored;
    }

    console.log('[Database] Migrating academy scrolls to full content library');
    // Keep progress for scrolls we know; append brand-new scrolls untouched.
    const migrated: WisdomScroll[] = [];
    const seen = new Set<string>();
    for (const s of stored) {
      const rich = richById.get(s.id);
      seen.add(s.id);
      if (!rich || s.level2Expansion) {
        migrated.push(s);
        continue;
      }
      migrated.push({
        ...rich,
        isCompleted: !!s.isCompleted,
        completedAt: s.completedAt,
        isLevel2Unlocked: !!s.isLevel2Unlocked || !!s.isCompleted,
        isLevel2Completed: !!s.isLevel2Completed,
        memoryLevel: Math.max(rich.memoryLevel ?? 0, s.memoryLevel ?? 0),
      });
    }
    for (const r of INITIAL_SCROLLS) {
      if (!seen.has(r.id)) migrated.push(r);
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACADEMY_SCROLLS, JSON.stringify(migrated));
    } catch (e) {
      console.warn('[Database] Failed to persist scroll migration', e);
    }
    return migrated;
  }

  async completeWisdomScroll(scrollId: string): Promise<void> {
    try {
      const scrolls = await this.getWisdomScrolls();
      const target = scrolls.find((s) => s.id === scrollId);
      if (!target) return;

      target.isCompleted = true;
      target.completedAt = new Date().toISOString();
      target.isLevel2Unlocked = true;
      target.memoryLevel = 1;
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

  async completeLevel2Scroll(scrollId: string): Promise<void> {
    try {
      const scrolls = await this.getWisdomScrolls();
      const target = scrolls.find((s) => s.id === scrollId);
      if (!target || !target.level2Expansion) return;

      target.isLevel2Completed = true;
      target.memoryLevel = Math.max(target.memoryLevel || 1, 2);
      await AsyncStorage.setItem(STORAGE_KEYS.ACADEMY_SCROLLS, JSON.stringify(scrolls));

      const userState = await this.getUserState();
      const relic = target.level2Expansion.unlockedMasteryRelic;
      const updatedRelics = relic
        ? [...userState.equippedRelics.filter((r) => r && r.id !== relic.id), relic]
        : userState.equippedRelics;

      const updatedState: UserState = {
        ...userState,
        equippedRelics: updatedRelics,
        vitalityPoints: userState.vitalityPoints + 100,
        clarityMana: userState.clarityMana + 3,
      };
      await this.saveUserState(updatedState);
    } catch (e) {
      console.error('Failed to complete Level 2 scroll', e);
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
        const saved: ShadowDossier[] = JSON.parse(data);
        // Merge deep-dive expansions (added post-launch) into persisted dossiers
        return saved.map((d) => ({
          ...d,
          deepDive: SHADOW_DEEP_DIVES[d.id] || d.deepDive,
        }));
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

      // Attach rich deep-dive expansions from the content module
      const enriched = initial.map((d) => ({
        ...d,
        deepDive: SHADOW_DEEP_DIVES[d.id],
      }));

      await AsyncStorage.setItem(STORAGE_KEYS.SHADOW_CRUCIBLE, JSON.stringify(enriched));
      return enriched;
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
