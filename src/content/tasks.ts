// Auto-extracted seed content from core/database/db.ts (Phase 3 refactor)
import { TaskItem } from '../core/types';

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'tsk_sample_1',
    title: 'Review Project PR & Merge Route',
    description: 'Review code changes and execute tests before deployment.',
    category: 'WORK',
    energyTier: 'STEADY_40',
    subTasks: [
      { id: 'st_1', title: 'Open GitHub Pull Request', isCompleted: true },
      { id: 'st_2', title: 'Read diff line by line', isCompleted: false },
      { id: 'st_3', title: 'Run automated tests locally', isCompleted: false },
    ],
    isCompleted: false,
    relicDrop: {
      id: 'rel_chronos_lens',
      name: 'Lens of Clarity',
      description: '+10 Logic Edge in Arena Battles',
      statBoost: 'LOGIC_EDGE',
      boostAmount: 10,
    },
    createdAt: new Date().toISOString(),
  },
];
