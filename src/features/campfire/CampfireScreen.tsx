import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { CampfireMessage, UserState } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import { Gemini } from '../../core/ai/gemini';
import { EventBus } from '../../core/eventbus/EventBus';
import {
  Flame,
  Send,
  Sparkles,
  BookMarked,
  HeartHandshake,
  Brain,
  Zap,
  RotateCcw,
} from 'lucide-react-native';

interface CampfireScreenProps {
  userState: UserState;
}

type CompanionKey = 'KAEL_OWL' | 'PYRA_FOX' | 'LIORA_NYMPH';

export const CampfireScreen: React.FC<CampfireScreenProps> = ({ userState }) => {
  const [selectedCompanion, setSelectedCompanion] = useState<CompanionKey>('KAEL_OWL');
  const [messages, setMessages] = useState<CampfireMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const companions: {
    id: CompanionKey;
    name: string;
    title: string;
    icon: any;
    color: string;
    greeting: string;
  }[] = [
    {
      id: 'KAEL_OWL',
      name: 'Kael the Owl-Sage',
      title: 'CBT & Stoic Logic',
      icon: Brain,
      color: Colors.reframeGold,
      greeting: 'Greetings, seeker. What thoughts cloud your sanctuary today? Let us examine them with clear reason.',
    },
    {
      id: 'PYRA_FOX',
      name: 'Pyra the Ember-Fox',
      title: 'Behavioral Spark',
      icon: Zap,
      color: Colors.vitalityGreen,
      greeting: 'Hey there! Ready to spark some energy? Even the smallest step counts. What are we tackling?',
    },
    {
      id: 'LIORA_NYMPH',
      name: 'Liora the Water-Nymph',
      title: 'Somatic Compassion',
      icon: HeartHandshake,
      color: Colors.compassionPink,
      greeting: 'Welcome to the waters of calm. Breathe deeply and rest here. How is your heart feeling in this moment?',
    },
  ];

  useEffect(() => {
    loadChat(selectedCompanion);
  }, [selectedCompanion]);

  const loadChat = async (companionId: CompanionKey) => {
    const saved = await Database.getCampfireMessages(companionId);
    if (saved.length === 0) {
      const active = companions.find((c) => c.id === companionId)!;
      const initial: CampfireMessage = {
        id: 'msg_init_' + Date.now(),
        companionId,
        sender: 'companion',
        text: active.greeting,
        timestamp: new Date().toISOString(),
      };
      setMessages([initial]);
      await Database.saveCampfireMessages(companionId, [initial]);
    } else {
      setMessages(saved);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText('');
    const userMsg: CampfireMessage = {
      id: 'msg_usr_' + Date.now(),
      companionId: selectedCompanion,
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsLoading(true);

    try {
      const companionReply = await Gemini.chatWithCompanion(
        selectedCompanion,
        text,
        messages.map((m) => ({ sender: m.sender, text: m.text })),
        userState.energyTier
      );

      const companionMsg: CampfireMessage = {
        id: 'msg_cmp_' + Date.now(),
        companionId: selectedCompanion,
        sender: 'companion',
        text: companionReply,
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updated, companionMsg];
      setMessages(finalMessages);
      await Database.saveCampfireMessages(selectedCompanion, finalMessages);
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const handleExtractInsight = async (msg: CampfireMessage) => {
    const active = companions.find((c) => c.id === selectedCompanion)!;
    await Database.addVictoryCodexEntry({
      bossName: active.name,
      thought: 'Socratic Dialogue at the Campfire',
      reframe: msg.text,
    });

    // Reward user with Vitality Points
    const updatedState: UserState = {
      ...userState,
      vitalityPoints: userState.vitalityPoints + 25,
      clarityMana: userState.clarityMana + 1,
      sanctuary: {
        ...userState.sanctuary,
        gloomClearingPercentage: Math.min(100, userState.sanctuary.gloomClearingPercentage + 5),
      },
    };
    await Database.saveUserState(updatedState);
    EventBus.emit('quest:completed', { questId: 'campfire_insight', vpEarned: 25, manaEarned: 1 });

    const marked = messages.map((m) => (m.id === msg.id ? { ...m, insightExtracted: true } : m));
    setMessages(marked);
    await Database.saveCampfireMessages(selectedCompanion, marked);

    Alert.alert(
      '✨ Insight Inscribed in Codex!',
      `This breakthrough has been inscribed in your Codex of Wisdom.\n\nRewards: +25 VP, +1 Clarity Mana, +5% Gloom Cleared.`
    );
  };

  const handleResetChat = async () => {
    const active = companions.find((c) => c.id === selectedCompanion)!;
    const initial: CampfireMessage = {
      id: 'msg_init_' + Date.now(),
      companionId: selectedCompanion,
      sender: 'companion',
      text: active.greeting,
      timestamp: new Date().toISOString(),
    };
    setMessages([initial]);
    await Database.saveCampfireMessages(selectedCompanion, [initial]);
  };

  const activeCompanion = companions.find((c) => c.id === selectedCompanion)!;

  const quickPrompts = [
    'My inner critic is very loud today.',
    'I feel stuck and unable to start.',
    'Help me untangle my thoughts before sleep.',
    'I am afraid I will disappoint people.',
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Campfire Header Atmosphere */}
      <View style={styles.campfireHeader}>
        <View style={styles.headerTitleRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Flame size={20} color={Colors.reframeGold} />
            <Text style={styles.headerTitle}>The Inner Campfire</Text>
          </View>
          <TouchableOpacity onPress={handleResetChat} style={styles.resetBtn}>
            <RotateCcw size={14} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>
          Socratic dialogue & self-discovery with your clinical spirit companions.
        </Text>

        {/* Companion Selector Pills */}
        <View style={styles.companionSelectorRow}>
          {companions.map((c) => {
            const isSelected = selectedCompanion === c.id;
            const IconComp = c.icon;
            return (
              <TouchableOpacity
                key={c.id}
                style={[
                  styles.companionPill,
                  isSelected && { borderColor: c.color, backgroundColor: 'rgba(251, 191, 36, 0.12)' },
                ]}
                onPress={() => setSelectedCompanion(c.id)}
              >
                <IconComp size={14} color={isSelected ? c.color : Colors.textMuted} />
                <Text
                  style={[
                    styles.companionPillText,
                    isSelected && { color: c.color, fontWeight: '700' },
                  ]}
                >
                  {c.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Messages Scroll Area */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <View
              key={msg.id}
              style={[
                styles.bubbleContainer,
                isUser ? styles.bubbleUserContainer : styles.bubbleCompanionContainer,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  isUser ? styles.bubbleUser : styles.bubbleCompanion,
                  !isUser && { borderLeftColor: activeCompanion.color, borderLeftWidth: 3 },
                ]}
              >
                {!isUser && <Text style={[styles.senderName, { color: activeCompanion.color }]}>{activeCompanion.name}</Text>}
                <Text style={styles.bubbleText}>{msg.text}</Text>

                {!isUser && (
                  <TouchableOpacity
                    style={[styles.extractBtn, msg.insightExtracted && styles.extractBtnDone]}
                    onPress={() => handleExtractInsight(msg)}
                    disabled={msg.insightExtracted}
                  >
                    <BookMarked size={12} color={msg.insightExtracted ? Colors.vitalityGreen : Colors.reframeGold} />
                    <Text
                      style={[
                        styles.extractBtnText,
                        msg.insightExtracted && { color: Colors.vitalityGreen },
                      ]}
                    >
                      {msg.insightExtracted ? 'Insight Inscribed in Codex' : 'Inscribe Insight (+25 VP)'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}

        {isLoading && (
          <View style={[styles.bubbleContainer, styles.bubbleCompanionContainer]}>
            <View style={[styles.bubble, styles.bubbleCompanion, { flexDirection: 'row', gap: 6, alignItems: 'center' }]}>
              <ActivityIndicator size="small" color={activeCompanion.color} />
              <Text style={styles.thinkingText}>{activeCompanion.name} is reflecting...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Prompts Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickPromptsScroll}
        contentContainerStyle={styles.quickPromptsContent}
      >
        {quickPrompts.map((prompt, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.quickPromptPill}
            onPress={() => handleSendMessage(prompt)}
          >
            <Sparkles size={12} color={Colors.clarityMana} />
            <Text style={styles.quickPromptText}>{prompt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.textInput}
          placeholder={`Speak with ${activeCompanion.name.split(' ')[0]}...`}
          placeholderTextColor={Colors.textMuted}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
          onPress={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
        >
          <Send size={16} color="#0A0A0E" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  campfireHeader: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
    marginBottom: Spacing.sm,
  },
  resetBtn: {
    padding: 4,
  },
  companionSelectorRow: {
    flexDirection: 'row',
    gap: 6,
  },
  companionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  companionPillText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  bubbleContainer: {
    marginBottom: Spacing.sm,
  },
  bubbleUserContainer: {
    alignItems: 'flex-end',
  },
  bubbleCompanionContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    padding: Spacing.md,
    borderRadius: 12,
  },
  bubbleUser: {
    backgroundColor: Colors.surfaceLight,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  bubbleCompanion: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  senderName: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  bubbleText: {
    color: Colors.textPrimary,
    fontSize: 13,
    lineHeight: 18,
  },
  extractBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  extractBtnDone: {
    opacity: 0.8,
  },
  extractBtnText: {
    color: Colors.reframeGold,
    fontSize: 10,
    fontWeight: '600',
  },
  thinkingText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
  },
  quickPromptsScroll: {
    maxHeight: 38,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  quickPromptsContent: {
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    gap: 6,
  },
  quickPromptPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  quickPromptText: {
    color: Colors.textSecondary,
    fontSize: 10,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    color: Colors.textPrimary,
    fontSize: 13,
    maxHeight: 80,
  },
  sendBtn: {
    backgroundColor: Colors.reframeGold,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
});
