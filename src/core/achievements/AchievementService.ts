import { AchievementBadge, UserState, ThoughtFeedItem, WisdomScroll } from '../types';
import { Colors } from '../theme';

export const ALL_ACHIEVEMENT_DEFINITIONS: Omit<AchievementBadge, 'currentProgress' | 'isUnlocked' | 'unlockedAt'>[] = [
  {
    id: 'ach_fatherhood_anchor',
    title: 'The Father’s Anchor',
    category: 'FATHERHOOD',
    tier: 'GOLD',
    description: 'Reframe 5 Fatherhood & Parenting cognitive challenges with optimal clarity.',
    iconName: 'Shield',
    color: Colors.shieldCyan,
    maxProgress: 5,
    rewardVp: 100,
  },
  {
    id: 'ach_educator_citadel',
    title: 'The Sovereign Educator',
    category: 'TEACHING',
    tier: 'GOLD',
    description: 'Reframe 5 Teaching & Educator challenges with mature composure.',
    iconName: 'BookOpen',
    color: Colors.logicBlue,
    maxProgress: 5,
    rewardVp: 100,
  },
  {
    id: 'ach_relational_harmony',
    title: 'Relational Architect',
    category: 'RELATIONSHIP',
    tier: 'GOLD',
    description: 'Reframe 5 Marriage & Intimacy challenges with empathy and non-defensiveness.',
    iconName: 'Heart',
    color: Colors.compassionPink,
    maxProgress: 5,
    rewardVp: 100,
  },
  {
    id: 'ach_stoic_mastery',
    title: 'Stoic Sage',
    category: 'STOICISM',
    tier: 'PLATINUM',
    description: 'Master 4 Stoic Wisdom Scrolls in the Academy of Inner Alchemy.',
    iconName: 'Scale',
    color: Colors.reframeGold,
    maxProgress: 4,
    rewardVp: 150,
  },
  {
    id: 'ach_polyvagal_peace',
    title: 'Vagal Alchemist',
    category: 'SOMATIC',
    tier: 'SILVER',
    description: 'Master 4 Polyvagal & Somatic Co-Regulation scrolls and breath pacers.',
    iconName: 'Wind',
    color: Colors.vitalityGreen,
    maxProgress: 4,
    rewardVp: 80,
  },
  {
    id: 'ach_shadow_slayer',
    title: 'Crucible Vanguard',
    category: 'SHADOW',
    tier: 'PLATINUM',
    description: 'Forge all 4 Cardinal Virtues (Courage, Integrity, Temperance, Humility) to level 25+.',
    iconName: 'Flame',
    color: Colors.distortionRed,
    maxProgress: 100,
    rewardVp: 200,
  },
  {
    id: 'ach_unbroken_flame',
    title: 'Unshakeable Flame',
    category: 'STREAK',
    tier: 'GOLD',
    description: 'Maintain an active 7-day daily reflection and practice streak.',
    iconName: 'Sparkles',
    color: Colors.reframeGold,
    maxProgress: 7,
    rewardVp: 120,
  },
  {
    id: 'ach_circadian_guardian',
    title: 'Circadian Guardian',
    category: 'SLEEP',
    tier: 'SILVER',
    description: 'Log 5 sleep efficiency entries with >= 85% sleep efficiency.',
    iconName: 'Moon',
    color: Colors.gloomPurple,
    maxProgress: 5,
    rewardVp: 75,
  },
];

export class AchievementServiceImpl {
  /**
   * Evaluates user progress across all achievements and returns populated badges
   */
  evaluateAchievements(
    userState: UserState,
    solvedThoughts: ThoughtFeedItem[] = [],
    scrolls: WisdomScroll[] = []
  ): AchievementBadge[] {
    const unlockedSet = new Set(userState.unlockedAchievementIds || []);

    const fatherhoodCount = solvedThoughts.filter(
      (t) => t.isSolved && t.contextDomain === 'FATHERHOOD_PARENTING'
    ).length;

    const teachingCount = solvedThoughts.filter(
      (t) => t.isSolved && t.contextDomain === 'TEACHING_EDUCATOR'
    ).length;

    const relationshipCount = solvedThoughts.filter(
      (t) => t.isSolved && t.contextDomain === 'PARTNERSHIP_INTIMACY'
    ).length;

    const completedScrolls = scrolls.filter((s) => s.isCompleted);
    const stoicScrollsCount = completedScrolls.filter((s) => s.category === 'STOICISM').length;
    const somaticScrollsCount = completedScrolls.filter(
      (s) => s.category === 'NEUROSCIENCE' || s.category === 'PARENTING_COREGULATION'
    ).length;

    const virtues = userState.cardinalVirtues || { courage: 25, integrity: 25, temperance: 25, humility: 25 };
    const avgVirtue = Math.round((virtues.courage + virtues.integrity + virtues.temperance + virtues.humility) / 4);

    const currentStreak = userState.streakData?.currentStreak || 1;

    return ALL_ACHIEVEMENT_DEFINITIONS.map((def) => {
      let progress = 0;

      switch (def.id) {
        case 'ach_fatherhood_anchor':
          progress = fatherhoodCount;
          break;
        case 'ach_educator_citadel':
          progress = teachingCount;
          break;
        case 'ach_relational_harmony':
          progress = relationshipCount;
          break;
        case 'ach_stoic_mastery':
          progress = stoicScrollsCount;
          break;
        case 'ach_polyvagal_peace':
          progress = somaticScrollsCount;
          break;
        case 'ach_shadow_slayer':
          progress = avgVirtue;
          break;
        case 'ach_unbroken_flame':
          progress = currentStreak;
          break;
        case 'ach_circadian_guardian':
          progress = Math.min(def.maxProgress, 3); // Demo/initial progress
          break;
      }

      const isUnlocked = unlockedSet.has(def.id) || progress >= def.maxProgress;

      return {
        ...def,
        currentProgress: Math.min(progress, def.maxProgress),
        isUnlocked,
      };
    });
  }
}

export const AchievementService = new AchievementServiceImpl();
