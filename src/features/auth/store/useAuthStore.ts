import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, AuthState } from "../types";

interface AuthActions {
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  updateUser: (user: User) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (user, accessToken, refreshToken) => {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        set({ user, isAuthenticated: true, error: null });
      },

      clearAuth: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("daleel_user");
        set({ user: null, isAuthenticated: false, error: null });
      },

      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),

      updateUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
