import create from "zustand";

export interface InputElement {
  id: string;
  type: string;
  label: string;
  placeholder?: string | null;
  supportText?: string | null;
  value: string;
}

export interface Content {
  id?: string;
  sectionId: string;
  surveyId: string;
  type?: string;
  text?: string;
  supportText?: string | null;
  orderNumber: number;
}

interface BuilderState {
  isAdding: boolean;
  isEditing: boolean;
  content: Content | undefined;
  inputElements: InputElement[];
  initAdding: (
    initialContent: Pick<Content, "sectionId" | "surveyId" | "orderNumber">
  ) => void;
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
  inputElements: [],
  initAdding: ({ sectionId, surveyId, orderNumber }) =>
    set({ isAdding: true, content: { sectionId, surveyId, orderNumber } }),
  initEditing: (content, inputElements) =>
    set({
      isAdding: false,
      isEditing: true,
      content,
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
      inputElements: [],
    }),
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}));
