import { trpc } from "@/utils/trpc";
import { Question } from "@prisma/client";
import { useRouter } from "next/router";
import { useBuilderStore } from "@/stores/builder";

const usePreview = () => {
  const router = useRouter();
  const queries = router.query;
  const { surveyId } = queries;

  const { data: questions } = trpc.useQuery(
    ["question.getAllBySurveyId", { surveyId: surveyId as string }],
    { refetchOnWindowFocus: false, enabled: !!surveyId }
  );

  const addQuestion = async () => {
    if (!questions) {
      return;
    }

    useBuilderStore.getState().initAdding({
      surveyId: surveyId as string,
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
