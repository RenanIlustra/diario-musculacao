'use client';

import { useState, useEffect } from 'react';
import { Exercise, WorkoutRecord } from '@/lib/types';
import { useWorkout } from '@/context/WorkoutContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { History, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { ProgressionBadge } from './ProgressionBadge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const { addRecord, getExerciseRecords } = useWorkout();
  const records = getExerciseRecords(exercise.id);
  const lastRecord = records[0] || null;
  const previousRecord = records[1] || null;

  const [weight, setWeight] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Pre-fill with last record
  useEffect(() => {
    if (lastRecord) {
      setWeight(lastRecord.weight.toString());
      setReps(lastRecord.reps.toString());
    } else {
      setWeight('');
      setReps('');
    }
  }, [lastRecord]);

  const handleSave = () => {
    const w = parseFloat(weight.replace(',', '.'));
    const r = parseInt(reps);
    if (!isNaN(w) && !isNaN(r)) {
      addRecord(exercise.id, w, r);
    }
  };

  return (
    <Card className="border-border bg-card/50 overflow-hidden group">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{exercise.name}</CardTitle>
          {lastRecord && previousRecord && (
            <ProgressionBadge 
              currentWeight={lastRecord.weight}
              currentReps={lastRecord.reps}
              previousWeight={previousRecord.weight}
              previousReps={previousRecord.reps}
            />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor={`${exercise.id}-weight`} className="text-xs text-muted-foreground uppercase font-semibold">Peso (kg)</Label>
            <Input
              id={`${exercise.id}-weight`}
              type="number"
              step="0.5"
              placeholder="0.0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-background/50 border-border h-12 text-lg focus:ring-primary"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${exercise.id}-reps`} className="text-xs text-muted-foreground uppercase font-semibold">Reps</Label>
            <Input
              id={`${exercise.id}-reps`}
              type="number"
              placeholder="0"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="bg-background/50 border-border h-12 text-lg focus:ring-primary"
            />
          </div>
        </div>

        {records.length > 0 && (
          <div className="pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between px-2 h-8 text-muted-foreground hover:text-foreground hover:bg-transparent"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-center gap-2">
                <History className="w-4 h-4" />
                <span className="text-xs uppercase font-semibold">Histórico</span>
              </div>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            
            {isExpanded && (
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                {records.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-2 rounded bg-background/30 text-sm border border-border/20">
                    <span className="text-muted-foreground text-xs">
                      {format(new Date(record.date), "dd/MM 'às' HH:mm", { locale: ptBR })}
                    </span>
                    <span className="font-medium text-foreground">
                      {record.weight}kg <span className="text-muted-foreground">x</span> {record.reps}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleSave} 
          className="w-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold h-12 gap-2 text-base transition-transform active:scale-95"
        >
          <Save className="w-5 h-5" />
          SALVAR REGISTRO
        </Button>
      </CardFooter>
    </Card>
  );
}
