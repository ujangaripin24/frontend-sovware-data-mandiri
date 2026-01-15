import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthToken } from "./auth.type";

interface AuthState {
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isTokenExpired: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkToken: () => void;
  clearTokenExpired: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isTokenExpired: false,

      login: async (email, password) => {
        console.log("[POST] LOGIN ATTEMPTING...", { email });
        set({ isLoading: true, error: null });

        await new Promise((res) => setTimeout(res, 1000));

        if (email === "admin@test.com" && password === "123456") {
          const token: AuthToken = {
            token: crypto.randomUUID(),
            expiresAt: Date.now() + 60 * 60 * 1000,
          };

          console.log("[POST] LOGIN SUCCESS", { token });
          set({
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          return true;
        }

        const errorMsg = "Invalid credentials";
        console.error("[POST] LOGIN FAILED:", errorMsg);
        set({
          error: errorMsg,
          isLoading: false,
        });

        return false;
      },

      clearTokenExpired: () => {
        console.log("[ACTION] CLEAR TOKEN EXPIRED STATUS");
        set({ isTokenExpired: false });
        console.log("User force logout sequence completed");
      },

      logout: () => {
        console.log("[ACTION] LOGOUT USER");
        set({
          token: null,
          isAuthenticated: false,
        });
      },

      checkToken: () => {
        const token = get().token;
        console.log("[CHECK] VALIDATING TOKEN...");

        if (!token) {
          console.warn("[CHECK] NO TOKEN FOUND");
          set({ isAuthenticated: false });
          return;
        }

        const isExpired = Date.now() > token.expiresAt;

        if (isExpired) {
          console.error("[CHECK] TOKEN EXPIRED", { 
            expiredAt: new Date(token.expiresAt).toLocaleString(),
            now: new Date().toLocaleString() 
          });
          set({
            token: null,
            isAuthenticated: false,
            isTokenExpired: true,
          });
        } else {
          console.log("[CHECK] TOKEN VALID");
          set({ isAuthenticated: true });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);