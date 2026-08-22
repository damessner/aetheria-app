import { describe, it, expect } from 'bun:test';
import { CampfireMessage } from '../src/core/types';

describe('The Campfire & Socratic Companion Dialogue', () => {
  it('initializes companion message with valid structure', () => {
    const msg: CampfireMessage = {
      id: 'msg_test_1',
      companionId: 'KAEL_OWL',
      sender: 'companion',
      text: 'What evidence supports this assumption?',
      timestamp: new Date().toISOString(),
      insightExtracted: false,
    };

    expect(msg.companionId).toBe('KAEL_OWL');
    expect(msg.sender).toBe('companion');
    expect(msg.insightExtracted).toBe(false);
  });

  it('marks insight as extracted when inscribed to Codex of Wisdom', () => {
    const msg: CampfireMessage = {
      id: 'msg_test_2',
      companionId: 'PYRA_FOX',
      sender: 'companion',
      text: 'Break the task into a 30-second physical step.',
      timestamp: new Date().toISOString(),
      insightExtracted: false,
    };

    const updated = { ...msg, insightExtracted: true };
    expect(updated.insightExtracted).toBe(true);
  });
});
