import Dexie, { type Table } from "dexie";
import type {
  Exercise, MuscleGroup, WorkoutTemplate, Workout, Settings, ID,
} from "./types";

class WorkoutDB extends Dexie {
  muscleGroups!: Table<MuscleGroup, ID>;
  exercises!: Table<Exercise, ID>;
  templates!: Table<WorkoutTemplate, ID>;
  workouts!: Table<Workout, ID>;
  settings!: Table<Settings, string>;

  constructor() {
    super("workout-app");
    this.version(1).stores({
      muscleGroups: "id, name",
      exercises: "id, name, muscleGroupId",
      templates: "id, name",
      workouts: "id, date",
      settings: "key",
    });

    this.on("populate", () => seed());
  }
}

async function seed() {
  const mg: MuscleGroup[] = [
    "Грудь", "Спина", "Ноги", "Плечи", "Бицепс",
    "Трицепс", "Пресс", "Кардио", "Другое",
  ].map((name) => ({ id: crypto.randomUUID(), name, isCustom: false }));

  await db.muscleGroups.bulkAdd(mg);

  const find = (n: string) => mg.find((g) => g.name === n)!.id;
  const ex = (name: string, group: string): Exercise => ({
    id: crypto.randomUUID(), name, muscleGroupId: find(group), isCustom: false,
  });

  await db.exercises.bulkAdd([
    ex("Жим лёжа", "Грудь"), ex("Жим гантелей лёжа", "Грудь"),
    ex("Отжимания", "Грудь"), ex("Разводка гантелей", "Грудь"),
    ex("Становая тяга", "Спина"), ex("Тяга штанги в наклоне", "Спина"),
    ex("Подтягивания", "Спина"), ex("Тяга верхнего блока", "Спина"),
    ex("Приседания со штангой", "Ноги"), ex("Жим ногами", "Ноги"),
    ex("Выпады", "Ноги"), ex("Румынская тяга", "Ноги"),
    ex("Жим стоя", "Плечи"), ex("Махи гантелями в стороны", "Плечи"),
    ex("Тяга к подбородку", "Плечи"),
    ex("Подъём штанги на бицепс", "Бицепс"), ex("Молотки", "Бицепс"),
    ex("Французский жим", "Трицепс"), ex("Разгибания на блоке", "Трицепс"),
    ex("Скручивания", "Пресс"), ex("Планка", "Пресс"), ex("Подъём ног", "Пресс"),
  ]);

  await db.settings.put({
    key: "app",
    defaultRestSeconds: 90,
    defaultSetSeconds: 30,
    theme: "system",
  });
}

export const db = new WorkoutDB();