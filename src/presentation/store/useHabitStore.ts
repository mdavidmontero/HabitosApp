import { create } from "zustand";
import { supabase } from "../../config/supabase/supabase";

interface Habit {
  id: string;
  name: string;
  start_time: string;
  streak: number;
}

interface HabitState {
  habits: Habit[] | null;
  fetchHabits: () => void;
  addHabit: (habit: Habit | null) => void;
}

export const useHabitStore = create<HabitState>((set) => ({
  habits: [],
  fetchHabits: async () => {
    const { data } = await supabase.from("habits").select("*");
    set({ habits: data });
  },
  addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
}));
