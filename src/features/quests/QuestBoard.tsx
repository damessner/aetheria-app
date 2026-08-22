import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { QuestItem, EnergyTier } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { CheckCircle2, Split, Sparkles, Heart, Zap } from 'lucide-react-native';
import { BreakDownModal } from './BreakDownModal';
import { EventBus } from '../../core/eventbus/EventBus';
import { Gemini } from '../../core/ai/gemini';

interface QuestBoardProps {
  quests: QuestItem[];
  energyTier: EnergyTier;
  onCompleteQuest: (questId: string) => void;
  onQuestsUpdated: (updated: QuestItem[]) => void;
}

export const QuestBoard: React.FC<QuestBoardProps> = ({
  quests,
  energyTier,
  onCompleteQuest,
  onQuestsUpdated,
}) => {
  const [selectedQuestForDecompose, setSelectedQuestForDecompose] = useState<QuestItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter quests based on current energy tier
  const filteredQuests = quests.filter((q) => {
    if (energyTier === 'LOW_10') return q.energyCostTier === 'LOW_10';
    if (energyTier === 'STEADY_40') return q.energyCostTier === 'LOW_10' || q.energyCostTier === 'STEADY_40';
    return true;
  });

  const handleGenerateAiQuests = async () => {
    setIsGenerating(true);
    try {
      const newQuests = await Gemini.generateDynamicQuests(energyTier);
      if (newQuests.length > 0) {
        const merged = [...newQuests, ...quests];
        onQuestsUpdated(merged);
      } else {
        Alert.alert('Notice', 'Generated fallback quests tailored to your energy level.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Daily Behavioral Quests</Text>
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateAiQuests} disabled={isGenerating}>
          <Sparkles size={14} color={Colors.reframeGold} />
          <Text style={styles.generateButtonText}>
            {isGenerating ? 'Weaving...' : '+ AI Quests'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredQuests}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={{ gap: Spacing.sm }}
        renderItem={({ item }) => {
          return (
            <View style={[styles.questCard, item.isCompleted && styles.questCardCompleted]}>
              <View style={styles.questContent}>
                <View style={styles.tagRow}>
                  <Text style={styles.categoryBadge}>{item.category}</Text>
                  <Text style={styles.skillBadge}>{item.clinicalSkill} Skill</Text>
                </View>
                <Text style={[styles.questTitle, item.isCompleted && styles.questTitleCompleted]}>
                  {item.title}
                </Text>
                <Text style={styles.questDesc}>{item.description}</Text>

                <View style={styles.rewardRow}>
                  <View style={styles.rewardItem}>
                    <Heart size={12} color={Colors.vitalityGreen} />
                    <Text style={styles.rewardText}>+{item.rewards.vitalityPoints} VP</Text>
                  </View>
                  <View style={styles.rewardItem}>
                    <Zap size={12} color={Colors.clarityMana} />
                    <Text style={styles.rewardText}>+{item.rewards.clarityMana} Mana</Text>
                  </View>
                </View>
              </View>

              <View style={styles.questActions}>
                {!item.isCompleted && (
                  <TouchableOpacity
                    style={styles.breakDownBtn}
                    onPress={() => setSelectedQuestForDecompose(item)}
                  >
                    <Split size={14} color={Colors.clarityMana} />
                    <Text style={styles.breakDownText}>Break Down</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.completeBtn, item.isCompleted && styles.completeBtnDone]}
                  onPress={() => onCompleteQuest(item.id)}
                  disabled={item.isCompleted}
                >
                  <CheckCircle2
                    size={20}
                    color={item.isCompleted ? Colors.vitalityGreen : Colors.textMuted}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <BreakDownModal
        quest={selectedQuestForDecompose}
        energyTier={energyTier}
        visible={!!selectedQuestForDecompose}
        onClose={() => setSelectedQuestForDecompose(null)}
        onCompleteMicroStep={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  generateButtonText: {
    color: Colors.reframeGold,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  questCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: Spacing.md,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  questCardCompleted: {
    opacity: 0.6,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  questContent: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 4,
  },
  categoryBadge: {
    backgroundColor: Colors.surfaceLight,
    color: Colors.textSecondary,
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '600',
  },
  skillBadge: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    color: Colors.logicBlue,
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '600',
  },
  questTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  questTitleCompleted: {
    textDecorationLine: 'line-through',
  },
  questDesc: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: Spacing.xs,
  },
  rewardRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: 4,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rewardText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  questActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  breakDownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  breakDownText: {
    color: Colors.clarityMana,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 3,
  },
  completeBtn: {
    padding: 6,
  },
  completeBtnDone: {
    backgroundColor: 'transparent',
  },
});
