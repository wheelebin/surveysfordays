export type QuestionOption = {
  id: string;
  type: string;
  label: string;
  placeholder: string | null;
  supportText: string | null;
  value: string;
  orderNumber: number;
  status: string;
};

export type Question = {
  id: string;
  type: string;
  surveyId: string;
  text: string;
  supportText?: string | null;
  orderNumber: number;
  status: string;
  questionOptions: QuestionOption[];
};
