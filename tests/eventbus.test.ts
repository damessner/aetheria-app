import { describe, it, expect } from 'bun:test';
import { EventBus } from '../src/core/eventbus/EventBus';

describe('Decoupled EventBus Service', () => {
  it('subscribes and receives typed event payloads', () => {
    let receivedPayload: any = null;

    const unbind = EventBus.subscribe('quest:completed', (data) => {
      receivedPayload = data;
    });

    EventBus.emit('quest:completed', {
      questId: 'qst_123',
      vpEarned: 50,
      manaEarned: 2,
    });

    expect(receivedPayload).not.toBeNull();
    expect(receivedPayload.questId).toBe('qst_123');
    expect(receivedPayload.vpEarned).toBe(50);
    expect(receivedPayload.manaEarned).toBe(2);

    unbind();
  });
});
