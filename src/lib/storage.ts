import { Exercise, WorkoutRecord, MUSCLE_GROUPS, DEFAULT_EXERCISES, MuscleGroupType } from './types';

const KEYS = {
  EXERCISES: 'workout_exercises',
  RECORDS: 'workout_records',
};

export const storage = {
  getExercises: (): Exercise[] => {
    if (typeof window === 'undefined') return DEFAULT_EXERCISES;
    const stored = localStorage.getItem(KEYS.EXERCISES);
    if (!stored) {
      localStorage.setItem(KEYS.EXERCISES, JSON.stringify(DEFAULT_EXERCISES));
      return DEFAULT_EXERCISES;
    }
    return JSON.parse(stored);
  },

  saveExercise: (exercise: Exercise) => {
    const exercises = storage.getExercises();
    exercises.push(exercise);
    localStorage.setItem(KEYS.EXERCISES, JSON.stringify(exercises));
  },

  getRecords: (exerciseId?: string): WorkoutRecord[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(KEYS.RECORDS);
    const records: WorkoutRecord[] = stored ? JSON.parse(stored) : [];
    if (exerciseId) {
      return records.filter(r => r.exerciseId === exerciseId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return records;
  },

  saveRecord: (record: WorkoutRecord) => {
    const records = storage.getRecords();
    records.push(record);
    localStorage.setItem(KEYS.RECORDS, JSON.stringify(records));
  },

  getLastRecord: (exerciseId: string): WorkoutRecord | null => {
    const records = storage.getRecords(exerciseId);
    return records.length > 0 ? records[0] : null;
  }
};
