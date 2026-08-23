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
  ActivityIndicator,
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
import { SECURE_KEY_STORAGE } from '../../core/security/secureKeys';
import { ClinicalExport } from '../../core/export/ClinicalExportService';

interface SettingsScreenProps {
  userState: UserState;
  onStateUpdated: (newState: UserState) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ userState, onStateUpdated }) => {
  const [apiKey, setApiKey] = useState(userState.preferences.geminiApiKey || '');
  const [selectedModel, setSelectedModel] = useState<'gemini-3.7-flash' | 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gemini-2.0-flash'>(
    userState.preferences.geminiModel || 'gemini-3.7-flash'
  );
  const [chronotype, setChronotype] = useState(userState.preferences.chronotype || 'STANDARD_DAYTIME');
  const [githubRepo, setGithubRepo] = useState(userState.preferences.githubRepo || '');
  const [circadianAuto, setCircadianAuto] = useState(userState.preferences.circadianMode === 'AUTO');
  const [crisisModalVisible, setCrisisModalVisible] = useState(false);
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
  const [updateCheckResult, setUpdateCheckResult] = useState<{
    isUpdateAvailable: boolean;
    message: string;
  } | null>(null);

  const modelOptions: { id: 'gemini-3.7-flash' | 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gemini-2.0-flash'; label: string; tag: string }[] = [
    { id: 'gemini-3.7-flash', label: 'Gemini 3.7 Flash', tag: 'Fastest & Advanced' },
    { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', tag: 'Ultra-Low Latency' },
    { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', tag: 'Deep Socratic Logic' },
  ];

  const handleSavePreferences = async () => {
    // Store the API key in hardware-backed SecureStore instead of plaintext UserState
    const trimmedKey = apiKey.trim();
    try {
      const SecureStore = require('expo-secure-store');
      if (trimmedKey) {
        await SecureStore.setItemAsync(SECURE_KEY_STORAGE, trimmedKey);
      } else {
        await SecureStore.deleteItemAsync(SECURE_KEY_STORAGE);
      }
    } catch (e) {
      console.warn('[Settings] Could not persist API key to SecureStore', e);
    }

    const updated: UserState = {
      ...userState,
      preferences: {
        ...userState.preferences,
        geminiApiKey: '', // never persisted to AsyncStorage; lives in SecureStore only
        geminiModel: selectedModel,
        chronotype: chronotype,
        githubRepo: githubRepo.trim(),
        circadianMode: circadianAuto ? 'AUTO' : 'DISABLED',
      },
    };

    await Database.saveUserState(updated);
    onStateUpdated(updated);
    Alert.alert('Settings Saved', 'Gemini AI, Chronotype & GitHub OTA preferences updated successfully.');
  };

  const handleCheckForUpdates = async () => {
    setIsCheckingUpdates(true);
    setUpdateCheckResult(null);
    try {
      const { UpdateManager } = require('../../core/ota/UpdateManager');
      const info = await UpdateManager.checkForUpdates();
      if (info.isUpdateAvailable && info.downloadUrl) {
        setUpdateCheckResult({
          isUpdateAvailable: true,
          message: `Version ${info.version} is available! Tap the banner or open the release page to install.`,
        });
        // Deep-link straight to the APK download
        const { Linking } = require('react-native');
        await Linking.openURL(info.downloadUrl);
      } else {
        setUpdateCheckResult({
          isUpdateAvailable: false,
          message: `You're on the latest version (v${info.version}).`,
        });
      }
    } catch (e) {
      setUpdateCheckResult({
        isUpdateAvailable: false,
        message: 'Could not reach GitHub Releases. Check your connection and repository setting.',
      });
    } finally {
      setIsCheckingUpdates(false);
    }
  };

  const handleExportClinicalReport = async () => {
    const success = await ClinicalExport.exportAndShare(userState);
    if (success) {
      Alert.alert(
        '📋 Summary Ready',
        'Your clinical progress summary was opened in the share sheet. Send it to yourself or your healthcare professional.'
      );
    }
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
          placeholder="Enter Gemini API Key..."
          placeholderTextColor={Colors.textMuted}
          value={apiKey}
          onChangeText={setApiKey}
        />

        <Text style={[styles.cardTitle, { marginTop: Spacing.sm, fontSize: 13 }]}>Model Selection</Text>
        <Text style={styles.cardDesc}>Select the active Gemini model for Socratic battles and task planning:</Text>
        <View style={{ gap: 6, marginTop: 4 }}>
          {modelOptions.map((opt) => {
            const isSelected = selectedModel === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.modelOptionBtn, isSelected && styles.modelOptionBtnActive]}
                onPress={() => setSelectedModel(opt.id)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.modelOptionText, isSelected && { color: Colors.reframeGold, fontWeight: '700' }]}>
                    {opt.label}
                  </Text>
                  <Text style={styles.modelOptionTag}>{opt.tag}</Text>
                </View>
                {isSelected && <Sparkles size={14} color={Colors.reframeGold} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Over-The-Air (OTA) & GitHub Releases</Text>
      <View style={styles.card}>
        <View style={styles.rowHeader}>
          <Github size={16} color={Colors.clarityMana} />
          <Text style={styles.cardTitle}>GitHub Repository</Text>
        </View>
        <Text style={styles.cardDesc}>
          In-app updater queries this repository for new APK releases.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="owner/repo (e.g., damessner/aetheria-app)"
          placeholderTextColor={Colors.textMuted}
          value={githubRepo}
          onChangeText={setGithubRepo}
        />
        <TouchableOpacity
          style={[styles.saveBtn, isCheckingUpdates && { opacity: 0.6 }, { marginTop: Spacing.sm }]}
          onPress={handleCheckForUpdates}
          disabled={isCheckingUpdates}
          accessibilityRole="button"
          accessibilityLabel="Check for app updates now"
        >
          {isCheckingUpdates ? (
            <ActivityIndicator size="small" color="#0A0A0E" />
          ) : (
            <Download size={16} color="#0A0A0E" />
          )}
          <Text style={styles.saveBtnText}>
            {isCheckingUpdates ? 'Checking…' : 'Check for Updates'}
          </Text>
        </TouchableOpacity>
        {updateCheckResult ? (
          <Text
            style={{
              color: updateCheckResult.isUpdateAvailable
                ? Colors.reframeGold
                : Colors.vitalityGreen,
              fontSize: 12,
              marginTop: 8,
            }}
          >
            {updateCheckResult.message}
          </Text>
        ) : null}
      </View>

      <Text style={styles.sectionTitle}>Circadian Chronotype & Shift-Worker Engine</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Circadian Phenotype</Text>
        <Text style={styles.cardDesc}>
          Adapts behavioral activation quests and wind-down periods to your operational sleep-wake cycle:
        </Text>
        <View style={{ gap: 6, marginVertical: 6 }}>
          {[
            { id: 'STANDARD_DAYTIME', label: 'Standard Daytime (07:00 – 23:00)', desc: 'Standard diurnal schedule' },
            { id: 'NIGHT_OWL', label: 'Night-Owl / Delayed Phase (14:00 – 04:00)', desc: 'Late evening peak focus' },
            { id: 'ROTATING_SHIFT', label: 'Rotating Shift Worker (Flexible)', desc: 'Dynamic adaptive windows' },
          ].map((item) => {
            const isSelected = chronotype === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.modelOptionBtn, isSelected && styles.modelOptionBtnActive]}
                onPress={() => setChronotype(item.id as any)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.modelOptionText, isSelected && { color: Colors.reframeGold, fontWeight: '700' }]}>
                    {item.label}
                  </Text>
                  <Text style={styles.modelOptionTag}>{item.desc}</Text>
                </View>
                {isSelected && <Sparkles size={14} color={Colors.reframeGold} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.switchRow, { marginTop: Spacing.sm }]}>
          <View style={{ flex: 1, marginRight: Spacing.sm }}>
            <View style={styles.rowHeader}>
              <Moon size={16} color={Colors.gloomPurple} />
              <Text style={styles.cardTitle}>Automatic OLED Night Theme</Text>
            </View>
            <Text style={styles.cardDesc}>
              Automatically switches to low-blue-light OLED black during wind-down hours.
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
          <Text style={styles.exportBtnText}>Share Progress Summary with Clinician</Text>
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
  modelOptionBtn: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modelOptionBtnActive: {
    borderColor: Colors.reframeGold,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  modelOptionText: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  modelOptionTag: {
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 1,
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
