import { useState, useCallback } from 'react';
import { assessCrisisRisk } from '../security/crisisDetection';

/**
 * Guards AI chat send handlers: when a message matches crisis patterns,
 * the callback short-circuits (no LLM call) and the Crisis Bridge is shown.
 */
export function useCrisisGuard(onCrisisDetected?: () => void) {
  const [crisisModalVisible, setCrisisModalVisible] = useState(false);

  /**
   * Returns true when the message is SAFE to send to the LLM.
   * When it returns false, the crisis modal has been triggered and the
   * caller must abort its send path.
   */
  const guardMessage = useCallback(
    (text: string): boolean => {
      const assessment = assessCrisisRisk(text);
      if (assessment.isCrisis) {
        setCrisisModalVisible(true);
        onCrisisDetected?.();
        return false;
      }
      return true;
    },
    [onCrisisDetected]
  );

  const dismissCrisisModal = useCallback(() => setCrisisModalVisible(false), []);

  return { crisisModalVisible, dismissCrisisModal, guardMessage };
}
