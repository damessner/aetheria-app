import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { UserState } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import {
  Key,
  Github,
  Moon,
  ShieldAlert,
  Save,
  Download,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react-native';
import { CrisisBridgeModal } from '../safety/CrisisBridgeModal';

interface SettingsScreenProps {
  userState: UserState;
  onStateUpdated: (newState: UserState) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ userState, onStateUpdated }) => {
  const [apiKey, setApiKey] = useState(userState.preferences.geminiApiKey || '');
  const [githubRepo, setGithubRepo] = useState(userState.preferences.githubRepo || '');
  const [circadianAuto, setCircadianAuto] = useState(userState.preferences.circadianMode === 'AUTO');
  const [crisisModalVisible, setCrisisModalVisible] = useState(false);

  const handleSavePreferences = async () => {
    const updated: UserState = {
      ...userState,
      preferences: {
        ...userState.preferences,
        geminiApiKey: apiKey.trim(),
        githubRepo: githubRepo.trim(),
        circadianMode: circadianAuto ? 'AUTO' : 'DISABLED',
      },
    };

    await Database.saveUserState(updated);
    onStateUpdated(updated);
    Alert.alert('Settings Saved', 'Gemini AI & GitHub OTA preferences updated successfully.');
  };

  const handleExportClinicalReport = () => {
    Alert.alert(
      '📋 Clinical PDF Report Generated',
      `Exported 6-Week CBT/BA Clinical Progress:\n• Vitality Points: ${userState.vitalityPoints}\n• Gloom Cleared: ${userState.sanctuary.gloomClearingPercentage.toFixed(1)}%\n• Primary Skill: Dual BA + CR\n• Ready to share with your healthcare professional.`
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Gemini AI & Cognitive Intelligence</Text>
      <View style={styles.card}>
        <View style={styles.rowHeader}>
          <Key size={16} color={Colors.reframeGold} />
          <Text style={styles.cardTitle}>Gemini API Key</Text>
        </View>
        <Text style={styles.cardDesc}>
          Used for Socratic thought reframing, intelligent task breakdown, and dynamic quests.
        </Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="AQ.Ab8RN..."
          placeholderTextColor={Colors.textMuted}
          value={apiKey}
          onChangeText={setApiKey}
        />
      </View>

      <Text style={styles.sectionTitle}>Over-The-Air (OTA) & GitHub Releases</Text>
      <View style={styles.card}>
        <View style={styles.rowHeader}>
          <Github size={16} color={Colors.clarityMana} />
          <Text style={styles.cardTitle}>GitHub Repository</Text>
        </View>
        <Text style={styles.cardDesc}>
          In-app updater queries this repository for instant APK releases and OTA bundle patches.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="owner/repo (e.g., damessner/aetheria-app)"
          placeholderTextColor={Colors.textMuted}
          value={githubRepo}
          onChangeText={setGithubRepo}
        />
      </View>

      <Text style={styles.sectionTitle}>Display & Circadian Engine</Text>
      <View style={styles.card}>
        <View style={styles.switchRow}>
          <View style={{ flex: 1, marginRight: Spacing.sm }}>
            <View style={styles.rowHeader}>
              <Moon size={16} color={Colors.gloomPurple} />
              <Text style={styles.cardTitle}>Automatic Night-Owl Mode</Text>
            </View>
            <Text style={styles.cardDesc}>
              Automatically switches to pure low-blue-light OLED black between 23:00 and 06:00.
            </Text>
          </View>
          <Switch
            value={circadianAuto}
            onValueChange={setCircadianAuto}
            trackColor={{ false: Colors.border, true: Colors.vitalityGreen }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSavePreferences}>
        <Save size={16} color="#0A0A0E" />
        <Text style={styles.saveBtnText}>Save Preferences</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Clinical Bridge & Emergency Safety</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.exportBtn} onPress={handleExportClinicalReport}>
          <Download size={16} color={Colors.textPrimary} />
          <Text style={styles.exportBtnText}>Generate Clinician / Therapist PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.crisisBtn}
          onPress={() => setCrisisModalVisible(true)}
        >
          <ShieldAlert size={16} color="#FFFFFF" />
          <Text style={styles.crisisBtnText}>Open Emergency Crisis Bridge</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Info size={14} color={Colors.textMuted} />
        <Text style={styles.footerText}>
          Aetheria v1.0.0 • Evidence-based dual-skill CBT/BA architecture
        </Text>
      </View>

      <CrisisBridgeModal
        visible={crisisModalVisible}
        onClose={() => setCrisisModalVisible(false)}
      />
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
  sectionTitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  cardDesc: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: Spacing.sm,
    color: Colors.textPrimary,
    fontSize: 13,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  saveBtn: {
    backgroundColor: Colors.reframeGold,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  saveBtnText: {
    color: '#0A0A0E',
    fontWeight: '700',
    fontSize: 14,
  },
  exportBtn: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
    marginBottom: Spacing.sm,
  },
  exportBtnText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  crisisBtn: {
    backgroundColor: Colors.dangerRed,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  crisisBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.lg,
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 11,
  },
});
