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
import { WisdomScroll, UserState, BookRoutine, SpacedRecallChallenge } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import { EventBus } from '../../core/eventbus/EventBus';
import { ContentSyncService } from '../../core/sync/ContentSyncService';
import { RoutineService } from '../../core/routines/RoutineService';
import { SpacedRepetitionService } from '../../core/spacedrepetition/SpacedRepetitionService';
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
  CloudDownload,
  Clock,
  Bell,
  Star,
  Lock,
  Compass,
} from 'lucide-react-native';

interface AcademyScreenProps {
  userState: UserState;
}

type ModalTab = 'MASTERCLASS' | 'LEVEL2' | 'ROUTINES' | 'RECALL';

export const AcademyScreen: React.FC<AcademyScreenProps> = ({ userState }) => {
  const [scrolls, setScrolls] = useState<WisdomScroll[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<WisdomScroll['category'] | 'ALL'>('ALL');
  const [selectedScroll, setSelectedScroll] = useState<WisdomScroll | null>(null);
  const [modalTab, setModalTab] = useState<ModalTab>('MASTERCLASS');

  // Level 1 Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // Level 2 Quiz
  const [level2Answers, setLevel2Answers] = useState<Record<number, number>>({});
  const [level2Submitted, setLevel2Submitted] = useState(false);
  const [level2Passed, setLevel2Passed] = useState(false);

  // Spaced Recall Modal
  const [activeRecallChallenge, setActiveRecallChallenge] = useState<{
    scroll: WisdomScroll;
    challenge: SpacedRecallChallenge;
    reviewStage: number;
    memoryStars: number;
  } | null>(null);
  const [recallAnswer, setRecallAnswer] = useState<number | null>(null);
  const [recallSubmitted, setRecallSubmitted] = useState(false);
  const [recallPassed, setRecallPassed] = useState(false);

  const [isSyncing, setIsSyncing] = useState(false);
  const [contentVersion, setContentVersion] = useState('1.3.0');

  const categories: { id: WisdomScroll['category'] | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'All Masterclasses' },
    { id: 'PARENTING_COREGULATION', label: '👨‍👧 Parenting & Co-Regulation' },
    { id: 'STOICISM', label: '🏛️ Stoic Wisdom' },
    { id: 'NEUROSCIENCE', label: '🧠 Polyvagal & Brain' },
    { id: 'CBT_REBT', label: '⚡ CBT, ACT & REBT' },
    { id: 'CIRCADIAN_SLEEP', label: '🌙 Circadian & Sleep' },
    { id: 'BEHAVIORAL_ACTIVATION', label: '🏃 Kinetic Action' },
    { id: 'LOGOTHERAPY', label: '🏔️ Logotherapy' },
    { id: 'SHADOW_INTEGRATION', label: '🌑 Shadow Integration' },
  ];

  useEffect(() => {
    loadScrolls();
    loadVersion();

    const unsub = EventBus.subscribe('content:synced', () => {
      loadScrolls();
      loadVersion();
    });

    return () => {
      unsub();
    };
  }, []);

  const loadVersion = async () => {
    const info = await ContentSyncService.getLastSyncInfo();
    setContentVersion(info.version);
  };

  const loadScrolls = async () => {
    const list = await Database.getWisdomScrolls();
    setScrolls(list);
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const res = await ContentSyncService.syncContent(true);
      if (res.success) {
        await loadScrolls();
        await loadVersion();
        Alert.alert('☁️ Content Synced', res.message);
      } else {
        Alert.alert('Sync Notice', res.message);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const dueReviews = SpacedRepetitionService.getDueSpacedReviews(userState, scrolls);

  const handleOpenScroll = (scroll: WisdomScroll) => {
    setSelectedScroll(scroll);
    setModalTab('MASTERCLASS');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
    setLevel2Answers({});
    setLevel2Submitted(false);
    setLevel2Passed(false);
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

  const handleSelectLevel2Option = (qIdx: number, optIdx: number) => {
    if (level2Submitted) return;
    setLevel2Answers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitLevel2Quiz = async () => {
    if (!selectedScroll?.level2Expansion) return;
    const exp = selectedScroll.level2Expansion;
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
      await Database.completeLevel2Scroll(selectedScroll.id);
      EventBus.emit('quest:completed', {
        questId: `l2_${selectedScroll.id}`,
        vpEarned: 100,
        manaEarned: 3,
      });
      Alert.alert(
        '🏆 Mastery Relic Unlocked!',
        `You completed Level 2! Unlocked "${exp.unlockedMasteryRelic?.name || 'Mastery Relic'}" (+100 VP, +3 Mana).`
      );
      await loadScrolls();
    }
  };

  const handleScheduleRoutine = async (routine: BookRoutine) => {
    await RoutineService.scheduleRoutine(userState, routine);
    Alert.alert(
      '⏰ Routine Added to Daily Schedule',
      `"${routine.title}" set for ${routine.suggestedTime}. Added to your Daily Quests (+15 VP).`
    );
  };

  const handleStartFlashRecall = (item: {
    scroll: WisdomScroll;
    challenge: SpacedRecallChallenge;
    reviewStage: number;
    memoryStars: number;
  }) => {
    setActiveRecallChallenge(item);
    setRecallAnswer(null);
    setRecallSubmitted(false);
    setRecallPassed(false);
  };

  const handleSubmitRecall = async () => {
    if (!activeRecallChallenge || recallAnswer === null) return;
    const isCorrect = recallAnswer === activeRecallChallenge.challenge.correctIndex;
    setRecallSubmitted(true);
    setRecallPassed(isCorrect);

    const outcome = await SpacedRepetitionService.recordReviewResult(
      userState,
      activeRecallChallenge.scroll.id,
      isCorrect
    );

    if (isCorrect) {
      Alert.alert(
        '🧠 Memory Consolidated!',
        `Correct! Memory strength increased to ${outcome.memoryStars} Stars (+${outcome.vpAwarded} VP, +${outcome.manaAwarded} Mana). Next review in ${outcome.newStage * 3} days.`
      );
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
      case 'PARENTING_COREGULATION':
        return Shield;
      case 'LOGOTHERAPY':
        return BookOpen;
      case 'SHADOW_INTEGRATION':
        return Swords;
      default:
        return Scroll;
    }
  };

  const filteredScrolls =
    selectedCategory === 'ALL'
      ? scrolls
      : scrolls.filter((s) => s.category === selectedCategory);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <BookOpen size={20} color={Colors.reframeGold} />
              <Text style={styles.headerTitle}>The Academy of Inner Alchemy</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              Master deep psychological literature in Fatherhood, Teaching, Marriage, Stoicism & Neuroscience. Unlock combat cards, Level 2 crisis expansions, and daily routines.
            </Text>
          </View>

          {/* Cloud Sync Button */}
          <TouchableOpacity
            style={[styles.syncBtn, isSyncing && styles.syncBtnDisabled]}
            onPress={handleManualSync}
            disabled={isSyncing}
          >
            <CloudDownload size={13} color={Colors.clarityMana} />
            <Text style={styles.syncBtnText}>{isSyncing ? 'Syncing...' : `v${contentVersion}`}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ⚡ Spaced Repetition Flash-Recall Due Banner */}
      {dueReviews.length > 0 && (
        <View style={styles.recallDueCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Zap size={18} color={Colors.reframeGold} />
              <Text style={styles.recallDueTitle}>
                Do You Remember? ({dueReviews.length} Books Due)
              </Text>
            </View>
            <Text style={styles.recallDueBadge}>Spaced Recall</Text>
          </View>
          <Text style={styles.recallDueSubtext}>
            Long-term retention requires flash testing before memory fades. Test your recall to earn Clarity Mana.
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginTop: 10 }}>
            {dueReviews.map((item) => (
              <TouchableOpacity
                key={item.scroll.id}
                style={styles.recallItemBtn}
                onPress={() => handleStartFlashRecall(item)}
              >
                <Text style={styles.recallItemTitle} numberOfLines={1}>{item.scroll.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                  <Star size={12} color={Colors.reframeGold} />
                  <Text style={styles.recallItemStars}>{item.memoryStars} Stars</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Category Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesRow}
      >
        {categories.map((c) => {
          const isSelected = selectedCategory === c.id;
          return (
            <TouchableOpacity
              key={c.id}
              style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(c.id)}
            >
              <Text style={[styles.categoryChipText, isSelected && styles.categoryChipTextActive]}>
                {c.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Scrolls Grid */}
      <View style={styles.scrollsGrid}>
        {filteredScrolls.map((scroll) => {
          const IconComponent = getCategoryIcon(scroll.category);
          const isL2Unlocked = scroll.isLevel2Unlocked || scroll.isCompleted;

          return (
            <TouchableOpacity
              key={scroll.id}
              style={[
                styles.scrollCard,
                scroll.isCompleted && styles.scrollCardCompleted,
              ]}
              onPress={() => handleOpenScroll(scroll)}
            >
              <View style={styles.cardTopRow}>
                <View style={[styles.iconContainer, scroll.isCompleted && styles.iconContainerCompleted]}>
                  <IconComponent size={20} color={scroll.isCompleted ? Colors.vitalityGreen : Colors.reframeGold} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  {isL2Unlocked && (
                    <View style={styles.l2Badge}>
                      <Text style={styles.l2BadgeText}>Lvl 2</Text>
                    </View>
                  )}
                  {scroll.isCompleted && (
                    <View style={styles.completedBadge}>
                      <CheckCircle2 size={12} color={Colors.vitalityGreen} />
                      <Text style={styles.completedText}>Mastered</Text>
                    </View>
                  )}
                </View>
              </View>

              <Text style={styles.scrollTitle}>{scroll.title}</Text>
              <Text style={styles.scrollSubtitle}>{scroll.subtitle}</Text>
              <Text style={styles.scrollAuthor}>By {scroll.authorOrTradition} • {scroll.readingMinutes} min</Text>

              <View style={styles.cardFooter}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Swords size={12} color={Colors.clarityMana} />
                  <Text style={styles.cardRewardText}>
                    {scroll.unlockedCardReward.name}
                  </Text>
                </View>
                {scroll.suggestedRoutines && scroll.suggestedRoutines.length > 0 && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Clock size={11} color={Colors.textMuted} />
                    <Text style={styles.routineCountText}>{scroll.suggestedRoutines.length} Routines</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Interactive Multi-Tab Scroll Detail Modal */}
      {selectedScroll && (
        <Modal
          visible={!!selectedScroll}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedScroll(null)}
        >
          <View style={styles.modalContainer}>
            {/* Modal Top Header */}
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalCategory}>{selectedScroll.category.replace('_', ' ')}</Text>
                <Text style={styles.modalTitle}>{selectedScroll.title}</Text>
                <Text style={styles.modalAuthor}>By {selectedScroll.authorOrTradition}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedScroll(null)} style={styles.closeBtn}>
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
                  <Text style={styles.scrollBodyText}>{selectedScroll.contentMarkdown}</Text>

                  {/* Key Takeaway Box */}
                  <View style={styles.takeawayBox}>
                    <Sparkles size={16} color={Colors.reframeGold} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.takeawayLabel}>Core Alchemy Takeaway</Text>
                      <Text style={styles.takeawayText}>{selectedScroll.keyTakeaway}</Text>
                    </View>
                  </View>

                  {/* Level 1 Quiz */}
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
                          {quizPassed ? '🎉 Scroll Mastered & Level 2 Unlocked!' : 'Try Again'}
                        </Text>
                        <Text style={styles.resultBannerDesc}>
                          {quizPassed
                            ? `Unlocked the "${selectedScroll.unlockedCardReward.name}" combat card, +50 VP, and Level 2 Advanced Case Study!`
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
                  {selectedScroll.level2Expansion ? (
                    <View>
                      <View style={styles.l2HeaderBox}>
                        <Shield size={20} color={Colors.shieldCyan} />
                        <View style={{ flex: 1 }}>
                          <Text style={styles.l2Title}>{selectedScroll.level2Expansion.title}</Text>
                          <Text style={styles.l2Subtitle}>{selectedScroll.level2Expansion.subtitle}</Text>
                        </View>
                      </View>

                      {/* Case Study Box */}
                      <View style={styles.caseStudyBox}>
                        <Text style={styles.caseStudyLabel}>🌪️ High-Friction Case Study:</Text>
                        <Text style={styles.caseStudyText}>{selectedScroll.level2Expansion.deepCaseStudy}</Text>
                      </View>

                      <Text style={styles.scrollBodyText}>{selectedScroll.level2Expansion.contentMarkdown}</Text>

                      {/* Level 2 Quiz */}
                      <View style={styles.quizContainer}>
                        <Text style={styles.quizHeader}>Advanced Crucible Quiz</Text>

                        {selectedScroll.level2Expansion.advancedQuiz.map((q, qIdx) => (
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
                    Integrate the wisdom of {selectedScroll.authorOrTradition} into your daily life. Tap to schedule these micro-rituals with reminders and add them to your Daily Quests.
                  </Text>

                  {(selectedScroll.suggestedRoutines || []).map((routine) => (
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
                        Memory Retention Level: {selectedScroll.memoryLevel || 1} / 5 Stars
                      </Text>
                    </View>
                    <Text style={styles.memoryStrengthSubtext}>
                      Based on Ebbinghaus Spaced Repetition (1d, 3d, 7d, 14d, 30d). Flash tests keep clinical scripts fresh in high-stress moments.
                    </Text>
                  </View>

                  {(selectedScroll.spacedRecallChallenges || []).map((ch, idx) => (
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
      )}

      {/* Spaced Recall Flash Modal */}
      {activeRecallChallenge && (
        <Modal
          visible={!!activeRecallChallenge}
          animationType="fade"
          transparent
          onRequestClose={() => setActiveRecallChallenge(null)}
        >
          <View style={styles.recallModalOverlay}>
            <View style={styles.recallModalBox}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Zap size={18} color={Colors.reframeGold} />
                  <Text style={styles.recallModalHeading}>Spaced Memory Flash</Text>
                </View>
                <TouchableOpacity onPress={() => setActiveRecallChallenge(null)}>
                  <X size={18} color={Colors.textPrimary} />
                </TouchableOpacity>
              </View>

              <Text style={styles.recallBookTitle}>
                Book: {activeRecallChallenge.scroll.title} ({activeRecallChallenge.scroll.authorOrTradition})
              </Text>
              <Text style={styles.recallModalPrompt}>{activeRecallChallenge.challenge.scenarioPrompt}</Text>
              <Text style={styles.recallModalQuestion}>{activeRecallChallenge.challenge.question}</Text>

              <View style={{ gap: 6, marginVertical: 10 }}>
                {activeRecallChallenge.challenge.options.map((opt, optIdx) => {
                  const isSelected = recallAnswer === optIdx;
                  const isCorrect = activeRecallChallenge.challenge.correctIndex === optIdx;
                  return (
                    <TouchableOpacity
                      key={optIdx}
                      style={[
                        styles.quizOption,
                        isSelected && styles.quizOptionSelected,
                        recallSubmitted && isCorrect && styles.quizOptionCorrect,
                        recallSubmitted && isSelected && !isCorrect && styles.quizOptionWrong,
                      ]}
                      onPress={() => !recallSubmitted && setRecallAnswer(optIdx)}
                    >
                      <Text style={styles.quizOptionText}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {recallSubmitted && (
                <Text style={styles.explanationText}>💡 {activeRecallChallenge.challenge.explanation}</Text>
              )}

              {!recallSubmitted ? (
                <TouchableOpacity
                  style={[styles.submitQuizBtn, recallAnswer === null && { opacity: 0.5 }]}
                  disabled={recallAnswer === null}
                  onPress={handleSubmitRecall}
                >
                  <Text style={styles.submitQuizBtnText}>Verify Recall (+30 VP, +2 Mana)</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.retryBtn} onPress={() => setActiveRecallChallenge(null)}>
                  <Text style={styles.retryBtnText}>Continue Journey</Text>
                </TouchableOpacity>
              )}
            </View>
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
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: Colors.clarityMana,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 4,
  },
  syncBtnDisabled: {
    opacity: 0.6,
  },
  syncBtnText: {
    color: Colors.clarityMana,
    fontSize: 10,
    fontWeight: '700',
  },
  recallDueCard: {
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.reframeGold,
    marginBottom: Spacing.md,
  },
  recallDueTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  recallDueBadge: {
    backgroundColor: Colors.reframeGold,
    color: '#0A0A0E',
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  recallDueSubtext: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  recallItemBtn: {
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    minWidth: 140,
  },
  recallItemTitle: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  recallItemStars: {
    color: Colors.reframeGold,
    fontSize: 10,
    fontWeight: '600',
  },
  categoriesRow: {
    gap: 6,
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.md,
  },
  categoryChip: {
    backgroundColor: Colors.surface,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    borderColor: Colors.reframeGold,
  },
  categoryChipText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: Colors.reframeGold,
    fontWeight: '700',
  },
  scrollsGrid: {
    gap: Spacing.md,
  },
  scrollCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scrollCardCompleted: {
    borderColor: 'rgba(16, 185, 129, 0.4)',
    backgroundColor: 'rgba(16, 185, 129, 0.03)',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerCompleted: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  l2Badge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.shieldCyan,
  },
  l2BadgeText: {
    color: Colors.shieldCyan,
    fontSize: 9,
    fontWeight: '700',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  completedText: {
    color: Colors.vitalityGreen,
    fontSize: 10,
    fontWeight: '700',
  },
  scrollTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  scrollSubtitle: {
    color: Colors.reframeGold,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  scrollAuthor: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  cardRewardText: {
    color: Colors.clarityMana,
    fontSize: 11,
    fontWeight: '600',
  },
  routineCountText: {
    color: Colors.textMuted,
    fontSize: 10,
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
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  modalTitle: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 2,
  },
  modalAuthor: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: Colors.surfaceLight,
  },
  modalTabsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: Spacing.xs,
  },
  modalTabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  modalTabBtnActive: {
    borderBottomColor: Colors.reframeGold,
  },
  modalTabText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  modalTabTextActive: {
    color: Colors.reframeGold,
    fontWeight: '700',
  },
  modalBody: {
    padding: Spacing.md,
  },
  scrollBodyText: {
    color: Colors.textPrimary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  takeawayBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
    borderWidth: 1,
    borderColor: Colors.reframeGold,
    borderRadius: 10,
    padding: Spacing.md,
    gap: 10,
    marginBottom: Spacing.md,
  },
  takeawayLabel: {
    color: Colors.reframeGold,
    fontSize: 12,
    fontWeight: '700',
  },
  takeawayText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  l2HeaderBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderWidth: 1,
    borderColor: Colors.shieldCyan,
    borderRadius: 10,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  l2Title: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  l2Subtitle: {
    color: Colors.shieldCyan,
    fontSize: 11,
    marginTop: 2,
  },
  caseStudyBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: Colors.distortionRed,
    padding: Spacing.sm,
    borderRadius: 6,
    marginBottom: Spacing.md,
  },
  caseStudyLabel: {
    color: Colors.distortionRed,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  caseStudyText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 17,
  },
  routinesIntroText: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  routineCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  routineTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  routineDesc: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 2,
  },
  routineRationale: {
    color: Colors.reframeGold,
    fontSize: 10,
    marginTop: 4,
  },
  timeTag: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.reframeGold,
  },
  timeTagText: {
    color: Colors.reframeGold,
    fontSize: 10,
    fontWeight: '700',
  },
  addRoutineBtn: {
    backgroundColor: Colors.vitalityGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
    marginTop: Spacing.sm,
  },
  addRoutineBtnText: {
    color: '#0A0A0E',
    fontSize: 11,
    fontWeight: '700',
  },
  memoryStrengthBox: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  memoryStrengthTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  memoryStrengthSubtext: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 4,
  },
  recallCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  recallPrompt: {
    color: Colors.clarityMana,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  recallQuestion: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 16,
  },
  recallInsight: {
    color: Colors.reframeGold,
    fontSize: 10,
    marginTop: 6,
  },
  quizContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.sm,
  },
  quizHeader: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  questionBlock: {
    marginBottom: Spacing.md,
  },
  questionText: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
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
    lineHeight: 16,
  },
  explanationText: {
    color: Colors.reframeGold,
    fontSize: 11,
    marginTop: 6,
    lineHeight: 15,
  },
  resultBanner: {
    padding: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  resultBannerSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: Colors.vitalityGreen,
  },
  resultBannerFail: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: Colors.distortionRed,
  },
  resultBannerTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  resultBannerDesc: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  submitQuizBtn: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    marginTop: Spacing.xs,
  },
  submitQuizBtnText: {
    color: '#0A0A0E',
    fontSize: 13,
    fontWeight: '700',
  },
  retryBtn: {
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  retryBtnText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  recallModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
  },
  recallModalBox: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.reframeGold,
  },
  recallModalHeading: {
    color: Colors.reframeGold,
    fontSize: 14,
    fontWeight: '700',
  },
  recallBookTitle: {
    color: Colors.textMuted,
    fontSize: 11,
    marginBottom: 4,
  },
  recallModalPrompt: {
    color: Colors.clarityMana,
    fontSize: 11,
    fontWeight: '700',
  },
  recallModalQuestion: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
    lineHeight: 18,
  },
});
