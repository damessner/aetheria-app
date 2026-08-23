import { describe, test, expect } from 'bun:test';
import { assessCrisisRisk } from '../src/core/security/crisisDetection';

describe('Crisis Language Detection', () => {
  // A mental-health app MUST catch these. False negatives are unacceptable.
  const MUST_DETECT = [
    'I want to kill myself',
    'sometimes I think about ending my life',
    'I have a plan to take my own life tonight',
    'thinking about suicide a lot lately',
    'I am suicidal',
    'everyone would be better off without me',
    'no one would care if I disappeared forever',
    'I have been cutting myself again',
    'I want to hurt myself so bad right now',
    'sometimes I feel like I should just not wake up',
    'my husband is going to hurt me and I am scared',
    'I get thoughts of hurting my child and I hate it',
    'no reason to go on anymore',
    'I took all my pills',
  ];

  // Benign therapeutic content that MUST NOT trigger the modal.
  const SAFE = [
    'My boss stressed me out today and I felt useless at work',
    'I keep having the thought that I am a failure at everything',
    'How do I stop catastrophizing about my presentation next week?',
    'I feel sad that my father never says he is proud of me',
    'my therapist told me to practice self-compassion exercises',
    'The news about the suicide prevention hotline made me appreciate help existing',
    'I want to die my hair a different color this weekend', // idiom trap
    'work is killing me slowly lol', // hyperbole trap
    'my kids are going to be the death of me', // hyperbole trap
  ];

  test.each(MUST_DETECT)('detects crisis language: "%s"', (msg) => {
    const result = assessCrisisRisk(msg);
    expect(result.isCrisis).toBe(true);
    expect(result.severity).not.toBeNull();
  });

  test.each(SAFE)('allows safe message: "%s"', (msg) => {
    const result = assessCrisisRisk(msg);
    expect(result.isCrisis).toBe(false);
  });

  test('handles empty and short input', () => {
    expect(assessCrisisRisk('').isCrisis).toBe(false);
    expect(assessCrisisRisk('   ').isCrisis).toBe(false);
    expect(assessCrisisRisk('ok').isCrisis).toBe(false);
  });

  test('classifies self-harm as IMMEDIATE severity', () => {
    const result = assessCrisisRisk('I want to end my life');
    expect(result.severity).toBe('IMMEDIATE');
  });
});
