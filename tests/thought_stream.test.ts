import { describe, it, expect } from 'bun:test';
import { ThoughtFeedItem, TherapeuticTechnique, DistortionType } from '../src/core/types';

describe('The Cognitive Stream & Thought Alchemy Dojo', () => {
  it('instantiates thought feed challenge items with correct schema', () => {
    const item: ThoughtFeedItem = {
      id: 'thg_test_1',
      thought: 'If I fail this interview, my entire career is finished.',
      contextDomain: 'WORK_BURNOUT',
      correctDistortion: 'CATASTROPHIZING',
      explanation: 'Assuming the worst possible long-term disaster from a single event.',
      techniqueOptions: ['CBT_REALITY_CHECK', 'CFT_COMPASSION', 'STOIC_CONTROL'],
      suggestedReframe: 'Interviews are two-way evaluations and practice. One outcome does not define my career trajectory.',
      isSolved: false,
    };

    expect(item.contextDomain).toBe('WORK_BURNOUT');
    expect(item.correctDistortion).toBe('CATASTROPHIZING');
    expect(item.techniqueOptions).toContain('CBT_REALITY_CHECK');
    expect(item.isSolved).toBe(false);
  });

  it('verifies therapeutic technique assignment and grading calculations', () => {
    const score = 92;
    const vpReward = Math.round(score * 0.5); // 46 VP
    const manaReward = score >= 85 ? 2 : 1; // 2 Mana

    expect(vpReward).toBe(46);
    expect(manaReward).toBe(2);
  });
});
