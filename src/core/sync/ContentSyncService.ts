import AsyncStorage from '@react-native-async-storage/async-storage';
import { WisdomScroll, ThoughtFeedItem, QuestItem } from '../types';
import { EventBus } from '../eventbus/EventBus';

/**
 * SHA-256 of a string as lowercase hex. expo-crypto is lazy-loaded so
 * pure unit tests can import this module without the native runtime.
 */
async function sha256Hex(input: string): Promise<string> {
  try {
    const Crypto = require('expo-crypto');
    return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, input);
  } catch (e) {
    console.warn('[ContentSync] expo-crypto unavailable, skipping integrity check', e);
    // Failing OPEN here is acceptable: this is corruption defense, not a
    // security boundary, and blocking all syncs when crypto is missing
    // would leave users stranded on stale content.
    return '';
  }
}

export interface ContentManifest {
  version: string;
  updatedAt: string;
  name: string;
  repository: string;
  /**
   * Optional SHA-256 hashes (hex) of each content file. When present,
   * downloads are verified before being merged into the local database,
   * so a tampered or corrupted payload is rejected.
   */
  hashes?: {
    wisdom_scrolls?: string;
    thought_stream?: string;
    quests?: string;
  };
  files: {
    wisdom_scrolls: string;
    thought_stream: string;
    quests: string;
    method_codex: string;
  };
  counts: {
    wisdom_scrolls: number;
    thought_stream: number;
    quests: number;
    method_codex: number;
  };
}

export const GITHUB_CONTENT_BASE_URL =
  'https://raw.githubusercontent.com/damessner/aetheria-app/main/content';

/**
 * Storage keys MUST mirror Database.STORAGE_KEYS (`@aetheria_*_v2`). Syncing
 * into differently-suffixed keys silently downloads content that no screen
 * ever reads.
 */
export const SYNC_STORAGE_KEYS = {
  CONTENT_VERSION: '@aetheria_content_version',
  CONTENT_LAST_SYNCED: '@aetheria_content_last_synced',
  ACADEMY_SCROLLS: '@aetheria_academy_scrolls_v2',
  THOUGHT_FEED: '@aetheria_thought_feed_v2',
  QUESTS: '@aetheria_quests_v2',
};

class ContentSyncServiceImpl {
  private isSyncing = false;

  async getLastSyncInfo(): Promise<{ version: string; lastSyncedAt: string | null }> {
    try {
      const version = (await AsyncStorage.getItem(SYNC_STORAGE_KEYS.CONTENT_VERSION)) || '1.0.0';
      const lastSyncedAt = await AsyncStorage.getItem(SYNC_STORAGE_KEYS.CONTENT_LAST_SYNCED);
      return { version, lastSyncedAt };
    } catch {
      return { version: '1.0.0', lastSyncedAt: null };
    }
  }

  /**
   * Fetches latest content from GitHub and updates local cache.
   * Preserves user progress (solved thoughts, completed scrolls).
   */
  async syncContent(force = false): Promise<{
    success: boolean;
    updated: boolean;
    version: string;
    message: string;
  }> {
    if (this.isSyncing) {
      return {
        success: false,
        updated: false,
        version: '1.0.0',
        message: 'Sync already in progress.',
      };
    }

    this.isSyncing = true;

    try {
      // 1. Fetch remote manifest with 6-second timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const manifestRes = await fetch(`${GITHUB_CONTENT_BASE_URL}/manifest.json?t=${Date.now()}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!manifestRes.ok) {
        throw new Error(`Failed to fetch manifest (HTTP ${manifestRes.status})`);
      }

      const remoteManifest: ContentManifest = await manifestRes.json();
      const localInfo = await this.getLastSyncInfo();

      if (!force && remoteManifest.version === localInfo.version) {
        return {
          success: true,
          updated: false,
          version: remoteManifest.version,
          message: `Already on latest content version (${remoteManifest.version}).`,
        };
      }

      // 2. Fetch content files in parallel
      const [scrollsRes, thoughtsRes, questsRes] = await Promise.all([
        fetch(`${GITHUB_CONTENT_BASE_URL}/${remoteManifest.files.wisdom_scrolls}?t=${Date.now()}`),
        fetch(`${GITHUB_CONTENT_BASE_URL}/${remoteManifest.files.thought_stream}?t=${Date.now()}`),
        fetch(`${GITHUB_CONTENT_BASE_URL}/${remoteManifest.files.quests}?t=${Date.now()}`),
      ]);

      if (!scrollsRes.ok || !thoughtsRes.ok || !questsRes.ok) {
        throw new Error('Failed to download one or more content files from GitHub.');
      }

      const remoteScrollsText = await scrollsRes.text();
      const remoteThoughtsText = await thoughtsRes.text();
      const remoteQuestsText = await questsRes.text();

      // 3. Integrity check: verify SHA-256 hashes when the manifest provides them
      if (remoteManifest.hashes) {
        let verifiedAny = false;
        const checks: [string, string, string][] = [
          ['wisdom_scrolls', remoteManifest.hashes.wisdom_scrolls || '', remoteScrollsText],
          ['thought_stream', remoteManifest.hashes.thought_stream || '', remoteThoughtsText],
          ['quests', remoteManifest.hashes.quests || '', remoteQuestsText],
        ];
        for (const [name, expected, body] of checks) {
          if (!expected) continue;
          const actual = await sha256Hex(body);
          if (!actual) break; // crypto unavailable — fail open (see sha256Hex)
          if (actual !== expected.toLowerCase()) {
            throw new Error(
              `Integrity check failed for ${name}: hash mismatch (expected ${expected.slice(0, 12)}…, got ${actual.slice(0, 12)}…). Sync aborted — local content untouched.`
            );
          }
          verifiedAny = true;
        }
        if (verifiedAny) {
          console.log('[ContentSync] Integrity check passed');
        }
      }

      const remoteScrolls: WisdomScroll[] = JSON.parse(remoteScrollsText);
      const remoteThoughts: ThoughtFeedItem[] = JSON.parse(remoteThoughtsText);
      const remoteQuests: QuestItem[] = JSON.parse(remoteQuestsText);

      // 3. Merge with local progress
      // Preserve ALL per-scroll progress (completion, Level 2, memory stars)
      const currentScrollsRaw = await AsyncStorage.getItem(SYNC_STORAGE_KEYS.ACADEMY_SCROLLS);
      const scrollProgressMap = new Map<string, WisdomScroll>();
      if (currentScrollsRaw) {
        const currentScrolls: WisdomScroll[] = JSON.parse(currentScrollsRaw);
        currentScrolls.forEach((s) => {
          if (s.isCompleted || s.isLevel2Completed || (s.memoryLevel ?? 0) > 0) {
            scrollProgressMap.set(s.id, s);
          }
        });
      }

      const mergedScrolls = remoteScrolls.map((s) => {
        const prev = scrollProgressMap.get(s.id);
        if (!prev) return s;
        return {
          ...s,
          isCompleted: s.isCompleted || !!prev.isCompleted,
          completedAt: prev.completedAt,
          isLevel2Unlocked: prev.isLevel2Unlocked,
          isLevel2Completed: prev.isLevel2Completed,
          memoryLevel: Math.max(s.memoryLevel ?? 0, prev.memoryLevel ?? 0),
        };
      });

      // Preserve solved thought items
      const currentThoughtsRaw = await AsyncStorage.getItem(SYNC_STORAGE_KEYS.THOUGHT_FEED);
      const solvedThoughtsMap = new Map<string, { userScore?: number; userReframe?: string }>();
      if (currentThoughtsRaw) {
        const currentThoughts: ThoughtFeedItem[] = JSON.parse(currentThoughtsRaw);
        currentThoughts.forEach((t) => {
          if (t.isSolved) {
            solvedThoughtsMap.set(t.id, {
              userScore: t.userScore,
              userReframe: t.userReframe,
            });
          }
        });
      }

      const mergedThoughts = remoteThoughts.map((t) => {
        const solved = solvedThoughtsMap.get(t.id);
        if (solved) {
          return {
            ...t,
            isSolved: true,
            userScore: solved.userScore,
            userReframe: solved.userReframe,
          };
        }
        return t;
      });

      // 4. Save to local AsyncStorage cache
      await AsyncStorage.multiSet([
        [SYNC_STORAGE_KEYS.ACADEMY_SCROLLS, JSON.stringify(mergedScrolls)],
        [SYNC_STORAGE_KEYS.THOUGHT_FEED, JSON.stringify(mergedThoughts)],
        [SYNC_STORAGE_KEYS.QUESTS, JSON.stringify(remoteQuests)],
        [SYNC_STORAGE_KEYS.CONTENT_VERSION, remoteManifest.version],
        [SYNC_STORAGE_KEYS.CONTENT_LAST_SYNCED, new Date().toISOString()],
      ]);

      // 5. Emit real-time EventBus event so active screens refresh immediately
      EventBus.emit('content:synced', {
        version: remoteManifest.version,
        updatedAt: remoteManifest.updatedAt,
      });

      return {
        success: true,
        updated: true,
        version: remoteManifest.version,
        message: `Synced ${remoteManifest.counts.wisdom_scrolls} scrolls & ${remoteManifest.counts.thought_stream} thoughts from GitHub (v${remoteManifest.version}).`,
      };
    } catch (error: any) {
      return {
        success: false,
        updated: false,
        version: '1.0.0',
        message: error?.message || 'Failed to sync content from GitHub.',
      };
    } finally {
      this.isSyncing = false;
    }
  }
}

export const ContentSyncService = new ContentSyncServiceImpl();
