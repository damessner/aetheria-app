import { describe, it, expect } from 'bun:test';
import { CombatEngine } from '../src/features/arena/CombatEngine';
import { DistortionEnemy, CombatCard } from '../src/core/types';

describe('CombatEngine & Card Battler Mathematics', () => {
  const mockBoss: DistortionEnemy = {
    id: 'boss_test_1',
    name: 'Catastro-Phantom',
    distortionType: 'CATASTROPHIZING',
    maxHp: 100,
    currentHp: 100,
    attackPower: 20,
    thoughtQuote: 'I will fail everything.',
    visualTheme: 'gloom',
  };

  const mockDeck: CombatCard[] = [
    {
      id: 'crd_1',
      name: 'Evidence Vault',
      category: 'FACT_CHECK',
      manaCost: 1,
      baseDamage: 30,
      shieldValue: 10,
      promptText: 'What is the actual statistical probability?',
      targetDistortionBonus: {
        distortion: 'CATASTROPHIZING',
        multiplier: 1.5,
      },
    },
    {
      id: 'crd_2',
      name: 'Compassion Shield',
      category: 'COMPASSION',
      manaCost: 1,
      baseDamage: 10,
      shieldValue: 25,
      promptText: 'One mistake does not define my worth.',
    },
  ];

  it('initializes battle with correct starting values', () => {
    const battle = CombatEngine.createBattle(mockBoss, mockDeck);
    expect(battle.playerHp).toBe(100);
    expect(battle.playerMana).toBe(3);
    expect(battle.playerShield).toBe(0);
    expect(battle.phase).toBe('IDENTIFY_DISTORTION');
    expect(battle.enemy.currentHp).toBe(100);
  });

  it('applies 1.5x distortion affinity multiplier when correctly identified', () => {
    let battle = CombatEngine.createBattle(mockBoss, mockDeck);
    battle = CombatEngine.selectDistortion(battle, 'CATASTROPHIZING');
    expect(battle.phase).toBe('PLAY_CARDS');
    expect(battle.selectedDistortion).toBe('CATASTROPHIZING');

    // Play card 1: base 30 * 1.5 (affinity) * 1.5 (card target bonus) = 67.5 -> 68 DMG
    battle = CombatEngine.playCard(battle, mockDeck[0]);
    expect(battle.enemy.currentHp).toBeLessThan(100);
    expect(battle.playerMana).toBe(2);
    expect(battle.playerShield).toBe(10);
  });

  it('applies 0.8x penalty multiplier when incorrectly identified', () => {
    let battle = CombatEngine.createBattle(mockBoss, mockDeck);
    battle = CombatEngine.selectDistortion(battle, 'MIND_READING');
    expect(battle.selectedDistortion).toBe('MIND_READING');

    // Play card 2: base 10 * 0.8 (affinity) = 8 DMG
    battle = CombatEngine.playCard(battle, mockDeck[1]);
    expect(battle.enemy.currentHp).toBe(92);
    expect(battle.playerShield).toBe(25);
  });

  it('resolves enemy turn with shield absorption', () => {
    let battle = CombatEngine.createBattle(mockBoss, mockDeck);
    battle = CombatEngine.selectDistortion(battle, 'CATASTROPHIZING');
    battle = CombatEngine.playCard(battle, mockDeck[1]); // +25 shield
    expect(battle.playerShield).toBe(25);

    // Enemy attacks for 20 DMG -> absorbed by 25 shield -> 0 direct DMG
    battle = CombatEngine.endTurn(battle);
    expect(battle.playerHp).toBe(100);
    expect(battle.turnCount).toBe(2);
    expect(battle.playerMana).toBe(3); // Mana refilled
  });

  it('triggers victory phase when boss HP hits 0', () => {
    const weakBoss: DistortionEnemy = { ...mockBoss, currentHp: 20, maxHp: 20 };
    let battle = CombatEngine.createBattle(weakBoss, mockDeck);
    battle = CombatEngine.selectDistortion(battle, 'CATASTROPHIZING');
    battle = CombatEngine.playCard(battle, mockDeck[0]);
    expect(battle.enemy.currentHp).toBe(0);
    expect(battle.phase).toBe('VICTORY');
  });
});
