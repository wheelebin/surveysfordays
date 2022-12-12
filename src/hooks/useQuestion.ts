import { trpc } from "@/utils/trpc";
import { Question } from "@prisma/client";

const useQuestion = (surveyId: string) => {
  const utils = trpc.useContext();

  const deleteQuestionOptionMutation = trpc.questionOption.delete.useMutation(
    {
      onSuccess(input) {
        utils.questionOption.getAllByQuestionId.invalidate({ questionId: input.questionId });
      },
    }
  );
  const addQuestionMutation = trpc.question.add.useMutation({
    onSuccess(input) {
      utils.question.getAllBySurveyId.invalidate({ surveyId: input.surveyId });
    },
  });
  const editQuestionMutation = trpc.question.editQuestion.useMutation({
    onSuccess(input) {
      utils.question.getAllBySurveyId.invalidate({ surveyId: input.surveyId });
    },
  });
  const deleteQuestionMutation = trpc.question.delete.useMutation({
    onSuccess(input) {
      utils.question.getAllBySurveyId.invalidate({ surveyId: input.surveyId });
    },
  });
  const editQuestionsOrderNumberMutation = trpc.question.editQuestionsOrderNumber.useMutation(
    {
      onSuccess(input) {
        const surveyId = input[0]?.surveyId;
        if (surveyId) {
          utils.question.getAllBySurveyId.invalidate({ surveyId: surveyId });
        }
      },
    }
  );
  const editQuestionOptionMutation = trpc.questionOption.edit.useMutation({
    onSuccess(input) {
      const questionId = input[0]?.questionId;
      if (questionId) {
        utils.questionOption.getAllByQuestionId.invalidate({ questionId: questionId });
      }
    },
  });
  const addQuestionOptionMutation = trpc.questionOption.add.useMutation({
    onSuccess(input) {
      const questionId = input[0]?.questionId;
      if (questionId) {
        utils.questionOption.getAllByQuestionId.invalidate({ questionId: questionId });
      }
    },
  });

  const { data: questions } = trpc.question.getAllBySurveyId.useQuery(
    { surveyId },
      { refetchOnWindowFocus: false, enabled: !!surveyId }
  );

  const addQuestion = async (type: string, orderNumber: number) => {
    const dummyQuestionData = {
      text: "Change me :)",
      supportText: "Some support text",
    };
    const dummyQuestionOptionData = {
      label: "Change me :)",
      placeholder: "Some placeholder",
      supportText: "Some support text for the input element",
      orderNumber: 0,
    };

    const newQuestion = await addQuestionMutation.mutateAsync({
      surveyId,
      type,
      orderNumber,
      ...dummyQuestionData,
    });

    if (!newQuestion) {
      return;
    }

    const newQuestionOptions = await addQuestionOptionMutation.mutateAsync([
      {
        questionId: newQuestion.id,
        type,
        ...dummyQuestionOptionData,
      },
    ]);

    return { question: newQuestion, questionOptions: newQuestionOptions };
  };

  const editQuestion = async (question: {
    id: string;
    label?: string;
    placeholder?: string;
    supportText?: string | null;
    orderNumber?: number;
  }) => {
    return await editQuestionMutation.mutateAsync(question);
  };

  const editQuestionsOrder = (updatedQuestions: Question[]) => {
    editQuestionsOrderNumberMutation.mutate(updatedQuestions);
  };

  const deleteQuestion = (id: string) => {
    deleteQuestionMutation.mutate({ id });
  };

  const addQuestionOption = async (
    questionOptions: {
      questionId: string;
      type: string;
      label: string;
      placeholder?: string;
      supportText?: string;
      orderNumber: number;
    }[]
  ) => {
    return await addQuestionOptionMutation.mutateAsync(questionOptions);
  };

  const editQuestionOption = async (
    questionOptions: {
      id: string;
      type?: string;
      label?: string;
      placeholder?: string | null;
      supportText?: string | null;
      orderNumber?: number;
    }[]
  ) => {
    return await editQuestionOptionMutation.mutateAsync(questionOptions);
  };

  const deleteQuestionOption = async (id: string) => {
    const removedQuestionOption =
      await deleteQuestionOptionMutation.mutateAsync({ id });

    return removedQuestionOption;
  };

  return {
    questions: questions || [],
    addQuestion,
    editQuestion,
    editQuestionsOrder,
    deleteQuestion,
    addQuestionOption,
    editQuestionOption,
    deleteQuestionOption,
  };
};

export default useQuestion;
