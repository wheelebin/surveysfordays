import { atom } from "jotai";

type InputElement = {
  id: string;
  type: string;
  label: string;
  value: string;
};

export const editingContentId = atom<string | undefined>(undefined);
export const contentType = atom<string | undefined>(undefined);
export const contentText = atom<string>("");
export const contentSupportingText = atom<string>("");
export const contentPlaceholder = atom<string>("");
export const contentInputElements = atom<InputElement[]>([]);