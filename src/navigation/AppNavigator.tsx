import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Modal,
  StatusBar as RNStatusBar,
} from 'react-native';
import { Colors, Spacing } from '../core/theme';
import { UserState, QuestItem, TaskItem, EnergyTier } from '../core/types';
import { Database } from '../core/database/db';
import { EventBus } from '../core/eventbus/EventBus';
import { ContentSyncService } from '../core/sync/ContentSyncService';

// Screens & Components
import { SanctuaryView } from '../features/sanctuary/SanctuaryView';
import { EnergySelector } from '../features/energy/EnergySelector';
import { QuestBoard } from '../features/quests/QuestBoard';
import { MindArenaScreen } from '../features/arena/MindArenaScreen';
import { CampfireScreen } from '../features/campfire/CampfireScreen';
import { ThoughtStreamScreen } from '../features/thoughtstream/ThoughtStreamScreen';
import { AcademyScreen } from '../features/academy/AcademyScreen';
import { MindMirrorScreen } from '../features/analytics/MindMirrorScreen';
import { ShadowCrucibleScreen } from '../features/shadow/ShadowCrucibleScreen';
import { SleepTherapyScreen } from '../features/sleep/SleepTherapyScreen';
import { ProblemSolvingScreen } from '../features/problemsolving/ProblemSolvingScreen';
import { TaskManager } from '../features/tasks/TaskManager';
import { MoodTracker } from '../features/mood/MoodTracker';
import { SettingsScreen } from '../features/settings/SettingsScreen';
import { UpdateBanner } from '../core/ota/UpdateBanner';

import {
  Sparkles,
  ScrollText,
  Swords,
  BrainCircuit,
  Flame,
  BookOpen,
  Eye,
  Skull,
  Moon,
  Hammer,
  CheckSquare,
  Settings as SettingsIcon,
  Menu,
} from 'lucide-react-native';

/** Icons for the "More" overflow sheet */
const OVERFLOW_ICONS: Record<string, React.ComponentType<{ size: number; color: string }> | any> = {
  MIRROR: Eye,
  STREAM: BrainCircuit,
  ACADEMY: BookOpen,
  CRUCIBLE: Skull,
  SLEEP: Moon,
  PROBLEM_SOLVING: Hammer,
  TASKS_MOOD: CheckSquare,
  SETTINGS: SettingsIcon,
};

type TabKey =
  | 'SANCTUARY'
  | 'QUESTS'
  | 'ARENA'
  | 'CAMPFIRE'
  | 'MIRROR'
  | 'STREAM'
  | 'ACADEMY'
  | 'CRUCIBLE'
  | 'SLEEP'
  | 'PROBLEM_SOLVING'
  | 'TASKS_MOOD'
  | 'SETTINGS';

/** Tabs shown directly in the bottom bar; the rest live in the "More" sheet */
const PRIMARY_TABS: TabKey[] = ['SANCTUARY', 'QUESTS', 'ARENA', 'CAMPFIRE'];
const OVERFLOW_TABS: { key: TabKey; label: string }[] = [
  { key: 'MIRROR', label: 'Mind Mirror' },
  { key: 'STREAM', label: 'Cognitive Stream' },
  { key: 'ACADEMY', label: 'Academy' },
  { key: 'CRUCIBLE', label: 'Shadow Crucible' },
  { key: 'SLEEP', label: 'Sleep Therapy' },
  { key: 'PROBLEM_SOLVING', label: 'Problem Solving' },
  { key: 'TASKS_MOOD', label: 'Tasks & Mood' },
  { key: 'SETTINGS', label: 'Settings' },
];

export const AppNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('SANCTUARY');
  const [moreVisible, setMoreVisible] = useState(false);
  const [userState, setUserState] = useState<UserState | null>(null);
  const [quests, setQuests] = useState<QuestItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    loadAllData();

    // Quiet background sync from GitHub
    ContentSyncService.syncContent(false).catch(() => {});

    // Listen to global events
    const unsubQuest = EventBus.subscribe('quest:completed', (data) => {
      loadAllData();
    });

    const unsubArena = EventBus.subscribe('arena:victory', () => {
      loadAllData();
    });

    const unsubSync = EventBus.subscribe('content:synced', () => {
      loadAllData();
    });

    return () => {
      unsubQuest();
      unsubArena();
      unsubSync();
    };
  }, []);

  const loadAllData = async () => {
    const s = await Database.getUserState();
    const q = await Database.getQuests();
    const t = await Database.getTasks();
    setUserState(s);
    setQuests(q);
    setTasks(t);
  };

  const handleEnergyChange = async (newTier: EnergyTier) => {
    if (!userState) return;
    const updated = { ...userState, energyTier: newTier };
    setUserState(updated);
    await Database.saveUserState(updated);
  };

  const handleCompleteQuest = async (questId: string) => {
    const quest = quests.find((item) => item.id === questId);
    // Idempotency guard: never grant rewards twice for the same quest
    if (!quest || quest.isCompleted) return;

    const updatedQuests = quests.map((q) =>
      q.id === questId ? { ...q, isCompleted: true, completedAt: new Date().toISOString() } : q
    );
    setQuests(updatedQuests);
    await Database.saveQuests(updatedQuests);

    if (userState) {
      const updatedState: UserState = {
        ...userState,
        vitalityPoints: userState.vitalityPoints + quest.rewards.vitalityPoints,
        clarityMana: userState.clarityMana + quest.rewards.clarityMana,
        sanctuary: {
          ...userState.sanctuary,
          gloomClearingPercentage: Math.min(
            100,
            userState.sanctuary.gloomClearingPercentage + quest.rewards.sanctuaryGrowth
          ),
          vitalityFloraCount: userState.sanctuary.vitalityFloraCount + 1,
        },
      };
      setUserState(updatedState);
      await Database.saveUserState(updatedState);

      EventBus.emit('quest:completed', {
        questId,
        vpEarned: quest.rewards.vitalityPoints,
        manaEarned: quest.rewards.clarityMana,
      });
    }
  };

  const handleCompanionSelect = async (companionId: 'PYRA_FOX' | 'KAEL_OWL' | 'LIORA_NYMPH') => {
    if (!userState) return;
    const updatedCompanions = userState.sanctuary.companions.map((c) => ({
      ...c,
      isActive: c.id === companionId,
    }));
    const updatedState: UserState = {
      ...userState,
      sanctuary: {
        ...userState.sanctuary,
        companions: updatedCompanions,
      },
    };
    setUserState(updatedState);
    await Database.saveUserState(updatedState);
  };

  const handleNavigate = (tab: TabKey) => {
    setActiveTab(tab);
    setMoreVisible(false);
  };

  if (!userState) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <Sparkles size={42} color={Colors.reframeGold} />
        <Text style={styles.loadingTitle}>Aetheria</Text>
        <Text style={styles.loadingSubtitle}>Kindling the sanctuary flames...</Text>
      </SafeAreaView>
    );
  }

  const tabs: { key: TabKey; label: string; icon: any }[] = [
    { key: 'SANCTUARY', label: 'Sanctuary', icon: Sparkles },
    { key: 'QUESTS', label: 'Quests', icon: ScrollText },
    { key: 'ARENA', label: 'Arena (CR)', icon: Swords },
    { key: 'CAMPFIRE', label: 'Campfire', icon: Flame },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top GitHub / OTA Update Banner */}
      <UpdateBanner />

      {/* Main Screen Content */}
      <View style={styles.body}>
        {activeTab === 'SANCTUARY' && (
          <View style={{ flex: 1 }}>
            <EnergySelector
              currentTier={userState.energyTier}
              onSelectTier={handleEnergyChange}
            />
            <SanctuaryView
              userState={userState}
              onCompanionSelect={handleCompanionSelect}
            />
            <QuestBoard
              quests={quests}
              energyTier={userState.energyTier}
              onCompleteQuest={handleCompleteQuest}
              onQuestsUpdated={async (updated) => {
                setQuests(updated);
                await Database.saveQuests(updated);
              }}
            />
          </View>
        )}

        {activeTab === 'QUESTS' && (
          <View style={{ flex: 1 }}>
            <EnergySelector
              currentTier={userState.energyTier}
              onSelectTier={handleEnergyChange}
            />
            <QuestBoard
              quests={quests}
              energyTier={userState.energyTier}
              onCompleteQuest={handleCompleteQuest}
              onQuestsUpdated={async (updated) => {
                setQuests(updated);
                await Database.saveQuests(updated);
              }}
            />
          </View>
        )}

        {activeTab === 'ARENA' && <MindArenaScreen />}

        {activeTab === 'CAMPFIRE' && <CampfireScreen userState={userState} />}

        {activeTab === 'STREAM' && <ThoughtStreamScreen userState={userState} />}

        {activeTab === 'ACADEMY' && <AcademyScreen userState={userState} />}

        {activeTab === 'MIRROR' && <MindMirrorScreen userState={userState} />}

        {activeTab === 'CRUCIBLE' && <ShadowCrucibleScreen userState={userState} />}

        {activeTab === 'SLEEP' && <SleepTherapyScreen userState={userState} />}

        {activeTab === 'PROBLEM_SOLVING' && <ProblemSolvingScreen userState={userState} />}

        {activeTab === 'TASKS_MOOD' && (
          <View style={{ flex: 1 }}>
            <TaskManager
              tasks={tasks}
              energyTier={userState.energyTier}
              onTasksUpdated={async (updated) => {
                setTasks(updated);
                await Database.saveTasks(updated);
              }}
            />
            <MoodTracker />
          </View>
        )}

        {activeTab === 'SETTINGS' && (
          <SettingsScreen
            userState={userState}
            onStateUpdated={(updated) => setUserState(updated)}
          />
        )}
      </View>

      {/* Bottom Navigation Bar: primary tabs + "More" overflow */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          const IconComponent = tab.icon;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => handleNavigate(tab.key)}
              activeOpacity={0.7}
            >
              <IconComponent
                size={20}
                color={isSelected ? Colors.reframeGold : Colors.textMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  isSelected && { color: Colors.reframeGold, fontWeight: '700' },
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setMoreVisible(true)}
          activeOpacity={0.7}
        >
          <Menu
            size={20}
            color={[...PRIMARY_TABS, ...OVERFLOW_TABS.map((t) => t.key)].includes(activeTab) &&
            !PRIMARY_TABS.includes(activeTab)
              ? Colors.reframeGold
              : Colors.textMuted}
          />
          <Text style={styles.tabLabel} numberOfLines={1}>
            More
          </Text>
        </TouchableOpacity>
      </View>

      {/* Overflow sheet for secondary screens */}
      <Modal visible={moreVisible} transparent animationType="slide" onRequestClose={() => setMoreVisible(false)}>
        <View style={styles.sheetOverlay}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setMoreVisible(false)} />
          <View style={styles.sheetContainer}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Explore Aetheria</Text>
            <View style={styles.sheetGrid}>
              {OVERFLOW_TABS.map((tab) => {
                const IconComponent = OVERFLOW_ICONS[tab.key];
                const isActive = activeTab === tab.key;
                return (
                  <TouchableOpacity
                    key={tab.key}
                    style={[styles.sheetItem, isActive && styles.sheetItemActive]}
                    onPress={() => handleNavigate(tab.key)}
                    activeOpacity={0.7}
                  >
                    <IconComponent size={22} color={isActive ? Colors.reframeGold : Colors.textPrimary} />
                    <Text
                      style={[styles.sheetItemLabel, isActive && { color: Colors.reframeGold }]}
                      numberOfLines={2}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 28) : 0,
  },
  body: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingTitle: {
    color: Colors.reframeGold,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 2,
  },
  loadingSubtitle: {
    color: Colors.textMuted,
    fontSize: 13,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: 6,
    paddingBottom: Platform.OS === 'ios' ? 14 : 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 32,
    paddingTop: 10,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    marginBottom: 14,
  },
  sheetTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },
  sheetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sheetItem: {
    width: '23%',
    minWidth: 96,
    flexGrow: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 8,
  },
  sheetItemActive: {
    borderColor: Colors.reframeGold,
  },
  sheetItemLabel: {
    color: Colors.textPrimary,
    fontSize: 12,
    textAlign: 'center',
  },
});
