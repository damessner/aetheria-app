import { ThoughtFeedItem, ReframeChoice, TherapeuticTechnique } from '../core/types';

type Choice = Omit<ReframeChoice, 'id'>;

/**
 * Builds a balanced 3-choice reframe set (optimal / toxic positivity /
 * defeatist rationalization) with consistent id naming.
 */
function choices(
  prefix: string,
  optimal: Choice,
  toxic: Choice,
  rationalization: Choice
): ReframeChoice[] {
  return [
    { id: `${prefix}_opt`, ...optimal },
    { id: `${prefix}_toxic`, ...toxic },
    { id: `${prefix}_rat`, ...rationalization },
  ];
}

/**
 * Wave 2 expansion for the Cognitive Stream.
 * New scenarios across all four core domains — same clinical structure
 * as the seed feed (distortion diagnosis → technique → reframe choice).
 */
export const THOUGHT_FEED_WAVE2: ThoughtFeedItem[] = [
  /* ------------------------- FATHERHOOD & PARENTING ------------------------ */

  {
    id: 'thg_parent_7',
    thought:
      'I missed my son’s school play because of a work deadline. He’ll remember this as the day Dad chose his job over him.',
    contextDomain: 'FATHERHOOD_PARENTING',
    correctDistortion: 'CATASTROPHIZING',
    explanation:
      'Projecting a lifelong negative memory onto a single unavoidable conflict, ignoring repair.',
    techniqueOptions: ['CFT_COMPASSION', 'CBT_REALITY_CHECK', 'ACT_DEFUSION'],
    suggestedReframe:
      'One missed event is not a broken bond. I can acknowledge his disappointment honestly and plan one-on-one time — repair matters more than perfection.',
    reframeOptions: choices(
      'ref_p7',
      {
        text: 'Missing one play doesn’t define me as a father. I’ll name his disappointment, apologize sincerely, and create a make-it-up moment. Repair is what kids remember.',
        type: 'OPTIMAL',
        score: 96,
        explanation: 'Models rupture-and-repair science; converts guilt into connection.',
        clinicalFeedback: 'Strong reframe. Children internalize repair attempts far more than single absences.',
      },
      {
        text: 'It’s fine! Work pays for the house he lives in, so really I’m the better parent here.',
        type: 'TOXIC_POSITIVITY',
        score: 42,
        explanation: 'Deflects legitimate relational hurt behind provider justification.',
        clinicalFeedback: 'Provider logic cannot substitute for emotional presence. His feelings still need acknowledging.',
      },
      {
        text: 'This is just how it will always be. My job owns me, and I’ll keep missing every milestone until they stop inviting me.',
        type: 'RATIONALIZATION',
        score: 22,
        explanation: 'Fatalism that removes all agency to change the pattern.',
        clinicalFeedback: 'Helplessness narrative. You have more scheduling agency than this thought admits.',
      }
    ),
    isSolved: false,
  },
  {
    id: 'thg_parent_8',
    thought:
      'Every other dad seems to juggle career and fatherhood effortlessly. I’m the only one who finds it this overwhelming.',
    contextDomain: 'FATHERHOOD_PARENTING',
    correctDistortion: 'OVERGENERALIZATION',
    explanation:
      'Universalizing private struggle while comparing it to other men’s curated public faces.',
    techniqueOptions: ['CFT_COMPASSION', 'CBT_REALITY_CHECK'],
    suggestedReframe:
      'I’m seeing highlight reels and comparing them to my backstage. Most fathers find this hard — they just don’t post about it.',
    reframeOptions: choices(
      'ref_p8',
      {
        text: 'Comparing my inside experience to other dads’ outside image is rigged data. Struggle with this transition is near-universal — I’m not uniquely failing.',
        type: 'OPTIMAL',
        score: 95,
        explanation: 'Classic comparison-distortion correction plus normalizing.',
        clinicalFeedback: 'Exactly right. Curated exteriors are not evidence about others’ inner ease.',
      },
      {
        text: 'You’re right, I should just be grateful instead of complaining. Other people have real problems!',
        type: 'TOXIC_POSITIVITY',
        score: 44,
        explanation: 'Gratitude weaponized into self-silencing.',
        clinicalFeedback: 'Dismissing your own struggle helps no one in your family.',
      },
      {
        text: 'Fine — if I can’t handle what other dads handle, I simply don’t deserve to lead my household.',
        type: 'RATIONALIZATION',
        score: 20,
        explanation: 'Converts comparison into a verdict of unworthiness.',
        clinicalFeedback: 'That conclusion punishes you for being human.',
      }
    ),
    isSolved: false,
  },
  {
    id: 'thg_parent_9',
    thought:
      'My daughter told her friend’s mom that she feels I never listen. She now believes I don’t love her.',
    contextDomain: 'FATHERHOOD_PARENTING',
    correctDistortion: 'MIND_READING',
    explanation:
      'Assuming a child reported one frustration means she has concluded an absolute belief about your love.',
    techniqueOptions: ['CBT_REALITY_CHECK', 'SCHEMA_HEALTHY_ADULT'],
    suggestedReframe:
      'She shared a feeling about one behavior — listening. That’s actually trust, not a verdict on my love. I can ask her about it directly.',
    reframeOptions: choices(
      'ref_p9',
      {
        text: 'Her sharing frustration means she trusts adults enough to voice it — and gives me exact data on how to love her better. I’ll ask her about it tonight.',
        type: 'OPTIMAL',
        score: 97,
        explanation: 'Reframes complaint as attachment signal; moves to direct inquiry.',
        clinicalFeedback: 'Beautiful. A child who complains to you is still talking to you.',
      },
      {
        text: 'Kids say dramatic things all the time — no need to take any of it seriously or change anything.',
        type: 'TOXIC_POSITIVITY',
        score: 40,
        explanation: 'Minimizes actionable feedback about felt experience.',
        clinicalFeedback: 'Discounting her words wastes a genuine connection opportunity.',
      },
      {
        text: 'She’s already written me off. The door is closed and there’s nothing I can do about it now.',
        type: 'RATIONALIZATION',
        score: 18,
        explanation: 'Mind-reading stacked with fatalism.',
        clinicalFeedback: 'Children’s doors reopen constantly — especially when parents knock.',
      }
    ),
    isSolved: false,
  },

  /* --------------------------- TEACHING & EDUCATOR -------------------------- */

  {
    id: 'thg_teach_7',
    thought:
      'A parent emailed the principal complaining about my grading. My reputation in this school is permanently destroyed.',
    contextDomain: 'TEACHING_EDUCATOR',
    correctDistortion: 'CATASTROPHIZING',
    explanation:
      'A single complaint escalated into irreversible professional ruin.',
    techniqueOptions: ['STOIC_CONTROL', 'CBT_REALITY_CHECK'],
    suggestedReframe:
      'One complaint is data, not a verdict. Principals evaluate patterns, not single emails. I can respond professionally and let the process work.',
    reframeOptions: choices(
      'ref_t7',
      {
        text: 'One parent’s email is one data point. I’ll prepare my rubric, respond calmly, and let documented practice speak. Administrators judge trends, not incidents.',
        type: 'OPTIMAL',
        score: 96,
        explanation: 'Stoic control + evidence-based professional confidence.',
        clinicalFeedback: 'Grounded. Institutions read patterns, and your pattern is strong.',
      },
      {
        text: 'No press is bad press! At least they’re talking about me — this proves I hold high standards!',
        type: 'TOXIC_POSITIVITY',
        score: 45,
        explanation: 'Reframing away without addressing the real anxiety.',
        clinicalFeedback: 'Bravado skips over the worry instead of resolving it.',
      },
      {
        text: 'Administration always sides with parents. It’s only a matter of time before I’m pushed out anyway.',
        type: 'RATIONALIZATION',
        score: 21,
        explanation: 'Pre-emptive surrender based on assumed institutional bias.',
        clinicalFeedback: 'Assumed doom forecloses a fair process that hasn’t even started.',
      }
    ),
    isSolved: false,
  },
  {
    id: 'thg_teach_8',
    thought:
      'I spent Sunday night dreading Monday again. If teaching were my true calling, Sundays wouldn’t feel like this.',
    contextDomain: 'TEACHING_EDUCATOR',
    correctDistortion: 'ALL_OR_NOTHING',
    explanation:
      'Binary test of vocation based on the absence of discomfort — no middle category exists.',
    techniqueOptions: ['ACT_DEFUSION', 'BA_MICRO_ACTION', 'CFT_COMPASSION'],
    suggestedReframe:
      'Sunday dread signals workload strain, not a failed calling. Every profession has Sunday nights. What tiny Monday-morning anchor would lower the dread?',
    reframeOptions: choices(
      'ref_t8',
      {
        text: 'Dread measures system load, not destiny misalignment. Even passionate teachers feel this. One small Monday anchor — coffee before email — starts fixing the load.',
        type: 'OPTIMAL',
        score: 94,
        explanation: 'Separates signal from story; adds behavioral lever.',
        clinicalFeedback: 'Precise distinction. Feelings are weather data, not career verdicts.',
      },
      {
        text: 'Just stay positive! Monday will magically be amazing if I visualize it hard enough!',
        type: 'TOXIC_POSITIVITY',
        score: 43,
        explanation: 'Visualization without structural change.',
        clinicalFeedback: 'Optimism without workload adjustment reliably collapses by Tuesday.',
      },
      {
        text: 'Clearly I chose the wrong profession and wasted years of training. That’s the honest truth.',
        type: 'RATIONALIZATION',
        score: 24,
        explanation: 'Uses one feeling to nullify years of evidence.',
        clinicalFeedback: 'One rough season cannot retroactively erase a chosen path.',
      }
    ),
    isSolved: false,
  },
  {
    id: 'thg_teach_9',
    thought:
      'The class went chaotic during my observation. Now the evaluating administrator knows I have zero classroom presence.',
    contextDomain: 'TEACHING_EDUCATOR',
    correctDistortion: 'MIND_READING',
    explanation:
      'Claiming to know the evaluator’s global conclusion from one noisy lesson segment.',
    techniqueOptions: ['CBT_REALITY_CHECK', 'STOIC_CONTROL'],
    suggestedReframe:
      'I don’t know what they concluded. Evaluators see hundreds of lessons and know chaos happens. Their notes will show the full picture, not my fear.',
    reframeOptions: choices(
      'ref_t9',
      {
        text: 'I cannot read their mind. Evaluators expect turbulence and assess recovery skills. My written reflection afterward demonstrates exactly the professionalism being scored.',
        type: 'OPTIMAL',
        score: 95,
        explanation: 'Direct mind-reading correction with professional-behavior anchor.',
        clinicalFeedback: 'Strong. Recovery from chaos often scores better than sterile lessons.',
      },
      {
        text: 'Chaos means engaged students! Nothing to improve at all — perfect lesson!',
        type: 'TOXIC_POSITIVITY',
        score: 41,
        explanation: 'Spins instead of learning.',
        clinicalFeedback: 'False reassurance blocks genuine craft refinement.',
      },
      {
        text: 'They’ve already decided. Everyone saw the “real” disorganized teacher underneath the act.',
        type: 'RATIONALIZATION',
        score: 23,
        explanation: 'Impostor framing plus mind-reading.',
        clinicalFeedback: 'There is no “act” — there is a teacher having a hard day.',
      }
    ),
    isSolved: false,
  },

  /* -------------------------- PARTNERSHIP & INTIMACY ------------------------ */

  {
    id: 'thg_rel_7',
    thought:
      'We haven’t had a deep conversation in weeks. The love is quietly dying and neither of us cares enough to save it.',
    contextDomain: 'PARTNERSHIP_INTIMACY',
    correctDistortion: 'EMOTIONAL_REASONING',
    explanation:
      'Reading the relationship’s fate directly off a flat emotional season.',
    techniqueOptions: ['CBT_REALITY_CHECK', 'BA_MICRO_ACTION'],
    suggestedReframe:
      'Flat seasons are information about busyness, not prophecy about love. Connection is built through small bids, not rescued through panic.',
    reframeOptions: choices(
      'ref_r7',
      {
        text: 'Distance usually reflects logistics, not lost love. Gottman’s research says bids for connection rebuild bonds — I’ll make one small bid tonight instead of diagnosing the marriage.',
        type: 'OPTIMAL',
        score: 96,
        explanation: 'Evidence-based (bids), converts anxiety into micro-action.',
        clinicalFeedback: 'Excellent. Small repeated bids are literally how couples reconnect.',
      },
      {
        text: 'We’re fine! Couples don’t need deep conversations — coexisting peacefully is already success!',
        type: 'TOXIC_POSITIVITY',
        score: 40,
        explanation: 'Lowers the bar to avoid the ache of distance.',
        clinicalFeedback: 'Peaceful roommateship and intimacy are not the same goal.',
      },
      {
        text: 'If it takes effort, the spark was never real. Real marriages don’t need scheduled conversations.',
        type: 'RATIONALIZATION',
        score: 19,
        explanation: 'Myth of effortless love used to justify withdrawal.',
        clinicalFeedback: 'Effort is not evidence against love — it is the substance of it.',
      }
    ),
    isSolved: false,
  },
  {
    id: 'thg_rel_8',
    thought:
      'My partner got irritable at dinner for no reason. Clearly I did something wrong and our evening is ruined.',
    contextDomain: 'PARTNERSHIP_INTIMACY',
    correctDistortion: 'PERSONALIZATION',
    explanation:
      'Assigning yourself causal responsibility for another adult’s unexplained mood.',
    techniqueOptions: ['STOIC_CONTROL', 'CBT_REALITY_CHECK'],
    suggestedReframe:
      'Their irritability most likely came from their day — I wasn’t present for it. I can ask once, kindly, without absorbing blame that isn’t mine.',
    reframeOptions: choices(
      'ref_r8',
      {
        text: 'Their mood has many possible causes, most of which predate dinner. I’ll offer one gentle check-in and then let them own their own weather.',
        type: 'OPTIMAL',
        score: 97,
        explanation: 'Textbook de-personalization with healthy boundary.',
        clinicalFeedback: 'Precisely Stoic: their inner state is theirs; your kindness is yours.',
      },
      {
        text: 'No big deal! I’ll just pretend nothing happened forever and everything stays harmonious!',
        type: 'TOXIC_POSITIVITY',
        score: 42,
        explanation: 'Conflict-avoidant smoothing.',
        clinicalFeedback: 'Unaddressed tension compounds silently over months.',
      },
      {
        text: 'When they’re cold like this, it’s proof I’m becoming impossible to live with.',
        type: 'RATIONALIZATION',
        score: 20,
        explanation: 'Self-blame narrative reinforced each cycle.',
        clinicalFeedback: 'Repeated self-indictment erodes self-worth the marriage needs.',
      }
    ),
    isSolved: false,
  },
  {
    id: 'thg_rel_9',
    thought:
      'Our anniversary plans got cancelled last-minute. Relationships that hit obstacles were never meant to survive anyway.',
    contextDomain: 'PARTNERSHIP_INTIMACY',
    correctDistortion: 'ALL_OR_NOTHING',
    explanation:
      'Interpreting logistical friction as existential verdict.',
    techniqueOptions: ['CBT_REALITY_CHECK', 'ACT_DEFUSION'],
    suggestedReframe:
      'Obstacles are logistics testing flexibility, not compatibility verdicts. Resilient couples are the ones who reschedule, not the ones who never cancel.',
    reframeOptions: choices(
      'ref_r9',
      {
        text: 'Cancellation is friction, not prophecy. Strong relationships aren’t obstacle-free — they’re obstacle-repairing. New date goes on the calendar tonight.',
        type: 'OPTIMAL',
        score: 95,
        explanation: 'Reframes resilience as the actual success metric.',
        clinicalFeedback: 'Healthy. Repair capacity predicts longevity better than smoothness.',
      },
      {
        text: 'No worries at all! Anniversaries are commercial inventions anyway — who needs them!',
        type: 'TOXIC_POSITIVITY',
        score: 38,
        explanation: 'Devalues a meaningful ritual to dodge disappointment.',
        clinicalFeedback: 'Your disappointment was legitimate and worth expressing gently.',
      },
      {
        text: 'If we can’t even manage one dinner, imagine how we’ll handle real crises. This is the beginning of the end.',
        type: 'RATIONALIZATION',
        score: 21,
        explanation: 'Catastrophic extrapolation from trivia.',
        clinicalFeedback: 'Dinner logistics predict dinner logistics — nothing more.',
      }
    ),
    isSolved: false,
  },

  /* --------------------------- SELF-RESTORATION ---------------------------- */

  {
    id: 'thg_rest_7',
    thought:
      'I sat down for twenty minutes and hated myself the entire time. Rest is something other people have earned.',
    contextDomain: 'SELF_RESTORATION',
    correctDistortion: 'SHOULD_STATEMENTS',
    explanation:
      'Inflexible internal rule linking rest to earned merit, punishing basic biology.',
    techniqueOptions: ['REBT_DISPUTE', 'CFT_COMPASSION'],
    suggestedReframe:
      'Rest isn’t a wage — it’s maintenance. Where did I learn that rest must be purchased with exhaustion? That rule gets rewritten today.',
    reframeOptions: choices(
      'ref_rest7',
      {
        text: 'The demand that rest be “earned” is an inherited rule, not a law of nature. Bodies require maintenance regardless of productivity output. The rule is negotiable; my humanity isn’t.',
        type: 'OPTIMAL',
        score: 98,
        explanation: 'REBT demand-disputation with CFT grounding.',
        clinicalFeedback: 'Masterful. You just audited and overturned the deepest rest-guilt mechanism.',
      },
      {
        text: 'Relax, everyone feels guilty sometimes — it’s totally normal and fine to feel awful while resting!',
        type: 'TOXIC_POSITIVITY',
        score: 39,
        explanation: 'Normalizes the suffering instead of disputing its premise.',
        clinicalFeedback: '“Common” does not mean “correct.” The rule itself deserves challenge.',
      },
      {
        text: 'Honestly I probably haven’t earned rest. Better to keep moving until collapse makes the decision for me.',
        type: 'RATIONALIZATION',
        score: 17,
        explanation: 'Endorses the punitive rule and outsources limits to burnout.',
        clinicalFeedback: 'Collapse-based scheduling is how bodies eventually veto minds.',
      }
    ),
    isSolved: false,
  },
  {
    id: 'thg_rest_8',
    thought:
      'I need eight hours of sleep but I also need three hours of personal time, which is mathematically impossible. I am structurally doomed.',
    contextDomain: 'SELF_RESTORATION',
    correctDistortion: 'ALL_OR_NOTHING',
    explanation:
      'Framing competing needs as an unsolvable equation, erasing partial solutions.',
    techniqueOptions: ['CBT_REALITY_CHECK', 'BA_MICRO_ACTION'],
    suggestedReframe:
      'Perfect balance is rare; workable trade-offs are daily. Tonight might be 7 hours sleep and 45 real minutes of mine — imperfect and still restorative.',
    reframeOptions: choices(
      'ref_rest8',
      {
        text: 'The math assumes every night must be optimal. Real life runs on good-enough nights: slightly shorter sleep sometimes, protected pockets of mine other times. Partial credit counts.',
        type: 'OPTIMAL',
        score: 94,
        explanation: 'Breaks binary frame; introduces satisficing.',
        clinicalFeedback: 'Yes — sustainable rhythms beat perfect schedules that never happen.',
      },
      {
        text: 'Sleep is for the weak! I’ll thrive on five hours and hustle culture will reward me!',
        type: 'TOXIC_POSITIVITY',
        score: 30,
        explanation: 'Glorifies self-depletion.',
        clinicalFeedback: 'Sleep deprivation taxes exactly the mood regulation you’re working on.',
      },
      {
        text: 'There genuinely is no solution. Some people are just built to lose this game, and I’m one of them.',
        type: 'RATIONALIZATION',
        score: 19,
        explanation: 'Identity-level helplessness.',
        clinicalFeedback: 'You are not a fixed variable in your own schedule.',
      }
    ),
    isSolved: false,
  },
  {
    id: 'thg_rest_9',
    thought:
      'Everyone online wakes up at 5am to journal, run, and meditate. My slower mornings mean I’m fundamentally lazy.',
    contextDomain: 'SELF_RESTORATION',
    correctDistortion: 'OVERGENERALIZATION',
    explanation:
      'Global character verdict derived from a comparison with curated routines.',
    techniqueOptions: ['ACT_DEFUSION', 'CFT_COMPASSION'],
    suggestedReframe:
      '5am routines are one template among thousands, amplified by algorithms. Laziness is a moral label; chronobiology is a fact. Mine differs — it doesn’t indict.',
    reframeOptions: choices(
      'ref_rest9',
      {
        text: 'Algorithmic highlight reels are not normative data. My body has its own chronotype; working WITH it beats performing someone else’s dawn theater. Different ≠ defective.',
        type: 'OPTIMAL',
        score: 96,
        explanation: 'Defusion from comparison content plus chronotype science.',
        clinicalFeedback: 'Sharp reframe. Chronotypes are physiology, not virtue scores.',
      },
      {
        text: 'You know what? Tomorrow I’ll do the full 5am routine AND love every second of it! Problem solved!',
        type: 'TOXIC_POSITIVITY',
        score: 37,
        explanation: 'Performs the criticized standard rather than questioning it.',
        clinicalFeedback: 'Adopting routines out of shame rarely outlasts two weeks.',
      },
      {
        text: 'Face it — disciplined people exist and I’m simply not one of them. Pass the phone.',
        type: 'RATIONALIZATION',
        score: 22,
        explanation: 'Fixed-identity resignation.',
        clinicalFeedback: 'Discipline is trainable skill, not birth caste.',
      }
    ),
    isSolved: false,
  },
];
