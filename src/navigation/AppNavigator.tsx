import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Spacing } from '../core/theme';
import { UserState, QuestItem, TaskItem, EnergyTier } from '../core/types';
import { Database } from '../core/database/db';
import { EventBus } from '../core/eventbus/EventBus';

// Screens & Components
import { SanctuaryView } from '../features/sanctuary/SanctuaryView';
import { EnergySelector } from '../features/energy/EnergySelector';
import { QuestBoard } from '../features/quests/QuestBoard';
import { MindArenaScreen } from '../features/arena/MindArenaScreen';
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
  Moon,
  Hammer,
  CheckSquare,
  Settings as SettingsIcon,
} from 'lucide-react-native';

type TabKey = 'SANCTUARY' | 'QUESTS' | 'ARENA' | 'SLEEP' | 'PROBLEM_SOLVING' | 'TASKS_MOOD' | 'SETTINGS';

export const AppNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('SANCTUARY');
  const [userState, setUserState] = useState<UserState | null>(null);
  const [quests, setQuests] = useState<QuestItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    loadAllData();

    // Listen to global events
    const unsubQuest = EventBus.subscribe('quest:completed', (data) => {
      loadAllData();
    });

    const unsubArena = EventBus.subscribe('arena:victory', () => {
      loadAllData();
    });

    return () => {
      unsubQuest();
      unsubArena();
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
    const updatedQuests = quests.map((q) =>
      q.id === questId ? { ...q, isCompleted: true, completedAt: new Date().toISOString() } : q
    );
    setQuests(updatedQuests);
    await Database.saveQuests(updatedQuests);

    const q = quests.find((item) => item.id === questId);
    if (q && userState) {
      const updatedState: UserState = {
        ...userState,
        vitalityPoints: userState.vitalityPoints + q.rewards.vitalityPoints,
        clarityMana: userState.clarityMana + q.rewards.clarityMana,
        sanctuary: {
          ...userState.sanctuary,
          gloomClearingPercentage: Math.min(
            100,
            userState.sanctuary.gloomClearingPercentage + q.rewards.sanctuaryGrowth
          ),
          vitalityFloraCount: userState.sanctuary.vitalityFloraCount + 1,
        },
      };
      setUserState(updatedState);
      await Database.saveUserState(updatedState);

      EventBus.emit('quest:completed', {
        questId,
        vpEarned: q.rewards.vitalityPoints,
        manaEarned: q.rewards.clarityMana,
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

  if (!userState) return null;

  const tabs: { key: TabKey; label: string; icon: any }[] = [
    { key: 'SANCTUARY', label: 'Sanctuary', icon: Sparkles },
    { key: 'QUESTS', label: 'Quests', icon: ScrollText },
    { key: 'ARENA', label: 'Arena (CR)', icon: Swords },
    { key: 'SLEEP', label: 'Sleep (BI)', icon: Moon },
    { key: 'PROBLEM_SOLVING', label: 'Problem (PS)', icon: Hammer },
    { key: 'TASKS_MOOD', label: 'Tasks & Mood', icon: CheckSquare },
    { key: 'SETTINGS', label: 'Settings', icon: SettingsIcon },
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

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          const IconComponent = tab.icon;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <IconComponent
                size={20}
                color={isSelected ? Colors.clarityMana : Colors.textMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  isSelected && { color: Colors.clarityMana, fontWeight: '700' },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  body: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: 8,
    paddingBottom: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
});
