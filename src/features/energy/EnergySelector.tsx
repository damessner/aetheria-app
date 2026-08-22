import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EnergyTier } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { BatteryCharging, Flame, Sparkles, Moon } from 'lucide-react-native';
import { EventBus } from '../../core/eventbus/EventBus';

interface EnergySelectorProps {
  currentTier: EnergyTier;
  onSelectTier: (tier: EnergyTier) => void;
}

export const EnergySelector: React.FC<EnergySelectorProps> = ({ currentTier, onSelectTier }) => {
  const tiers: { tier: EnergyTier; label: string; percentage: string; icon: any; color: string; desc: string }[] = [
    {
      tier: 'LOW_10',
      label: 'Low Spark',
      percentage: '10-30%',
      icon: Moon,
      color: Colors.compassionPink,
      desc: '30s gentle breathing & sensory anchors',
    },
    {
      tier: 'STEADY_40',
      label: 'Steady Flame',
      percentage: '40-70%',
      icon: Flame,
      color: Colors.clarityMana,
      desc: 'Micro-activation & hydration breaks',
    },
    {
      tier: 'BLAZING_80',
      label: 'Blazing Radiance',
      percentage: '80-100%',
      icon: Sparkles,
      color: Colors.vitalityGreen,
      desc: 'Outdoor sunlight & deep focus quests',
    },
  ];

  const handleSelect = (tier: EnergyTier) => {
    onSelectTier(tier);
    EventBus.emit('energy:changed', { newTier: tier });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BatteryCharging size={18} color={Colors.textSecondary} />
        <Text style={styles.headerTitle}>Current Energy Level</Text>
      </View>

      <View style={styles.buttonRow}>
        {tiers.map((item) => {
          const isSelected = currentTier === item.tier;
          const IconComponent = item.icon;
          return (
            <TouchableOpacity
              key={item.tier}
              style={[
                styles.tierButton,
                isSelected && { borderColor: item.color, backgroundColor: 'rgba(255, 255, 255, 0.05)' },
              ]}
              onPress={() => handleSelect(item.tier)}
              activeOpacity={0.7}
            >
              <IconComponent size={20} color={isSelected ? item.color : Colors.textMuted} />
              <Text style={[styles.tierLabel, isSelected && { color: item.color, fontWeight: '700' }]}>
                {item.label}
              </Text>
              <Text style={styles.tierPercent}>{item.percentage}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.xs,
  },
  tierButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: Colors.surfaceLight,
  },
  tierLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  tierPercent: {
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
});
