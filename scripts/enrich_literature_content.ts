import * as fs from 'fs';
import { WisdomScroll, BookRoutine, Level2Expansion, SpacedRecallChallenge } from '../src/core/types';
import { INITIAL_SCROLLS_RICH } from '../src/content/wisdomScrollsRich';
import { SCROLLS_WAVE3 } from '../src/content/wisdomScrollsWave3';

/** All scrolls: base rich set + wave-3 role-deep expansion */
const ALL_SCROLLS: WisdomScroll[] = [...INITIAL_SCROLLS_RICH, ...SCROLLS_WAVE3];

const ROUTINE_PRESETS: Record<string, BookRoutine[]> = {
  scr_parent_1: [
    {
      id: 'rtn_siegel_connect',
      scrollId: 'scr_parent_1',
      bookTitle: 'The Whole-Brain Child',
      title: 'Siegel’s Connect-Before-Direct Anchor',
      description: 'Drop to physical eye level and offer somatic touch before issuing any bedtime instruction or boundary.',
      suggestedTime: '19:45',
      frequency: 'EVENING',
      energyTier: 'LOW_10',
      reminderEnabled: true,
      clinicalRationale: 'De-escalates amygdala downstairs panic so the prefrontal upstairs brain can process directives.',
      isScheduled: false,
    },
    {
      id: 'rtn_siegel_nameit',
      scrollId: 'scr_parent_1',
      bookTitle: 'The Whole-Brain Child',
      title: '“Name It to Tame It” Evening Review',
      description: 'Help your child narrate the emotional peaks and valleys of their day in a calm story format.',
      suggestedTime: '20:15',
      frequency: 'EVENING',
      energyTier: 'STEADY_40',
      reminderEnabled: true,
      clinicalRationale: 'Left-brain storytelling integrates right-brain emotional floods into coherent autobiographical memory.',
      isScheduled: false,
    },
  ],
  scr_gottman_1: [
    {
      id: 'rtn_gottman_hug',
      scrollId: 'scr_gottman_1',
      bookTitle: 'The 7 Principles for Making Marriage Work',
      title: 'The 6-Second Departure Hug',
      description: 'Share an uninterrupted 6-second hug with your partner every morning before heading to work or school.',
      suggestedTime: '07:45',
      frequency: 'MORNING',
      energyTier: 'LOW_10',
      reminderEnabled: true,
      clinicalRationale: 'Releases oxytocin and signals nervous system safety, buffering against relational roomate drift.',
      isScheduled: false,
    },
    {
      id: 'rtn_gottman_microbid',
      scrollId: 'scr_gottman_1',
      bookTitle: 'The 7 Principles for Making Marriage Work',
      title: 'Daily Micro-Bid Evening Check-in',
      description: 'Ask 1 open-ended emotional question without solving or criticizing: “What was the heaviest part of your day?”',
      suggestedTime: '21:00',
      frequency: 'EVENING',
      energyTier: 'STEADY_40',
      reminderEnabled: true,
      clinicalRationale: 'Deposits into the emotional bank account, maintaining the 5:1 positive interaction ratio.',
      isScheduled: false,
    },
  ],
  scr_stoic_1: [
    {
      id: 'rtn_marcus_armor',
      scrollId: 'scr_stoic_1',
      bookTitle: 'Meditations (Marcus Aurelius)',
      title: 'Marcus Aurelius Morning Armor',
      description: 'Recite: “Today I will meet ungrateful, arrogant, and difficult people. None can harm my character unless I react with hatred.”',
      suggestedTime: '06:45',
      frequency: 'MORNING',
      energyTier: 'LOW_10',
      reminderEnabled: true,
      clinicalRationale: 'Premeditatio Malorum primes the frontal cortex against unexpected social triggers.',
      isScheduled: false,
    },
  ],
  scr_sleep_1: [
    {
      id: 'rtn_walker_caffeine',
      scrollId: 'scr_sleep_1',
      bookTitle: 'Why We Sleep (Matthew Walker)',
      title: '10-Hour Adenosine Caffeine Curfew',
      description: 'Cut off all coffee, tea, and stimulants 10 hours prior to scheduled sleep to allow adenosine sleep pressure to build.',
      suggestedTime: '12:00',
      frequency: 'DAILY',
      energyTier: 'LOW_10',
      reminderEnabled: true,
      clinicalRationale: 'Prevents caffeine half-life from blocking adenosine A1 receptors during deep slow-wave NREM sleep.',
      isScheduled: false,
    },
    {
      id: 'rtn_walker_stimulus_reset',
      scrollId: 'scr_sleep_1',
      bookTitle: 'Why We Sleep (Matthew Walker)',
      title: '20-Minute Bed Stimulus Reset',
      description: 'If awake in bed after 20 minutes, get up into dim light and read fiction until drowsy. Never fight awake in bed.',
      suggestedTime: '23:30',
      frequency: 'EVENING',
      energyTier: 'LOW_10',
      reminderEnabled: true,
      clinicalRationale: 'Breaks the conditioned insomnia loop where the brain associates the mattress with hyper-vigilance.',
      isScheduled: false,
    },
  ],
};

const LEVEL2_PRESETS: Record<string, Level2Expansion> = {
  scr_parent_1: {
    title: 'Level 2: The Severe Sensory Overload Meltdown Crucible',
    subtitle: 'Advanced Whole-Brain Intervention during Extreme Escalation',
    deepCaseStudy: 'Your 5-year-old child is kicking the door, sobbing uncontrollably, and throwing heavy items after an exhausting sensory-rich birthday party. They scream: "I hate you, leave me alone!" but cry louder when you step back.',
    contentMarkdown: `### 🌪️ Advanced Crisis Anatomy
In extreme neurochemical flooding (hyper-arousal), the child’s hippocampus temporarily shuts down memory encoding and the amygdala triggers a fight-or-flight panic. 

#### 🚫 High-Risk Clinical Errors:
1. **The Logical Debate:** Attempting to explain *"We bought you nice gifts today, why are you so ungrateful?"* (This adds cognitive noise and escalates aggression by 300%).
2. **The Isolation Abandonment:** Locking them in their room alone (Signals catastrophic attachment threat to an immature nervous system).

#### 🛡️ The Advanced 4-Step De-Escalation Protocol:
1. **Low Somatic Gravity:** Sit on the floor with your back against the wall, lowering your eye line beneath theirs.
2. **Containment Without Restraint:** *"I will keep you safe, and I will keep our home safe. I won't let you throw the chair, but I am right here with you."*
3. **Pacing Breath:** Breathe at a slow 4-count inhale and 6-count exhale. The child's mirror neuron system will unconsciously synchronize with your parasympathetic pulse within 4 minutes.
4. **Post-Storm Repair:** Only discuss boundaries the following morning when cortisol levels have reset to baseline.`,
    advancedQuiz: [
      {
        question: 'During an extreme sensory meltdown with thrown objects, what is the primary goal of the parent in the first 5 minutes?',
        options: [
          'Somatic containment, emotional co-regulation, and nervous system safety (Zero lecturing)',
          'Demanding immediate verbal apologies and item cleanup',
          'Threatening to cancel future birthday events as a consequence',
          'Explaining the financial cost of the damaged property',
        ],
        correctIndex: 0,
        explanation: 'Logic centers are completely offline during high amygdala hijack; safety and somatic co-regulation must precede all disciplinary instruction.',
        clinicalDistinction: 'Optimal parental regulation treats aggression as a stress behavior, not a motivational defiance.',
      },
    ],
    unlockedMasteryRelic: {
      id: 'rel_siegel_anchor',
      name: 'Siegel’s Golden Anchor',
      description: 'An ancient medallion of parental composure. Grants +25 Mind Shield against family chaos.',
      statBoost: 'MIND_SHIELD',
      boostAmount: 25,
    },
  },
  scr_gottman_1: {
    title: 'Level 2: Defusing the Fourth Horseman (Contempt & Stonewalling)',
    subtitle: 'Advanced Relational Repair during Chronic Exhaustion Seasons',
    deepCaseStudy: 'After an exhausting 14-hour teaching and childcare day, your partner rolls their eyes at a sink full of dishes and mutters: "Must be nice to sit down while I do literally everything in this house." You feel an intense surge of defensive fury.',
    contentMarkdown: `### 💔 The Neurobiology of Relational Flooding
When heart rates exceed 100 BPM during marital conflict, diffuse physiological arousal (DPA) occurs. Empathy, humor, and listening centers shut down, and partners perceive neutral remarks as existential attacks.

#### ⚔️ The Gottman Antidote Matrix:
* **The Seductive Trap:** Counter-attacking with a laundry list of chores you did 3 days ago.
* **The Clinical Antidote:** **Softened Startup & Expressing Positive Needs.**
* Replace: *"You are so passive-aggressive and mean!"*
* With: *"I hear that you're exhausted and overwhelmed by the kitchen. I am completely depleted too. Let's sit together for 10 minutes, and I will do the pots once my battery resets."*`,
    advancedQuiz: [
      {
        question: 'When a partner uses contempt (the #1 predictor of divorce), what is the clinically proven Gottman antidote?',
        options: [
          'Creating a culture of appreciation and expressing a positive need rather than defending yourself',
          'Giving the silent treatment for 48 hours to teach them a lesson',
          'Immediately proving that you worked longer hours than they did',
          'Inviting outside family members to judge who is right',
        ],
        correctIndex: 0,
        explanation: 'Contempt must be counteracted with a culture of appreciation and vulnerability rather than counter-attacking with evidence.',
        clinicalDistinction: 'Defensiveness fuels the conflict cycle; owning your partner’s underlying exhaustion disarms the dispute.',
      },
    ],
    unlockedMasteryRelic: {
      id: 'rel_gottman_chalice',
      name: 'The Gottman Chalice of Repair',
      description: 'Forged in radical relational empathy. Grants +30 Compassion Aura.',
      statBoost: 'COMPASSION_AURA',
      boostAmount: 30,
    },
  },
};

const SPACED_RECALL_PRESETS: Record<string, SpacedRecallChallenge[]> = {
  scr_parent_1: [
    {
      id: 'spc_siegel_1',
      scrollId: 'scr_parent_1',
      bookTitle: 'The Whole-Brain Child',
      author: 'Dr. Daniel Siegel & Tina Payne Bryson',
      scenarioPrompt: '⚡ Flash Memory Check: 3 days have passed since you studied Upstairs vs Downstairs Brain.',
      question: 'Your toddler is screaming because their banana broke in half. What is the fundamental rule of Whole-Brain parenting in this exact second?',
      options: [
        'Connect before you direct: soothe the downstairs emotional flood before explaining banana physics',
        'Tell them big kids don’t cry over fruit to build emotional resilience',
        'Eat the banana yourself to demonstrate consequences',
        'Send them to timeout immediately until they show gratitude',
      ],
      correctIndex: 0,
      explanation: 'Children cannot process logic or fractions until their emotional downstairs brain feels witnessed and soothed.',
      clinicalInsight: 'Prefrontal integration requires ventral vagal safety before cognitive flexibility emerges.',
      nextReviewDueDays: 3,
    },
    {
      id: 'spc_siegel_2',
      scrollId: 'scr_parent_1',
      bookTitle: 'The Whole-Brain Child',
      author: 'Dr. Daniel Siegel & Tina Payne Bryson',
      scenarioPrompt: '⚡ Day 7 Spaced Review: Memory Consolidation.',
      question: 'What is the purpose of the “Name It to Tame It” clinical technique?',
      options: [
        'Engaging the left brain’s narrative ability to make sense of and calm the right brain’s intense emotions',
        'Labeling the child as naughty so they understand their flaw',
        'Naming 10 rules the child must memorize before bedtime',
        'Ignoring emotional words to prevent drama',
      ],
      correctIndex: 0,
      explanation: 'Storytelling recruits the left hemisphere to contextualize intense right-hemisphere emotional storms.',
      clinicalInsight: 'Bilateral brain integration transforms fragmented distress into coherent memories.',
      nextReviewDueDays: 7,
    },
  ],
  scr_gottman_1: [
    {
      id: 'spc_gottman_1',
      scrollId: 'scr_gottman_1',
      bookTitle: 'The 7 Principles for Making Marriage Work',
      author: 'Dr. John Gottman',
      scenarioPrompt: '⚡ Flash Memory Check: Relational Architecture Recall.',
      question: 'According to 40 years of Gottman research, what is the minimum ratio of positive to negative interactions required for marital stability during conflict?',
      options: [
        '5:1 (Five positive interactions for every one negative interaction)',
        '1:1 (Equal balance of praise and criticism)',
        '10:1 during peacetime, 0.5:1 during arguments',
        '2:1 only on weekends',
      ],
      correctIndex: 0,
      explanation: 'Stable marriages maintain a 5:1 ratio of positive micro-bids even during heavy arguments.',
      clinicalInsight: 'Micro-repair attempts cushion relational conflict and prevent chronic emotional stonewalling.',
      nextReviewDueDays: 3,
    },
  ],
  scr_stoic_1: [
    {
      id: 'spc_stoic_1',
      scrollId: 'scr_stoic_1',
      bookTitle: 'Meditations',
      author: 'Marcus Aurelius',
      scenarioPrompt: '⚡ Flash Memory Check: The Dichotomy of Control.',
      question: 'A colleague at school spread an unfair rumor about your classroom management. According to Epictetus & Marcus Aurelius, what is within your absolute control?',
      options: [
        'Your internal judgment, your dignity of character, and your noble conduct going forward',
        'What your colleagues think and say behind your back',
        'The administrative decisions made by the principal',
        'Controlling the emotional feelings of all parents in the district',
      ],
      correctIndex: 0,
      explanation: 'Only your own moral will (prohairesis) and judgments belong to you; external opinions are indifferent (adiaphora).',
      clinicalInsight: 'Stoic tranquility is the byproduct of total detachment from external approval.',
      nextReviewDueDays: 3,
    },
  ],
};

// Enrich all scrolls with default rich routines, expansions, and spaced recall challenges.
// Wave-3 scrolls carry hand-authored deep content, so they pass through unchanged
// (their ids have no presets; the fallbacks would only apply if fields were missing).
const enrichedScrolls: WisdomScroll[] = ALL_SCROLLS.map((scroll: WisdomScroll) => {
  if (SCROLLS_WAVE3.some((w) => w.id === scroll.id)) return scroll;
  const routines = ROUTINE_PRESETS[scroll.id] || [
    {
      id: `rtn_def_${scroll.id}`,
      scrollId: scroll.id,
      bookTitle: scroll.title,
      title: `${scroll.title} Daily Micro-Anchor`,
      description: `Practice the core clinical wisdom of ${scroll.authorOrTradition}: ${scroll.keyTakeaway}`,
      suggestedTime: '08:00',
      frequency: 'DAILY',
      energyTier: 'LOW_10',
      reminderEnabled: true,
      clinicalRationale: 'Daily micro-repetition consolidates neuroplastic integration into automatic procedural habits.',
      isScheduled: false,
    },
  ];

  const level2 = LEVEL2_PRESETS[scroll.id] || {
    title: `Level 2: Advanced ${scroll.title} Masterclass`,
    subtitle: `Crucible Case Studies in ${scroll.authorOrTradition}`,
    deepCaseStudy: `A complex real-world high-friction scenario testing your mastery of ${scroll.title} under acute stress and fatigue.`,
    contentMarkdown: `### 🏛️ Advanced Mastery & Real-World Friction
To truly integrate ${scroll.title}, one must apply it not when life is quiet, but when your nervous system is pushed to its limits.

#### ⚔️ The Crucible Rules:
1. **Notice the Automatic Reaction:** Where does your ego want to flee or attack?
2. **Apply the ${scroll.title} Key:** ${scroll.keyTakeaway}
3. **Execute with Radical Composure:** Model healthy adult presence for yourself, your children, and your community.`,
    advancedQuiz: [
      {
        question: `When applying ${scroll.title} in an acute emergency or high-stress confrontation, what is the cardinal principle?`,
        options: [
          `Ground in objective truth and inner composure before speaking or acting`,
          `React with maximum verbal volume to establish dominance`,
          `Surrender all personal boundaries and accept blame`,
          `Avoid thinking about the situation forever`,
        ],
        correctIndex: 0,
        explanation: `True mastery in ${scroll.authorOrTradition} demands unwavering inner grounding and clear, non-reactive presence.`,
        clinicalDistinction: `Sovereign composure transforms external friction into internal virtue.`,
      },
    ],
    unlockedMasteryRelic: {
      id: `rel_mastery_${scroll.id}`,
      name: `${scroll.title} Mastery Crest`,
      description: `A sacred emblem forged in the Crucible of ${scroll.authorOrTradition}. Grants +20 Mind Shield & +15 Logic Edge.`,
      statBoost: 'MIND_SHIELD',
      boostAmount: 20,
    },
  };

  const spaced = SPACED_RECALL_PRESETS[scroll.id] || [
    {
      id: `spc_def_${scroll.id}`,
      scrollId: scroll.id,
      bookTitle: scroll.title,
      author: scroll.authorOrTradition,
      scenarioPrompt: `⚡ Spaced Retention Recall: Checking long-term memory for ${scroll.title}.`,
      question: `What is the fundamental thesis of ${scroll.title}?`,
      options: [
        scroll.keyTakeaway,
        'That emotions should always be completely suppressed without question',
        'That human behavior cannot ever be modified or healed',
        'That external events dictate 100% of human happiness',
      ],
      correctIndex: 0,
      explanation: `Mastery of this scroll requires anchoring into its foundational truth: ${scroll.keyTakeaway}`,
      clinicalInsight: 'Spaced flash recall builds long-term myelination in prefrontal cortical pathways.',
      nextReviewDueDays: 3,
    },
  ];

  return {
    ...scroll,
    suggestedRoutines: routines,
    level2Expansion: level2,
    spacedRecallChallenges: spaced,
    isLevel2Unlocked: scroll.isCompleted || false,
    isLevel2Completed: false,
    memoryLevel: scroll.isCompleted ? 2 : 0,
  };
});

fs.writeFileSync('./content/wisdom_scrolls.json', JSON.stringify(enrichedScrolls, null, 2));

const manifest = {
  version: '1.4.0',
  updatedAt: new Date().toISOString(),
  name: 'Aetheria Remote Content Manifest (Literature, Level 2 Expansions & Routines)',
  repository: 'https://github.com/damessner/aetheria-app',
  files: {
    wisdom_scrolls: 'wisdom_scrolls.json',
    thought_stream: 'thought_stream.json',
    quests: 'quests.json',
    method_codex: 'method_codex.json',
  },
  counts: {
    wisdom_scrolls: enrichedScrolls.length,
    thought_stream: 24,
    quests: 8,
    method_codex: 8,
  },
};

fs.writeFileSync('./content/manifest.json', JSON.stringify(manifest, null, 2));
console.log(`✅ Successfully enriched ${enrichedScrolls.length} scrolls with Level 2 Expansions, Routines, and Spaced Recall!`);
