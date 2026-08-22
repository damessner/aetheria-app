// Theme tokens for Aetheria: The Cognitive Quest

export const Colors = {
  // Dark Astral Palette
  background: '#0A0A0E',
  surface: '#12131A',
  surfaceLight: '#1C1D27',
  surfaceHighlight: '#272938',
  border: '#2A2C3D',
  
  // Text
  textPrimary: '#F1F3FB',
  textSecondary: '#A2A5B8',
  textMuted: '#686B80',
  
  // Vitality & Mana Accents
  vitalityGreen: '#10B981',
  vitalityGreenGlow: 'rgba(16, 185, 129, 0.25)',
  clarityMana: '#38BDF8',
  clarityManaGlow: 'rgba(56, 189, 248, 0.25)',
  
  // Cognitive Battler Colors
  logicBlue: '#60A5FA',
  compassionPink: '#F472B6',
  reframeGold: '#FBBF24',
  dangerRed: '#F43F5E',
  distortionRed: '#F43F5E',
  shieldCyan: '#2DD4BF',
  
  // Biomes
  gloomPurple: '#8B5CF6',
  celestialIndigo: '#6366F1',
  
  // Circadian Warm (Night-Owl Low Blue Light Mode)
  circadianWarm: '#F59E0B',
  circadianBackground: '#060608',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  titleLarge: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },
  titleMedium: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  bodyLarge: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    color: Colors.textMuted,
  },
};
