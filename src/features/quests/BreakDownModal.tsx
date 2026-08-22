import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors, Spacing } from '../../core/theme';
import { QuestItem, EnergyTier } from '../../core/types';
import { Gemini } from '../../core/ai/gemini';
import { Sparkles, CheckCircle2, Circle, X } from 'lucide-react-native';

interface BreakDownModalProps {
  quest: QuestItem | null;
  energyTier: EnergyTier;
  visible: boolean;
  onClose: () => void;
  onCompleteMicroStep: (stepIndex: number) => void;
}

export const BreakDownModal: React.FC<BreakDownModalProps> = ({
  quest,
  energyTier,
  visible,
  onClose,
  onCompleteMicroStep,
}) => {
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[]>(quest?.microSteps || []);
  const [completedIndices, setCompletedIndices] = useState<Set<number>>(new Set());

  React.useEffect(() => {
    if (quest) {
      setSteps(quest.microSteps);
      setCompletedIndices(new Set());
    }
  }, [quest]);

  if (!quest) return null;

  const handleGeminiRegenerate = async () => {
    setLoading(true);
    try {
      const newSteps = await Gemini.decomposeTask(quest.title, energyTier);
      setSteps(newSteps);
      setCompletedIndices(new Set());
    } finally {
      setLoading(false);
    }
  };

  const toggleStep = (idx: number) => {
    const next = new Set(completedIndices);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
      onCompleteMicroStep(idx);
    }
    setCompletedIndices(next);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.badge}>Executive Dysfunction Shield</Text>
              <Text style={styles.title}>{quest.title}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Break this overwhelming task into atomic, zero-resistance baby steps:
          </Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={Colors.clarityMana} />
              <Text style={styles.loadingText}>Kael is deconstructing your task...</Text>
            </View>
          ) : (
            <View style={styles.stepList}>
              {steps.map((step, idx) => {
                const isDone = completedIndices.has(idx);
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.stepItem, isDone && styles.stepItemDone]}
                    onPress={() => toggleStep(idx)}
                  >
                    {isDone ? (
                      <CheckCircle2 size={20} color={Colors.vitalityGreen} />
                    ) : (
                      <Circle size={20} color={Colors.textMuted} />
                    )}
                    <Text style={[styles.stepText, isDone && styles.stepTextDone]}>{step}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          <View style={styles.footer}>
            <TouchableOpacity style={styles.aiButton} onPress={handleGeminiRegenerate} disabled={loading}>
              <Sparkles size={16} color={Colors.reframeGold} />
              <Text style={styles.aiButtonText}>AI Re-decompose with Gemini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  badge: {
    color: Colors.clarityMana,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 4,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: Spacing.md,
  },
  stepList: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepItemDone: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: Colors.vitalityGreen,
  },
  stepText: {
    color: Colors.textPrimary,
    fontSize: 14,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  stepTextDone: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  loadingContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderWidth: 1,
    borderColor: Colors.reframeGold,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  aiButtonText: {
    color: Colors.reframeGold,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
});
