import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  ThoughtFeedItem,
  ThoughtDomain,
  DistortionType,
  TherapeuticTechnique,
  UserState,
  ThoughtEvaluation,
} from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import { Gemini } from '../../core/ai/gemini';
import { EventBus } from '../../core/eventbus/EventBus';
import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Zap,
  Heart,
  Scale,
  Waves,
  ChevronRight,
  PlusCircle,
  BookMarked,
} from 'lucide-react-native';

interface ThoughtStreamScreenProps {
  userState: UserState;
}

export const ThoughtStreamScreen: React.FC<ThoughtStreamScreenProps> = ({ userState }) => {
  const [feed, setFeed] = useState<ThoughtFeedItem[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<ThoughtDomain | 'ALL'>('ALL');
  const [activeSolvingId, setActiveSolvingId] = useState<string | null>(null);

  // Solving State
  const [diagnosedDistortion, setDiagnosedDistortion] = useState<DistortionType | null>(null);
  const [chosenTechnique, setChosenTechnique] = useState<TherapeuticTechnique | null>(null);
  const [userReframe, setUserReframe] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<ThoughtEvaluation | null>(null);

  const domains: { id: ThoughtDomain | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'All Streams' },
    { id: 'WORK_BURNOUT', label: 'Work & Focus' },
    { id: 'PERFECTIONISM', label: 'Perfectionism' },
    { id: 'RELATIONSHIPS', label: 'Relationships' },
    { id: 'HEALTH_ANXIETY', label: 'Health & Calm' },
  ];

  const distortionOptions: { id: DistortionType; label: string }[] = [
    { id: 'ALL_OR_NOTHING', label: 'All-or-Nothing' },
    { id: 'CATASTROPHIZING', label: 'Catastrophizing' },
    { id: 'MIND_READING', label: 'Mind Reading' },
    { id: 'EMOTIONAL_REASONING', label: 'Emotional Reasoning' },
    { id: 'SHOULD_STATEMENTS', label: 'Should Statements' },
    { id: 'PERSONALIZATION', label: 'Personalization' },
  ];

  const techniques: { id: TherapeuticTechnique; label: string; icon: any; color: string; desc: string }[] = [
    {
      id: 'CBT_REALITY_CHECK',
      label: 'CBT Evidence Vault',
      icon: ShieldCheck,
      color: Colors.reframeGold,
      desc: 'Find verifiable factual counter-evidence',
    },
    {
      id: 'CFT_COMPASSION',
      label: 'Compassionate Friend (CFT)',
      icon: Heart,
      color: Colors.compassionPink,
      desc: 'What would you say with kindness to a loved one?',
    },
    {
      id: 'BA_MICRO_ACTION',
      label: 'Behavioral Spark (BA)',
      icon: Zap,
      color: Colors.vitalityGreen,
      desc: 'Convert rumination into a 30-sec physical step',
    },
    {
      id: 'STOIC_CONTROL',
      label: 'Dichotomy of Control',
      icon: Scale,
      color: Colors.clarityMana,
      desc: 'Separate what is within control vs outside it',
    },
    {
      id: 'ACT_DEFUSION',
      label: 'Defusion Stream (ACT)',
      icon: Waves,
      color: Colors.gloomPurple,
      desc: 'Step back: "I notice my mind generating the story that..."',
    },
  ];

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    const items = await Database.getThoughtFeed();
    setFeed(items);
  };

  const handleSummonAiThoughts = async () => {
    setIsGenerating(true);
    try {
      const domainFilter = selectedDomain === 'ALL' ? undefined : selectedDomain;
      const newItems = await Gemini.generateThoughtFeed(3, domainFilter);
      const combined = [...newItems, ...feed];
      setFeed(combined);
      await Database.saveThoughtFeed(combined);
      Alert.alert('✨ New Thoughts Summoned', '3 new realistic cognitive challenges added to your stream.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartSolving = (item: ThoughtFeedItem) => {
    setActiveSolvingId(item.id);
    setDiagnosedDistortion(null);
    setChosenTechnique(null);
    setUserReframe('');
    setEvaluationResult(null);
  };

  const handleEvaluateReframe = async (item: ThoughtFeedItem) => {
    if (!diagnosedDistortion) {
      Alert.alert('Diagnose Distortion', 'Please select which cognitive distortion trap is present in Step 1.');
      return;
    }
    if (!chosenTechnique) {
      Alert.alert('Choose Technique', 'Please pick a therapeutic method to apply in Step 2.');
      return;
    }
    const finalReframe = userReframe.trim() || item.suggestedReframe;

    setIsEvaluating(true);
    try {
      const evalResult = await Gemini.evaluateThoughtReframe(
        item.thought,
        diagnosedDistortion,
        chosenTechnique,
        finalReframe
      );
      setEvaluationResult(evalResult);

      // Mark solved in DB
      await Database.markThoughtSolved(item.id, evalResult.score, finalReframe);

      // Inscribe to Codex
      await Database.addVictoryCodexEntry({
        bossName: 'Cognitive Stream Alchemist',
        thought: item.thought,
        reframe: finalReframe,
      });

      // Reward User State
      const updatedState: UserState = {
        ...userState,
        vitalityPoints: userState.vitalityPoints + evalResult.vpReward,
        clarityMana: userState.clarityMana + evalResult.manaReward,
        sanctuary: {
          ...userState.sanctuary,
          gloomClearingPercentage: Math.min(100, userState.sanctuary.gloomClearingPercentage + 3),
        },
      };
      await Database.saveUserState(updatedState);
      EventBus.emit('quest:completed', { questId: item.id, vpEarned: evalResult.vpReward, manaEarned: evalResult.manaReward });

      await loadFeed();
    } finally {
      setIsEvaluating(false);
    }
  };

  const filteredFeed =
    selectedDomain === 'ALL'
      ? feed
      : feed.filter((item) => item.contextDomain === selectedDomain);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Atmosphere */}
      <View style={styles.headerCard}>
        <View style={styles.headerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <BrainCircuit size={20} color={Colors.clarityMana} />
            <Text style={styles.headerTitle}>The Cognitive Stream</Text>
          </View>
          <TouchableOpacity
            style={styles.summonBtn}
            onPress={handleSummonAiThoughts}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator size="small" color="#0A0A0E" />
            ) : (
              <>
                <Sparkles size={12} color="#0A0A0E" />
                <Text style={styles.summonBtnText}>Summon AI</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>
          Practice diagnosing cognitive distortions & applying CBT, ACT, CFT and Stoic alchemy.
        </Text>

        {/* Domain Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={{ gap: 6, paddingTop: 6 }}
        >
          {domains.map((d) => {
            const isSelected = selectedDomain === d.id;
            return (
              <TouchableOpacity
                key={d.id}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                onPress={() => setSelectedDomain(d.id)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && { color: Colors.clarityMana, fontWeight: '700' },
                  ]}
                >
                  {d.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Feed Stream */}
      {filteredFeed.map((item) => {
        const isSolving = activeSolvingId === item.id;
        return (
          <View key={item.id} style={[styles.card, item.isSolved && styles.cardSolved]}>
            {/* Domain & Status Badge */}
            <View style={styles.cardTopRow}>
              <View style={styles.domainBadge}>
                <Text style={styles.domainBadgeText}>{item.contextDomain.replace('_', ' ')}</Text>
              </View>
              {item.isSolved ? (
                <View style={styles.solvedBadge}>
                  <CheckCircle2 size={12} color={Colors.vitalityGreen} />
                  <Text style={styles.solvedBadgeText}>Alchemized ({item.userScore || 90}%)</Text>
                </View>
              ) : (
                <View style={styles.unsolvedBadge}>
                  <HelpCircle size={12} color={Colors.reframeGold} />
                  <Text style={styles.unsolvedBadgeText}>Trap Detected</Text>
                </View>
              )}
            </View>

            {/* Raw Thought Quote */}
            <Text style={styles.thoughtQuote}>"{item.thought}"</Text>

            {/* Solved Result Display */}
            {item.isSolved && !isSolving && (
              <View style={styles.solvedBox}>
                <Text style={styles.solvedReframeLabel}>Balanced Reframe:</Text>
                <Text style={styles.solvedReframeText}>{item.userReframe || item.suggestedReframe}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                  <BookMarked size={12} color={Colors.vitalityGreen} />
                  <Text style={styles.solvedCodexNote}>Inscribed in your Codex of Wisdom</Text>
                </View>
              </View>
            )}

            {/* Interactive Solve Sheet */}
            {isSolving ? (
              <View style={styles.solveSheet}>
                {/* Step 1: Diagnose Distortion */}
                <Text style={styles.stepHeader}>1. Diagnose Thinking Trap:</Text>
                <View style={styles.optionsGrid}>
                  {distortionOptions.map((dist) => {
                    const isSelected = diagnosedDistortion === dist.id;
                    const isCorrect = item.correctDistortion === dist.id;
                    return (
                      <TouchableOpacity
                        key={dist.id}
                        style={[
                          styles.distortionPill,
                          isSelected && styles.distortionPillActive,
                          evaluationResult && isCorrect && { borderColor: Colors.vitalityGreen },
                        ]}
                        onPress={() => setDiagnosedDistortion(dist.id)}
                      >
                        <Text
                          style={[
                            styles.distortionPillText,
                            isSelected && { color: Colors.reframeGold, fontWeight: '700' },
                          ]}
                        >
                          {dist.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Step 2: Choose Method */}
                <Text style={[styles.stepHeader, { marginTop: Spacing.sm }]}>
                  2. Choose Therapeutic Method:
                </Text>
                <View style={{ gap: 6 }}>
                  {techniques.map((tech) => {
                    const isSelected = chosenTechnique === tech.id;
                    const IconComp = tech.icon;
                    return (
                      <TouchableOpacity
                        key={tech.id}
                        style={[
                          styles.techCard,
                          isSelected && { borderColor: tech.color, backgroundColor: 'rgba(255,255,255,0.06)' },
                        ]}
                        onPress={() => setChosenTechnique(tech.id)}
                      >
                        <IconComp size={16} color={isSelected ? tech.color : Colors.textMuted} />
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.techLabel, isSelected && { color: tech.color, fontWeight: '700' }]}>
                            {tech.label}
                          </Text>
                          <Text style={styles.techDesc}>{tech.desc}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Step 3: Inscribe Reframe */}
                <Text style={[styles.stepHeader, { marginTop: Spacing.sm }]}>
                  3. Inscribe Balanced Reframe:
                </Text>
                <TextInput
                  style={styles.reframeInput}
                  multiline
                  placeholder={item.suggestedReframe}
                  placeholderTextColor={Colors.textMuted}
                  value={userReframe}
                  onChangeText={setUserReframe}
                />

                {/* Evaluation Feedback */}
                {evaluationResult && (
                  <View style={styles.evalBox}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.evalScore}>Clarity Score: {evaluationResult.score}/100</Text>
                      <Text style={styles.evalReward}>+{evaluationResult.vpReward} VP | +{evaluationResult.manaReward} Mana</Text>
                    </View>
                    <Text style={styles.evalFeedback}>{evaluationResult.clinicalFeedback}</Text>
                  </View>
                )}

                {/* Action Buttons */}
                <View style={styles.solveBtnRow}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setActiveSolvingId(null)}>
                    <Text style={styles.cancelBtnText}>Close</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.evaluateBtn}
                    onPress={() => handleEvaluateReframe(item)}
                    disabled={isEvaluating}
                  >
                    {isEvaluating ? (
                      <ActivityIndicator size="small" color="#0A0A0E" />
                    ) : (
                      <>
                        <Sparkles size={14} color="#0A0A0E" />
                        <Text style={styles.evaluateBtnText}>Alchemize with AI</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              !item.isSolved && (
                <TouchableOpacity
                  style={styles.openSolveBtn}
                  onPress={() => handleStartSolving(item)}
                >
                  <Text style={styles.openSolveBtnText}>Apply Therapeutic Alchemy</Text>
                  <ChevronRight size={16} color="#0A0A0E" />
                </TouchableOpacity>
              )
            )}
          </View>
        );
      })}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
  },
  summonBtn: {
    backgroundColor: Colors.clarityMana,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  summonBtnText: {
    color: '#0A0A0E',
    fontSize: 11,
    fontWeight: '700',
  },
  filterScroll: {
    marginTop: Spacing.xs,
  },
  filterChip: {
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    borderColor: Colors.clarityMana,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  filterChipText: {
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
    marginBottom: Spacing.md,
  },
  cardSolved: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: 'rgba(16, 185, 129, 0.03)',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  domainBadge: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  domainBadgeText: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  solvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  solvedBadgeText: {
    color: Colors.vitalityGreen,
    fontSize: 10,
    fontWeight: '600',
  },
  unsolvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  unsolvedBadgeText: {
    color: Colors.reframeGold,
    fontSize: 10,
    fontWeight: '600',
  },
  thoughtQuote: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic',
    lineHeight: 20,
    marginVertical: Spacing.xs,
  },
  openSolveBtn: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
    marginTop: Spacing.sm,
  },
  openSolveBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 12,
  },
  solveSheet: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  stepHeader: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  distortionPill: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  distortionPillActive: {
    borderColor: Colors.reframeGold,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  distortionPillText: {
    color: Colors.textPrimary,
    fontSize: 11,
  },
  techCard: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  techLabel: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  techDesc: {
    color: Colors.textMuted,
    fontSize: 10,
  },
  reframeInput: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: Spacing.sm,
    color: Colors.textPrimary,
    fontSize: 12,
    minHeight: 60,
  },
  evalBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1,
    borderColor: Colors.vitalityGreen,
    borderRadius: 8,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
    gap: 4,
  },
  evalScore: {
    color: Colors.vitalityGreen,
    fontSize: 12,
    fontWeight: '700',
  },
  evalReward: {
    color: Colors.reframeGold,
    fontSize: 11,
    fontWeight: '600',
  },
  evalFeedback: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  solveBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.surfaceLight,
  },
  cancelBtnText: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  evaluateBtn: {
    flex: 1,
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  evaluateBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 12,
  },
  solvedBox: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.sm,
    borderRadius: 8,
    marginTop: Spacing.xs,
  },
  solvedReframeLabel: {
    color: Colors.vitalityGreen,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  solvedReframeText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 16,
  },
  solvedCodexNote: {
    color: Colors.textMuted,
    fontSize: 10,
  },
});
