import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type { Session, User } from "@supabase/supabase-js";

type AuthState = {
  session: Session | null;
  user: User | null;
  ready: boolean;
  init: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
  session: null,
  user: null,
  ready: false,

  init: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set({ session, user: session?.user ?? null, ready: true });

    supabase.auth.onAuthStateChange((_e, s) => {
      set({ session: s ?? null, user: s?.user ?? null });
    });
  },

  signOut: async () => {
    await supabase.auth.signOut();
  },
}));
