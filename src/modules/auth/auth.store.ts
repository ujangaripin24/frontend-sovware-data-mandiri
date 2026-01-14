import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthToken } from "./auth.type";

interface AuthState {
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });

        await new Promise((res) => setTimeout(res, 1000));

        if (email === "admin@test.com" && password === "123456") {
          const token: AuthToken = {
            token: crypto.randomUUID(),
            expiresAt: Date.now() + 60 * 60 * 1000, // 1 jam
          };

          set({
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          return true;
        }

        set({
          error: "Invalid credentials",
          isLoading: false,
        });

        return false;
      },

      logout: () => {
        set({
          token: null,
          isAuthenticated: false,
        });
      },

      checkToken: () => {
        const token = get().token;

        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        if (Date.now() > token.expiresAt) {
          set({
            token: null,
            isAuthenticated: false,
          });
        } else {
          set({ isAuthenticated: true });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
