import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CombatEngine } from './CombatEngine';
import { CardComponent } from './CardComponent';
import {
  CardBattleState,
  CombatCard,
  DistortionEnemy,
  DistortionType,
} from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database, INITIAL_COMBAT_DECK } from '../../core/database/db';
import { ARENA_BOSSES } from '../../content/arenaBosses';
import { Gemini } from '../../core/ai/gemini';
import { EventBus } from '../../core/eventbus/EventBus';
import {
  Shield,
  Zap,
  Heart,
  Sparkles,
  Flame,
  Swords,
  BookOpen,
  X,
  CheckCircle2,
} from 'lucide-react-native';

const DISTORTION_CHOICES: { type: DistortionType; label: string }[] = [
  { type: 'CATASTROPHIZING', label: 'Catastrophizing' },
  { type: 'ALL_OR_NOTHING', label: 'All-or-Nothing' },
  { type: 'MIND_READING', label: 'Mind Reading' },
  { type: 'EMOTIONAL_REASONING', label: 'Emotional Reasoning' },
  { type: 'OVERGENERALIZATION', label: 'Overgeneralization' },
  { type: 'PERSONALIZATION', label: 'Personalization' },
];

export const MindArenaScreen: React.FC = () => {
  const [deck, setDeck] = useState<CombatCard[]>(INITIAL_COMBAT_DECK);
  const [battleState, setBattleState] = useState<CardBattleState>(() =>
    CombatEngine.createBattle(ARENA_BOSSES[0], INITIAL_COMBAT_DECK)
  );
  const [bossSelectVisible, setBossSelectVisible] = useState(false);

  // Custom Thought / Socratic AI State
  const [customThoughtModal, setCustomThoughtModal] = useState(false);
  const [customThoughtInput, setCustomThoughtInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Victory State
  const [victoryModal, setVictoryModal] = useState(false);
  const [victoryCodexSummary, setVictoryCodexSummary] = useState('');

  useEffect(() => {
    Database.getUserState().then((state) => {
      if (state.activeCards && state.activeCards.length > 0) {
        setDeck(state.activeCards);
        setBattleState(CombatEngine.createBattle(ARENA_BOSSES[0], state.activeCards));
      }
    });
  }, []);

  const handleSelectBoss = (bossIndex: number) => {
    const boss = ARENA_BOSSES[bossIndex];
    setBattleState(CombatEngine.createBattle(boss, deck));
    setBossSelectVisible(false);
  };

  const handleDistortionSelected = (distortion: DistortionType) => {
    const nextState = CombatEngine.selectDistortion(battleState, distortion);
    setBattleState(nextState);
  };

  const handlePlayCard = (card: CombatCard) => {
    const nextState = CombatEngine.playCard(battleState, card);
    setBattleState(nextState);

    if (nextState.phase === 'VICTORY') {
      handleVictory(nextState);
    }
  };

  const handleEndTurn = () => {
    const nextState = CombatEngine.endTurn(battleState);
    setBattleState(nextState);

    if (nextState.phase === 'VICTORY') {
      handleVictory(nextState);
    }
  };

  const handleVictory = async (state: CardBattleState) => {
    const summary = `Countered "${state.enemy.thoughtQuote}" with rational evidence and self-compassion.`;
    setVictoryCodexSummary(summary);
    setVictoryModal(true);

    // Save victory to database and emit events
    await Database.addVictoryCodexEntry({
      bossName: state.enemy.name,
      thought: state.enemy.thoughtQuote,
      reframe: summary,
    });

    const userState = await Database.getUserState();
    userState.vitalityPoints += 100;
    userState.clarityMana += 3;
    userState.sanctuary.gloomClearingPercentage = Math.min(
      100,
      userState.sanctuary.gloomClearingPercentage + 15
    );
    await Database.saveUserState(userState);

    EventBus.emit('arena:victory', {
      encounterId: state.encounterId,
      bossName: state.enemy.name,
      distortionType: state.enemy.distortionType,
      victoryCodex: summary,
    });
  };

  const handleCreateCustomSocraticBattle = async () => {
    if (!customThoughtInput.trim()) {
      Alert.alert('Empty Thought', 'Please type or speak your automatic thought.');
      return;
    }

    setIsAiLoading(true);
    try {
      const result = await Gemini.reframeThought(customThoughtInput);

      const customBoss: DistortionEnemy = {
        id: 'boss_custom_' + Date.now(),
        name: `Shadow of ${result.distortion}`,
        distortionType: result.distortion,
        maxHp: 75,
        currentHp: 75,
        attackPower: 12,
        thoughtQuote: customThoughtInput,
        visualTheme: 'custom_astral',
      };

      const mergedDeck = [...result.cards, ...deck];
      const newBattle = CombatEngine.createBattle(customBoss, mergedDeck);
      setBattleState(newBattle);
      setCustomThoughtModal(false);
      setCustomThoughtInput('');
    } finally {
      setIsAiLoading(false);
    }
  };

  const restartBattle = () => {
    setBattleState(CombatEngine.createBattle(battleState.enemy, deck));
    setVictoryModal(false);
  };

  const enemyHpPercent = Math.max(
    0,
    Math.round((battleState.enemy.currentHp / battleState.enemy.maxHp) * 100)
  );
  const playerHpPercent = Math.max(
    0,
    Math.round((battleState.playerHp / battleState.playerMaxHp) * 100)
  );

  return (
    <View style={styles.container}>
      {/* Top Bar with Boss Display */}
      <View style={styles.bossCard}>
        <View style={styles.bossHeader}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setBossSelectVisible(true)}
            accessibilityRole="button"
            accessibilityLabel={`Change distortion phantom. Current: ${battleState.enemy.name}`}
          >
            <Text style={styles.bossTag}>Distortion Phantom — tap to change</Text>
            <Text style={styles.bossName}>{battleState.enemy.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customThoughtBtn}
            onPress={() => setCustomThoughtModal(true)}
          >
            <Sparkles size={14} color={Colors.reframeGold} />
            <Text style={styles.customThoughtText}>Battle Custom Thought</Text>
          </TouchableOpacity>
        </View>

        {/* Thought Bubble */}
        <View style={styles.thoughtBubble}>
          <Text style={styles.thoughtQuote}>"{battleState.enemy.thoughtQuote}"</Text>
        </View>

        {/* Boss HP Bar */}
        <View style={styles.hpBarContainer}>
          <View style={styles.hpLabelRow}>
            <Text style={styles.hpLabel}>Phantom Core</Text>
            <Text style={styles.hpValue}>
              {battleState.enemy.currentHp} / {battleState.enemy.maxHp} HP
            </Text>
          </View>
          <View style={styles.hpTrack}>
            <View style={[styles.hpFillEnemy, { width: `${enemyHpPercent}%` }]} />
          </View>
        </View>
      </View>

      {/* Center Action Phase */}
      {battleState.phase === 'IDENTIFY_DISTORTION' ? (
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseTitle}>Phase 1: Identify the Thinking Trap</Text>
          <Text style={styles.phaseSubtitle}>
            Diagnose the phantom's flaw to gain a 1.5x damage affinity bonus:
          </Text>
          <View style={styles.distortionGrid}>
            {DISTORTION_CHOICES.map((item) => (
              <TouchableOpacity
                key={item.type}
                style={styles.distortionBtn}
                onPress={() => handleDistortionSelected(item.type)}
              >
                <Text style={styles.distortionBtnText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.playerStatusSection}>
          {/* Player Stats Bar */}
          <View style={styles.playerStatsRow}>
            <View style={styles.statBox}>
              <Heart size={14} color={Colors.dangerRed} />
              <Text style={styles.statBoxText}>{battleState.playerHp} HP</Text>
            </View>
            <View style={styles.statBox}>
              <Shield size={14} color={Colors.shieldCyan} />
              <Text style={styles.statBoxText}>{battleState.playerShield} Shield</Text>
            </View>
            <View style={styles.statBox}>
              <Zap size={14} color={Colors.clarityMana} />
              <Text style={styles.statBoxText}>
                {battleState.playerMana} / {battleState.playerMaxMana} Mana
              </Text>
            </View>

            <TouchableOpacity style={styles.endTurnBtn} onPress={handleEndTurn}>
              <Swords size={14} color="#0A0A0E" />
              <Text style={styles.endTurnBtnText}>End Turn</Text>
            </TouchableOpacity>
          </View>

          {/* Cards Hand */}
          <Text style={styles.handTitle}>Play Reframing Cards (Mana Cost in Blue)</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.handContainer}
          >
            {battleState.hand.map((card) => (
              <CardComponent
                key={card.id}
                card={card}
                playerMana={battleState.playerMana}
                onPlay={handlePlayCard}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Combat Log */}
      <View style={styles.logContainer}>
        <Text style={styles.logTitle}>Combat Log</Text>
        <ScrollView style={styles.logScroll}>
          {battleState.battleLog.slice(-4).map((log, index) => (
            <Text key={index} style={styles.logText}>
              {log}
            </Text>
          ))}
        </ScrollView>
      </View>

      {/* Custom Thought Modal */}
      <Modal
        visible={customThoughtModal}
        transparent
        animationType="slide"
        onRequestClose={() => setCustomThoughtModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Sparkles size={18} color={Colors.reframeGold} />
                <Text style={styles.modalTitle}>Socratic Reframe Mirror</Text>
              </View>
              <TouchableOpacity onPress={() => setCustomThoughtModal(false)}>
                <X size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDesc}>
              Enter whatever negative thought is troubling you right now. Gemini (Kael the Owl) will
              forge a personalized boss battle and generate counter-thought cards:
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="e.g., I messed up this project and everyone thinks I am incompetent..."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={4}
              value={customThoughtInput}
              onChangeText={setCustomThoughtInput}
            />

            <TouchableOpacity
              style={styles.forgeBattleBtn}
              onPress={handleCreateCustomSocraticBattle}
              disabled={isAiLoading}
            >
              {isAiLoading ? (
                <ActivityIndicator color="#0A0A0E" />
              ) : (
                <>
                  <Swords size={16} color="#0A0A0E" />
                  <Text style={styles.forgeBattleText}>Forge Socratic Battle</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Victory Modal */}
      <Modal visible={victoryModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { borderColor: Colors.reframeGold }]}>
            <View style={{ alignItems: 'center', marginBottom: Spacing.md }}>
              <CheckCircle2 size={48} color={Colors.reframeGold} />
              <Text style={[styles.modalTitle, { color: Colors.reframeGold, marginTop: 8 }]}>
                Cognitive Clarity Restored!
              </Text>
            </View>

            <Text style={styles.victoryDesc}>
              You successfully banished the distortion. The balanced perspective has been inscribed into
              your permanent Codex of Wisdom:
            </Text>

            <View style={styles.codexSnippet}>
              <BookOpen size={16} color={Colors.clarityMana} />
              <Text style={styles.codexText}>{victoryCodexSummary}</Text>
            </View>

            <View style={styles.rewardSummary}>
              <Text style={styles.rewardBadge}>+100 Vitality Points</Text>
              <Text style={styles.rewardBadge}>+3 Clarity Mana</Text>
              <Text style={styles.rewardBadge}>+15% Sanctuary Glow</Text>
            </View>

            <TouchableOpacity style={styles.forgeBattleBtn} onPress={restartBattle}>
              <Text style={styles.forgeBattleText}>Return to Sanctuary</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Boss Select Modal */}
      <Modal visible={bossSelectVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { maxHeight: '85%' }]}>
            <Text style={[styles.modalTitle, { color: Colors.textPrimary, marginBottom: 4 }]}>
              Choose Your Phantom
            </Text>
            <Text style={{ color: Colors.textMuted, fontSize: 12, marginBottom: Spacing.md }}>
              Each distortion takes a different form. Weaker phantoms fall faster — but the Iron Decree hits hard.
            </Text>
            <ScrollView style={{ flexGrow: 0 }}>
              {ARENA_BOSSES.map((boss) => {
                const isCurrent = boss.id === battleState.enemy.id;
                const label = DISTORTION_CHOICES.find(
                  (d) => d.type === boss.distortionType
                )?.label;
                return (
                  <TouchableOpacity
                    key={boss.id}
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        backgroundColor: Colors.surfaceLight,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: isCurrent ? Colors.reframeGold : Colors.border,
                        padding: Spacing.sm,
                        marginBottom: 8,
                      },
                    ]}
                    onPress={() => handleSelectBoss(ARENA_BOSSES.indexOf(boss))}
                    accessibilityRole="button"
                    accessibilityLabel={`Battle ${label}: ${boss.name}, health ${boss.maxHp}`}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: Colors.reframeGold, fontSize: 11, fontWeight: '700', textTransform: 'uppercase' }}>
                        {label}
                      </Text>
                      <Text style={{ color: Colors.textPrimary, fontSize: 14, fontWeight: '700' }}>
                        {boss.name}
                      </Text>
                      <Text style={{ color: Colors.textMuted, fontSize: 11, fontStyle: 'italic' }} numberOfLines={1}>
                        "{boss.thoughtQuote}"
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ color: Colors.distortionRed, fontSize: 11, fontWeight: '700' }}>
                        ♥ {boss.maxHp}
                      </Text>
                      <Text style={{ color: Colors.textMuted, fontSize: 11 }}>
                        ⚔ {boss.attackPower}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              style={[styles.forgeBattleBtn, { marginTop: 4 }]}
              onPress={() => setBossSelectVisible(false)}
            >
              <Text style={styles.forgeBattleText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },
  bossCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  bossHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  bossTag: {
    color: Colors.gloomPurple,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bossName: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  customThoughtBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  customThoughtText: {
    color: Colors.reframeGold,
    fontSize: 11,
    fontWeight: '600',
  },
  thoughtBubble: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.md,
    borderRadius: 12,
    marginVertical: Spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: Colors.gloomPurple,
  },
  thoughtQuote: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  hpBarContainer: {
    marginTop: 4,
  },
  hpLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  hpLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  hpValue: {
    color: Colors.dangerRed,
    fontSize: 11,
    fontWeight: '700',
  },
  hpTrack: {
    height: 8,
    backgroundColor: Colors.surfaceHighlight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  hpFillEnemy: {
    height: '100%',
    backgroundColor: Colors.dangerRed,
    borderRadius: 4,
  },
  phaseContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  phaseTitle: {
    color: Colors.clarityMana,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  phaseSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: Spacing.md,
  },
  distortionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  distortionBtn: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexBasis: '48%',
    alignItems: 'center',
  },
  distortionBtnText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  playerStatusSection: {
    marginBottom: Spacing.md,
  },
  playerStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  statBoxText: {
    color: Colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  endTurnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.reframeGold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 'auto',
    gap: 4,
  },
  endTurnBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 12,
  },
  handTitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  handContainer: {
    paddingVertical: 4,
  },
  logContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
  },
  logTitle: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  logScroll: {
    flex: 1,
  },
  logText: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  modalCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  modalTitle: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  modalDesc: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  textInput: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: Spacing.md,
    color: Colors.textPrimary,
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: Spacing.md,
  },
  forgeBattleBtn: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  forgeBattleText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 14,
  },
  victoryDesc: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  codexSnippet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.md,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.clarityMana,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  codexText: {
    color: Colors.textPrimary,
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  rewardSummary: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: Spacing.lg,
  },
  rewardBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    color: Colors.vitalityGreen,
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
