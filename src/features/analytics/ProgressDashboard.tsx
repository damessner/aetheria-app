import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { UserState, AchievementBadge, DistortionType } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import { AchievementService } from '../../core/achievements/AchievementService';
import { StreakService } from '../../core/streak/StreakService';
import { EventBus } from '../../core/eventbus/EventBus';
import {
  BarChart3,
  TrendingUp,
  Sparkles,
  Award,
  Shield,
  Flame,
  Heart,
  Scale,
  Zap,
  Wind,
  CheckCircle2,
  Lock,
  Compass,
  Layers,
  Moon,
  Eye,
  BookOpen,
} from 'lucide-react-native';

interface ProgressDashboardProps {
  userState: UserState;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userState }) => {
  const [achievements, setAchievements] = useState<AchievementBadge[]>([]);
  const [analytics, setAnalytics] = useState<{
    distribution: Record<DistortionType, number>;
    totalReframed: number;
    topDistortion: DistortionType;
  } | null>(null);

  useEffect(() => {
    loadData();
  }, [userState]);

  const loadData = async () => {
    const thoughts = await Database.getThoughtFeed();
    const scrolls = await Database.getWisdomScrolls();
    const distData = await Database.getDistortionAnalytics();
    const badges = AchievementService.evaluateAchievements(userState, thoughts, scrolls);
    setAchievements(badges);
    setAnalytics(distData);
  };

  const handleClaimReward = async (badge: AchievementBadge) => {
    if (!badge.isUnlocked) return;
    const unlockedIds = userState.unlockedAchievementIds || [];
    if (unlockedIds.includes(badge.id)) {
      Alert.alert('Already Claimed', 'You have already collected the reward for this achievement.');
      return;
    }

    const updatedState: UserState = {
      ...userState,
      vitalityPoints: userState.vitalityPoints + badge.rewardVp,
      unlockedAchievementIds: [...unlockedIds, badge.id],
    };

    await Database.saveUserState(updatedState);
    EventBus.emit('quest:completed', {
      questId: badge.id,
      vpEarned: badge.rewardVp,
      manaEarned: 2,
    });

    Alert.alert('🏆 Trophy Claimed!', `+${badge.rewardVp} Vitality Points added to your sanctuary!`);
    await loadData();
  };

  const streak = userState.streakData || {
    currentStreak: 1,
    bestStreak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    freezeShieldsAvailable: 2,
    multiplier: 1.0,
    weeklyActivity: StreakService.getInitialWeeklyActivity(),
  };

  const virtues = userState.cardinalVirtues || {
    courage: 35,
    integrity: 40,
    temperance: 30,
    humility: 45,
  };

  const maxVpInWeek = Math.max(1, ...streak.weeklyActivity.map((w) => w.vpEarned));

  const getVirtueTitle = (level: number) => {
    if (level >= 75) return 'Sovereign Master';
    if (level >= 50) return 'Adept Guardian';
    if (level >= 25) return 'Earnest Disciple';
    return 'Novice Initiate';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Streak & Multiplier Banner */}
      <View style={styles.streakBanner}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={styles.flameIconBox}>
            <Flame size={24} color="#0A0A0E" />
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.streakNumber}>{streak.currentStreak} Day Flame</Text>
              <View style={styles.multiplierBadge}>
                <Text style={styles.multiplierText}>{streak.multiplier}x VP Boost</Text>
              </View>
            </View>
            <Text style={styles.streakSubtext}>
              Best: {streak.bestStreak} days • 🛡️ {streak.freezeShieldsAvailable} Grace Shields left
            </Text>
          </View>
        </View>
      </View>

      {/* 1. WEEKLY VITALITY & ACTIVITY BAR CHART */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <TrendingUp size={16} color={Colors.vitalityGreen} />
            <Text style={styles.cardTitle}>7-Day Vitality Trajectory</Text>
          </View>
          <Text style={styles.chartLegend}>VP Earned / Day</Text>
        </View>

        {/* Visual Bar Chart */}
        <View style={styles.chartContainer}>
          {streak.weeklyActivity.map((day, idx) => {
            const heightPercent = Math.min(100, Math.max(15, Math.round((day.vpEarned / maxVpInWeek) * 100)));
            const isToday = idx === streak.weeklyActivity.length - 1;

            return (
              <View key={day.dateStr} style={styles.barColumn}>
                <Text style={styles.barValueText}>{day.vpEarned}</Text>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barGraphic,
                      {
                        height: `${heightPercent}%`,
                        backgroundColor: isToday ? Colors.reframeGold : Colors.vitalityGreen,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.barDayText, isToday && styles.barDayToday]}>
                  {day.dayOfWeek}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* 2. 4 CARDINAL VIRTUES MATRIX */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Shield size={16} color={Colors.reframeGold} />
            <Text style={styles.cardTitle}>4 Cardinal Virtues Matrix</Text>
          </View>
          <Text style={styles.chartLegend}>Stoic Mastery</Text>
        </View>

        <View style={styles.virtuesGrid}>
          {[
            { name: 'Courage', val: virtues.courage, color: Colors.distortionRed, desc: 'Facing truth & discomfort' },
            { name: 'Integrity', val: virtues.integrity, color: Colors.clarityMana, desc: 'Radical self-ownership' },
            { name: 'Temperance', val: virtues.temperance, color: Colors.vitalityGreen, desc: 'Mastery over impulse' },
            { name: 'Humility', val: virtues.humility, color: Colors.reframeGold, desc: 'Ego surrender & repair' },
          ].map((v) => (
            <View key={v.name} style={styles.virtueCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Text style={styles.virtueName}>{v.name}</Text>
                <Text style={[styles.virtuePercent, { color: v.color }]}>{v.val}%</Text>
              </View>
              <Text style={styles.virtueTitle}>{getVirtueTitle(v.val)}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${v.val}%`, backgroundColor: v.color }]} />
              </View>
              <Text style={styles.virtueDesc}>{v.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 3. SANCTUARY BIOME EVOLUTION GAUGE */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Sparkles size={16} color={Colors.clarityMana} />
            <Text style={styles.cardTitle}>Sanctuary Biome Metamorphosis</Text>
          </View>
          <Text style={styles.biomeBadge}>{userState.sanctuary.currentBiomeId.replace(/_/g, ' ')}</Text>
        </View>

        <View style={{ marginVertical: Spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={styles.biomeProgressText}>Gloom Dispersal Progress</Text>
            <Text style={styles.biomePercentText}>{userState.sanctuary.gloomClearingPercentage}%</Text>
          </View>
          <View style={styles.biomeTrack}>
            <View
              style={[
                styles.biomeFill,
                { width: `${Math.max(5, userState.sanctuary.gloomClearingPercentage)}%` },
              ]}
            />
          </View>
        </View>
        <Text style={styles.biomeSubtext}>
          Every reframed thought and completed quest clears the miasma, unlocking celestial flora and ancestral guardian spirits.
        </Text>
      </View>

      {/* 4. ACHIEVEMENTS & TROPHIES GALLERY */}
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Award size={16} color={Colors.reframeGold} />
            <Text style={styles.cardTitle}>Alchemical Trophies & Badges</Text>
          </View>
          <Text style={styles.chartLegend}>
            {achievements.filter((a) => a.isUnlocked).length}/{achievements.length} Unlocked
          </Text>
        </View>

        <View style={{ gap: Spacing.sm }}>
          {achievements.map((badge) => {
            const isClaimed = (userState.unlockedAchievementIds || []).includes(badge.id);
            const progressPercent = Math.round((badge.currentProgress / badge.maxProgress) * 100);

            return (
              <View
                key={badge.id}
                style={[
                  styles.badgeCard,
                  badge.isUnlocked && styles.badgeCardUnlocked,
                  isClaimed && styles.badgeCardClaimed,
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                  <View style={[styles.badgeIconBox, { borderColor: badge.color }]}>
                    {badge.isUnlocked ? (
                      <Award size={20} color={badge.color} />
                    ) : (
                      <Lock size={18} color={Colors.textMuted} />
                    )}
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <Text style={styles.badgeTitle}>{badge.title}</Text>
                      <View style={[styles.tierTag, { backgroundColor: `${badge.color}20` }]}>
                        <Text style={[styles.tierText, { color: badge.color }]}>{badge.tier}</Text>
                      </View>
                    </View>
                    <Text style={styles.badgeDesc}>{badge.description}</Text>

                    {/* Progress Bar */}
                    <View style={{ marginVertical: 6 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                        <Text style={styles.badgeProgressLabel}>
                          {badge.currentProgress} / {badge.maxProgress}
                        </Text>
                        <Text style={styles.badgeProgressLabel}>{progressPercent}%</Text>
                      </View>
                      <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: badge.color }]} />
                      </View>
                    </View>

                    {/* Claim Button */}
                    {badge.isUnlocked && !isClaimed && (
                      <TouchableOpacity
                        style={styles.claimBtn}
                        onPress={() => handleClaimReward(badge)}
                      >
                        <Sparkles size={12} color="#0A0A0E" />
                        <Text style={styles.claimBtnText}>Claim +{badge.rewardVp} VP Reward</Text>
                      </TouchableOpacity>
                    )}

                    {isClaimed && (
                      <View style={styles.claimedBadge}>
                        <CheckCircle2 size={12} color={Colors.vitalityGreen} />
                        <Text style={styles.claimedText}>Reward Claimed (+{badge.rewardVp} VP)</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  streakBanner: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  flameIconBox: {
    backgroundColor: Colors.reframeGold,
    padding: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakNumber: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  multiplierBadge: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    borderWidth: 1,
    borderColor: Colors.reframeGold,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  multiplierText: {
    color: Colors.reframeGold,
    fontSize: 10,
    fontWeight: '700',
  },
  streakSubtext: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  chartLegend: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    gap: 4,
  },
  barValueText: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '600',
  },
  barTrack: {
    width: 14,
    height: 70,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 7,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barGraphic: {
    width: '100%',
    borderRadius: 7,
  },
  barDayText: {
    color: Colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  barDayToday: {
    color: Colors.reframeGold,
    fontWeight: '800',
  },
  virtuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: Spacing.xs,
  },
  virtueCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.sm,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  virtueName: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  virtuePercent: {
    fontSize: 12,
    fontWeight: '800',
  },
  virtueTitle: {
    color: Colors.textMuted,
    fontSize: 10,
    marginBottom: 6,
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.surface,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  virtueDesc: {
    color: Colors.textMuted,
    fontSize: 9,
    marginTop: 4,
  },
  biomeBadge: {
    color: Colors.clarityMana,
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  biomeProgressText: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  biomePercentText: {
    color: Colors.clarityMana,
    fontSize: 11,
    fontWeight: '700',
  },
  biomeTrack: {
    height: 8,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  biomeFill: {
    height: '100%',
    backgroundColor: Colors.clarityMana,
    borderRadius: 4,
  },
  biomeSubtext: {
    color: Colors.textMuted,
    fontSize: 10,
    lineHeight: 14,
  },
  badgeCard: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.sm,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badgeCardUnlocked: {
    borderColor: 'rgba(251, 191, 36, 0.4)',
    backgroundColor: 'rgba(251, 191, 36, 0.03)',
  },
  badgeCardClaimed: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: 'rgba(16, 185, 129, 0.03)',
  },
  badgeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  badgeTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  tierTag: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  tierText: {
    fontSize: 9,
    fontWeight: '700',
  },
  badgeDesc: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  badgeProgressLabel: {
    color: Colors.textMuted,
    fontSize: 10,
  },
  claimBtn: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
    marginTop: 4,
  },
  claimBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 11,
  },
  claimedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  claimedText: {
    color: Colors.vitalityGreen,
    fontSize: 10,
    fontWeight: '600',
  },
});
