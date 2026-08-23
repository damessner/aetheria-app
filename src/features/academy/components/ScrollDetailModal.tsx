import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { WisdomScroll, BookRoutine, UserState } from '../../../core/types';
import { Colors, Spacing } from '../../../core/theme';
import { Database } from '../../../core/database/db';
import { EventBus } from '../../../core/eventbus/EventBus';
import { RoutineService } from '../../../core/routines/RoutineService';
import { academyStyles as styles } from './academyStyles';
import {
  BookOpen,
  Award,
  Shield,
  HelpCircle,
  X,
  Clock,
  Bell,
  Star,
  Zap,
  Sparkles,
} from 'lucide-react-native';

type ModalTab = 'MASTERCLASS' | 'LEVEL2' | 'ROUTINES' | 'RECALL';

interface ScrollDetailModalProps {
  scroll: WisdomScroll;
  userState: UserState;
  onClose: () => void;
  /** Called after quiz completion so the parent can refresh its scroll list */
  onScrollsChanged: () => void;
}

/**
 * Interactive multi-tab detail modal for a single wisdom scroll:
 * Level 1 masterclass + quiz, Level 2 case study, routines, and recall practice.
 */
export const ScrollDetailModal: React.FC<ScrollDetailModalProps> = ({
  scroll,
  userState,
  onClose,
  onScrollsChanged,
}) => {
  const [modalTab, setModalTab] = useState<ModalTab>('MASTERCLASS');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [level2Answers, setLevel2Answers] = useState<Record<number, number>>({});
  const [level2Submitted, setLevel2Submitted] = useState(false);
  const [level2Passed, setLevel2Passed] = useState(false);
  const [mastered, setMastered] = useState(scroll.isCompleted);

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = async () => {
    const allAnswered = scroll.quiz.every((_, idx) => quizAnswers[idx] !== undefined);
    if (!allAnswered) {
      Alert.alert('Incomplete Quiz', 'Please select an answer for each question.');
      return;
    }

    const isAllCorrect = scroll.quiz.every(
      (q, idx) => quizAnswers[idx] === q.correctIndex
    );

    setQuizSubmitted(true);
    setQuizPassed(isAllCorrect);

    if (isAllCorrect && !mastered) {
      await Database.completeWisdomScroll(scroll.id);
      EventBus.emit('quest:completed', {
        questId: scroll.id,
        vpEarned: 50,
        manaEarned: 2,
      });
      setMastered(true);
      onScrollsChanged();
    }
  };

  const handleSelectLevel2Option = (qIdx: number, optIdx: number) => {
    if (level2Submitted) return;
    setLevel2Answers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitLevel2Quiz = async () => {
    if (!scroll.level2Expansion) return;
    const exp = scroll.level2Expansion;
    const allAnswered = exp.advancedQuiz.every((_, idx) => level2Answers[idx] !== undefined);
    if (!allAnswered) {
      Alert.alert('Incomplete Quiz', 'Please select an answer for each case study question.');
      return;
    }

    const isAllCorrect = exp.advancedQuiz.every(
      (q, idx) => level2Answers[idx] === q.correctIndex
    );

    setLevel2Submitted(true);
    setLevel2Passed(isAllCorrect);

    if (isAllCorrect) {
      await Database.completeLevel2Scroll(scroll.id);
      EventBus.emit('quest:completed', {
        questId: `l2_${scroll.id}`,
        vpEarned: 100,
        manaEarned: 3,
      });
      Alert.alert(
        '🏆 Mastery Relic Unlocked!',
        `You completed Level 2! Unlocked "${exp.unlockedMasteryRelic?.name || 'Mastery Relic'}" (+100 VP, +3 Mana).`
      );
      onScrollsChanged();
    }
  };

  const handleScheduleRoutine = async (routine: BookRoutine) => {
    await RoutineService.scheduleRoutine(userState, routine);
    Alert.alert(
      '⏰ Routine Added to Daily Schedule',
      `"${routine.title}" set for ${routine.suggestedTime}. Added to your Daily Quests (+15 VP).`
    );
  };

  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Modal Top Header */}
        <View style={styles.modalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.modalCategory}>{scroll.category.replace('_', ' ')}</Text>
            <Text style={styles.modalTitle}>{scroll.title}</Text>
            <Text style={styles.modalAuthor}>By {scroll.authorOrTradition}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <X size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* 4 Interactive Modal Tabs */}
        <View style={styles.modalTabsRow}>
          <TouchableOpacity
            style={[styles.modalTabBtn, modalTab === 'MASTERCLASS' && styles.modalTabBtnActive]}
            onPress={() => setModalTab('MASTERCLASS')}
          >
            <BookOpen size={13} color={modalTab === 'MASTERCLASS' ? Colors.reframeGold : Colors.textMuted} />
            <Text style={[styles.modalTabText, modalTab === 'MASTERCLASS' && styles.modalTabTextActive]}>
              Masterclass
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalTabBtn, modalTab === 'LEVEL2' && styles.modalTabBtnActive]}
            onPress={() => setModalTab('LEVEL2')}
          >
            <Shield size={13} color={modalTab === 'LEVEL2' ? Colors.shieldCyan : Colors.textMuted} />
            <Text style={[styles.modalTabText, modalTab === 'LEVEL2' && { color: Colors.shieldCyan, fontWeight: '700' }]}>
              Level 2 Case Study
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalTabBtn, modalTab === 'ROUTINES' && styles.modalTabBtnActive]}
            onPress={() => setModalTab('ROUTINES')}
          >
            <Clock size={13} color={modalTab === 'ROUTINES' ? Colors.vitalityGreen : Colors.textMuted} />
            <Text style={[styles.modalTabText, modalTab === 'ROUTINES' && { color: Colors.vitalityGreen, fontWeight: '700' }]}>
              Routines
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalTabBtn, modalTab === 'RECALL' && styles.modalTabBtnActive]}
            onPress={() => setModalTab('RECALL')}
          >
            <Zap size={13} color={modalTab === 'RECALL' ? Colors.clarityMana : Colors.textMuted} />
            <Text style={[styles.modalTabText, modalTab === 'RECALL' && { color: Colors.clarityMana, fontWeight: '700' }]}>
              Recall
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalBody} contentContainerStyle={{ paddingBottom: Spacing.xxl }}>
          {/* TAB 1: LEVEL 1 MASTERCLASS */}
          {modalTab === 'MASTERCLASS' && (
            <View>
              <Text style={styles.scrollBodyText}>{scroll.contentMarkdown}</Text>

              {/* Key Takeaway Box */}
              <View style={styles.takeawayBox}>
                <Sparkles size={16} color={Colors.reframeGold} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.takeawayLabel}>Core Alchemy Takeaway</Text>
                  <Text style={styles.takeawayText}>{scroll.keyTakeaway}</Text>
                </View>
              </View>

              {/* Level 1 Quiz */}
              <View style={styles.quizContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.sm }}>
                  <HelpCircle size={18} color={Colors.clarityMana} />
                  <Text style={styles.quizHeader}>Socratic Mastery Quiz</Text>
                </View>

                {scroll.quiz.map((q, qIdx) => (
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
                      {quizPassed ? '🎉 Scroll Mastered & Level 2 Unlocked!' : 'Try Again'}
                    </Text>
                    <Text style={styles.resultBannerDesc}>
                      {quizPassed
                        ? `Unlocked the "${scroll.unlockedCardReward.name}" combat card, +50 VP, and Level 2 Advanced Case Study!`
                        : 'Review the takeaway above and select the correct answers.'}
                    </Text>
                  </View>
                )}

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
            </View>
          )}

          {/* TAB 2: LEVEL 2 ADVANCED CRISIS EXPANSION */}
          {modalTab === 'LEVEL2' && (
            <View>
              {scroll.level2Expansion ? (
                <View>
                  <View style={styles.l2HeaderBox}>
                    <Shield size={20} color={Colors.shieldCyan} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.l2Title}>{scroll.level2Expansion.title}</Text>
                      <Text style={styles.l2Subtitle}>{scroll.level2Expansion.subtitle}</Text>
                    </View>
                  </View>

                  {/* Case Study Box */}
                  <View style={styles.caseStudyBox}>
                    <Text style={styles.caseStudyLabel}>🌪️ High-Friction Case Study:</Text>
                    <Text style={styles.caseStudyText}>{scroll.level2Expansion.deepCaseStudy}</Text>
                  </View>

                  <Text style={styles.scrollBodyText}>{scroll.level2Expansion.contentMarkdown}</Text>

                  {/* Level 2 Quiz */}
                  <View style={styles.quizContainer}>
                    <Text style={styles.quizHeader}>Advanced Crucible Quiz</Text>

                    {scroll.level2Expansion.advancedQuiz.map((q, qIdx) => (
                      <View key={qIdx} style={styles.questionBlock}>
                        <Text style={styles.questionText}>{q.question}</Text>
                        <View style={{ gap: 6, marginTop: 8 }}>
                          {q.options.map((opt, optIdx) => {
                            const isSelected = level2Answers[qIdx] === optIdx;
                            const isCorrect = q.correctIndex === optIdx;
                            return (
                              <TouchableOpacity
                                key={optIdx}
                                style={[
                                  styles.quizOption,
                                  isSelected && styles.quizOptionSelected,
                                  level2Submitted && isCorrect && styles.quizOptionCorrect,
                                  level2Submitted && isSelected && !isCorrect && styles.quizOptionWrong,
                                ]}
                                onPress={() => handleSelectLevel2Option(qIdx, optIdx)}
                              >
                                <Text style={styles.quizOptionText}>{opt}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                        {level2Submitted && (
                          <Text style={styles.explanationText}>💡 {q.explanation}</Text>
                        )}
                      </View>
                    ))}

                    {!level2Submitted ? (
                      <TouchableOpacity style={styles.submitQuizBtn} onPress={handleSubmitLevel2Quiz}>
                        <Award size={16} color="#0A0A0E" />
                        <Text style={styles.submitQuizBtnText}>Unlock Mastery Relic (+100 VP)</Text>
                      </TouchableOpacity>
                    ) : (
                      !level2Passed && (
                        <TouchableOpacity
                          style={styles.retryBtn}
                          onPress={() => {
                            setLevel2Submitted(false);
                            setLevel2Answers({});
                          }}
                        >
                          <Text style={styles.retryBtnText}>Retake Level 2 Quiz</Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                </View>
              ) : (
                <Text style={styles.scrollBodyText}>No Level 2 expansion available for this scroll yet.</Text>
              )}
            </View>
          )}

          {/* TAB 3: SUGGESTED ROUTINES & REMINDERS */}
          {modalTab === 'ROUTINES' && (
            <View style={{ gap: Spacing.md }}>
              <Text style={styles.routinesIntroText}>
                Integrate the wisdom of {scroll.authorOrTradition} into your daily life. Tap to schedule these micro-rituals with reminders and add them to your Daily Quests.
              </Text>

              {(scroll.suggestedRoutines || []).map((routine) => (
                <View key={routine.id} style={styles.routineCard}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <Clock size={14} color={Colors.reframeGold} />
                        <Text style={styles.routineTitle}>{routine.title}</Text>
                      </View>
                      <Text style={styles.routineDesc}>{routine.description}</Text>
                      <Text style={styles.routineRationale}>💡 {routine.clinicalRationale}</Text>
                    </View>
                    <View style={styles.timeTag}>
                      <Text style={styles.timeTagText}>{routine.suggestedTime}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.addRoutineBtn}
                    onPress={() => handleScheduleRoutine(routine)}
                  >
                    <Bell size={13} color="#0A0A0E" />
                    <Text style={styles.addRoutineBtnText}>Add to Schedule & Daily Quests (+15 VP)</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* TAB 4: SPACED RECALL PRACTICE */}
          {modalTab === 'RECALL' && (
            <View style={{ gap: Spacing.md }}>
              <View style={styles.memoryStrengthBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Star size={16} color={Colors.reframeGold} />
                  <Text style={styles.memoryStrengthTitle}>
                    Memory Retention Level: {scroll.memoryLevel || 1} / 5 Stars
                  </Text>
                </View>
                <Text style={styles.memoryStrengthSubtext}>
                  Based on Ebbinghaus Spaced Repetition (1d, 3d, 7d, 14d, 30d). Flash tests keep clinical scripts fresh in high-stress moments.
                </Text>
              </View>

              {(scroll.spacedRecallChallenges || []).map((ch) => (
                <View key={ch.id} style={styles.recallCard}>
                  <Text style={styles.recallPrompt}>{ch.scenarioPrompt}</Text>
                  <Text style={styles.recallQuestion}>{ch.question}</Text>
                  <Text style={styles.recallInsight}>🧠 Clinical Rule: {ch.clinicalInsight}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};
