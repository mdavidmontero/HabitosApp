import { create } from "zustand";

export interface ListDays {
  id: number;
  name: string;
  isAvailable: boolean;
}
[];

const week: ListDays[] = [
  { id: 0, name: "Domingo", isAvailable: true },
  { id: 1, name: "Lunes", isAvailable: true },
  { id: 2, name: "Martes", isAvailable: true },
  { id: 3, name: "Miercoles", isAvailable: true },
  { id: 4, name: "Jueves", isAvailable: true },
  { id: 5, name: "Viernes", isAvailable: true },
  { id: 6, name: "Sábado", isAvailable: true },
];

interface Habit {
  id: string;
  name: string;
  start_time: string;
  streak: number;
}

interface HabitState {
  habits: Habit[] | null;
  listDays: ListDays[];
  // fetchHabits: () => void;
  // addHabit: (habit: Habit | null) => void;
}

export const useHabitStore = create<HabitState>((set) => ({
  habits: [],
  listDays: week,
  // fetchHabits: async () => {
  //   const { data } = await supabase.from("habits").select("*");
  //   set({ habits: data });
  // },
  // addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
}));
