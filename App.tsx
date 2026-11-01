import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type StudyTask = {
  id: number;
  title: string;
  done: boolean;
};

type Flashcard = {
  id: number;
  topic: string;
  question: string;
  answer: string;
};

const initialTasks: StudyTask[] = [
  { id: 1, title: 'Review React Native components', done: false },
  { id: 2, title: 'Practice JavaScript fundamentals', done: true },
  { id: 3, title: 'Read 20 minutes of notes', done: false },
];

const flashcards: Flashcard[] = [
  {
    id: 1,
    topic: 'React Native',
    question: 'What is the purpose of a StyleSheet?',
    answer: 'It organizes and centralizes styling for components in a clean, reusable way.',
  },
  {
    id: 2,
    topic: 'Study habits',
    question: 'What helps most when learning a new concept?',
    answer: 'A mix of active recall, short study sessions, and regular review.',
  },
  {
    id: 3,
    topic: 'Time management',
    question: 'Why break study into small blocks?',
    answer: 'It improves focus, reduces overwhelm, and helps retention.',
  },
];

export default function App() {
  const [tasks, setTasks] = useState<StudyTask[]>(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks]
  );

  const currentCard = flashcards[cardIndex];

  const addTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) {
      return;
    }

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: trimmed,
        done: false,
      },
    ]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const nextCard = () => {
    setShowAnswer(false);
    setCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>StudyFlow</Text>
          <Text style={styles.title}>Daily progress</Text>
          <Text style={styles.progressText}>
            {completedCount}/{tasks.length} tasks complete
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Add study task</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={newTask}
              onChangeText={setNewTask}
              placeholder="Enter topic or task"
              placeholderTextColor="#94a3b8"
              style={styles.input}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Today’s plan</Text>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={[
                styles.taskRow,
                task.done && styles.taskRowDone,
              ]}
              onPress={() => toggleTask(task.id)}
            >
              <View style={[styles.check, task.done && styles.checkDone]} />
              <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
                {task.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Quick review</Text>
          <Text style={styles.cardTopic}>{currentCard.topic}</Text>
          <Text style={styles.cardQuestion}>{currentCard.question}</Text>

          {showAnswer ? (
            <View style={styles.answerBox}>
              <Text style={styles.answerTitle}>Answer</Text>
              <Text style={styles.answerText}>{currentCard.answer}</Text>
            </View>
          ) : null}

          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setShowAnswer((prev) => !prev)}
            >
              <Text style={styles.secondaryButtonText}>
                {showAnswer ? 'Hide answer' : 'Reveal answer'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={nextCard}>
              <Text style={styles.primaryButtonText}>Next card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  eyebrow: {
    color: '#7dd3fc',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 8,
  },
  progressText: {
    color: '#cbd5e1',
    fontSize: 16,
    marginTop: 8,
  },
  sectionCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  addButton: {
    backgroundColor: '#38bdf8',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addButtonText: {
    color: '#082f49',
    fontWeight: '700',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  taskRowDone: {
    opacity: 0.7,
  },
  check: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#7dd3fc',
    marginRight: 10,
  },
  checkDone: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  taskText: {
    color: '#e2e8f0',
    fontSize: 15,
    flexShrink: 1,
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  cardTopic: {
    color: '#7dd3fc',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  cardQuestion: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  answerBox: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
  },
  answerTitle: {
    color: '#a7f3d0',
    fontWeight: '700',
    marginBottom: 6,
  },
  answerText: {
    color: '#e2e8f0',
    fontSize: 15,
    lineHeight: 22,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 6,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#f8fafc',
    fontWeight: '700',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#052e16',
    fontWeight: '700',
  },
});
