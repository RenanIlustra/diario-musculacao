import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ProgressionBadgeProps {
  currentWeight: number;
  currentReps: number;
  previousWeight: number;
  previousReps: number;
}

export function ProgressionBadge({ currentWeight, currentReps, previousWeight, previousReps }: ProgressionBadgeProps) {
  const evolved = currentWeight > previousWeight || (currentWeight === previousWeight && currentReps > previousReps);
  const maintained = currentWeight === previousWeight && currentReps === previousReps;

  if (evolved) {
    return (
      <Badge className="bg-green-500 hover:bg-green-600 text-white gap-1 py-1">
        <TrendingUp className="w-3 h-3" />
        Evoluiu
      </Badge>
    );
  }

  if (maintained) {
    return (
      <Badge variant="secondary" className="gap-1 py-1">
        <Minus className="w-3 h-3" />
        Manteve
      </Badge>
    );
  }

  return (
    <Badge variant="destructive" className="gap-1 py-1">
      <TrendingDown className="w-3 h-3" />
      Reduziu
    </Badge>
  );
}
