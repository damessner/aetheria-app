import { CrisisContact } from '../types';
import { OFFLINE_CRISIS_DIRECTORY } from '../security/crisisDirectory';

/**
 * Crisis-language detection for AI chat surfaces.
 *
 * When a user message matches high-risk patterns, the app MUST NOT route it
 * to an LLM. Instead the offline Crisis Bridge is shown immediately with
 * human hotline connections. Patterns are intentionally broad — a false
 * positive costs one modal dismissal; a false negative is unacceptable.
 */

export interface SafetyAssessment {
  isCrisis: boolean;
  /** Highest severity matched category, for logging/analytics */
  severity: 'IMMEDIATE' | 'HIGH' | null;
  /** Which pattern family triggered (for debugging) */
  matchedCategory?: string;
}

interface CrisisPattern {
  category: string;
  patterns: RegExp[];
}

const CRISIS_PATTERNS: CrisisPattern[] = [
  {
    category: 'SELF_HARM_SUICIDE',
    patterns: [
      /\b(kill|hurt|harm)\s+(myself|me)\b/i,
      /\b(end|taking|taking|take)\s+(my|one'?s)?\s*(own\s+)?life\b/i,
      /\bending my life\b/i,
      /\bsuicid(e|al)\b/i,
      /\bwant(ing)?\s+to\s+die\b/i,
      /\bbetter off (dead|without me)\b/i,
      /\b(better|good) without me\b/i,
      /\bno reason to (live|go on|continue)\b/i,
      /\bdon'?t want to (live|be alive|wake up|exist)\b/i,
      /\bshould (just )?not wake up\b/i,
      /\bnever wake up\b/i,
      /\bnot worth living\b/i,
      /\bself[-\s]?harm\b/i,
      /\bcut(ting)?\s+(myself|my wrists?|my arms?)\b/i,
      /\boverdos(e|ing)\b/i,
      /\btook (all )?my (pills|medication)\b/i,
      /\btake(n)? my (own )?(pills|medication)\b/i,
    ],
  },
  {
    category: 'HOPELESSNESS_ISOLATION',
    patterns: [
      /\bno (one|body) would (care|notice|miss)\b/i,
      /\beveryone would be better( off)? without me\b/i,
      /\bworld would be better (off )?without me\b/i,
      /\bdisappear forever\b/i,
    ],
  },
  {
    category: 'ABUSE_DANGER',
    patterns: [
      /\bhe (is |')?going to hurt me\b/i,
      /\bshe (is |')?going to hurt me\b/i,
      /\bthey'?re going to hurt me\b/i,
      /\bi('m| am) (afraid|scared) (of|that) (my husband|my wife|my partner|him|her|them)\b/i,
      /\bhurt(ing)? (my )?(child|kid|baby|son|daughter)\b/i,
    ],
  },
];

const COMPILED = CRISIS_PATTERNS.map((group) => ({
  category: group.category,
  regexes: group.patterns.map((p) => new RegExp(p.source, 'i')),
}));

/**
 * Benign phrases that contain trigger words ("die my hair", "suicide
 * prevention hotline"). Stripped BEFORE pattern matching so help-seeking
 * and idiomatic language don't raise false alarms.
 */
const BENIGN_IDIOMS = [
  /\b(die|dye)\s+my\s+hair\b/gi,
  /\bsuicide\s+(prevention|hotline|awareness|lifeline)\b/gi,
  /\b(work|job|stress|homework|school)\s+(is|are)\s+killing me\b/gi,
  /\bbe the death of me\b/gi,
];

export function assessCrisisRisk(message: string): SafetyAssessment {
  if (!message || message.trim().length < 3) {
    return { isCrisis: false, severity: null };
  }

  // Neutralize known-benign idioms first
  let normalized = message;
  for (const idiom of BENIGN_IDIOMS) {
    normalized = normalized.replace(idiom, ' ');
  }

  for (const group of COMPILED) {
    for (const regex of group.regexes) {
      if (regex.test(normalized)) {
        const immediate = group.category === 'SELF_HARM_SUICIDE';
        return {
          isCrisis: true,
          severity: immediate ? 'IMMEDIATE' : 'HIGH',
          matchedCategory: group.category,
        };
      }
    }
  }

  return { isCrisis: false, severity: null };
}

/** The localized crisis contacts surfaced by the safety interceptor */
export function getCrisisContacts(): CrisisContact[] {
  return OFFLINE_CRISIS_DIRECTORY;
}
