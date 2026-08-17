import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  name: string;
  email: string;
  role?: string;
}

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,

      setHasHydrated: (hasHydrated) => set({ hasHydrated }),

      setAuth: (user, token) => {
        if (typeof document !== 'undefined') {
          document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
        }
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        if (typeof document !== 'undefined') {
          document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';
        }
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'sallees-auth',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
