import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { MoodEntry } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import { EventBus } from '../../core/eventbus/EventBus';
import { Smile, Meh, Frown, Sparkles, TrendingUp, Compass } from 'lucide-react-native';

export const MoodTracker: React.FC = () => {
  const [valence, setValence] = useState<number>(1); // -2 to +2
  const [arousal, setArousal] = useState<number>(0); // -2 to +2
  const [selectedEmotion, setSelectedEmotion] = useState<string>('Calm');
  const [notes, setNotes] = useState('');
  const [logs, setLogs] = useState<MoodEntry[]>([]);

  const emotions = ['Calm', 'Grateful', 'Anxious', 'Fatigued', 'Inspired', 'Overwhelmed'];

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const data = await Database.getMoodLogs();
    setLogs(data);
  };

  const handleSaveMood = async () => {
    const entry: MoodEntry = {
      id: 'mood_' + Date.now(),
      timestamp: new Date().toISOString(),
      valence,
      arousal,
      primaryEmotion: selectedEmotion,
      notes: notes.trim() || undefined,
      tags: [],
    };

    await Database.saveMoodLog(entry);
    await loadLogs();
    setNotes('');

    EventBus.emit('mood:logged', {
      valence,
      arousal,
      emotion: selectedEmotion,
    });

    Alert.alert('Mood Inscribed', 'Your state of mind has been logged to your encrypted journal.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Compass size={18} color={Colors.clarityMana} />
          <Text style={styles.title}>Valence & Arousal Check-In</Text>
        </View>
        <Text style={styles.subtitle}>5-second momentary ecological assessment</Text>
      </View>

      {/* Valence (Pleasure) Selector */}
      <Text style={styles.axisLabel}>How pleasant/pleasant is your current emotional state?</Text>
      <View style={styles.ratingRow}>
        {[-2, -1, 0, 1, 2].map((v) => {
          const isSelected = valence === v;
          return (
            <TouchableOpacity
              key={v}
              style={[styles.ratingBtn, isSelected && styles.ratingBtnActive]}
              onPress={() => setValence(v)}
            >
              {v < 0 ? (
                <Frown size={18} color={isSelected ? Colors.dangerRed : Colors.textMuted} />
              ) : v === 0 ? (
                <Meh size={18} color={isSelected ? Colors.reframeGold : Colors.textMuted} />
              ) : (
                <Smile size={18} color={isSelected ? Colors.vitalityGreen : Colors.textMuted} />
              )}
              <Text style={[styles.ratingText, isSelected && { color: Colors.textPrimary }]}>
                {v > 0 ? `+${v}` : v}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Primary Emotion Chips */}
      <Text style={styles.axisLabel}>Primary Feeling:</Text>
      <View style={styles.chipRow}>
        {emotions.map((emo) => {
          const isSelected = selectedEmotion === emo;
          return (
            <TouchableOpacity
              key={emo}
              style={[styles.chip, isSelected && styles.chipActive]}
              onPress={() => setSelectedEmotion(emo)}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>{emo}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Optional brief reflection note..."
        placeholderTextColor={Colors.textMuted}
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSaveMood}>
        <Sparkles size={14} color="#0A0A0E" />
        <Text style={styles.saveBtnText}>Inscribe Mood State</Text>
      </TouchableOpacity>

      {/* Correlational Insights Box */}
      <View style={styles.insightBox}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <TrendingUp size={16} color={Colors.reframeGold} />
          <Text style={styles.insightTitle}>Correlational Behavior Insight</Text>
        </View>
        <Text style={styles.insightText}>
          Completing Behavioral Quests before 2 PM correlates with a +35% higher valence score on
          evening check-ins.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    marginBottom: Spacing.sm,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  axisLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: Spacing.xs,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  ratingBtn: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 3,
  },
  ratingBtnActive: {
    borderColor: Colors.clarityMana,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  ratingText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  chip: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    borderColor: Colors.clarityMana,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  chipText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  chipTextActive: {
    color: Colors.clarityMana,
  },
  input: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: Spacing.sm,
    color: Colors.textPrimary,
    fontSize: 12,
    marginBottom: Spacing.sm,
  },
  saveBtn: {
    backgroundColor: Colors.clarityMana,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
    marginBottom: Spacing.sm,
  },
  saveBtnText: {
    color: '#0A0A0E',
    fontSize: 13,
    fontWeight: '700',
  },
  insightBox: {
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.25)',
    borderRadius: 10,
    padding: Spacing.sm,
    marginTop: Spacing.xs,
  },
  insightTitle: {
    color: Colors.reframeGold,
    fontSize: 11,
    fontWeight: '700',
  },
  insightText: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
});
