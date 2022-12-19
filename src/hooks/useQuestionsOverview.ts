import type { Question } from "../types/question";
import { useBuilderStore } from "@/stores/builder";
import questionApi from "@/api/question";

const useQuestionsOverview = (surveyId: string, questions: Question[]) => {
  const editQuestionOrderMutation = questionApi.useEditOrder();
  const deleteQuestionMutation = questionApi.useDelete();

  const addQuestion = async () => {
    if (!questions) {
      return;
    }

    useBuilderStore.getState().initAdding({
      surveyId,
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

  return {
    questions,
    handleOnEdit,
    addQuestion,
    updateQuestionOrder: (updatedQuestions: Question[]) =>
      editQuestionOrderMutation.mutate(updatedQuestions),
    deleteQuestion: (id: string) => deleteQuestionMutation.mutate({ id }),
  };
};

export default useQuestionsOverview;
