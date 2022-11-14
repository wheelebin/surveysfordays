import { trpc } from "@/utils/trpc";
import { Question } from "@prisma/client";
import { useBuilderStore } from "@/stores/builder";
import { useSurveyStore } from "@/stores/survey";

const usePreview = () => {
  const utils = trpc.useContext();
  const { currentSurveyId } = useSurveyStore();

  const { data: questions } = trpc.useQuery(
    ["question.getAllBySurveyId", { surveyId: currentSurveyId as string }],
    { refetchOnWindowFocus: false, enabled: !!currentSurveyId }
  );

  const deleteQuestionMutation = trpc.useMutation("question.delete", {
    onSuccess(input) {
      utils.invalidateQueries([
        "question.getAllBySurveyId",
        { surveyId: input.surveyId },
      ]);
    },
  });

  const editQuestionsOrderNumberMutation = trpc.useMutation(
    "question.editQuestionsOrderNumber",
    {
      onSuccess(input) {
        const surveyId = input[0]?.surveyId;
        if (surveyId) {
          utils.invalidateQueries([
            "question.getAllBySurveyId",
            { surveyId: surveyId },
          ]);
        }
      },
    }
  );

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

  const updateQuestionOrder = (updatedQuestions: Question[]) => {
    editQuestionsOrderNumberMutation.mutate(updatedQuestions);
  };

  const deleteQuestion = (questionId: string) => {
    deleteQuestionMutation.mutateAsync({ id: questionId });
  };

  return {
    questions,
    handleOnEdit,
    addQuestion,
    updateQuestionOrder,
    deleteQuestion,
  };
};

export default usePreview;
