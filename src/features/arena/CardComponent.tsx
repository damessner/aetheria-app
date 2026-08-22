import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CombatCard } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Shield, Zap, Sparkles, HelpCircle, HeartHandshake } from 'lucide-react-native';

interface CardComponentProps {
  card: CombatCard;
  playerMana: number;
  onPlay: (card: CombatCard) => void;
  disabled?: boolean;
}

export const CardComponent: React.FC<CardComponentProps> = ({
  card,
  playerMana,
  onPlay,
  disabled = false,
}) => {
  const canAfford = playerMana >= card.manaCost && !disabled;

  const getCategoryTheme = () => {
    switch (card.category) {
      case 'FACT_CHECK':
        return { color: Colors.logicBlue, icon: HelpCircle, label: 'Fact Check' };
      case 'COMPASSION':
        return { color: Colors.compassionPink, icon: HeartHandshake, label: 'Compassion' };
      case 'REFRAME':
        return { color: Colors.reframeGold, icon: Sparkles, label: 'Reframe' };
      case 'ACTION_SPARK':
      default:
        return { color: Colors.vitalityGreen, icon: Zap, label: 'Action Spark' };
    }
  };

  const theme = getCategoryTheme();
  const IconComponent = theme.icon;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderColor: theme.color },
        !canAfford && styles.cardDisabled,
      ]}
      onPress={() => onPlay(card)}
      disabled={!canAfford}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[styles.manaBadge, { backgroundColor: Colors.clarityMana }]}>
          <Zap size={10} color="#0A0A0E" />
          <Text style={styles.manaText}>{card.manaCost}</Text>
        </View>

        <View style={styles.categoryRow}>
          <IconComponent size={12} color={theme.color} />
          <Text style={[styles.categoryLabel, { color: theme.color }]}>{theme.label}</Text>
        </View>
      </View>

      <Text style={styles.cardName} numberOfLines={1}>{card.name}</Text>
      <Text style={styles.cardPrompt} numberOfLines={3}>{card.promptText}</Text>

      <View style={styles.statsRow}>
        {card.baseDamage > 0 && (
          <View style={styles.statBadge}>
            <Text style={styles.atkText}>⚔️ {card.baseDamage} ATK</Text>
          </View>
        )}
        {card.shieldValue > 0 && (
          <View style={styles.statBadge}>
            <Shield size={12} color={Colors.shieldCyan} />
            <Text style={styles.defText}>+{card.shieldValue}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    padding: Spacing.sm,
    width: 145,
    minHeight: 180,
    justifyContent: 'space-between',
    marginRight: Spacing.sm,
  },
  cardDisabled: {
    opacity: 0.4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  manaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  manaText: {
    color: '#0A0A0E',
    fontWeight: '800',
    fontSize: 11,
    marginLeft: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardName: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardPrompt: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  atkText: {
    color: Colors.dangerRed,
    fontWeight: '700',
    fontSize: 11,
  },
  defText: {
    color: Colors.shieldCyan,
    fontWeight: '700',
    fontSize: 11,
  },
});
