export type MuscleGroupType = 
  | 'Bíceps'
  | 'Tríceps'
  | 'Costas'
  | 'Ombros'
  | 'Peito'
  | 'Antebraço'
  | 'Abdominal'
  | 'Quadríceps'
  | 'Posteriores'
  | 'Glúteos'
  | 'Panturrilha';

export interface Exercise {
  id: string;
  name: string;
  groupId: MuscleGroupType;
  custom?: boolean;
}

export interface WorkoutRecord {
  id: string;
  exerciseId: string;
  weight: number;
  reps: number;
  date: string; // ISO string
}

export const MUSCLE_GROUPS: MuscleGroupType[] = [
  'Peito',
  'Costas',
  'Ombros',
  'Bíceps',
  'Tríceps',
  'Antebraço',
  'Abdominal',
  'Quadríceps',
  'Posteriores',
  'Glúteos',
  'Panturrilha',
];

export const DEFAULT_EXERCISES: Exercise[] = [
  // Peito
  { id: 'p1', name: 'Supino Reto', groupId: 'Peito' },
  { id: 'p2', name: 'Supino Inclinado', groupId: 'Peito' },
  { id: 'p3', name: 'Crucifixo', groupId: 'Peito' },
  { id: 'p4', name: 'Cross-over', groupId: 'Peito' },
  // Costas
  { id: 'c1', name: 'Puxada Aberta', groupId: 'Costas' },
  { id: 'c2', name: 'Remada Curvada', groupId: 'Costas' },
  { id: 'c3', name: 'Remada Sentada', groupId: 'Costas' },
  { id: 'c4', name: 'Levantamento Terra', groupId: 'Costas' },
  // Ombros
  { id: 'o1', name: 'Desenvolvimento c/ Halteres', groupId: 'Ombros' },
  { id: 'o2', name: 'Elevação Lateral', groupId: 'Ombros' },
  { id: 'o3', name: 'Elevação Frontal', groupId: 'Ombros' },
  // Bíceps
  { id: 'b1', name: 'Rosca Direta', groupId: 'Bíceps' },
  { id: 'b2', name: 'Rosca Scott', groupId: 'Bíceps' },
  { id: 'b3', name: 'Rosca Martelo', groupId: 'Bíceps' },
  // Tríceps
  { id: 't1', name: 'Tríceps Pulley', groupId: 'Tríceps' },
  { id: 't2', name: 'Tríceps Corda', groupId: 'Tríceps' },
  { id: 't3', name: 'Tríceps Testa', groupId: 'Tríceps' },
  // Quadríceps
  { id: 'q1', name: 'Agachamento Livre', groupId: 'Quadríceps' },
  { id: 'q2', name: 'Leg Press 45', groupId: 'Quadríceps' },
  { id: 'q3', name: 'Cadeira Extensora', groupId: 'Quadríceps' },
  // Posteriores
  { id: 'po1', name: 'Mesa Flexora', groupId: 'Posteriores' },
  { id: 'po2', name: 'Stiff', groupId: 'Posteriores' },
  // Glúteos
  { id: 'g1', name: 'Elevação Pélvica', groupId: 'Glúteos' },
  { id: 'g2', name: 'Cadeira Abdutora', groupId: 'Glúteos' },
  // Panturrilha
  { id: 'pa1', name: 'Panturrilha Sentado', groupId: 'Panturrilha' },
  { id: 'pa2', name: 'Panturrilha em Pé', groupId: 'Panturrilha' },
  // Abdominal
  { id: 'a1', name: 'Abdominal Supra', groupId: 'Abdominal' },
  { id: 'a2', name: 'Prancha', groupId: 'Abdominal' },
  // Antebraço
  { id: 'an1', name: 'Rosca Inversa', groupId: 'Antebraço' },
  { id: 'an2', name: 'Flexão de Punho', groupId: 'Antebraço' },
];
