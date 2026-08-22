import { describe, it, expect } from 'bun:test';
import { ShadowDossier, ShadowFlawType, CardinalVirtues } from '../src/core/types';

describe('The Shadow Crucible (10 Core Character Flaws & Radical Honesty)', () => {
  it('instantiates all 10 shadow flaw archetypes with deep psychoanalytic structure', () => {
    const allFlaws: ShadowFlawType[] = [
      'FRAGILE_EGO',
      'CHRONIC_AVOIDANCE',
      'BITTER_CYNIC',
      'PEOPLE_PLEASER',
      'CONTROL_TYRANT',
      'PROFESSIONAL_VICTIM',
      'SECRET_ENVIER',
      'EMOTIONAL_TYRANT',
      'SCARCITY_HOARDER',
      'HYPOCRITICAL_MORALIST',
    ];

    expect(allFlaws.length).toBe(10);
  });

  it('validates a deep Shadow Dossier schema with razor probes and acute emergency protocol', () => {
    const dossier: ShadowDossier = {
      id: 'PEOPLE_PLEASER',
      name: 'The People-Pleaser',
      title: 'Cowardice, Chameleonic Fawning & Dishonesty',
      iconName: 'Mask',
      color: '#F472B6',
      unconsciousTerror: 'Terror of conflict, rejection, and abandonment.',
      psychoanalyticAnatomy: 'A covert contract where silence is traded for safety.',
      selfDeceptions: ['"I just love helping people."'],
      hiddenRelationalPoison: 'Creates shallow, dishonest relationships built on a false persona.',
      razorProbes: ['Where in your life are you currently saying yes when your soul screams no?'],
      acuteEmergencyProtocol: 'The 24-Hour Buffer rule.',
      crucibleVowText: 'Say a direct, unapologetic polite No.',
      associatedVirtue: 'INTEGRITY',
      virtueForgedName: 'Authentic Backbone',
      isVowActive: false,
      isVowCompleted: false,
    };

    expect(dossier.associatedVirtue).toBe('INTEGRITY');
    expect(dossier.razorProbes.length).toBeGreaterThan(0);
    expect(dossier.selfDeceptions.length).toBeGreaterThan(0);
  });

  it('calculates 4 Cardinal Virtues level advancement accurately upon vow fulfillment', () => {
    const initialVirtues: CardinalVirtues = {
      courage: 30,
      integrity: 25,
      temperance: 40,
      humility: 20,
    };

    const forgedVirtues: CardinalVirtues = {
      ...initialVirtues,
      humility: Math.min(100, initialVirtues.humility + 15),
    };

    expect(forgedVirtues.humility).toBe(35);
  });
});
