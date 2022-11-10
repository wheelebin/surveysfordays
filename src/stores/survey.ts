import create from "zustand";

interface surveyState {
  currentSurveyId?: string;
}

export const useSurveyStore = create<surveyState>((set, get) => ({
  currentSurveyId: undefined,
}));
