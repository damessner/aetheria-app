import { describe, it, expect } from 'bun:test';
import { WisdomScroll, SchemaArchetype, LifeValuePillar } from '../src/core/types';

describe('The Academy of Inner Alchemy & The Mind Mirror', () => {
  it('instantiates wisdom scrolls with valid quizzes and card rewards', () => {
    const scroll: WisdomScroll = {
      id: 'scr_test_stoic',
      title: 'The View from Above',
      subtitle: 'Marcus Aurelius',
      authorOrTradition: 'Stoic Philosophy',
      readingMinutes: 2,
      category: 'STOICISM',
      contentMarkdown: 'Zoom out to a cosmic perspective...',
      keyTakeaway: 'Decentering shrinks acute catastrophic anxiety.',
      quiz: [
        {
          question: 'What is the purpose?',
          options: ['Panic', 'Gain calm perspective', 'Ignore problems'],
          correctIndex: 1,
          explanation: 'It creates cognitive distance.',
        },
      ],
      unlockedCardReward: {
        id: 'crd_test_view_above',
        name: 'View from Above',
        category: 'FACT_CHECK',
        manaCost: 1,
        baseDamage: 36,
        shieldValue: 20,
        promptText: 'Zoom out 10 years.',
        targetDistortionBonus: { distortion: 'CATASTROPHIZING', multiplier: 1.6 },
      },
      isCompleted: false,
    };

    expect(scroll.category).toBe('STOICISM');
    expect(scroll.quiz.length).toBe(1);
    expect(scroll.unlockedCardReward.manaCost).toBe(1);
    expect(scroll.isCompleted).toBe(false);
  });

  it('verifies Schema Archetypes structure', () => {
    const schema: SchemaArchetype = {
      id: 'sch_perfectionism',
      name: 'The Unrelenting Perfectionist',
      title: 'Unrelenting Standards Schema',
      maladaptiveBelief: 'I must be flawless.',
      healthyTruth: 'My worth is inherent.',
      originContext: 'Early achievement pressure.',
      antidoteTechnique: 'The 80% Good Enough Shield.',
    };

    expect(schema.name).toBe('The Unrelenting Perfectionist');
    expect(schema.healthyTruth).toContain('inherent');
  });

  it('verifies ACT values constellation resonance math', () => {
    const pillar: LifeValuePillar = {
      id: 'CRAFT',
      title: 'Craft & Mastery',
      subtitle: 'Deep focus',
      color: '#38BDF8',
      iconName: 'Sparkles',
      starResonance: 55,
    };

    const boosted = { ...pillar, starResonance: Math.min(100, pillar.starResonance + 20) };
    expect(boosted.starResonance).toBe(75);
  });
});
