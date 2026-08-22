import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { TaskItem, EnergyTier } from '../../core/types';
import { Colors, Spacing } from '../../core/theme';
import { Gemini } from '../../core/ai/gemini';
import { EventBus } from '../../core/eventbus/EventBus';
import {
  CheckSquare,
  Square,
  Plus,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react-native';

interface TaskManagerProps {
  tasks: TaskItem[];
  energyTier: EnergyTier;
  onTasksUpdated: (tasks: TaskItem[]) => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  energyTier,
  onTasksUpdated,
}) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'WORK' | 'CHORE' | 'STUDY' | 'CREATIVE'>('WORK');
  const [isDecomposing, setIsDecomposing] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const handleCreateTask = async (useAiBreakdown: boolean) => {
    if (!newTaskTitle.trim()) {
      Alert.alert('Empty Title', 'Please enter a task name.');
      return;
    }

    let subTasks: { id: string; title: string; isCompleted: boolean }[] = [];

    if (useAiBreakdown) {
      setIsDecomposing(true);
      try {
        const steps = await Gemini.decomposeTask(newTaskTitle, energyTier);
        subTasks = steps.map((s, idx) => ({
          id: `st_${Date.now()}_${idx}`,
          title: s,
          isCompleted: false,
        }));
      } finally {
        setIsDecomposing(false);
      }
    }

    const newTask: TaskItem = {
      id: 'tsk_' + Date.now(),
      title: newTaskTitle,
      category: newTaskCategory,
      energyTier: energyTier,
      subTasks: subTasks,
      isCompleted: false,
      relicDrop: {
        id: 'rel_' + Date.now(),
        name: 'Relic of Accomplishment',
        description: '+10 Compassion Aura in Mind Arena battles',
        statBoost: 'COMPASSION_AURA',
        boostAmount: 10,
      },
      createdAt: new Date().toISOString(),
    };

    const updated = [newTask, ...tasks];
    onTasksUpdated(updated);
    setIsAddModalVisible(false);
    setNewTaskTitle('');
  };

  const toggleSubTask = (taskId: string, subTaskId: string) => {
    const updated = tasks.map((t) => {
      if (t.id !== taskId) return t;
      const nextSubs = t.subTasks.map((st) =>
        st.id === subTaskId ? { ...st, isCompleted: !st.isCompleted } : st
      );
      const allDone = nextSubs.length > 0 && nextSubs.every((s) => s.isCompleted);
      return { ...t, subTasks: nextSubs, isCompleted: allDone };
    });
    onTasksUpdated(updated);
  };

  const toggleTaskComplete = (task: TaskItem) => {
    const isNowDone = !task.isCompleted;
    const updated = tasks.map((t) =>
      t.id === task.id
        ? {
            ...t,
            isCompleted: isNowDone,
            subTasks: t.subTasks.map((st) => ({ ...st, isCompleted: isNowDone })),
          }
        : t
    );
    onTasksUpdated(updated);

    if (isNowDone) {
      EventBus.emit('task:completed', {
        taskId: task.id,
        relicDropped: task.relicDrop,
      });
      if (task.relicDrop) {
        Alert.alert(
          '🎉 Mythical Relic Dropped!',
          `You earned "${task.relicDrop.name}" (${task.relicDrop.description}) to empower your Mind Arena deck!`
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Real-World Tasks & GTD</Text>
          <Text style={styles.subtitle}>Tasks drop relics & mana for your Mind Arena</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => setIsAddModalVisible(true)}>
          <Plus size={16} color="#0A0A0E" />
          <Text style={styles.addBtnText}>New Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={{ gap: Spacing.sm }}
        renderItem={({ item }) => {
          const isExpanded = expandedTaskId === item.id;
          return (
            <View style={[styles.taskCard, item.isCompleted && styles.taskCardDone]}>
              <View style={styles.taskHeader}>
                <TouchableOpacity
                  onPress={() => toggleTaskComplete(item)}
                  style={styles.checkboxTouch}
                >
                  {item.isCompleted ? (
                    <CheckSquare size={20} color={Colors.vitalityGreen} />
                  ) : (
                    <Square size={20} color={Colors.textMuted} />
                  )}
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                  <Text style={[styles.taskTitle, item.isCompleted && styles.taskTitleDone]}>
                    {item.title}
                  </Text>
                  <View style={styles.categoryPill}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                    {item.relicDrop && (
                      <View style={styles.relicBadge}>
                        <Award size={10} color={Colors.reframeGold} />
                        <Text style={styles.relicText}>Loot Drop</Text>
                      </View>
                    )}
                  </View>
                </View>

                {item.subTasks.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setExpandedTaskId(isExpanded ? null : item.id)}
                    style={styles.expandBtn}
                  >
                    {isExpanded ? (
                      <ChevronUp size={16} color={Colors.textMuted} />
                    ) : (
                      <ChevronDown size={16} color={Colors.textMuted} />
                    )}
                  </TouchableOpacity>
                )}
              </View>

              {/* Sub-tasks checklist */}
              {isExpanded && item.subTasks.length > 0 && (
                <View style={styles.subTaskList}>
                  {item.subTasks.map((st) => (
                    <TouchableOpacity
                      key={st.id}
                      style={styles.subTaskRow}
                      onPress={() => toggleSubTask(item.id, st.id)}
                    >
                      {st.isCompleted ? (
                        <CheckSquare size={16} color={Colors.vitalityGreen} />
                      ) : (
                        <Square size={16} color={Colors.textMuted} />
                      )}
                      <Text style={[styles.subTaskText, st.isCompleted && styles.taskTitleDone]}>
                        {st.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        }}
      />

      {/* Add Task Modal */}
      <Modal visible={isAddModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Task</Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)}>
                <X size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="e.g., Complete monthly expense report..."
              placeholderTextColor={Colors.textMuted}
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.regularAddBtn}
                onPress={() => handleCreateTask(false)}
                disabled={isDecomposing}
              >
                <Text style={styles.regularAddBtnText}>Add Direct</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.aiBreakdownBtn}
                onPress={() => handleCreateTask(true)}
                disabled={isDecomposing}
              >
                {isDecomposing ? (
                  <ActivityIndicator color="#0A0A0E" size="small" />
                ) : (
                  <>
                    <Sparkles size={14} color="#0A0A0E" />
                    <Text style={styles.aiBreakdownBtnText}>AI Break Down with Gemini</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.clarityMana,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  addBtnText: {
    color: '#0A0A0E',
    fontSize: 12,
    fontWeight: '700',
  },
  taskCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  taskCardDone: {
    opacity: 0.6,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxTouch: {
    marginRight: Spacing.sm,
    paddingTop: 2,
  },
  taskTitle: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  categoryText: {
    backgroundColor: Colors.surfaceLight,
    color: Colors.textSecondary,
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '600',
  },
  relicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  relicText: {
    color: Colors.reframeGold,
    fontSize: 10,
    fontWeight: '700',
  },
  expandBtn: {
    padding: 4,
  },
  subTaskList: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 8,
  },
  subTaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: Spacing.sm,
  },
  subTaskText: {
    color: Colors.textSecondary,
    fontSize: 12,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  modalCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modalTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: Spacing.md,
    color: Colors.textPrimary,
    fontSize: 14,
    marginBottom: Spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  regularAddBtn: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  regularAddBtnText: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  aiBreakdownBtn: {
    flex: 2,
    backgroundColor: Colors.reframeGold,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  aiBreakdownBtnText: {
    color: '#0A0A0E',
    fontSize: 13,
    fontWeight: '700',
  },
});
