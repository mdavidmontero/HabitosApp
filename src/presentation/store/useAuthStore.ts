import { create } from "zustand";
import { User } from "../../domain/entities/user";
import { Session } from "@supabase/supabase-js";

interface AuthStore {
  Session: Session | null;
  setSession: (session: Session) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  Session: null,
  setSession: (session) => set({ Session: session }),
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
