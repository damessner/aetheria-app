import { ShadowFlawType, ShadowDeepDive } from '../core/types';

/**
 * Phase D of Practice content expansion: rich deep-dive dossiers for all
 * ten Shadow Crucible flaws. Each covers developmental origin, the secret
 * payoff keeping the pattern alive, somatic signature, relational replay,
 * daily starvation practices and disconfirmation experiments.
 */
export const SHADOW_DEEP_DIVES: Record<ShadowFlawType, ShadowDeepDive> = {
  FRAGILE_EGO: {
    originStory:
      'Usually forged in childhoods where love arrived as applause. Praise became oxygen and criticism became suffocation — so you learned that being impressive is the price of being loved, and mistakes are existential threats rather than information.',
    seductivePayoff:
      'The fortress of superiority delivers real short-term rewards: people defer to you, your confidence attracts opportunity, and deflecting criticism genuinely stings less in the moment. The pattern persists because it keeps working — socially and professionally — right up until it isolates you.',
    bodySignature:
      'Heat rising in the face and chest during feedback; a jaw that sets before you speak; the urge to interrupt forming in your hands; shallow upper-chest breathing while someone explains how your work landed.',
    relationalReplay:
      'At home, your child’s honest observation becomes “disrespect” and your partner’s request becomes an accusation of incompetence. At work, juniors stop bringing you problems. Your family learns to deliver truth through flattery or silence — both of which starve intimacy.',
    dailyMicroPractices: [
      'Once a day, say the words “I don’t know” or “I was wrong about that” out loud, in front of another person, deliberately.',
      'Ask one genuine question about someone’s expertise with no follow-up statement about your own.',
      'When praised, practice receiving it with only “thank you” — no self-deprecation, no reciprocal bragging, no elaboration.',
    ],
    disconfirmationExercises: [
      'Publish or share work you consider 80%-ready and record what actually happens versus what the terror predicted.',
      'Ask a trusted colleague: “What is one thing I systematically overrate about myself?” Write the answer down without responding.',
      'Spend one full conversation asking questions only. Note whether anyone respected you less afterward (they will not have).',
    ],
  },

  CHRONIC_AVOIDANCE: {
    originStory:
      'Often begins when early effort met unpredictable outcomes — working hard sometimes changed nothing, so effort itself started to feel foolish. The nervous system learned that starting guarantees discomfort while not-starting guarantees comfort, and quietly optimized for the latter.',
    seductivePayoff:
      'Delaying keeps every option alive in fantasy. The unfinished project remains perfect in imagination; the exam remains passable; the conversation remains winnable. Starting would collapse these infinite perfect futures into one imperfect reality. Procrastination is often perfectionism wearing a bathrobe.',
    bodySignature:
      'A fog-like heaviness when opening the task; phantom urgency to check your phone precisely at ignition moments; relief-flavored guilt while doing anything else; the specific tiredness that appears only when facing meaningful work.',
    relationalReplay:
      'Partners inherit your undone tasks and eventually your undone promises. Children watch intention-without-execution and learn either “commitments are decorative” or they over-function to compensate. Resentment accumulates in the household ledger under your name.',
    dailyMicroPractices: [
      'The two-minute ignition: begin the avoided task for exactly 120 seconds with permission to stop after. Momentum usually continues.',
      'Name the feeling out loud before starting (“this feels boring and I’m going to do it anyway”) — affect labeling reduces avoidance drive.',
      'Keep a “did list” alongside your to-do list at day’s end; visible evidence of execution rewires self-concept.',
    ],
    disconfirmationExercises: [
      'Do the dreaded task first thing tomorrow before any input (phone/email). Compare actual discomfort intensity to forecasted discomfort.',
      'Commit to one tiny daily action for a week on the avoided project and track mood — notice dread shrinks as contact increases.',
      'Tell one person your exact deadline and ask them to check. External witness dissolves the private negotiation.',
    ],
  },

  BITTER_CYNIC: {
    originStory:
      'Cynicism is frequently armor over abandoned hope. Somewhere, you cared deeply and got burned publicly — maybe loyalty was repaid with betrayal, or idealism was mocked as naivety. Expecting nothing became the strategy that ensures you can never be disappointed again.',
    seductivePayoff:
      'Cynicism grants instant intellectual high ground: the cynic is never fooled, never naive, never invested enough to be hurt. Mocking effort from the sidelines costs nothing and feels like wisdom. It also provides a perfect excuse — why try when the game is rigged?',
    bodySignature:
      'The preemptive eye-roll or smirk; a tightness across the sternum when witnessing sincerity; arms crossing during others’ enthusiasm; a flat, controlled voice covering contempt.',
    relationalReplay:
      'Your sneer teaches children that caring is embarrassing, and they stop sharing dreams with you. Partners tire of being the family optimist against your permanent heckling. Over time you’re invited less — which your bitterness cites as proof everyone is shallow.',
    dailyMicroPractices: [
      'Once daily, respond to something sincere with a straight question instead of a quip (“what did that mean to you?”).',
      'Keep a private log of times cynicism was simply wrong — things worked, people were decent, effort paid off.',
      'Perform one act of unironic generosity weekly with no commentary, no joke to hide behind.',
    ],
    disconfirmationExercises: [
      'Choose one “obviously fake” person’s sincerity and bet against your own read: treat their gesture as genuine for two weeks and observe results.',
      'Revisit one abandoned hope concretely — take one real step toward it this month while cynicism jeers. Let results argue with the armor.',
      'Write the letter defending your original idealism as if to a younger you. Notice what grief, not wisdom, wrote the cynical edits.',
    ],
  },

  PEOPLE_PLEASER: {
    originStory:
      'Learned in environments where love was conditional on performance of agreeableness — perhaps a volatile parent whose moods dictated the household weather, and your compliance was the price of safety. You became exquisitely fluent in others’ needs and illiterate in your own.',
    seductivePayoff:
      'Pleasing delivers immediate harmony, visible appreciation, and the identity of “the nice one.” Saying yes spares you the terror of conflict and the deeper terror of discovering whether people stay when you stop performing. Approval is a fast-acting anesthetic for unworthiness.',
    bodySignature:
      'The smile assembling before your brain consents; stomach clenching when someone makes any request; the pause where your real answer should be; exhaustion after social events with no corresponding joy.',
    relationalReplay:
      'Your yeses are unreliable because they’re resentful. Partners can’t trust agreement they suspect is performed. Children learn their parent has no edges — and either exploit boundaries’ absence or absorb the lesson that self-erasure is love.',
    dailyMicroPractices: [
      'Institute a mandatory delay: “let me check and get back to you” before any new commitment. Never decide requests in the moment.',
      'State one small preference daily (restaurant, temperature, activity) as a declaration, not a hedged suggestion.',
      'Notice and log each time you apologize for something that isn’t wrong — awareness precedes rewiring.',
    ],
    disconfirmationExercises: [
      'Say a clean, warm “no” to one low-stakes request this week and document the actual aftermath versus the predicted catastrophe.',
      'Let one silence stand in a meeting instead of filling it with accommodation. Watch what happens (usually: nothing).',
      'Share one mildly unpopular honest opinion per week. Track who stays. These are your real relationships.',
    ],
  },

  CONTROL_TYRANT: {
    originStory:
      'Frequently rooted in childhood chaos — addiction, instability, or unreliability taught you that vigilance is survival and delegation is Russian roulette. You became the household weather service, predicting disasters nobody else saw coming, and control calcified into identity.',
    seductivePayoff:
      'Control genuinely prevents some disasters, which makes the pattern feel like competence. Micromanaging delivers certainty in an uncertain world and a stream of small confirmations that you alone hold things together. Trust requires tolerating helplessness; control lets you skip the lesson.',
    bodySignature:
      'Itch in the fingers to take over mid-delegation; teeth-grinding tension watching tasks done differently; scanning eyes auditing rooms and plans; breath held during other people’s handling of “your” responsibilities.',
    relationalReplay:
      'Spouses feel demoted to employees; capable children become helpless because you redo their work, teaching learned incompetence. Eventually you’re surrounded by people who won’t take initiative — which your exhaustion cites as proof you must do everything.',
    dailyMicroPractices: [
      'Delegate one task daily completely, including outcome ownership — then physically leave the room if needed.',
      'Practice “good enough is done”: define acceptable thresholds in advance, then honor them without re-inspection.',
      'When the urge to correct arises, wait ten minutes; most corrections die of natural causes.',
    ],
    disconfirmationExercises: [
      'Disappear for a full weekend and let the household run its way. List what actually collapsed (it will be short).',
      'Assign a significant task to a child or partner at 70% of your standard, accept the result untouched, and note their response to trust.',
      'Track time reclaimed in week one of radical delegation and spend some of it on play, not more control.',
    ],
  },

  PROFESSIONAL_VICTIM: {
    originStory:
      'Helplessness often began as accurate — there were years you genuinely couldn’t change your circumstances. But the posture outlived the prison. Somewhere along the way, powerlessness stopped being a description and became a platform.',
    seductivePayoff:
      'Victimhood is the only stance that generates sympathy without responsibility. It exempts you from trying (and thus from failing), grants moral high ground in every dispute, and recruits allies to carry your loads. Agency means owning outcomes; victimhood means always having an author to blame.',
    bodySignature:
      'The heavy sigh preceding stories; shoulders rolled inward with palms turned up; energy draining specifically at decision points; a flicker of aliveness when recounting injustices that is conspicuously absent when planning solutions.',
    relationalReplay:
      'Partners burn out carrying both their life and your grievances. Children learn either “the world is against us” fatalism or develop parentified guilt, feeling responsible for your happiness. Friendships thin as listeners discover support changes nothing.',
    dailyMicroPractices: [
      'Catch one complaint daily and append “…and here is my one move anyway.” Complaint plus action breaks the pattern.',
      'Replace “I have to” with “I’m choosing to” (or honestly, “I’m choosing not to”) — restoring authorship language.',
      'Each evening write one line: “Today I influenced ___,” however small. Evidence collection against helplessness.',
    ],
    disconfirmationExercises: [
      'Take one recurring grievance and run a single focused experiment against it this week; log what shifted with effort.',
      'Spend a full day refusing victim framing even once, narrating events in neutral-to-agency language. Notice the withdrawal discomfort.',
      'Ask three people for feedback on one goal and implement all suggestions before concluding “nothing works.”',
    ],
  },

  SECRET_ENVIER: {
    originStory:
      'Envy takes root where worth was ranked — siblings compared, classmates sorted, achievements tallied publicly. Scarcity was the water you swam in: someone else winning meant the pool had one less prize, and their celebration carried an implicit verdict on you.',
    seductivePayoff:
      'Envy masquerades as standards (“I just notice excellence”) and delivers secret relief when rivals stumble — their failure restores cosmic fairness without requiring your growth. Begrudging success also protects you from the terrifying question their success poses: why aren’t you moving?',
    bodySignature:
      'A sour metallic feeling watching announcements of others’ wins; the compulsive re-reading of their good news; tight throat drafting the lukewarm congratulation; fatigue after social media that no nap touches.',
    relationalReplay:
      'Friends sense the chill beneath your congratulations and begin hiding joys to spare your feelings — intimacy dies by omission. Children learn achievements create distance at home, so they either dim their light or seek audiences elsewhere.',
    dailyMicroPractices: [
      'Practice mudita deliberately: when hearing good news, silently extend one full sentence of genuine gladness before speaking.',
      'Congratulate specifically and promptly (“that promotion is exactly right for you”) — specificity is the antidote to lukewarm poison.',
      'Convert each envy spike into data: name precisely what you wanted. Envy is a compass pointing at unfired ambition.',
    ],
    disconfirmationExercises: [
      'Reach out to the person you envied and ask how they did it — collaboration dissolves rivalry’s fiction that their win stole from you.',
      'Publicly celebrate a peer’s win in a forum where you get zero credit, and log the internal weather.',
      'Take one step toward the exact thing envy flagged within 48 hours of noticing it.',
    ],
  },

  EMOTIONAL_TYRANT: {
    originStory:
      'Explosiveness typically models what was modeled — a household where volume equaled power and someone’s moods dictated everyone’s behavior. You learned emotional expression as weapon and weather system simultaneously: devastating, uncontrollable, and strangely effective at getting needs met.',
    seductivePayoff:
      'Eruption works fast: rooms reorganize around you, resistance evaporates, and the raw display registers as authenticity. Withdrawal-sulking works too — silent punishment reshapes households without a word. Intensity feels like passion, and afterward, apologies feel like absolution.',
    bodySignature:
      'Heat climbing the spine; hands finding objects to slam or gesture wildly; tunnel vision narrowing to the offender; the specific satisfaction-tinged-shame cocktail as doors close harder than needed.',
    relationalReplay:
      'Family members pre-manage your moods like weather — children become hypervigilant readers of footsteps and facial pressure, spending developmental resources on your stability instead of their growth. Partners edit themselves into strangers to keep peace.',
    dailyMicroPractices: [
      'Install the physiological sigh (double inhale, long exhale) twice daily when calm, so it exists under fire.',
      'Practice naming emotion below 40% intensity: “I’m starting to feel frustrated” — early warnings arrive before detonation.',
      'After any rupture, repair with specifics (“when I raised my voice about dishes, that was mine to manage”) — not global “sorry you felt that way.”',
    ],
    disconfirmationExercises: [
      'In your next trigger moment, leave the room for five minutes and return. Note that the issue survived your absence and your authority didn’t dissolve.',
      'Ask a family member what your explosions cost them monthly — listen fully, defend zero times.',
      'Let one injustice go completely unprotested for a week and observe that the household remained standing.',
    ],
  },

  SCARCITY_HOARDER: {
    originStory:
      'Scarcity wiring forms through genuine deprivation or its near cousin — chaotic unpredictability that felt like deprivation. Money, food, praise, or affection arrived irregularly, so holding back became hoarding became identity: what I retain cannot be taken; what I give away is gone forever.',
    seductivePayoff:
      'Holding back feels like solvency. Every withheld compliment, unbilled hour, undonated dollar, and unsaid “I love you” remains available for a future emergency. Generosity, by contrast, produces immediate vulnerability — did they deserve it? will it be reciprocated? Hoarding promises safety that giving can’t.',
    bodySignature:
      'Physical clutching sensation when sharing anything valued; the mental ledger audibly tallying; tightening grip on possessions mid-loan; a hollow ache after giving that no accumulation fills.',
    relationalReplay:
      'Children raised amid scarcity-hoarding learn love is rationed and asking is shameful. Partners experience your stinginess with money, praise, time, and vulnerability as a verdict on their worthiness. Reciprocity dies because you never model the first gift.',
    dailyMicroPractices: [
      'Give one specific compliment daily — out loud, named, undeserved by any logic except generosity.',
      'Maintain a “generosity budget”: a monthly amount of money/time earmarked purely for giving away without tracking returns.',
      'Practice one micro-disclosure weekly — share something true and slightly uncomfortable; vulnerability is the currency of closeness.',
    ],
    disconfirmationExercises: [
      'Lend or give away something you value this week and record the catastrophe forecast versus reality.',
      'Tithe 10% of one resource (time, attention, money) for a month; journal whether scarcity actually increased.',
      'Accept help twice without reciprocating immediately — let the imbalance sit and study your somatic protest.',
    ],
  },

  HYPOCRITICAL_MORALIST: {
    originStory:
      'Double standards usually form where judgment was the family currency — harsh verdicts rained down while the judges quietly exempted themselves. You absorbed the role of moral referee early: watching others, scoring others, and developing elaborate reasons why the rules describe everyone but their author.',
    seductivePayoff:
      'Moral posturing pays instantly: judging others is intoxicating because comparison flatters, standards signal superiority, and condemning public failures conveniently distracts from private ones. The gavel keeps self-examination permanently out of session.',
    bodySignature:
      'The rush of righteousness mid-criticism; leaning forward with judicial energy while others confess; heat in the chest that is notably absent when reviewing your identical behavior; the subtle pleasure of disappointment when someone fails your test.',
    relationalReplay:
      'Households ruled by double standards breed either rebellion or counterfeit virtue — children perform goodness for the judge and hide their actual selves. Partners stop confessing mistakes because your verdicts are merciless toward theirs and merciful toward yours. Intimacy requires equal footing; tribunals cannot love.',
    dailyMicroPractices: [
      'Apply today’s harshest judgment to yourself first, verbatim, and sit in it for sixty seconds before speaking on anyone else.',
      'Once daily, replace a stated criticism with a stated admiration of the same person — recalibrating the reflex.',
      'Confess one small fault proactively each week, unprompted, to someone affected by it.',
    ],
    disconfirmationExercises: [
      'Keep a two-column ledger for one week: judgments issued versus identical behaviors of your own discovered. Study the ratio.',
      'Publicly admit a mistake you previously criticized in another person; note whether your standing actually falls.',
      'Invite the person you judged hardest to hold you accountable to one standard you preach. Submit to the same measurement.',
    ],
  },
};
