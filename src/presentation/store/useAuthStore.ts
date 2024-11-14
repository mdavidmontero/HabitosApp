import { create } from "zustand";
import { User } from "../../domain/entities/user.entities";

interface userStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isFirstLaunch: boolean;
  setIsFirstLaunch: (isFirstLaunch: boolean) => void;
}

export const useAuthStore = create<userStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isFirstLaunch: false,
  setIsFirstLaunch: (isFirstLaunch) => set({ isFirstLaunch }),
}));
