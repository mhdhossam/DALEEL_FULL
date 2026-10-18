import React, { createContext, useContext, useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { authService } from "@/features/auth/services/auth.service";

interface User {
  id?: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, setAuth, clearAuth, updateUser } = useAuthStore();

  // Handle initial hydration/refresh check
  useEffect(() => {
    // If we have a token but no user, or just to sync state
    const token = localStorage.getItem("access_token");
    if (token && !user) {
        authService.fetchMe()
            .then(data => updateUser(data))
            .catch(() => clearAuth());
    }
  }, [user, updateUser, clearAuth]);

  const login = (userData: User, accessToken: string, refreshToken: string) => {
    setAuth(userData, accessToken, refreshToken);
  };

  const logout = () => {
    clearAuth();
  };

  const fetchMe = async () => {
    try {
      const data = await authService.fetchMe();
      updateUser(data);
    } catch (err) {
      clearAuth();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};