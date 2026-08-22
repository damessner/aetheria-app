import { GoogleGenerativeAI } from '@google/generative-ai';
import { DistortionType, CombatCard, EnergyTier, QuestItem } from '../types';
import { Database } from '../database/db';

class GeminiService {
  private async getClient(): Promise<{ client: GoogleGenerativeAI; modelName: string } | null> {
    const userState = await Database.getUserState();
    const apiKey =
      userState.preferences.geminiApiKey ||
      process.env.EXPO_PUBLIC_GEMINI_API_KEY ||
      '';

    if (!apiKey) {
      return null;
    }
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
      const text = response.response.text().trim();
      const cleanJson = text.replace(/^```json\s*/, '').replace(/```$/, '').trim();
      const parsed = JSON.parse(cleanJson);

      const generatedCards: CombatCard[] = parsed.cards.map((c: any, index: number) => ({
        id: `crd_gemini_${Date.now()}_${index}`,
        name: c.name,
        category: c.category,
        manaCost: index === 0 ? 1 : 2,
        baseDamage: c.baseDamage || 25,
        shieldValue: c.category === 'COMPASSION' ? 20 : 5,
        promptText: c.promptText,
        targetDistortionBonus: {
          distortion: parsed.distortion,
          multiplier: 1.5,
        },
        isGeminiGenerated: true,
      }));

      return {
        distortion: parsed.distortion as DistortionType,
        explanation: parsed.explanation,
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
      const text = response.response.text().trim();
      const cleanJson = text.replace(/^```json\s*/, '').replace(/```$/, '').trim();
      return JSON.parse(cleanJson);
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
      const text = response.response.text().trim();
      const cleanJson = text.replace(/^```json\s*/, '').replace(/```$/, '').trim();
      const items = JSON.parse(cleanJson);

      return items.map((item: any, idx: number) => ({
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
}

export const Gemini = new GeminiService();
