import { CardBattleState, CombatCard, DistortionEnemy, DistortionType } from '../../core/types';

export class CombatEngine {
  static createBattle(enemy: DistortionEnemy, playerDeck: CombatCard[]): CardBattleState {
    return {
      encounterId: 'enc_' + Date.now(),
      enemy: { ...enemy },
      playerHp: 100,
      playerMaxHp: 100,
      playerShield: 0,
      playerMana: 3,
      playerMaxMana: 3,
      hand: [...playerDeck],
      selectedDistortion: null,
      phase: 'IDENTIFY_DISTORTION',
      turnCount: 1,
      battleLog: [`Encounter started with ${enemy.name}!`, `Boss thought: "${enemy.thoughtQuote}"`],
      evidenceShardsCount: 0,
    };
  }

  /**
   * Phase 1: Evaluate Distortion Identification
   * Match yields 1.5x damage affinity, mismatch yields 0.8x
   */
  static selectDistortion(
    state: CardBattleState,
    chosen: DistortionType
  ): CardBattleState {
    const isCorrect = chosen === state.enemy.distortionType;
    const affinityMsg = isCorrect
      ? `✨ Accurate diagnosis! Distortion affinity multiplier active (1.5x DMG).`
      : `🛡️ The distortion resists slightly (0.8x DMG). Keep examining its logic!`;

    return {
      ...state,
      selectedDistortion: chosen,
      phase: 'PLAY_CARDS',
      battleLog: [...state.battleLog, `You identified: ${chosen}.`, affinityMsg],
    };
  }

  /**
   * Phase 2: Play a card from hand
   */
  static playCard(
    state: CardBattleState,
    card: CombatCard
  ): CardBattleState {
    if (state.playerMana < card.manaCost) {
      return {
        ...state,
        battleLog: [...state.battleLog, `Not enough Mana to cast ${card.name}!`],
      };
    }

    // Calculate Damage with Distortion Affinity
    let multiplier = 1.0;
    if (state.selectedDistortion) {
      if (state.selectedDistortion === state.enemy.distortionType) {
        multiplier = 1.5;
      } else {
        multiplier = 0.8;
      }
    }

    // Check specific target distortion bonus on card
    if (card.targetDistortionBonus && card.targetDistortionBonus.distortion === state.enemy.distortionType) {
      multiplier *= card.targetDistortionBonus.multiplier;
    }

    const calculatedDamage = Math.round(card.baseDamage * multiplier);
    const newEnemyHp = Math.max(0, state.enemy.currentHp - calculatedDamage);
    const newShield = state.playerShield + card.shieldValue;
    const newMana = state.playerMana - card.manaCost;

    const logEntry = `⚔️ Played [${card.name}]: Dealt ${calculatedDamage} DMG! (+${card.shieldValue} Shield)`;

    // Check if enemy defeated
    if (newEnemyHp === 0) {
      return {
        ...state,
        enemy: { ...state.enemy, currentHp: 0 },
        playerShield: newShield,
        playerMana: newMana,
        phase: 'VICTORY',
        battleLog: [...state.battleLog, logEntry, `🎉 ${state.enemy.name} was banished by your cognitive clarity!`],
      };
    }

    return {
      ...state,
      enemy: { ...state.enemy, currentHp: newEnemyHp },
      playerShield: newShield,
      playerMana: newMana,
      battleLog: [...state.battleLog, logEntry],
    };
  }

  /**
   * End player turn and resolve enemy counter-attack
   */
  static endTurn(state: CardBattleState): CardBattleState {
    if (state.enemy.currentHp <= 0) {
      return { ...state, phase: 'VICTORY' };
    }

    const rawAttack = state.enemy.attackPower;
    const damageThroughShield = Math.max(0, rawAttack - state.playerShield);
    const remainingShield = Math.max(0, state.playerShield - rawAttack);
    const newPlayerHp = Math.max(0, state.playerHp - damageThroughShield);

    const log = `⚡ ${state.enemy.name} attacks for ${rawAttack} DMG! (${remainingShield} shield remaining, took ${damageThroughShield} direct DMG)`;

    if (newPlayerHp === 0) {
      return {
        ...state,
        playerHp: 0,
        playerShield: 0,
        phase: 'DEFEAT',
        battleLog: [...state.battleLog, log, `Rest and regroup. Rest Shield protected your vitality!`],
      };
    }

    return {
      ...state,
      playerHp: newPlayerHp,
      playerShield: 0, // Shield resets each round
      playerMana: state.playerMaxMana, // Reset Mana
      turnCount: state.turnCount + 1,
      battleLog: [...state.battleLog, log, `--- Turn ${state.turnCount + 1} ---`],
    };
  }
}
