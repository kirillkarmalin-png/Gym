export type ID = string;

export interface MuscleGroup {
  id: ID;
  name: string;
  isCustom?: boolean;
}

export interface Exercise {
  id: ID;
  name: string;
  muscleGroupId: ID;
  isCustom?: boolean;
}

export interface TemplateItem {
  exerciseId: ID;
  targetSets: number;
  targetReps: number;
  targetWeight?: number;
}

export interface WorkoutTemplate {
  id: ID;
  name: string;
  items: TemplateItem[];
}

export interface WorkoutSet {
  weight: number;
  reps: number;
  done: boolean;
}

export interface WorkoutEntry {
  exerciseId: ID;
  sets: WorkoutSet[];
}

export interface Workout {
  id: ID;
  date: string;
  templateId?: ID;
  rpe?: number;
  notes?: string;
  entries: WorkoutEntry[];
}

export interface Settings {
  key: "app";
  defaultRestSeconds: number;
  defaultSetSeconds: number;
  theme: "system";
}

export const RPE_LABELS: Record<number, string> = {
  1: "Совсем легко",
  2: "Очень легко",
  3: "Легко",
  4: "Комфортно",
  5: "Умеренно",
  6: "Мог ещё 4 повтора",
  7: "Мог ещё 3 повтора",
  8: "Мог ещё 2 повтора",
  9: "Мог ещё 1 повтор",
  10: "Предел",
};