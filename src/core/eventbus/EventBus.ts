// Decoupled Reactive Event Bus for Cross-Module Communication

type EventCallback<T = any> = (data: T) => void;

export interface AppEvents {
  'quest:completed': { questId: string; vpEarned: number; manaEarned: number };
  'task:completed': { taskId: string; relicDropped?: any };
  'arena:victory': { encounterId: string; bossName: string; distortionType: string; victoryCodex: string };
  'energy:changed': { newTier: 'LOW_10' | 'STEADY_40' | 'BLAZING_80' };
  'sanctuary:growth': { newPercentage: number };
  'mood:logged': { valence: number; arousal: number; emotion: string };
  'ota:update_found': { version: string; releaseTag: string };
}

class EventBusService {
  private listeners: Map<keyof AppEvents, Set<EventCallback>> = new Map();

  subscribe<K extends keyof AppEvents>(event: K, callback: EventCallback<AppEvents[K]>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unbind function
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  emit<K extends keyof AppEvents>(event: K, data: AppEvents[K]): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (err) {
          console.error(`[EventBus] Error in callback for ${event}:`, err);
        }
      });
    }
  }
}

export const EventBus = new EventBusService();
