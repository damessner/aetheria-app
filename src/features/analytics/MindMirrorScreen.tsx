import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { DistortionType, UserState, SchemaArchetype, LifeValuePillar } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import { EventBus } from '../../core/eventbus/EventBus';
import {
  Sparkles,
  Eye,
  BarChart3,
  HeartHandshake,
  Shield,
  Layers,
  Compass,
  Star,
  Zap,
  CheckCircle2,
} from 'lucide-react-native';

interface MindMirrorScreenProps {
  userState: UserState;
}

export const MindMirrorScreen: React.FC<MindMirrorScreenProps> = ({ userState }) => {
  const [analytics, setAnalytics] = useState<{
    distribution: Record<DistortionType, number>;
    totalReframed: number;
    topDistortion: DistortionType;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'DISTORTIONS' | 'SCHEMAS' | 'VALUES'>('DISTORTIONS');

  const schemas: SchemaArchetype[] = [
    {
      id: 'sch_perfectionism',
      name: 'The Unrelenting Perfectionist',
      title: 'Unrelenting Standards Schema',
      maladaptiveBelief: 'I am only worthy and safe if everything I produce is flawless.',
      healthyTruth: 'My human worth is inherent. Progress, curiosity, and recovery from errors are true mastery.',
      originContext: 'Often develops from early praise contingent solely on achievement.',
      antidoteTechnique: 'The "Good Enough" 80% Shield & Albert Ellis Preference Reframing.',
    },
    {
      id: 'sch_vulnerability',
      name: 'The Vigilant Sentinel',
      title: 'Vulnerability to Harm Schema',
      maladaptiveBelief: 'Disaster is always looming just around the corner, and I will not survive it.',
      healthyTruth: 'Life has uncertainties, but I possess inner resilience and somatic tools to handle challenges.',
      originContext: 'Often forms after unexpected crises or growing up in hyper-vigilant environments.',
      antidoteTechnique: 'Decatastrophizing Matrix & 4-4-6 Somatic Vagus Reset.',
    },
    {
      id: 'sch_subjugation',
      name: 'The Selfless Caretaker',
      title: 'Subjugation & Self-Sacrifice Schema',
      maladaptiveBelief: 'My needs must always come last. Saying no will make people reject me.',
      healthyTruth: 'Self-compassion is not selfish; it is the foundation of sustainable care and authentic connection.',
      originContext: 'Formed from having to manage the emotional climate of caregivers early in life.',
      antidoteTechnique: 'Compassionate Boundary Shields & Assertive Micro-Steps.',
    },
  ];

  const valuePillars: LifeValuePillar[] = [
    {
      id: 'CONNECTION',
      title: 'Connection & Love',
      subtitle: 'Authentic presence, empathy, and vulnerability with loved ones.',
      color: Colors.compassionPink,
      iconName: 'Heart',
      starResonance: userState.valuesAlignment?.CONNECTION || 35,
    },
    {
      id: 'CRAFT',
      title: 'Craft & Mastery',
      subtitle: 'Deep focus, meaningful creation, and deliberate skill refinement.',
      color: Colors.clarityMana,
      iconName: 'Sparkles',
      starResonance: userState.valuesAlignment?.CRAFT || 55,
    },
    {
      id: 'VITALITY',
      title: 'Vitality & Body',
      subtitle: 'Circadian sleep rhythm, mindful movement, and somatic health.',
      color: Colors.vitalityGreen,
      iconName: 'Zap',
      starResonance: userState.valuesAlignment?.VITALITY || 60,
    },
    {
      id: 'WONDER',
      title: 'Play & Wonder',
      subtitle: 'Curiosity, awe, philosophical inquiry, and unstructured joy.',
      color: Colors.reframeGold,
      iconName: 'Star',
      starResonance: userState.valuesAlignment?.WONDER || 40,
    },
  ];

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    const data = await Database.getDistortionAnalytics();
    setAnalytics(data);
  };

  const handleSparkValue = async (pillarId: LifeValuePillar['id']) => {
    await Database.updateValuesAlignment(pillarId, 10);
    EventBus.emit('quest:completed', { questId: `val_${pillarId}`, vpEarned: 20, manaEarned: 1 });
    Alert.alert(
      '✨ Constellation Illuminated!',
      `You aligned an action with ${pillarId}.\n+10% Star Resonance, +20 VP.`
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Mind Mirror Header */}
      <View style={styles.headerCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Eye size={22} color={Colors.clarityMana} />
          <Text style={styles.headerTitle}>The Mind Mirror</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Deep psychological self-understanding: personal distortion fingerprints, schema archetypes, and ACT values constellations.
        </Text>

        {/* Sub-Tab Switcher */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'DISTORTIONS' && styles.tabBtnActive]}
            onPress={() => setActiveTab('DISTORTIONS')}
          >
            <BarChart3 size={14} color={activeTab === 'DISTORTIONS' ? Colors.clarityMana : Colors.textMuted} />
            <Text style={[styles.tabBtnText, activeTab === 'DISTORTIONS' && { color: Colors.clarityMana, fontWeight: '700' }]}>
              Distortions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'SCHEMAS' && styles.tabBtnActive]}
            onPress={() => setActiveTab('SCHEMAS')}
          >
            <Layers size={14} color={activeTab === 'SCHEMAS' ? Colors.reframeGold : Colors.textMuted} />
            <Text style={[styles.tabBtnText, activeTab === 'SCHEMAS' && { color: Colors.reframeGold, fontWeight: '700' }]}>
              Schemas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'VALUES' && styles.tabBtnActive]}
            onPress={() => setActiveTab('VALUES')}
          >
            <Compass size={14} color={activeTab === 'VALUES' ? Colors.vitalityGreen : Colors.textMuted} />
            <Text style={[styles.tabBtnText, activeTab === 'VALUES' && { color: Colors.vitalityGreen, fontWeight: '700' }]}>
              Values Sky
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 1. DISTORTION FINGERPRINT & HEATMAP */}
      {activeTab === 'DISTORTIONS' && analytics && (
        <View style={{ gap: Spacing.md }}>
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm }}>
              <Text style={styles.cardTitle}>Cognitive Distortion Heatmap</Text>
              <Text style={styles.totalBadge}>{analytics.totalReframed} Thoughts Alchemized</Text>
            </View>
            <Text style={styles.cardSubtitle}>
              Primary Vulnerability Trap:{' '}
              <Text style={{ color: Colors.reframeGold, fontWeight: '700' }}>
                {analytics.topDistortion.replace('_', ' ')}
              </Text>
            </Text>

            {/* Distribution Bars */}
            <View style={{ gap: 10, marginTop: Spacing.md }}>
              {Object.entries(analytics.distribution).map(([distortion, count]) => {
                const total = Math.max(1, Object.values(analytics.distribution).reduce((a, b) => a + b, 0));
                const percentage = Math.round((count / total) * 100);
                return (
                  <View key={distortion}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text style={styles.distLabel}>{distortion.replace('_', ' ')}</Text>
                      <Text style={styles.distValue}>{count} ({percentage}%)</Text>
                    </View>
                    <View style={styles.barBg}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            width: `${percentage}%`,
                            backgroundColor:
                              distortion === analytics.topDistortion
                                ? Colors.reframeGold
                                : Colors.clarityMana,
                          },
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Energy Correlation Insight Box */}
          <View style={styles.insightBox}>
            <Zap size={18} color={Colors.reframeGold} />
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>Circadian Energy Correlation</Text>
              <Text style={styles.insightText}>
                During 10% Low Spark energy periods, catastrophic thinking probability increases by 2.4x. Activating the 4-4-6 breath pacer or a 30-sec micro-step resolves 78% of acute spirals.
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* 2. SCHEMA ARCHETYPES (YOUNG'S SCHEMA THERAPY) */}
      {activeTab === 'SCHEMAS' && (
        <View style={{ gap: Spacing.md }}>
          {schemas.map((schema) => (
            <View key={schema.id} style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Text style={styles.schemaTitle}>{schema.name}</Text>
                <Shield size={16} color={Colors.reframeGold} />
              </View>
              <Text style={styles.schemaSubtitle}>{schema.title}</Text>

              {/* Belief Comparison */}
              <View style={styles.schemaComparison}>
                <View style={styles.maladaptiveBox}>
                  <Text style={styles.boxTagRed}>Survival Rule (Old Schema):</Text>
                  <Text style={styles.maladaptiveText}>"{schema.maladaptiveBelief}"</Text>
                </View>

                <View style={styles.healthyBox}>
                  <Text style={styles.boxTagGreen}>Healthy Adult Reframe:</Text>
                  <Text style={styles.healthyText}>"{schema.healthyTruth}"</Text>
                </View>
              </View>

              {/* Antidote */}
              <View style={styles.antidoteRow}>
                <Sparkles size={12} color={Colors.clarityMana} />
                <Text style={styles.antidoteText}>
                  <Text style={{ fontWeight: '700' }}>Clinical Antidote: </Text>
                  {schema.antidoteTechnique}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* 3. ACT VALUES CONSTELLATIONS */}
      {activeTab === 'VALUES' && (
        <View style={{ gap: Spacing.md }}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Values Constellation Alignment</Text>
            <Text style={styles.cardSubtitle}>
              In Acceptance & Commitment Therapy (ACT), psychological vitality comes from moving toward chosen life values rather than avoiding discomfort.
            </Text>

            {/* Constellation Pillars */}
            <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
              {valuePillars.map((pillar) => (
                <View key={pillar.id} style={styles.pillarCard}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Star size={16} color={pillar.color} />
                      <Text style={[styles.pillarTitle, { color: pillar.color }]}>{pillar.title}</Text>
                    </View>
                    <Text style={[styles.resonancePercent, { color: pillar.color }]}>
                      {pillar.starResonance}% Luminous
                    </Text>
                  </View>
                  <Text style={styles.pillarSubtitle}>{pillar.subtitle}</Text>

                  {/* Constellation Progress Bar */}
                  <View style={styles.barBg}>
                    <View
                      style={[
                        styles.barFill,
                        { width: `${pillar.starResonance}%`, backgroundColor: pillar.color },
                      ]}
                    />
                  </View>

                  <TouchableOpacity
                    style={[styles.sparkBtn, { borderColor: pillar.color }]}
                    onPress={() => handleSparkValue(pillar.id)}
                  >
                    <Sparkles size={12} color={pillar.color} />
                    <Text style={[styles.sparkBtnText, { color: pillar.color }]}>
                      Nurture Alignment (+20 VP)
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
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
  },
  headerCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: Spacing.sm,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: Spacing.xs,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  tabBtnActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: Colors.textPrimary,
  },
  tabBtnText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
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
    fontSize: 15,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  totalBadge: {
    backgroundColor: Colors.surfaceLight,
    color: Colors.vitalityGreen,
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  distLabel: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '500',
  },
  distValue: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  barBg: {
    height: 6,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  insightBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
    borderWidth: 1,
    borderColor: Colors.reframeGold,
    borderRadius: 12,
    padding: Spacing.md,
    gap: 10,
  },
  insightTitle: {
    color: Colors.reframeGold,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  insightText: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  schemaTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  schemaSubtitle: {
    color: Colors.textMuted,
    fontSize: 11,
    marginBottom: Spacing.sm,
  },
  schemaComparison: {
    gap: 8,
    marginVertical: Spacing.xs,
  },
  maladaptiveBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 8,
    padding: Spacing.sm,
  },
  boxTagRed: {
    color: Colors.distortionRed,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 2,
  },
  maladaptiveText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontStyle: 'italic',
  },
  healthyBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: 8,
    padding: Spacing.sm,
  },
  boxTagGreen: {
    color: Colors.vitalityGreen,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 2,
  },
  healthyText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 16,
  },
  antidoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.sm,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  antidoteText: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  pillarCard: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 10,
    padding: Spacing.md,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillarTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  pillarSubtitle: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  resonancePercent: {
    fontSize: 11,
    fontWeight: '700',
  },
  sparkBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
    marginTop: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  sparkBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
