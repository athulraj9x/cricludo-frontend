import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any | null;
  setUser: (user: any) => void;
  logout: () => void;
  getUserType: () => string;
  verifyEmail: string;
  isLogin: boolean;
  setIsLogin: (l: boolean) => void;
  setVerifyEmail: (e: string) => void;
  title: string;
  setTitle: (t: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({
          user: null,
          verifyEmail: "",
          title: "",
          isLogin: false,
        });
        localStorage.removeItem("auth-storage");
      },
      getUserType: () => {
        const user = get().user;
        if (!user) return "unknown";
        return user.userType;
      },
      verifyEmail: "",
      setVerifyEmail: (verifyEmail) => set({ verifyEmail }),
      title: "",
      setTitle: (t) => set({ title: t }),
      isLogin: false,
      setIsLogin: (l) => set({ isLogin: l }),
    }),
    {
      name: "auth-storage",
    }
  )
);
