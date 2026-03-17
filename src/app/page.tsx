'use client';

import { useWorkout } from '@/context/WorkoutContext';
import { MuscleGroupNav } from '@/components/MuscleGroupNav';
import { ExerciseCard } from '@/components/ExerciseCard';
import { AddExerciseDialog } from '@/components/AddExerciseDialog';
import { Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const { activeGroup, exercises } = useWorkout();

  const activeExercises = exercises.filter(e => e.groupId === activeGroup);

  return (
    <main className="min-h-screen pb-32">
      {/* Header */}
      <header className="p-6 pb-2 text-center bg-background/50 backdrop-blur-sm border-b border-border/10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Dumbbell className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-black tracking-tighter text-foreground italic">GYM TRACKER</h1>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Progressão de Carga • Diário de Treino</p>
      </header>

      <MuscleGroupNav />

      {/* Main Content */}
      <div className="p-4 space-y-4 max-w-2xl mx-auto mt-4">
        {activeExercises.length > 0 ? (
          activeExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))
        ) : (
          <div className="text-center py-20 bg-card/20 rounded-2xl border-2 border-dashed border-border/50">
            <p className="text-muted-foreground">Nenhum exercício cadastrado para {activeGroup}.</p>
          </div>
        )}
      </div>

      <AddExerciseDialog />
    </main>
  );
}
