import { describe, it, expect } from 'bun:test';
import * as fs from 'fs';
import { GITHUB_CONTENT_BASE_URL, ContentManifest } from '../src/core/sync/ContentSyncService';
import { WisdomScroll, ThoughtFeedItem, QuestItem } from '../src/core/types';

describe('Dynamic GitHub Content Sync Engine & Remote Manifest', () => {
  it('validates /content/manifest.json contains accurate metadata and file mappings', () => {
    const manifestRaw = fs.readFileSync('./content/manifest.json', 'utf-8');
    const manifest: ContentManifest = JSON.parse(manifestRaw);

    expect(manifest.version).toBeDefined();
    expect(manifest.updatedAt).toBeDefined();
    expect(manifest.files.wisdom_scrolls).toBe('wisdom_scrolls.json');
    expect(manifest.files.thought_stream).toBe('thought_stream.json');
    expect(manifest.files.quests).toBe('quests.json');
    expect(manifest.files.method_codex).toBe('method_codex.json');
    expect(manifest.counts.wisdom_scrolls).toBe(33);
    expect(manifest.counts.thought_stream).toBe(24);
  });

  it('validates /content/wisdom_scrolls.json contains 33 complete masterclasses', () => {
    const raw = fs.readFileSync('./content/wisdom_scrolls.json', 'utf-8');
    const scrolls: WisdomScroll[] = JSON.parse(raw);

    expect(scrolls.length).toBe(33);
    for (const s of scrolls) {
      expect(s.id).toBeDefined();
      expect(s.title).toBeDefined();
      expect(s.subtitle).toBeDefined();
      expect(s.contentMarkdown.length).toBeGreaterThan(50);
      expect(s.quiz.length).toBeGreaterThan(0);
      expect(s.unlockedCardReward).toBeDefined();
      expect(s.unlockedCardReward.name).toBeDefined();
    }
  });

  it('validates /content/thought_stream.json contains 24 complete 3-tap quiz scenarios', () => {
    const raw = fs.readFileSync('./content/thought_stream.json', 'utf-8');
    const thoughts: ThoughtFeedItem[] = JSON.parse(raw);

    expect(thoughts.length).toBe(24);
    for (const t of thoughts) {
      expect(t.id).toBeDefined();
      expect(t.thought).toBeDefined();
      expect(t.contextDomain).toBeDefined();
      expect(t.correctDistortion).toBeDefined();
      expect(t.reframeOptions?.length).toBe(3);

      const opt = t.reframeOptions?.find((r) => r.type === 'OPTIMAL');
      expect(opt).toBeDefined();
      expect(opt?.score).toBeGreaterThanOrEqual(90);
    }
  });

  it('validates /content/quests.json contains daily micro-quests across 3 energy tiers', () => {
    const raw = fs.readFileSync('./content/quests.json', 'utf-8');
    const quests: QuestItem[] = JSON.parse(raw);

    expect(quests.length).toBeGreaterThanOrEqual(8);
    const lowTier = quests.filter((q) => q.energyCostTier === 'LOW_10');
    const steadyTier = quests.filter((q) => q.energyCostTier === 'STEADY_40');
    const blazingTier = quests.filter((q) => q.energyCostTier === 'BLAZING_80');

    expect(lowTier.length).toBeGreaterThan(0);
    expect(steadyTier.length).toBeGreaterThan(0);
    expect(blazingTier.length).toBeGreaterThan(0);
  });

  it('validates GITHUB_CONTENT_BASE_URL points to the public raw endpoint', () => {
    expect(GITHUB_CONTENT_BASE_URL).toContain('raw.githubusercontent.com');
    expect(GITHUB_CONTENT_BASE_URL).toContain('aetheria-app');
    expect(GITHUB_CONTENT_BASE_URL).toContain('content');
  });
});
