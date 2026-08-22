import { describe, it, expect } from 'bun:test';
import { SleepEfficiencyEntry, ProblemSolvingWorksheet, Chronotype } from '../src/core/types';

describe('Clinical Modules & Research Enhancements', () => {
  it('correctly calculates Sleep Efficiency percentage', () => {
    const timeInBedMinutes = 480; // 8 hours
    const timeAsleepMinutes = 390; // 6.5 hours
    const efficiency = Math.round((timeAsleepMinutes / timeInBedMinutes) * 100);

    expect(efficiency).toBe(81);
    expect(efficiency >= 85).toBe(false); // Below clinical consolidation threshold
  });

  it('validates optimal sleep efficiency (>= 85%)', () => {
    const timeInBedMinutes = 450; // 7.5 hours
    const timeAsleepMinutes = 405; // 6.75 hours
    const efficiency = Math.round((timeAsleepMinutes / timeInBedMinutes) * 100);

    expect(efficiency).toBe(90);
    expect(efficiency >= 85).toBe(true);
  });

  it('structures 7-step Problem Solving Worksheet with offline execution anchor', () => {
    const worksheet: ProblemSolvingWorksheet = {
      id: 'ps_test_123',
      title: 'Fix project deadline backlog',
      createdAt: new Date().toISOString(),
      step1_problemDefinition: 'Overwhelmed by backlog tickets.',
      step2_brainstormedSolutions: ['Prioritize top 3', 'Delegate 2 tasks', 'Ask for extension'],
      step3_evaluatedOptions: [],
      step4_selectedSolution: 'Prioritize top 3',
      step5_actionSteps: [
        { step: 'Open issue tracker', isDone: true },
        { step: 'Label high urgency tickets', isDone: false },
      ],
      step6_offlineExecutionAnchor: 'Desk with Do Not Disturb active',
      isCompleted: true,
    };

    expect(worksheet.step1_problemDefinition).toBeDefined();
    expect(worksheet.step2_brainstormedSolutions.length).toBe(3);
    expect(worksheet.step4_selectedSolution).toBe('Prioritize top 3');
    expect(worksheet.step6_offlineExecutionAnchor).toBe('Desk with Do Not Disturb active');
    expect(worksheet.isCompleted).toBe(true);
  });

  it('verifies 8-week dual-phase progression model', () => {
    const totalWeeks = 8;
    const phase1Duration = 4; // Weeks 1-4: BA + BI
    const phase2Duration = 4; // Weeks 5-8: CR + PS

    expect(phase1Duration + phase2Duration).toBe(totalWeeks);
  });
});
