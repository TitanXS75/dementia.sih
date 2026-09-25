import { useState, useEffect, useCallback } from "react";

export type UserRole = "patient" | "family" | "asha";

export interface AppUser {
  name: string;
  email: string;
  role: UserRole;
  language: string;
  avatar?: string;
}

const STORAGE_KEY = "smritisetu_user";

/**
 * Simple auth hook — reads/writes user to localStorage.
 * In production this would wrap Firebase Auth state listener.
 */
export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief auth check
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback((userData: AppUser) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateUser = useCallback((updates: Partial<AppUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { user, isLoading, login, logout, updateUser, isAuthenticated: !!user };
}
