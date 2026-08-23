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
  ReframeChoice,
} from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import { Gemini } from '../../core/ai/gemini';
import { EventBus } from '../../core/eventbus/EventBus';
import { MethodCodexModal, METHOD_CODEX_REGISTRY } from '../methods/MethodCodexModal';
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
  BookOpen,
  Info,
  Wind,
  Layers,
  AlertCircle,
  ArrowRight,
  PenTool,
} from 'lucide-react-native';

interface ThoughtStreamScreenProps {
  userState: UserState;
}

export const ThoughtStreamScreen: React.FC<ThoughtStreamScreenProps> = ({ userState }) => {
  const [feed, setFeed] = useState<ThoughtFeedItem[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<ThoughtDomain | 'ALL'>('ALL');
  const [activeSolvingId, setActiveSolvingId] = useState<string | null>(null);

  // Solving Quiz State
  const [diagnosedDistortion, setDiagnosedDistortion] = useState<DistortionType | null>(null);
  const [chosenTechnique, setChosenTechnique] = useState<TherapeuticTechnique | null>(null);
  const [selectedReframeChoice, setSelectedReframeChoice] = useState<ReframeChoice | null>(null);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [userCustomReframe, setUserCustomReframe] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<ThoughtEvaluation | null>(null);

  // Method Codex Modal State
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [codexInitialMethod, setCodexInitialMethod] = useState<TherapeuticTechnique>('CBT_REALITY_CHECK');

  const domains: { id: ThoughtDomain | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'All Streams' },
    { id: 'FATHERHOOD_PARENTING', label: '👨‍👧 Fatherhood & Parenting' },
    { id: 'TEACHING_EDUCATOR', label: '🏫 Teaching & Educator' },
    { id: 'PARTNERSHIP_INTIMACY', label: '💑 Relationship & Marriage' },
    { id: 'SELF_RESTORATION', label: '🔋 Self-Restoration & Rest' },
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
      id: 'SOMATIC_COREGULATION',
      label: 'Somatic Co-Regulation',
      icon: Wind,
      color: Colors.shieldCyan,
      desc: 'Calm your nervous system so family/students borrow your peace',
    },
    {
      id: 'STOIC_CONTROL',
      label: 'Stoic Control',
      icon: Scale,
      color: Colors.clarityMana,
      desc: 'Focus on your duty & demeanor; release external chaos',
    },
    {
      id: 'CFT_COMPASSION',
      label: 'Compassionate Friend',
      icon: Heart,
      color: Colors.compassionPink,
      desc: 'Replace harsh parenting/teaching guilt with soothing warmth',
    },
    {
      id: 'REBT_DISPUTE',
      label: 'REBT Demand Disputer',
      icon: ShieldCheck,
      color: Colors.reframeGold,
      desc: 'Convert rigid "musts" into realistic preferences',
    },
    {
      id: 'CBT_REALITY_CHECK',
      label: 'CBT Evidence Vault',
      icon: ShieldCheck,
      color: Colors.reframeGold,
      desc: 'Test catastrophic assumptions against observable facts',
    },
    {
      id: 'BA_MICRO_ACTION',
      label: 'Behavioral Spark',
      icon: Zap,
      color: Colors.vitalityGreen,
      desc: 'Break fatigue inertia with a 30-second kinetic start',
    },
    {
      id: 'ACT_DEFUSION',
      label: 'ACT Defusion Stream',
      icon: Waves,
      color: Colors.gloomPurple,
      desc: 'Step back: "I notice the thought of exhaustion..."',
    },
    {
      id: 'SCHEMA_HEALTHY_ADULT',
      label: 'Healthy Adult Mode',
      icon: Layers,
      color: Colors.logicBlue,
      desc: 'Step into mature parental presence to protect inner child',
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
      Alert.alert('✨ New Challenges Summoned', '3 fresh parenting, teaching, and relationship thoughts added to your stream.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartSolving = (item: ThoughtFeedItem) => {
    setActiveSolvingId(item.id);
    setDiagnosedDistortion(null);
    setChosenTechnique(null);
    setSelectedReframeChoice(null);
    setIsCustomMode(false);
    setUserCustomReframe('');
    setEvaluationResult(null);
  };

  const handleOpenCodexForMethod = (method: TherapeuticTechnique) => {
    setCodexInitialMethod(method);
    setIsCodexOpen(true);
  };

  // 1-Tap Quiz Selection for Reframe
  const handleSelectReframeChoice = async (item: ThoughtFeedItem, choice: ReframeChoice) => {
    setSelectedReframeChoice(choice);
    setIsEvaluating(true);

    const vpReward = choice.type === 'OPTIMAL' ? 30 : choice.type === 'TOXIC_POSITIVITY' ? 10 : 5;
    const manaReward = choice.type === 'OPTIMAL' ? 1 : 0;

    const result: ThoughtEvaluation = {
      score: choice.score,
      clinicalFeedback: choice.clinicalFeedback,
      vpReward,
      manaReward,
    };

    setEvaluationResult(result);
    setIsEvaluating(false);

    if (choice.type === 'OPTIMAL') {
      await Database.markThoughtSolved(item.id, choice.score, choice.text);
      EventBus.emit('quest:completed', {
        questId: `thought_${item.id}`,
        vpEarned: vpReward,
        manaEarned: manaReward,
      });
      await loadFeed();
    }
  };

  const handleSubmitCustomReframe = async (item: ThoughtFeedItem) => {
    if (!userCustomReframe.trim()) return;
    setIsEvaluating(true);

    try {
      const evaluation = await Gemini.evaluateThoughtReframe(
        item.thought,
        item.correctDistortion,
        chosenTechnique || 'CBT_REALITY_CHECK',
        userCustomReframe.trim()
      );

      setEvaluationResult(evaluation);
      await Database.markThoughtSolved(item.id, evaluation.score, userCustomReframe.trim());

      EventBus.emit('quest:completed', {
        questId: `thought_${item.id}`,
        vpEarned: evaluation.vpReward,
        manaEarned: evaluation.manaReward,
      });

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
      {/* Top Stream Header */}
      <View style={styles.headerCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <BrainCircuit size={18} color={Colors.clarityMana} />
              <Text style={styles.headerTitle}>The Cognitive Stream</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              Streamlined quiz challenges in Fatherhood, Teaching & Relationships. Diagnose thinking traps, explore why methods work, and pick optimal reframes.
            </Text>
          </View>

          {/* Open Method Codex Button */}
          <TouchableOpacity
            style={styles.codexTopBtn}
            onPress={() => {
              setCodexInitialMethod('CBT_REALITY_CHECK');
              setIsCodexOpen(true);
            }}
          >
            <BookOpen size={14} color={Colors.reframeGold} />
            <Text style={styles.codexTopBtnText}>Method Codex</Text>
          </TouchableOpacity>
        </View>

        {/* AI Generator Button */}
        <TouchableOpacity
          style={[styles.summonBtn, isGenerating && styles.summonBtnDisabled]}
          onPress={handleSummonAiThoughts}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator size="small" color="#0A0A0E" />
          ) : (
            <>
              <Sparkles size={14} color="#0A0A0E" />
              <Text style={styles.summonBtnText}>Summon New AI Challenges</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Domains Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.domainsRow}
      >
        {domains.map((d) => {
          const isSelected = selectedDomain === d.id;
          return (
            <TouchableOpacity
              key={d.id}
              style={[styles.domainChip, isSelected && styles.domainChipActive]}
              onPress={() => setSelectedDomain(d.id)}
            >
              <Text style={[styles.domainChipText, isSelected && styles.domainChipTextActive]}>
                {d.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Feed List */}
      <View style={{ gap: Spacing.md, marginTop: Spacing.md }}>
        {filteredFeed.map((item) => {
          const isSolving = activeSolvingId === item.id;
          const isDistortionDiagnosed = diagnosedDistortion !== null;
          const isDistortionCorrect = diagnosedDistortion === item.correctDistortion;

          return (
            <View
              key={item.id}
              style={[styles.feedCard, item.isSolved && styles.feedCardSolved]}
            >
              {/* Card Meta Header */}
              <View style={styles.cardMetaRow}>
                <View style={styles.domainTag}>
                  <Text style={styles.domainTagText}>{item.contextDomain.replace(/_/g, ' ')}</Text>
                </View>
                {item.isSolved && (
                  <View style={styles.solvedBadge}>
                    <CheckCircle2 size={13} color={Colors.vitalityGreen} />
                    <Text style={styles.solvedBadgeText}>Reframed ({item.userScore || 95}/100)</Text>
                  </View>
                )}
              </View>

              {/* Raw Thought Quote */}
              <Text style={styles.thoughtQuote}>"{item.thought}"</Text>

              {/* Solved View Summary */}
              {item.isSolved && !isSolving && (
                <View style={styles.solvedSummaryBox}>
                  <Text style={styles.solvedLabel}>Mastered Reframe:</Text>
                  <Text style={styles.solvedReframeText}>
                    {item.userReframe || item.suggestedReframe}
                  </Text>
                  <TouchableOpacity
                    style={styles.reopenBtn}
                    onPress={() => handleStartSolving(item)}
                  >
                    <Text style={styles.reopenBtnText}>Review Quiz & Steps</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Interactive Solving Wizard */}
              {!item.isSolved && !isSolving && (
                <TouchableOpacity
                  style={styles.startAlchemizeBtn}
                  onPress={() => handleStartSolving(item)}
                >
                  <Sparkles size={14} color="#0A0A0E" />
                  <Text style={styles.startAlchemizeText}>Start Interactive Quiz (3-Tap)</Text>
                </TouchableOpacity>
              )}

              {isSolving && (
                <View style={styles.solvingWizard}>
                  {/* STEP 1: DISTORTION DIAGNOSIS QUIZ */}
                  <View style={styles.wizardStepCard}>
                    <Text style={styles.stepTitle}>1. Diagnose Thinking Trap (Quiz)</Text>
                    <View style={styles.optionsGrid}>
                      {distortionOptions.map((opt) => {
                        const isChosen = diagnosedDistortion === opt.id;
                        const isCorrect = opt.id === item.correctDistortion;

                        return (
                          <TouchableOpacity
                            key={opt.id}
                            style={[
                              styles.optionBtn,
                              isChosen && (isCorrect ? styles.optionBtnCorrect : styles.optionBtnWrong),
                            ]}
                            onPress={() => setDiagnosedDistortion(opt.id)}
                          >
                            <Text
                              style={[
                                styles.optionBtnText,
                                isChosen && (isCorrect ? styles.textCorrect : styles.textWrong),
                              ]}
                            >
                              {opt.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {isDistortionDiagnosed && (
                      <View
                        style={[
                          styles.explanationBox,
                          isDistortionCorrect ? styles.boxCorrect : styles.boxWrong,
                        ]}
                      >
                        <Text style={styles.explanationText}>
                          {isDistortionCorrect
                            ? `✓ Correct! ${item.explanation}`
                            : `Try again or see: This is ${item.correctDistortion.replace(/_/g, ' ')}. ${item.explanation}`}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* STEP 2: SELECT THERAPEUTIC TECHNIQUE + METHOD CODEX CARD */}
                  {isDistortionDiagnosed && (
                    <View style={styles.wizardStepCard}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <Text style={styles.stepTitle}>2. Select Therapeutic Technique</Text>
                        {chosenTechnique && (
                          <TouchableOpacity
                            style={styles.whyMethodBtn}
                            onPress={() => handleOpenCodexForMethod(chosenTechnique)}
                          >
                            <Info size={12} color={Colors.reframeGold} />
                            <Text style={styles.whyMethodText}>Why use this?</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <View style={{ gap: 6 }}>
                        {techniques.map((t) => {
                          const isSelected = chosenTechnique === t.id;
                          return (
                            <TouchableOpacity
                              key={t.id}
                              style={[styles.techniqueRow, isSelected && styles.techniqueRowActive]}
                              onPress={() => setChosenTechnique(t.id)}
                            >
                              <t.icon size={16} color={t.color} />
                              <View style={{ flex: 1 }}>
                                <Text style={styles.techniqueLabel}>{t.label}</Text>
                                <Text style={styles.techniqueDesc}>{t.desc}</Text>
                              </View>
                              {isSelected && <CheckCircle2 size={16} color={Colors.vitalityGreen} />}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  )}

                  {/* STEP 3: REFRAME SELECTION QUIZ (NO TYPING NEEDED) */}
                  {chosenTechnique && (
                    <View style={styles.wizardStepCard}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <Text style={styles.stepTitle}>3. Select the Optimal Reframe</Text>
                        <TouchableOpacity onPress={() => setIsCustomMode(!isCustomMode)}>
                          <Text style={styles.toggleCustomText}>
                            {isCustomMode ? 'Use Multiple-Choice' : 'Write Custom Reframe'}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {!isCustomMode ? (
                        /* MULTIPLE-CHOICE REFRAME QUIZ */
                        <View style={{ gap: 8 }}>
                          {(item.reframeOptions || [
                            {
                              id: 'default_opt',
                              text: item.suggestedReframe,
                              type: 'OPTIMAL',
                              score: 98,
                              explanation: 'Grounds your perspective in reality, compassion, and agency.',
                              clinicalFeedback: 'Masterful therapeutic reframe.',
                            },
                            {
                              id: 'default_toxic',
                              text: 'Everything is amazing and nothing bad ever happens! Just smile!',
                              type: 'TOXIC_POSITIVITY',
                              score: 40,
                              explanation: 'Superficial positivity that suppresses genuine emotional signals.',
                              clinicalFeedback: 'Avoids real problem solving with toxic positivity.',
                            },
                            {
                              id: 'default_rat',
                              text: 'I should just give up and accept that everything is ruined.',
                              type: 'RATIONALIZATION',
                              score: 20,
                              explanation: 'Reinforces helpless defeatism.',
                              clinicalFeedback: 'Maintains distortion and learned helplessness.',
                            },
                          ]).map((choice) => {
                            const isSelected = selectedReframeChoice?.id === choice.id;
                            return (
                              <TouchableOpacity
                                key={choice.id}
                                style={[
                                  styles.reframeChoiceCard,
                                  isSelected &&
                                    (choice.type === 'OPTIMAL'
                                      ? styles.reframeChoiceOptimal
                                      : styles.reframeChoiceSuboptimal),
                                ]}
                                onPress={() => handleSelectReframeChoice(item, choice)}
                              >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                  <Text style={styles.reframeChoiceType}>
                                    {choice.type === 'OPTIMAL'
                                      ? '🌟 Balanced Therapeutic Reframe'
                                      : choice.type === 'TOXIC_POSITIVITY'
                                      ? '⚠️ Toxic Positivity / Bypassing'
                                      : '❌ Defeatist Rationalization'}
                                  </Text>
                                  {isSelected && <CheckCircle2 size={14} color={choice.type === 'OPTIMAL' ? Colors.vitalityGreen : Colors.distortionRed} />}
                                </View>
                                <Text style={styles.reframeChoiceText}>"{choice.text}"</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      ) : (
                        /* OPTIONAL CUSTOM WRITE-IN MODE */
                        <View style={{ gap: 8 }}>
                          <TextInput
                            style={styles.customInput}
                            placeholder="Formulate your balanced perspective..."
                            placeholderTextColor={Colors.textMuted}
                            value={userCustomReframe}
                            onChangeText={setUserCustomReframe}
                            multiline
                          />
                          <TouchableOpacity
                            style={[
                              styles.submitCustomBtn,
                              (!userCustomReframe.trim() || isEvaluating) && styles.submitCustomBtnDisabled,
                            ]}
                            onPress={() => handleSubmitCustomReframe(item)}
                            disabled={!userCustomReframe.trim() || isEvaluating}
                          >
                            {isEvaluating ? (
                              <ActivityIndicator size="small" color="#0A0A0E" />
                            ) : (
                              <>
                                <Sparkles size={14} color="#0A0A0E" />
                                <Text style={styles.submitCustomBtnText}>Grade My Reframe with AI</Text>
                              </>
                            )}
                          </TouchableOpacity>
                        </View>
                      )}

                      {/* EVALUATION FEEDBACK BANNER */}
                      {evaluationResult && (
                        <View
                          style={[
                            styles.evalResultBox,
                            evaluationResult.score >= 80 ? styles.evalResultSuccess : styles.evalResultWarning,
                          ]}
                        >
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                            <Text style={styles.evalScoreText}>Clarity Score: {evaluationResult.score}/100</Text>
                            <Text style={styles.evalRewardText}>
                              +{evaluationResult.vpReward} VP | +{evaluationResult.manaReward} Mana
                            </Text>
                          </View>
                          <Text style={styles.evalFeedbackText}>{evaluationResult.clinicalFeedback}</Text>
                        </View>
                      )}
                    </View>
                  )}

                  {/* Close / Collapse Button */}
                  <TouchableOpacity
                    style={styles.closeWizardBtn}
                    onPress={() => setActiveSolvingId(null)}
                  >
                    <Text style={styles.closeWizardText}>Done with this thought</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Reusable Method Codex Modal */}
      <MethodCodexModal
        visible={isCodexOpen}
        initialMethod={codexInitialMethod}
        onClose={() => setIsCodexOpen(false)}
      />
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
  codexTopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
    borderWidth: 1,
    borderColor: Colors.reframeGold,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 4,
  },
  codexTopBtnText: {
    color: Colors.reframeGold,
    fontSize: 11,
    fontWeight: '700',
  },
  summonBtn: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: 8,
    gap: 6,
    marginTop: Spacing.sm,
  },
  summonBtnDisabled: {
    opacity: 0.6,
  },
  summonBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 12,
  },
  domainsRow: {
    gap: 6,
    paddingVertical: Spacing.sm,
  },
  domainChip: {
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  domainChipActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: Colors.clarityMana,
  },
  domainChipText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  domainChipTextActive: {
    color: Colors.clarityMana,
    fontWeight: '700',
  },
  feedCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  feedCardSolved: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: 'rgba(16, 185, 129, 0.03)',
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  domainTag: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  domainTagText: {
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
    fontSize: 11,
    fontWeight: '600',
  },
  thoughtQuote: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  solvedSummaryBox: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.sm,
    borderRadius: 8,
    marginTop: Spacing.xs,
  },
  solvedLabel: {
    color: Colors.vitalityGreen,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  solvedReframeText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 17,
  },
  reopenBtn: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  reopenBtnText: {
    color: Colors.clarityMana,
    fontSize: 11,
    fontWeight: '600',
  },
  startAlchemizeBtn: {
    backgroundColor: Colors.vitalityGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    marginTop: Spacing.xs,
  },
  startAlchemizeText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 12,
  },
  solvingWizard: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 10,
    padding: Spacing.md,
    marginTop: Spacing.sm,
    gap: Spacing.md,
  },
  wizardStepCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepTitle: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  optionBtn: {
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionBtnCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: Colors.vitalityGreen,
  },
  optionBtnWrong: {
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    borderColor: Colors.distortionRed,
  },
  optionBtnText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  textCorrect: {
    color: Colors.vitalityGreen,
    fontWeight: '700',
  },
  textWrong: {
    color: Colors.distortionRed,
    fontWeight: '700',
  },
  explanationBox: {
    marginTop: Spacing.xs,
    padding: Spacing.xs,
    borderRadius: 6,
  },
  boxCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  boxWrong: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
  },
  explanationText: {
    color: Colors.textPrimary,
    fontSize: 11,
    lineHeight: 15,
  },
  whyMethodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  whyMethodText: {
    color: Colors.reframeGold,
    fontSize: 10,
    fontWeight: '600',
  },
  techniqueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.xs,
    borderRadius: 6,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  techniqueRowActive: {
    borderColor: Colors.vitalityGreen,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  techniqueLabel: {
    color: Colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  techniqueDesc: {
    color: Colors.textMuted,
    fontSize: 10,
  },
  toggleCustomText: {
    color: Colors.clarityMana,
    fontSize: 10,
    fontWeight: '600',
  },
  reframeChoiceCard: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reframeChoiceOptimal: {
    borderColor: Colors.vitalityGreen,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  reframeChoiceSuboptimal: {
    borderColor: Colors.distortionRed,
    backgroundColor: 'rgba(244, 63, 94, 0.08)',
  },
  reframeChoiceType: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  reframeChoiceText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 16,
  },
  customInput: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    padding: Spacing.sm,
    color: Colors.textPrimary,
    fontSize: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 60,
  },
  submitCustomBtn: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  submitCustomBtnDisabled: {
    opacity: 0.5,
  },
  submitCustomBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 11,
  },
  evalResultBox: {
    padding: Spacing.sm,
    borderRadius: 8,
    marginTop: Spacing.xs,
  },
  evalResultSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: Colors.vitalityGreen,
  },
  evalResultWarning: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderWidth: 1,
    borderColor: Colors.distortionRed,
  },
  evalScoreText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  evalRewardText: {
    color: Colors.reframeGold,
    fontSize: 11,
    fontWeight: '700',
  },
  evalFeedbackText: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  closeWizardBtn: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  closeWizardText: {
    color: Colors.textMuted,
    fontSize: 11,
  },
});
