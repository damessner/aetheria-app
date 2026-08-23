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
import { ProblemSolvingWorksheet, UserState } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { ScreenHeader } from '../../components';
import { Database } from '../../core/database/db';
import { Gemini } from '../../core/ai/gemini';
import {
  Hammer,
  Sparkles,
  CheckCircle2,
  ListTodo,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  BookOpen,
} from 'lucide-react-native';

interface ProblemSolvingScreenProps {
  userState: UserState;
}

export const ProblemSolvingScreen: React.FC<ProblemSolvingScreenProps> = ({ userState }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [problemDef, setProblemDef] = useState('');
  const [solutions, setSolutions] = useState<string[]>(['', '', '']);
  const [selectedSolution, setSelectedSolution] = useState('');
  const [actionSteps, setActionSteps] = useState<string[]>(['', '']);
  const [offlineAnchor, setOfflineAnchor] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [savedWorksheets, setSavedWorksheets] = useState<ProblemSolvingWorksheet[]>([]);

  useEffect(() => {
    loadWorksheets();
  }, []);

  const loadWorksheets = async () => {
    const list = await Database.getProblemSolvingWorksheets();
    setSavedWorksheets(list);
  };

  const handleAiBrainstorm = async () => {
    if (!problemDef.trim()) {
      Alert.alert('Empty Problem', 'Please describe the problem first in Step 1.');
      return;
    }

    setIsAiLoading(true);
    try {
      const steps = await Gemini.decomposeTask(`Brainstorm pragmatic solutions for: ${problemDef}`, userState.energyTier);
      setSolutions(steps.slice(0, 4));
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSaveWorksheet = async () => {
    if (!problemDef.trim() || !selectedSolution.trim()) {
      Alert.alert('Incomplete', 'Please define the problem and select a solution before completing.');
      return;
    }

    const worksheet: ProblemSolvingWorksheet = {
      id: 'ps_' + Date.now(),
      title: problemDef.slice(0, 40) + '...',
      createdAt: new Date().toISOString(),
      step1_problemDefinition: problemDef,
      step2_brainstormedSolutions: solutions.filter((s) => s.trim().length > 0),
      step3_evaluatedOptions: [],
      step4_selectedSolution: selectedSolution,
      step5_actionSteps: actionSteps.filter((a) => a.trim().length > 0).map((s) => ({ step: s, isDone: false })),
      step6_offlineExecutionAnchor: offlineAnchor,
      isCompleted: true,
    };

    await Database.saveProblemSolvingWorksheet(worksheet);
    await loadWorksheets();

    Alert.alert(
      '🎉 7-Step Action Plan Forged!',
      `Your action plan for "${worksheet.title}" has been inscribed. Take your offline action step today!`
    );

    // Reset wizard
    setCurrentStep(1);
    setProblemDef('');
    setSolutions(['', '', '']);
    setSelectedSolution('');
    setActionSteps(['', '']);
    setOfflineAnchor('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Banner */}
      <ScreenHeader
        icon={Hammer}
        title="7-Step Structured Problem-Solving (PS)"
        subtitle="Phase 2 Clinical Skill (Arean et al. / Furukawa et al.): Deconstruct complex blockers into concrete, actionable steps."
      />

      {/* Step Indicator */}
      <View style={styles.stepIndicatorRow}>
        {[1, 2, 3, 4, 5, 6, 7].map((s) => {
          const isCurrent = currentStep === s;
          const isPassed = currentStep > s;
          return (
            <TouchableOpacity
              key={s}
              style={[
                styles.stepCircle,
                isCurrent && styles.stepCircleCurrent,
                isPassed && styles.stepCirclePassed,
              ]}
              onPress={() => setCurrentStep(s)}
            >
              <Text
                style={[
                  styles.stepCircleText,
                  (isCurrent || isPassed) && { color: Colors.background, fontWeight: '700' },
                ]}
              >
                {s}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Step Content Card */}
      <View style={styles.card}>
        {currentStep === 1 && (
          <View>
            <Text style={styles.stepTitle}>Step 1: Define the Problem Specifically</Text>
            <Text style={styles.stepDesc}>State what is currently causing distress or friction in objective, factual terms:</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={3}
              placeholder="e.g. I have fallen 3 days behind on project documentation because I keep getting interrupted..."
              placeholderTextColor={Colors.textMuted}
              value={problemDef}
              onChangeText={setProblemDef}
            />
          </View>
        )}

        {currentStep === 2 && (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.stepTitle}>Step 2: Brainstorm Solutions</Text>
              <TouchableOpacity style={styles.aiButton} onPress={handleAiBrainstorm} disabled={isAiLoading}>
                {isAiLoading ? (
                  <ActivityIndicator size="small" color="#0A0A0E" />
                ) : (
                  <>
                    <Sparkles size={12} color="#0A0A0E" />
                    <Text style={styles.aiButtonText}>AI Brainstorm</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.stepDesc}>List 3-4 possible paths forward without self-censoring:</Text>
            {solutions.map((sol, idx) => (
              <TextInput
                key={idx}
                style={[styles.textInput, { marginBottom: 8 }]}
                placeholder={`Option ${idx + 1}...`}
                placeholderTextColor={Colors.textMuted}
                value={sol}
                onChangeText={(val) => {
                  const next = [...solutions];
                  next[idx] = val;
                  setSolutions(next);
                }}
              />
            ))}
          </View>
        )}

        {currentStep === 3 && (
          <View>
            <Text style={styles.stepTitle}>Step 3: Evaluate Feasibility & Pros/Cons</Text>
            <Text style={styles.stepDesc}>Review which brainstormed option is most realistic given your current energy:</Text>
            {solutions.filter((s) => s.trim().length > 0).map((sol, idx) => (
              <View key={idx} style={styles.solutionPreviewBox}>
                <Text style={styles.solutionPreviewText}>• {sol}</Text>
              </View>
            ))}
          </View>
        )}

        {currentStep === 4 && (
          <View>
            <Text style={styles.stepTitle}>Step 4: Select Best Solution</Text>
            <Text style={styles.stepDesc}>Tap the single solution you commit to executing:</Text>
            {solutions.filter((s) => s.trim().length > 0).map((sol, idx) => {
              const isChosen = selectedSolution === sol;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.selectOptionBtn, isChosen && styles.selectOptionBtnActive]}
                  onPress={() => setSelectedSolution(sol)}
                >
                  <Text style={[styles.selectOptionText, isChosen && { color: Colors.reframeGold, fontWeight: '700' }]}>
                    {sol}
                  </Text>
                  {isChosen && <CheckCircle2 size={16} color={Colors.reframeGold} />}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {currentStep === 5 && (
          <View>
            <Text style={styles.stepTitle}>Step 5: Action Step Deconstruction</Text>
            <Text style={styles.stepDesc}>Break down your chosen solution into 2 atomic sub-steps:</Text>
            {actionSteps.map((act, idx) => (
              <TextInput
                key={idx}
                style={[styles.textInput, { marginBottom: 8 }]}
                placeholder={`Action step ${idx + 1}...`}
                placeholderTextColor={Colors.textMuted}
                value={act}
                onChangeText={(val) => {
                  const next = [...actionSteps];
                  next[idx] = val;
                  setActionSteps(next);
                }}
              />
            ))}
          </View>
        )}

        {currentStep === 6 && (
          <View>
            <Text style={styles.stepTitle}>Step 6: Offline Execution Anchor</Text>
            <Text style={styles.stepDesc}>Specify when and where in the physical world you will execute this (away from screen):</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Today at 2:00 PM at my desk with phone on Do Not Disturb..."
              placeholderTextColor={Colors.textMuted}
              value={offlineAnchor}
              onChangeText={setOfflineAnchor}
            />
          </View>
        )}

        {currentStep === 7 && (
          <View>
            <Text style={styles.stepTitle}>Step 7: Final Review & Inscription</Text>
            <Text style={styles.stepDesc}>Review your plan and inscribe it into your active quest register:</Text>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryProblem}>Problem: {problemDef}</Text>
              <Text style={styles.summarySolution}>Chosen Solution: {selectedSolution}</Text>
              <Text style={styles.summaryAnchor}>Offline Anchor: {offlineAnchor}</Text>
            </View>

            <TouchableOpacity style={styles.completePlanBtn} onPress={handleSaveWorksheet}>
              <CheckCircle2 size={16} color="#0A0A0E" />
              <Text style={styles.completePlanBtnText}>Inscribe 7-Step Action Plan</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navRow}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.navBtn} onPress={() => setCurrentStep((p) => p - 1)}>
              <ChevronLeft size={16} color={Colors.textPrimary} />
              <Text style={styles.navBtnText}>Previous</Text>
            </TouchableOpacity>
          )}
          {currentStep < 7 && (
            <TouchableOpacity
              style={[styles.navBtn, styles.navBtnNext]}
              onPress={() => setCurrentStep((p) => p + 1)}
            >
              <Text style={[styles.navBtnText, { color: '#0A0A0E', fontWeight: '700' }]}>Next Step</Text>
              <ChevronRight size={16} color="#0A0A0E" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Saved Worksheets Section */}
      {savedWorksheets.length > 0 && (
        <View style={styles.historySection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.sm }}>
            <BookOpen size={16} color={Colors.clarityMana} />
            <Text style={styles.historyTitle}>Completed Problem-Solving Codex</Text>
          </View>
          {savedWorksheets.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <Text style={styles.historyProblem} numberOfLines={1}>{item.step1_problemDefinition}</Text>
              <Text style={styles.historySolution}>✓ {item.step4_selectedSolution}</Text>
            </View>
          ))}
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
    fontSize: 15,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  stepIndicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleCurrent: {
    borderColor: Colors.reframeGold,
    backgroundColor: Colors.reframeGold,
  },
  stepCirclePassed: {
    borderColor: Colors.vitalityGreen,
    backgroundColor: Colors.vitalityGreen,
  },
  stepCircleText: {
    color: Colors.textMuted,
    fontSize: 12,
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
  stepTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  stepDesc: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: Spacing.sm,
  },
  textInput: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: Spacing.sm,
    color: Colors.textPrimary,
    fontSize: 13,
  },
  aiButton: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  aiButtonText: {
    color: '#0A0A0E',
    fontSize: 11,
    fontWeight: '700',
  },
  solutionPreviewBox: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.sm,
    borderRadius: 8,
    marginBottom: 6,
  },
  solutionPreviewText: {
    color: Colors.textPrimary,
    fontSize: 12,
  },
  selectOptionBtn: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  selectOptionBtnActive: {
    borderColor: Colors.reframeGold,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  selectOptionText: {
    color: Colors.textPrimary,
    fontSize: 13,
    flex: 1,
  },
  summaryCard: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.md,
    borderRadius: 10,
    marginVertical: Spacing.sm,
    gap: 4,
  },
  summaryProblem: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  summarySolution: {
    color: Colors.vitalityGreen,
    fontSize: 12,
    fontWeight: '600',
  },
  summaryAnchor: {
    color: Colors.clarityMana,
    fontSize: 11,
  },
  completePlanBtn: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
    marginTop: Spacing.sm,
  },
  completePlanBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 13,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  navBtnNext: {
    backgroundColor: Colors.reframeGold,
    marginLeft: 'auto',
  },
  navBtnText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  historySection: {
    marginTop: Spacing.sm,
  },
  historyTitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  historyCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 6,
  },
  historyProblem: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  historySolution: {
    color: Colors.vitalityGreen,
    fontSize: 11,
    marginTop: 2,
  },
});
