import { trpc } from "@/utils/trpc";
import { Question } from "@prisma/client";
import { useBuilderStore } from "@/stores/builder";
import useQuestion from "./useQuestion";

const useQuestionsOverview = (surveyId: string) => {
  const { questions, editQuestionsOrder, deleteQuestion } =
    useQuestion(surveyId);

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
      editQuestionsOrder(updatedQuestions),
    deleteQuestion: (id: string) => deleteQuestion(id),
  };
};

export default useQuestionsOverview;
