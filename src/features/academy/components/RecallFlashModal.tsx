import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { WisdomScroll, SpacedRecallChallenge } from '../../../core/types';
import { Colors } from '../../../core/theme';
import { SpacedRepetitionService } from '../../../core/spacedrepetition/SpacedRepetitionService';
import { UserState } from '../../../core/types';
import { academyStyles as styles } from './academyStyles';
import { X, Zap } from 'lucide-react-native';

export interface RecallChallengeItem {
  scroll: WisdomScroll;
  challenge: SpacedRecallChallenge;
  reviewStage: number;
  memoryStars: number;
}

interface RecallFlashModalProps {
  item: RecallChallengeItem;
  userState: UserState;
  onClose: () => void;
}

/** Flash-recall quiz modal for spaced repetition review */
export const RecallFlashModal: React.FC<RecallFlashModalProps> = ({
  item,
  userState,
  onClose,
}) => {
  const [recallAnswer, setRecallAnswer] = useState<number | null>(null);
  const [recallSubmitted, setRecallSubmitted] = useState(false);

  const handleSubmitRecall = async () => {
    if (recallAnswer === null) return;
    const isCorrect = recallAnswer === item.challenge.correctIndex;
    setRecallSubmitted(true);

    const outcome = await SpacedRepetitionService.recordReviewResult(
      userState,
      item.scroll.id,
      isCorrect
    );

    if (isCorrect) {
      const { Alert } = require('react-native');
      Alert.alert(
        '🧠 Memory Consolidated!',
        `Correct! Memory strength increased to ${outcome.memoryStars} Stars (+${outcome.vpAwarded} VP, +${outcome.manaAwarded} Mana). Next review in ${outcome.newStage * 3} days.`
      );
    }
  };

  return (
    <Modal visible animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.recallModalOverlay}>
        <View style={styles.recallModalBox}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Zap size={18} color={Colors.reframeGold} />
              <Text style={styles.recallModalHeading}>Spaced Memory Flash</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <X size={18} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.recallBookTitle}>
            Book: {item.scroll.title} ({item.scroll.authorOrTradition})
          </Text>
          <Text style={styles.recallModalPrompt}>{item.challenge.scenarioPrompt}</Text>
          <Text style={styles.recallModalQuestion}>{item.challenge.question}</Text>

          <View style={{ gap: 6, marginVertical: 10 }}>
            {item.challenge.options.map((opt, optIdx) => {
              const isSelected = recallAnswer === optIdx;
              const isCorrect = item.challenge.correctIndex === optIdx;
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
            <Text style={styles.explanationText}>💡 {item.challenge.explanation}</Text>
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
            <TouchableOpacity style={styles.retryBtn} onPress={onClose}>
              <Text style={styles.retryBtnText}>Continue Journey</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};
