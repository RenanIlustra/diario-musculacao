'use client';

import { useWorkout } from '@/context/WorkoutContext';
import { MUSCLE_GROUPS } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export function MuscleGroupNav() {
  const { activeGroup, setActiveGroup } = useWorkout();

  return (
    <div className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-2xl mx-auto w-full">
        <ScrollArea className="w-full whitespace-nowrap pt-4 pb-2">
          <div className="flex w-max space-x-2 px-4">
            {MUSCLE_GROUPS.map((group) => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 uppercase tracking-wider font-sans",
                  activeGroup === group
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                )}
              >
                {group}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </div>
  );
}
