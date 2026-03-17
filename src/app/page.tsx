'use client';

import { useWorkout } from '@/context/WorkoutContext';
import { MuscleGroupNav } from '@/components/MuscleGroupNav';
import { ExerciseCard } from '@/components/ExerciseCard';
import { AddExerciseDialog } from '@/components/AddExerciseDialog';
import { Dumbbell, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
          <>
            {activeExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
            
            <AddExerciseDialog 
              trigger={
                <Button variant="outline" className="w-full h-16 border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-all uppercase font-bold tracking-widest text-xs">
                  <Plus className="w-5 h-5 mr-1" />
                  ADICIONAR EXERCÍCIO EM {activeGroup}
                </Button>
              }
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-card/20 rounded-2xl border-2 border-dashed border-border/50 gap-4">
            <p className="text-muted-foreground">Nenhum exercício cadastrado para {activeGroup}.</p>
            <AddExerciseDialog 
              trigger={
                <Button className="font-bold">ADICIONAR PRIMEIRO EXERCÍCIO</Button>
              }
            />
          </div>
        )}
      </div>

      <AddExerciseDialog />
    </main>
  );
}
