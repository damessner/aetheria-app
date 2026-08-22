import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SleepEfficiencyEntry, UserState } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import {
  Moon,
  BedDouble,
  Clock,
  Sparkles,
  ShieldCheck,
  Heart,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react-native';

interface SleepTherapyScreenProps {
  userState: UserState;
}

export const SleepTherapyScreen: React.FC<SleepTherapyScreenProps> = ({ userState }) => {
  const [bedTime, setBedTime] = useState('23:30');
  const [wakeTime, setWakeTime] = useState('07:30');
  const [timeInBedHours, setTimeInBedHours] = useState('8.0');
  const [timeAsleepHours, setTimeAsleepHours] = useState('6.5');
  const [nightWakings, setNightWakings] = useState('1');
  const [stimulusFollowed, setStimulusFollowed] = useState(true);
  const [logs, setLogs] = useState<SleepEfficiencyEntry[]>([]);

  // Diaphragmatic Breath Pacing State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale (4s)' | 'Hold (4s)' | 'Exhale (6s)'>('Inhale (4s)');
  const [timerSeconds, setTimerSeconds] = useState(60);

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsBreathingActive(false);
            return 60;
          }
          const mod = prev % 14;
          if (mod > 10) setBreathPhase('Inhale (4s)');
          else if (mod > 6) setBreathPhase('Hold (4s)');
          else setBreathPhase('Exhale (6s)');
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive]);

  const loadLogs = async () => {
    const data = await Database.getSleepLogs();
    setLogs(data);
  };

  const handleCalculateAndSave = async () => {
    const inBed = parseFloat(timeInBedHours) * 60;
    const asleep = parseFloat(timeAsleepHours) * 60;

    if (isNaN(inBed) || isNaN(asleep) || inBed <= 0 || asleep <= 0 || asleep > inBed) {
      Alert.alert('Invalid Input', 'Please enter valid hours in bed and hours asleep (asleep cannot exceed in bed).');
      return;
    }

    const efficiency = Math.round((asleep / inBed) * 100);

    const entry: SleepEfficiencyEntry = {
      id: 'sleep_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      bedTime,
      wakeTime,
      timeInBedMinutes: inBed,
      timeAsleepMinutes: asleep,
      sleepEfficiencyPercentage: efficiency,
      nightWakingsCount: parseInt(nightWakings) || 0,
      stimulusControlFollowed: stimulusFollowed,
    };

    await Database.saveSleepLog(entry);
    await loadLogs();

    let feedback = '';
    if (efficiency >= 85) {
      feedback = '🌟 Optimal Sleep Efficiency (>=85%). Your sleep consolidation is clinically robust.';
    } else {
      feedback = `⚠️ Sleep Efficiency is ${efficiency}%. Consider slight sleep window restriction to consolidate restorative deep sleep.`;
    }

    Alert.alert('Sleep Diary Inscribed', `${feedback}\n\nStimulus Control Rule: If awake for >20 mins in bed, step out to a dim area.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Banner */}
      <View style={styles.headerCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <Moon size={18} color={Colors.gloomPurple} />
          <Text style={styles.headerTitle}>Behavior Therapy for Insomnia (BI)</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Phase 1 Clinical Skill: Stabilize sleep efficiency, restore stimulus control, and sync circadian rhythms.
        </Text>
      </View>

      {/* Sleep Efficiency Calculator */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <BedDouble size={16} color={Colors.clarityMana} />
          <Text style={styles.cardTitle}>Daily Sleep Efficiency Diary</Text>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Time into Bed</Text>
            <TextInput
              style={styles.textInput}
              value={bedTime}
              onChangeText={setBedTime}
              placeholder="23:30"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Final Wake Time</Text>
            <TextInput
              style={styles.textInput}
              value={wakeTime}
              onChangeText={setWakeTime}
              placeholder="07:30"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Total Hours in Bed</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={timeInBedHours}
              onChangeText={setTimeInBedHours}
              placeholder="8.0"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Actual Hours Asleep</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={timeAsleepHours}
              onChangeText={setTimeAsleepHours}
              placeholder="6.5"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.checkboxRow, stimulusFollowed && styles.checkboxRowActive]}
          onPress={() => setStimulusFollowed(!stimulusFollowed)}
        >
          {stimulusFollowed ? (
            <CheckCircle2 size={18} color={Colors.vitalityGreen} />
          ) : (
            <AlertCircle size={18} color={Colors.textMuted} />
          )}
          <Text style={styles.checkboxLabel}>
            Followed 20-min Stimulus Control Rule (Got out of bed if awake &gt;20 mins)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={handleCalculateAndSave}>
          <Sparkles size={16} color="#0A0A0E" />
          <Text style={styles.saveBtnText}>Calculate & Save Sleep Efficiency</Text>
        </TouchableOpacity>
      </View>

      {/* Somatic Breath Pacer */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Heart size={16} color={Colors.compassionPink} />
          <Text style={styles.cardTitle}>Diaphragmatic Somatic Pacer (4-4-6)</Text>
        </View>
        <Text style={styles.cardDesc}>
          Parasympathetic nervous system activation for pre-sleep wind-down and insomnia distress.
        </Text>

        <View style={styles.pacerDisplay}>
          <Text style={styles.pacerPhase}>{isBreathingActive ? breathPhase : 'Ready to Breathe'}</Text>
          <Text style={styles.pacerTimer}>{isBreathingActive ? `${timerSeconds}s Remaining` : '60-Second Cycle'}</Text>
        </View>

        <TouchableOpacity
          style={[styles.pacerBtn, isBreathingActive && styles.pacerBtnActive]}
          onPress={() => setIsBreathingActive(!isBreathingActive)}
        >
          <Text style={styles.pacerBtnText}>{isBreathingActive ? 'Stop Breath Pacer' : 'Begin 60s Breath Sync'}</Text>
        </TouchableOpacity>
      </View>

      {/* Stimulus Control Clinical Rules */}
      <View style={styles.rulesCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.xs }}>
          <ShieldCheck size={16} color={Colors.reframeGold} />
          <Text style={styles.rulesTitle}>Core Stimulus Control Rules (Spielman et al.)</Text>
        </View>
        <Text style={styles.ruleItem}>1. **Bed = Sleep Only:** No working, phone doom-scrolling, or gaming in bed.</Text>
        <Text style={styles.ruleItem}>2. **20-Minute Reset:** If wide awake after ~20m, step out of bed into dim light until sleepy.</Text>
        <Text style={styles.ruleItem}>3. **Fixed Wake Anchor:** Wake up at the exact same hour daily regardless of sleep duration.</Text>
      </View>
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
    fontSize: 15,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  cardDesc: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: Spacing.sm,
    lineHeight: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: Spacing.sm,
    color: Colors.textPrimary,
    fontSize: 13,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.sm,
    borderRadius: 8,
    gap: 8,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  checkboxRowActive: {
    borderColor: Colors.vitalityGreen,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  checkboxLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    flex: 1,
    lineHeight: 15,
  },
  saveBtn: {
    backgroundColor: Colors.clarityMana,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
    marginTop: Spacing.sm,
  },
  saveBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 13,
  },
  pacerDisplay: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    marginVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.compassionPink,
  },
  pacerPhase: {
    color: Colors.compassionPink,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  pacerTimer: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  pacerBtn: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.compassionPink,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  pacerBtnActive: {
    backgroundColor: 'rgba(244, 114, 182, 0.2)',
  },
  pacerBtnText: {
    color: Colors.compassionPink,
    fontWeight: '700',
    fontSize: 13,
  },
  rulesCard: {
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.25)',
  },
  rulesTitle: {
    color: Colors.reframeGold,
    fontSize: 12,
    fontWeight: '700',
  },
  ruleItem: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 17,
    marginBottom: 4,
  },
});
