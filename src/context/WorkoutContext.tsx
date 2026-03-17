'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Exercise, WorkoutRecord, MuscleGroupType, MUSCLE_GROUPS } from '@/lib/types';
import { storage } from '@/lib/storage';

interface WorkoutContextType {
  activeGroup: MuscleGroupType;
  setActiveGroup: (group: MuscleGroupType) => void;
  exercises: Exercise[];
  records: WorkoutRecord[];
  addExercise: (name: string) => void;
  addRecord: (exerciseId: string, weight: number, reps: number) => void;
  getExerciseRecords: (exerciseId: string) => WorkoutRecord[];
  getLastRecord: (exerciseId: string) => WorkoutRecord | null;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [activeGroup, setActiveGroup] = useState<MuscleGroupType>(MUSCLE_GROUPS[0]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [records, setRecords] = useState<WorkoutRecord[]>([]);

  // Load initial data
  useEffect(() => {
    setExercises(storage.getExercises());
    setRecords(storage.getRecords());
  }, []);

  const addExercise = useCallback((name: string) => {
    const newExercise: Exercise = {
      id: crypto.randomUUID(),
      name,
      groupId: activeGroup,
      custom: true,
    };
    storage.saveExercise(newExercise);
    setExercises(prev => [...prev, newExercise]);
  }, [activeGroup]);

  const addRecord = useCallback((exerciseId: string, weight: number, reps: number) => {
    const newRecord: WorkoutRecord = {
      id: crypto.randomUUID(),
      exerciseId,
      weight,
      reps,
      date: new Date().toISOString(),
    };
    storage.saveRecord(newRecord);
    setRecords(prev => [newRecord, ...prev]);
  }, []);

  const getExerciseRecords = useCallback((exerciseId: string) => {
    return records.filter(r => r.exerciseId === exerciseId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [records]);

  const getLastRecord = useCallback((exerciseId: string) => {
    const exerciseRecords = getExerciseRecords(exerciseId);
    return exerciseRecords.length > 0 ? exerciseRecords[0] : null;
  }, [getExerciseRecords]);

  return (
    <WorkoutContext.Provider value={{
      activeGroup,
      setActiveGroup,
      exercises,
      records,
      addExercise,
      addRecord,
      getExerciseRecords,
      getLastRecord
    }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}
