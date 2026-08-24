import { WisdomScroll } from '../core/types';

/**
 * Wave 4: Base-24 Depth Upgrade — Part 1 (scrolls 1–8).
 *
 * Same "bigger model" depth contract as wave 3: long-form multi-section
 * masterclass, 4-question L1 quiz, real Level-2 crucible with 3-question
 * advanced quiz, 2+ routines and 2 spaced-recall challenges.
 *
 * These records REPLACE the corresponding entries in wisdomScrollsRich.ts.
 */
export const SCROLLS_WAVE4A: WisdomScroll[] = [
  {
    id: 'scr_stoic_1',
    title: 'The View from Above',
    subtitle: 'Marcus Aurelius & Cosmic Decentering',
    authorOrTradition: 'Stoic Philosophy',
    readingMinutes: 6,
    category: 'STOICISM',
    contentMarkdown: `## The Narrowing

Acute stress physically narrows vision — not as metaphor but as measured physiology: under threat, attentional spotlight contracts, peripheral awareness drops, and the future collapses to the next five minutes. The crying child, the hostile email, the unpaid bill each expand to fill the entire experiential screen. Marcus Aurelius — a man managing plague, war, and a treacherous general while personally grieving nine children — developed an antidote he practiced daily: **the View from Above**, a structured mental zoom-out that restores true scale.

## The Exercise, as He Practiced It

Plato first sketched it; Marcus made it a discipline. Close your eyes and ascend deliberately:

1. **Above the room** — see the scene you're in from the doorway. Watch yourself as one character in it.
2. **Above the city** — your street becomes one line among thousands. The argument happening in your kitchen is invisible at this height; so is every argument in every kitchen.
3. **Above the continent** — weather systems, night falling across time zones, millions of households each convinced their crisis is singular.
4. **Above the century** — zoom forward in time as well as space. Ten years out: will this specific email, this spilled milk, this mortifying meeting survive? Most cannot be located.

The Stoics were precise about what this is NOT: not dissociation, not "nothing matters." The conclusion is calibrated — *almost nothing matters at this scale, which means almost nothing deserves the panic it's getting, and the few things that do matter (your character, your conduct) are exactly what remains visible from up here.*

## The Mechanism: Why Zooming Out Works

Modern research validates the machinery:

- **Self-distancing** (Ethan Kross's work) shows that viewing your problem from a third-person or distant vantage measurably lowers cardiovascular reactivity and rumination, and improves wise reasoning on complex dilemmas.
- **Temporal construal** research shows distant-future framing automatically shifts processing from emotional concreteness to abstract structure — the amygdala quiets as the prefrontal "gist" system takes over.
- **Awe research** (Dacher Keltner) finds experiences of vastness — cosmic imagery, high places, star fields — reliably shrink self-focus ("the small self") and increase generosity and calm.

The View from Above is a manually triggered awe response with two thousand years of field testing.

## Under Acute Load: the Compressed Version

At peak stress you cannot run a four-stage visualization. The compressed field version is three breaths and one sentence: *"Ten years. Who remembers?"* — then handle the moment at its actual size. For recurring catastrophes (the same work fear, the same parenting spiral), pre-write your zoom line during calm hours; retrieval under flood requires prior installation.`,
    keyTakeaway:
      'Zooming out — spatially and ten-years temporally — recalibrates threat to true scale: almost nothing survives the zoom, and what does is precisely what deserves your energy.',
    quiz: [
      {
        question:
          'What does acute stress do to attentional scope, per the research Marcus was working against?',
        options: [
          'It narrows the spotlight: peripheral awareness drops and the future collapses toward the immediate moment',
          'It broadens perception to gather more threat information',
          'It has no measurable effect on visual or temporal attention',
          'It only affects memory, not present-moment attention',
        ],
        correctIndex: 0,
        explanation:
          'Threat physiology contracts attention; catastrophes feel total partly because they literally occupy the whole narrowed screen.',
      },
      {
        question: 'What is the Stoic conclusion of the View from Above exercise?',
        options: [
          'Almost nothing matters at cosmic scale — freeing you to reserve full weight for character and conduct, which remain visible',
          'Nothing whatsoever matters, so all effort may be abandoned',
          'Your current crisis is the most important event in history',
          'You must permanently adopt a detached, emotionless stance',
        ],
        correctIndex: 0,
        explanation:
          'The exercise calibrates rather than erases meaning: scale reveals what genuinely carries weight.',
      },
      {
        question:
          'Which modern research streams converge to validate the mechanism?',
        options: [
          'Kross’s self-distancing, construal-level theory, and Keltner’s awe/"small self" studies',
          'Classical conditioning, operant reinforcement schedules, and systematic desensitization',
          'Attachment theory, polyvagal theory, and memory reconsolidation',
          'Mirror neurons, spindle cells, and default mode network suppression',
        ],
        correctIndex: 0,
        explanation:
          'Three literatures independently confirm: distance lowers reactivity, far framing abstracts, vastness shrinks self-focus.',
      },
      {
        question: 'What is the correct use of the compressed "field version" under acute load?',
        options: [
          'Pre-write the zoom sentence during calm hours, because flooded retrieval needs prior installation',
          'Compose a fresh cosmic visualization on the spot mid-crisis',
          'Use it only for scheduled meditation sessions, never live',
          'Repeat it continuously throughout the day as a mantra',
        ],
        correctIndex: 0,
        explanation:
          'State-dependent retrieval means tools must be installed before the storm; improvising technique mid-flood fails predictably.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_stoic_view_above',
      name: 'View from Above',
      category: 'FACT_CHECK',
      manaCost: 1,
      baseDamage: 36,
      shieldValue: 20,
      promptText:
        'Zoom out 10 years into the future. How much will this moment actually matter?',
      targetDistortionBonus: { distortion: 'CATASTROPHIZING', multiplier: 1.6 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_stoic_morning_ascend',
        scrollId: 'scr_stoic_1',
        bookTitle: 'Meditations (Marcus Aurelius)',
        title: 'Two-Minute Morning Ascent',
        description:
          'Before opening any screen: eyes closed, ascend room → city → continent → century, then descend carrying the day’s tasks at true size.',
        suggestedTime: '06:40',
        frequency: 'MORNING',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Installing the wide-angle lens before the day’s stressors installs the narrowing keeps baseline scale calibrated.',
        isScheduled: false,
      },
      {
        id: 'rtn_stoic_zoom_line',
        scrollId: 'scr_stoic_1',
        bookTitle: 'Meditations (Marcus Aurelius)',
        title: 'Personal Zoom-Line Authoring',
        description:
          'Write your own three-breath catastrophe line ("Ten years. Who remembers?") and post it where your recurring stressor strikes.',
        suggestedTime: '20:30',
        frequency: 'WEEKLY',
        energyTier: 'STEADY_40',
        reminderEnabled: false,
        clinicalRationale:
          'Self-authored lines outperform borrowed ones; placement at the trigger site ensures availability at flood time.',
        isScheduled: false,
      },
      {
        id: 'rtn_stoic_evening_scale_audit',
        scrollId: 'scr_stoic_1',
        bookTitle: 'Meditations (Marcus Aurelius)',
        title: 'Evening Scale Audit',
        description:
          'Name today’s biggest felt catastrophe. State honestly how much of it will exist in ten years. Note what remained.',
        suggestedTime: '21:15',
        frequency: 'EVENING',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Repeated calibration audits build automatic scale-restoration into the appraisal pipeline itself.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Performance Review Crucible',
      subtitle: 'When Catastrophe Wears Your Career’s Face',
      deepCaseStudy:
        'An email arrives at 16:50 Friday: "See me Monday morning regarding the parent complaints." No details. Your mind instantly builds the film: complaints → investigation → reputation gone → career over → mortgage → family ruined. By Saturday noon you’ve rehearsed the conversation forty times, snapped at your kids twice, and drafted a resignation defense no one asked for. Sunday you can’t eat. The meeting is thirty-six hours away and you have already lived through the worst version of it sixty times.',
      contentMarkdown: `### 🌪️ The Anatomy of Anticipatory Catastrophe

This is the View from Above's home turf — and also its hardest test, because nothing has actually happened yet. You are suffering repeatedly over an *imagined* event, and each rehearsal feels like preparation while functionally being practice in panic.

#### ⚠️ Why the Mind Builds the Worst Film:
Ambiguity is interpreted through current emotional state (mood-congruent processing): anxious states complete ambiguous emails catastrophically. The brain treats vivid simulation as data — mentally rehearsing disaster triggers genuine threat physiology dozens of times for an event that may occur once or never.

#### 🛡️ The Crucible Protocol:
1. **Run the ascent on the email itself**: above the inbox, the school, the decade. Notice: even the WORST plausible outcome is survivable at scale — and notice equally that you don't yet know which outcome is real.
2. **Separate simulation from preparation**: ask of each mental replay, "Is this generating an action item, or just adrenaline?" Rehearsals without outputs are panic wearing preparation's clothes. Convert real concerns to a written list (three items maximum); decline all other screenings.
3. **Prepare once, properly**: thirty minutes Monday-morning-of-the-mind — possible topics, your factual record, questions to ask. Then the file closes until 9am.
4. **The Stoic dichotomy split**: the meeting's content = partially yours (prepare); its existence, tone, and outcome = not yet yours and possibly never yours (release). Suffering lives almost entirely in the second circle.
5. **Deploy the ten-year test on the feared end-state itself**: "Reputation destroyed" — zoom out. Careers bend, recover, pivot. Colleagues' memories are short. The mortgage gets paid across decades, not Fridays.

#### 🧬 What Mastery Looks Like:
Not serenity about potential disasters — accurate pricing. The trained practitioner feels the spike, runs the zoom, and returns to their weekend while the untrained mind spends thirty-six hours living in a Monday that hasn't arrived.`,
      advancedQuiz: [
        {
          question:
            'Why does each catastrophic mental rehearsal of the Monday meeting cause REAL physiological harm?',
          options: [
            'The brain treats vivid simulation as data, triggering genuine threat responses — dozens of panic cycles for an event that may never occur',
            'Imagination directly damages the adrenal glands over time',
            'It doesn’t — rehearsal is purely protective and cost-free',
            'Only the actual event produces stress hormones',
          ],
          correctIndex: 0,
          explanation:
            'Simulation is metabolically real: anticipatory rehearsals collect full stress payments on events still hypothetical.',
          clinicalDistinction:
            'The distinction separating preparation from rumination is output: real prep yields action items; rumination yields only adrenaline.',
          },
        {
          question:
            'What does the protocol mean by converting concerns to "a written list, three items maximum"?',
          options: [
            'Externalize only actionable worries onto paper, cap the list to force discrimination between concern and noise, then close the file',
            'Write down everything feared so nothing is forgotten overnight',
            'List three reasons the meeting will go well for reassurance',
            'Keep a running tally of all possible complaint sources',
          ],
          correctIndex: 0,
          explanation:
            'Writing externalizes the loop; the cap forces prioritization; closing the file prevents the list from becoming a fresh rumination object.',
          clinicalDistinction:
            'The list serves preparation once — rereading it recreates the loop it was built to close.',
        },
        {
          question:
            'How does the ten-year test apply differently to the FEARED END-STATE ("career destroyed") than to the triggering email?',
          options: [
            'Applied to the end-state, the zoom reveals even worst-case outcomes bend, recover and blur at decade scale — shrinking the catastrophe’s claimed permanence',
            'It applies identically to both — the timeframe is irrelevant',
            'It shouldn’t be applied to outcomes, only to the email text',
            'It proves the feared outcome is impossible',
          ],
          correctIndex: 0,
          explanation:
            'Catastrophes claim PERMANENCE as part of their terror; the temporal zoom specifically dismantles the permanence illusion.',
          clinicalDistinction:
            'Spatial zoom shrinks size; temporal zoom shrinks duration. Full calibration needs both axes.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_view_above_crest',
        name: 'The Astronomer’s Crest',
        description:
          'Earned above the clouds. Grants +25 Mind Shield against anticipatory catastrophe.',
        statBoost: 'MIND_SHIELD',
        boostAmount: 25,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_stoic1_1',
        scrollId: 'scr_stoic_1',
        bookTitle: 'Meditations',
        author: 'Marcus Aurelius',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying The View from Above.',
        question:
          'Your spouse sends "we need to talk tonight." Heart pounding. What is the trained sequence?',
        options: [
          'Ascent (room→city→decade) on the message itself → separate simulation from preparation → prepare once → release what isn’t yours yet',
          'Text back demanding immediate details to resolve ambiguity now',
          'Spend the afternoon mentally rehearsing every possible topic',
          'Cancel the talk — ambiguity is safer than confirmation',
        ],
        correctIndex: 0,
        explanation:
          'The zoom deflates the imagined catastrophe; output-testing separates useful prep from adrenaline theater.',
        clinicalInsight:
          '"We need to talk" is the classic ambiguity trigger — mood-congruent completion turns four words into forty films.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_stoic1_2',
        scrollId: 'scr_stoic_1',
        bookTitle: 'Meditations',
        author: 'Marcus Aurelius',
        scenarioPrompt: '⚡ Day-14 Spaced Review: The Two Axes.',
        question:
          'The View from Above operates along TWO axes. Which pair completes full calibration?',
        options: [
          'Spatial (room→cosmos) AND temporal (now→ten years)',
          'Visual and auditory perspective-taking',
          'Internal and external locus attribution',
          'Micro (breath) and macro (life review)',
        ],
        correctIndex: 0,
        explanation:
          'Spatial zoom shrinks apparent SIZE; temporal zoom shrinks apparent DURATION. Catastrophes exaggerate both.',
        clinicalInsight:
          'Most people run only the spatial axis; the ten-year question is often the more powerful half.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_neuro_2',
    title: 'The Amygdala Hijack & Vagal Brake',
    subtitle: 'Polyvagal Somatics & The Physiological Reset',
    authorOrTradition: 'Clinical Neuroscience',
    readingMinutes: 6,
    category: 'NEUROSCIENCE',
    contentMarkdown: `## Twelve Milliseconds Ahead of You

Before conscious perception completes, your amygdala has already scanned and triaged: thalamus → amygdala runs in roughly 12 milliseconds, while the cortical route (thalamus → cortex → amygdala) takes several times longer. Evolution bet your survival on fast-and-crude over slow-and-accurate — which is why a shadow, a slammed door, or a shouted "HEY!" can launch your body before "what was that?" finishes forming.

When the alarm sounds, the hypothalamic-pituitary-adrenal axis cascades: adrenaline within seconds, cortisol following within minutes. Heart rate and blood pressure climb, breathing goes shallow and rapid, muscles arm, digestion and salivation shut down — and crucially, **prefrontal function is throttled**: working memory shrinks, cognitive flexibility drops, and risk assessment skews reactive. Goleman named this the *amygdala hijack*: intelligence briefly serving panic instead of judgment.

## Why You Cannot Logic Your Way Out

Here is the clinical fact that reorganizes everything: the prefrontal cortex — the reasoning machinery you'd use to argue yourself calm — is precisely what the hijack degrades. Trying to think clearly while flooded is like demanding sharp typing from someone whose hands are being electrocuted. The nervous system speaks a somatic language first; reason is downstream.

## The Physiological Sigh: the Fastest Known Reset

Research from Huberman's lab (Spiegel & colleagues, Stanford, 2023, *Cell Reports Medicine*) identified the quickest voluntary downregulation available: the **physiological sigh** — 

1. Inhale through the nose.
2. **Second short inhale stacked on top** (topping off the lungs).
3. One long, slow, *unforced* exhale through the mouth, longer than both inhales combined.

One repetition begins the shift; two-to-five at roughly thirty seconds apart produce reliable drops in heart rate and subjective distress. The mechanism is elegant: those stacked inhales reinflate collapsed alveoli, and the long exhale activates parasympathetic outflow via the vagus nerve while offloading CO₂ more efficiently than normal breathing. This is also why dogs and infants do it spontaneously before settling — mammals ship with the reset button pre-installed; adults mostly forget to press it.

## The Vagal Brake: Training, Not Just Emergency Use

Polyvagal theory (Porges) describes vagal "braking" — the ventral vagal system actively slowing the heart, like downshifting an engine. Brake tone is trainable:

- **Exhale-biased breathing** generally (exhales longer than inhales) stimulates vagal outflow on every cycle.
- **Humming, chanting, singing** — vocalization mechanically exercises the vagal pathways through the larynx and pharynx.
- **Cold water on the face** triggers the mammalian dive reflex, dropping heart rate within seconds.
- **Regular aerobic exercise and sleep** raise baseline vagal tone — measurable as heart-rate variability, the single best window into your regulation capacity.

The strategic picture: sighs are the airbag; vagal tone is the suspension. Install both.`,
    keyTakeaway:
      'You cannot reason your way out of a hijack — regulate somatically first: physiological sighs for the acute reset, exhale-biased breathing and daily habits to build the vagal brake that prevents the next one.',
    quiz: [
      {
        question:
          'Why does the amygdala respond before conscious awareness completes?',
        options: [
          'The direct thalamus→amygdala route runs in ~12ms, several times faster than the cortical route — speed was evolutionarily traded for accuracy',
          'The amygdala is physically closer to the ears',
          'Consciousness suppresses threat detection by default',
          'The cortex deliberately delays to conserve glucose',
        ],
        correctIndex: 0,
        explanation:
          'Fast-and-crude beats slow-and-accurate when the slow option might be your last; the price is occasional false alarms.',
      },
      {
        question:
          'Why is "thinking your way calm" structurally doomed mid-hijack?',
        options: [
          'The hijack throttles exactly the prefrontal resources that reasoning requires — logic is downstream of regulation',
          'Thoughts cannot influence emotions under any circumstances',
          'Reasoning raises cortisol levels further',
          'The amygdala blocks auditory processing entirely',
        ],
        correctIndex: 0,
        explanation:
          'Working memory and flexibility degrade during arousal; demanding logic from a flooded brain misreads the machine.',
      },
      {
        question: 'What makes the physiological sigh’s structure effective?',
        options: [
          'Stacked double inhale reinflates alveoli, and the long unforced exhale drives vagal parasympathetic activation plus superior CO₂ offload',
          'The mouth-exhale cools the vagus nerve directly',
          'Holding breath raises CO₂ which calms the amygdala',
          'It works primarily through distraction and placebo',
        ],
        correctIndex: 0,
        explanation:
          'Each element maps to a mechanism: alveolar recruitment, vagal outflow via extended exhalation, gas-exchange efficiency.',
      },
      {
        question:
          'In the strategic picture, how do sighs and vagal-tone training differ in role?',
        options: [
          'Sighs are the acute airbag; daily exhale-biased breathing, humming, cold exposure, exercise and sleep build the baseline brake',
          'They are interchangeable techniques with identical effects',
          'Sighs build long-term tone while training handles emergencies',
          'Vagal training replaces the need for acute interventions',
        ],
        correctIndex: 0,
        explanation:
          'Emergency tools and capacity-building operate on different timescales; mastery installs both layers.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_vagal_brake',
      name: 'Vagal Brake',
      category: 'COMPASSION',
      manaCost: 1,
      baseDamage: 22,
      shieldValue: 35,
      promptText:
        'Double inhale through the nose, long slow exhale. My body is safe right now.',
      targetDistortionBonus: { distortion: 'EMOTIONAL_REASONING', multiplier: 1.7 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_neuro_sigh_drill',
        scrollId: 'scr_neuro_2',
        bookTitle: 'Cell Reports Medicine (2023)',
        title: 'Five-Sigh Daily Drill',
        description:
          'Practice 5 physiological sighs (~30s apart), twice daily in calm states — installing the pattern before it’s needed live.',
        suggestedTime: '08:00',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Techniques rehearsed in calm remain retrievable under sympathetic load; unpracticed tools fail at flood time.',
        isScheduled: false,
      },
      {
        id: 'rtn_neuro_exhale_bias',
        scrollId: 'scr_neuro_2',
        bookTitle: 'Polyvagal Theory',
        title: 'Exhale-Biased Commute Breathing',
        description:
          'During one daily transit, breathe with exhales ~1.5× longer than inhales for five minutes.',
        suggestedTime: '17:15',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Extended exhalation repetitively exercises ventral vagal braking, raising baseline tone over weeks.',
        isScheduled: false,
      },
      {
        id: 'rtn_neuro_humming',
        scrollId: 'scr_neuro_2',
        bookTitle: 'Polyvagal Theory',
        title: 'Two-Minute Evening Hum',
        description:
          'Hum or sing low and steady for two minutes before the household wind-down — mechanical vagal exercise.',
        suggestedTime: '19:45',
        frequency: 'EVENING',
        energyTier: 'LOW_10',
        reminderEnabled: false,
        clinicalRationale:
          'Vocalization vibrates vagal pathways through larynx/pharynx; doubles as co-regulation modeling for children present.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Dinner Table Hijack Crucible',
      subtitle: 'Regulating While Being Blamed — Mid-Conversation',
      deepCaseStudy:
        'Dinner. Your teenager, mid-argument about screens, says with surgical precision: "No wonder Dad left you — you’re impossible to live with." (Your own father walked out twenty years ago.) Heat detonates up your chest. Vision tunnels. Your hands are shaking and something in you wants to either leave the table forever or say the unforgivable thing back. Everyone else’s fork has stopped moving. You have perhaps four seconds before your mouth acts without you.',
      contentMarkdown: `### 🌪️ The Double Trigger Architecture

This hijack is compounded: present insult (public attack) riding on old wound (abandonment). The amygdala doesn't timestamp — the old injury lights up as if current, flooding you with twenty-year-old chemistry while your teenager watches, unaware they just pulled a pin inserted two decades ago.

#### ⚠️ Why This Moment Decides More Than It Seems:
Whatever exits your mouth in the next ten seconds becomes either (a) evidence for their thesis, (b) a wound they'll carry into their own adulthood, or (c) the single most educational demonstration of adult regulation they've ever witnessed live. There is no neutral option.

#### 🛡️ The In-Seat Protocol (no exit required):
1. **The covert sigh**: physiological sighs work invisibly through the nose — two stacked nasal inhales, slow mouth-corner exhale behind closed lips. Nobody at the table sees anything except you looking down at your plate.
2. **Anchor contact**: both feet flat, palms flat on thighs. Bilateral grounding competes with the tunnel-vision signal.
3. **The delay formula**: buy regulation time with minimal words — "Say that again, slower. I want to actually hear it." (Slower repetition halves its charge and buys you thirty more seconds.)
4. **Answer the present, not the past**: the wound belongs to your father; the child at the table is your son. Respond ONLY to the current claim: "That was said to hurt. I'm going to assume there's something underneath it. What's actually going on with you?"
5. **Post-scenario decompression**: after dinner, alone — five full sighs, then brief journaling: what fired, what old material got loaded, what worked. Every processed hijack lowers the ignition threshold for the next.

#### 🧬 The Generational Payoff:
Your father modeled exit-or-explosion. You just modeled neither. Someday, when this child's own partner says something unforgivable, a different script will surface — one written at this dinner table.`,
      advancedQuiz: [
        {
          question:
            'Why does the old abandonment wound intensify the present hijack so severely?',
          options: [
            'The amygdala does not timestamp — old injuries fire as if current, layering decades-old chemistry onto the present insult',
            'Teenagers possess uniquely provocative pheromones',
            'The father left because of similar dinner conversations',
            'Memory consolidation strengthens wounds nightly regardless of triggers',
          ],
          correctIndex: 0,
          explanation:
            'Trigger equivalence is the core mechanism of ghost-driven reactions: the nervous system files by pattern, not by date.',
          clinicalDistinction:
            'The response must address the PRESENT person; answering the ghost answers nobody in the room.',
        },
        {
          question:
            'What makes "say that again, slower" a regulation move rather than a confrontation?',
          options: [
            'It buys 30 seconds of regulatory time, halves the statement’s charge through repetition, and signals composure instead of counter-attack readiness',
            'It confuses teenagers into backing down from arguments',
            'It demonstrates superior hearing capability',
            'It is simply a stalling tactic with no other function',
          ],
          correctIndex: 0,
          explanation:
            'Delay-with-dignity converts dead seconds into recovered prefrontal capacity while projecting steadiness rather than escalation.',
          clinicalDistinction:
            'The line works because it requests engagement, not surrender — face is preserved on both sides of the table.',
        },
        {
          question:
            'Why must the final response address the son rather than the father-wound?',
          options: [
            'The wound belongs to a man who isn’t present; answering it abandons the actual child standing there with a live need underneath the provocation',
            'Because discussing divorce at dinner violates table manners',
            'Because the father-wound is too painful to speak about',
            'Because teenagers cannot understand adult emotional history',
          ],
          correctIndex: 0,
          explanation:
            'Ghost-awareness exists precisely to keep the past from stealing the present relationship — the protocol routes response to the person in front of you.',
          clinicalDistinction:
            '"Assume something underneath" reframes attack as signal — usually accurate with adolescents.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_sigh_anchor_medallion',
        name: 'The Covert Sigh Medallion',
        description:
          'For regulation performed in plain sight. Grants +30 Mind Shield.',
        statBoost: 'MIND_SHIELD',
        boostAmount: 30,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_neuro2_1',
        scrollId: 'scr_neuro_2',
        bookTitle: 'Cell Reports Medicine (2023)',
        author: 'Stanford Lab Research',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying The Amygdala Hijack.',
        question:
          'Give the exact structure of the physiological sigh and why each element matters.',
        options: [
          'Nasal inhale + stacked second inhale + long unforced mouth exhale — alveolar reinflation, then vagally-mediated parasympathetic drop',
          'Deep chest inhale held 10 seconds, released sharply through pursed lips',
          'Rapid panting followed by complete breath-hold to reset CO₂',
          'Slow box breathing with equal inhale, hold, exhale, hold counts',
        ],
        correctIndex: 0,
        explanation:
          'The stacked inhales recruit collapsed alveoli; the extended exhale is what engages the parasympathetic shift.',
        clinicalInsight:
          'Unforced is specified deliberately — straining activates exactly the sympathetic system being downregulated.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_neuro2_2',
        scrollId: 'scr_neuro_2',
        bookTitle: 'Polyvagal Theory',
        author: 'Stephen Porges',
        scenarioPrompt: '⚡ Day-7 Spaced Review: Baseline vs. Emergency.',
        question:
          'Which set correctly divides EMERGENCY resets from BASELINE tone-builders?',
        options: [
          'Emergency: sighs, face-cold-water dive reflex. Baseline builders: exhale-biased breathing, humming/singing, aerobic exercise, sleep',
          'Emergency: medication, therapy. Baseline: breathing exercises only',
          'Both lists contain the same items used at different frequencies',
          'Baseline tone is genetic and cannot be influenced by behavior',
        ],
        correctIndex: 0,
        explanation:
          'Airbag versus suspension: acute interventions stop the current spike; daily practices raise the threshold for the next one.',
        clinicalInsight:
          'HRV (heart-rate variability) is the measurable report card for your baseline vagal tone.',
        nextReviewDueDays: 7,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_rebt_3',
    title: 'Dismantling the "Should" Monster',
    subtitle: 'Albert Ellis & Rational Emotive Behavior Therapy',
    authorOrTradition: 'Albert Ellis — REBT',
    readingMinutes: 6,
    category: 'CBT_REBT',
    contentMarkdown: `## The Tyranny Hidden in Grammar

Ellis noticed that his patients' suffering rarely came from events themselves but from a hidden grammatical structure embedded in their self-talk: **should, must, ought, have to.** "I should handle this better." "My kids must respect me." "I shouldn't feel this way after all these years." He called them *musturbations* — demands disguised as observations about reality — and identified them as the engine of neurosis.

The REBT core model (ABC) makes the mechanism explicit:

- **A** — Activating event: your child screams "I hate you."
- **B** — Belief: "Children MUST respect their parents. If mine doesn't, I've failed as a father — and failure is unbearable."
- **C** — Consequence: rage, shame, three days of rumination.

Nearly everyone blames A. Ellis spent fifty years demonstrating that B is where the damage is manufactured — and unlike A, B is editable.

## The Three Core Demands

Ellis reduced the monster to three master demands, each spawning entire families of misery:

1. **"I MUST succeed and win approval — or I'm worthless."** → anxiety, depression, avoidance, perfectionism-paralysis.
2. **"Others MUST treat me considerately — or they're terrible and deserve punishment."** → rage, resentment, chronic conflict.
3. **"Life MUST be easy, fair, comfortable — or it's unbearable and I can't stand it."** → low frustration tolerance, escapism, addiction loops.

Scan your last bad week: nearly every spike traces to one of these three, wearing different costumes.

## Disputing: the Legal Cross-Examination

REBT's intervention is **disputation (D)** — treating the demand like a witness whose testimony doesn't hold up:

- **Empirical dispute**: "Where's the evidence children must always respect parents? Show me the universe's rulebook." (There is none — there are preferences, statistically violated constantly.)
- **Logical dispute**: "IF my child disrespects me, HOW does that logically prove I'm a failure? Walk me through the deduction." (It doesn't follow; non sequitur exposed.)
- **Pragmatic dispute**: "Where does holding this MUST get me? Does raging at my child restore respect — or manufacture the very failure I demanded couldn't happen?" (The demand is empirically self-defeating.)

Then the replacement: swap the demand for a **strong preference** — "I strongly WANT respect, and it's unfortunate when it's absent — not unbearable, not proof of worthlessness. Just badly inconvenient."

## Preference Language Is Not Lower Standards

The predictable objection: "If I stop demanding, won't I become complacent?" Ellis's answer was empirical: humans work harder pursuing what they strongly want than what they demand must happen — demand adds despair when reality disagrees, zero additional fuel. Preferences preserve full motivation while removing the collapse when blocked. Test it on your own history: did the shoulds ever improve your performance, or just the pain?

## The Monster's Favorite Disguise

Advanced practitioners catch shoulds hiding inside feelings: "I SHOULDN'T be anxious" (demand #3 applied to your own autonomic nervous system). This meta-should is uniquely corrosive — you end up anxious about anxiety. The fix runs the same dispute at the second level: "It would be preferable to be calm; being anxious is human, unpleasant, and fully survivable."`,
    keyTakeaway:
      'Suffering is manufactured by hidden demands (must/should/ought), not by events — dispute the demand empirically, logically and pragmatically, then downgrade it to a strong preference that keeps all motivation and none of the collapse.',
    quiz: [
      {
        question: 'In the ABC model, where does Ellis locate the manufacture of suffering?',
        options: [
          'At B — the belief structure, especially hidden demands — not at A, the activating event',
          'At C — the emotional consequences themselves',
          'Equally distributed across A, B and C',
          'Primarily at A — difficult events determine outcomes',
        ],
        correctIndex: 0,
        explanation:
          'Same activating events produce wildly different consequences across individuals; the differential variable is the belief.',
      },
      {
        question: 'What are Ellis’s three core MUST-demands?',
        options: [
          'I must succeed/be approved; others must treat me well; life must be easy and fair',
          'I must be happy; others must change; the past must be undone',
          'Children must obey; spouses must appreciate; bosses must recognize',
          'I must never fail; I must never be rejected; I must never suffer',
        ],
        correctIndex: 0,
        explanation:
          'The three master demands target self-worth, others’ behavior, and life conditions — everything else is costume.',
      },
      {
        question: 'What distinguishes the three dispute types (empirical, logical, pragmatic)?',
        options: [
          'Evidence-for-the-rule, whether the conclusion follows, and whether holding the belief works',
          'Past-focused, present-focused, and future-focused questioning styles',
          'Gentle, moderate, and aggressive confrontation intensities',
          'They are synonyms for the same disputation technique',
        ],
        correctIndex: 0,
        explanation:
          'Three independent attack vectors: the rule lacks evidence, the inference lacks logic, and the strategy lacks results.',
      },
      {
        question:
          'Why does preference-language NOT reduce motivation, per Ellis’s rebuttal?',
        options: [
          'Strong wants drive effort fully; demands add only despair-when-blocked, zero extra fuel — making demands strictly worse',
          'Preferences secretly contain demands anyway',
          'Motivation is unrelated to language patterns',
          'People only act when facing absolute requirements',
        ],
        correctIndex: 0,
        explanation:
          'Demand ≠ fuel; demand = fragility. The empirical claim: want-based pursuit outperforms must-based pursuit precisely because failure informs instead of collapsing.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_should_monster_slayer',
      name: 'Should-Monster Slayer',
      category: 'REFRAME',
      manaCost: 2,
      baseDamage: 38,
      shieldValue: 26,
      promptText:
        'Find the MUST. Where’s the evidence? Does it follow? Is it working? Now: strong preference, zero collapse.',
      targetDistortionBonus: { distortion: 'SHOULD_STATEMENTS', multiplier: 2.0 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_rebt_demand_log',
        scrollId: 'scr_rebt_3',
        bookTitle: 'A Guide to Rational Living',
        title: 'Evening Must-Hunt',
        description:
          'Review today’s worst emotional spike; write the exact should/must sentence beneath it and rate which of the 3 demands it was.',
        suggestedTime: '21:00',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Demands hide below feeling-level awareness; nightly capture trains detection speed until disputes run in realtime.',
        isScheduled: false,
      },
      {
        id: 'rtn_rebt_preference_rewrite',
        scrollId: 'scr_rebt_3',
        bookTitle: 'A Guide to Rational Living',
        title: 'Weekly Preference Rewrite',
        description:
          'Take the week’s top recurring demand and write its full dispute (evidence? logic? pragmatism?) plus the strong-preference replacement.',
        suggestedTime: '16:00',
        frequency: 'WEEKLY',
        energyTier: 'STEADY_40',
        reminderEnabled: false,
        clinicalRationale:
          'Written disputes consolidate faster than mental ones; recurring demands deserve repeated formal cross-examination.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Anxious-about-Anxiety Spiral Crucible',
      subtitle: 'When the Monster Eats Its Own Tail',
      deepCaseStudy:
        'Big presentation Thursday. Since Sunday you’ve been trapped in a loop with no floor: "I’m anxious about presenting" → "but I SHOULDN’T be anxious, I’m experienced" → anxiety about the anxiety → "see, now I’m worse, I REALLY shouldn’t be like this" → sleep suffers → fatigue worsens the presentation odds → more evidence that you "shouldn’t" be this way. Wednesday night, heart hammering at 2am, you realize the original presentation anxiety was mild — the monster has been feeding on ITSELF for four days.',
      contentMarkdown: `### 🌪️ Secondary Disturbance: Disturbance About Disturbance

Ellis's crucial discovery: humans don't merely disturb themselves about events — they disturb themselves about their disturbances. First-order anxiety ("present might go badly") is ordinary and manageable. Second-order disturbance ("I SHOULDN'T be anxious") is where spirals live. Tertiary orders follow recursively. The monster's favorite meal is itself.

#### ⚠️ Why Meta-Demands Are Uniquely Corrosive:
Demanding calm FROM YOUR OWN AUTONOMIC NERVOUS SYSTEM creates a control paradox: monitoring for anxiety is itself arousing, so vigilance manufactures the very evidence of failure it fears. Each check finds anxiety (because checking is arousing), which "confirms" the violation of the must, which escalates monitoring. A perfect closed loop.

#### 🛡️ The Unspooling Protocol:
1. **Name the order**: write the chain explicitly — "anxiety (order 1) → fury at myself for anxiety (order 2)". Merely labeling levels collapses some of recursion; the loop loses its camouflage.
2. **Dispute the META-demand first, not the original anxiety**: "Where is it written that an experienced human must never feel performance arousal?" Empirical answer: nowhere — arousal before evaluation is near-universal biology, including among elite performers who reinterpret it as readiness.
3. **Grant permission explicitly**: reverse the grammar — "It is entirely acceptable that I feel anxious. Anxiety is unpleasant, not dangerous, and legally allowed." Paradoxically, permitting the feeling removes the fuel; forbidden feelings burn forever.
4. **Relabel the physiology**: same arousal data, new frame — "this is my body mobilizing resources," which is literally true. Reappraisal research shows arousal relabeled as readiness improves performance where suppression degrades it.
5. **Return focus to the task level**: anxiety feeds on self-monitoring; attention to CONTENT (first slide, opening sentence) starves it. You cannot simultaneously monitor yourself and immerse in material.

#### 🧬 The General Principle:
Every spiral you ever enter follows this template: feeling → demand-that-feeling-not-exist → amplified feeling. Learn the unspooling ONCE and you hold a universal key — the specific content (anxiety, anger, sadness, craving) is almost incidental.`,
      advancedQuiz: [
        {
          question:
            'What is "secondary disturbance" and why does it matter more than the original feeling?',
          options: [
            'Disturbance ABOUT your disturbance — the recursive layer where ordinary feelings become spirals through meta-demands',
            'The delayed emotional reaction arriving hours after events',
            'A psychiatric term for comorbid anxiety and depression',
            'The second person infected by one person’s bad mood',
          ],
          correctIndex: 0,
          explanation:
            'First-order feelings are finite and passable; second-order demands ("I shouldn’t feel this") convert passing weather into climate.',
          clinicalDistinction:
            'Intervene at the highest active order — disputing order-1 content while an order-2 demand runs wastes the session.',
        },
        {
          question:
            'Why does monitoring for anxiety tend to MANUFACTURE the anxiety it watches for?',
          options: [
            'Vigilance is itself arousing — each check produces mild arousal that reads as "still anxious," confirming the feared violation in a closed loop',
            'Monitoring distracts from productive rehearsal activities',
            'The eyes’ focusing strain mimics panic symptoms',
            'It doesn’t — monitoring objectively reduces symptoms',
          ],
          correctIndex: 0,
          explanation:
            'The control paradox: surveillance of an internal state perturbs that state, guaranteeing "positive" detections.',
          clinicalDistinction:
            'This is why reassurance-seeking and symptom-checking amplify rather than settle health and performance anxiety.',
        },
        {
          question:
            'What is the mechanism behind "granting permission" reducing the feeling’s grip?',
          options: [
            'Forbidden feelings require continuous suppression (itself arousing); permission ends the second battle, leaving only the original manageable sensation',
            'Permission signals the brain that danger has passed via verbal magic',
            'It is placebo with effects limited to suggestible personalities',
            'Permission causes the feeling to transfer to someone else nearby',
          ],
          correctIndex: 0,
          explanation:
            'Two battles (feeling + anti-feeling campaign) reduce to one; the residual single feeling, unopposed, follows its natural decay curve.',
          clinicalDistinction:
            'Acceptance and resignation differ: acceptance permits the feeling while retaining full behavioral choice.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_unspool_key',
        name: 'The Unspooling Key',
        description:
          'Opens every recursive lock. Grants +25 Logic Edge against secondary disturbance.',
        statBoost: 'LOGIC_EDGE',
        boostAmount: 25,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_rebt3_1',
        scrollId: 'scr_rebt_3',
        bookTitle: 'A Guide to Rational Living',
        author: 'Albert Ellis',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying the Should Monster.',
        question:
          'Your colleague gets the project lead role you wanted. The rage arrives with "they ALWAYS overlook me — everyone MUST recognize seniority." Run the dispute:',
        options: [
          'Evidence for the rule? Does the conclusion follow? Has holding this demand worked? Then rewrite as strong preference',
          'Confront the manager immediately about fairness violations',
          'Suppress the anger and volunteer for extra work to compensate',
          'Update your CV and start applying elsewhere tonight',
        ],
        correctIndex: 0,
        explanation:
          'Three-vector dispute first; action decisions made afterward come from preference-clarity rather than demand-rage.',
        clinicalInsight:
          'ALWAYS/MUST/EVERYONE in a single sentence is a triple-demand signature — flag it on sight.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_rebt3_2',
        scrollId: 'scr_rebt_3',
        bookTitle: 'A Guide to Rational Living',
        author: 'Albert Ellis',
        scenarioPrompt: '⚡ Day-14 Spaced Review: The Recursive Layer.',
        question:
          '"I shouldn’t be grieving this long" is best classified as:',
        options: [
          'A secondary (meta-) demand — a should applied to your own emotional process, the signature driver of spirals',
          'A healthy motivational statement supporting recovery',
          'An empirical observation about grief timelines',
          'A primary disturbance requiring standard ABC analysis only',
        ],
        correctIndex: 0,
        explanation:
          'Demands aimed AT feelings (rather than external events) create the recursive loops where ordinary sadness becomes depression-spiral.',
        clinicalInsight:
          'Check the target of every should: aimed outward = ordinary friction; aimed inward at your own feeling-state = spiral fuel.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_ba_4',
    title: 'The Momentum Paradox',
    subtitle: 'Action Precedes Motivation in Burnout & Depression',
    authorOrTradition: 'Behavioral Activation Therapy',
    readingMinutes: 6,
    category: 'BEHAVIORAL_ACTIVATION',
    contentMarkdown: `## The Waiting Trap

Depression and burnout run a con so consistent it deserves documentation: *"I can't do anything meaningful right now — look at my energy, my mood. When I'm better, THEN I'll restart the gym / the projects / the friends."* So you wait for motivation like weather. Meanwhile withdrawal continues: fewer activities, less accomplishment, weaker connection — each removal deepening the state that justified it. The trap closes: **low mood reduces activity, and reduced activity manufactures more low mood.**

Behavioral Activation (BA) — validated as a standalone treatment in multiple RCTs, including a large trial outperforming cognitive therapy for depression — attacks the causal arrow instead of waiting for it to reverse:

> **Action precedes motivation. Not the other way around.**

Neurochemically this is mundane mechanics: accomplishment, movement, and social contact each nudge dopamine, endorphins, and reward-circuit activity upward. The depressed brain is not refusing to reward you out of malice — it is starving because you stopped feeding it inputs. Mood is largely an *output* of what you do, not a prerequisite for doing.

## The BA Method, Operationally

### 1. Activity Monitoring (one week)
Log what you actually do hour-by-hour, rating each block for **pleasure** and **mastery** (sense of accomplishment) 0–10. Depressed patients routinely discover two things: their days contain near-zero scheduled pleasure OR mastery, and unstructured time correlates with the worst mood dips.

### 2. Values Mapping
BA's sophistication: not all activity lifts equally. Activities must connect to YOUR values (family, craft, health, contribution). Generic advice ("take a bath") fails where personal values mapping ("fix the bike with my son — craftsmanship + connection") succeeds.

### 3. Graded Task Assignment
Schedule value-connected actions starting absurdly small — the BA unit of progress is *completed*, not impressive:

- Week 1: walk to the corner and back. Reply to ONE email. Ten minutes of guitar.
- Week 2: around the block. Three emails. Twenty minutes.

The grading is clinical, not motivational: success-sized tasks rebuild efficacy evidence; oversized tasks rebuild failure archives.

### 4. Mood-before/after Rating
Rate mood 0–10 before and after each completed task. The discovery — task by task — is the treatment: **post-task ratings beat predictions, repeatedly**, building experiential evidence against depression's central lie ("nothing helps").

## The Exhausted-Parent Adaptation

Burnout differs from depression mainly in cause: depletion from chronic demand. BA translates cleanly: schedule **recovery activities** with the same seriousness as obligations. The paradox parents resist hardest: rest that is *scheduled* restores; rest that is *residual* (whatever's left at 22:40) never arrives. Put your own oxygen mask on the calendar first — not because self-care is a treat, but because everyone downstream of you receives whatever regulation you failed to refill.`,
    keyTakeaway:
      'Motivation follows action, never precedes it — monitor pleasure/mastery, map activities to values, grade tasks down to guaranteed-completable size, and let post-task mood ratings accumulate proof that nothing-helps is a lie.',
    quiz: [
      {
        question: 'What is the central reversal BA proposes against common intuition?',
        options: [
          'Action precedes motivation — behavior generates the chemistry that mood then reflects',
          'Motivation must be strengthened before attempting any action',
          'Action and motivation rise simultaneously without ordering',
          'Restoring motivation chemically enables natural action',
        ],
        correctIndex: 0,
        explanation:
          'Waiting-for-motivation maintains the withdrawal loop; acting-first feeds reward circuitry that motivation then reports.',
      },
      {
        question:
          'Why does BA insist activities connect to PERSONAL values rather than generic wellness suggestions?',
        options: [
          'Value-linked actions generate pleasure and mastery that actually register in reward circuits; generic prescriptions often satisfy neither',
          'Values-based activities are cheaper to schedule',
          'Generic activities lack medical approval',
          'Values terminology impresses therapists during reviews',
        ],
        correctIndex: 0,
        explanation:
          'Reward responds to significance, not category: fixing a bike WITH your son hits craftsmanship+connection; a random bath may hit nothing.',
      },
      {
        question: 'What principle governs correct task grading in graded task assignment?',
        options: [
          'Guaranteed completability — the unit of progress is COMPLETED tasks, sized absurdly small at first to rebuild efficacy evidence',
          'Optimal challenge — tasks slightly beyond current ability for growth',
          'Full restoration — returning immediately to previous activity levels',
          'Variety — sampling many domains rather than repeating one',
        ],
        correctIndex: 0,
        explanation:
          'Oversized early tasks re-collect failure evidence; small completions compound into the efficacy archive that depression erased.',
      },
      {
        question:
          'What function does before/after mood rating serve in BA?',
        options: [
          'It accumulates experiential proof that completed tasks outperform predicted mood — dismantling depression’s "nothing helps" premise task by task',
          'It tracks symptom severity for insurance documentation',
          'It identifies which therapist techniques are working',
          'It measures baseline functioning for medication dosing',
        ],
        correctIndex: 0,
        explanation:
          'Prediction-vs-outcome discrepancies are the treatment: the brain updates on evidence, not argument.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_action_spark_five_minutes',
      name: 'Five-Minute Ignition',
      category: 'ACTION_SPARK',
      manaCost: 1,
      baseDamage: 30,
      shieldValue: 28,
      promptText:
        'Don’t wait for the wave. Five minutes counts. Action IS the motivation factory.',
      targetDistortionBonus: { distortion: 'ALL_OR_NOTHING', multiplier: 1.8 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_ba_pleasure_mastery_log',
        scrollId: 'scr_ba_4',
        bookTitle: 'Behavioral Activation Manual',
        title: 'Daily P&M Log',
        description:
          'Each evening, log today’s activities rated 0–10 for Pleasure and Mastery. Flag the day’s best and emptiest blocks.',
        suggestedTime: '21:15',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Monitoring exposes the activity void and its mood correlation — the diagnostic foundation all BA scheduling builds on.',
        isScheduled: false,
      },
      {
        id: 'rtn_ba_micro_mission',
        scrollId: 'scr_ba_4',
        bookTitle: 'Behavioral Activation Manual',
        title: 'One Guaranteed Micro-Mission',
        description:
          'Every morning, define ONE value-connected task small enough to be uncancellable (walk to corner, one email, 10 min craft). Complete before dinner.',
        suggestedTime: '07:00',
        frequency: 'MORNING',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'A daily uncancellable completion maintains efficacy momentum even during the deepest trough weeks.',
        isScheduled: false,
      },
      {
        id: 'rtn_ba_scheduled_recovery',
        scrollId: 'scr_ba_4',
        bookTitle: 'Behavioral Activation Manual',
        title: 'Protected Recovery Block',
        description:
          'Calendar one 60-minute recovery activity weekly (gym, friend, nature, hobby) treated with appointment-grade immovability.',
        suggestedTime: '14:00',
        frequency: 'WEEKLY',
        energyTier: 'STEADY_40',
        reminderEnabled: true,
        clinicalRationale:
          'Residual rest never arrives for depleted caregivers; scheduled recovery is the burnout-specific translation of BA.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Total Collapse Crucible',
      subtitle: 'Activating When Even Micro-Tasks Feel Impossible',
      deepCaseStudy:
        'Three months of compounding pressure — work restructuring, sick parent, sleep wrecked by the baby — and last Tuesday something broke. You called in sick and haven’t returned calls since. Showering feels like a summit attempt. Your phone holds 23 unanswered messages you’ve read but cannot face composing replies to. Yesterday you sat on the bathroom floor for an hour doing nothing. You know EXACTLY what BA prescribes — walk, email, guitar — and knowing changes nothing, because even "reply to one message" sits behind a wall of static.',
      contentMarkdown: `### 🌪️ When the Ladder’s First Rung Is Out of Reach

Standard BA grading assumes the micro-task tier is reachable. Below a certain severity threshold, it isn't — "text one friend back" contains a dozen hidden sub-steps (open thread, compose, confront guilt, anticipate reply...) each of which the flooded system prices as enormous. The crucible skill is **sub-grading**: decomposing until a rung appears that today's capacity can actually lift.

#### ⚠️ The Three Collapse-Specific Traps:
1. **The Insight Substitution** — "I understand the model" quietly replaces "I did the task." Understanding BA is not BA. The treatment is the doing, at whatever microscopic grain.
2. **The Shame Amplifier** — judging yourself FOR being unable to do the tiny task, adding shame-load to an already-overloaded system. (Note the should-monster operating inside a collapse — they co-occur constantly.)
3. **The Streak Perfectionism** — completing three days, missing one, concluding "I've ruined it" and stopping entirely. All-or-nothing accounting converts one missed rung into a dropped ladder.

#### 🛡️ The Floor-Level Protocol:
1. **Sub-grade ruthlessly**: "reply to one message" → open phone → open the thread → type ANY word → send. Each is a legitimate rung. Today's task might legitimately be "open the thread." That counts. Log it.
2. **Body-first sequencing**: when cognition is static, skip planning entirely — stand up and let the body pick a direction (water, outside, shower). Movement generates the next instruction; thinking cannot.
3. **The two-minute ceiling**: nothing scheduled exceeds two minutes initially. Duration is irrelevant; occurrence is everything. A two-minute balcony stand is a full rep.
4. **Shame-check ritual**: whenever the tiny task feels humiliating, say the reframe aloud: "I am rehabilitating a nervous system, not performing productivity. Physio patients don’t apologize for small knee bends."
5. **Human escalation threshold**: if floor-level tasks stay unreachable for 2+ weeks, or thoughts turn toward not wanting to exist, that is a medical event, not a motivation problem — contact your GP or a crisis line. BA has boundaries; professional care is the next rung, and using it is the strongest move available, not the weakest.

#### 🧬 What Recovery Actually Looks Like:
Not a triumphant montage — a boring accumulation: thread opened, corner reached, one message sent. Roughly six weeks of unglamorous reps before the static thins. The people who recover are rarely the ones who felt able; they are the ones who kept lifting whatever rung existed.`,
      advancedQuiz: [
        {
          question:
            'Why does standard micro-grading fail at severe collapse, requiring "sub-grading"?',
          options: [
            'Below a severity threshold, even micro-tasks contain hidden multi-step costs the flooded system prices as enormous — decomposition must continue until a liftable rung appears',
            'Micro-tasks are clinically prohibited in severe depression',
            'Sub-grading refers to delegating tasks to family members',
            'It doesn’t fail — standard grading works at all severities',
          ],
          correctIndex: 0,
          explanation:
            'Task difficulty is subjective-cost-relative; "small" is defined by the receiving system, not the calendar.',
          clinicalDistinction:
            'Opening a message thread IS a valid behavioral activation rep when that is the honest edge of capacity.',
        },
        {
          question:
            'What distinguishes the Insight Substitution trap from genuine progress?',
          options: [
            'Understanding the model produces no reward-circuit input — only completed behavior feeds the system, so insight must never be logged as a rep',
            'Insight substitution occurs only in intellectual personality types',
            'There is no difference; comprehension activates the same circuits',
            'It applies solely to patients in formal therapy settings',
          ],
          correctIndex: 0,
          explanation:
            'The treatment mechanism is behavioral input to reward circuitry; insight is free-floating until embodied.',
          clinicalDistinction:
            'Test any day’s progress with one question: what did the body DO?',
        },
        {
          question:
            'When does the protocol mandate escalating beyond BA to professional help?',
          options: [
            'Floor-level tasks remaining unreachable for 2+ weeks, or emergence of thoughts about not wanting to exist — a medical threshold, not a motivation failure',
            'Whenever three consecutive tasks are missed',
            'Only after completing all self-guided modules without benefit',
            'Professional help is contraindicated while doing BA work',
          ],
          correctIndex: 0,
          explanation:
            'Severity below BA’s floor is a medical territory marker; seeking care there is the protocol succeeding, not failing.',
          clinicalDistinction:
            'Suicidal ideation of any intensity bypasses all self-help tiers and goes directly to crisis resources.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_first_rung_sigil',
        name: 'The First-Rung Sigil',
        description:
          'For those who lifted what existed. Grants +25 Vitality Edge.',
        statBoost: 'LOGIC_EDGE',
        boostAmount: 25,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_ba4_1',
        scrollId: 'scr_ba_4',
        bookTitle: 'Behavioral Activation Manual',
        author: 'Martell, Dimidjian & Herman-Dunn',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying The Momentum Paradox.',
        question:
          'Sunday evening, zero motivation, gym plan "when motivated." What is the BA move?',
        options: [
          'Define one value-linked micro-action completable today (corner walk, one message) — action first, motivation will file the report',
          'Rest fully and trust motivation to return naturally this week',
          'Watch fitness videos to inspire motivation for tomorrow',
          'Wait for Monday — fresh starts work better psychologically',
        ],
        correctIndex: 0,
        explanation:
          'Every waiting day deepens the withdrawal loop; a guaranteed-completable action breaks it at the smallest viable point.',
        clinicalInsight:
          'The plan "when motivated" is the trap’s signature phrase — motivation is downstream, not upstream.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_ba4_2',
        scrollId: 'scr_ba_4',
        bookTitle: 'Behavioral Activation Manual',
        author: 'Martell, Dimidjian & Herman-Dunn',
        scenarioPrompt: '⚡ Day-14 Spaced Review: Grading Principle.',
        question:
          'You completed three micro-tasks daily for a week, then missed yesterday. The all-or-nothing voice says "ruined." Correct BA response?',
        options: [
          'Streak perfectionism is a trap: occurrence over time is the metric — today’s single smallest rep resumes the arc, nothing is "ruined"',
          'Double today’s quota to compensate for the miss',
          'Restart the program from day one for a clean streak',
          'Accept that the attempt failed and wait for better conditions',
        ],
        correctIndex: 0,
        explanation:
          'All-or-nothing accounting converts one missed rung into a dropped ladder; BA metrics count occurrences across time, not unbroken streaks.',
        clinicalInsight:
          'Compensation-quota doubling is the same perfectionism wearing a productive costume.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_parent_5',
    title: 'The Father’s Co-Regulation Mirror',
    subtitle: 'Polyvagal Co-Regulation in Family Storms',
    authorOrTradition: 'Parenting & Polyvagal Science',
    readingMinutes: 6,
    category: 'PARENTING_COREGULATION',
    contentMarkdown: `## The Borrowing Before the Building

A toddler's nervous system cannot yet self-soothe — the prefrontal architecture for independent regulation isn't finished constructing (arguably until the mid-twenties). So how do infants survive storms? They **borrow**. Stephen Porges's polyvagal research established that young nervous systems regulate THROUGH a regulated other: your steady heartbeat, prosodic voice, and soft face become the external scaffold the child's system climbs down from dysregulation upon. The technical term is **co-regulation**, and it is not a parenting nicety — it is the biological mechanism by which self-regulation is eventually CONSTRUCTED. Thousands of co-regulated storms, gradually internalized, become a functional adult brake system.

## The Mirror Works Both Ways

The uncomfortable corollary: the borrowing runs on your actual state, not your performance. Neuroception — Porges's term for the nervous system's subconscious threat-scanning — detects the difference between a calm face and a clenched jaw arranged into patience. Children's systems read YOUR autonomic truth in milliseconds. Which means:

- **Your regulation is the curriculum.** Not your lectures about feelings — your physiology during THEIR storms.
- **Your dysregulation is also the curriculum.** A dysregulated father teaching a dysregulated child to calm down delivers a contradiction the child's body absorbs perfectly.

This is why the flight-attendant instruction exists on every flight: secure your own oxygen mask first. It is not selfishness; it is engineering sequence.

## The Storm Protocol: Regulate → Relate → Reason

Bruce Perry's sequencing captures the clinical order of operations, and reversing it is the most common parenting error in captivity:

1. **REGULATE** (body first): drop low — crouch below eye level; slow your own breath deliberately; lower volume beneath theirs. Offer presence, not solutions: "I'm right here."
2. **RELATE** (connection second): name what you see without correction — "big frustration, huh." Physical comfort if welcomed; silent proximity if not.
3. **REASON** (teaching last, often much later): only once breathing slows does the cortex come back online. Problem-solving delivered before this point evaporates — or worse, teaches that your words belong to the enemy.

The reversal error: leading with Reason ("how many times have we TALKED about using words!") mid-storm. It fails, escalates, and both parties conclude discipline doesn't work — when actually only the ORDER was wrong.

## Repair Beats Perfection

You will flood. You will snap. The research finding that should retire parental guilt permanently: children's attachment security correlates with **repaired** ruptures, not absent ones. A storm where you flooded, then later owned it — "I yelled. That was my big feelings, not your fault. Next time I'll breathe first" — delivers MORE regulatory education than a thousand flawless performances, because repair is precisely the skill they'll need as flooded adults.

## The Long Game

Every co-regulated storm is a deposit into an account neither of you can see: the child's eventual capacity to soothe themselves, and decades later, to co-regulate their own children. The tired father kneeling in the supermarket aisle performing slow exhales next to a screaming four-year-old is doing generational infrastructure work, invisible at the time, load-bearing for life.`,
    keyTakeaway:
      'Children borrow your nervous system before they build their own — regulate yourself first, sequence regulate→relate→reason, and remember repaired ruptures teach more than flawless performances.',
    quiz: [
      {
        question: 'What is co-regulation in polyvagal terms?',
        options: [
          'Young nervous systems regulating THROUGH a regulated other’s physiology — the biological scaffold from which self-regulation is eventually constructed',
          'Parents and children taking turns choosing calming activities',
          'Mutual agreements about household emotional rules',
          'Synchronized breathing exercises done together as a family',
        ],
        correctIndex: 0,
        explanation:
          'Co-regulation is the construction mechanism itself: thousands of borrowed calmings gradually become internal capacity.',
      },
      {
        question: 'Why does performed calm fail with distressed children?',
        options: [
          'Neuroception scans subconscious autonomic cues — clenching beneath a patient face registers as incongruent and unsafe within milliseconds',
          'Children cannot yet interpret facial expressions accurately',
          'Performed calm requires words, which escalate storms',
          'It doesn’t — children respond identically to acted and real calm',
        ],
        correctIndex: 0,
        explanation:
          'The mirror reads your actual state, not your presentation; congruence is the currency, effort is not.',
      },
      {
        question: 'What is the correct Perry sequence — and the classic reversal error?',
        options: [
          'Regulate → relate → reason; the error leads with reasoning/lecturing mid-storm while the cortex is offline',
          'Reason → regulate → relate; the error is excessive empathy before standards',
          'Relate → reason → regulate; the error is comforting before instructing',
          'The sequence is arbitrary provided all three elements eventually occur',
        ],
        correctIndex: 0,
        explanation:
          'Order is causal: body first (state), connection second (relationship), teaching third (content) — reversed orders actively escalate.',
      },
      {
        question:
          'What does research say about ruptures (you flooding/snapping) in child development?',
        options: [
          'Security correlates with REPAIRED ruptures — owning your flood afterward teaches repair, the exact skill they’ll need as flooded adults',
          'Any rupture causes lasting attachment damage requiring therapy',
          'Ruptures are irrelevant if the child is otherwise healthy',
          'Only ruptures involving physical aggression affect attachment',
        ],
        correctIndex: 0,
        explanation:
          'Perfection is neither possible nor optimal; the repair arc is itself the developmental payload.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_coreg_mirror',
      name: 'Co-Regulation Mirror',
      category: 'COMPASSION',
      manaCost: 1,
      baseDamage: 28,
      shieldValue: 30,
      promptText:
        'They borrow my calm before they build their own. Mask on me first.',
      targetDistortionBonus: { distortion: 'PERSONALIZATION', multiplier: 1.7 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_parent_mask_first',
        scrollId: 'scr_parent_5',
        bookTitle: 'Polyvagal Parenting',
        title: 'Doorway Mask Check',
        description:
          'Before entering any room where a child is melting down: one physiological sigh and a deliberate unclenching of jaw and shoulders.',
        suggestedTime: '17:30',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Entering regulated is the intervention; the doorway pause installs the mask-first sequence at the point of need.',
        isScheduled: false,
      },
      {
        id: 'rtn_parent_low_lantern',
        scrollId: 'scr_parent_5',
        bookTitle: 'Polyvagal Parenting',
        title: 'Low-Lantern Practice Rep',
        description:
          'Once daily during minor upset (not the big ones), practice the full sequence aloud: crouch low, slow voice, name the feeling, wait.',
        suggestedTime: '18:00',
        frequency: 'DAILY',
        energyTier: 'STEADY_40',
        reminderEnabled: false,
        clinicalRationale:
          'Minor storms are the dojo — practicing the sequence at low stakes builds fluency for the high-stakes nights.',
        isScheduled: false,
      },
      {
        id: 'rtn_parent_repair_log',
        scrollId: 'scr_parent_5',
        bookTitle: 'Polyvagal Parenting',
        title: 'Repair Ledger',
        description:
          'After any rupture this week, complete the repair arc and note it: what I did, what I owned, what the child saw me model.',
        suggestedTime: '20:45',
        frequency: 'WEEKLY',
        energyTier: 'STEADY_40',
        reminderEnabled: true,
        clinicalRationale:
          'Tracking repairs converts guilt into pedagogy and builds the evidence file against parental perfectionism.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Two-Child Collision Crucible',
      subtitle: 'Co-Regulating a Storm While Another Child Watches',
      deepCaseStudy:
        'The seven-year-old and the four-year-old collide over the tablet. Screaming erupts, the younger one throws it, screen cracks, older one shoves him down. You arrive to chaos — and freeze for a half-second seeing THREE dysregulations: two children mid-storm, and your own rising heat. The older one looks at you with defiance masking terror; the younger is wailing on the floor; and your own father’s voice is already loaded in the chamber: "WHO STARTED THIS?"',
      contentMarkdown: `### 🌪️ Triangulated Flooding

Multi-child storms add three failure accelerators to the standard protocol: divided attention, the justice instinct (someone MUST be guilty), and audience dynamics (each child performs for your verdict). The "who started it" reflex is the trap — it converts a regulation emergency into a courtroom, guarantees both children defend instead of de-escalate, and models prosecution as the response to conflict.

#### ⚠️ Why Prosecution Fails Clinically:
1. **Attribution fog**: in sibling collisions, causality is genuinely tangled — the "guilty" party is usually responding to accumulated provocation you didn't witness. Verdicts land wrong roughly half the time, and wrongly-convicted children learn justice is arbitrary.
2. **Storm-brains can't testify**: interrogating dysregulated children extracts garbage testimony and prolongs arousal in everyone.
3. **The watching lesson**: whatever you do to the "guilty" one, the other child downloads as policy for future conflicts — power determines outcomes.

#### 🛡️ The Simultaneous-Containment Protocol:
1. **Your mask first** (two seconds, doorway): sigh, jaw, shoulders. Three floods cannot be managed from a fourth.
2. **Safety geometry, no court**: physically separate WITHOUT verdicts — "I'm taking this brother over here" — proximity to you for the hurt one, space for the aggressive one.
3. **Two parallel regualations**: alternate brief anchors — low voice to the wailer ("you're hurt, I'm here"), eye-line to the shover ("big storm. I'm not angry. Breathe with me"). Neither child gets the trial they're expecting; BOTH get regulation they weren't.
4. **Delay ALL adjudication**: "Nobody's in trouble yet. We do feelings now, facts later." Facts interview happens 30+ minutes later, separately, when cortices are back online — and focuses on NEXT TIME strategies more than historical blame.
5. **The reunion close**: end with shared repair, not separated shame — the cracked tablet becomes a joint problem ("what's OUR plan so this never happens again?").

#### 🧬 What They Each Download:
The shover learns: aggression brings proximity and calm, not exile and rage. The hurt one learns: my pain summons presence without vengeance. Both learn: conflict resolves through regulation, not litigation. That trio is the entire inheritance.`,
      advancedQuiz: [
        {
          question:
            'Why is "who started it?" the critical reflex to suppress in sibling collisions?',
          options: [
            'It converts a regulation emergency into a courtroom — prolonging arousal, extracting unreliable testimony from storm-brains, and modeling prosecution as conflict resolution',
            'Because parents can never actually determine who started conflicts',
            'Because asking questions makes children cry harder',
            'It isn’t — accountability questions are the appropriate first move',
          ],
          correctIndex: 0,
          explanation:
            'Justice instincts are strong in fathers and clinically mistimed: verdicts require cortices that aren\'t currently online.',
          clinicalDistinction:
            'Facts get interviewed LATER and separately; storms get contained NOW.',
        },
        {
          question:
            'What does "parallel regulation" look like operationally with two flooded children?',
          options: [
            'Alternating brief regulation anchors between children — low voice to one, eye-line presence to the other — giving both containment instead of a trial',
            'Regulating one child fully before approaching the second',
            'Sending both to separate rooms to self-regulate alone',
            'Group breathing exercises with all family members holding hands',
          ],
          correctIndex: 0,
          explanation:
            'Sequential full-processing leaves the second child flooding unattended too long; alternating micro-anchors covers both while your own regulation holds.',
          clinicalDistinction:
            'Physical separation without verbal verdicts achieves safety geometry without the courtroom frame.',
        },
        {
          question:
            'What is the developmental purpose of ending with joint repair ("OUR plan")?',
          options: [
            'Shared repair converts adversaries into collaborators and teaches that conflict resolves through joint regulation — the inheritance both children carry forward',
            'It efficiently distributes blame so neither child feels singled out',
            'Joint apology rituals are culturally expected in the household',
            'It avoids the need for any individual accountability conversation',
          ],
          correctIndex: 0,
          explanation:
            'The closing frame is the deepest lesson: adversarial resolution vs collaborative resolution is learned in these endings.',
          clinicalDistinction:
            'Individual accountability conversations still happen separately later — the joint frame supplements, not replaces.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_parallel_regulation_band',
        name: 'The Parallel Anchor Band',
        description:
          'For fathers who hold two storms in two hands. Grants +25 Compassion Aura.',
        statBoost: 'COMPASSION_AURA',
        boostAmount: 25,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_parent5_1',
        scrollId: 'scr_parent_5',
        bookTitle: 'Polyvagal Parenting',
        author: 'Perry × Porges Principles',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying the Co-Regulation Mirror.',
        question:
          'Toddler mid-tantrum. Your instinct: explain calmly WHY the toy situation happened. Correct sequencing?',
        options: [
          'Regulate first (drop low, slow breath, presence) → relate (name the feeling) → reason LAST, often minutes later',
          'Reason immediately while the incident is fresh in their memory',
          'Wait silently for the tantrum to end, then reason at length',
          'Reason and regulate simultaneously for efficiency',
        ],
        correctIndex: 0,
        explanation:
          'Words delivered to an offline cortex evaporate or inflame; the sequence is the intervention.',
        clinicalInsight:
          'If you can\'t remember which comes first, remember: body, bond, brain.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_parent5_2',
        scrollId: 'scr_parent_5',
        bookTitle: 'Polyvagal Parenting',
        author: 'Perry × Porges Principles',
        scenarioPrompt: '⚡ Day-7 Spaced Review: Rupture Recovery.',
        question:
          'You flooded and yelled at bedtime. The guilt says minimize or pretend it didn’t happen. What does the science say the child needs?',
        options: [
          'Explicit repair: "I yelled — that was my big feelings, not your fault. Next time I’ll breathe first" — the repair arc IS the lesson',
          'A calm discussion of the child’s role in provoking the yelling',
          'Space and normalcy — children forget these episodes quickly',
          'An apology gift to restore positive feelings',
        ],
        correctIndex: 0,
        explanation:
          'Named, owned repair models the exact skill they\'ll someday need; silence teaches that storms get buried, not healed.',
        clinicalInsight:
          'Security is built from mended tears, not from never tearing.',
        nextReviewDueDays: 7,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_teach_6',
    title: 'The Educator’s Sovereign Citadel',
    subtitle: 'Stoic Pedagogy & Managing Classroom Chaos',
    authorOrTradition: 'Stoic Philosophy',
    readingMinutes: 6,
    category: 'STOICISM',
    contentMarkdown: `## The Job Description Nobody Signed

Teaching is the profession where your daily outcomes depend on the unregulated nervous systems of thirty other humans, evaluated by metrics you don't control, administered by institutions that change priorities quarterly, judged by families experiencing their own crises. Epictetus — born enslaved, lame from a master's cruelty — built an entire philosophy around a precisely relevant insight: **there is a line between what is yours and what is not, and nearly everything painful in teaching lies on the wrong side of it.**

## The Dichotomy Applied to the Classroom

The Stoic dichotomy of control sorts your professional world into two piles:

**Yours (complete sovereignty)**: your preparation quality, your tone, your fairness, your patience reserves, the standards you hold, the relationships you build, your response to every disruption.

**Not yours (zero sovereignty)**: whether students complete homework, their home environments, admin's latest initiative, class sizes, curriculum changes, parental engagement, standardized outcomes, whether any given student chooses to grow today.

The suffering audit: most teacher anguish is spent in pile two — ruminating over the student who won't engage, the parent who won't respond, the policy that makes no sense. Stoic pedagogy redirects 100% of that energy to pile one, where leverage actually lives. Marcus's formulation: the archer does everything within his art — stance, draw, breath, release — then the arrow flies into a zone where his will has no jurisdiction. Hit or miss, THE ARCHERY WAS PERFECT. Teaching is archery, not target-painting.

## The Inner Citadel Under Siege

Guénon's image (via Hadot's famous study of Marcus) — an inner citadel that storms reach only if you open the gates. Classroom invasions arrive hourly: the contemptuous comment, the administrator's surprise walkthrough, the technology failure mid-lesson. The citadel discipline has three gates:

1. **Gate of judgment**: "This disruption is a DISASTER" — is that the fact, or a judgment added? The fact: a student spoke loudly. Everything else is appraisive tax.
2. **Gate of ownership**: "He did it TO SPITE ME" — attribution check. Students act from their weather; personalizing their weather is an optional toll you keep paying.
3. **Gate of response-delay**: the Stoic pause — even three seconds between stimulus and response restores choice. The sarcastic comeback is never chosen; it is only unchosen late.

## Premeditatio Malorum for Teachers

The Stoics recommended rehearsing adversity in advance — not pessimism, but inoculation. The educator's version: before each class, spend thirty seconds anticipating likely friction (Friday afternoon period 6, the returning suspender, the tech-dependent lesson) and pre-choosing your response. Scripts rehearsed in calm remain accessible mid-storm; improvised virtue does not. Marcus opened his Mediations with exactly this practice: "Today I will meet the meddling, the ungrateful..." — and concluded that none of it could harm HIS character unless he permitted it.

## What Remains Yours Is Enough

The citadel's deepest promise: pile one is sufficient for a career of meaning. Teachers burn out chasing pile-two outcomes they never controlled; teachers who fall in love with pile-one craft — the clarity of an explanation, the fairness of a consequence, the steadiness under fire — discover the only sustainable version of this profession. The students who grow do so partly BECAUSE someone stable kept doing excellent work inside the citadel regardless of the weather.`,
    keyTakeaway:
      'Sort the classroom world into yours (preparation, tone, fairness, responses) and not-yours (engagement, homes, admin, outcomes) — spend everything on the first pile and let the arrow fly where it flies.',
    quiz: [
      {
        question: 'Into which pile does "whether this student completes homework" fall?',
        options: [
          'Not yours — influence maybe, control never; energy spent here is leaked from pile one',
          'Yours — with sufficient skill all students comply',
          'Shared 50/50 between teacher and student',
          'Yours on weekdays, not yours on weekends',
        ],
        correctIndex: 0,
        explanation:
          'The dichotomy is binary by design: influence is not control. Homework compliance sits wholly outside your jurisdiction.',
      },
      {
        question: 'What does the archer analogy assign to the teacher?',
        options: [
          'Total excellence in stance, draw and release (everything controllable) — with the arrow’s flight (outcomes) explicitly outside the archer’s will',
          'Responsibility for bending the arrow’s path mid-flight through skill',
          'Blame for misses, credit for hits — outcomes measure the archer',
          'The choice of which targets are worth shooting at',
        ],
        correctIndex: 0,
        explanation:
          'The archery/outcome split lets professionals pursue excellence without hostage-taking by uncontrollables.',
      },
      {
        question: 'What are the citadel’s three gates, in operational order?',
        options: [
          'Judgment check (fact vs appraisal), ownership check (whose weather), response-delay (the Stoic pause)',
          'Planning gate, execution gate, reflection gate',
          'Notice, label, breathe — the mindfulness triad',
          'Assess, address, assess again — the feedback loop',
        ],
        correctIndex: 0,
        explanation:
          'Each gate intercepts a distinct invasion vector: catastrophizing appraisal, personalizing attribution, and reflexive reaction.',
      },
      {
        question:
          'Why does premeditatio malorum work as classroom inoculation rather than pessimism?',
        options: [
          'Scripts rehearsed in calm remain retrievable mid-storm; pre-choosing responses to likely frictions converts surprises into anticipated reps',
          'It lowers expectations so outcomes feel better by contrast',
          'It prepares students emotionally for strict discipline',
          'Pessimistic teachers are granted smaller class sizes',
        ],
        correctIndex: 0,
        explanation:
          'State-dependent learning governs: virtue improvised under flood fails; virtue pre-installed stands ready.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_sovereign_citadel',
      name: 'Sovereign Citadel',
      category: 'FACT_CHECK',
      manaCost: 2,
      baseDamage: 32,
      shieldValue: 34,
      promptText:
        'The arrow flew where I cannot reach. My archery was perfect. Sort: mine / not mine.',
      targetDistortionBonus: { distortion: 'PERSONALIZATION', multiplier: 1.8 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_teach_pile_sort',
        scrollId: 'scr_teach_6',
        bookTitle: 'Meditations (Marcus Aurelius)',
        title: 'Morning Pile Sort',
        description:
          'Before first bell: list today’s three anxieties. Sort each honestly into MINE / NOT MINE. Act only on column one.',
        suggestedTime: '07:45',
        frequency: 'WORK_HOURS',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Daily sorting prevents pile-two rumination from consuming preparation energy — the leak most teachers never find.',
        isScheduled: false,
      },
      {
        id: 'rtn_teach_premeditation',
        scrollId: 'scr_teach_6',
        bookTitle: 'Meditations (Marcus Aurelius)',
        title: 'Thirty-Second Friction Forecast',
        description:
          'Before each class, name the likeliest friction point and pre-choose your response script for it.',
        suggestedTime: '08:55',
        frequency: 'WORK_HOURS',
        energyTier: 'LOW_10',
        reminderEnabled: false,
        clinicalRationale:
          'Premeditatio converts the day’s most probable invasions into rehearsed openings rather than ambushes.',
        isScheduled: false,
      },
      {
        id: 'rtn_teach_archery_log',
        scrollId: 'scr_teach_6',
        bookTitle: 'Meditations (Marcus Aurelius)',
        title: 'Archery Journal (Fridays)',
        description:
          'Week’s end: record where your archery was excellent regardless of where arrows landed. One entry minimum.',
        suggestedTime: '15:30',
        frequency: 'WEEKLY',
        energyTier: 'STEADY_40',
        reminderEnabled: true,
        clinicalRationale:
          'Outcome-hostage professionals need deliberate evidence trails of controllable excellence to sustain motivation.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Public Failure Crucible',
      subtitle: 'When the Lesson Collapses in Front of Everyone',
      deepCaseStudy:
        'Period 3, observed lesson, the technology dies ninety seconds in. Your entire prepared lesson lives on the dead screen. Twenty-nine faces watch you fumble cables while the clock devours your evaluation window. A student mutters "worst class ever" loud enough for the observer to hear. Heat floods your face. The observer writes something. You feel your career compressing into this single hour, and somewhere beneath the panic, a colder thought: "I am not good enough at this job."',
      contentMarkdown: `### 🌪️ Anatomy of a Collapsing Hour

Triple stack: real logistical failure + public audience + evaluative stake. Each amplifies the others — the observer's pen transforms a routine tech glitch into perceived career evidence, and the student's mutter lands like a verdict rather than the weather-report it actually was.

#### ⚠️ The Four Appraisal Errors Compounding Live:
1. **Catastrophic scaling**: "career-defining disaster" attached to a reversible inconvenience. Fact-check: teachers survive bombed lessons weekly; careers die from patterns, not hours.
2. **Mind-reading the observer**: "she wrote something" → assumed indictment. You know nothing about what was written; the fantasy version is your own construction.
3. **Single-verdict attribution**: one chaotic hour → "not good enough." Attribution theory: stable-global explanations from single data points are mathematically indefensible.
4. **Audience inflation**: student mutters reflect THAT STUDENT'S moment, not a consensus referendum.

#### 🛡️ The Live-Recovery Protocol:
1. **The three-second gate**: pause fully before speaking. The pause reads as composure to observers; internally it's your Gate 3 doing its work.
2. **Narrate the pivot calmly**: "Technology's failed us — better plans exist." You are simultaneously solving logistics AND demonstrating the exact resilience skill the curriculum claims to teach. Observers score adaptability HIGHER than flawless delivery.
3. **Deploy the analog fallback**: whiteboard discussion, pair-work, oral storytelling — any low-tech structure executed steadily. The lesson objective survives; only the medium died.
4. **Defer ALL verdicts**: no self-judgment until 48 hours post-observation, and then only from evidence (observer's actual comments), never from the hour's internal hallucinations.
5. **The archer's debrief**: sort the hour — cable failure (not yours), pivot quality (yours, and executed), student mutter (their weather), preparation redundancy (yours, improvable: print backups henceforth).

#### 🧬 The Counterintuitive Observer Reality:
Evaluation rubrics overwhelmingly reward responsive adaptation over scripted smoothness. The tech-death hour, handled with sovereign calm, typically scores BETTER than the polished hour — because polish proves preparation while recovery proves TEACHING. The citadel holds precisely when the walls fall down.`,
      advancedQuiz: [
        {
          question:
            'Why does narrating the pivot ("better plans exist") serve evaluation interests rather than exposing weakness?',
          options: [
            'Observers score adaptive responsiveness highly — calm narration demonstrates metacognitive control, turning a logistics failure into live evidence of teaching mastery',
            'It tricks observers into not noticing the technology failure',
            'Narration officially transfers fault to the IT department',
            'It has no effect; observers only score planned content',
          ],
          correctIndex: 0,
          explanation:
            'Rubrics measure decision-making under pressure more reliably than they measure luck-free conditions; the pivot IS the assessed artifact.',
          clinicalDistinction:
            'Silent struggling reads as losing control; narrated pivoting reads as conducting it.',
        },
        {
          question:
            'What is the evidentiary rule governing post-observation self-verdicts?',
          options: [
            'Verdicts deferred 48 hours, drawn only from actual observer commentary — never from in-hour internal hallucinations about what was written or concluded',
            'Immediate honest self-assessment prevents bad-habit formation',
            'Student feedback is the primary evidence source for self-verdicts',
            'Self-verdicts should match the harshest plausible interpretation for growth',
          ],
          correctIndex: 0,
          explanation:
            'In-hour appraisals are flood-state artifacts; delayed evidence-based review is the only defensible tribunal.',
          clinicalDistinction:
            'The 48-hour deferral isn\'t avoidance — it\'s jurisdiction: verdicts require evidence the flood cannot access.',
        },
        {
          question:
            'In the archer\'s debrief, why does "preparation redundancy" land in the MINE column?',
          options: [
            'Printed backups and analog fallbacks were controllable preparations — the only genuinely improvable element of the hour, and thus the only actionable lesson',
            'To ensure blame is assigned somewhere proportionate',
            'It doesn’t — equipment failures remove all responsibility',
            'Because administrators require documented improvement plans',
          ],
          correctIndex: 0,
          explanation:
            'The debrief exists to find pile-one levers; ignoring them wastes the hour, while inventing pile-one guilt where none exists wastes the self.',
          clinicalDistinction:
            'Redundancy-planning is the growth edge; cable-blame and talent-doubt are both leaks.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_analog_fallback_flint',
        name: 'The Analog Fallback Flint',
        description:
          'Sparks in dead-air moments. Grants +25 Mind Shield for public recovery.',
        statBoost: 'MIND_SHIELD',
        boostAmount: 25,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_teach6_1',
        scrollId: 'scr_teach_6',
        bookTitle: 'Meditations',
        author: 'Marcus Aurelius',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying the Sovereign Citadel.',
        question:
          'Admin announces a new reporting framework you believe is misguided. Where does this sit, and what moves?',
        options: [
          'Not yours (policy) — yours (quality of execution, tone of dissent voiced once, constructively, then full presence to implementation)',
          'Yours — resist visibly until policy improves',
          'Not yours — disengage entirely from implementation quality',
          'Yours — solve it by working unpaid weekends to compensate',
        ],
        correctIndex: 0,
        explanation:
          'Voice-once-then-execute is the classic stoic-institution move: dissent expressed within your jurisdiction, then sovereignty over your own conduct.',
        clinicalInsight:
          'Chronic pile-two campaigning is the most common teacher-energy leak after homework grief.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_teach6_2',
        scrollId: 'scr_teach_6',
        bookTitle: 'Meditations',
        author: 'Marcus Aurelius',
        scenarioPrompt: '⚡ Day-14 Spaced Review: The Archer Split.',
        question:
          'Year-end results arrive: your weakest class underperformed despite excellent teaching. Apply the archer:',
        options: [
          'Archery assessed on controllables (prep, delivery, relationships — review honestly); arrow-flight (scores, student choices) acknowledged as outside the will',
          'Results prove inadequate teaching — intensify self-criticism',
          'Results are meaningless — refuse to engage with data entirely',
          'Split the difference: half blame accepted, half deflected',
        ],
        correctIndex: 0,
        explanation:
          'The archer reviews form rigorously AND refuses hostage-status to outcomes; both halves are required for sustainable excellence.',
        clinicalInsight:
          'Teachers who accept outcome-hostagehood burn out; those who reject all review stagnate. The split is the profession\'s only stable ground.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_cft_7',
    title: 'The Gentle Inner Dialogue',
    subtitle: 'Paul Gilbert’s Compassion-Focused Therapy in Overwhelm',
    authorOrTradition: 'Paul Gilbert — Compassion-Focused Therapy',
    readingMinutes: 6,
    category: 'PARENTING_COREGULATION',
    contentMarkdown: `## The Voice in the Kitchen

It's 8pm, the dishes are winning, homework wasn't checked, someone cried at bedtime, and the internal broadcast starts: *"Useless. Other fathers manage. You're pathetic. Everyone can see you're failing."* Paul Gilbert's foundational observation: the tone we take with ourselves in failure moments is frequently **crueler than we would dare speak to any stranger** — and this cruelty isn't motivational; it's organizational sabotage running on an evolutionary legacy.

## Why We Have an Inner Critic At All

Gilbert's model identifies evolved emotion-regulation systems that served our ancestors:

- **Threat system** (threat/protection): detects danger, produces anxiety/anger/disgust. Brilliant for savanna survival.
- **Drive system** (seeking/achieving): dopamine-powered pursuit of resources and status.
- **Soothing system** (affiliation/contentment): the oxytocin-opioid calm of safe connection — chronically UNDERDEVELOPED in many people, especially men raised on criticism.

The inner critic is the threat system turned inward: a protection strategy ("if I attack myself first, I'll fix flaws before others can") that calcified into abuse. CFT's diagnosis is precise: the critic isn't evil, it's **misfired protection** — and fighting it with force recruits more threat. You cannot threaten someone into feeling safe. Including yourself.

## The Three Flows of Compassion

Gilbert maps compassion as directional flows, and most struggling fathers are blocked in specific directions:

1. **Compassion FROM others**: receiving care. Blocked by: "I don't deserve it," discomfort being seen struggling.
2. **Compassion FOR others**: giving care. Usually flowing well in fathers — often TOO well, at self's expense.
3. **Compassion FOR SELF**: the blocked direction. Dismissed as weakness, indulgence, or "letting yourself off the hook."

The clinical finding: self-compassion is not self-indulgence — research (Neff, Gilbert) links it to GREATER accountability, persistence after failure, and lower burnout, because self-criticism triggers threat physiology that shuts down learning, while self-compassion activates the soothing system where reflection and change actually work.

## The CFT Move: Speaking From the Compassionate Self

Not positive affirmations ("I'm amazing!") — those bounce off a threat system primed with contrary evidence. The CFT technique is slower and stranger:

1. **Notice the critic's voice** and name its origin: "That's my threat system trying to protect me the way it learned in childhood."
2. **Ask what wisdom, kindness and courage would say** — genuinely imagining a deeply compassionate figure (real or imagined) observing your struggle.
3. **Speak in THAT voice, aloud when possible**: "This day was genuinely hard. You were exhausted and still showed up for bedtime. The dishes can wait; the shame spiral cannot."
4. **Notice the physiological shift** — softened jaw, deeper breath — evidence the soothing system engaged rather than another system performing.

Tone matters more than content: the same sentence delivered warmly versus coldly produces opposite neural effects. You are training a VOICE, not reciting a script.

## For the Specifically Overwhelmed

Under genuine overload, self-compassion includes a practical component critics conveniently ignore: acknowledging REALITY. "Of course you're overwhelmed — you're running a job, a household, and a sick parent on five hours of sleep. Any human would struggle. The struggle is information about LOAD, not verdicts about CHARACTER." Sometimes the compassionate response is a boundary, a delegated chore, or a canceled obligation — kindness that takes the load seriously rather than decorating it.`,
    keyTakeaway:
      'The inner critic is misfired threat-protection, not truth — meet it from the soothing system: notice, source it, speak from your compassionate self in a warm tone, and let compassion include practical load-reduction.',
    quiz: [
      {
        question:
          'In Gilbert’s model, what IS the inner critic functionally?',
        options: [
          'Misfired threat-system protection — attacking flaws preemptively — that calcified into habitual self-abuse',
          'An accurate internal assessment of your actual shortcomings',
          'A motivational engine essential for high achievement',
          'A Freudian death instinct requiring psychoanalysis to resolve',
        ],
        correctIndex: 0,
        explanation:
          'Functional analysis changes the intervention: you don\'t destroy a protector, you retrain it — force recruits more threat.',
      },
      {
        question:
          'Which of Gilbert’s three compassion flows is most commonly blocked in struggling fathers?',
        options: [
          'Self-directed flow — dismissed as weakness or "letting yourself off the hook"',
          'Compassion received from others',
          'Compassion given to children and partners',
          'All three flows are typically equally balanced',
        ],
        correctIndex: 0,
        explanation:
          'The pattern is characteristic: high outbound compassion, blocked inbound-to-self flow — the asymmetry that produces burnout.',
      },
      {
        question:
          'Why do positive affirmations fail where CFT’s compassionate-self dialogue works?',
        options: [
          'Affirmations bounce off a threat system armed with contrary evidence; CFT engages the SOOTHING system through warm tone and sourced reframing',
          'Affirmations are spoken silently rather than aloud',
          'Affirmations use second person, which the brain rejects',
          'They don’t differ — both activate identical systems',
        ],
        correctIndex: 0,
        explanation:
          'Mechanism specificity: threat cannot be out-argued, only soothed; tone is the delivery vehicle that reaches the soothing system.',
      },
      {
        question:
          'What does genuine self-compassion include that critics accuse it of omitting?',
        options: [
          'Practical load-reduction — boundaries, delegation, canceled obligations — taking reality seriously rather than decorating overwhelm',
          'Strict accountability schedules ensuring continued productivity',
          'Complete acceptance of circumstances without any change',
          'Formal meditation certification requirements',
        ],
        correctIndex: 0,
        explanation:
          'Kindness that ignores load is decoration; CFT honors reality-assessment as compassion\'s spine.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_gentle_voice',
      name: 'The Gentle Voice',
      category: 'COMPASSION',
      manaCost: 1,
      baseDamage: 26,
      shieldValue: 34,
      promptText:
        'That’s my threat system, not the truth. What would wisdom-kindness-courage say — in a WARM tone?',
      targetDistortionBonus: { distortion: 'ALL_OR_NOTHING', multiplier: 1.5 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_cft_critic_spotting',
        scrollId: 'scr_cft_7',
        bookTitle: 'The Compassionate Mind',
        title: 'Critic Spotting Practice',
        description:
          'Catch one self-critical burst daily; note the exact words, then source it aloud: "threat system protecting me the way it learned."',
        suggestedTime: '20:00',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Sourcing the critic interrupts fusion with its content and reframes it as protective misfire rather than verdict.',
        isScheduled: false,
      },
      {
        id: 'rtn_cft_warm_replay',
        scrollId: 'scr_cft_7',
        bookTitle: 'The Compassionate Mind',
        title: 'Warm-Voice Replay',
        description:
          'Take today’s harshest self-talk line and repeat it aloud in an exaggeratedly warm, kind tone — noticing the physiological difference.',
        suggestedTime: '21:00',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: false,
        clinicalRationale:
          'Direct tone-training: identical content in warm delivery builds the soothing pathway the critic never used.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Critic With Evidence Crucible',
      subtitle: 'When Self-Attack Feels Deserved Because You Actually Failed',
      deepCaseStudy:
        'This time the critic has receipts. You lost your temper badly at your daughter’s recital — audibly, publicly — because she froze onstage and you barked "just GO ON" loud enough for rows to turn. She performed anyway, found your face afterward, and looked away first. The inner broadcast isn’t vague worthlessness now; it’s specific and TRUE: "You humiliated your seven-year-old at her moment. Fathers like you don’t deserve kids like her." Self-compassion feels obscene here — like pardoning yourself for a real crime.',
      contentMarkdown: `### 🌪️ When Compassion Meets Genuine Guilt

This is CFT's hardest test and its sharpest differentiation from pop self-esteem: the failure is REAL. You did the thing. No reframe makes the bark unheard. Critics of compassion assume this is where it collapses — and Gilbert's answer is that this is precisely where compassion becomes most necessary and most misunderstood.

#### ⚠️ The Guilt-Shame Divergence (the crucial distinction):
- **GUILT** = "I DID something bad" — painful, but behavior-focused and therefore ACTIONABLE. It powers apology and repair.
- **SHAME** = "I AM bad" — global, identity-level, and paralyzing. It powers hiding, defensiveness, and repetition.

Self-compassion does not reduce GUILT — it prevents guilt's corruption into shame. The research direction is consistent: self-compassionate people take MORE responsibility for harms, apologize more readily, and repair more thoroughly, because their identity isn't under siege while they work.

#### 🛡️ The Accountability Protocol (compassion WITH teeth):
1. **Feel the guilt fully — it's earned and useful**: "Yes. That was wrong, and it hurt her. I own it completely." No minimization, no context-excusing.
2. **Draw the identity line explicitly**: "I did a bad thing" is true. "I am a bad father" is a verdict the evidence doesn't support — one moment in thousands. Say both sentences; feel the difference.
3. **Convert to repair with urgency, not groveling**: soon and sincere — "I yelled at you at your recital. That was wrong. Your freezing was brave — stage fright is hard — and my yelling was about MY nerves, not your performance. I'm sorry."
4. **Extract the functional lesson**: identify the trigger (performance anxiety + audience), design the next-time protocol (breathe, zip it, applaud regardless), and rehearse it once mentally.
5. **Let punishment go**: self-punishment FEELS like moral seriousness but functions as shame-lubricant — the punished self hides from the memory rather than learning from it. The repair, the lesson, and the changed next-time ARE the penance. There is no additional payment desk.

#### 🧬 What Your Daughter Actually Downloads:
Not the bark — she'll forget the bark. She downloads the repair: the adult who wrongs people, names it, and returns with warmth intact. Children raised witnessing accountable repair become adults capable of it. Your worst moment, properly processed, becomes her template for handling her own worst moments.`,
      advancedQuiz: [
        {
          question:
            'What is the functional difference between guilt and shame that makes this distinction central to CFT?',
          options: [
            'Guilt ("I did bad") is behavior-focused and actionable; shame ("I am bad") is identity-global and paralyzing — compassion blocks the corruption of the former into the latter',
            'Guilt is unhealthy and must be eliminated; shame is constructive',
            'The terms describe the same state in clinical and popular usage',
            'Shame motivates faster repairs than guilt does',
          ],
        correctIndex: 0,
          explanation:
            'Research consistently shows shame predicts hiding and repetition while guilt predicts apology and correction.',
          clinicalDistinction:
            'Self-compassion reduces shame, NOT guilt — keeping the useful signal while removing the paralytic.',
        },
        {
          question:
            'Why does the protocol insist self-punishment is NOT moral seriousness?',
          options: [
            'Punishment triggers shame-driven avoidance of the memory itself — the repaired behavior, extracted lesson, and changed protocol constitute the complete penance',
            'Punishment is ineffective because children forgive quickly anyway',
            'Self-punishment is merely outdated religious conditioning with no function',
            'It is — the protocol simply recommends lighter punishments',
          ],
          correctIndex: 0,
          explanation:
            'The punished mind flinches away from recall, interrupting exactly the consolidation that prevents recurrence.',
          clinicalDistinction:
            'Feeling bad about harm is guilt working; organizing life around feeling bad is shame interfering.',
        },
        {
          question:
            'Why is urgent-but-unhurried repair (not groveling) the correct repair posture?',
          options: [
            'Groveling makes the child manage YOUR remorse, shifting the emotional labor; clean ownership keeps the focus on her experience and models accountable adulthood',
            'Groveling is simply unnecessary since children forget quickly',
            'Urgency matters more than posture in repair outcomes',
            'Repairs should wait until the child raises the issue themselves',
          ],
          correctIndex: 0,
          explanation:
            'Repair is a gift to the harmed person; performed dramatically enough, it becomes a withdrawal from their account to soothe the harmer\'s.',
          clinicalDistinction:
            'The test: after the repair conversation, who feels cared for? If it\'s you, redo it.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_clean_repair_chalice',
        name: 'The Clean-Repair Chalice',
        description:
          'For guilt kept clean of shame. Grants +30 Compassion Aura.',
        statBoost: 'COMPASSION_AURA',
        boostAmount: 30,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_cft7_1',
        scrollId: 'scr_cft_7',
        bookTitle: 'The Compassionate Mind',
        author: 'Paul Gilbert',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying the Gentle Inner Dialogue.',
        question:
          'Mid-overwhelm, the broadcast starts: "pathetic, everyone manages but you." The CFT sequence?',
        options: [
          'Source it ("threat system misfire") → imagine the compassionate figure → speak from that voice, WARM tone → include load-reality ("of course — look at your week")',
          'Argue the thoughts false with contradictory evidence lists',
          'Push through the tasks faster to disprove the accusation',
          'Schedule the self-criticism for tomorrow when calmer',
        ],
        correctIndex: 0,
        explanation:
          'Sourcing defuses fusion; warm tone reaches the soothing system; reality-acknowledgment keeps compassion honest.',
        clinicalInsight:
          'Content debates feed the threat system; tone-shifts bypass it.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_cft7_2',
        scrollId: 'scr_cft_7',
        bookTitle: 'The Compassionate Mind',
        author: 'Paul Gilbert',
        scenarioPrompt: '⚡ Day-14 Spaced Review: Flow Directions.',
        question:
          'You give compassion easily to family but deflect compliments and help offers awkwardly. Which flow is blocked?',
        options: [
          'Compassion FROM others — often blocked by undeserving beliefs; practicing graceful reception is legitimate CFT work',
          'Compassion FOR others — strengthen by volunteering more',
          'Neither — giving and receiving are unrelated skills',
          'The self-flow only; receiving from others is irrelevant',
        ],
        correctIndex: 0,
        explanation:
          'Gilbert maps three flows independently; inbound-from-others blocking (deflection, discomfort) is its own training target.',
        clinicalInsight:
          'Deflected care deprives givers too — receiving gracefully is a relational gift, not a debt incurred.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_act_8',
    title: 'Leaves on a Stream',
    subtitle: 'ACT Cognitive Defusion & Unfusing from Thoughts',
    authorOrTradition: 'Steven Hayes — Acceptance & Commitment Therapy',
    readingMinutes: 6,
    category: 'CBT_REBT',
    contentMarkdown: `## The Fusion Problem

"I'm a terrible father." ACT's founding insight (Hayes): the suffering isn't primarily IN the thought's content — it's in your **fusion** with it: the seamless merging where the thought is experienced as literal truth, a command, an identity. Fused, "I'm a terrible father" means: reality-report, verdict issued, case closed. The thought doesn't feel like a mental event; it feels like the world.

Language built this. Human minds are relentless relating machines — connecting words to meanings automatically since childhood — and by adulthood, thinking is transparent: you look THROUGH thoughts at reality, never AT them. ACT's move is to rotate the gaze.

## Defusion: Looking at Thought, Not Through It

Cognitive defusion techniques all accomplish one structural change: converting THOUGHT-as-truth into THOUGHT-as-event. Hayes's classic exercises:

- **"I'm having the thought that..."**: prefix the verdict. Feel the seam appear. Advanced: "I notice I'm having the thought that..." — one more step of observer distance.
- **Leaves on a stream**: meditative practice — each thought placed on a leaf, watched floating past. The discipline is NOT clearing the mind; it's placing WHATEVER arises ("this is stupid... that's another leaf") on its leaf and letting the current take it.
- **Silly voice repetition**: say the hot thought rapidly in a cartoon voice for 30 seconds. The words persist; their authority dissolves — proof that meaning is a property the mind ADDS, not one words carry inherently.
- **Thank you, mind**: responding to the mind's dire broadcasts with genuine gratitude ("Thanks, mind — very protective!") acknowledges the thought-generating machinery without obeying it.

Crucially: defusion does NOT claim thoughts are false. "I'm a terrible father" might even be occasionally accurate as behavioral critique. The ACT claim is narrower and bulletproof: **thoughts are events in a mind — not rulers of behavior.** You can act on values with the thought still playing.

## Acceptance: Willingness Without Approval

ACT's acceptance is perpetually misunderstood. It is not approval, resignation, or liking. It is **willingness to have** the internal experience — anxiety, boredom, grief — as the necessary cost of moving toward what matters. The controlling agenda ("eliminate anxiety first, THEN live") is the disorder's engine: struggle-with-x amplifies x while postponing life. Acceptance cancels the struggle, keeps the feeling, frees the behavior.

The metaphor set: thoughts-feelings as weather (you are the sky, not the storm); passengers on the bus (you drive; hecklers ride along; pulling over to eject them means going nowhere); quicksand (struggling harder sinks deeper; lying flat — spreading contact — floats you).

## Commitment: Values as the Compass

Defusion and acceptance clear the deck; VALUES steer the rebuilt vessel. ACT distinguishes values (directions — never "achieved," always expressible: "be a present father") from goals (milestones along directions: "attend Friday's recital"). The committed action question cuts through every fused paralysis: **"Are you willing to have this feeling, in service of that direction?"** Present father with racing heart at the recital > absent father waiting for calm that never ships.

## The Six-Sided Hexaflex

ACT's full model — acceptance, defusion, present-moment contact, self-as-context (the observing sky), values, committed action — interlock as one skill set. But the practical core for daily fathering is a single move: notice the fusion, defuse ("having the thought that..."), reconnect to the value, take the next valued step WITH the thought riding along.`,
    keyTakeaway:
      'Thoughts are mental events, not rulers — defuse ("having the thought that…"), accept the feeling as the cost of the direction, and let values choose your actions while the thought rides along unfused.',
    quiz: [
      {
        question: 'What does ACT mean by "fusion," and why is it the target?',
        options: [
          'Seamless merging with thoughts such that they’re experienced as literal truth and commands — targeting the RELATIONSHIP to thought, not thought content',
          'Combining multiple therapy techniques into one session',
          'The healthy integration of emotion and reason',
          'Trauma bonding between family members',
        ],
        correctIndex: 0,
        explanation:
          'The revolution: content-disputation is optional; relation-change is sufficient. A defused useless thought is a harmless passenger.',
      },
      {
        question:
          'Does defusion claim negative thoughts are inaccurate?',
        options: [
          'No — the claim is only that thoughts are events in a mind, not rulers of behavior; even accurate critiques can ride along unfused',
          'Yes — all self-critical thoughts distort reality',
          'Yes — but only thoughts about oneself are distorted',
          'It claims thoughts become false when spoken aloud in silly voices',
        ],
        correctIndex: 0,
        explanation:
          'This precision is ACT’s armor: it never argues with content, sidestepping the "but it’s TRUE!" trap entirely.',
      },
      {
        question: 'What is ACT acceptance NOT — and what is it actually?',
        options: [
          'Not approval/resignation — it is willingness to HAVE the feeling as the cost of valued movement; the struggle-against-feeling is the actual pathology',
          'Not acceptance of external events — only of pleasant ones',
          'Not a technique at all but a personality trait',
          'Not distinguishable from passive indifference',
        ],
        correctIndex: 0,
        explanation:
          'The controlling agenda amplifies and delays; willingness cancels the second-order struggle while keeping first-order feeling.',
      },
      {
        question:
          'What question operationalizes committed action in a moment of fused paralysis?',
        options: [
          '"Am I willing to have this feeling, in service of this direction?" — feeling kept, direction chosen, action taken with both aboard',
          '"How can I eliminate this feeling before proceeding?"',
          '"Is this thought rational and evidence-based?"',
          '"What would a person without this thought do?"',
        ],
        correctIndex: 0,
        explanation:
          'The willingness question reframes the deal: the feeling stops being a barrier and becomes the toll — payable, in advance of the bridge.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_leaves_stream',
      name: 'Leaves on a Stream',
      category: 'REFRAME',
      manaCost: 1,
      baseDamage: 30,
      shieldValue: 30,
      promptText:
        'I notice I’m having the thought that… There it goes. Thank you, mind. Next valued step — with it aboard.',
      targetDistortionBonus: { distortion: 'EMOTIONAL_REASONING', multiplier: 1.8 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_act_leaf_ten',
        scrollId: 'scr_act_8',
        bookTitle: 'A Liberated Mind',
        title: 'Ten Leaves at Breakfast',
        description:
          'After eating, ten slow breaths placing each arising thought on a leaf — including "this is silly" — and watching the current take it.',
        suggestedTime: '07:20',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Brief daily defusion reps train the observe-position until it’s reachable mid-fusion in live situations.',
        isScheduled: false,
      },
      {
        id: 'rtn_act_prefix_drill',
        scrollId: 'scr_act_8',
        bookTitle: 'A Liberated Mind',
        title: 'Live Prefix Drill',
        description:
          'Today, catch three fused verdicts and silently restate with the full prefix: "I notice I’m having the thought that…"',
        suggestedTime: '12:00',
        frequency: 'DAILY',
        energyTier: 'STEADY_40',
        reminderEnabled: false,
        clinicalRationale:
          'In-vivo prefix insertion is the transfer mechanism from meditation-cushion skill to kitchen-table skill.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Bus of Worthlessness Crucible',
      subtitle: 'Acting on Values While the Loudest Passenger Screams',
      deepCaseStudy:
        'Saturday morning, zoo trip promised weeks ago. You wake fused to the worst passenger: "You’re a fraud as a father — the kids would be better off with anyone else." The thought has teeth because it wears evidence: yesterday’s snap, last week’s missed assembly, your own father’s absence echoing underneath. The fused agenda says: cancel the zoo, withdraw to the bedroom, protect the kids from YOU. The thought presents this as responsible parenting. You have two hours before departure.',
      contentMarkdown: `### 🌪️ When the Passenger Sounds Like the Driver

The worthlessness passenger's genius is its disguise: it borrows the vocabulary of responsibility ("protect them from me"), the evidence of real flaws (the snap WAS real), and the tone of moral seriousness. Fused, its directive (withdraw) feels like ethics. This is the crucible: defusing WHILE the passenger cites evidence, and driving anyway.

#### ⚠️ Why Withdrawal Is the Trap:
Withdrawal delivers short-term relief (no performance anxiety) at catastrophic long-term cost: absence confirms the verdict ("see — even you know they're better off"), children absorb the rejection their father labeled protection, and the evidence-file grows by one entry. The passenger wins by costing you exactly the behaviors that would refute it. Depression's bus strategy is always the same: park the bus.

#### 🛡️ The Driving Protocol:
1. **Name the passenger formally**: "I notice I'm having the thought that I'm a fraud as a father." Full prefix, out loud if alone. The seam appears — thought as weather report, not constitution.
2. **Cross-examine the evidence WITHOUT fusing to the exoneration**: yes, you snapped; yes, you missed the assembly. Both true. Both also true: you woke up planning their zoo day. Fraudulent fathers don't ache about attendance; indifferent ones don't notice missing assemblies. Hold both columns without letting either become a verdict.
3. **Apply the willingness question**: "Am I willing to feel like a fraud AT the zoo, in service of being their father AT the zoo?" — the feeling may attend; it does not get to drive.
4. **Drive with the heckler aboard**: pack the bag, herd the kids, go. Expect the passenger to narrate throughout ("look, you're irritable already — fraud"). Let it narrate. Feed the giraffe with your daughter. The narration is weather; the giraffe is the direction.
5. **Log the refutation**: evening — one line: "Went fused-to-worthless. Went anyway. Kids fed a giraffe. Passenger still aboard; nobody harmed." Accumulating these entries is how the passenger's authority erodes — not through argument, but through repeated evidence of its irrelevance to good driving.

#### 🧬 The Deeper Algebra:
The passenger's volume is inversely proportional to your distance from valued action — it screams loudest precisely when you're approaching what threatens its worldview (that you don't care). Loudest-screaming moments are therefore DIAGNOSTIC: the intensity marks the location of what matters most. The zoo-day dread is the shape of your love for them, wearing a horror mask.`,
      advancedQuiz: [
        {
          question:
            'Why does the withdrawal directive ("protect them from me") qualify as the trap rather than responsible ethics?',
          options: [
            'Absence confirms the verdict, models rejection to the children, and removes exactly the refuting behaviors — relief purchased at the cost of the cure',
            'Withdrawal is illegal for custodial parents',
            'Children never benefit from parental rest of any kind',
            'The thought is scientifically proven false in all cases',
          ],
          correctIndex: 0,
          explanation:
            'The passenger\'s directive is self-sealing: obeying it generates the very evidence ("even you withdrew") that sustains it.',
          clinicalDistinction:
            'Real rest-recovery is scheduled and temporary; fusion-driven withdrawal is verdict-enforced and expanding.',
        },
        {
          question:
            'Why must the evidence cross-examination avoid fusing to EXONERATION too?',
          options: [
            'Swinging to "actually I’m wonderful" is the same fusion error in reverse — the goal is holding both columns as data, not installing a new verdict',
            'Positive self-belief is clinically dangerous in all forms',
            'Exoneration is impossible when evidence of flaws exists',
            'It doesn’t matter — only negative fusion causes harm',
          ],
          correctIndex: 0,
          explanation:
            'ACT targets the FUSION process, not the verdict’s polarity: "I’m wonderful" fused is equally brittle; unfused data-columns are stable.',
          clinicalDistinction:
            'The skill is holding complexity without verdict-resolution — the mature mind’s resting state.',
        },
        {
          question:
            'What does "loudest-screaming moments are diagnostic" reveal about the passenger’s intensity?',
          options: [
            'Volume spikes mark approach to what you most value — the scream is your caring wearing a horror mask, mapping what matters by where it fights hardest',
            'Loud passengers indicate severe psychiatric illness requiring hospitalization',
            'Intensity is random noise with no informational value',
            'It means the defusion techniques are failing and must be abandoned',
          ],
          correctIndex: 0,
          explanation:
            'Passengers fight hardest near the destinations that refute them; dread-intensity inversely charts value-location.',
          clinicalDistinction:
            'This inversion converts suffering into compass readings — the reframe that makes the passenger almost useful.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_bus_driver_keys',
        name: 'The Driver’s Keys',
        description:
          'Kept driving with all passengers aboard. Grants +30 Logic Edge.',
        statBoost: 'LOGIC_EDGE',
        boostAmount: 30,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_act8_1',
        scrollId: 'scr_act_8',
        bookTitle: 'A Liberated Mind',
        author: 'Steven Hayes',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying Leaves on a Stream.',
        question:
          'Mid-meeting, "everyone thinks I’m incompetent" arrives with full authority. The defused sequence?',
        options: [
          'Prefix ("notice I’m having the thought…") → let it ride → return attention to the valued action (the meeting contribution)',
          'Silently debate the thought’s accuracy with counter-evidence',
          'Excuse yourself to meditate until the thought departs',
          'Suppress the thought forcefully and fake confidence',
        ],
        correctIndex: 0,
        explanation:
          'Prefix, permit passage, proceed — the thought loses authority through neglect of its demand, not through argument.',
        clinicalInsight:
          'Debating content is fusion’s home turf; the prefix relocates the fight to terrain where you always win.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_act8_2',
        scrollId: 'scr_act_8',
        bookTitle: 'A Liberated Mind',
        author: 'Steven Hayes',
        scenarioPrompt: '⚡ Day-14 Spaced Review: The Willingness Deal.',
        question:
          'You avoid calling your aging father because guilt floods each call. The ACT framing of this avoidance?',
        options: [
          'The controlling agenda — guilt-elimination-first postpones valued contact indefinitely; willingness asks: guilt as toll, call as direction',
          'Healthy self-protection from an manipulative relative',
          'Proof the relationship should be terminated formally',
          'A boundary requiring therapeutic validation before action',
        ],
        correctIndex: 0,
        explanation:
          'Avoidance-maintenance is the tell: the agenda "feel less guilt, then call" keeps both guilt and no-call alive indefinitely.',
        clinicalInsight:
          'Ask the diagnostic question: has the feeling EVER decreased enough for the avoided action to begin?',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_shadow_9',
    title: 'The Disowned Shadow & Family Projections',
    subtitle: 'Carl Jung’s Shadow Integration in Close Relationships',
    authorOrTradition: 'Carl Jung — Analytical Psychology',
    readingMinutes: 6,
    category: 'SHADOW_INTEGRATION',
    contentMarkdown: `## The Room You Furnish Without Knowing

Jung's shadow: the disowned basement of personality — every impulse, desire, and trait deemed unacceptable to your self-image, exiled but never evicted. The formation is childhood-architectural: the boy praised only for being "the easy one" learns to evict anger; the girl rewarded for strength evicts neediness; you, whoever you were, evicted whatever threatened belonging. The eviction succeeds consciously and fails totally — the shadow doesn't dissolve, it accumulates energy in the dark and operates autonomously.

Jung's warning scales with denial: **"Everyone carries a shadow, and the less it is embodied in the individual's conscious life, the blacker and denser it is."**

## Projection: the Shadow's Only Communication Channel

A disowned trait cannot announce itself directly, so it travels by projection: perceived in OTHERS with an emotional voltage that never matches the stimulus. The tell is never the observation — it's the CHARGE:

- Irritated by a colleague's arrogance? Possibly accurate assessment. ENTRANCED by it, bringing it up weekly, needing others to agree they're awful? Check your own disowned grandiosity.
- Contemptuous of weak men? Strong candidate: exiled vulnerability.
- Enraged by a child's "laziness"? Classic projection screen: your own banished restlessness or your own exiled need for rest.

The formula: **charge = ratio of shadow-content in the perception.** Mild reactions process normally; magnetic-repulsive obsession signals home territory. Jung: projections "change the world into the replica of one's own unknown face."

## Family as Projection Screen

Intimacy is shadow's favorite theater because family members supply the most material:

- **The partner mirror**: chronic fury at a spouse's "selfishness" sometimes guards our own exiled self-interest; obsessive resentment of their "weakness" may police our own banished softness. Marriage becomes a two-person system enforcing mutual eviction — each partner hired (unconsciously) to carry the other's shadow.
- **The child assignment**: the gravest mechanism. The child who is "too sensitive," "too wild," "too dreamy" frequently wears a trait the PARENT exiled. The father who was beaten into toughness cannot tolerate his son's tears — not because tears threaten the boy, but because they parade the father's disowned boy through the living room. Jung's formulation: **"The greatest burden a child must bear is the unlived life of its parents."**

## Integration: the Adult Work

Integration is not indulging dark impulses — it's reclaiming the ENERGY and perceptual accuracy the shadow hoards:

1. **Charge inventory**: list people who provoke disproportionate reaction; extract the accused trait from each.
2. **Ownership interview** (in writing, privately): "Where — even slightly, even historically — does THIS live in me?" Every human contains every trait in some dose; honesty finds the dose.
3. **The reclamation sentence**: "I am someone who contains ambition AND laziness, gentleness AND ruthlessness — and I choose consciously which to express." Integration converts unconscious enactment into conscious menu.
4. **Projection recall in live-time**: when charge spikes mid-conflict, the trained question: "How much of what I'm seeing is actually here — and how much am I supplying from the basement?"

## What Integration Buys

Three dividends: **perception** (people become real rather than screens — you finally meet your family), **energy** (the shadow's hoarded vitality returns to circulation — many report vitality gains exceeding years of other work), and **generational interruption** (a father who integrates stops assigning his basement to his children — arguably the single most consequential act available to a parent).`,
    keyTakeaway:
      'Disproportionate charge toward others’ traits maps your own disowned shadow — inventory the charges, own the dose, integrate consciously, and stop assigning your basement to your family.',
    quiz: [
      {
        question:
          'What is the reliable signature distinguishing shadow-projection from ordinary perception?',
        options: [
          'Emotional CHARGE disproportionate to the stimulus — magnetic attraction or repulsion rather than mild assessment',
          'Whether the perceived trait is negative or positive',
          'The number of people who share the perception',
          'How recently you last interacted with the person',
        ],
        correctIndex: 0,
        explanation:
          'Accurate perceptions process at low voltage; home-shadow territory electrifies — the charge IS the map.',
      },
      {
        question:
          'What does Jung mean by the child bearing "the unlived life of its parents"?',
        options: [
          'Children receive assignments of traits their parents disowned — becoming carriers of the parent’s exiled sensitivity, wildness, or dreams',
          'Children inherit unfulfilled career expectations to complete',
          'Genetic memory transmits ancestral trauma automatically',
          'Parents’ unfinished hobbies must be taught to children',
        ],
        correctIndex: 0,
        explanation:
          'The projection-assignment mechanism: the parent’s basement becomes the child’s identity burden.',
      },
      {
        question:
          'What is integration NOT — and what is it actually?',
        options: [
          'Not impulse-indulgence — it is reclaiming shadow ENERGY and perceptual accuracy, converting unconscious enactment into conscious choice',
          'Not possible without formal Jungian analysis',
          'Not distinguishable from moral failure or sin',
          'Not relevant for people with basically decent characters',
        ],
        correctIndex: 0,
        explanation:
          'Integration expands the conscious MENU: containing ruthlessness doesn’t mean expressing it — it means choosing rather than leaking.',
      },
      {
        question:
          'In the live-time protocol, what question intercepts a charging conflict moment?',
        options: [
          '"How much of what I’m seeing is actually here — and how much am I supplying from the basement?"',
          '"Who is objectively right in this disagreement?"',
          '"What punishment fits this behavior?"',
          '"How do I make this feeling stop fastest?"',
        ],
        correctIndex: 0,
        explanation:
          'The percentage-question restores perception mid-projection without requiring full resolution of the underlying material.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_shadow_recall',
      name: 'Shadow Recall',
      category: 'FACT_CHECK',
      manaCost: 2,
      baseDamage: 40,
      shieldValue: 22,
      promptText:
        'This charge is voltage, not verdict. How much am I supplying from my own basement?',
      targetDistortionBonus: { distortion: 'PERSONALIZATION', multiplier: 1.6 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_shadow_charge_inventory',
        scrollId: 'scr_shadow_9',
        bookTitle: 'Owning Your Own Shadow',
        title: 'Monthly Charge Inventory',
        description:
          'List this month’s three most emotionally-charged judgments of others. Extract each accused trait into a private ledger.',
        suggestedTime: '21:00',
        frequency: 'WEEKLY',
        energyTier: 'STEADY_40',
        reminderEnabled: true,
        clinicalRationale:
          'Systematic charge-collection converts reactive moments into shadow-cartography instead of wasted grievance.',
        isScheduled: false,
      },
      {
        id: 'rtn_shadow_ownership_interview',
        scrollId: 'scr_shadow_9',
        bookTitle: 'Owning Your Own Shadow',
        title: 'Ownership Interview (Weekly)',
        description:
          'Take the week’s dominant accused trait and write honestly: where does this live in me — even slightly, even historically?',
        suggestedTime: '20:30',
        frequency: 'WEEKLY',
        energyTier: 'STEADY_40',
        reminderEnabled: false,
        clinicalRationale:
          'Written self-interview bypasses the quick "not me" reflex; quarterly depth matches the material’s resistance.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Son’s Tears Crucible',
      subtitle: 'When Your Child Wears Your Exiled Boy',
      deepCaseStudy:
        'Your eight-year-old cries. Again. Over everything — losing a game, a harsh word, a sad scene in a film. Something in you tightens with each sob: irritation climbing toward contempt. "Toughen up," you hear yourself snap. "Big boys don’t cry over everything." He swallows it — you watch him swallow it, the sobs jamming down into hiccups — and something about the sight satisfies and horrifies you simultaneously. Later, alone, the horror wins: you recognize the voice that said "toughen up." It took you twenty years to hear it in your head. You just installed it in his.',
      contentMarkdown: `### 🌪️ The Exiled Boy Parade

Your son's tears march your own disowned boy through the living room daily. That younger you — the one who learned tears brought mockery or worse, who jammed his own sobs down into hiccups until the mechanism became automatic — never healed. He was archived. And now an eight-year-old keeps reopening the file, and the archived boy's GUARDIAN (your inner critic, your father's inherited voice) fires at the threat: "toughen him up" actually means "make him stop reminding me."

#### ⚠️ The Three-Loss Cascade If Uninterrupted:
1. **His loss**: tears are the boy's native emotional language; forced weaning produces the adult alexithymia epidemic — men who feel only anger because it's the sole emotion with a male passport.
2. **Your loss**: each snap re-wounds the archived boy AND spends your authority on shadow-defense rather than parenting.
3. **The generational lease renewal**: he absorbs the guardian voice verbatim; his son, decades out, hears it too. The lease auto-renews across generations unless one holder defaults consciously.

#### 🛡️ The Integration Protocol:
1. **Own the charge before the next storm**: privately complete the interview — "Where do tears live in me? When did I jam them down? Who taught the mechanism?" Grieve the archived boy briefly; this is the actual work, and it's heavier than a paragraph suggests.
2. **Separate his weather from your history**: in the moment, ask silently: "What does THIS boy need RIGHT NOW — based on his temperament and situation?" His tears may indeed need boundaries sometimes (manipulation-tears exist) — but decided from HIS reality, not your archive.
3. **The bilingual response**: tears welcome AND capability-building: "Crying's fine — I cry sometimes too. AND we're going to practice saying what you need with words." Both truths, no exile required.
4. **Model your own reclaimed tears**: within the coming month, let him see you appropriately moved — a film, a memory, a frustration's edge — naming it plainly: "I'm tearing up — this song reminds me of grandpa." One demonstration outweighs a hundred lectures; boys learn male tear-permission visually.
5. **The guardian renegotiation**: when "toughen up" rises mid-cry, catch it aloud if safe: "Actually, buddy — ignore that. Cry it out. I'm here." The audible self-correction teaches the MOST important lesson: voices in the head are negotiable, not law.

#### 🧬 What Defaults Here:
Handled consciously, the boy who cries freely becomes the man who feels accurately — including the feelings you were denied. His sons inherit permission instead of a guardian. The twenty-year journey you're starting late, he begins at birth. That's not a small thing. That's the whole game.`,
      advancedQuiz: [
        {
          question:
            'What is the shadow-mechanism reading of the irritation toward the son’s tears?',
          options: [
            'The son parades the father’s own exiled boy through the house; "toughen up" is the archive-guardian defending against re-opening the father’s unhealed file',
            'The son manipulates effectively and the irritation is accurate feedback',
            'Boys’ crying naturally irritates all adult males biologically',
            'The father needs more sleep before making assessments',
          ],
          correctIndex: 0,
          explanation:
            'Charge-plus-recognition ("I recognize the voice") is the dual signature of shadow-material: his tears, YOUR history.',
          clinicalDistinction:
            'The giveaway detail: the satisfaction-and-horror cocktail — satisfaction when the guardian wins, horror at recognizing whose voice won.',
        },
        {
          question:
            'Why must "his weather vs your history" separation precede any boundary-setting?',
          options: [
            'Boundaries decided from the archive serve shadow-defense, not the child — only his actual temperament and situation can determine whether THIS crying needs guidance',
            'Boundaries should never be set with crying children under any circumstance',
            'The separation is impossible and boundaries are always contaminated',
            'Because mothers set better boundaries with crying boys',
          ],
          correctIndex: 0,
          explanation:
            'Legitimate boundary-setting exists (manipulation-tears, endurance-teaching) — but only from HIS reality; archive-derived limits are disguised self-protection.',
          clinicalDistinction:
            'The diagnostic: does this limit serve his development, or my comfort?',
        },
        {
          question:
            'What makes the AUDIBLE self-correction ("ignore that — cry it out") more valuable than silent restraint?',
          options: [
            'It teaches the meta-lesson that internal voices are negotiable law — the child watches an adult override an inherited command in real time',
            'It confuses children about parental consistency standards',
            'It has equal value to silent restraint but faster execution',
            'It undermines paternal authority required for discipline',
          ],
          correctIndex: 0,
          explanation:
            'The demonstration outclasses the content: the boy learns voices arrive uninvited AND can be declined — the master skill his father took twenty years to learn.',
          clinicalDistinction:
            'Consistency-theory objections miss the point: the inconsistency IS the lesson — commands are negotiable by consciousness.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_default_breaker_seal',
        name: 'The Default-Breaker Seal',
        description:
          'For leases terminated consciously. Grants +35 Compassion Aura.',
        statBoost: 'COMPASSION_AURA',
        boostAmount: 35,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_shadow9_1',
        scrollId: 'scr_shadow_9',
        bookTitle: 'Owning Your Own Shadow',
        author: 'Robert Johnson / Carl Jung',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying the Disowned Shadow.',
        question:
          'A colleague’s laziness enrages you disproportionately — you bring it up weekly. The shadow question?',
        options: [
          '"Where does laziness live in ME — even slightly, even historically?" Charge maps to home territory; the dose is findable',
          '"How do I get management to address this colleague?"',
          '"Why do lazy people always succeed while I work hard?"',
          '"Is my irritation proportionate to his actual output deficit?"',
        ],
        correctIndex: 0,
        explanation:
          'The ownership interview bypasses the "not me" reflex; every human contains every trait in some dose.',
        clinicalInsight:
          'Weekly-recurring grievances are projection’s favorite format — one-off annoyances rarely warrant the ceremony.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_shadow9_2',
        scrollId: 'scr_shadow_9',
        bookTitle: 'Owning Your Own Shadow',
        author: 'Robert Johnson / Carl Jung',
        scenarioPrompt: '⚡ Day-14 Spaced Review: Integration Dividends.',
        question:
          'What are integration’s three dividends, per the scroll?',
        options: [
          'Accurate perception (people become real), returned energy (hoarded vitality), and generational interruption (children escape the assignments)',
          'Weight loss, better sleep, and increased income',
          'Elimination of all negative emotions permanently',
          'Social approval, career advancement, and physical strength',
        ],
        correctIndex: 0,
        explanation:
          'Integration pays in perception, vitality and lineage — the trifecta that makes it the most consequential available parent-work.',
        clinicalInsight:
          'Many reporters describe the ENERGY dividend as exceeding years of other interventions — the basement hoards real horsepower.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_frankl_10',
    title: 'The Meaning in the Burden',
    subtitle: 'Viktor Frankl’s Logotherapy for Tired Caregivers',
    authorOrTradition: 'Viktor Frankl — Logotherapy',
    readingMinutes: 6,
    category: 'LOGOTHERAPY',
    contentMarkdown: `## The Man Who Kept His Why

Frankl arrived at Auschwitz having already lost his manuscript — the life's work, smuggled in his coat, burned on arrival. He lost his wife, parents, brother. He survived four camps by surviving precisely what broke stronger men, and emerged with psychiatry's most durable answer to suffering: **"He who has a why to live can bear almost any how"** (borrowed from Nietzsche and proven in the least metaphorical laboratory imaginable).

His observation from the camps inverted the era's psychology: the survivors were rarely the physically strongest. They were those who retained a *why* — a person to find again, a work to finish, a meaning to serve. Meaning was not comfort's decoration; it was load-bearing architecture. Frankl later founded logotherapy — the "third Viennese school" — on the proposition that humanity's primary drive is not pleasure (Freud) nor power (Adler) but **meaning**.

## The Three Sources of Meaning

Logotherapy locates meaning in three channels, all available to exhausted caregivers:

1. **Creative values**: what you give the world through work and deeds.
2. **Experiential values**: what you receive through encounter — beauty, love, presence.
3. **Attitudinal values**: the stance taken toward unavoidable suffering. Frankl's distinctive claim: when a man faces a fate he cannot change, "he has been given the opportunity... to rise above himself" — suffering transmuted into achievement through stance alone.

Caregiving exhaustion lives mostly in channel three's territory: the burdens that cannot be opted out (young children, sick parents, economic necessity) are attitudinal territory — not because the load is good, but because stance remains selectable even when circumstances aren't.

## Meaning Is Found, Not Invented — and Specific

Against the self-help habit of manufacturing affirmations, Frankl insisted meaning is **discovered** — it waits in the concrete situation. And it is relentlessly SPECIFIC: not "meaning of life" in the abstract but "the meaning of THIS hour, for THIS person." The exhausted father's question isn't "why do I exist" but "what does 6pm-with-a-screaming-toddler ask of ME, now?" — usually answered modestly: patience, presence, humor. Meaning at caregiver-scale arrives in teaspoons, not oceans.

## The Burden Reframe

Frankl's most quoted exchange: a despondent man asks "why should I not kill myself?" — Frankl replied by reframing his burdens as QUESTIONS put to him: "Why do you not commit suicide?" The man's answers revealed his meanings (science, loved ones). The method generalized: **life questions us; our answers are our lives.** The tired caregiver's 3am feeding is not merely a burden — it is a question: "Will you show up again?" — and each showing-up is an answer written in action. This reframe does not lighten the load; it TRANSFORMS the lifter. Frankl: those who came through the camps were not those who suffered least, but those who found a stance from which the suffering pointed somewhere.

## The Self-Transcendence Antidote

Frankl diagnosed modern despair as "existential vacuum" — the sense of emptiness when survival no longer demands everything. His prescription ran opposite to introspection: **self-transcendence**. Meaning arrives through dedication to something beyond the self — persons to love, work to complete. The exhausted father's fatigue, pointed at his family, is already self-transcendent structure; logotherapy's contribution is making that structure VISIBLE. The daily grind, reframed as daily answering, acquires dignity that mere coping never carries. "Life is never made unbearable by circumstances, but only by lack of meaning and purpose." The circumstances of caregiving are fixed; the meaning-layer is always available for renovation.`,
    keyTakeaway:
      'Meaning is discovered, specific and load-bearing: life questions you through your burdens ("will you show up again?") and each showing-up is an answer — self-transcendence converts fatigue from erosion into architecture.',
    quiz: [
      {
        question:
          'What did Frankl observe distinguished camp survivors — and what does it imply about meaning?',
        options: [
          'Those retaining a WHY (person, work, meaning) bore nearly any HOW — meaning is load-bearing architecture, not comfort’s decoration',
          'Physically strongest prisoners survived — brute resilience decides',
          'Survivors were randomly distributed, revealing life’s arbitrariness',
          'Those who suppressed emotion survived; feeling accelerated death',
        ],
        correctIndex: 0,
        explanation:
          'The camps functioned as an involuntary laboratory isolating one variable: retained purpose predicted endurance better than physique.',
      },
      {
        question: 'What are logotherapy’s three channels of meaning?',
        options: [
          'Creative values (deeds), experiential values (encounter/receiving), attitudinal values (stance toward unavoidable suffering)',
          'Career, family, and health — the classical trinity',
          'Pleasure, power, and purpose in descending priority',
          'Past redemption, present enjoyment, future legacy',
        ],
        correctIndex: 0,
        explanation:
          'Channel three is Frankl’s distinctive addition: stance alone can transmute unavoidable suffering into achieved meaning.',
      },
      {
        question:
          'Why does the caregiver’s question need to be SPECIFIC rather than abstract?',
        options: [
          'Meaning is discovered in the concrete situation — "what does THIS hour ask of ME" yields actionable answers; "why do I exist" yields only fog',
          'Abstract questions are banned in logotherapy sessions',
          'Specificity shortens therapy duration for billing purposes',
          'Abstraction attracts existential dread unnecessarily',
        ],
        correctIndex: 0,
        explanation:
          'Frankl insisted meaning waits in situations like answers to questions — each hour poses its own, answerable in teaspoons.',
      },
      {
        question:
          'What does the burden-reframe transform, according to Frankl’s method?',
        options: [
          'Not the load’s weight but the LIFTER — burdens reframed as questions ("will you show up?") convert coping into answering, acquiring dignity',
          'The load becomes physically lighter through attitude adjustment',
          'Burdens are revealed as illusions requiring dissolution',
          'The transformation is rhetorical with no psychological effect',
        ],
        correctIndex: 0,
        explanation:
          'The reframe preserves full realism about difficulty while changing what the difficulty MEANS — which changes the bearer.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_meaning_question',
      name: 'The Question in the Burden',
      category: 'COMPASSION',
      manaCost: 1,
      baseDamage: 28,
      shieldValue: 32,
      promptText:
        'This burden is a question: “Will you show up?” My showing-up IS the answer. That is the meaning — in teaspoons.',
      targetDistortionBonus: { distortion: 'EMOTIONAL_REASONING', multiplier: 1.5 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_frankl_hourly_question',
        scrollId: 'scr_frankl_10',
        bookTitle: 'Man’s Search for Meaning',
        title: 'The Hour’s Question (Morning Setup)',
        description:
          'Each morning, name today’s hardest hour and write what it asks of you specifically. Answer it once, deliberately, when it arrives.',
        suggestedTime: '06:30',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Pre-naming the hour’s question converts reactive endurance into deliberate answering — the logotherapy mechanism at teaspoon scale.',
        isScheduled: false,
      },
      {
        id: 'rtn_frankl_answers_ledger',
        scrollId: 'scr_frankl_10',
        bookTitle: 'Man’s Search for Meaning',
        title: 'Ledger of Answers (Weekly)',
        description:
          'Sunday: list three ways you answered life’s questions this week through showing-up. Read last week’s entry before writing.',
        suggestedTime: '20:00',
        frequency: 'WEEKLY',
        energyTier: 'STEADY_40',
        reminderEnabled: false,
        clinicalRationale:
          'Accumulated answer-evidence counters the existential vacuum’s amnesia; caregivers systematically forget their own showing-up.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Empty Nest of Achievement Crucible',
      subtitle: 'When the Goalposts Vanish and the Vacuum Speaks',
      deepCaseStudy:
        'You achieved the thing. The promotion, the house, the marathon — the goal that organized four years of discipline. Two weeks later you sit in your own backyard on a Sunday morning and feel... nothing. Not burnout — something worse: pointlessness. "Was that it?" The goals queue behind it look gray. Your kids need lunch in an hour and their chatter sounds like it’s happening behind glass. A cold thought surfaces: "Maybe I peaked. Maybe this is all there is." You are not depressed exactly. You are VACANT.',
      contentMarkdown: `### 🌪️ The Existential Vacuum Diagnosed

Frankl named this precisely decades ago: the **existential vacuum** — the emptiness that surfaces when survival no longer demands everything of us. Modern prosperity delivers it wholesale: problems solved, comforts secured, and suddenly the organism that evolved chasing meaning confronts surplus with no assignment. Sunday-morning vacancy in an accomplished life is not malfunction; it is the vacuum speaking in its native dialect.

#### ⚠️ The Three Standard Misdiagnoses:
1. **"I need a bigger goal"** — chasing vacuum-escape through escalated achievement. Works briefly; the treadmill accelerates, the vacancy returns post-victory, larger each cycle.
2. **"I must be depressed"** — pathologizing a philosophical condition. Some vacancy is situational meaning-starvation, not neurochemistry; medicating it cosmetically leaves the hunger intact.
3. **"Something is missing in my marriage/family"** — the vacuum blames proximate targets. Projecting existential emptiness onto loved ones corrodes precisely the relationships that hold the cure.

#### 🛡️ The Rediscovery Protocol:
1. **Diagnose honestly**: "This is the vacuum — a meaning-supply problem, not a happiness-delivery failure." Naming the condition prevents misdirected remediation.
2. **Audit the three channels**: Creative (what am I GIVING — is any current work truly dedicated?), Experiential (what am I RECEIVING — when did beauty or presence last register?), Attitudinal (what unavoidable difficulty awaits my stance?). Vacancy usually maps to channel starvation — typically creative and experiential simultaneously atrophied under achievement-channel monopoly.
3. **The teaspoon commitment**: select ONE concrete, other-directed dedication — mentoring one junior colleague, one weekly hour teaching your kid your craft, one sustained volunteer thread. Frankl’s mechanism: meaning arrives through self-transcendence, i.e., through DEDICATION, not through searching-for-it introspectively. The search conducted from inside the self finds only more self.
4. **Retire the scoreboard temporarily**: six weeks of zero metric-tracking. Goals resume AFTER meaning-supply is restored; sequence matters — meaning fuels goals, never vice versa.
5. **The backyard retake**: in six weeks, sit in the same spot. Expect the glass to thin. The kids' chatter returns to foreground. Nothing external changed; the receiver was repaired.

#### 🧬 The Caregiver's Hidden Advantage:
Here is the secret the vacancy conceals: exhausted fathers hold an unfair advantage in vacuum-escape — they possess ready-made self-transcendent structures (people who need them daily). The vacuum afflicts the UNNEEDED. Your fatigue is evidence of existing meaning-infrastructure; the vacancy is not its absence but its INVISIBILITY. The protocol's real work is making visible what the grind obscured.`,
      advancedQuiz: [
        {
          question:
            'Why is "I need a bigger goal" the standard misdiagnosis for existential vacancy?',
          options: [
            'Escalated achievement feeds the same treadmill — brief relief, accelerating cycles, larger post-victory vacancy; meaning SUPPLIES goals rather than deriving from them',
            'Bigger goals are dangerous and should always be avoided',
            'It isn’t a misdiagnosis — larger objectives genuinely cure emptiness',
            'Goals only work when professionally coached and monitored',
          ],
          correctIndex: 0,
          explanation:
            'Sequence error: meaning fuels goal-pursuit; goal-pursuit cannot generate meaning — the vacuum persists behind every finish line.',
          clinicalDistinction:
            'The diagnostic tell: vacancy returning after EACH achievement in an escalating series confirms channel starvation, not insufficient ambition.',
        },
        {
          question:
            'What does the three-channel audit typically reveal in achievement-dominated lives?',
          options: [
            'Simultaneous atrophy of creative-giving and experiential-receiving channels under exclusive reliance on goal-attainment for significance',
            'Overdevelopment of all channels requiring rest from meaning-making',
            'That channel theory is inapplicable to high achievers',
            'Exclusive atrophy of attitudinal stance toward suffering',
          ],
          correctIndex: 0,
          explanation:
            'Achievement monopolizes the significance pipeline; giving-beyond-self and receiving-presence wither unused, producing the specific flavor of Sunday-morning vacancy.',
          clinicalDistinction:
            'The audit’s value is directional: it names WHICH starved channel the teaspoon-commitment should feed.',
        },
        {
          question:
            'Why does the protocol claim exhausted caregivers hold an "unfair advantage" against the vacuum?',
          options: [
            'They possess ready-made self-transcendent structure — people needing them daily — so their vacancy reflects meaning’s INVISIBILITY rather than its absence',
            'Fatigue chemically protects against depressive disorders',
            'Busy people have no time to develop existential problems',
            'It doesn’t — caregivers suffer the vacuum more severely',
          ],
          correctIndex: 0,
          explanation:
            'Frankl’s self-transcendence mechanism is already architecturally present in caregiving; the repair is visibility, not construction.',
          clinicalDistinction:
            'This reframing converts fatigue from evidence-of-futility into evidence-of-meaning-infrastructure — a perceptual flip with energetic consequences.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_vacuum_compass',
        name: 'The Vacuum Compass',
        description:
          'Points toward dedication, not introspection. Grants +30 Logic Edge.',
        statBoost: 'LOGIC_EDGE',
        boostAmount: 30,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_frankl10_1',
        scrollId: 'scr_frankl_10',
        bookTitle: 'Man’s Search for Meaning',
        author: 'Viktor Frankl',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying The Meaning in the Burden.',
        question:
          'Tuesday, 17:30. Toddler melting down, dinner unstarted, work email pinging. The logotherapy move?',
        options: [
          'Name the hour’s question ("what does THIS ask of me?") → answer specifically: patience, presence, phone down — meaning in teaspoons',
          'Escape to the bathroom until the storm passes, then emerge calm',
          'Remind yourself others have it worse to induce gratitude',
          'Power through mechanically — meaning is for retreats and journals',
        ],
        correctIndex: 0,
        explanation:
          'Meaning lives in concrete hours, not abstractions; the 17:30 question has a specific answer deliverable before 18:00.',
        clinicalInsight:
          '"Powering through mechanically" is the vacuum’s training program — endurance without answering hollows the bearer.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_frankl10_2',
        scrollId: 'scr_frankl_10',
        bookTitle: 'Man’s Search for Meaning',
        author: 'Viktor Frankl',
        scenarioPrompt: '⚡ Day-14 Spaced Review: The Vacuum Prescription.',
        question:
          'Post-achievement vacancy, six weeks out. The Franklian prescription sequence?',
        options: [
          'Diagnose the vacuum → audit three channels → ONE self-transcendent dedication → suspend metrics → retake the backyard',
          'Set three bigger goals immediately to restore drive',
          'Book a vacation to reset perspective in new surroundings',
          'Begin antidepressants pending psychiatric evaluation',
        ],
        correctIndex: 0,
        explanation:
          'Dedication-first reverses the search-introspection error; metric-suspension prevents the treadmill from reasserting before supply is restored.',
        clinicalInsight:
          'Persistent anhedonia beyond situational vacancy warrants professional evaluation — logotherapy complements, never replaces, clinical care.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_sleep_11',
    title: 'The 90-Minute Ultradian Rhythm',
    subtitle: 'Circadian Biology & Stimulus Control',
    authorOrTradition: 'Matthew Walker — Sleep Science',
    readingMinutes: 6,
    category: 'CIRCADIAN_SLEEP',
    contentMarkdown: `## The Machinery You're Operating Blind

Sleep is not a uniform coma but a structured economy: 90-minute cycles cycling through light sleep (N1/N2), deep slow-wave sleep (N3 — physical restoration, immune consolidation, glymphatic brain-cleaning), and REM (emotional processing, memory integration, creativity). Early-night cycles skew deep; late-night cycles skew REM — which is why a shortened night doesn't lose "some of everything" uniformly: it amputates proportionally more REM. The chronically short-sleeping father isn't running at 80% — he's selectively bankrupting his emotional-regulation department while wondering why the kids' noise triggers disproportionate rage. (Walker's data: REM-deprived brains show ~60% amplified reactivity in the amygdala.)

## The Two-Process System

Your sleep is governed by two interacting processes:

1. **Process S (sleep pressure)**: adenosine — metabolic exhaust — accumulates from waking hour one. More hours awake, more pressure. Caffeine masks it by occupying adenosine receptors (it doesn't remove the exhaust, just blocks the gauge — hence the 15:00 crash when the blockade lifts and the accumulated debt lands at once).
2. **Process C (circadian rhythm)**: the internal ~24-hour clock, set principally by morning light, dictating alertness windows and melatonin onset.

Quality sleep requires BOTH processes aligned: full pressure tank AND correct circadian phase. The 22:00-second-wind phenomenon is usually Process C's "wake-keep" zone colliding with a pressure tank emptied prematurely by a nap or late sleep-in.

## Stimulus Control: the Non-Negotiables

Stimulus control therapy is the most evidence-supported behavioral insomnia intervention — rebuilding the bed-sleep association your habits have corrupted:

1. **Bed = sleep only.** No scrolling, no work email, no television. The brain learns associations with terrifying efficiency: bed-as-office means bed-as-alertness-trigger.
2. **The 20-minute rule**: awake in bed >20 min → LEAVE the bed, dim light, boring book, return only at drowsiness. Fighting awake-in-bed teaches the brain that beds are wrestling rings.
3. **Fixed wake time, seven days**: the single most powerful lever — anchor Process C regardless of how badly Friday night went. Weekend sleep-ins deliver Monday jet-lag (social jet lag: most workers live between time zones weekly).
4. **Caffeine curfew**: 8–10 hours before bed (half-life ~5–6 hours means a 15:00 coffee leaves a quarter active at midnight).
5. **Alcohol honesty**: alcohol is sedation, not sleep — it fragments the second half of the night, suppresses REM, and the "nightcap" trades falling asleep faster for sleeping structurally worse. Walker's line: alcohol is "the most misunderstood sleep aid in human history."
6. **Cool, dark, cave-standard**: core temperature must DROP ~1°C to initiate sleep; 18°C bedrooms, warm showers beforehand (the post-shower temperature crash simulates the descent).

## The Tired Parent Modification

Perfect sleep hygiene is a privilege of the unneeded. Parents of young children operate in triage: protect what moves the needle most. Priority order under constraint: (1) fixed wake time even after bad nights — it preserves circadian anchoring; (2) the 20-minute rule for middle-of-night wake-ups (don't wrestle in bed after a feeding); (3) strategic caffeine timing — curfew holds even in exhaustion, because 15:00 coffee steals the only sleep window you'll get. And drop the guilt-arithmetic ("I'll sleep when they're older"): chronic partial deprivation is a health input, not a badge — the amygdala-amplification finding means your sleep debt is being paid by your family's daily climate.`,
    keyTakeaway:
      'Sleep is cyclical economy, not uniform coma — anchor the fixed wake time, enforce bed=sleep-only with the 20-minute rule, hold the caffeine curfew, and treat alcohol as REM-thieving sedation rather than aid.',
    quiz: [
      {
        question:
          'Why does a shortened night disproportionately damage emotional regulation?',
        options: [
          'Late-night cycles are REM-rich; truncation selectively amputates REM, and REM loss amplifies amygdala reactivity by roughly 60%',
          'Short nights reduce total sleep linearly across all stages equally',
          'Emotional regulation depends only on total hours, not composition',
          'Deep sleep dominates late cycles and its loss causes irritability',
        ],
        correctIndex: 0,
        explanation:
          'Cycle architecture stages across the night unevenly; the tail you cut off is weighted with exactly the emotional-processing hardware.',
      },
      {
        question: 'How does caffeine actually interact with Process S?',
        options: [
          'It occupies adenosine receptors, blocking the PRESSURE GAUGE without removing the accumulating exhaust — producing the later crash when the block clears',
          'It accelerates adenosine clearance from the brain',
          'It converts deep sleep into compensatory REM sleep',
          'It has no effect on sleep pressure, only on alertness perception',
        ],
        correctIndex: 0,
        explanation:
          'The debt persists invisibly during the blockade; the 15:00 crash is the gauge unblocking, not new tiredness forming.',
      },
      {
        question: 'What makes the fixed wake time the highest-leverage single lever?',
        options: [
          'It anchors Process C (circadian phase) seven days regardless of prior night quality, preventing social jet-lag accumulation',
          'It maximizes cumulative sleep hours across the week',
          'Morning alarms train willpower that transfers to bedtime',
          'Wake times matter little compared to bedtime consistency',
        ],
        correctIndex: 0,
        explanation:
          'Phase stability outperforms duration optimization; the Monday jet-lag from weekend sleep-ins destabilizes the whole week.',
      },
      {
        question:
          'What is the correct characterization of alcohol as a sleep aid?',
        options: [
          'Sedation, not sleep: faster onset purchased at the price of fragmented second-half nights and suppressed REM',
          'Effective for onset and maintenance with minor REM costs',
          'Helpful in moderation, harmful only above two drinks',
          'Neutral — alcohol’s effects on sleep are mythological',
        ],
        correctIndex: 0,
        explanation:
          'The trade is structurally bad: you rent onset by mortgaging architecture — the part of the night that regulates your emotions next day.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_ultradian_anchor',
      name: 'Ultradian Anchor',
      category: 'ACTION',
      manaCost: 1,
      baseDamage: 24,
      shieldValue: 36,
      promptText:
        'Fixed wake. Cave-dark. Caffeine curfew held. Bed is for sleep — 20 minutes and I’m out of it.',
      targetDistortionBonus: { distortion: 'CATASTROPHIZING', multiplier: 1.3 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_sleep_fixed_wake',
        scrollId: 'scr_sleep_11',
        bookTitle: 'Why We Sleep',
        title: 'Seven-Day Fixed Wake',
        description:
          'Same wake time all week ±15 minutes, including weekends — anchored to the earliest required weekday wake.',
        suggestedTime: '06:15',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Circadian phase anchoring is the master lever; everything else in sleep hygiene inherits its stability.',
        isScheduled: false,
      },
      {
        id: 'rtn_sleep_caffeine_curfew',
        scrollId: 'scr_sleep_11',
        bookTitle: 'Why We Sleep',
        title: '14:00 Caffeine Curfew',
        description:
          'Last caffeine of any kind at 14:00 — tracked honestly including tea, cola, and pre-workout products.',
        suggestedTime: '14:00',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'With a ~5-6h half-life, a 14:00 cutoff leaves ≤25% circulating at 02:00 — protecting deep-sleep architecture.',
        isScheduled: false,
      },
      {
        id: 'rtn_sleep_twenty_rule',
        scrollId: 'scr_sleep_11',
        bookTitle: 'Why We Sleep',
        title: 'The 20-Minute Exit Rule',
        description:
          'Awake in bed past 20 minutes → dim light, paper book, another room; return only at genuine drowsiness.',
        suggestedTime: '23:30',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: false,
        clinicalRationale:
          'Prevents conditioned arousal — the bed-wrestling association that converts insomnia from episode into disorder.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The 03:00 Wake Crucible',
      subtitle: 'Middle-of-the-Night Awakening Without the Spiral',
      deepCaseStudy:
        '03:12. Eyes open, instant full alertness. The house is silent, and your mind fills it immediately: the work presentation, the odd look your brother gave Sunday, the mortgage refinance paperwork, your daughter’s teacher’s comment last week — each surfacing with 3am certainty and gravity. You check the clock. Do arithmetic ("six hours if I sleep NOW"). Check again at 03:31. The harder you chase sleep, the more awake you feel, and a familiar dread rises: tomorrow is already ruined, and the night is being wasted, and you are POWERLESS in your own bed.',
      contentMarkdown: `### 🌪️ Middle-of-Night Insomnia Architecture

The 03:00 awakening is often physiologically normal (sleep cycles surface briefly; adults transition lightly every 90 minutes) — the DISORDER is what happens next: clock-checking, arithmetic, catastrophizing, and the chase. Middle-of-night minds run a degraded chemistry: prefrontal dampening plus amygdala bias means the same worries carried at 14:00 acquire terminal gravity at 03:00. The presentation WILL be fine; the 03:00 brain simply cannot represent that.

#### ⚠️ The Three Amplifiers to Kill:
1. **Clock-viewing**: each check computes remaining-time debt and spikes arousal. Clocks are banned from the awakening protocol entirely.
2. **The chase-effort paradox**: sleep is a surrender-process, not an achievement — striving activates sympathetic tone incompatible with N1 descent. Trying harder to sleep is like relaxing harder; the verb contradicts itself.
3. **Tomorrow-catastrophizing**: "ruined tomorrow" forecasts assume tomorrow runs on tonight's panic — but one mediocre night, properly anchored (fixed wake!), degrades next-day function marginally, not terminally.

#### 🛡️ The Night Protocol:
1. **No clocks, no phone**: if a check is unavoidable, one glance maximum, no arithmetic permitted afterward.
2. **The 20-minute exit**: awake past ~20 minutes → leave the bed (dim light, paper pages, dull content — a car manual outranks a thriller). Return at drowsiness. Repeat as needed; the bed stays associated with sleep, not siege.
3. **Breath-anchor instead of sleep-chasing**: physiological sighs, then exhale-biased breathing with NO goal of sleeping — the stated goal is REST. Paradoxically, renouncing sleep is the fastest route to it (paradoxical intention, Frankl's technique, works beautifully on insomnia).
4. **The 03:00 thought parking lot**: paper and pencil by the bed. Worries get ONE line each — captured, deferred to daylight, dismissed. The mind releases loops it trusts are recorded.
5. **Tomorrow-anchoring**: one sentence: "Fixed wake at 06:15 regardless. Tomorrow is protected by the anchor, not by tonight's performance."

#### 🧬 The Reframe That Ends the War:
Nights are not exams. A quiet-resting night with reduced sleep still delivers partial restoration; a night spent fighting in bed delivers neither sleep NOR rest AND corrodes the bed association. Lay the quicksand flat. Rest is available even where sleep is late — and the sleeper who stops demanding sleep on deadline receives it sooner than the striver ever does.`,
      advancedQuiz: [
        {
          question:
            'Why is clock-checking banned outright in the night protocol?',
          options: [
            'Each check computes remaining-time debt and spikes arousal — arithmetic under 3am chemistry converts information into threat estimation',
            'Phone screens emit blue light that destroys melatonin instantly',
            'Clock-viewing is superstitious bad luck in sleep culture',
            'It isn’t banned — monitoring time aids re-entry planning',
          ],
          correctIndex: 0,
          explanation:
            'Time-remaining calculations are intrinsically arousing; the information’s cost exceeds its utility at every hour of the night.',
          clinicalDistinction:
            'Blue-light concerns are secondary here — the ARITHMETIC is the primary toxin.',
        },
        {
          question:
            'What is "paradoxical intention" and why does it outperform effortful sleep-chasing?',
          options: [
            'Renouncing the goal of sleeping (aiming only for rest) removes the performance pressure whose sympathetic arousal blocks N1 descent — surrender is the mechanism',
            'It involves forcing yourself to stay awake as punishment',
            'It is hypnosis conducted through contradictory suggestions',
            'It only works for mild, rare insomnia cases',
          ],
          correctIndex: 0,
          explanation:
            'Sleep obeys surrender-logic: the verb "try" activates exactly the physiology sleep requires the absence of.',
          clinicalDistinction:
            'Frankl pioneered the technique for anxiety generally; sleep medicine adopted it because the performance paradox is nowhere fiercer than in bed.',
        },
        {
          question:
            'What function does the bedside "thought parking lot" serve mechanistically?',
          options: [
            'Externalizing worries in one written line each signals the mind the loop is recorded — releasing the rehearsal cycle that keeps rumination alive',
            'It documents insomnia patterns for physician review',
            'Writing tires the hand sufficiently to induce drowsiness',
            'It has no known mechanism; it is pure superstition',
          ],
          correctIndex: 0,
          explanation:
            'The mind repeats what it fears forgetting; a trusted external record purchases silence cheaply.',
          clinicalDistinction:
            'One line per worry is the dosage — elaborating at 03:00 converts the parking lot into a new rumination venue.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_night_surrender_amulet',
        name: 'The Night-Surrender Amulet',
        description:
          'For those who stopped chasing. Grants +25 Vitality Aura.',
        statBoost: 'MIND_SHIELD',
        boostAmount: 25,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_sleep11_1',
        scrollId: 'scr_sleep_11',
        bookTitle: 'Why We Sleep',
        author: 'Matthew Walker',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying the Ultradian Rhythm.',
        question:
          'You slept 22:30–04:30 after a stressful day. Why does the irritability hit harder than "lost two hours" suggests?',
        options: [
          'The truncated tail was REM-weighted — selective emotional-processing amputation amplifies amygdala reactivity far beyond proportional hours',
          'Stress hormones from the day linger regardless of sleep duration',
          'Six hours is objectively sufficient; the irritability is coincidental',
          'Lost sleep affects only physical, not emotional, functioning',
        ],
        correctIndex: 0,
        explanation:
          'Night-position matters: late-cycle REM concentration means the saw cut the emotional-regulation budget specifically.',
        clinicalInsight:
          'This is why short-sleeping parents misattribute their reactivity to parenting difficulty rather than sleep architecture.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_sleep11_2',
        scrollId: 'scr_sleep_11',
        bookTitle: 'Why We Sleep',
        author: 'Matthew Walker',
        scenarioPrompt: '⚡ Day-14 Spaced Review: The Master Lever.',
        question:
          'Bad night (awake 03:00–05:00). The single most powerful morning decision?',
        options: [
          'Hold the fixed wake time — anchor Process C and protect the coming week, accepting one mediocre day over destabilized phase',
          'Sleep in maximally to recover the missing hours',
          'Double caffeine to compensate and push the curfew later',
          'Take a long morning nap after the school run',
        ],
        correctIndex: 0,
        explanation:
          'Recovery-sleeping-in purchases one better day at the price of a destabilized week; the anchor preserves phase through bad nights.',
        clinicalInsight:
          'Sleep-debt repayment is partial and interest-bearing — but phase stability is fully preservable through discipline alone.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_circadian_12',
    title: 'The Cortisol Awakening Reset',
    subtitle: 'Morning Sunlight & Circadian Photobiology',
    authorOrTradition: 'Andrew Huberman — Circadian Photobiology',
    readingMinutes: 5,
    category: 'CIRCADIAN_SLEEP',
    contentMarkdown: `## The Day Is Set Before Breakfast

Your sleep next night is largely determined by photons hitting your eyes this morning. The mechanism: specialized retinal ganglion cells (ipRGCs, containing melanopsin) project directly to the suprachiasmatic nucleus — the master clock — which times the entire hormonal cascade: cortisol pulse on waking, melatonin onset ~14–16 hours later, temperature rhythms, alertness arcs. Light is the master input; timing of that input is the master parameter.

## The Cortisol Awakening Response

Contrary to cortisol's stress-hormone reputation, a healthy morning delivers a deliberate cortisol PULSE within 30–45 minutes of waking — sharpening alertness, mobilizing energy, setting the day's immune tone. This pulse wants synchrony: bright light shortly after waking strengthens it, yielding daytime alertness AND (via the clock's arithmetic) earlier, smoother melatonin onset that night. Miss the morning light and the whole cascade drifts later — evening alertness lingers, sleep onset delays, waking groggy, morning light missed again: the delayed-phase spiral familiar to anyone who's "become a night person."

## The Protocol (Huberman-consistent, evidence-aligned)

1. **Timing**: outdoor light within 30–60 minutes of waking. Earlier is stronger; even overcast skies deliver 10,000+ lux versus indoor lighting's typical 200–500 — the cloud excuse fails photobiologically.
2. **Duration**: 5–10 minutes sunny, 15–20 overcast. No sunglasses; prescription glasses fine.
3. **Never stare at the sun** — peripheral viewing suffices; the cells you're targeting respond to ambient sky brightness, not direct fixation. Sunrise-adjacent light is ideal but "shortly after waking" outperforms "exactly at sunrise" for practical adherence.
4. **Evening counterpart**: 2–3 hours before bed, dim the environment; overhead lights off, lamps low, screens night-mode at minimum. The clock reads brightness-sum across the day: strong morning + dim evening = anchored rhythm; dim morning + bright night = the delayed spiral.
5. **Seasonal honesty**: winter mornings at high latitudes may lack adequate light at wake time — supplemental bright-light therapy lamps (10,000 lux) fill the gap, positioned peripheral to view.

## Why This Beats Willpower

The morning-light intervention is unique among alertness advice: it's a single behavior, zero willpower cost (light arrives whether you attend to it or not — you just must be outside/near a window), with cascading returns across sleep onset, morning energy, mood (light exposure shows antidepressant-adjacent effects in seasonal studies), and even afternoon coffee reduction. The chronotype-shifting literature confirms: consistent morning light advances the clock measurably within days.

## The Tired-Parent Application

Newborn-phase parents cannot control sleep duration — but CAN control light timing, which partially rescues the wrecked rhythm. The 5-minute porch stand with the 06:00 bottle, the stroller lap at dawn — these aren't lifestyle luxuries; they're the difference between a disrupted-but-anchored clock (recovers fast when the child sleeps) and a fully drifted one (recovers slowly). Anchor the light, and the sleep, when it returns, lands on a functioning clock.`,
    keyTakeaway:
      'Get outdoor light in your eyes within 30–60 minutes of waking (5–10 min sun, 15–20 overcast, no sunglasses) and dim everything 2–3 hours before bed — light timing sets the cortisol pulse, the melatonin onset, and the entire next night.',
    quiz: [
      {
        question:
          'Which cells relay morning light to the master clock, and where is that clock?',
        options: [
          'Melanopsin-containing ipRGCs in the retina → suprachiasmatic nucleus of the hypothalamus',
          'Rods and cones → visual cortex → pineal gland',
          'Skin photoreceptors → adrenal glands directly',
          'Lens cells → optic nerve → brainstem arousal centers',
        ],
        correctIndex: 0,
        explanation:
          'The ipRGC pathway is separate from vision — which is why blindfolded-bright and sighted-dim produce opposite clock signals.',
      },
      {
        question:
          'Why does the "it’s cloudy" excuse fail photobiologically?',
        options: [
          'Overcast outdoor light still delivers ~10,000+ lux versus indoor lighting’s 200–500 — an order of magnitude above the threshold the clock reads',
          'Clouds concentrate beneficial wavelengths selectively',
          'The clock responds to temperature, not light, on overcast days',
          'Indoor lighting is actually brighter than cloudy skies',
        ],
        correctIndex: 0,
        explanation:
          'Lux arithmetic ends the debate: outdoor-overcast beats indoor-bright by roughly 20-fold.',
      },
      {
        question: 'What is the correct evening counterpart of the morning protocol?',
        options: [
          'Dim the environment 2–3 hours before bed — overheads off, lamps low — because the clock integrates brightness-sum across the whole day',
          'Bright screens with blue-light filters until bedtime',
          'Total darkness immediately after sunset year-round',
          'Evening light timing is irrelevant if mornings are handled',
        ],
        correctIndex: 0,
        explanation:
          'The clock reads the whole photic day; a brilliant morning cannot outrank a fluorescent-lit 22:00.',
      },
      {
        question:
          'Why is morning light timing especially valuable for new parents?',
        options: [
          'It anchors a rhythm that sleep disruption would otherwise fully drift — so when sleep returns, it lands on a functioning clock',
          'It substitutes for lost sleep duration pharmacologically',
          'It eliminates the need for nighttime feedings adjustments',
          'It isn’t — parents should prioritize sleep duration exclusively',
        ],
        correctIndex: 0,
        explanation:
          'Duration control is unavailable in newborn season; phase control remains fully available — anchor what you can command.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_dawn_signal',
      name: 'Dawn Signal',
      category: 'ACTION',
      manaCost: 1,
      baseDamage: 26,
      shieldValue: 30,
      promptText:
        'Sky in the eyes within the hour. Tonight’s sleep was scheduled this morning.',
      targetDistortionBonus: { distortion: 'ALL_OR_NOTHING', multiplier: 1.4 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_circadian_porch_stand',
        scrollId: 'scr_circadian_12',
        bookTitle: 'Huberman Lab Protocols',
        title: 'Porch/Lap Morning Light',
        description:
          'Within 30–60 min of waking: 10 minutes outdoors — porch coffee, stroller lap, or window-side breakfast with shades up.',
        suggestedTime: '06:45',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'The single highest-leverage circadian behavior; zero willpower cost with cascading sleep-onset returns.',
        isScheduled: false,
      },
      {
        id: 'rtn_circadian_dim_switch',
        scrollId: 'scr_circadian_12',
        bookTitle: 'Huberman Lab Protocols',
        title: '21:00 Dim Switch',
        description:
          'At 21:00: overheads off, lamp-only lighting, screens night-mode. Household signal that the metabolic evening has begun.',
        suggestedTime: '21:00',
        frequency: 'EVENING',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Protects melatonin onset timing; the household-wide dim doubles as wind-down conditioning for children.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Shift-Worker’s Clock Crucible',
      subtitle: 'Anchoring a Rhythm When Life Refuses Consistency',
      deepCaseStudy:
        'Your schedule is wreckage by design: early flights some weeks, late deadlines others, a newborn resetting the night arbitrarily. Some mornings start at 04:30, others at 09:00 after a 03:00 feeding. You’ve read that consistency is king — and consistency is precisely what your life cannot deliver. The conclusion forming: "circadian protocols are for people with orderly lives. Mine is unanchorable. I’ll just be tired forever."',
      contentMarkdown: `### 🌪️ Anchoring Without a Schedule

The consistency gospel assumes schedulable lives; yours isn't. The crucible insight: **you cannot anchor the clock to a schedule, but you CAN anchor it to EVENTS.** The suprachiasmatic nucleus doesn't read calendars — it reads light relative to WAKING. Whatever time waking occurs, the light-after-waking rule holds. The protocol flexes; the principle doesn't.

#### ⚠️ The Three Drift Accelerators in Irregular Lives:
1. **Waking in darkness** (early flights, winter feeds): rising in pitch-black gives the clock zero phase-information, letting it drift later day by day.
2. **Light at the wrong pole**: bright screens during 03:00 feedings deliver wake-signals at circadian midnight, actively shifting the clock later while you nurse or rock.
3. **Nap-chaos**: irregular napping fragments the pressure-rhythm partnership, though naps themselves are not enemies.

#### 🛡️ The Event-Anchored Protocol:
1. **Light follows waking, whenever it occurs**: 04:30 wake → porch stand at 04:45 with the coffee. 09:00 wake → light at 09:15. The RULE is constant even as the clock-time varies. This alone preserves partial anchoring amid chaos.
2. **Red-night-mode discipline for night duties**: 03:00 feedings by red/dim light only (red wavelengths minimally activate melanopsin). The feeding light choice is a circadian decision, not a décor one.
3. **The one immovable anchor**: choose the SINGLE most stable weekly element — often Sunday wake-time — and guard it fiercely. Partial anchors still resist drift better than none; perfect consistency is the advertisement, imperfect consistency is the achievable product.
4. **Pressure-banking**: when wake-times vary, protect the CAFFEINE CURFEW and DIM SWITCH absolutely — these are schedule-independent levers that stabilize the evening pole regardless of morning chaos.
5. **Travel arithmetic**: crossing time zones, seek morning light at DESTINATION-local wake immediately (the light-shift literature: destination-anchored light advances/adapts the clock ~1 timezone per day).

#### 🧬 The Identity Reframe:
"You are not someone with an unanchorable life — you are someone anchoring to events instead of clocks." The flexible protocol is harder to advertise and fully livable. Chaos taxes the rhythm; it need not confiscate it.`,
      advancedQuiz: [
        {
          question:
            'Why does "anchor to events, not clocks" preserve circadian stability in unschedulable lives?',
          options: [
            'The SCN reads light relative to WAKING, not to clock-time — light-shortly-after-waking delivers phase information regardless of when waking occurs',
            'Events create psychological consistency that substitutes biologically',
            'It doesn’t — irregular lives are biologically unanchorable',
            'Event-anchoring works only for shift workers under 40',
          ],
          correctIndex: 0,
          explanation:
            'The biological receptor doesn’t consult your calendar; the light-waking pairing is the actual signal, however displaced.',
          clinicalDistinction:
            'This is why the rule survives chaos: the INPUT side is variable-proof even when the schedule side is not.',
        },
        {
          question:
            'Why is red light specifically mandated for 03:00 feedings?',
          options: [
            'Red wavelengths minimally activate melanopsin ipRGCs — delivering visibility for care without the midnight wake-signal that white/blue light would send the clock',
            'Red light is dimmer and therefore less startling to infants',
            'Red promotes melatonin production directly through the skin',
            'It is traditional advice with no photobiological basis',
          ],
          correctIndex: 0,
          explanation:
            'Melanopsin’s spectral sensitivity peaks near 480nm (blue); long red wavelengths largely bypass the clock-input channel.',
          clinicalDistinction:
            'The 03:00 light choice is among the highest-leverage decisions a new parent makes nightly.',
        },
        {
          question:
            'What is the strategic value of guarding ONE immovable weekly anchor (e.g., Sunday wake)?',
          options: [
            'Partial anchors measurably resist drift better than none — imperfect consistency is the achievable product while perfect consistency is the advertisement',
            'Weekly anchors allow full circadian reset from accumulated chaos',
            'Sunday anchoring aligns with societal scheduling norms',
            'It has no physiological value; it is purely psychological',
          ],
          correctIndex: 0,
          explanation:
            'Drift-resistance scales with anchor-frequency; one guarded anchor per week provides a periodic reset-point that pure chaos lacks.',
          clinicalDistinction:
            'The reframe matters clinically: abandoning all structure because perfection is impossible is the actual failure mode, not imperfection itself.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_event_anchor_knot',
        name: 'The Event-Anchor Knot',
        description:
          'Holds in any weather. Grants +25 Vitality Aura.',
        statBoost: 'MIND_SHIELD',
        boostAmount: 25,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_circ12_1',
        scrollId: 'scr_circadian_12',
        bookTitle: 'Huberman Lab Protocols',
        author: 'Andrew Huberman',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying the Cortisol Awakening Reset.',
        question:
          'Overcast Tuesday, 07:00 wake, office by 08:00. The correct light protocol?',
        options: [
          '10–20 minutes outdoors BEFORE the office — overcast sky still delivers ~10,000 lux versus indoor ~300; sunglasses postponed',
          'Skip it — clouds negate the protocol until a sunny day',
          'Sit by the office window after arriving; that suffices',
          'Take vitamin D instead — light only matters when sun is visible',
        ],
        correctIndex: 0,
        explanation:
          'Lux arithmetic defeats the cloud excuse; the clock reads total brightness, and overcast outdoors dwarfs any interior.',
        clinicalInsight:
          'The protocol’s power lives in its boring reliability, not its sunny-day drama.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_circ12_2',
        scrollId: 'scr_circadian_12',
        bookTitle: 'Huberman Lab Protocols',
        author: 'Andrew Huberman',
        scenarioPrompt: '⚡ Day-14 Spaced Review: The Delayed Spiral.',
        question:
          'You’ve become a "night person": can’t sleep before 01:00, wrecked mornings, evening energy. Where did the spiral start?',
        options: [
          'Likely missed morning light — the cascade drifted late (weak cortisol pulse → late melatonin → groggy wake → light missed again), and the exit is morning-light re-anchoring',
          'A genetic night-owl chronotype requiring acceptance',
          'Evening screen use exclusively — morning behavior is irrelevant',
          'Coffee timing — switch to tea and the rhythm restores itself',
        ],
        correctIndex: 0,
        explanation:
          'Delayed-phase spirals begin at the morning pole; correspondingly, the repair lever is also at the morning pole — with evening dimming as support.',
        clinicalInsight:
          'Chronotypes have genetic components, but the ACQUIRED delayed phase — most "night owls" — is light-history, not destiny.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_rupture_13',
    title: 'The Rupture and Repair Principle',
    subtitle: 'Building Secure Attachment in Imperfect Parenting',
    authorOrTradition: 'Attachment Science — Tronick, Bowlby & Ainsworth Legacy',
    readingMinutes: 6,
    category: 'PARENTING_COREGULATION',
    contentMarkdown: `## The Still-Face Experiment

Ed Tronick's famous paradigm: a mother interacts warmly with her infant, then adopts a frozen, expressionless face for two minutes. The infant's response escalates rapidly — smiling attempts, then gestures, then distress, then wailing — the baby WORKS desperately to restore the connection. When the mother resumes warmth, recovery is typically swift: the baby re-engages, often with extra joy. Tronick's radical conclusion: the experiment doesn't demonstrate how fragile infants are — it demonstrates **how good they are at repair**. Interaction is constantly rupturing and constantly mending; health is not the absence of rupture but the presence of repair.

## Secure Attachment Is Made of Repairs

Bowlby-Ainsworth attachment science, refined by decades of longitudinal work, converges on a finding that should liberate every guilt-carrying parent: secure attachment does NOT require perfect responsiveness — it requires **good-enough responsiveness with reliable repair**. Winnicott's "good enough mother" was never a license for mediocrity; it was a clinical observation that flawless parenting isn't merely unnecessary but impossible, and that the child's developmental diet consists substantially of watching rupture become reunion.

The mechanism: every repaired rupture teaches a three-part curriculum —

1. **Conflict is survivable**: the relationship bends without breaking.
2. **Repair is possible**: mistakes have a road back; skills exist for returning.
3. **Love is unconditional in practice, not just declaration**: the worst moments didn't end the bond.

Children who never witness rupture-repair — whether because parents are flawless (rare) or because ruptures go unrepaired (common) — miss the curriculum entirely. The unrepaired child learns instead: conflict is catastrophic, mistakes are unforgivable, and love is conditional on performance.

## The Anatomy of Effective Repair

Not all apologies repair. The effective arc contains identifiable components:

1. **Timing**: after the storm settles (co-regulated nervous systems required) but promptly — days-later repairs lose potency, in-storm repairs re-ignite.
2. **Specific ownership**: "I yelled when you spilled the juice — that was wrong and scary" beats "sorry if anyone felt upset." Vague apology repairs nothing; the child needs their experience NAMED by the person who caused it.
3. **No responsibility-transfer**: "I'm sorry I yelled, BUT you have to stop whining" is not repair; the "but" hands the blame back mid-handshake.
4. **The child's verdict invited**: "How was that for you?" — repair is defined by the HURT party's experience, not the harmer's discharge.
5. **Changed behavior visible next time**: repairs compound into trust only when the pattern shows movement. Perfect cessation is not required; trajectory is.

## The Parent's Side of the Ledger

Tronick's data extends to parents: rupture-repair is exhausting, and the repair capacity itself requires regulation resources. The depleted parent apologizes poorly not from character defect but from empty tanks — which reorders priorities: self-care is not competing with repair, it is its supply chain. Additionally: repair toward YOURSELF (parental guilt processed rather than ruminated) models the full arc children need — watching dad forgive dad teaches self-repair, the skill they'll use most.

## The Longitudinal Promise

Adult attachment research carries the hopeful headline: attachment patterns are stable but not permanent; "earned security" is a documented phenomenon — adults with difficult histories who develop secure functioning, typically through relationships where repair was repeatedly experienced (with partners, therapists, or their own children). The rupture-repair skill is learnable at any age. The parent learning it alongside their child is not behind schedule; they are enrolled in the same class.`,
    keyTakeaway:
      'Secure attachment is built from repaired ruptures, not flawless parenting — own specifically, invite the child’s verdict, change visibly, and know that watching you mend (including forgiving yourself) is the curriculum.',
    quiz: [
      {
        question: 'What did Tronick’s still-face experiment actually demonstrate?',
        options: [
          'Infants actively work to restore connection and repair rapidly after rupture — health lies in repair-capacity, not rupture-absence',
          'That brief maternal unresponsiveness causes lasting infant trauma',
          'That infants cannot distinguish responsive from unresponsive care',
          'That mothers must maintain perpetual emotional availability',
        ],
        correctIndex: 0,
        explanation:
          'The famous misreading: the takeaway was resilience-through-repair, not fragility-through-rupture.',
      },
      {
        question:
          'What does "good enough" parenting mean in attachment science?',
        options: [
          'Good-enough responsiveness WITH reliable repair — flawless constancy is impossible, and repaired ruptures are themselves developmental nutrition',
          'Meeting approximately 70% of the child’s needs consistently',
          'Minimal parenting sufficient to avoid intervention authorities',
          'Excellence in some domains compensating for neglect in others',
        ],
        correctIndex: 0,
        explanation:
          'Winnicott’s phrase is often weaponized for mediocrity; the clinical referent was rupture-repair reliability, not lowered standards.',
      },
      {
        question: 'Which component do ineffective apologies most commonly miss?',
        options: [
          'Specific ownership of the harm WITHOUT transferring responsibility back via "but"',
          'Promptness — apologies must occur within minutes',
          'Material restitution accompanying verbal apology',
          'Formal vocabulary matching the severity of offense',
        ],
        correctIndex: 0,
        explanation:
          'The "but" clause is the standard saboteur: it converts the apology into an opening statement for renewed prosecution.',
      },
      {
        question: 'Who defines whether a repair succeeded?',
        options: [
          'The hurt party — inviting the child’s verdict ("how was that for you?") keeps repair accountable to experience rather than discharge',
          'The repairing parent, based on sincerity felt',
          'Objective observers evaluating the interaction quality',
          'Both parties equally, by negotiated agreement',
        ],
        correctIndex: 0,
        explanation:
          'Repair is a gift defined by its recipient; self-certified apologies frequently repair only the giver’s guilt.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_rupture_repair_bridge',
      name: 'The Repair Bridge',
      category: 'COMPASSION',
      manaCost: 1,
      baseDamage: 24,
      shieldValue: 38,
      promptText:
        'I own it specifically, no "but," your verdict invited. The bridge rebuilds every time.',
      targetDistortionBonus: { distortion: 'PERSONALIZATION', multiplier: 1.6 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_rupture_same_day_repair',
        scrollId: 'scr_rupture_13',
        bookTitle: 'Attachment Science',
        title: 'Same-Day Repair Rule',
        description:
          'Any rupture today gets repaired before tonight’s bedtime story — specific ownership, no ‘but’, child’s verdict invited.',
        suggestedTime: '19:30',
        frequency: 'DAILY',
        energyTier: 'STEADY_40',
        reminderEnabled: true,
        clinicalRationale:
          'Promptness preserves repair potency; the bedtime checkpoint guarantees the arc completes before sleep.',
        isScheduled: false,
      },
      {
        id: 'rtn_rupture_self_repair',
        scrollId: 'scr_rupture_13',
        bookTitle: 'Attachment Science',
        title: 'Self-Repair Minute',
        description:
          'After parent-child repairs, extend one minute to self: "Hard moment. You owned it. Trajectory matters, not perfection."',
        suggestedTime: '20:00',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: false,
        clinicalRationale:
          'Parental self-forgiveness models the complete arc — children need witnesses of self-repair most of all.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Chronic Rupture Crucible',
      subtitle: 'When Apologies Have Stopped Meaning Anything',
      deepCaseStudy:
        '"Sorry, buddy. Daddy shouldn\'t have yelled." Your son doesn\'t even look up anymore. Fourth apology this week — the words have worn smooth with use. Last night he flinched when you entered the room, and something in your chest folded. You know the repair script; you wrote it. But the script has become part of the problem: apology-as-routine, repair-theater performed by a household that has stopped believing productions. The terrifying arithmetic: if sorry no longer means anything, what DOES?',
      contentMarkdown: `### 🌪️ Repair Inflation Economics

Apologies obey currency economics: unlimited printing devalues the denomination. Four identical apologies weekly, each attached to a repeating behavior, teach a precise lesson — **words are decoupled from consequences in this house**. The child isn't cynical; he's accurately educated. The flinch is data: trust now prices your words at near-zero.

#### ⚠️ Why Smart Parents Get Trapped Here:
The repair script works so well in single incidents that it gets deployed as a ROUTINE SOLUTION for a CHRONIC pattern. But scripts solve ruptures (episodic); chronic yelling is not episodic rupture — it's a standing condition, and standing conditions require SYSTEM redesign, not repeated micro-apologies. Using rupture-tools on chronic problems is like bailing with cups while the hull stays open.

#### 🛡️ The System Redesign Protocol:
1. **Stop the apology-printing**: declare a moratorium on routine sorrows. Tell him plainly: "More sorrys from me wouldn't mean anything. I'm changing how mornings/evenings work instead." The moratorium itself is a deposit — it signals you understand the currency's devaluation.
2. **Forensic week**: track the ruptures honestly for seven days — time of day, antecedents (hunger? transition friction? your work spillover? screen battles?), your state (sleep? overload?). Chronic ruptures cluster; clusters have causes.
3. **Structural surgery on the cluster**: apply fixes at the SOURCE — earlier dinner, transition warnings, your own 10-minute decompression buffer after work before family contact, phone parked in another room during the danger hours. Change the system the explosions occur within.
4. **One visible change, announced once**: "You know what — no phones at dinner anymore. Mine included." Children discount words and price ACTIONS; one structural change outweighs forty apologies precisely because it cannot be repeated — it either exists or doesn't.
5. **The trust rebuild timeline**: expect skepticism for weeks. The flinch fades not after the best apology but after the twentieth consecutive calm evening. Trust is rebuilt in the currency it was lost in: repeated experience, not eloquence.

#### 🧬 The Deeper Curriculum Shift:
Ironically, the chronic-rupture crucible teaches the child MORE than isolated ruptures do — if navigated honestly. Watching a father diagnose his own pattern, redesign his systems, and sustain change through skepticism is a masterclass in accountability that no single apology could deliver. The flinch-era, handled well, becomes the most educational chapter of his childhood.`,
      advancedQuiz: [
        {
          question:
            'Why does the protocol mandate STOPPING routine apologies as step one?',
          options: [
            'Apology-inflation decouples words from consequences; halting the printing signals understanding of the devaluation and forces change into the action-currency children actually price',
            'Apologies are clinically harmful and should never be used',
            'Stopping apologies saves time for behavioral correction',
            'Children find repeated apologies confusing and frightening',
          ],
          correctIndex: 0,
          explanation:
            'The moratorium is communicative: "I know sorry has stopped meaning anything" — metacognitive honesty that routine sorrows cannot convey.',
          clinicalDistinction:
            'The goal is not fewer repairs but REPRICED ones — reserved for genuine ruptures, backed by visible system change.',
        },
        {
          question:
            'What distinguishes chronic-pattern problems that make rupture-scripts inappropriate?',
          options: [
            'Standing conditions require SYSTEM redesign (source-cause surgery) — episodic tools applied to chronic patterns become repair-theater that deepens cynicism',
            'Chronic patterns indicate personality disorders beyond parenting tools',
            'There is no distinction; scripts apply universally with repetition',
            'Chronic problems require professional intervention exclusively',
          ],
          correctIndex: 0,
          explanation:
            'Category error identification: bailing cups vs hull repair — the forensic week exists to classify which problem you actually have.',
          clinicalDistinction:
            'Cluster analysis is the hinge: ruptures clustering by time/antecedent/state reveal the system to operate on.',
        },
        {
          question:
            'Why is the trust-rebuild timeline measured in "twentieth consecutive calm evenings"?',
          options: [
            'Trust prices REPEATED EXPERIENCE, not eloquence — skepticism persists through weeks of consistency, and fading flinches are the receipt of rebuilt credibility',
            'Twenty is a clinically derived magic number for attachment repair',
            'Children require exactly three weeks to forget negative events',
            'The timeline is rhetorical flourish with no basis',
          ],
          correctIndex: 0,
          explanation:
            'The flinch is conditioned expectation; conditioning erodes through disconfirming repetitions — slowly, then noticeably.',
          clinicalDistinction:
            'Expecting faster forgiveness re-centers the parent’s comfort; the child’s nervous system sets the schedule.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_system_surgeon_scalpel',
        name: 'The System Surgeon’s Scalpel',
        description:
          'Cuts causes, not symptoms. Grants +35 Mind Shield.',
        statBoost: 'MIND_SHIELD',
        boostAmount: 35,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_rupture13_1',
        scrollId: 'scr_rupture_13',
        bookTitle: 'Attachment Science',
        author: 'Tronick / Winnicott Lineage',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying Rupture and Repair.',
        question:
          'You snapped at your daughter over shoes this morning. The complete repair arc?',
        options: [
          'After-school timing → specific ownership ("I yelled about shoes — wrong and probably scary") → no ‘but’ → invite her verdict → visibly different next morning',
          'Buy her a treat on the way home to reset the mood',
          'Explain the morning’s stress context so she understands why',
          'Wait for her to bring it up when she’s ready to discuss',
        ],
        correctIndex: 0,
        explanation:
          'Context-explanations and treats substitute for the arc; the child needs HER experience named BY the person who caused it.',
        clinicalInsight:
          'The "next morning visibly different" is where trust compounds — repairs without trajectory changes are loans never repaid.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_rupture13_2',
        scrollId: 'scr_rupture_13',
        bookTitle: 'Attachment Science',
        author: 'Tronick / Winnicott Lineage',
        scenarioPrompt: '⚡ Day-14 Spaced Review: Earned Security.',
        question:
          'An adult friend with a rough childhood asks if secure relationships are possible for people like them. The research answer?',
        options: [
          'Yes — "earned security" is documented: patterns are stable but not permanent, built through relationships where repair is repeatedly experienced',
          'No — early attachment is fixed by age three permanently',
          'Only through decades of mandatory formal therapy',
          'Only if they replicate their childhood dynamics consciously first',
        ],
        correctIndex: 0,
        explanation:
          'Earned security is among attachment science’s most hopeful exports: the rupture-repair skill remains enrollable at any age.',
        clinicalInsight:
          'Parenting one’s own children is a documented earned-security pathway — the class you enroll them in, you attend simultaneously.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_compassion_fatigue_14',
    title: 'The Shield Against Compassion Fatigue',
    subtitle: 'Sustainable Empathy for Educators and Caregivers',
    authorOrTradition: 'Compassion Fatigue Research — Figley, Singer & Klimecki',
    readingMinutes: 6,
    category: 'PARENTING_COREGULATION',
    contentMarkdown: `## The Cost of Caring, Named

Charles Figley coined it: **compassion fatigue** — "the cost of caring" — the progressive depletion affecting those who absorb others' distress professionally or continuously: nurses, teachers, therapists, and the unacknowledged largest cohort, parents of struggling children. Its signature: emotional blunting (caring feels distant), irritability at the suffering you once tended, dread of caregiving moments, exhaustion that sleep doesn't touch, and the guilt-spiral ("what kind of father/teacher resents his own child's needs?").

Critically, compassion fatigue is NOT burnout's synonym. Burnout springs from workload and lack of control; compassion fatigue springs specifically from **empathic exposure** — you can burn out filing paperwork; only caring hearts catch this one. The distinction matters therapeutically: the fatigued caregiver doesn't need vacation primarily — they need a different RELATIONSHIP to others' emotions.

## Empathy Is Not One Thing

Tania Singer & Olga Klimecki's neuroscience split the concept that everyday language merges:

- **Empathic distress**: feeling WITH someone's pain such that their distress becomes yours — shared neural pain-networks firing. Motivates withdrawal (stop the shared pain the only way possible: flee the sufferer).
- **Compassion**: concern FOR the sufferer coupled with warmth-motivation to help — activating affiliation/reward networks rather than pain networks. Sustainable; energizing rather than depleting.

Their training studies showed the divergence is learnable in weeks: loving-kindness style practice shifted subjects from empathic-distress network recruitment toward compassion-network recruitment. The clinical translation: **empathic absorption is not a virtue requirement of caregiving — it's a technique error.** The nurse who catches every patient's pain is not more caring; she is less sustainable AND ultimately less helpful, because empathic-distress drives the exact withdrawal that reads as coldness.

## The Shield Doctrine

Protection is not walling-off (detachment that eventually numbs ALL feeling) — it's structured permeability:

1. **Metabolize, don't absorb**: the suffering enters, gets PROCESSED (named, bounded, responded to), and exits — like food, not like mercury. Mercury accumulates; food fuels. The processing tools: labeling ("this child'spanic is in the room"), breath-anchoring during exposure, and post-exposure discharge (movement, debrief, shower as ritual boundary).
2. **The empathy dial**: full empathic access is a TOOL deployed at specific moments (delivering hard news, connecting with a withdrawn teen), not a standing setting. Between deployments: warm concern WITHOUT shared-pain simulation. Dial discipline is trainable attention, not coldness.
3. **Recovery ratios**: exposure requires matched recovery — the dose-response arithmetic of Figley's research. A day containing heavy emotional exposure needs scheduled discharge the same day. Carrying unprocessed exposure across nights is the fatigue mechanism itself.
4. **The guilt audit**: "resenting the needs I chose to serve" signals depletion, not moral failure — fatigue distorts caring the way hunger distorts generosity. The response is replenishment, not self-condemnation (which consumes the very resources replenishment requires).

## For the Teacher and Father Specifically

Teachers: you hold thirty distressed systems daily; your nervous system is a workplace instrument requiring maintenance like any instrument — the between-class micro-recoveries, the detached lunch, the after-school ritual (covered in the Emotional Labor scroll) ARE the shield's plates.

Fathers of struggling children (illness, disability, emotional turbulence): the long haul differs from acute care — no finish line provides recovery by default. Here the shield requires STRUCTURAL features: respite that is scheduled rather than residual, peer connection with others carrying similar loads (isolation is fatigue's accelerant), and permission for the full emotional range INCLUDING the dark feelings — suppressed resentment metastasizes; aired resentment metabolizes.

The doctrine's bottom line: your caring is a renewable resource managed like any renewable — harvest rates matching regeneration rates. The caregiver who tends their own system tends everyone longer.`,
    keyTakeaway:
      'Convert empathic distress into compassion (concern-without-shared-pain), metabolize exposure rather than absorbing it, deploy the empathy dial as a tool not a standing setting, and treat guilt-spikes as depletion-data calling for replenishment — not moral verdicts.',
    quiz: [
      {
        question: 'How does compassion fatigue differ from burnout?',
        options: [
          'Burnout springs from workload/control deficits; compassion fatigue springs specifically from empathic exposure — only caring hearts catch it',
          'They are identical syndromes with different marketing names',
          'Burnout affects emotions; compassion fatigue affects only physical health',
          'Compassion fatigue is milder and requires no intervention',
        ],
        correctIndex: 0,
        explanation:
          'The etiology difference redirects treatment: vacations address workload; empathic-relationship restructuring addresses absorption.',
      },
      {
        question:
          'What distinguishes empathic distress from compassion in Singer & Klimecki’s findings?',
        options: [
          'Distress shares the pain (pain-networks fire, motivating withdrawal); compassion holds concern-with-warmth (affiliation networks, motivating help) — and the shift is TRAINABLE',
          'Distress is stronger; compassion is weaker empathy',
          'They are sequential stages every caregiver passes through',
          'The distinction applies only to clinical populations',
        ],
        correctIndex: 0,
        explanation:
          'The trainable divergence reframes caregiver technique: absorption isn’t depth of caring, it’s network misallocation.',
      },
      {
        question: 'What makes "metabolize, don’t absorb" more than a metaphor?',
        options: [
          'It specifies processing steps — labeling, breath-anchoring, post-exposure discharge — that move distress THROUGH the system versus letting it accumulate',
          'It means avoiding all exposure to suffering',
          'It is poetic language without operational content',
          'It refers to nutritional interventions for stress resilience',
        ],
        correctIndex: 0,
        explanation:
          'Mercury vs food: the accumulation model explains fatigue; the metabolism model supplies its prevention protocol.',
      },
      {
        question:
          'What does the guilt audit instruct regarding resentment toward those you serve?',
        options: [
          'Read it as depletion-data — fatigue distorts caring like hunger distorts generosity — and respond with replenishment, since self-condemnation consumes the needed resources',
          'Recognize it as moral failure requiring stricter self-discipline',
          'Interpret it as evidence you’re in the wrong vocation',
          'Suppress it — dark feelings must never be acknowledged',
        ],
        correctIndex: 0,
        explanation:
          'The audit inverts the guilt-spiral: the resentment is a fuel-gauge reading, and punishing the gauge never fills the tank.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_empathy_dial',
      name: 'The Empathy Dial',
      category: 'COMPASSION',
      manaCost: 1,
      baseDamage: 26,
      shieldValue: 36,
      promptText:
        'Concern without absorption. Warmth without shared pain. Dial up at the moment, down between moments.',
      targetDistortionBonus: { distortion: 'EMOTIONAL_REASONING', multiplier: 1.4 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_cf_discharge_ritual',
        scrollId: 'scr_compassion_fatigue_14',
        bookTitle: 'Figley — Compassion Fatigue',
        title: 'Same-Day Exposure Discharge',
        description:
          'After heavy emotional days: 20-minute walk/shower/debrief ritual marking the exposure as PROCESSED before evening family time.',
        suggestedTime: '17:00',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Unprocessed overnight exposure is the fatigue mechanism itself; same-day discharge closes the absorption window.',
        isScheduled: false,
      },
      {
        id: 'rtn_cf_loving_kindness',
        scrollId: 'scr_compassion_fatigue_14',
        bookTitle: 'Klimecki Training Studies',
        title: 'Compassion Network Practice',
        description:
          'Five minutes of loving-kindness style practice: directing warmth-wishes toward today’s most difficult person (student, child, self).',
        suggestedTime: '21:30',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: false,
        clinicalRationale:
          'Directly trains the compassion-network recruitment shown to shift caregivers from distress-reactivity to sustainable concern.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Numb Caregiver Crucible',
      subtitle: 'When You Catch Yourself Feeling Nothing',
      deepCaseStudy:
        'Your son scraped his knee badly at the park — blood, tears, the full production. You cleaned it, bandaged it, said the right words. Driving home you realize: you felt NOTHING. The sight of his blood produced paperwork-behavior, not parental panic. Scrolling back through recent months, you can\'t locate the last time another\'s pain actually moved you — students\' struggles, colleagues\' losses, your wife\'s hard week: noted, handled, unfelt. Quietly, the verdict forms: "I\'ve become cold. My family deserves someone who feels. I\'m failing at the one thing that matters."',
      contentMarkdown: `### 🌪️ The Numbness Misread

Numbness arrives at fatigue's late stage and gets misread as its opposite: coldness of character. The misreading launches the cruelest loop in caregiving: numbness → guilt → self-attack → further depletion → deeper numbness. The clinical truth inverts it: **numbness is not the absence of caring capacity — it is the protective anesthesia the psyche applies when caring has outpaced regeneration for too long.** The body doesn't stop feeling from cruelty; it stops feeling from overflow.

#### ⚠️ Why the Anesthesia Exists:
Chronic empathic overload without discharge teaches the nervous system that feeling equals flooding. The dampening is learned self-protection — clumsy, indiscriminate (it numbs joy alongside pain), but intelligently motivated. Attacking the anesthesia attacks the survivor mechanism.

#### 🛡️ The Recommissioning Protocol:
1. **Reclassify the symptom**: say it explicitly — "I am not cold; I am overloaded. The numbness is my system’s tourniquet." The reclassification alone reduces the guilt-loop's suction.
2. **Audit the exposure ledger**: recent months — what entered without discharge? Illness seasons, work crises, others' traumas absorbed at full bandwidth? Map the overload honestly; numbness always has an invoice trail.
3. **Schedule regeneration BEFORE feeling-return**: the mistake is waiting to feel like caring again, then re-engaging. Sequence reverses: rest first (protected, guilt-free, scheduled), feeling returns SECOND — typically reported as sudden, weeks later, often triggered unexpectedly (a film, a stranger's kindness). The dam breaks on its own schedule.
4. **Micro-feeling reconnaissance**: during the dry spell, notice micro-flickers without demanding full emotion — a half-smile at the son's joke, two seconds of sunset attention. These flickers are the thaw's leading edge; celebrating them (rather than mourning their smallness) invites more.
5. **Tell one safe person**: isolation convinces you the numbness is monstrous and unique. Spoken aloud to a partner or friend — "I've been running on autopilot and can't feel much" — it becomes what it actually is: a common occupational injury with a known recovery arc.

#### 🧬 The Return of Feeling:
Caregivers who navigate this crucible report a changed relationship to their own sensitivity: the post-numbness caring is deliberately structured — dials, metabolization, discharge rhythms — rather than the naive full-open configuration that led to the crash. The anesthesia episode, properly processed, upgrades the entire caring apparatus for the decades ahead.`,
      advancedQuiz: [
        {
          question:
            'Why is reclassifying numbness as "protective anesthesia" the protocol’s first move?',
          options: [
            'The guilt-loop (numbness→self-attack→depletion→deeper numbness) runs on the coldness-misreading; reclassification cuts the loop’s power at its interpretive source',
            'Reclassification magically restores feeling through positive thinking',
            'Coldness and numbness are identical, so the label is cosmetic',
            'It excuses caregivers from addressing the underlying overload',
          ],
          correctIndex: 0,
          explanation:
            'The interpretation drives the loop: "I am cold" mandates self-punishment; "I am overloaded" mandates regeneration — different treatments entirely.',
          clinicalDistinction:
            'The tourniquet framing also prescribes correctly: tourniquets come OFF gradually, after the bleeding (overload) is addressed.',
        },
        {
          question:
            'Why must regeneration be SCHEDULED BEFORE expecting feeling to return?',
          options: [
            'Feeling-capacity is downstream of resource-levels — waiting to "feel like caring again" inverts the causality; rest precedes thaw, which often arrives suddenly weeks later',
            'Scheduling rest is easier than scheduling emotional recovery',
            'Feeling never actually returns; caregivers must function without it',
            'It shouldn’t — feeling should be willed back through practice',
          ],
          correctIndex: 0,
          explanation:
            'The anesthesia lifts on the body’s timetable once the overload clears — micro-flickers mark the thaw’s leading edge before full feeling resumes.',
          clinicalDistinction:
            'Celebrating micro-flickers rather than mourning their smallness is what invites the thaw onward.',
        },
        {
          question:
            'What does disclosing the numbness to one safe person accomplish?',
          options: [
            'Isolation convinces you the state is monstrous and unique; disclosure converts it to a common occupational injury with a known recovery arc',
            'It transfers the emotional labor to the listener',
            'It creates accountability pressure that speeds recovery',
            'It risks professional consequences and is contraindicated',
          ],
          correctIndex: 0,
          explanation:
            'The secrecy amplifies shame; naming it externally re-files the experience from character-verdict to injury-report.',
          clinicalDistinction:
            'Choose the listener for safety, not proximity — the disclosure requires a witness, not an evaluator.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_thaw_lantern',
        name: 'The Thaw Lantern',
        description:
          'Lights again after the longest freeze. Grants +35 Compassion Aura.',
        statBoost: 'COMPASSION_AURA',
        boostAmount: 35,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_cf14_1',
        scrollId: 'scr_compassion_fatigue_14',
        bookTitle: 'Figley — Compassion Fatigue',
        author: 'Charles Figley × Singer/Klimecki',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying the Shield Against Compassion Fatigue.',
        question:
          'A student’s family crisis hits you hard — you’re tearing up in the corridor. Sustainable processing sequence?',
        options: [
          'Allow the moment → label it → breath-anchor → discharge later same day (walk/debrief/shower) → return tomorrow with dial-set concern, not absorption',
          'Suppress immediately — professionals don’t cry at school',
          'Go home sick — such exposures are intolerable hazards',
          'Absorb it fully — feeling everything is the job’s sacred duty',
        ],
        correctIndex: 0,
        explanation:
          'The middle path: full access AT the moment of need, metabolized afterward, dial-adjusted on return — sustainable concern without chronic absorption.',
        clinicalInsight:
          'Suppression and absorption are twin failure modes — both end at numbness, via different roads.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_cf14_2',
        scrollId: 'scr_compassion_fatigue_14',
        bookTitle: 'Figley — Compassion Fatigue',
        author: 'Charles Figley × Singer/Klimecki',
        scenarioPrompt: '⚡ Day-14 Spaced Review: The Guilt Gauge.',
        question:
          'You catch yourself dreading your disabled brother’s weekend visits. The guilt audit reading?',
        options: [
          'Depletion-data, not moral verdict: fatigue distorts caring like hunger distorts generosity — respond with replenishment (respite, peer support), not self-condemnation',
          'Confirmation you’re fundamentally selfish and unsuited to caregiving',
          'Proof the visits should end permanently for everyone’s sake',
          'A signal to hide the dread and perform enthusiasm harder',
        ],
        correctIndex: 0,
        explanation:
          'The audit converts the guilt-spiral’s fuel into diagnostics: the dread measures your tank, not your soul.',
        clinicalInsight:
          'Long-haul caregivers (no finish line) need STRUCTURAL respite — scheduled, not residual — or the gauge pins on red permanently.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_gottman_15',
    title: 'The 5:1 Magic Ratio in Marriage',
    subtitle: 'Disarming Relational Decay and The Four Horsemen',
    authorOrTradition: 'John Gottman — The Seven Principles',
    readingMinutes: 6,
    category: 'PARENTING_COREGULATION',
    contentMarkdown: `## The Laboratory That Predicts Divorce

Gottman's "Love Lab" observed thousands of couples in conflict, measuring micro-expressions, heart rates, and interaction sequences — then followed them for years. The finding that made his career: marital stability is predictable from a simple ratio observable in fifteen minutes of conflict footage. Stable couples maintained roughly **five positive interactions for every negative one during conflict**; couples heading for divorce operated nearer 0.8:1. Positivity wasn't the absence of negativity — fighting couples fought plenty — it was positivity woven THROUGH the fighting: the joke mid-argument, the squeezed hand, the "okay, fair point."

## The Four Horsemen: the Negative Quartet

Gottman identified four negative patterns so predictive he named them after apocalypse riders — each with a documented antidote:

1. **Criticism** — attacking CHARACTER rather than behavior ("you're so lazy" vs "the trash didn't go out"). *Antidote: gentle startup + complaint-as-positive-need.* "I feel X about THIS situation; I need Y" replaces "what's wrong with you."
2. **Contempt** — the single strongest divorce predictor: sarcasm, eye-rolling, mockery, disgust. Communicates superiority. *Antidote: building a culture of appreciation* — deliberately cataloguing and voicing partner-positives daily; contempt cannot survive in a mind rehearsing admiration.
3. **Defensiveness** — counter-attacking or victim-posture, escalating rather than receiving. *Antidote: accepting (any!) responsibility* — even 2%: "you're right, I did forget to call." Ownership is contagion; one drop often dissolves the standoff.
4. **Stonewalling** — shutdown, monosyllables, withdrawal (typically physiological flooding — covered in The Flooded Brain scroll). *Antidote: the structured timeout with promised return.*

The horsemen travel together: criticism invites defensiveness, both breed contempt, contempt triggers stonewalling. Interrupting any rider slows the caravan; the entry-point lever is nearly always **startup** — how the first three minutes of a complaint unfold predicts its trajectory (96% of conversation-endings are predictable from their first minutes).

## The Positive Account: Beyond Absence of War

The ratio's positive side deposits into what Gottman maps as the "Sound Relationship House":

- **Love maps**: detailed current knowledge of your partner's inner world (stressors, joys, current work enemies). Post-kids drift makes maps stale — updating questions ("what's your biggest current headache?") are maintenance, not luxury.
- **Fondness & admiration system**: the deliberate rehearsal of partner-positives. This is the horsemen-prevention infrastructure: contempt finds no foothold in a mind running a daily appreciation scan.
- **Turning toward bids**: the micro-connections (fully covered in The Bids scroll) — the 86% vs 33% statistic lives here.

## The Repair-Attempt Finding

Among Gottman's most hopeful discoveries: what separated stable from divorcing couples was NOT the absence of botched conversations — it was **repair-attempt efficacy**: the ability of any gesture ("hey, we're doing the thing again," a silly face) to de-escalate. Failed marriages weren't lacking attempts; the attempts had stopped LANDING because contempt had poisoned the receiver. The practical instruction: deploy repair attempts EARLY and OFTEN in conflict, and — equally — honor attempts when they arrive: catching your partner's olive branch is half the skill.

## The Arithmetic Discipline

The ratio converts sentiment into practice: track nothing, but DEPOSIT deliberately — appreciation voiced aloud daily, bids caught, affection initiated, humor deployed during friction. Five positives per negative is not a mood; it is a maintenance schedule. Couples who treat the ratio as accounting outlast couples who treat connection as weather.`,
    keyTakeaway:
      'Maintain 5:1 positive-to-negative interactions especially DURING conflict — replace the four horsemen (criticism→gentle startup, contempt→appreciation culture, defensiveness→partial ownership, stonewalling→structured timeouts) and honor every repair attempt while it can still land.',
    quiz: [
      {
        question: 'What ratio characterized stable couples during CONFLICT specifically?',
        options: [
          '~5:1 positive-to-negative — positivity woven through the fighting, not the absence of fighting',
          '1:1 — balanced exchanges indicate healthy conflict',
          '10:0 — stable couples avoid all negativity entirely',
          'The ratio mattered only in daily life, not during arguments',
        ],
        correctIndex: 0,
        explanation:
          'The finding’s surprise: conflict itself wasn’t discriminating — the positivity INSIDE conflict was (jokes, touches, concessions).',
      },
      {
        question: 'Which horseman is the single strongest divorce predictor — and its antidote?',
        options: [
          'Contempt (superiority communicated) — antidoted by building a culture of appreciation',
          'Criticism — antidoted by never raising complaints',
          'Stonewalling — antidoted by mandatory immediate reconciliation',
          'Defensiveness — antidoted by hiring a mediator',
        ],
        correctIndex: 0,
        explanation:
          'Contempt’s dominance explains why appreciation-practice is prevention infrastructure, not sentimentality.',
      },
      {
        question:
          'What does the 96%-predictability finding about conversation beginnings imply practically?',
        options: [
          'Startup governs trajectories — the first three minutes of a complaint largely decide where it lands, making gentle-startup the highest-leverage intervention point',
          'First impressions of partners determine marital success',
          'Couples should avoid beginning difficult conversations altogether',
          'Conversation outcomes are random regardless of openings',
        ],
        correctIndex: 0,
        explanation:
          'Harsh startup virtually guarantees horsemen-recruitment; soft startup is the cheapest point on the entire curve to intervene.',
      },
      {
        question: 'What made repair attempts FAIL in divorcing couples?',
        options: [
          'Attempts still occurred but stopped LANDING — contempt had poisoned receivership, so olive branches were unread as peace offerings',
          'Divorcing couples never attempted repair at all',
          'Repair attempts only work when professionally facilitated',
          'Failed attempts were always too subtle to be noticed',
        ],
        correctIndex: 0,
        explanation:
          'The bidirectional skill: deploy attempts early AND catch your partner’s — honoring incoming branches is half the practice.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_gottman_ratio',
      name: 'The 5:1 Depositor',
      category: 'COMPASSION',
      manaCost: 1,
      baseDamage: 28,
      shieldValue: 34,
      promptText:
        'Deposit now: one appreciation voiced, one bid caught, one hand squeezed mid-friction. Five to one is a schedule, not a mood.',
      targetDistortionBonus: { distortion: 'MIND_READING', multiplier: 1.5 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_gottman_appreciation_daily',
        scrollId: 'scr_gottman_15',
        bookTitle: 'The Seven Principles',
        title: 'Voiced Appreciation Ritual',
        description:
          'Once daily, name one specific partner-quality or action OUT LOUD to them — specific beats generic ("thank you for handling the school call").',
        suggestedTime: '18:45',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Builds the fondness-and-admiration infrastructure that renders contempt unhospitable — the horsemen-prevention layer.',
        isScheduled: false,
      },
      {
        id: 'rtn_gottman_map_update',
        scrollId: 'scr_gottman_15',
        bookTitle: 'The Seven Principles',
        title: 'Love-Map Update Question',
        description:
          'Weekly, ask one current-inner-world question: biggest headache? looking forward to? Update the map; people change faster than we notice.',
        suggestedTime: '21:00',
        frequency: 'WEEKLY',
        energyTier: 'STEADY_40',
        reminderEnabled: true,
        clinicalRationale:
          'Stale love-maps underlie the post-kids drift; scheduled updates prevent discovering your partner through divorce papers.',
        isScheduled: false,
      },
      {
        id: 'rtn_gottman_startup_check',
        scrollId: 'scr_gottman_15',
        bookTitle: 'The Seven Principles',
        title: 'Startup Pre-Flight (Complaint Drafting)',
        description:
          'Before raising any complaint: rewrite it as feeling-about-situation + positive-need. Deliver gently or postpone until gentle is possible.',
        suggestedTime: '12:00',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: false,
        clinicalRationale:
          'Startup drafting exploits the 96% predictability finding: the cheapest intervention point is the first three minutes.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Horsemen Quartet Crucible',
      subtitle: 'All Four Riders in One Tuesday Evening',
      deepCaseStudy:
        'She opens with: "You NEVER organize anything for this family. I have to think of EVERYTHING while you just show up and get thanked." (Criticism — character-level, "never/everything.") Your jaw sets: "Oh sure, because your precious schedule is the only one that counts around here." (Defensiveness + contempt brewing.) Her eyes roll — actually roll. (Contempt, returned.) "Fine. Do it your way. I\'m going to garage." (Stonewall.) Door closes. You stand in a kitchen that smells like burnt garlic, heart hammering, replaying her opening line, composing rebuttals. The kids are watching cartoons one room away, and you both know they heard everything.',
      contentMarkdown: `### 🌪️ The Full Quartet in Fourteen Minutes

This transcript is Gottman's lab footage dramatized — every rider present, each recruiting the next. The crucible skill: identifying WHERE the cascade became inevitable (spoiler: it wasn't), and what each participant's single move could have rerouted.

#### ⚠️ Reading the Cascade Frame-by-Frame:
- **Her startup** ("you NEVER... EVERYTHING... while you just show up") — harsh startup, character-attack, absolutes. THIS was the highest-leverage moment in the entire evening: a softened version ("I'm drowning in logistics alone and I need help — can we look at the calendar together?") likely produces a completely different Tuesday.
- **His counter** ("oh sure, because YOUR schedule...") — defensiveness via counter-attack, escalating to contempt-adjacent sarcasm. His reroute moment: ANY ownership fraction — "you're right that I've been coasting on logistics. That's not fair to you."
- **Her eye-roll** — contempt, the strongest predictor, usually deployed when feeling unheard across MANY previous attempts (eye-rolls rarely debut in isolation; they have a history).
- **His exit** — stonewalling under flood (heart rate surely >100), plus the rebuttal-composing that guarantees non-listening on return.

#### 🛡️ The Mid-Cascade Rescue Protocol:
1. **Someone must name the pattern FIRST**: any rider can be interrupted by its NAME — "Okay, we're doing the thing. I just counter-attacked you and that wasn't fair." Naming breaks fusion; Gottman's repair-attempt research says even clumsy naming works IF the receiver honors it.
2. **The receiver's half**: when the repair attempt comes — possibly grudging, possibly wrapped in residual sarcasm — CATCH IT. "Yeah. We did do the thing. I'm flooded; twenty minutes?" Honoring attempts is the skill that keeps them coming.
3. **The timeout with return**: garage-exits need return-times: "Twenty minutes, then we finish this with the calendar in front of us."
4. **The kids' debrief**: children heard the cascade; they also get the repair: "Mom and Dad argued about family logistics. We figured it out. Arguing happens; figuring-out happens too." The witnessed repair is worth more than the unwitnessed harmony.
5. **The startup autopsy (later, calm)**: the REAL conversation — hers about the actual load imbalance (valid! deserving of a real solution: domain ownership, per the Mental Load scroll), his about how the delivery landed. Separately sequenced, both get their hearing.

#### 🧬 The Hopeful Arithmetic:
Gottman's data is blunt about prognosis BUT: horsemen are habits, habits are trainable, and couples who practice the antidotes measurably shift their ratios within months. The quartet visited this kitchen; it was not summoned by destiny. It was recruited line-by-line — which means it can be un-recruited the same way.`,
      advancedQuiz: [
        {
          question:
            'Why is HER startup identified as the evening’s highest-leverage moment rather than HIS counter-attack?',
          options: [
            'The 96% predictability finding locates trajectory-determination in the first minutes — harsh startup recruits the subsequent riders; later interruptions fight uphill against recruited momentum',
            'Because women bear responsibility for emotional tone in relationships',
            'Because his counter-attack was actually justified and needs no examination',
            'It isn’t — his exit was the decisive destructive moment',
          ],
          correctIndex: 0,
          explanation:
            'Leverage-analysis is temporal, not moral: earliest-controllable point wins. Both parties own their riders; the physics favor early interception.',
          clinicalDistinction:
            'Assigning leverage to her startup does NOT excuse his counter-attack — it identifies where EITHER party’s skill pays most.',
        },
        {
          question:
            'What does the eye-roll’s HISTORY imply that changes its interpretation?',
          options: [
            'Contempt rarely debuts in isolation — the eye-roll encodes accumulated unheard bids, signaling that the real repair must address the underlying listening-deficit, not just tonight’s manners',
            'Eye-rolls are involuntary and carry no relational information',
            'It proves she no longer loves him and divorce is inevitable',
            'It means she was raised disrespectfully and can’t help it',
          ],
          correctIndex: 0,
          explanation:
            'Contempt-as-symptom: the antidote (appreciation culture) works precisely because it addresses the famine of felt-hearing beneath the contempt.',
          clinicalDistinction:
            'Treating the eye-roll as rudeness-to-be-policed misses the message; treating it as DATA redirects to the actual wound.',
        },
        {
          question:
            'Why does the kids’ debrief matter more than protecting them from ever hearing conflict?',
          options: [
            'Witnessed REPAIR teaches conflict-survivability — children need demonstrations that arguing resolves, not the false lesson that harmonious families never disagree',
            'Children are unaffected by parental conflict they overhear',
            'Debriefs transfer the emotional burden onto the children',
            'They don’t — shielding children from conflict is the evidence-based priority',
          ],
          correctIndex: 0,
          explanation:
            'The rupture-repair principle extends maritally: conflict is inevitable, repair is the curriculum, and the witnessed version teaches what silence cannot.',
          clinicalDistinction:
            'Destructive conflict (contempt-heavy, unresolved) harms; conflict-followed-by-visible-repair is developmentally nutritious.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_horseman_tamer_bridle',
        name: 'The Horseman-Tamer’s Bridle',
        description:
          'Names riders mid-gallop. Grants +30 Mind Shield, +15 Compassion Aura.',
        statBoost: 'MIND_SHIELD',
        boostAmount: 30,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_gott15_1',
        scrollId: 'scr_gottman_15',
        bookTitle: 'The Seven Principles',
        author: 'John Gottman',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying the 5:1 Magic Ratio.',
        question:
          'You’re about to say "you never listen to me about the kids’ schedule." Rewrite per gentle startup:',
        options: [
          '"I feel overwhelmed managing the schedule alone lately. I really need us to sync on it — can we look at next week together?"',
          '"You never listen — this is exactly what I meant last month too."',
          '"Whatever, I’ll just handle everything myself as usual."',
          'Say nothing and hope she notices the calendar herself',
        ],
        correctIndex: 0,
        explanation:
          'Feeling-about-situation + specific positive-need, absolutes deleted: the complaint survives; the character-attack doesn’t board.',
        clinicalInsight:
          '"Never/always" in complaints is horseman-recruitment language — flag and translate.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_gott15_2',
        scrollId: 'scr_gottman_15',
        bookTitle: 'The Seven Principles',
        author: 'John Gottman',
        scenarioPrompt: '⚡ Day-14 Spaced Review: Repair Reception.',
        question:
          'Mid-argument, your wife makes an awkward joke — obviously a peace branch. The ratio-discipline response?',
        options: [
          'CATCH IT — laugh, take the branch, soften: "Okay okay, fair. Let me try that again without the artillery." Honoring attempts keeps them coming',
          'Continue the argument — the issue still needs resolving first',
          'Point out that joking during serious talks is dismissive',
          'Ignore it and press your point harder while you have momentum',
        ],
        correctIndex: 0,
        explanation:
          'Attempt-reception is the neglected half of the repair skill: branches honored today are branches offered tomorrow; branches ignored teach silence.',
        clinicalInsight:
          'Gottman’s divorcing couples weren’t short on attempts — they were short on RECEIVERSHIP. Catch the branch.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_nvc_16',
    title: 'The Non-Violent Communication Matrix',
    subtitle: 'Expressing Needs Without Blame or Demands',
    authorOrTradition: 'Marshall Rosenberg — NVC',
    readingMinutes: 6,
    category: 'CBT_REBT',
    contentMarkdown: `## Life-Alienating Language

Rosenberg spent decades mediating everything from marital disputes to civil wars, and concluded that everyday language contains embedded violence: **judgments disguised as observations, feelings blamed on others, and demands disguised as requests.** "You're so inconsiderate" feels like communication; structurally it's diagnosis-plus-conviction of a person who never consented to analysis. NVC's promise: a four-step grammar that transmits your experience without prosecuting theirs — and thereby actually GETS HEARD.

## The Four Components

1. **OBSERVATION (no evaluation)**: state what a camera would record. "You've been on your phone since dinner started" (observable) versus "you never pay attention to us" (evaluation wearing observation's clothing). Evaluations trigger defense instantly; cameras don't argue.

2. **FEELING (no thoughts/blame)**: name YOUR emotion. "I feel lonely" versus "I feel like you don't care" — the latter is a thought ABOUT them masquerading as a feeling ("I feel that you're wrong" contains zero feelings). The feeling vocabulary matters: frustrated, lonely, discouraged, worried, hurt. False-feelings ("disrespected, betrayed, manipulated") smuggle blame-verbs in feeling-costume — they describe what YOU think THEY did, not what stirs in YOU.

3. **NEED (the universal underneath)**: the revolutionary step — trace the feeling to a UNIVERSAL human need (connection, respect, support, rest, autonomy, play). Needs are where humans meet: your wife can't argue with "lonely" + "need for connection"; she can argue all night with "you don't care about this family."

4. **REQUEST (specific, present, doable — not demand)**: a request differs from a demand in ONE crucial way: **you accept "no" without punishing it.** "Would you be willing to phone-free dinners Tuesday and Thursday?" is checkable, doable, and refusal-compatible. "Start caring about this family" is a demand in request's clothing — uncheckable, undeliverable, refusal-punished.

## The Full Sentence, Assembled

"When I see you on your phone through dinner (O), I feel lonely and disconnected (F), because I'm needing connection and shared time with you (N). Would you be willing to make Tuesday and Thursday dinners phone-free? (R)"

Compare its probable reception to "you're addicted to that thing" — same underlying grievance, opposite landing mechanics. The formula sounds stilted initially; Rosenberg's answer: fluency comes from ~50 reps, and the STILT is temporary while the RESULTS are structural.

## Empathic Reflection: the Other Direction

NVC is bidirectional; receiving criticism through the matrix matters as much as emitting it. Translation practice: hear "you're selfish and never help around here" and decode: O (probably: specific undone chores), F (their exhaustion/resentment), N (support, partnership, rest), R (buried inside, needs excavating: "would it help if I owned the laundry entirely?"). Reflecting the decoded version — "sounds like you're exhausted and needing real partnership — what would take the most weight off?" — de-escalates before negotiation begins. People fight to be HEARD; reflection hears them, and half of every fight dissolves upon receipt.

## The Jackal and the Giraffe

Rosenberg's mascots: the jackal (head low, attacking, competitive) and the giraffe (largest heart of any land animal, highest viewpoint). NVC fluency isn't jackal-elimination — jackals arise automatically under stress — but giraffe-translation SPEED: the practiced ability to convert jackal output (yours and theirs) into giraffe grammar in real-time. The masters still feel the jackal; they've simply stopped letting it do the talking.`,
    keyTakeaway:
      'Observation without evaluation, feelings without blame, universal needs beneath the feelings, requests that accept "no" — and bidirectionally: translate every jackal (yours and theirs) into giraffe grammar before it does the talking.',
    quiz: [
      {
        question: 'What distinguishes a true NVC "feeling" from a false one?',
        options: [
          'True feelings name your internal emotion (lonely, worried); false ones smuggle blame-verbs in feeling-costume ("I feel disrespected" = what you think THEY did)',
          'True feelings must be positive; negative emotions are jackal-speech',
          'False feelings are any emotions expressed during conflict',
          'The distinction applies only to workplace communication',
        ],
        correctIndex: 0,
        explanation:
          'The costume-test: strip the "I feel that" and check what remains — "you don’t care" is a prosecution, not an emotion.',
      },
      {
        question: 'What single feature separates an NVC request from a demand?',
        options: [
          'Refusal-compatibility: a request accepts "no" without punishment; a demand punishes refusal — regardless of polite wording',
          'Requests use question marks; demands use statements',
          'Requests are always fulfilled eventually; demands never are',
          'There is no difference — the terms are interchangeable',
        ],
        correctIndex: 0,
        explanation:
          'The test is behavioral, not grammatical: what happens after "no" reveals which one you issued.',
      },
      {
        question:
          'Why does the NEED step specify UNIVERSAL human needs?',
        options: [
          'Universal needs (connection, respect, rest) are unarguable meeting-points — no one defends against "I’m needing connection," while accusations invite all-night defense',
          'Universality makes the request legally binding',
          'Personal needs are considered jackal-language by definition',
          'It simplifies the vocabulary for beginners',
        ],
        correctIndex: 0,
        explanation:
          'Needs are the shared human floor: locating your feeling there converts adversary into fellow-needer.',
      },
      {
        question:
          'In receiving criticism ("you’re selfish, you never help"), what does NVC reflection decode?',
        options: [
          'The buried O/F/N/R — their observation, exhaustion-feelings, support-needs, and unspoken request — then reflect the decoded version back',
          'Counter-evidence proving you DO help adequately',
          'Your own feelings of being unfairly attacked',
          'The grammatical errors in their accusation',
        ],
        correctIndex: 0,
        explanation:
          'People fight to be heard; reflecting the decoded need dissolves the fight’s fuel before any negotiation begins.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_nvc_matrix',
      name: 'The Giraffe Translator',
      category: 'REFRAME',
      manaCost: 1,
      baseDamage: 32,
      shieldValue: 30,
      promptText:
        'Camera-check the observation. Name the real feeling. Find the universal need. Request — refusal-compatible.',
      targetDistortionBonus: { distortion: 'MIND_READING', multiplier: 1.6 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_nvc_sentence_drafting',
        scrollId: 'scr_nvc_16',
        bookTitle: 'Nonviolent Communication',
        title: 'One NVC Sentence Daily',
        description:
          'Draft one full O-F-N-R sentence each day about a real friction — even if never delivered aloud. Fluency is built in drafting.',
        suggestedTime: '12:30',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Rosenberg’s ~50-repetition fluency estimate: daily drafting reaches giraffe-speed within two months without conversational risk.',
        isScheduled: false,
      },
      {
        id: 'rtn_nvc_jackal_translation',
        scrollId: 'scr_nvc_16',
        bookTitle: 'Nonviolent Communication',
        title: 'Jackal-to-Giraffe Translation Log',
        description:
          'Capture one jackal utterance daily (yours or theirs) and write its giraffe translation underneath.',
        suggestedTime: '21:00',
        frequency: 'DAILY',
        energyTier: 'STEADY_40',
        reminderEnabled: false,
        clinicalRationale:
          'Bidirectional translation is the actual mastery skill; the log builds the decoding reflex that works in real-time eventually.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The NVC Rejection Crucible',
      subtitle: 'When the Perfect Request Gets a "No"',
      deepCaseStudy:
        'You did everything right. After weeks of drafting: "When dinner conversation stops mid-story for the phone (O), I feel disconnected (F), because shared time matters deeply to me (N) — would you be willing to try phone-free dinners twice a week? (R)" Your wife listens fully, nods thoughtfully... and says: "Honestly? No. Dinner is my only scroll-down time. I need it. I\'m with you guys all day — those twenty minutes are mine." Delivered kindly. Completely refused. The old jackal lunges ("then why did I bother being vulnerable"), and a darker thought: "maybe the marriage just doesn\'t want what I want."',
      contentMarkdown: `### 🌪️ Refusal Without Devastation

This crucible tests NVC's least-marketed promise: the framework's value is NOT that well-formed requests succeed — it's that well-formed requests generate TRUE ANSWERS. Her "no" is real data the old grammar never accessed ("you're addicted to that thing" would have produced defense, capitulation-performance, or counter-attack — never honest refusal). The devastation you feel is the sound of a fantasy dying: the belief that perfect technique controls outcomes.

#### ⚠️ The Two Standard Misreads of Refusal:
1. **Technique failure**: "I formatted the request wrong — back to drafting." Wrong: the format WORKED; it transmitted cleanly and received a clean transmission back. Treating honesty as failure reinstates manipulation as methodology.
2. **Relationship verdict**: "'No' means she doesn't love me / the marriage is hopeless." Also wrong: her refusal named a REAL competing need (decompression, autonomy) — needs colliding is normal marriage, not its verdict.

#### 🛡️ The Negotiation Continuation Protocol:
1. **Receive the no AS a need-statement**: "So dinner-scrolling is your decompression — that's real." Reflecting the need beneath the refusal keeps both of you in giraffe-territory; the no is honored, not litigated.
2. **Return to YOUR need with flexibility**: the need (connection) is fixed; the STRATEGY (phone-free dinners) was one candidate. Rosenberg's crucial teaching: **needs are few and universal; strategies are infinite.** Brainstorm alternatives together — walks after bedtime, a weekend breakfast ritual, Saturday morning coffee before screens.
3. **The hybrid hunt**: often a strategy exists satisfying both needs — her decompression PLUS your connection. Example candidates: she scrolls solo for 20 minutes BEFORE dinner (decompression banked), then dinner connects fresh; or parallel-scrolling converted to shared-scrolling (showing each one thing).
4. **Accept imperfect closure if it comes**: some negotiations end at "no workable overlap right now." An honest standing-no, revisited monthly, beats a coerced yes that breeds resentment. Requests that accept no INCLUDE the ongoing relationship with the unanswered need.
5. **The vulnerability dividend**: acknowledge it aloud — "I hated hearing no, and I'm glad you told me the truth instead of white-knuckling it." This deposit makes future honest refusals likelier — the actual foundation of negotiation-capable intimacy.

#### 🧬 What the Crucible Teaches:
NVC was never a compliance-machine; it is a TRUTH-machine. Marriages run on negotiated truth, not on won requests. The husband who can hear "no" without devastation is the husband whose wife can afford honesty for decades — and THAT is the asset this whole grammar was buying all along.`,
      advancedQuiz: [
        {
          question:
            'Why is her honest "no" framed as the framework SUCCEEDING rather than failing?',
          options: [
            'NVC generates TRUE answers — old grammar produced defense or coerced compliance, never honest refusal; clean transmission of a real competing need is the system working',
            'It isn’t — a refused request proves the technique was executed incorrectly',
            'Success is measured only by request-fulfillment rates',
            'Her refusal shows the framework only works on receptive audiences',
          ],
          correctIndex: 0,
          explanation:
            'The reframe is total: NVC optimizes for truth-transmission; compliance was never the product — negotiated honesty is.',
          clinicalDistinction:
            'Couples who never hear "no" aren’t communicating well; they’re performing accommodation. Refusal-capacity is intimacy-depth.',
        },
        {
          question:
            'What does "needs are few and universal; strategies are infinite" unlock in negotiation?',
          options: [
            'Strategy-flexibility: the fixed need (connection) can be served by countless alternative strategies once the single failed candidate (phone-free dinners) is released',
            'That needs should be abandoned when strategies fail',
            'That universal needs justify overriding refusals eventually',
            'It’s rhetoric with no negotiation application',
          ],
          correctIndex: 0,
          explanation:
            'The need/strategy distinction is NVC’s negotiation engine: attach firmly to needs, hold strategies loosely, brainstorm infinitely.',
          clinicalDistinction:
            'Rigid strategists fight for phone-free dinners; skilled negotiators fight for connection and collect ten viable vehicles.',
        },
        {
          question:
            'What does the closing acknowledgment ("I hated hearing no, and I’m glad you told the truth") purchase long-term?',
          options: [
            'It reinforces honest-refusal behavior — making truth-telling affordable for decades, which is the actual foundation of negotiation-capable intimacy',
            'It signals weakness that will invite future exploitation',
            'It closes the conversation without resolving the underlying need',
            'It is optional politeness with no functional role',
          ],
          correctIndex: 0,
          explanation:
            'Behavior reinforced repeats: rewarding costly honesty today purchases the information-flow marriages run on tomorrow.',
          clinicalDistinction:
            'The dividend compounds: each honored "no" raises the couple’s truth-budget — the inverse of coercion, which bankrupts it.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_honest_no_medal',
        name: 'The Honest-No Medal',
        description:
          'Worn by those who can hear refusal. Grants +30 Compassion Aura.',
        statBoost: 'COMPASSION_AURA',
        boostAmount: 30,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_nvc16_1',
        scrollId: 'scr_nvc_16',
        bookTitle: 'Nonviolent Communication',
        author: 'Marshall Rosenberg',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying the NVC Matrix.',
        question:
          'Translate to full NVC: "You and your mother gang up on me every visit."',
        options: [
          'Observation (camera-facts of the visits) → feeling (excluded, criticized) → need (belonging, partnership) → request (specific, refusal-compatible)',
          'Add evidence citations proving the ganging-up pattern objectively',
          'Soften it to "sometimes I wonder if you two team up a bit?"',
          'Deliver it louder so the underlying hurt registers properly',
        ],
        correctIndex: 0,
        explanation:
          'The gang-up accusation is evaluation+conviction; NVC extracts the camera-footage, the real sting, the unmet need, and a checkable ask.',
        clinicalInsight:
          'The softer-version trap ("sometimes I wonder...") is hedged jackal — same prosecution, whispered.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_nvc16_2',
        scrollId: 'scr_nvc_16',
        bookTitle: 'Nonviolent Communication',
        author: 'Marshall Rosenberg',
        scenarioPrompt: '⚡ Day-14 Spaced Review: Receiving Mode.',
        question:
          'Your teenage son explodes: "You control EVERYTHING! I hate this house!" The NVC receiving move?',
        options: [
          'Decode the jackal: O (specific restrictions), F (frustration, powerlessness), N (autonomy, trust) → reflect: "Sounds like you’re feeling boxed in and wanting more say. What decision would you want a bigger vote on?"',
          'Correct the absolutes: "EVERYTHING? I let you do plenty."',
          'Send him to his room for disrespectful language',
          'List your reasonable justifications for each restriction',
        ],
        correctIndex: 0,
        explanation:
          'Reflection decodes before negotiating; adolescents fight to be heard — the explosion is jackal-output requiring giraffe-translation, not prosecution-response.',
        clinicalInsight:
          'His "what decision would you want a vote on?" invitation often reveals the REAL conflict is narrower than the explosion implied.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },

  {
    id: 'scr_window_tolerance_17',
    title: 'The Window of Tolerance',
    subtitle: 'Navigating Hyperarousal and Hypoarousal in Family Storms',
    authorOrTradition: 'Dan Siegel — Window of Tolerance',
    readingMinutes: 6,
    category: 'PARENTING_COREGULATION',
    contentMarkdown: `## The Band Where Humans Are Home

Dan Siegel's window of tolerance: the zone of autonomic arousal within which a person can process experience, think clearly, feel fully, and respond flexibly. Outside the band, in either direction, cognition degrades into two distinct flavors of dysfunction:

- **Hyperarousal** (above the window): the sympathetic surge — racing heart, agitation, anger, anxiety, reactivity. The system is FLOODED: too much activation. Above the window, people yell, pace, catastrophize, attack.
- **Hypoarousal** (below the window): the dorsal-vagal dive — shutdown, numbness, fog, collapse, "checked-out." The system is DRAINED: too little activation. Below the window, people go quiet, blank, dissociated, "fine" in the flattest possible voice.

The window's width varies: narrow in the sleep-deprived, the stressed, the traumatized — and critically, **children's windows are developmentally narrow** (the prefrontal housing for regulation is under construction). A tantruming four-year-old and a withdrawing teenager are both OUTSIDE their windows; so, usually, is the parent confronting them.

## Why the Window Governs Everything

Siegel's clinical axiom: **communication and learning only occur inside both parties' windows.** Lecturing a hyperaroused child is broadcasting to a flooded radio; interrogating a hypoaroused teen is interviewing a switched-off one. Every parenting tool in this academy — co-regulation, emotion coaching, de-escalation, NVC — presupposes window membership on both sides. The window is the precondition layer beneath all technique.

Reading position (yours and theirs):
- Hyper signs: raised voice, fast speech, jaw/ fists, urgency, "fighting" energy.
- Hypo signs: flat voice, glazed eyes, one-word answers, slumping, "whatever," absence-behind-present-eyes.

## Widening the Window: the Long Game

Window width is trainable — that's the entire promise:

- **Repeated successful navigation**: each storm weathered inside-or-near the window (rather than blown out of it) widens future tolerance, like progressive loading builds muscle.
- **Bottom-up regulation capacity**: regular physiological practices (breathwork, exercise, sleep — the Vagal Brake scroll's toolkit) raise the baseline tonnage the system can hold.
- **Top-down integration**: Siegel's "name it to tame it" — affect labeling extends the window's upper bound; narrative processing of past storms extends the whole range.
- **Co-regulation history**: windows are widened IN relationship — the child repeatedly borrowable-calm builds wider native capacity (the Co-Regulation scroll's mechanism).

## The Storm Navigation Map

When family storms blow, the navigation sequence follows window logic:

1. **Locate everyone**: who's hyper (flooding), who's hypo (shutdown), who's actually inside? You cannot co-regulate from outside your own window — check yourself first (mask on, per the Mirror scroll).
2. **Match direction**: hyper needs DOWN-regulation (slower voice, lower pitch, reduced stimulation, physiological sighs, less talking); hypo needs UP-regulation (warm engagement, gentle activation, sensory grounding — cold water, movement, eye contact with warmth). Applying the WRONG direction worsens: pep-talking a flooded person adds fuel; calming a collapsed person can deepen the dive.
3. **Bridge, then converse**: only when both parties re-enter the band does conversation resume — and storms processed inside the window (afterward, together) widen it for next time.

## The Parent's Own Window

The exhausted father's window is the household's thermostat: your width sets the family's storm ceiling. Sleep debt, overload, and unprocessed stress narrow YOUR window, which narrows everyone's available co-regulation. Widening yours (sleep protocols, light anchors, discharge rituals) is not self-indulgence — it is infrastructure maintenance for the entire family's regulatory architecture.`,
    keyTakeaway:
      'Learning and connection only happen inside both parties’ window — read hyper (flood: down-regulate) versus hypo (shutdown: up-regulate), never apply the wrong direction, and widen the band itself through repetition, physiology, and narrative.',
    quiz: [
      {
        question: 'What are the two directions outside the window, and their signatures?',
        options: [
          'Hyperarousal (sympathetic flood: agitation, reactivity) above; hypoarousal (dorsal-vagal shutdown: numbness, fog, checked-out) below',
          'Anger and sadness — the two primary emotional channels',
          'Fight and flight — both forms of hyperarousal',
          'Introversion and extroversion under stress',
        ],
        correctIndex: 0,
        explanation:
          'The two poles demand OPPOSITE interventions — which is why misreading the pole is the most expensive error in storm-navigation.',
      },
      {
        question: 'Why is lecturing a hyperaroused child structurally futile?',
        options: [
          'Communication and learning require both parties inside the window — flooded systems cannot encode; you’re broadcasting to an offline receiver',
          'Children tune out lectures by age four as a developmental stage',
          'Lectures trigger guilt that interferes with memory encoding',
          'It isn’t futile — firm instruction works if repeated enough',
        ],
        correctIndex: 0,
        explanation:
          'The window is the precondition beneath ALL technique: no tool works on a system outside the band.',
      },
      {
        question:
          'What intervention does HYPOarousal require — and what common mistake worsens it?',
        options: [
          'Up-regulation: warm engagement, sensory grounding, gentle activation — the mistake is calming-techniques (which deepen the dive)',
          'Down-regulation: quiet space and reduced stimulation',
          'Immediate confrontation to re-engage the cortex',
          'Waiting silently until the person initiates contact',
        ],
        correctIndex: 0,
        explanation:
          'Direction-matching is the core skill: hypo needs activation, hyper needs settling — crossed wires compound both.',
      },
      {
        question: 'What widens the window over the long term?',
        options: [
          'Repeated successful in-window navigation, bottom-up physiology (sleep/breath/exercise), affect-labeling and narrative integration, and co-regulation history',
          'Avoiding all stressors so the system never strains',
          'Increasing stressor intensity to build tolerance faster',
          'Window width is genetically fixed at birth',
        ],
        correctIndex: 0,
        explanation:
          'Progressive-loading logic governs: tolerable doses weathered successfully build capacity — avoidance atrophies it, overload tears it.',
      },
    ],
    unlockedCardReward: {
      id: 'crd_window_locator',
      name: 'Window Locator',
      category: 'COMPASSION',
      manaCost: 1,
      baseDamage: 26,
      shieldValue: 34,
      promptText:
        'Locate first: flooded or drained? Down for hyper, UP for hypo. No conversation outside the band.',
      targetDistortionBonus: { distortion: 'EMOTIONAL_REASONING', multiplier: 1.5 },
    },
    suggestedRoutines: [
      {
        id: 'rtn_window_self_locate',
        scrollId: 'scr_window_tolerance_17',
        bookTitle: 'Mindsight / Window of Tolerance',
        title: 'Three-Point Location Check',
        description:
          'Twice daily (midday, pre-dinner): locate your own window position — inside, hyper, hypo? If outside, apply your matched regulator before family contact.',
        suggestedTime: '12:00',
        frequency: 'DAILY',
        energyTier: 'LOW_10',
        reminderEnabled: true,
        clinicalRationale:
          'Self-location is the precondition skill; the household thermostat (your window) requires monitoring before storms, not during.',
        isScheduled: false,
      },
      {
        id: 'rtn_window_family_mapping',
        scrollId: 'scr_window_tolerance_17',
        bookTitle: 'Mindsight / Window of Tolerance',
        title: 'Family Window Map',
        description:
          'Map each family member’s personal hyper/hypo signatures in writing — what their flooding looks like, what their shutdown looks like.',
        suggestedTime: '20:30',
        frequency: 'WEEKLY',
        energyTier: 'STEADY_40',
        reminderEnabled: false,
        clinicalRationale:
          'Individual signatures vary widely; pre-built maps enable real-time direction-matching when storms obscure observation.',
        isScheduled: false,
      },
    ],
    level2Expansion: {
      title: 'Level 2: The Shutdown Teenager Crucible',
      subtitle: 'Reaching a Child Below the Window Without Pushing Them Deeper',
      deepCaseStudy:
        'Your fifteen-year-old has been "fine" for three weeks — the flat, monotone, eyes-on-floor fine. Grades slipping, friends gone quiet, door closed more than open. Tonight you tried to connect: "Everything okay, bud?" — "Yep." "School alright?" — "Yep." "You know you can talk to me?" — "Yep. Can I go now?" And he was GONE — not angry, not fighting, just... absent. You stood in his doorway holding the same tools that worked when he was seven, watching your son disappear behind glass, and the helplessness tasted like panic: how do you reach someone who has LEFT?',
      contentMarkdown: `### 🌪️ The Hypo-Arousal Autopsy

The "yep" wall is hypoarousal's public interface: dorsal-vagal conservation mode, where the system has rationed its resources down to survival minimums. Crucially: **he did not choose the wall, and he cannot dismantle it on demand** — demanding openness from a shut-down nervous system is demanding photosynthesis. The parent's task is not extraction ("talk to me!") but CONDITIONS: making contact cheaper than isolation.

#### ⚠️ The Three Standard Errors That Deepen the Dive:
1. **The Interrogation Escalation**: question after question reads as demand-pressure on a depleted system; each "yep" costs him energy, and you're invoicing him hourly.
2. **The Frustration Pivot**: visible parental frustration ("fine, suit yourself!") teaches that emerging costs extra — now he must ALSO manage your disappointment. The wall thickens.
3. **The Ambush Intimacy**: scheduling a "serious talk" (dinner-table spotlight: "so, we're worried about you") floods a fragile system with social pressure; hypo-systems experience spotlight as threat and dive further.

#### 🛡️ The Sideways-Entry Protocol:
1. **Side-by-side over face-to-face**: adolescent nervous systems open more easily WITHOUT eye-contact pressure — car passenger seat, walking the dog, cooking adjacent, gaming nearby. Proximity without confrontation is the hypo-window's favorite doorway.
2. **Low-bandwidth contact, repeated**: brief, no-agenda contacts — "caught your favorite snack" tossed on the desk, a meme sent, two sentences at the door — each one a zero-pressure deposit. Walls lower for drip, not flood.
3. **Activity-carried conversation**: motion and shared tasks host harder content (screen-time research parallels: walking conversations run deeper than seated ones). The body's engagement lends the mind a handrail.
4. **The one-line door left open, ONCE**: not nightly interrogation — one clear offer, plainly: "No pressure tonight. Whenever it becomes a talk, I'm in — day or night." Then LIVE the availability (visible warmth, no sulking at the yeps). The offer's power is its non-repetition.
5. **Watch for the window-edge signals**: hypo-states thaw gradually — slightly longer answers, a joke initiated, lingering in the kitchen. THESE are the openings: match them lightly (one question, not twelve) or the system snaps back behind glass.
6. **The professional threshold**: three-plus weeks of withdrawal with grade/social decline crosses from mood into concern territory — pediatrician/GP consult, screening for depression. Parental technique has limits; hypoarousal this persistent warrants clinical eyes. Seeking them is reaching your child by another road, not admitting defeat.

#### 🧬 What the Glass Thaws To:
Teenagers rarely announce their return. They re-enter through the sideways doors you kept unbolted — the car ride where three sentences become ten, the kitchen lingering that becomes a conversation. The parent who kept deposits flowing without invoices is the parent present when the thaw arrives.`,
      advancedQuiz: [
        {
          question:
            'Why do side-by-side configurations outperform face-to-face contact for shut-down adolescents?',
          options: [
            'Eye-contact and frontal positioning carry social-pressure load that hypo systems experience as demand; parallel activity hosts connection while bypassing the confrontational frame',
            'Teenagers are embarrassed by parental eye contact due to vanity',
            'Side-by-side is coincidentally correlated with better moods',
            'It doesn’t — direct conversation is equally effective when sincere',
          ],
          correctIndex: 0,
          explanation:
            'Load-reduction is the mechanism: every removed demand-unit (eye contact, spotlight, question-count) lowers the cost of staying present.',
          clinicalDistinction:
            'The car-passenger-seat effect is robust across cultures: confinement plus parallel gaze equals lowered defenses.',
        },
        {
          question:
            'What makes the "one-line door left open, ONCE" more effective than nightly check-ins?',
          options: [
            'Repeated availability-offers function as pressure-invoices; a single clear offer followed by lived warmth makes contact affordable, while nightly "are you SURE?" re-tax every emergence attempt',
            'Nightly check-ins are prohibited by adolescent privacy rights',
            'One offer is simply less annoying and therefore preferred',
            'It doesn’t — persistence demonstrably outperforms single offers',
          ],
          correctIndex: 0,
          explanation:
            'The economics matter: each re-offer implies doubt and demand; the trusted standing-invitation keeps the door’s cost at zero.',
          clinicalDistinction:
            'The offer’s power is verified by BEHAVIOR after it: warmth without sulking proves the door genuinely stays open.',
        },
        {
          question:
            'Why must parents MATCH the thaw-edge signals rather than capitalize maximally on them?',
          options: [
            'Emerging systems are fragile — one question meets the opening, twelve questions slam the window shut; light-touch matching preserves the thaw’s trajectory',
            'Capitalizing is fine if the questions are caring ones',
            'Matching is unnecessary; thawed teens welcome full engagement',
            'The signals are unreliable and should be ignored until full recovery',
          ],
          correctIndex: 0,
          explanation:
            'Dose-control at the threshold: the half-open state tolerates micro-engagement only; greed at the opening resets weeks of deposits.',
          clinicalDistinction:
            'This is fly-fishing logic: the strike must be timed and light — hauling hard at the first bite loses the fish.',
        },
      ],
      unlockedMasteryRelic: {
        id: 'rel_sideways_door_key',
        name: 'The Sideways-Door Key',
        description:
          'Opens what fronts cannot. Grants +35 Compassion Aura.',
        statBoost: 'COMPASSION_AURA',
        boostAmount: 35,
      },
    },
    spacedRecallChallenges: [
      {
        id: 'spc_window17_1',
        scrollId: 'scr_window_tolerance_17',
        bookTitle: 'Window of Tolerance',
        author: 'Dan Siegel',
        scenarioPrompt:
          '⚡ Flash Memory Check: 3 days since studying the Window of Tolerance.',
        question:
          'Partner pacing, fast loud speech, jaw clenched — mid-hyperarousal. Your matched intervention set?',
        options: [
          'DOWN-regulate: lower/slower own voice, reduced stimulation, physiological sighs offered, minimal words, space respected',
          'Engage the topic directly to resolve the activating issue fast',
          'Match their energy to show you take it seriously',
          'Send them to another room until calm returns',
        ],
        correctIndex: 0,
        explanation:
          'Hyper takes DOWN: the matched regulators lower sympathetic tone; topic-engagement adds fuel, matching mirrors it.',
        clinicalInsight:
          'Voice-mirroring is automatic under arousal — deliberate tempo-drop is the trained countermove.',
        nextReviewDueDays: 3,
      },
      {
        id: 'spc_window17_2',
        scrollId: 'scr_window_tolerance_17',
        bookTitle: 'Window of Tolerance',
        author: 'Dan Siegel',
        scenarioPrompt: '⚡ Day-14 Spaced Review: Width Maintenance.',
        question:
          'Which regimen genuinely widens your household’s collective window?',
        options: [
          'Your own sleep/light/exercise baseline, storms weathered (not avoided) with repair, affect-labeling practice, and consistent co-regulation deposits',
          'Shielding children from every stressor and emotion',
          'Occasional intense family adventures testing limits',
          'Nothing moves window width — it is developmentally fixed',
        ],
        correctIndex: 0,
        explanation:
          'Progressive-loading plus infrastructure: your regulated baseline sets the ceiling, and successfully-navigated doses build everyone’s floor.',
        clinicalInsight:
          'Avoidance narrows windows as surely as overload tears them — tolerable-and-held is the growth zone.',
        nextReviewDueDays: 14,
      },
    ],
    isCompleted: false,
    isLevel2Unlocked: false,
    isLevel2Completed: false,
    memoryLevel: 1,
  },
];
