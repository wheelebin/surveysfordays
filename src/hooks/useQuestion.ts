import { trpc } from "@/utils/trpc";
import { Question } from "@prisma/client";

const useQuestion = (surveyId: string) => {
  const utils = trpc.useContext();

  const deleteQuestionOptionMutation = trpc.useMutation(
    "questionOption.delete",
    {
      onSuccess(input) {
        utils.invalidateQueries([
          "questionOption.getAllByQuestionId",
          { questionId: input.questionId },
        ]);
      },
    }
  );
  const addQuestionMutation = trpc.useMutation("question.add", {
    onSuccess(input) {
      utils.invalidateQueries([
        "question.getAllBySurveyId",
        { surveyId: input.surveyId },
      ]);
    },
  });
  const editQuestionMutation = trpc.useMutation("question.editQuestion", {
    onSuccess(input) {
      utils.invalidateQueries([
        "question.getAllBySurveyId",
        { surveyId: input.surveyId },
      ]);
    },
  });
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
  const editQuestionOptionMutation = trpc.useMutation("questionOption.edit", {
    onSuccess(input) {
      const questionId = input[0]?.questionId;
      if (questionId) {
        utils.invalidateQueries([
          "questionOption.getAllByQuestionId",
          { questionId: questionId },
        ]);
      }
    },
  });
  const addQuestionOptionMutation = trpc.useMutation("questionOption.add", {
    onSuccess(input) {
      const questionId = input[0]?.questionId;
      if (questionId) {
        utils.invalidateQueries([
          "questionOption.getAllByQuestionId",
          { questionId: questionId },
        ]);
      }
    },
  });

  const { data: questions } = trpc.useQuery(
    ["question.getAllBySurveyId", { surveyId }],
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
