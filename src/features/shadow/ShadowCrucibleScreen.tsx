import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ShadowDossier, ShadowFlawType, UserState, CardinalVirtues } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import { Gemini } from '../../core/ai/gemini';
import { EventBus } from '../../core/eventbus/EventBus';
import {
  Flame,
  ShieldAlert,
  Skull,
  Award,
  Sparkles,
  CheckCircle2,
  X,
  Send,
  HelpCircle,
  Zap,
  Scale,
  Brain,
  Eye,
  AlertTriangle,
  Compass,
  Crown,
  HeartCrack,
} from 'lucide-react-native';

interface ShadowCrucibleScreenProps {
  userState: UserState;
}

export const ShadowCrucibleScreen: React.FC<ShadowCrucibleScreenProps> = ({ userState }) => {
  const [dossiers, setDossiers] = useState<ShadowDossier[]>([]);
  const [selectedDossier, setSelectedDossier] = useState<ShadowDossier | null>(null);
  const [virtues, setVirtues] = useState<CardinalVirtues>({
    courage: 30,
    integrity: 35,
    temperance: 25,
    humility: 20,
  });

  // Inquest Chat State
  const [isInquestOpen, setIsInquestOpen] = useState(false);
  const [inquestMessages, setInquestMessages] = useState<{ sender: 'user' | 'inquisitor'; text: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [isInterrogating, setIsInterrogating] = useState(false);
  const chatScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const list = await Database.getShadowDossiers();
    const v = await Database.getCardinalVirtues();
    setDossiers(list);
    setVirtues(v);
  };

  const handleOpenDossier = (dossier: ShadowDossier) => {
    setSelectedDossier(dossier);
    setIsInquestOpen(false);
    setInquestMessages([]);
  };

  const handleStartInquest = () => {
    if (!selectedDossier) return;
    setIsInquestOpen(true);
    setInquestMessages([
      {
        sender: 'inquisitor',
        text: `You stand before the Crucible for ${selectedDossier.name}. Confess where this shadow hijacked your actions or speech recently. Offer no excuses—speak the unvarnished truth.`,
      },
    ]);
  };

  const handleSendInquestMessage = async () => {
    const text = inputText.trim();
    if (!text || isInterrogating || !selectedDossier) return;

    setInputText('');
    const userMsg = { sender: 'user' as const, text };
    const updated = [...inquestMessages, userMsg];
    setInquestMessages(updated);
    setIsInterrogating(true);

    try {
      const reply = await Gemini.interrogateShadowBlindspot(selectedDossier.id, text, updated);
      setInquestMessages([...updated, { sender: 'inquisitor', text: reply }]);
    } finally {
      setIsInterrogating(false);
      setTimeout(() => chatScrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const handleCompleteVow = async (flawId: ShadowFlawType) => {
    await Database.completeCrucibleVow(flawId);
    EventBus.emit('quest:completed', { questId: `vow_${flawId}`, vpEarned: 60, manaEarned: 3 });
    Alert.alert(
      '🔥 Crucible Vow Fulfilled!',
      `You forged ${selectedDossier?.virtueForgedName || 'Cardinal Virtue'}!\n\nRewards: +60 VP, +3 Clarity Mana, +15 Virtue Resonance.`
    );
    await loadData();
    setSelectedDossier(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Crucible Header Atmosphere */}
      <View style={styles.headerCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Flame size={22} color={Colors.distortionRed} />
          <Text style={styles.headerTitle}>The Shadow Crucible</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Radical self-honesty & ego deconstruction. Confront your 10 deepest character flaws, pierce self-deceptions, and forge the 4 Cardinal Virtues.
        </Text>

        {/* 4 Cardinal Virtues Radar Grid */}
        <View style={styles.virtuesGrid}>
          <View style={styles.virtuePill}>
            <Text style={styles.virtuePillLabel}>🦁 Courage</Text>
            <Text style={styles.virtuePillValue}>{virtues.courage}%</Text>
          </View>
          <View style={styles.virtuePill}>
            <Text style={styles.virtuePillLabel}>⚖️ Integrity</Text>
            <Text style={styles.virtuePillValue}>{virtues.integrity}%</Text>
          </View>
          <View style={styles.virtuePill}>
            <Text style={styles.virtuePillLabel}>🧘 Temperance</Text>
            <Text style={styles.virtuePillValue}>{virtues.temperance}%</Text>
          </View>
          <View style={styles.virtuePill}>
            <Text style={styles.virtuePillLabel}>🦉 Humility</Text>
            <Text style={styles.virtuePillValue}>{virtues.humility}%</Text>
          </View>
        </View>
      </View>

      {/* 10 Shadow Dossiers List */}
      <View style={{ gap: Spacing.md }}>
        {dossiers.map((dossier, idx) => {
          return (
            <TouchableOpacity
              key={dossier.id}
              style={[
                styles.dossierCard,
                dossier.isVowCompleted && styles.dossierCardCompleted,
                { borderLeftColor: dossier.color, borderLeftWidth: 4 },
              ]}
              onPress={() => handleOpenDossier(dossier)}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeaderRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={[styles.flawIndex, { color: dossier.color }]}>#{idx + 1}</Text>
                  <Text style={styles.dossierName}>{dossier.name}</Text>
                </View>
                {dossier.isVowCompleted ? (
                  <View style={styles.completedBadge}>
                    <CheckCircle2 size={13} color={Colors.vitalityGreen} />
                    <Text style={styles.completedText}>Forged</Text>
                  </View>
                ) : (
                  <View style={styles.virtueTargetBadge}>
                    <Award size={12} color={Colors.reframeGold} />
                    <Text style={styles.virtueTargetText}>{dossier.associatedVirtue}</Text>
                  </View>
                )}
              </View>

              <Text style={styles.dossierTitle}>{dossier.title}</Text>

              <View style={styles.unconsciousTerrorBox}>
                <AlertTriangle size={12} color={Colors.distortionRed} />
                <Text style={styles.unconsciousTerrorText} numberOfLines={2}>
                  {dossier.unconsciousTerror}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Deep Dossier Modal */}
      {selectedDossier && (
        <Modal
          visible={!!selectedDossier}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedDossier(null)}
        >
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.modalFlawTag, { color: selectedDossier.color }]}>
                  SHADOW DOSSIER • {selectedDossier.associatedVirtue}
                </Text>
                <Text style={styles.modalTitle}>{selectedDossier.name}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedDossier(null)} style={styles.closeBtn}>
                <X size={20} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Dossier Content / Inquest Switcher */}
            <ScrollView style={styles.modalBody} contentContainerStyle={{ paddingBottom: Spacing.xxl }}>
              {!isInquestOpen ? (
                <>
                  {/* 1. Psychological Root Anatomy */}
                  <View style={styles.sectionBox}>
                    <Text style={styles.sectionHeader}>1. Psychoanalytic Root Anatomy</Text>
                    <Text style={styles.sectionBodyText}>{selectedDossier.psychoanalyticAnatomy}</Text>
                  </View>

                  {/* 2. Seductive Self-Deceptions */}
                  <View style={styles.sectionBox}>
                    <Text style={styles.sectionHeader}>2. Seductive Self-Deceptions & Rationalizations</Text>
                    <View style={{ gap: 6, marginTop: 4 }}>
                      {selectedDossier.selfDeceptions.map((deception, dIdx) => (
                        <View key={dIdx} style={styles.deceptionPill}>
                          <Text style={styles.deceptionText}>{deception}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* 3. Hidden Relational Poison */}
                  <View style={styles.sectionBox}>
                    <Text style={styles.sectionHeader}>3. Hidden Relational Poison</Text>
                    <Text style={styles.poisonText}>{selectedDossier.hiddenRelationalPoison}</Text>
                  </View>

                  {/* 4. Socratic Razor Probes */}
                  <View style={styles.sectionBox}>
                    <Text style={styles.sectionHeader}>4. Socratic Razor Probes (Self-Inquiry)</Text>
                    <View style={{ gap: 8, marginTop: 4 }}>
                      {selectedDossier.razorProbes.map((probe, pIdx) => (
                        <View key={pIdx} style={styles.probeBox}>
                          <HelpCircle size={14} color={Colors.reframeGold} />
                          <Text style={styles.probeText}>{probe}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* 5. Acute Emergency Protocol */}
                  <View style={styles.emergencyBox}>
                    <Zap size={16} color={Colors.reframeGold} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.emergencyHeader}>Acute 10-Second Emergency Protocol</Text>
                      <Text style={styles.emergencyText}>{selectedDossier.acuteEmergencyProtocol}</Text>
                    </View>
                  </View>

                  {/* 6. Real-World Behavioral Vow */}
                  <View style={styles.vowBox}>
                    <Award size={18} color={Colors.vitalityGreen} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.vowHeader}>The Crucible Behavioral Vow</Text>
                      <Text style={styles.vowBodyText}>{selectedDossier.crucibleVowText}</Text>
                      <Text style={styles.vowRewardText}>
                        Forges: <Text style={{ fontWeight: '700', color: Colors.vitalityGreen }}>{selectedDossier.virtueForgedName} (+15 {selectedDossier.associatedVirtue})</Text>
                      </Text>
                    </View>
                  </View>

                  {/* Buttons */}
                  <View style={{ gap: 8, marginTop: Spacing.md }}>
                    <TouchableOpacity style={styles.inquestStartBtn} onPress={handleStartInquest}>
                      <Brain size={16} color="#0A0A0E" />
                      <Text style={styles.inquestStartBtnText}>Enter Socratic Blindspot Inquest</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.fulfillVowBtn}
                      onPress={() => handleCompleteVow(selectedDossier.id)}
                    >
                      <CheckCircle2 size={16} color="#0A0A0E" />
                      <Text style={styles.fulfillVowBtnText}>I Have Executed This Vow (+60 VP)</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                /* LIVE SOCRATIC INQUEST CHAT */
                <View style={styles.inquestChatContainer}>
                  <View style={styles.inquestChatHeader}>
                    <Brain size={16} color={Colors.distortionRed} />
                    <Text style={styles.inquestChatTitle}>The Inquisitor's Razor</Text>
                  </View>

                  <ScrollView ref={chatScrollRef} style={styles.inquestMessagesScroll}>
                    {inquestMessages.map((msg, mIdx) => (
                      <View
                        key={mIdx}
                        style={[
                          styles.inquestBubble,
                          msg.sender === 'user' ? styles.inquestBubbleUser : styles.inquestBubbleInquisitor,
                        ]}
                      >
                        <Text style={styles.inquestSenderTag}>
                          {msg.sender === 'user' ? 'Seeker Confession' : 'Socratic Inquisitor'}
                        </Text>
                        <Text style={styles.inquestBubbleText}>{msg.text}</Text>
                      </View>
                    ))}

                    {isInterrogating && (
                      <View style={[styles.inquestBubble, styles.inquestBubbleInquisitor, { flexDirection: 'row', gap: 6 }]}>
                        <ActivityIndicator size="small" color={Colors.distortionRed} />
                        <Text style={styles.inquestThinkingText}>Inquisitor is examining your rationalization...</Text>
                      </View>
                    )}
                  </ScrollView>

                  {/* Input Bar */}
                  <View style={styles.inquestInputBar}>
                    <TextInput
                      style={styles.inquestInput}
                      placeholder="Speak with zero excuses or rationalizations..."
                      placeholderTextColor={Colors.textMuted}
                      value={inputText}
                      onChangeText={setInputText}
                      multiline
                    />
                    <TouchableOpacity
                      style={[styles.inquestSendBtn, !inputText.trim() && styles.inquestSendBtnDisabled]}
                      onPress={handleSendInquestMessage}
                      disabled={!inputText.trim() || isInterrogating}
                    >
                      <Send size={16} color="#0A0A0E" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.backToDossierBtn}
                    onPress={() => setIsInquestOpen(false)}
                  >
                    <Text style={styles.backToDossierText}>Back to Shadow Dossier</Text>
                  </TouchableOpacity>
                </View>
              )}
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
    marginBottom: Spacing.sm,
  },
  virtuesGrid: {
    flexDirection: 'row',
    gap: 6,
    marginTop: Spacing.xs,
  },
  virtuePill: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  virtuePillLabel: {
    color: Colors.textSecondary,
    fontSize: 9,
    fontWeight: '600',
  },
  virtuePillValue: {
    color: Colors.reframeGold,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  dossierCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dossierCardCompleted: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: 'rgba(16, 185, 129, 0.03)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  flawIndex: {
    fontSize: 12,
    fontWeight: '800',
  },
  dossierName: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
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
  virtueTargetBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  virtueTargetText: {
    color: Colors.reframeGold,
    fontSize: 9,
    fontWeight: '700',
  },
  dossierTitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: Spacing.xs,
  },
  unconsciousTerrorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    padding: Spacing.xs,
    borderRadius: 6,
    gap: 6,
    marginTop: Spacing.xs,
  },
  unconsciousTerrorText: {
    color: Colors.distortionRed,
    fontSize: 10,
    flex: 1,
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
  modalFlawTag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
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
  sectionBox: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionHeader: {
    color: Colors.reframeGold,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionBodyText: {
    color: Colors.textPrimary,
    fontSize: 13,
    lineHeight: 19,
  },
  deceptionPill: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.xs,
    borderRadius: 6,
    borderLeftWidth: 2,
    borderLeftColor: Colors.distortionRed,
  },
  deceptionText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
  },
  poisonText: {
    color: Colors.distortionRed,
    fontSize: 12,
    lineHeight: 17,
  },
  probeBox: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.xs,
    borderRadius: 6,
    gap: 8,
  },
  probeText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
  },
  emergencyBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
    borderWidth: 1,
    borderColor: Colors.reframeGold,
    borderRadius: 10,
    padding: Spacing.md,
    gap: 10,
    marginBottom: Spacing.md,
  },
  emergencyHeader: {
    color: Colors.reframeGold,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  emergencyText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 16,
  },
  vowBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1,
    borderColor: Colors.vitalityGreen,
    borderRadius: 10,
    padding: Spacing.md,
    gap: 10,
    marginBottom: Spacing.md,
  },
  vowHeader: {
    color: Colors.vitalityGreen,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  vowBodyText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 17,
  },
  vowRewardText: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  inquestStartBtn: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  inquestStartBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 13,
  },
  fulfillVowBtn: {
    backgroundColor: Colors.vitalityGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  fulfillVowBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 13,
  },
  inquestChatContainer: {
    flex: 1,
  },
  inquestChatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  inquestChatTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  inquestMessagesScroll: {
    maxHeight: 320,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  inquestBubble: {
    padding: Spacing.sm,
    borderRadius: 8,
    marginBottom: Spacing.xs,
  },
  inquestBubbleUser: {
    backgroundColor: Colors.surfaceLight,
    alignSelf: 'flex-end',
    maxWidth: '90%',
  },
  inquestBubbleInquisitor: {
    backgroundColor: 'rgba(244, 63, 94, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: Colors.distortionRed,
    alignSelf: 'flex-start',
    maxWidth: '95%',
  },
  inquestSenderTag: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  inquestBubbleText: {
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 16,
  },
  inquestThinkingText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
  },
  inquestInputBar: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  inquestInput: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    padding: Spacing.sm,
    color: Colors.textPrimary,
    fontSize: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    maxHeight: 70,
  },
  inquestSendBtn: {
    backgroundColor: Colors.reframeGold,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inquestSendBtnDisabled: {
    opacity: 0.4,
  },
  backToDossierBtn: {
    marginTop: Spacing.md,
    paddingVertical: 8,
    alignItems: 'center',
  },
  backToDossierText: {
    color: Colors.textMuted,
    fontSize: 11,
  },
});
