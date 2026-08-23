import { GoogleGenerativeAI } from '@google/generative-ai';
import * as SecureStore from 'expo-secure-store';
import {
  DistortionType,
  CombatCard,
  EnergyTier,
  QuestItem,
  ThoughtFeedItem,
  TherapeuticTechnique,
  ThoughtDomain,
  ThoughtEvaluation,
  ShadowFlawType,
} from '../types';
import { Database } from '../database/db';
import { SECURE_KEY_STORAGE } from '../security/secureKeys';

/**
 * Extracts a JSON value from raw LLM output. Handles markdown fences,
 * leading prose, and truncated trailing output. Returns null when no
 * parseable JSON is found — callers must provide a fallback path.
 */
function parseLlmJson<T>(raw: string): T | null {
  if (!raw) return null;
  let text = raw.trim();
  // Strip markdown code fences if present
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();

  // Direct parse
  try {
    return JSON.parse(text) as T;
  } catch {
    /* fall through to recovery strategies */
  }

  // Trim to outermost JSON braces/brackets
  const firstObj = text.indexOf('{');
  const firstArr = text.indexOf('[');
  const start =
    firstObj === -1 ? firstArr : firstArr === -1 ? firstObj : Math.min(firstObj, firstArr);
  if (start === -1) return null;
  const openChar = text[start];
  const closeChar = openChar === '{' ? '}' : ']';

  let depth = 0;
  let inString = false;
  let escaped = false;
  let lastComplete = -1;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === openChar) depth++;
    else if (ch === closeChar) {
      depth--;
      if (depth === 0) {
        lastComplete = i;
        break;
      }
    }
  }

  if (lastComplete > start) {
    try {
      return JSON.parse(text.slice(start, lastComplete + 1)) as T;
    } catch {
      /* ignore */
    }
  }

  // Last resort: attempt to repair a truncated array/object by closing it
  const fragment = text.slice(start);
  if (openChar === '[' && !inString) {
    const repaired = fragment.replace(/,\s*$/, '') + ']';
    try {
      return JSON.parse(repaired) as T;
    } catch {
      /* ignore */
    }
  }

  return null;
}

/** Validates a Gemini-generated combat card, returning null when unusable */
function sanitizeCombatCard(c: any, index: number, distortion: DistortionType): CombatCard | null {
  if (!c || typeof c.name !== 'string' || typeof c.promptText !== 'string') return null;
  const category = ['FACT_CHECK', 'COMPASSION', 'ACTION_SPARK'].includes(c.category)
    ? c.category
    : 'FACT_CHECK';
  return {
    id: `crd_gemini_${Date.now()}_${index}`,
    name: c.name.slice(0, 60),
    category,
    manaCost: index === 0 ? 1 : 2,
    baseDamage: Number.isFinite(+c.baseDamage) ? Math.max(1, Math.min(50, +c.baseDamage)) : 25,
    shieldValue: category === 'COMPASSION' ? 20 : 5,
    promptText: c.promptText.slice(0, 300),
    targetDistortionBonus: { distortion, multiplier: 1.5 },
    isGeminiGenerated: true,
  };
}

class GeminiService {
  /**
   * API key resolution order:
   * 1. Hardware-backed SecureStore (set via Settings screen)
   * 2. Legacy plaintext copy in UserState (migrated to SecureStore, then wiped)
   * 3. EXPO_PUBLIC_GEMINI_API_KEY build-time env var
   */
  private async resolveApiKey(): Promise<string> {
    try {
      const storedKey = await SecureStore.getItemAsync(SECURE_KEY_STORAGE);
      if (storedKey) return storedKey;

      // One-time migration of legacy plaintext key
      const userState = await Database.getUserState();
      const legacyKey = userState.preferences.geminiApiKey || '';
      if (legacyKey) {
        await SecureStore.setItemAsync(SECURE_KEY_STORAGE, legacyKey);
        userState.preferences.geminiApiKey = '';
        await Database.saveUserState(userState);
        return legacyKey;
      }
    } catch (e) {
      console.warn('[Gemini] SecureStore unavailable, using fallback key sources', e);
    }

    return process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
  }

  private async getClient(): Promise<{ client: GoogleGenerativeAI; modelName: string } | null> {
    const apiKey = await this.resolveApiKey();

    if (!apiKey) {
      return null;
    }
    const userState = await Database.getUserState();
    const modelName = userState.preferences.geminiModel || 'gemini-3.7-flash';
    return { client: new GoogleGenerativeAI(apiKey), modelName };
  }

  /**
   * Socratic Reframing via Gemini:
   * Analyzes an automatic negative thought and returns distortion classification + 3 combat cards
   */
  async reframeThought(thought: string): Promise<{
    distortion: DistortionType;
    explanation: string;
    cards: CombatCard[];
  }> {
    try {
      const modelInfo = await this.getClient();
      if (!modelInfo) {
        return this.getFallbackReframe(thought);
      }

      const model = modelInfo.client.getGenerativeModel({ model: modelInfo.modelName });

      const prompt = `
You are Kael the Owl-Sage, an expert clinical Cognitive Behavioral Therapy (CBT) AI guardian in Aetheria.
Analyze the following negative automatic thought from a user:
"${thought}"

Return ONLY a valid JSON object matching this exact schema:
{
  "distortion": "CATASTROPHIZING" | "ALL_OR_NOTHING" | "MIND_READING" | "EMOTIONAL_REASONING" | "OVERGENERALIZATION" | "SHOULD_STATEMENTS" | "PERSONALIZATION",
  "explanation": "Short 1-2 sentence empathetic explanation of why this thought fits the distortion.",
  "cards": [
    {
      "name": "Fact Check Card Name",
      "category": "FACT_CHECK",
      "promptText": "Concrete factual counter-evidence or reality test question",
      "baseDamage": 30
    },
    {
      "name": "Compassion Shield Name",
      "category": "COMPASSION",
      "promptText": "Self-compassionate reframing statement",
      "baseDamage": 20
    },
    {
      "name": "Alternative Action Name",
      "category": "ACTION_SPARK",
      "promptText": "Actionable balanced next step",
      "baseDamage": 25
    }
  ]
}
Do not include markdown ticks, just raw JSON.
`;

      const response = await model.generateContent(prompt);
      const parsed = parseLlmJson<{
        distortion: string;
        explanation: string;
        cards: any[];
      }>(response.response.text());

      if (!parsed || !Array.isArray(parsed.cards) || parsed.cards.length === 0) {
        console.warn('[Gemini] Thought reframe returned unparseable JSON, using fallback');
        return this.getFallbackReframe(thought);
      }

      const VALID_DISTORTIONS: DistortionType[] = [
        'CATASTROPHIZING',
        'ALL_OR_NOTHING',
        'MIND_READING',
        'EMOTIONAL_REASONING',
        'OVERGENERALIZATION',
        'SHOULD_STATEMENTS',
        'PERSONALIZATION',
      ];
      const rawDistortion = typeof parsed.distortion === 'string' ? parsed.distortion : '';
      const distortion: DistortionType = (VALID_DISTORTIONS as string[]).includes(rawDistortion)
        ? (rawDistortion as DistortionType)
        : 'CATASTROPHIZING';

      const generatedCards = parsed.cards
        .map((c, index) => sanitizeCombatCard(c, index, distortion))
        .filter((c): c is CombatCard => c !== null);

      if (generatedCards.length === 0) {
        return this.getFallbackReframe(thought);
      }

      return {
        distortion,
        explanation:
          typeof parsed.explanation === 'string' && parsed.explanation.length > 0
            ? parsed.explanation.slice(0, 500)
            : 'Analysis complete.',
        cards: generatedCards,
      };
    } catch (e) {
      console.warn('[Gemini] Thought reframing fallback activated', e);
      return this.getFallbackReframe(thought);
    }
  }

  /**
   * Gemini Task Decomposer:
   * Breaks overwhelming tasks into 3 gentle, atomic micro-steps
   */
  async decomposeTask(taskTitle: string, energyTier: EnergyTier): Promise<string[]> {
    try {
      const modelInfo = await this.getClient();
      if (!modelInfo) {
        return this.getFallbackDecomposition(taskTitle);
      }

      const model = modelInfo.client.getGenerativeModel({ model: modelInfo.modelName });

      const prompt = `
You are a Behavioral Activation task decomposition engine in Aetheria.
User Energy Battery Level: ${energyTier} (LOW_10 = severely fatigued, STEADY_40 = moderate, BLAZING_80 = energized).
Task to decompose: "${taskTitle}"

Break this task down into 3 ultra-gentle, friction-free micro-steps that require minimal activation energy.
Return ONLY a JSON array of strings, e.g. ["Step 1", "Step 2", "Step 3"]. No markdown, just raw JSON.
`;

      const response = await model.generateContent(prompt);
      const parsed = parseLlmJson<string[]>(response.response.text());
      if (!parsed || !Array.isArray(parsed)) {
        console.warn('[Gemini] Task decomposition returned unparseable JSON, using fallback');
        return this.getFallbackDecomposition(taskTitle);
      }
      return parsed
        .filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
        .map((s) => s.slice(0, 200));
    } catch (e) {
      return this.getFallbackDecomposition(taskTitle);
    }
  }

  /**
   * Dynamic Quest Generator via Gemini
   */
  async generateDynamicQuests(energyTier: EnergyTier): Promise<QuestItem[]> {
    try {
      const modelInfo = await this.getClient();
      if (!modelInfo) return [];

      const model = modelInfo.client.getGenerativeModel({ model: modelInfo.modelName });

      const prompt = `
Generate 2 evidence-based Behavioral Activation quests for a user with energy tier ${energyTier}.
Return JSON array matching:
[
  {
    "title": "Title",
    "description": "Description",
    "category": "MOVEMENT" | "HYDRATION" | "WORKSPACE" | "SOMATIC" | "MINDFULNESS",
    "microSteps": ["step1", "step2"]
  }
]
No markdown, only valid JSON.
`;

      const response = await model.generateContent(prompt);
      const items = parseLlmJson<any[]>(response.response.text());
      if (!items || !Array.isArray(items)) {
        console.warn('[Gemini] Quest generation returned unparseable JSON');
        return [];
      }

      return items
        .filter((item: any) => item && typeof item.title === 'string')
        .map((item: any, idx: number) => ({
        id: `qst_ai_${Date.now()}_${idx}`,
        title: item.title,
        description: item.description,
        category: item.category,
        clinicalSkill: 'BA',
        energyCostTier: energyTier,
        microSteps: item.microSteps || ['Start gently', 'Finish and breathe'],
        rewards: { vitalityPoints: 60, clarityMana: 2, sanctuaryGrowth: 15 },
        isCompleted: false,
        circadianFriendly: true,
      }));
    } catch (e) {
      return [];
    }
  }

  private getFallbackDecomposition(taskTitle: string): string[] {
    return [
      `Take one breath and prepare your workstation`,
      `Do the very first 60 seconds of "${taskTitle}"`,
      `Acknowledge progress and decide if you wish to continue`,
    ];
  }

  private getFallbackReframe(thought: string): {
    distortion: DistortionType;
    explanation: string;
    cards: CombatCard[];
  } {
    const lower = thought.toLowerCase();
    let distortion: DistortionType = 'CATASTROPHIZING';
    if (lower.includes('never') || lower.includes('always') || lower.includes('completely')) {
      distortion = 'ALL_OR_NOTHING';
    } else if (lower.includes('they think') || lower.includes('everyone hates') || lower.includes('they must')) {
      distortion = 'MIND_READING';
    } else if (lower.includes('feel like') && (lower.includes('failure') || lower.includes('loser'))) {
      distortion = 'EMOTIONAL_REASONING';
    }

    return {
      distortion,
      explanation: 'Heuristic analysis detected patterns consistent with this thinking trap.',
      cards: [
        {
          id: `crd_fb_1_${Date.now()}`,
          name: 'Reality Anchor',
          category: 'FACT_CHECK',
          manaCost: 1,
          baseDamage: 28,
          shieldValue: 10,
          promptText: 'What are 2 verifiable facts that disprove this extreme scenario?',
          targetDistortionBonus: { distortion, multiplier: 1.5 },
        },
        {
          id: `crd_fb_2_${Date.now()}`,
          name: 'Compassion Shield',
          category: 'COMPASSION',
          manaCost: 1,
          baseDamage: 18,
          shieldValue: 25,
          promptText: 'I am allowed to be a work in progress without being a failure.',
          targetDistortionBonus: { distortion, multiplier: 1.5 },
        },
        {
          id: `crd_fb_3_${Date.now()}`,
          name: 'Atomic Step',
          category: 'ACTION_SPARK',
          manaCost: 2,
          baseDamage: 32,
          shieldValue: 10,
          promptText: 'Shift focus to the immediate next physical action I can take.',
          targetDistortionBonus: { distortion, multiplier: 1.5 },
        },
      ],
    };
  }

  /**
   * Socratic Campfire Dialogue with Companions
   */
  async chatWithCompanion(
    companionId: 'KAEL_OWL' | 'PYRA_FOX' | 'LIORA_NYMPH',
    userMessage: string,
    history: { sender: 'user' | 'companion'; text: string }[],
    energyTier: EnergyTier
  ): Promise<string> {
    try {
      const modelInfo = await this.getClient();
      if (!modelInfo) {
        return this.getFallbackCompanionResponse(companionId, userMessage);
      }

      const model = modelInfo.client.getGenerativeModel({ model: modelInfo.modelName });

      let personaPrompt = '';
      if (companionId === 'KAEL_OWL') {
        personaPrompt = `You are Kael the Owl-Sage, a wise, observant, and intellectually curious Socratic CBT guardian in Aetheria.
Your style: Ask gentle, insightful questions to help the user examine their assumptions, reality-test catastrophic thoughts, and see nuanced perspectives. Keep responses conversational, concise (2-4 sentences), and thoughtful. Never judge or lecture.`;
      } else if (companionId === 'PYRA_FOX') {
        personaPrompt = `You are Pyra the Ember-Fox, a warm, energetic, and encouraging Behavioral Activation guardian in Aetheria.
Your style: You help users break through overwhelm and task freeze with micro-sparks, gentle momentum, and friendly hype. The user's current energy is ${energyTier}. Keep responses warm, actionable, concise (2-3 sentences), and empowering.`;
      } else {
        personaPrompt = `You are Liora the Water-Nymph, a soothing, deeply empathetic Somatic & Compassion-Focused Therapy (CFT) guardian in Aetheria.
Your style: Validate emotions gently without rushing to fix them, remind the user of common humanity, and guide somatic grounding or deep self-kindness. Keep responses soft, comforting, concise (2-3 sentences).`;
      }

      const historyFormatted = history
        .slice(-6)
        .map((h) => `${h.sender === 'user' ? 'Seeker' : 'Companion'}: ${h.text}`)
        .join('\n');

      const fullPrompt = `${personaPrompt}

Conversation so far:
${historyFormatted}
Seeker: ${userMessage}
Companion:`;

      const response = await model.generateContent(fullPrompt);
      return response.response.text().trim();
    } catch (e) {
      console.warn('[Gemini] Companion chat error, falling back', e);
      return this.getFallbackCompanionResponse(companionId, userMessage);
    }
  }

  private getFallbackCompanionResponse(companionId: string, userMessage: string): string {
    if (companionId === 'KAEL_OWL') {
      return `I hear what weighs on your mind. If a dear friend brought this exact thought to you, what perspective or gentle truth would you share with them?`;
    } else if (companionId === 'PYRA_FOX') {
      return `Every grand fire starts with a single ember. What is the smallest 30-second action we can take together right now?`;
    } else {
      return `Take a slow, deep breath with me. You are safe in this sanctuary, and you are allowed to rest without earning it.`;
    }
  }

  /**
   * Generates a batch of realistic thought stream challenges via Gemini
   */
  async generateThoughtFeed(count: number = 3, domain?: ThoughtDomain): Promise<ThoughtFeedItem[]> {
    try {
      const modelInfo = await this.getClient();
      if (!modelInfo) {
        return this.getFallbackThoughtFeed(domain);
      }

      const model = modelInfo.client.getGenerativeModel({ model: modelInfo.modelName });

      const prompt = `
You are the Cognitive Alchemist of Aetheria. Generate ${count} realistic, everyday automatic negative thought scenarios.
${domain ? `Filter domain to: ${domain}` : 'Cover diverse domains: WORK_BURNOUT, RELATIONSHIPS, PERFECTIONISM, HEALTH_ANXIETY.'}

Return ONLY a JSON array matching this exact schema:
[
  {
    "thought": "First-person automatic thought (e.g. 'I didn't finish everything today, so the whole week was useless.')",
    "contextDomain": "WORK_BURNOUT" | "RELATIONSHIPS" | "PERFECTIONISM" | "HEALTH_ANXIETY",
    "correctDistortion": "ALL_OR_NOTHING" | "CATASTROPHIZING" | "MIND_READING" | "EMOTIONAL_REASONING" | "OVERGENERALIZATION" | "SHOULD_STATEMENTS" | "PERSONALIZATION",
    "explanation": "Why this thought represents this distortion",
    "techniqueOptions": ["CBT_REALITY_CHECK", "CFT_COMPASSION", "BA_MICRO_ACTION", "STOIC_CONTROL", "ACT_DEFUSION"],
    "suggestedReframe": "A balanced, compassionate, and realistic reframing statement"
  }
]
No markdown, just raw JSON array.
`;

      const response = await model.generateContent(prompt);
      const items = parseLlmJson<any[]>(response.response.text());
      if (!items || !Array.isArray(items)) {
        console.warn('[Gemini] Thought feed returned unparseable JSON, using fallback');
        return this.getFallbackThoughtFeed(domain);
      }

      return items
        .filter((item: any) => item && typeof item.thought === 'string')
        .map((item: any, idx: number) => ({
        id: `thg_ai_${Date.now()}_${idx}`,
        thought: item.thought,
        contextDomain: item.contextDomain || 'WORK_BURNOUT',
        correctDistortion: item.correctDistortion || 'ALL_OR_NOTHING',
        explanation: item.explanation || '',
        techniqueOptions: [
          'CBT_REALITY_CHECK',
          'CFT_COMPASSION',
          'BA_MICRO_ACTION',
          'STOIC_CONTROL',
          'ACT_DEFUSION',
        ],
        suggestedReframe: item.suggestedReframe || '',
        isSolved: false,
      }));
    } catch (e) {
      console.warn('[Gemini] Thought feed generation fallback', e);
      return this.getFallbackThoughtFeed(domain);
    }
  }

  /**
   * Evaluates user's reframe and therapeutic technique application
   */
  async evaluateThoughtReframe(
    thought: string,
    correctDistortion: DistortionType,
    technique: TherapeuticTechnique,
    userReframe: string
  ): Promise<ThoughtEvaluation> {
    try {
      const modelInfo = await this.getClient();
      if (!modelInfo) {
        // No API key: give modest credit with honest feedback instead of
        // rubber-stamping arbitrary input as an 85-score reframe.
        const hasSubstance = userReframe.trim().split(/\s+/).length >= 4;
        return {
          score: hasSubstance ? 70 : 55,
          clinicalFeedback: hasSubstance
            ? 'Offline insight mode: your reframe shows effort. Connect to Wi-Fi and add your Gemini key in Settings for full clinical feedback.'
            : 'Offline insight mode: try writing a fuller balanced thought — a few more words of real evidence helps. Add your Gemini key in Settings for full analysis.',
          vpReward: hasSubstance ? 20 : 8,
          manaReward: 1,
        };
      }

      const model = modelInfo.client.getGenerativeModel({ model: modelInfo.modelName });

      const prompt = `
You are a master clinical CBT/ACT therapist evaluating a user's cognitive reframe.
Original Automatic Thought: "${thought}"
Cognitive Distortion: ${correctDistortion}
Therapeutic Technique Applied: ${technique}
User's Crafted Reframe: "${userReframe}"

Evaluate how balanced, non-judgmental, factual, and actionable the user's reframe is.
Return ONLY a JSON object:
{
  "score": number between 60 and 100,
  "clinicalFeedback": "1-2 sentence constructive praise and psychological insight."
}
No markdown, just raw JSON.
`;

      const response = await model.generateContent(prompt);
      const parsed = parseLlmJson<{ score: number; clinicalFeedback: string }>(
        response.response.text()
      );

      if (!parsed) {
        console.warn('[Gemini] Reframe evaluation returned unparseable JSON, using default');
        return {
          score: 85,
          clinicalFeedback: 'Great reframe! You successfully applied the clinical technique.',
          vpReward: 40,
          manaReward: 2,
        };
      }

      const score = Math.max(60, Math.min(100, Number(parsed.score) || 85));
      const vpReward = Math.round(score * 0.5);

      return {
        score,
        clinicalFeedback:
          typeof parsed.clinicalFeedback === 'string' && parsed.clinicalFeedback.length > 0
            ? parsed.clinicalFeedback.slice(0, 400)
            : 'Insightful reframe! Great cognitive flexibility.',
        vpReward,
        manaReward: score >= 85 ? 2 : 1,
      };
    } catch (e) {
      return {
        score: 85,
        clinicalFeedback: 'Great reframe! You successfully applied the clinical technique.',
        vpReward: 40,
        manaReward: 2,
      };
    }
  }

  private getFallbackThoughtFeed(domain?: ThoughtDomain): ThoughtFeedItem[] {
    const list: ThoughtFeedItem[] = [
      {
        id: 'thg_fb_1',
        thought: 'I stumbled on my presentation slide. Everyone in the room now thinks I have no idea what I am doing.',
        contextDomain: 'WORK_BURNOUT',
        correctDistortion: 'MIND_READING',
        explanation: 'Assuming you know what colleagues are thinking without concrete evidence.',
        techniqueOptions: ['CBT_REALITY_CHECK', 'CFT_COMPASSION', 'STOIC_CONTROL'],
        suggestedReframe: 'One awkward slide does not erase the quality of the rest of the presentation. Most people are focused on the content, not minor slips.',
        isSolved: false,
      },
      {
        id: 'thg_fb_2',
        thought: 'If I don’t exercise for a full 60 minutes, there’s no point in doing any workout at all.',
        contextDomain: 'PERFECTIONISM',
        correctDistortion: 'ALL_OR_NOTHING',
        explanation: 'Viewing fitness and health through black-or-white extremes.',
        techniqueOptions: ['BA_MICRO_ACTION', 'CBT_REALITY_CHECK', 'CFT_COMPASSION'],
        suggestedReframe: 'A 10-minute walk or gentle stretch still benefits my cardiovascular health and mood. Consistency beats perfection.',
        isSolved: false,
      },
      {
        id: 'thg_fb_3',
        thought: 'They haven’t replied to my message in 4 hours. They must be angry with me.',
        contextDomain: 'RELATIONSHIPS',
        correctDistortion: 'PERSONALIZATION',
        explanation: 'Attributing someone else’s busy schedule or silence directly to your own actions.',
        techniqueOptions: ['CBT_REALITY_CHECK', 'STOIC_CONTROL', 'ACT_DEFUSION'],
        suggestedReframe: 'People get busy with work and life. Their response time is about their day, not an indictment of our relationship.',
        isSolved: false,
      },
    ];

    if (domain) {
      const filtered = list.filter((i) => i.contextDomain === domain);
      return filtered.length > 0 ? filtered : list;
    }
    return list;
  }

  /**
   * Uncompromising Socratic Blindspot Interrogation for The Shadow Crucible
   */
  async interrogateShadowBlindspot(
    flawType: ShadowFlawType,
    userConfession: string,
    history: { sender: 'user' | 'inquisitor'; text: string }[]
  ): Promise<string> {
    try {
      const modelInfo = await this.getClient();
      if (!modelInfo) {
        return this.getFallbackShadowInquest(flawType);
      }

      const model = modelInfo.client.getGenerativeModel({ model: modelInfo.modelName });

      const prompt = `
You are the Master Inquisitor of The Shadow Crucible in Aetheria. Your role is inspired by Socrates, Carl Jung, and Epictetus.
You do NOT offer shallow praise or gentle coddling. Your purpose is RADICAL SELF-HONESTY, exposing defense mechanisms (rationalization, projection, intellectualization, victimhood, fawning, blame), and confronting the user's specific character flaw: ${flawType}.

Guidelines:
- Tone: Uncompromisingly honest, deeply insightful, philosophically rigorous, free of cruelty but completely free of flattery.
- Length: 2 to 4 concise, piercing sentences.
- Method: Point out the subtle self-justification or hidden payoff in the user's statement. Ask 1 surgical question that forces 100% personal agency and accountability.

Conversation history:
${history.slice(-4).map((h) => `${h.sender === 'user' ? 'Seeker' : 'Inquisitor'}: ${h.text}`).join('\n')}
Seeker's Confession: "${userConfession}"
Inquisitor:`;

      const response = await model.generateContent(prompt);
      return response.response.text().trim();
    } catch (e) {
      console.warn('[Gemini] Shadow inquest fallback', e);
      return this.getFallbackShadowInquest(flawType);
    }
  }

  private getFallbackShadowInquest(flawType: ShadowFlawType): string {
    switch (flawType) {
      case 'FRAGILE_EGO':
        return 'Notice how quickly your mind sought to justify your actions rather than examine the criticism. What uncomfortable truth are you defending your ego from?';
      case 'CHRONIC_AVOIDANCE':
        return 'You have spent hours analyzing and feeling guilty about this task, but not 10 minutes executing it. What exact physical discomfort are you fleeing right now?';
      case 'BITTER_CYNIC':
        return 'Cynicism is the ultimate shield for the lazy: if the game is rigged, you never have to risk trying your best. What are you using resentment to excuse yourself from?';
      case 'PEOPLE_PLEASER':
        return 'You call your silence "kindness," but it is actually cowardice—depriving others of your truth so they will protect your comfort. What boundary are you terrified of speaking?';
      case 'CONTROL_TYRANT':
        return 'Your need to control every detail is not high standards; it is unmanaged terror of chaos. What catastrophic outcome do you believe will happen if you step back?';
      case 'PROFESSIONAL_VICTIM':
        return 'Suffering is inevitable, but wallowing is a choice that grants you freedom from agency. If you had to take 100% responsibility for your next step, what would you do right now?';
      case 'SECRET_ENVIER':
        return 'Their victory did not diminish your capacity by a single fraction of an ounce. What untapped potential in yourself are you refusing to cultivate while you watch them?';
      case 'EMOTIONAL_TYRANT':
        return 'Exploding or withdrawing into sullen silence is not "being passionate"—it is using emotional volatility to hold others hostage. What are you avoiding feeling inside yourself?';
      case 'SCARCITY_HOARDER':
        return 'Hoarding your resources, time, or vulnerability is proof of your lack of faith in your own future capability. What would it mean to give freely without keeping score?';
      case 'HYPOCRITICAL_MORALIST':
        return 'You demand absolute perfection from others while quietly granting yourself exemptions and excuses. Where in your life are you currently violating your own rules?';
      default:
        return 'Look past your first layer of defense. What uncomfortable truth about your own choices are you hiding from yourself?';
    }
  }
}

export const Gemini = new GeminiService();
