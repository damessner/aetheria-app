import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TherapeuticTechnique } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { METHOD_CODEX_REGISTRY } from '../../core/methods/methodRegistry';
export { METHOD_CODEX_REGISTRY };
import {
  ShieldCheck,
  Heart,
  Zap,
  Scale,
  Waves,
  Hammer,
  Wind,
  Brain,
  X,
  Sparkles,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react-native';
interface MethodCodexModalProps {
  visible: boolean;
  initialMethod?: TherapeuticTechnique;
  onClose: () => void;
}

export const MethodCodexModal: React.FC<MethodCodexModalProps> = ({
  visible,
  initialMethod,
  onClose,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<TherapeuticTechnique>(
    initialMethod || 'CBT_REALITY_CHECK'
  );

  const methodsList = Object.values(METHOD_CODEX_REGISTRY);
  const currentItem = METHOD_CODEX_REGISTRY[selectedMethod] || METHOD_CODEX_REGISTRY.CBT_REALITY_CHECK;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <BookOpen size={20} color={Colors.reframeGold} />
            <Text style={styles.headerTitle}>The Method Codex</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <X size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Method Horizontal Chips */}
        <View style={styles.chipsRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: Spacing.md }}>
            {methodsList.map((m) => {
              const isSelected = m.id === selectedMethod;
              return (
                <TouchableOpacity
                  key={m.id}
                  style={[styles.chip, isSelected && styles.chipActive]}
                  onPress={() => setSelectedMethod(m.id)}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                    {m.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Main Dossier Content */}
        <ScrollView style={styles.body} contentContainerStyle={{ padding: Spacing.md, paddingBottom: Spacing.xxl }}>
          {/* Method Hero */}
          <View style={styles.heroCard}>
            <Text style={styles.founderText}>{currentItem.founderTradition}</Text>
            <Text style={styles.methodTitle}>{currentItem.name}</Text>
            <Text style={styles.taglineText}>"{currentItem.tagline}"</Text>
          </View>

          {/* 1. Neurobiology & Why It Works */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Brain size={16} color={Colors.clarityMana} />
              <Text style={styles.sectionTitle}>Neurobiological Mechanism (Why It Works)</Text>
            </View>
            <Text style={styles.sectionBody}>{currentItem.neurobiologicalMechanism}</Text>
          </View>

          {/* 2. Parenting & Teaching Application */}
          <View style={[styles.sectionCard, { borderColor: Colors.vitalityGreen }]}>
            <View style={styles.sectionHeaderRow}>
              <Heart size={16} color={Colors.vitalityGreen} />
              <Text style={[styles.sectionTitle, { color: Colors.vitalityGreen }]}>
                In Fatherhood, Teaching & Relationships
              </Text>
            </View>
            <Text style={styles.sectionBody}>{currentItem.parentingAndTeachingBenefit}</Text>
          </View>

          {/* 3. When to Use & Common Traps */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <CheckCircle2 size={16} color={Colors.reframeGold} />
              <Text style={styles.sectionTitle}>When to Apply</Text>
            </View>
            <Text style={styles.sectionBody}>{currentItem.whenToUse}</Text>

            <View style={styles.pitfallBox}>
              <AlertCircle size={14} color={Colors.distortionRed} />
              <Text style={styles.pitfallText}>
                <Text style={{ fontWeight: '700' }}>Common Pitfall: </Text>
                {currentItem.commonPitfalls}
              </Text>
            </View>
          </View>

          {/* 4. Mental Algorithm */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Sparkles size={16} color={Colors.reframeGold} />
              <Text style={styles.sectionTitle}>Step-by-Step Mental Algorithm</Text>
            </View>
            <View style={{ gap: 8, marginTop: 6 }}>
              {currentItem.algorithmSteps.map((step, idx) => (
                <View key={idx} style={styles.stepRow}>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 4,
  },
  chipsRow: {
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  chip: {
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    borderColor: Colors.reframeGold,
  },
  chipText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextActive: {
    color: Colors.reframeGold,
    fontWeight: '700',
  },
  body: {
    flex: 1,
  },
  heroCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  founderText: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  methodTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  taglineText: {
    color: Colors.reframeGold,
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  sectionCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  sectionBody: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  pitfallBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(244, 63, 94, 0.08)',
    padding: Spacing.xs,
    borderRadius: 6,
    gap: 6,
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  pitfallText: {
    color: Colors.distortionRed,
    fontSize: 11,
    flex: 1,
    lineHeight: 15,
  },
  stepRow: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.xs,
    borderRadius: 6,
  },
  stepText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 16,
  },
});
