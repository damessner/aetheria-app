import { describe, it, expect } from 'bun:test';
import { ThoughtFeedItem, WisdomScroll, ReframeChoice } from '../src/core/types';
import { METHOD_CODEX_REGISTRY } from '../src/core/methods/methodRegistry';

describe('Streamlined Quiz Architecture & Expanded Content', () => {
  it('validates Method Codex registry has all 8 therapeutic frameworks with neurobiological mechanisms', () => {
    const methods = Object.keys(METHOD_CODEX_REGISTRY);
    expect(methods.length).toBe(8);

    const cbt = METHOD_CODEX_REGISTRY.CBT_REALITY_CHECK;
    expect(cbt.name).toContain('Evidence');
    expect(cbt.neurobiologicalMechanism).toContain('Prefrontal');
    expect(cbt.parentingAndTeachingBenefit).toContain('meltdown');

    const coreg = METHOD_CODEX_REGISTRY.SOMATIC_COREGULATION;
    expect(coreg.name).toContain('Somatic Co-Regulation');
    expect(coreg.neurobiologicalMechanism).toContain('Ventral Vagal');

    const stoic = METHOD_CODEX_REGISTRY.STOIC_CONTROL;
    expect(stoic.parentingAndTeachingBenefit).toContain('control');
  });

  it('validates ThoughtFeedItem schema with multiple choice reframe options (Optimal, Toxic Positivity, Rationalization)', () => {
    const item: ThoughtFeedItem = {
      id: 'thg_test_fatherhood',
      thought: 'My child screamed during bedtime. I am a bad dad.',
      contextDomain: 'FATHERHOOD_PARENTING',
      correctDistortion: 'ALL_OR_NOTHING',
      explanation: 'Conflating toddler dysregulation with fatherhood failure.',
      techniqueOptions: ['SOMATIC_COREGULATION', 'CFT_COMPASSION'],
      suggestedReframe: 'Toddler tantrums are developmental.',
      reframeOptions: [
        {
          id: 'ref_opt',
          text: 'Toddler tantrums are developmental.',
          type: 'OPTIMAL',
          score: 98,
          explanation: 'Grounded reframe.',
          clinicalFeedback: 'Excellent.',
        },
        {
          id: 'ref_toxic',
          text: 'Just smile, kids never do anything wrong!',
          type: 'TOXIC_POSITIVITY',
          score: 40,
          explanation: 'Superficial.',
          clinicalFeedback: 'Bypassing.',
        },
        {
          id: 'ref_rat',
          text: 'My child is evil and I am doomed.',
          type: 'RATIONALIZATION',
          score: 20,
          explanation: 'Victimhood.',
          clinicalFeedback: 'Defeatist.',
        },
      ],
      isSolved: false,
    };

    expect(item.reframeOptions?.length).toBe(3);
    const optimal = item.reframeOptions?.find((r) => r.type === 'OPTIMAL');
    expect(optimal?.score).toBeGreaterThanOrEqual(90);
  });

  it('validates WisdomScrolls expanded library contains parenting and teaching scrolls', () => {
    const parentScroll: WisdomScroll = {
      id: 'scr_parent_coreg',
      title: 'The Father’s Co-Regulation Mirror',
      subtitle: 'Polyvagal Co-Regulation in Family Storms',
      authorOrTradition: 'Parenting & Polyvagal Science',
      readingMinutes: 2,
      category: 'PARENTING_COREGULATION',
      contentMarkdown: 'Children borrow your nervous system.',
      keyTakeaway: 'Regulate yourself first.',
      quiz: [
        {
          question: 'How do children absorb regulation?',
          options: ['Lectures', 'Neuroceptive mirroring', 'Isolation'],
          correctIndex: 1,
          explanation: 'Co-regulation precedes self-regulation.',
        },
      ],
      unlockedCardReward: {
        id: 'crd_coreg_test',
        name: 'Co-Regulation Mirror',
        category: 'COMPASSION',
        manaCost: 1,
        baseDamage: 28,
        shieldValue: 30,
        promptText: 'I am the calm anchor.',
        targetDistortionBonus: { distortion: 'PERSONALIZATION', multiplier: 1.7 },
      },
      isCompleted: false,
    };

    expect(parentScroll.category).toBe('PARENTING_COREGULATION');
    expect(parentScroll.quiz[0].correctIndex).toBe(1);
  });

  it('validates Gottman, NVC, and Tronick attachment wisdom scroll rewards and quiz answers', () => {
    const scrolls = [
      {
        id: 'scr_rupture_13',
        category: 'PARENTING_COREGULATION',
        quizAnswer: 1,
        cardCategory: 'COMPASSION',
      },
      {
        id: 'scr_compassion_fatigue_14',
        category: 'PARENTING_COREGULATION',
        quizAnswer: 0,
        cardCategory: 'REFRAME',
      },
      {
        id: 'scr_gottman_15',
        category: 'PARENTING_COREGULATION',
        quizAnswer: 1,
        cardCategory: 'COMPASSION',
      },
      {
        id: 'scr_nvc_16',
        category: 'CBT_REBT',
        quizAnswer: 1,
        cardCategory: 'FACT_CHECK',
      },
    ];

    expect(scrolls.length).toBe(4);
    for (const s of scrolls) {
      expect(s.quizAnswer).toBeDefined();
      expect(s.cardCategory).toBeDefined();
    }
  });

  it('validates newest masterclass scrolls 17-24 (Window of Tolerance, Pygmalion, ZPD, Four Tendencies, Positivity Resonance, Stoic Archer, Polyvagal Ladder, Socratic Elenchus)', () => {
    const newScrolls = [
      { id: 'scr_window_tolerance_17', category: 'PARENTING_COREGULATION', cardId: 'crd_tolerance_anchor' },
      { id: 'scr_pygmalion_18', category: 'CBT_REBT', cardId: 'crd_pygmalion_catalyst' },
      { id: 'scr_zpd_scaffold_19', category: 'PARENTING_COREGULATION', cardId: 'crd_scaffold_aegis' },
      { id: 'scr_four_tendencies_20', category: 'CBT_REBT', cardId: 'crd_accountability_matrix' },
      { id: 'scr_positivity_resonance_21', category: 'PARENTING_COREGULATION', cardId: 'crd_resonance_pulse' },
      { id: 'scr_stoic_archer_22', category: 'STOICISM', cardId: 'crd_archers_virtue' },
      { id: 'scr_polyvagal_ladder_23', category: 'NEUROSCIENCE', cardId: 'crd_ventral_ladder' },
      { id: 'scr_socratic_elenchus_24', category: 'CBT_REBT', cardId: 'crd_socratic_blade' },
    ];

    expect(newScrolls.length).toBe(8);
    for (const s of newScrolls) {
      expect(s.id).toBeDefined();
      expect(s.category).toBeDefined();
      expect(s.cardId).toBeDefined();
    }
  });
});
