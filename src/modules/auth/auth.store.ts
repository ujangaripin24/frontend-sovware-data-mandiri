import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    await new Promise((res) => setTimeout(res, 1000));

    if (email === "admin@test.com" && password === "123456") {
      set({ isAuthenticated: true, isLoading: false });
      return true;
    }

    set({
      error: "Invalid email or password",
      isLoading: false,
    });
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false });
  },
}));
