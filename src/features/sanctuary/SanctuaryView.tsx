import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SanctuaryState, UserState } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Trees, Shield, Sparkles, Zap, Heart, Moon, Sun, Feather, Eye, Flame } from 'lucide-react-native';

interface SanctuaryViewProps {
  userState: UserState;
  onCompanionSelect: (companionId: 'PYRA_FOX' | 'KAEL_OWL' | 'LIORA_NYMPH') => void;
}

export const SanctuaryView: React.FC<SanctuaryViewProps> = ({ userState, onCompanionSelect }) => {
  const { sanctuary } = userState;
  const activeCompanion = sanctuary.companions.find((c) => c.isActive) || sanctuary.companions[0];

  const getBiomeName = () => {
    switch (sanctuary.currentBiomeId) {
      case 'GLOOMSPIRE_GROVE':
        return 'Gloomspire Grove (Week 1-2)';
      case 'SHATTERED_OBELISK':
        return 'The Shattered Obelisk (Week 3-4)';
      case 'CELESTIAL_BEACON':
        return 'The Celestial Beacon (Week 5-6)';
    }
  };

  const getCompanionQuote = () => {
    switch (activeCompanion.id) {
      case 'KAEL_OWL':
        return '“Examine your automatic thoughts through the lens of empirical evidence, traveler.”';
      case 'PYRA_FOX':
        return '“A single tiny step sparks the flame of momentum. Start with the smallest win!”';
      case 'LIORA_NYMPH':
        return '“Breathe deeply. Your nervous system is safe; grant yourself permission to rest.”';
    }
  };

  return (
    <View style={styles.container}>
      {/* Realm Atmosphere Card */}
      <View style={styles.realmCard}>
        <View style={styles.realmHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.realmTag}>Living Sanctuary Realm</Text>
            <Text style={styles.realmTitle}>{getBiomeName()}</Text>
          </View>
          <View style={styles.circadianBadge}>
            <Moon size={12} color={Colors.reframeGold} />
            <Text style={styles.circadianText}>Astral Dusk</Text>
          </View>
        </View>

        {/* Gloom Cleared Progress Bar */}
        <View style={styles.gloomProgressSection}>
          <View style={styles.gloomLabelRow}>
            <Text style={styles.gloomLabel}>Gloom Cleared / Clarity Restored</Text>
            <Text style={styles.gloomPercent}>{sanctuary.gloomClearingPercentage.toFixed(1)}%</Text>
          </View>
          <View style={styles.gloomTrack}>
            <View
              style={[
                styles.gloomFill,
                { width: `${Math.min(100, sanctuary.gloomClearingPercentage)}%` },
              ]}
            />
          </View>
        </View>

        {/* Sanctuary Quick Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statPill, { borderColor: 'rgba(251, 191, 36, 0.4)' }]}>
            <Flame size={14} color={Colors.reframeGold} />
            <Text style={[styles.statPillText, { color: Colors.reframeGold, fontWeight: '700' }]}>
              {userState.streakData?.currentStreak || 1}d Flame ({userState.streakData?.multiplier || 1.0}x)
            </Text>
          </View>
          <View style={styles.statPill}>
            <Heart size={14} color={Colors.vitalityGreen} />
            <Text style={styles.statPillText}>{userState.vitalityPoints} VP</Text>
          </View>
          <View style={styles.statPill}>
            <Zap size={14} color={Colors.clarityMana} />
            <Text style={styles.statPillText}>{userState.clarityMana} Mana</Text>
          </View>
          <View style={styles.statPill}>
            <Shield size={14} color={Colors.shieldCyan} />
            <Text style={styles.statPillText}>{userState.restShields} Shields</Text>
          </View>
        </View>
      </View>

      {/* Active Companion Totem Dialogue */}
      <View style={styles.companionCard}>
        <View style={styles.companionHeader}>
          <Feather size={16} color={Colors.reframeGold} />
          <Text style={styles.companionName}>{activeCompanion.name}</Text>
          <Text style={styles.companionAffinity}>Lvl {activeCompanion.affinityLevel}</Text>
        </View>

        <Text style={styles.companionQuote}>{getCompanionQuote()}</Text>

        {/* Companion Selector Tabs */}
        <View style={styles.totemRow}>
          {sanctuary.companions.map((comp) => {
            const isSelected = comp.id === activeCompanion.id;
            return (
              <TouchableOpacity
                key={comp.id}
                style={[styles.totemBtn, isSelected && styles.totemBtnActive]}
                onPress={() => onCompanionSelect(comp.id)}
              >
                <Text style={[styles.totemBtnText, isSelected && styles.totemBtnTextActive]}>
                  {comp.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  realmCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  realmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  realmTag: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  realmTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  circadianBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  circadianText: {
    color: Colors.reframeGold,
    fontSize: 10,
    fontWeight: '600',
  },
  gloomProgressSection: {
    marginVertical: Spacing.xs,
  },
  gloomLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  gloomLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  gloomPercent: {
    color: Colors.vitalityGreen,
    fontSize: 11,
    fontWeight: '700',
  },
  gloomTrack: {
    height: 8,
    backgroundColor: Colors.surfaceHighlight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  gloomFill: {
    height: '100%',
    backgroundColor: Colors.vitalityGreen,
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: Spacing.sm,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  statPillText: {
    color: Colors.textPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
  companionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  companionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  companionName: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  companionAffinity: {
    color: Colors.reframeGold,
    fontSize: 11,
    fontWeight: '700',
  },
  companionQuote: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 17,
    marginVertical: Spacing.xs,
  },
  totemRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: Spacing.xs,
  },
  totemBtn: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  totemBtnActive: {
    borderColor: Colors.reframeGold,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  totemBtnText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  totemBtnTextActive: {
    color: Colors.reframeGold,
  },
});
