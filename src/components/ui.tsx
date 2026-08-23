import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Colors, Spacing } from '../core/theme';

/* -------------------------------------------------------------------------- */
/*  SectionCard — the standard bordered surface container used across screens */
/* -------------------------------------------------------------------------- */

interface SectionCardProps {
  children: React.ReactNode;
  /** Accent border + tinted background (uses theme token name) */
  accent?: 'gold' | 'cyan' | 'green' | 'red' | 'none';
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const ACCENTS: Record<string, { border: string; bg: string }> = {
  gold: { border: 'rgba(251, 191, 36, 0.5)', bg: 'rgba(251, 191, 36, 0.08)' },
  cyan: { border: 'rgba(56, 189, 248, 0.5)', bg: 'rgba(56, 189, 248, 0.08)' },
  green: { border: 'rgba(16, 185, 129, 0.4)', bg: 'rgba(16, 185, 129, 0.05)' },
  red: { border: 'rgba(244, 63, 94, 0.5)', bg: 'rgba(244, 63, 94, 0.08)' },
  none: { border: Colors.border, bg: Colors.surface },
};

export const SectionCard: React.FC<SectionCardProps> = ({
  children,
  accent = 'none',
  style,
  onPress,
}) => {
  const tokens = ACCENTS[accent] ?? ACCENTS.none;
  const cardStyle = [
    styles.card,
    { borderColor: tokens.border, backgroundColor: tokens.bg },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={cardStyle}>{children}</View>;
};

/* ---------------------------------------------------------------------------- */
/*  ScreenHeader — title + optional subtitle with an icon, used atop every screen */
/* ---------------------------------------------------------------------------- */

interface ScreenHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any; // LucideIcon or compatible component
  title: string;
  subtitle?: string;
  /** Right-aligned action element (e.g. sync button) */
  rightAction?: React.ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
  rightAction,
}) => (
  <SectionCard style={styles.headerCard}>
    <View style={styles.headerRow}>
      <View style={styles.headerTextContainer}>
        <View style={styles.headerTitleRow}>
          <Icon size={20} color={Colors.reframeGold} />
          <Text style={styles.headerTitle} numberOfLines={2}>
            {title}
          </Text>
        </View>
        {subtitle ? (
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
      {rightAction}
    </View>
  </SectionCard>
);

/* ------------------------------------------------------------------------------ */
/*  StatChip — small labeled value pill for stats (VP, Mana, streaks, percentages) */
/* ------------------------------------------------------------------------------ */

interface StatChipProps {
  label: string;
  value: string | number;
  color?: string;
}

export const StatChip: React.FC<StatChipProps> = ({ label, value, color = Colors.reframeGold }) => (
  <View style={[styles.chip, { borderColor: `${color}55` }]}>
    <Text style={[styles.chipValue, { color }]}>{value}</Text>
    <Text style={styles.chipLabel}>{label}</Text>
  </View>
);

/* --------------------------------------------------------------------------------- */
/*  PrimaryButton — the filled call-to-action button pattern (quiz submits, rewards) */
/* --------------------------------------------------------------------------------- */

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'gold' | 'green' | 'cyan' | 'ghost';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any; // LucideIcon or compatible component
}

const BUTTON_BG: Record<string, string> = {
  gold: Colors.reframeGold,
  green: Colors.vitalityGreen,
  cyan: Colors.clarityMana,
  ghost: 'transparent',
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  disabled,
  variant = 'gold',
  icon: Icon,
}) => {
  const bg = BUTTON_BG[variant] ?? BUTTON_BG.gold;
  const isGhost = variant === 'ghost';
  return (
    <TouchableOpacity
      style={[
        styles.button,
        !isGhost && { backgroundColor: bg },
        isGhost && styles.buttonGhost,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {Icon ? <Icon size={16} color={isGhost ? Colors.textPrimary : '#0A0A0E'} /> : null}
      <Text
        style={[
          styles.buttonLabel,
          isGhost && { color: Colors.textPrimary },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

/* ------------------------------------ Styles ----------------------------------- */

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerCard: {
    marginBottom: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTextContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 1,
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  chip: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: Colors.surfaceLight,
    minWidth: 64,
  },
  chipValue: {
    fontSize: 14,
    fontWeight: '800',
  },
  chipLabel: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderRadius: 12,
  },
  buttonGhost: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonLabel: {
    color: '#0A0A0E',
    fontSize: 13,
    fontWeight: '700',
  },
});
