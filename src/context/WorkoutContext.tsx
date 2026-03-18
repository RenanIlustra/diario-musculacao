'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Exercise, WorkoutRecord, MuscleGroupType, MUSCLE_GROUPS, DEFAULT_EXERCISES } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface WorkoutContextType {
  user: User | null;
  loading: boolean;
  activeGroup: MuscleGroupType;
  setActiveGroup: (group: MuscleGroupType) => void;
  exercises: Exercise[];
  records: WorkoutRecord[];
  addExercise: (name: string, groupId?: MuscleGroupType) => Promise<void>;
  addRecord: (exerciseId: string, weight: number, reps: number) => Promise<void>;
  getExerciseRecords: (exerciseId: string) => WorkoutRecord[];
  getLastRecord: (exerciseId: string) => WorkoutRecord | null;
  logout: () => Promise<void>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState<MuscleGroupType>(MUSCLE_GROUPS[0]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [records, setRecords] = useState<WorkoutRecord[]>([]);

  // Listen for auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch initial data from Supabase when user logs in
  const fetchData = useCallback(async (userId: string) => {
    // 1. Fetch User Exercises
    const { data: userExercises, error: exError } = await supabase
      .from('exercises')
      .select('*')
      .eq('user_id', userId);
    
    // 2. Combine with default exercises (for UI)
    // In Supabase, we might only store custom ones or use a 'is_default' flag per user
    // However, to keep it simple, we'll merge
    if (!exError) {
      setExercises([...DEFAULT_EXERCISES, ...userExercises]);
    }

    // 3. Fetch Records
    const { data: userRecords, error: recError } = await supabase
      .from('workout_records')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (!recError) {
      setRecords(userRecords);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchData(user.id);
    } else {
      setExercises([]);
      setRecords([]);
    }
  }, [user, fetchData]);

  const addExercise = useCallback(async (name: string, groupId?: MuscleGroupType) => {
    if (!user) return;

    const newExercise = {
      user_id: user.id,
      name,
      group_id: groupId || activeGroup,
      custom: true,
    };

    const { data, error } = await supabase
      .from('exercises')
      .insert(newExercise)
      .select()
      .single();

    if (error) {
      console.error('Error adding exercise:', error);
      return;
    }

    setExercises(prev => [...prev, data]);
  }, [user, activeGroup]);

  const addRecord = useCallback(async (exerciseId: string, weight: number, reps: number) => {
    if (!user) return;

    const newRecord = {
      user_id: user.id,
      exercise_id: exerciseId,
      weight,
      reps,
      date: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('workout_records')
      .insert(newRecord)
      .select()
      .single();

    if (error) {
      console.error('Error adding record:', error);
      return;
    }

    setRecords(prev => [data, ...prev]);
  }, [user]);

  const getExerciseRecords = useCallback((exerciseId: string) => {
    return records
      .filter(r => r.exercise_id === exerciseId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [records]);

  const getLastRecord = useCallback((exerciseId: string) => {
    const exerciseRecords = getExerciseRecords(exerciseId);
    return exerciseRecords.length > 0 ? exerciseRecords[0] : null;
  }, [getExerciseRecords]);

  const logout = async () => {
    await supabase.auth.signOut();
  }

  return (
    <WorkoutContext.Provider value={{
      user,
      loading,
      activeGroup,
      setActiveGroup,
      exercises,
      records,
      addExercise,
      addRecord,
      getExerciseRecords,
      getLastRecord,
      logout
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
