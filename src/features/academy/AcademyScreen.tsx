import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { WisdomScroll, UserState } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Database } from '../../core/database/db';
import { EventBus } from '../../core/eventbus/EventBus';
import { ContentSyncService } from '../../core/sync/ContentSyncService';
import { SpacedRepetitionService } from '../../core/spacedrepetition/SpacedRepetitionService';
import { ScrollDetailModal } from './components/ScrollDetailModal';
import {
  RecallFlashModal,
  RecallChallengeItem,
} from './components/RecallFlashModal';
import { academyStyles } from './components/academyStyles';
import {
  Scroll,
  CheckCircle2,
  BookOpen,
  Swords,
  X,
  ArrowRight,
  Brain,
  Scale,
  Zap,
  Moon,
  Flame,
  CloudDownload,
  Clock,
  Star,
  Lock,
  Compass,
  Shield,
  Heart,
} from 'lucide-react-native';

interface AcademyScreenProps {
  userState: UserState;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export const AcademyScreen: React.FC<AcademyScreenProps> = ({ userState }) => {
  const [scrolls, setScrolls] = useState<WisdomScroll[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<WisdomScroll['category'] | 'ALL'>('ALL');
  const [selectedScroll, setSelectedScroll] = useState<WisdomScroll | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [contentVersion, setContentVersion] = useState('1.0.0');
  const [activeRecallChallenge, setActiveRecallChallenge] = useState<RecallChallengeItem | null>(null);

  const categories: { id: WisdomScroll['category'] | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'All Masterclasses' },
    { id: 'PARENTING_COREGULATION', label: '👨‍👧 Parenting & Co-Regulation' },
    { id: 'MARRIAGE_EFT', label: '💍 Marriage & Partnership' },
    { id: 'STOICISM', label: '🏛️ Stoic Wisdom' },
    { id: 'NEUROSCIENCE', label: '🧠 Polyvagal & Brain' },
    { id: 'CBT_REBT', label: '⚡ CBT, ACT & REBT' },
    { id: 'CIRCADIAN_SLEEP', label: '🌙 Circadian & Sleep' },
    { id: 'BEHAVIORAL_ACTIVATION', label: '🏃 Kinetic Action' },
    { id: 'LOGOTHERAPY', label: '🏔️ Logotherapy' },
    { id: 'SHADOW_INTEGRATION', label: '🌑 Shadow Integration' },
  ];

  useEffect(() => {
    loadScrolls();
    loadVersion();

    const unsub = EventBus.subscribe('content:synced', () => {
      loadScrolls();
      loadVersion();
    });

    return () => {
      unsub();
    };
  }, []);

  const loadVersion = async () => {
    const info = await ContentSyncService.getLastSyncInfo();
    setContentVersion(info.version);
  };

  const loadScrolls = async () => {
    const list = await Database.getWisdomScrolls();
    setScrolls(list);
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const res = await ContentSyncService.syncContent(true);
      if (res.success) {
        await loadScrolls();
        await loadVersion();
        Alert.alert('☁️ Content Synced', res.message);
      } else {
        Alert.alert('Sync Notice', res.message);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const dueReviews = SpacedRepetitionService.getDueSpacedReviews(userState, scrolls);

  const getCategoryIcon = (category: WisdomScroll['category']) => {
    switch (category) {
      case 'STOICISM':
        return Scale;
      case 'NEUROSCIENCE':
        return Brain;
      case 'CBT_REBT':
        return Flame;
      case 'BEHAVIORAL_ACTIVATION':
        return Zap;
      case 'CIRCADIAN_SLEEP':
        return Moon;
      case 'PARENTING_COREGULATION':
        return Shield;
      case 'MARRIAGE_EFT':
        return Heart;
      case 'LOGOTHERAPY':
        return BookOpen;
      case 'SHADOW_INTEGRATION':
        return Swords;
      default:
        return Scroll;
    }
  };

  const filteredScrolls =
    selectedCategory === 'ALL'
      ? scrolls
      : scrolls.filter((s) => s.category === selectedCategory);

  return (
    <View style={styles.screen}>
      <ScrollView style={academyStyles.container} contentContainerStyle={academyStyles.content}>
        {/* Header Card */}
        <View style={academyStyles.headerCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <BookOpen size={20} color={Colors.reframeGold} />
                <Text style={academyStyles.headerTitle}>The Academy of Inner Alchemy</Text>
              </View>
              <Text style={academyStyles.headerSubtitle}>
                Master deep psychological literature in Fatherhood, Teaching, Marriage, Stoicism & Neuroscience. Unlock combat cards, Level 2 crisis expansions, and daily routines.
              </Text>
            </View>

            {/* Cloud Sync Button */}
            <TouchableOpacity
              style={[academyStyles.syncBtn, isSyncing && academyStyles.syncBtnDisabled]}
              onPress={handleManualSync}
              disabled={isSyncing}
            >
              <CloudDownload size={13} color={Colors.clarityMana} />
              <Text style={academyStyles.syncBtnText}>{isSyncing ? 'Syncing...' : `v${contentVersion}`}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ⚡ Spaced Repetition Flash-Recall Due Banner */}
        {dueReviews.length > 0 && (
          <View style={academyStyles.recallDueCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Zap size={18} color={Colors.reframeGold} />
                <Text style={academyStyles.recallDueTitle}>
                  Do You Remember? ({dueReviews.length} Books Due)
                </Text>
              </View>
              <Text style={academyStyles.recallDueBadge}>Spaced Recall</Text>
            </View>
            <Text style={academyStyles.recallDueSubtext}>
              Long-term retention requires flash testing before memory fades. Test your recall to earn Clarity Mana.
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginTop: 10 }}>
              {dueReviews.map((item) => (
                <TouchableOpacity
                  key={item.scroll.id}
                  style={academyStyles.recallItemBtn}
                  onPress={() => setActiveRecallChallenge(item)}
                >
                  <Text style={academyStyles.recallItemTitle} numberOfLines={1}>{item.scroll.title}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <Star size={12} color={Colors.reframeGold} />
                    <Text style={academyStyles.recallItemStars}>{item.memoryStars} Stars</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Category Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={academyStyles.categoriesRow}
        >
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <TouchableOpacity
                key={c.id}
                style={[academyStyles.categoryChip, isSelected && academyStyles.categoryChipActive]}
                onPress={() => setSelectedCategory(c.id)}
              >
                <Text style={[academyStyles.categoryChipText, isSelected && academyStyles.categoryChipTextActive]}>
                  {c.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Scrolls Grid */}
        <View style={academyStyles.scrollsGrid}>
          {filteredScrolls.map((scroll) => {
            const IconComponent = getCategoryIcon(scroll.category);
            const isL2Unlocked = scroll.isLevel2Unlocked || scroll.isCompleted;

            return (
              <TouchableOpacity
                key={scroll.id}
                style={[
                  academyStyles.scrollCard,
                  scroll.isCompleted && academyStyles.scrollCardCompleted,
                ]}
                onPress={() => setSelectedScroll(scroll)}
              >
                <View style={academyStyles.cardTopRow}>
                  <View style={[academyStyles.iconContainer, scroll.isCompleted && academyStyles.iconContainerCompleted]}>
                    <IconComponent size={20} color={scroll.isCompleted ? Colors.vitalityGreen : Colors.reframeGold} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    {isL2Unlocked && (
                      <View style={academyStyles.l2Badge}>
                        <Text style={academyStyles.l2BadgeText}>Lvl 2</Text>
                      </View>
                    )}
                    {scroll.isCompleted && (
                      <View style={academyStyles.completedBadge}>
                        <CheckCircle2 size={12} color={Colors.vitalityGreen} />
                        <Text style={academyStyles.completedText}>Mastered</Text>
                      </View>
                    )}
                  </View>
                </View>

                <Text style={academyStyles.scrollTitle}>{scroll.title}</Text>
                <Text style={academyStyles.scrollSubtitle}>{scroll.subtitle}</Text>
                <Text style={academyStyles.scrollAuthor}>By {scroll.authorOrTradition} • {scroll.readingMinutes} min</Text>

                <View style={academyStyles.cardFooter}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Swords size={12} color={Colors.clarityMana} />
                    <Text style={academyStyles.cardRewardText}>
                      {scroll.unlockedCardReward.name}
                    </Text>
                  </View>
                  {scroll.suggestedRoutines && scroll.suggestedRoutines.length > 0 && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Clock size={11} color={Colors.textMuted} />
                      <Text style={academyStyles.routineCountText}>{scroll.suggestedRoutines.length} Routines</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Interactive Multi-Tab Scroll Detail Modal */}
      {selectedScroll && (
        <ScrollDetailModal
          scroll={selectedScroll}
          userState={userState}
          onClose={() => setSelectedScroll(null)}
          onScrollsChanged={loadScrolls}
        />
      )}

      {/* Spaced Recall Flash Modal */}
      {activeRecallChallenge && (
        <RecallFlashModal
          item={activeRecallChallenge}
          userState={userState}
          onClose={() => setActiveRecallChallenge(null)}
        />
      )}
    </View>
  );
};
