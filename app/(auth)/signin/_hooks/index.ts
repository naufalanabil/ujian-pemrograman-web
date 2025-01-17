import { toast } from "sonner";
import { create } from "zustand";

interface ManageOtp {
  showModal: boolean;
  email: string;
  setShowModal: (open: boolean) => void;
  setEmail: (email: string, isPlayed?: boolean) => void;
  seconds: number;
  pause: boolean;
  setPause: (pause: boolean) => void;
  setSeconds: (seconds: number) => void;
  startTimer: (isPlayed: boolean) => void;
  resetTimer: () => void;
  setCallbackUrl: (url: string) => void;
  callbackUrl: string;
  isPlayed: boolean;
}

export const useManageOtp = create<ManageOtp>((set, get) => ({
  showModal: false,
  callbackUrl: "",
  email: "",
  pause: false,
  seconds: 60,
  isPlayed: false,
  setCallbackUrl: (url) => set({ callbackUrl: url }),
  setSeconds: (seconds) => set({ seconds }),
  setPause: (pause) => set({ pause }),
  startTimer: (isPlayed) => {
    const interval = setInterval(() => {
      set((state) => {
        if ( state.seconds <= 0) {
          clearInterval(interval);
          get().pause = true;
          return state;
        }
        return { seconds: state.seconds - 1 };
      });
    }, 1000);
  },
  resetTimer: () => set({ seconds: 60, pause: false }),
  setShowModal: (open) => set({ showModal: open }),
  setEmail: (email, isPlayed) => {
    if(!email) {
      toast.error("Email not found");
      return
    }
    if (isPlayed) {
      set({ email, showModal: isPlayed, isPlayed });
      get().startTimer(isPlayed);
    }
  },
}));
