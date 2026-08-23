import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  CompositeScreenProps,
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { Colors, Spacing } from '../core/theme';
import { UserState, EnergyTier } from '../core/types';
import { useAppStore } from '../core/state/appStore';
import { EventBus, AppEvents } from '../core/eventbus/EventBus';
import { UpdateBanner } from '../core/ota/UpdateBanner';
import { ContentSyncService } from '../core/sync/ContentSyncService';
import { DisclaimerScreen } from '../features/onboarding/DisclaimerScreen';

// Screens
import { SanctuaryView } from '../features/sanctuary/SanctuaryView';
import { EnergySelector } from '../features/energy/EnergySelector';
import { QuestBoard } from '../features/quests/QuestBoard';
import { MindArenaScreen } from '../features/arena/MindArenaScreen';
import { CampfireScreen } from '../features/campfire/CampfireScreen';
import { ThoughtStreamScreen } from '../features/thoughtstream/ThoughtStreamScreen';
import { AcademyScreen } from '../features/academy/AcademyScreen';
import { ShadowCrucibleScreen } from '../features/shadow/ShadowCrucibleScreen';
import { MindMirrorScreen } from '../features/analytics/MindMirrorScreen';
import { SleepTherapyScreen } from '../features/sleep/SleepTherapyScreen';
import { ProblemSolvingScreen } from '../features/problemsolving/ProblemSolvingScreen';
import { TaskManager } from '../features/tasks/TaskManager';
import { MoodTracker } from '../features/mood/MoodTracker';
import { SettingsScreen } from '../features/settings/SettingsScreen';

import {
  Sparkles,
  ScrollText,
  Swords,
  Flame,
  Eye,
  BrainCircuit,
  BookOpen,
  Skull,
  Moon,
  Hammer,
  CheckSquare,
  Settings as SettingsIcon,
} from 'lucide-react-native';

export type RootStackParamList = {
  Tabs: undefined;
  ARENA: undefined;
  STREAM: undefined;
  ACADEMY: undefined;
  CRUCIBLE: undefined;
  MIRROR: undefined;
  SLEEP: undefined;
  PROBLEM_SOLVING: undefined;
  TASKS_MOOD: undefined;
  SETTINGS: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  PracticeTab: undefined;
  CampfireTab: undefined;
  ProgressTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.textPrimary,
    border: Colors.border,
    primary: Colors.reframeGold,
  },
};

const stackScreenOptions = {
  headerStyle: { backgroundColor: Colors.surface },
  headerTintColor: Colors.textPrimary,
  headerTitleStyle: { fontWeight: '700' as const },
  contentStyle: { backgroundColor: Colors.background },
};

/* ------------------------------- Shared bits ------------------------------ */

const Loading: React.FC = () => (
  <View style={styles.loadingContainer}>
    <Sparkles size={42} color={Colors.reframeGold} />
    <Text style={styles.loadingTitle}>Aetheria</Text>
    <Text style={styles.loadingSubtitle}>Kindling the sanctuary flames...</Text>
    <ActivityIndicator color={Colors.reframeGold} style={{ marginTop: 10 }} />
  </View>
);

interface HubItem {
  key: keyof RootStackParamList;
  label: string;
  subtitle: string;
  icon: any;
}

const HubCard: React.FC<{ item: HubItem; onPress: () => void }> = ({ item, onPress }) => {
  const Icon = item.icon;
  return (
    <TouchableOpacity style={styles.hubCard} onPress={onPress} activeOpacity={0.8}>
      <Icon size={24} color={Colors.reframeGold} />
      <Text style={styles.hubCardLabel}>{item.label}</Text>
      <Text style={styles.hubCardSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );
};

/** Screen wrapper that supplies store state as props to existing feature screens */
const WithUserState: React.FC<{
  render: (userState: UserState) => React.ReactNode;
}> = ({ render }) => {
  const userState = useAppStore((s) => s.userState);
  if (!userState) return <Loading />;
  return <>{render(userState)}</>;
};

/* ---------------------------------- Home ---------------------------------- */

const HomeScreen: React.FC = () => {
  const userState = useAppStore((s) => s.userState);
  const quests = useAppStore((s) => s.quests);
  const completeQuest = useAppStore((s) => s.completeQuest);
  const setQuests = useAppStore((s) => s.setQuests);
  const setUserState = useAppStore((s) => s.setUserState);

  if (!userState) return <Loading />;

  return (
    <View style={styles.screenBody}>
      <EnergySelector
        currentTier={userState.energyTier}
        onSelectTier={(tier: EnergyTier) =>
          setUserState((prev) => ({ ...prev, energyTier: tier }))
        }
      />
      <ScrollView>
        <SanctuaryView
          userState={userState}
          onCompanionSelect={(companionId) => {
            setUserState((prev) => ({
              ...prev,
              sanctuary: {
                ...prev.sanctuary,
                companions: prev.sanctuary.companions.map((c) => ({
                  ...c,
                  isActive: c.id === companionId,
                })),
              },
            }));
          }}
        />
        <QuestBoard
          quests={quests}
          energyTier={userState.energyTier}
          onCompleteQuest={completeQuest}
          onQuestsUpdated={(updated) => setQuests(updated)}
        />
      </ScrollView>
    </View>
  );
};

/* -------------------------------- Practice -------------------------------- */

const PRACTICE_ITEMS: HubItem[] = [
  { key: 'ARENA', label: 'Mind Arena', subtitle: 'Battle distortions with Socratic cards', icon: Swords },
  { key: 'STREAM', label: 'Cognitive Stream', subtitle: 'Rapid thought-reframing quizzes', icon: BrainCircuit },
  { key: 'ACADEMY', label: 'Academy', subtitle: '24 wisdom masterclass scrolls', icon: BookOpen },
  { key: 'CRUCIBLE', label: 'Shadow Crucible', subtitle: 'Excavate & forge your flaws', icon: Skull },
];

const PracticeHubScreen: React.FC<
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'PracticeTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
> = ({ navigation }) => {
  return (
    <ScrollView style={styles.hubScreen} contentContainerStyle={styles.hubContent}>
      <Text style={styles.hubHeader}>Training Grounds</Text>
      <Text style={styles.hubSubheader}>Choose your practice for this moment</Text>
      <View style={styles.hubGrid}>
        {PRACTICE_ITEMS.map((item) => (
          <HubCard
            key={item.key}
            item={item}
            onPress={() => navigation.navigate(item.key as never)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

/* -------------------------------- Progress -------------------------------- */

const PROGRESS_ITEMS: HubItem[] = [
  { key: 'MIRROR', label: 'Mind Mirror', subtitle: 'Analytics, trophies & virtues', icon: Eye },
  { key: 'SLEEP', label: 'Sleep Therapy', subtitle: 'Sleep efficiency & stimulus control', icon: Moon },
  { key: 'PROBLEM_SOLVING', label: 'Problem Solving', subtitle: '7-step structured wizard', icon: Hammer },
  { key: 'TASKS_MOOD', label: 'Tasks & Mood', subtitle: 'GTD list & valence tracker', icon: CheckSquare },
];

const ProgressHubScreen: React.FC<
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'ProgressTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
> = ({ navigation }) => {
  return (
    <ScrollView style={styles.hubScreen} contentContainerStyle={styles.hubContent}>
      <Text style={styles.hubHeader}>Reflection</Text>
      <Text style={styles.hubSubheader}>Track patterns, tend your inner world</Text>
      <View style={styles.hubGrid}>
        {PROGRESS_ITEMS.map((item) => (
          <HubCard
            key={item.key}
            item={item}
            onPress={() => navigation.navigate(item.key as never)}
          />
        ))}
        <TouchableOpacity
          style={[styles.hubCard, styles.settingsCard]}
          onPress={() => navigation.navigate('SETTINGS')}
          activeOpacity={0.8}
        >
          <SettingsIcon size={24} color={Colors.textSecondary} />
          <Text style={[styles.hubCardLabel, { color: Colors.textSecondary }]}>Settings</Text>
          <Text style={styles.hubCardSubtitle}>AI key, chronotype & sync</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

/* ------------------------------ Pushed screens ---------------------------- */

const StreamScreenWrapper: React.FC = () => (
  <WithUserState render={(userState) => <ThoughtStreamScreen userState={userState} />} />
);

const AcademyScreenWrapper: React.FC = () => (
  <WithUserState render={(userState) => <AcademyScreen userState={userState} />} />
);

const CrucibleScreenWrapper: React.FC = () => (
  <WithUserState render={(userState) => <ShadowCrucibleScreen userState={userState} />} />
);

const MirrorScreenWrapper: React.FC = () => (
  <WithUserState render={(userState) => <MindMirrorScreen userState={userState} />} />
);

const SleepScreenWrapper: React.FC = () => (
  <WithUserState render={(userState) => <SleepTherapyScreen userState={userState} />} />
);

const TasksMoodScreenWrapper: React.FC = () => {
  const tasks = useAppStore((s) => s.tasks);
  const userState = useAppStore((s) => s.userState);
  const setTasks = useAppStore((s) => s.setTasks);
  if (!userState) return <Loading />;
  return (
    <View style={styles.screenBody}>
      <TaskManager
        tasks={tasks}
        energyTier={userState.energyTier}
        onTasksUpdated={(updated) => setTasks(updated)}
      />
      <MoodTracker />
    </View>
  );
};

const SettingsScreenWrapper: React.FC = () => (
  <WithUserState
    render={(userState) => (
      <SettingsScreen
        userState={userState}
        onStateUpdated={(updated) =>
          useAppStore.getState().setUserState(() => updated)
        }
      />
    )}
  />
);

/* ------------------------------- Navigators ------------------------------- */

const ProblemSolvingScreenWrapper: React.FC = () => (
  <WithUserState render={(userState) => <ProblemSolvingScreen userState={userState} />} />
);

const TabIcon =
  (IconComponent: any) =>
  ({ color, size }: { color: string; size: number }) =>
    <IconComponent size={size} color={color} />;

const TabNavigator: React.FC = () => {
  const userState = useAppStore((s) => s.userState);

  return (
      <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.reframeGold,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
        },
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Sanctuary', tabBarIcon: TabIcon(Sparkles) }}
      />
      <Tab.Screen
        name="PracticeTab"
        component={PracticeHubScreen}
        options={{ title: 'Practice', tabBarIcon: TabIcon(Swords) }}
      />
      <Tab.Screen
        name="CampfireTab"
        component={() => (userState ? <CampfireScreen userState={userState} /> : <Loading />)}
        options={{ title: 'Campfire', tabBarIcon: TabIcon(Flame) }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={ProgressHubScreen}
        options={{ title: 'Progress', tabBarIcon: TabIcon(Eye) }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const hydrate = useAppStore((s) => s.hydrate);
  const hydrated = useAppStore((s) => s.hydrated);
  const userState = useAppStore((s) => s.userState);
  const setUserState = useAppStore((s) => s.setUserState);

  useEffect(() => {
    hydrate();
    // Quiet background sync from GitHub
    ContentSyncService.syncContent(false).catch(() => {});

    // Some feature screens (Arena, Mirror, Campfire...) persist rewards via
    // Database directly. Re-hydrate so the store converges after their events.
    const syncEvents: (keyof AppEvents)[] = [
      'quest:completed',
      'task:completed',
      'arena:victory',
      'mood:logged',
      'energy:changed',
      'content:synced',
    ];
    const unsubs = syncEvents.map((event) =>
      EventBus.subscribe(event, () => void hydrate())
    );

    return () => unsubs.forEach((u) => u());
  }, [hydrate]);

  if (!hydrated) return <Loading />;

  // One-time medical disclaimer before any clinical content is shown
  if (!userState?.hasAcknowledgedDisclaimer) {
    return (
      <DisclaimerScreen
        onAcknowledge={() =>
          setUserState((prev) => ({ ...prev, hasAcknowledgedDisclaimer: true }))
        }
      />
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen
          name="ARENA"
          component={MindArenaScreen}
          options={{ ...stackScreenOptions, headerShown: true, title: 'Mind Arena' }}
        />
        <Stack.Screen
          name="STREAM"
          component={StreamScreenWrapper}
          options={{ ...stackScreenOptions, headerShown: true, title: 'Cognitive Stream' }}
        />
        <Stack.Screen
          name="ACADEMY"
          component={AcademyScreenWrapper}
          options={{ ...stackScreenOptions, headerShown: true, title: 'Academy of Inner Alchemy' }}
        />
        <Stack.Screen
          name="CRUCIBLE"
          component={CrucibleScreenWrapper}
          options={{ ...stackScreenOptions, headerShown: true, title: 'Shadow Crucible' }}
        />
        <Stack.Screen
          name="MIRROR"
          component={MirrorScreenWrapper}
          options={{ ...stackScreenOptions, headerShown: true, title: 'Mind Mirror' }}
        />
        <Stack.Screen
          name="SLEEP"
          component={SleepScreenWrapper}
          options={{ ...stackScreenOptions, headerShown: true, title: 'Sleep Therapy' }}
        />
        <Stack.Screen
          name="PROBLEM_SOLVING"
          component={ProblemSolvingScreenWrapper}
          options={{ ...stackScreenOptions, headerShown: true, title: 'Problem Solving' }}
        />
        <Stack.Screen
          name="TASKS_MOOD"
          component={TasksMoodScreenWrapper}
          options={{ ...stackScreenOptions, headerShown: true, title: 'Tasks & Mood' }}
        />
        <Stack.Screen
          name="SETTINGS"
          component={SettingsScreenWrapper}
          options={{ ...stackScreenOptions, headerShown: true, title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screenBody: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
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
  hubScreen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hubContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  hubHeader: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginTop: Spacing.sm,
  },
  hubSubheader: {
    color: Colors.textMuted,
    fontSize: 13,
    marginBottom: Spacing.lg,
  },
  hubGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  hubCard: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: 6,
  },
  settingsCard: {
    borderStyle: 'dashed',
  },
  hubCardLabel: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  hubCardSubtitle: {
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
});
