import { trpc } from "@/utils/trpc";
import { Question } from "@prisma/client";
import { useBuilderStore } from "@/stores/builder";
import { useSurveyStore } from "@/stores/survey";
import useQuestion from "./useQuestion";
import Survey from "src/pages";

const usePreview = (surveyId: string) => {
  const utils = trpc.useContext();
  const { currentSurveyId } = useSurveyStore();
  const { questions, editQuestionsOrder, deleteQuestion } =
    useQuestion(surveyId);

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

  return {
    questions,
    handleOnEdit,
    addQuestion,
    updateQuestionOrder: (updatedQuestions: Question[]) =>
      editQuestionsOrder(updatedQuestions),
    deleteQuestion: (id: string) => deleteQuestion(id),
  };
};

export default usePreview;
