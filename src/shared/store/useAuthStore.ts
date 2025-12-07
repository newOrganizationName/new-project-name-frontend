import { create } from "zustand";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  login: (user, accessToken) =>
    set({ user, accessToken, isAuthenticated: true }),
  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
}));
