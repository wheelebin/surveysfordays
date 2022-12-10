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
    ["question.getAllPublishedBySurveyId", { surveyId: survey?.id }],
    { refetchOnWindowFocus: false, enabled: !!survey?.id }
  );

  return {
    survey,
    questions: questions || [],
  };
};

export default usePublished;
