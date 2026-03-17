'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useWorkout } from '@/context/WorkoutContext';
import { MUSCLE_GROUPS, MuscleGroupType } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from 'lucide-react';

interface AddExerciseDialogProps {
  trigger?: React.ReactNode;
}

export function AddExerciseDialog({ trigger }: AddExerciseDialogProps) {
  const { addExercise, activeGroup } = useWorkout();
  const [name, setName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>(activeGroup);
  const [open, setOpen] = useState(false);

  // Update selectedGroup when activeGroup changes (if dialog is not open or just reset)
  useEffect(() => {
    if (!open) {
      setSelectedGroup(activeGroup);
    }
  }, [activeGroup, open]);

  const handleSave = () => {
    if (name.trim()) {
      addExercise(name.trim(), selectedGroup as MuscleGroupType);
      setName('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => 
          trigger ? (
            React.isValidElement(trigger) ? React.cloneElement(trigger, props) : <span {...props}>{trigger}</span>
          ) : (
            <Button 
              {...props}
              className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl shadow-primary/50 bg-primary hover:bg-primary/90 p-0"
            >
              <Plus className="w-8 h-8 text-primary-foreground" />
            </Button>
          )
        }
      />
      <DialogContent className="bg-card border-border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Adicionar Exercício</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="group" className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Grupo Muscular</Label>
            <Select value={selectedGroup} onValueChange={(val) => val && setSelectedGroup(val)}>
              <SelectTrigger id="group" className="w-full h-12 bg-background border-border">
                <SelectValue placeholder="Selecione o grupo" />
              </SelectTrigger>
              <SelectContent>
                {MUSCLE_GROUPS.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Nome do Exercício</Label>
            <Input
              id="name"
              placeholder="Ex: Supino Reto Máquina..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 bg-background border-border"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90">
            CADASTRAR EXERCÍCIO
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
