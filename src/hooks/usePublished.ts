import { trpc } from "@/utils/trpc";

const usePublished = ({
  surveyId,
  questionId,
}: {
  surveyId?: string;
  questionId?: string;
}) => {
  const { data: survey } = trpc.survey.getPublishedSurveyById.useQuery(
    { id: surveyId },
      { refetchOnWindowFocus: false, enabled: !!surveyId }
  );

  const { data: questions } = trpc.question.getAllPublishedBySurveyId.useQuery(
    { surveyId: survey?.id },
      { refetchOnWindowFocus: false, enabled: !!survey?.id }
  );

  return {
    survey,
    questions: questions || [],
  };
};

export default usePublished;
