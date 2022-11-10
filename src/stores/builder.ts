import create from "zustand";

export interface InputElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string | null;
  supportText?: string | null;
  value: string;
}

export interface InitialContent {
  surveyId: string;
  orderNumber: number;
}

export interface Content {
  id: string;
  surveyId: string;
  type: string;
  text: string;
  supportText?: string | null;
  orderNumber: number;
}

interface BuilderState {
  isAdding: boolean;
  isEditing: boolean;
  content: Content | undefined;
  initialContent: InitialContent | undefined;
  inputElements: InputElement[];
  initAdding: (initialContent: InitialContent) => void;
  initEditing: (content: Content, inputElements: InputElement[]) => void;
  setEditing: (isEditing: boolean) => void;
  setContent: (key: string, value: string) => void;
  setInputElements: (inputElements: InputElement[]) => void;
  clear: () => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  isAdding: false,
  isEditing: false,
  content: undefined,
  initialContent: undefined,
  inputElements: [],
  initAdding: (initialContent) => set({ isAdding: true, initialContent }),
  initEditing: (content, inputElements) =>
    set({
      isAdding: false,
      isEditing: true,
      content,
      initialContent: undefined,
      inputElements,
    }),
  setEditing: (isEditing) => set({ isEditing }),
  setContent: (key, value) => {
    const content = get().content;
    if (content) {
      set({ content: { ...content, [key]: value } });
    }
  },
  setInputElements: (inputElements) => set({ inputElements }),
  clear: () =>
    set({
      isAdding: false,
      isEditing: false,
      content: undefined,
      initialContent: undefined,
      inputElements: [],
    }),
}));
