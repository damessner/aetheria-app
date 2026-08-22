import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { WisdomScroll, UserState, CombatCard } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import { EventBus } from '../../core/eventbus/EventBus';
import {
  Scroll,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Award,
  Swords,
  Shield,
  HelpCircle,
  X,
  ArrowRight,
  Brain,
  Scale,
  Zap,
  Moon,
  Flame,
} from 'lucide-react-native';

interface AcademyScreenProps {
  userState: UserState;
}

export const AcademyScreen: React.FC<AcademyScreenProps> = ({ userState }) => {
  const [scrolls, setScrolls] = useState<WisdomScroll[]>([]);
  const [selectedScroll, setSelectedScroll] = useState<WisdomScroll | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  useEffect(() => {
    loadScrolls();
  }, []);

  const loadScrolls = async () => {
    const list = await Database.getWisdomScrolls();
    setScrolls(list);
  };

  const handleOpenScroll = (scroll: WisdomScroll) => {
    setSelectedScroll(scroll);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
  };

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = async () => {
    if (!selectedScroll) return;
    const allAnswered = selectedScroll.quiz.every((_, idx) => quizAnswers[idx] !== undefined);
    if (!allAnswered) {
      Alert.alert('Incomplete Quiz', 'Please select an answer for each question.');
      return;
    }

    const isAllCorrect = selectedScroll.quiz.every(
      (q, idx) => quizAnswers[idx] === q.correctIndex
    );

    setQuizSubmitted(true);
    setQuizPassed(isAllCorrect);

    if (isAllCorrect) {
      await Database.completeWisdomScroll(selectedScroll.id);
      EventBus.emit('quest:completed', {
        questId: selectedScroll.id,
        vpEarned: 50,
        manaEarned: 2,
      });
      await loadScrolls();
    }
  };

  const getCategoryIcon = (category: WisdomScroll['category']) => {
    switch (category) {
      case 'STOICISM':
        return Scale;
      case 'NEUROSCIENCE':
        return Brain;
      case 'CBT_REBT':
        return Flame;
      case 'BEHAVIORAL_ACTIVATION':
        return Zap;
      case 'CIRCADIAN_SLEEP':
        return Moon;
      default:
        return Scroll;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <BookOpen size={22} color={Colors.reframeGold} />
          <Text style={styles.headerTitle}>The Academy of Inner Alchemy</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Master evidence-based clinical wisdom scrolls to unlock exclusive Combat Cards for your Mind Arena battle deck.
        </Text>
      </View>

      {/* Scrolls List */}
      <View style={{ gap: Spacing.md }}>
        {scrolls.map((scroll) => {
          const CategoryIcon = getCategoryIcon(scroll.category);
          return (
            <TouchableOpacity
              key={scroll.id}
              style={[styles.scrollCard, scroll.isCompleted && styles.scrollCardCompleted]}
              onPress={() => handleOpenScroll(scroll)}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeaderRow}>
                <View style={styles.categoryBadge}>
                  <CategoryIcon size={12} color={Colors.reframeGold} />
                  <Text style={styles.categoryText}>{scroll.category.replace('_', ' ')}</Text>
                </View>
                {scroll.isCompleted ? (
                  <View style={styles.completedBadge}>
                    <CheckCircle2 size={14} color={Colors.vitalityGreen} />
                    <Text style={styles.completedText}>Mastered (+50 VP)</Text>
                  </View>
                ) : (
                  <Text style={styles.readingTimeText}>{scroll.readingMinutes} min read</Text>
                )}
              </View>

              <Text style={styles.scrollTitle}>{scroll.title}</Text>
              <Text style={styles.scrollSubtitle}>{scroll.subtitle}</Text>

              {/* Reward Card Preview */}
              <View style={styles.rewardPreview}>
                <Swords size={12} color={Colors.clarityMana} />
                <Text style={styles.rewardCardName}>
                  Card Reward: <Text style={{ color: Colors.clarityMana, fontWeight: '700' }}>{scroll.unlockedCardReward.name}</Text>
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Reading & Socratic Quiz Modal */}
      {selectedScroll && (
        <Modal
          visible={!!selectedScroll}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedScroll(null)}
        >
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalCategory}>{selectedScroll.category.replace('_', ' ')}</Text>
                <Text style={styles.modalTitle}>{selectedScroll.title}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedScroll(null)} style={styles.closeBtn}>
                <X size={20} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} contentContainerStyle={{ paddingBottom: Spacing.xxl }}>
              {/* Content Body */}
              <Text style={styles.scrollBodyText}>{selectedScroll.contentMarkdown}</Text>

              {/* Key Takeaway Box */}
              <View style={styles.takeawayBox}>
                <Sparkles size={16} color={Colors.reframeGold} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.takeawayLabel}>Core Alchemy Takeaway</Text>
                  <Text style={styles.takeawayText}>{selectedScroll.keyTakeaway}</Text>
                </View>
              </View>

              {/* Socratic Mastery Quiz */}
              <View style={styles.quizContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.sm }}>
                  <HelpCircle size={18} color={Colors.clarityMana} />
                  <Text style={styles.quizHeader}>Socratic Mastery Quiz</Text>
                </View>

                {selectedScroll.quiz.map((q, qIdx) => (
                  <View key={qIdx} style={styles.questionBlock}>
                    <Text style={styles.questionText}>
                      {qIdx + 1}. {q.question}
                    </Text>

                    <View style={{ gap: 6, marginTop: 8 }}>
                      {q.options.map((opt, optIdx) => {
                        const isSelected = quizAnswers[qIdx] === optIdx;
                        const isCorrect = q.correctIndex === optIdx;
                        return (
                          <TouchableOpacity
                            key={optIdx}
                            style={[
                              styles.quizOption,
                              isSelected && styles.quizOptionSelected,
                              quizSubmitted && isCorrect && styles.quizOptionCorrect,
                              quizSubmitted && isSelected && !isCorrect && styles.quizOptionWrong,
                            ]}
                            onPress={() => handleSelectQuizOption(qIdx, optIdx)}
                          >
                            <Text
                              style={[
                                styles.quizOptionText,
                                isSelected && { color: Colors.textPrimary, fontWeight: '700' },
                              ]}
                            >
                              {opt}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {quizSubmitted && (
                      <Text style={styles.explanationText}>💡 {q.explanation}</Text>
                    )}
                  </View>
                ))}

                {/* Quiz Result Banner */}
                {quizSubmitted && (
                  <View
                    style={[
                      styles.resultBanner,
                      quizPassed ? styles.resultBannerSuccess : styles.resultBannerFail,
                    ]}
                  >
                    <Text
                      style={[
                        styles.resultBannerTitle,
                        { color: quizPassed ? Colors.vitalityGreen : Colors.distortionRed },
                      ]}
                    >
                      {quizPassed ? '🎉 Scroll Mastered!' : 'Try Again'}
                    </Text>
                    <Text style={styles.resultBannerDesc}>
                      {quizPassed
                        ? `You unlocked the "${selectedScroll.unlockedCardReward.name}" card for your battle deck, +50 VP, and +2 Mana!`
                        : 'Review the takeaway above and select the correct answers.'}
                    </Text>
                  </View>
                )}

                {/* Action Buttons */}
                {!quizSubmitted ? (
                  <TouchableOpacity style={styles.submitQuizBtn} onPress={handleSubmitQuiz}>
                    <Award size={16} color="#0A0A0E" />
                    <Text style={styles.submitQuizBtnText}>Forge Combat Card (+50 VP)</Text>
                  </TouchableOpacity>
                ) : (
                  !quizPassed && (
                    <TouchableOpacity
                      style={styles.retryBtn}
                      onPress={() => {
                        setQuizSubmitted(false);
                        setQuizAnswers({});
                      }}
                    >
                      <Text style={styles.retryBtnText}>Retake Quiz</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
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
  },
  scrollCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scrollCardCompleted: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: 'rgba(16, 185, 129, 0.04)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
    gap: 4,
  },
  categoryText: {
    color: Colors.reframeGold,
    fontSize: 9,
    fontWeight: '700',
  },
  readingTimeText: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  completedText: {
    color: Colors.vitalityGreen,
    fontSize: 11,
    fontWeight: '600',
  },
  scrollTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  scrollSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: Spacing.sm,
  },
  rewardPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.xs,
    borderRadius: 6,
    gap: 6,
  },
  rewardCardName: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  modalCategory: {
    color: Colors.reframeGold,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  modalTitle: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 4,
  },
  modalBody: {
    flex: 1,
    padding: Spacing.md,
  },
  scrollBodyText: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  takeawayBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
    borderWidth: 1,
    borderColor: Colors.reframeGold,
    borderRadius: 10,
    padding: Spacing.md,
    gap: 10,
    marginBottom: Spacing.lg,
  },
  takeawayLabel: {
    color: Colors.reframeGold,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  takeawayText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 16,
  },
  quizContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quizHeader: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  questionBlock: {
    marginBottom: Spacing.md,
  },
  questionText: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  quizOption: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quizOptionSelected: {
    borderColor: Colors.clarityMana,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  quizOptionCorrect: {
    borderColor: Colors.vitalityGreen,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  quizOptionWrong: {
    borderColor: Colors.distortionRed,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  quizOptionText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  explanationText: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 6,
    fontStyle: 'italic',
  },
  resultBanner: {
    padding: Spacing.md,
    borderRadius: 8,
    marginVertical: Spacing.sm,
  },
  resultBannerSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: Colors.vitalityGreen,
  },
  resultBannerFail: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: Colors.distortionRed,
  },
  resultBannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  resultBannerDesc: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  submitQuizBtn: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
    marginTop: Spacing.sm,
  },
  submitQuizBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 13,
  },
  retryBtn: {
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  retryBtnText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
});
