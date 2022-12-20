import create from "zustand";

interface message {
  title: string;
  description: string;
}

interface toastState {
  message?: message;
  isOpen: boolean;
  open: (message: message) => void;
  clear: () => void;
}

export const useToastStore = create<toastState>((set, get) => ({
  message: undefined,
  isOpen: false,
  open: (message) => set({ message, isOpen: true }),
  clear: () => set({ message: undefined, isOpen: false }),
}));
