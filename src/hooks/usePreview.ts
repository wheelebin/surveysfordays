import { trpc } from "@/utils/trpc";
import { Question } from "@prisma/client";
import { useRouter } from "next/router";
import { useBuilderStore } from "@/stores/builder";
import { useSurveyStore } from "@/stores/survey";

const usePreview = () => {
  const { currentSurveyId } = useSurveyStore();

  const { data: questions } = trpc.useQuery(
    ["question.getAllBySurveyId", { surveyId: currentSurveyId as string }],
    { refetchOnWindowFocus: false, enabled: !!currentSurveyId }
  );

  console.log(currentSurveyId);

  const addQuestion = async () => {
    if (!questions || !currentSurveyId) {
      return;
    }

    useBuilderStore.getState().initAdding({
      surveyId: currentSurveyId,
      orderNumber: questions.length,
    });
  };

  const handleOnEdit = (questionId: string) => {
    const question = questions?.find(({ id }) => id === questionId);

    if (question) {
      const questionOptions = question.questionOptions;
      useBuilderStore.getState().initEditing(question, questionOptions);
    }
  };

  const updateQuestionOrder = (updatedQuestions: Question[]) => ({});
  const deleteQuestion = (questionId: string) => ({});

  return {
    questions,
    handleOnEdit,
    addQuestion,
    updateQuestionOrder,
    deleteQuestion,
  };
};

export default usePreview;
