import create from "zustand";

interface surveyState {
  currentSurveyId?: string;
  setCurrentSurveyId: (surveyId: string) => void;
}

export const useSurveyStore = create<surveyState>((set, get) => ({
  currentSurveyId: undefined,
  setCurrentSurveyId: (surveyId) => set({ currentSurveyId: surveyId }),
}));

// TODO DO I REALLY NEED THIS STORE???
