'use client';

import { useState } from 'react';
import { useWorkout } from '@/context/WorkoutContext';
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
import { Plus } from 'lucide-react';

export function AddExerciseDialog() {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const { addExercise, activeGroup } = useWorkout();

  const handleSave = () => {
    if (name.trim()) {
      addExercise(name.trim());
      setName('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl shadow-primary/50 bg-primary hover:bg-primary/90 p-0"
        >
          <Plus className="w-8 h-8 text-primary-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Adicionar Exercício</DialogTitle>
          <p className="text-sm text-muted-foreground">
            O exercício será adicionado em <strong>{activeGroup}</strong>.
          </p>
        </DialogHeader>
        <div className="py-4">
          <Input
            id="name"
            placeholder="Nome do exercício..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 bg-background border-border"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="w-full h-12 text-lg font-bold">ADICIONAR</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
