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
  user_id?: string;
  name: string;
  group_id: MuscleGroupType;
  custom?: boolean;
}

export interface WorkoutRecord {
  id: string;
  user_id: string;
  exercise_id: string;
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
  { id: 'p1', name: 'Supino Reto', group_id: 'Peito' },
  { id: 'p2', name: 'Supino Inclinado', group_id: 'Peito' },
  { id: 'p3', name: 'Crucifixo', group_id: 'Peito' },
  { id: 'p4', name: 'Cross-over', group_id: 'Peito' },
  // Costas
  { id: 'c1', name: 'Puxada Aberta', group_id: 'Costas' },
  { id: 'c2', name: 'Remada Curvada', group_id: 'Costas' },
  { id: 'c3', name: 'Remada Sentada', group_id: 'Costas' },
  { id: 'c4', name: 'Levantamento Terra', group_id: 'Costas' },
  // Ombros
  { id: 'o1', name: 'Desenvolvimento c/ Halteres', group_id: 'Ombros' },
  { id: 'o2', name: 'Elevação Lateral', group_id: 'Ombros' },
  { id: 'o3', name: 'Elevação Frontal', group_id: 'Ombros' },
  // Bíceps
  { id: 'b1', name: 'Rosca Direta', group_id: 'Bíceps' },
  { id: 'b2', name: 'Rosca Scott', group_id: 'Bíceps' },
  { id: 'b3', name: 'Rosca Martelo', group_id: 'Bíceps' },
  // Tríceps
  { id: 't1', name: 'Tríceps Pulley', group_id: 'Tríceps' },
  { id: 't2', name: 'Tríceps Corda', group_id: 'Tríceps' },
  { id: 't3', name: 'Tríceps Testa', group_id: 'Tríceps' },
  // Quadríceps
  { id: 'q1', name: 'Agachamento Livre', group_id: 'Quadríceps' },
  { id: 'q2', name: 'Leg Press 45', group_id: 'Quadríceps' },
  { id: 'q3', name: 'Cadeira Extensora', group_id: 'Quadríceps' },
  // Posteriores
  { id: 'po1', name: 'Mesa Flexora', group_id: 'Posteriores' },
  { id: 'po2', name: 'Stiff', group_id: 'Posteriores' },
  // Glúteos
  { id: 'g1', name: 'Elevação Pélvica', group_id: 'Glúteos' },
  { id: 'g2', name: 'Cadeira Abdutora', group_id: 'Glúteos' },
  // Panturrilha
  { id: 'pa1', name: 'Panturrilha Sentado', group_id: 'Panturrilha' },
  { id: 'pa2', name: 'Panturrilha em Pé', group_id: 'Panturrilha' },
  // Abdominal
  { id: 'a1', name: 'Abdominal Supra', group_id: 'Abdominal' },
  { id: 'a2', name: 'Prancha', group_id: 'Abdominal' },
  // Antebraço
  { id: 'an1', name: 'Rosca Inversa', group_id: 'Antebraço' },
  { id: 'an2', name: 'Flexão de Punho', group_id: 'Antebraço' },
];
