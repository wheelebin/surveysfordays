import { trpc } from "@/utils/trpc";

const usePublished = ({
  surveyId,
  questionId,
}: {
  surveyId?: string;
  questionId?: string;
}) => {
  const { data: survey } = trpc.useQuery(
    ["survey.getPublishedSurveyById", { id: surveyId }],
    { refetchOnWindowFocus: false, enabled: !!surveyId }
  );

  const { data: questions } = trpc.useQuery(
    ["question.getAllPublishedBySurveyId", { surveyId }],
    { refetchOnWindowFocus: false, enabled: !!surveyId }
  );

  const { data: questionOptions } = trpc.useQuery(
    ["questionOption.getAllPublishedByQuestionId", { questionId }],
    { refetchOnWindowFocus: false, enabled: !!questionId }
  );

  return {
    survey,
    questions: questions || [],
    questionOptions: questionOptions || [],
  };
};

export default usePublished;
