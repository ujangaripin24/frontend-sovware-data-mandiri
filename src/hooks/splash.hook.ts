import { create } from "zustand";

interface SplashState {
  showSplash: boolean;
  startSplash: () => void;
}

export const useSplashStore = create<SplashState>((set) => ({
  showSplash: false,
  startSplash: () => {
    set({ showSplash: true });
    setTimeout(() => set({ showSplash: false }), 5000);
  },
}));