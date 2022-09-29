import { Prisma } from "@prisma/client";
import { trpc } from "@/utils/trpc";

const useBuilder = () => {
  const utils = trpc.useContext();

  const addQuestionMutation = trpc.useMutation("question.add");
  const editQuestionMutation = trpc.useMutation("question.editQuestion", {
    onSuccess(input) {
      utils.invalidateQueries(["question.byId", { id: input.id }]);
    },
  });
  const editQuestionOption = trpc.useMutation("questionOption.edit", {
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

  const handleOnAddSave = (
    question: {
      sectionId: string;
      surveyId: string;
      type: string;
      text: string;
    },
    questionOptions: {
      questionId: string;
      type: string;
      text: string;
      orderNumber: number;
    }[]
  ) => {
    if (question) {
      addQuestionMutation.mutate(question);
    }
    if (questionOptions) {
      addQuestionMutation.mutate(question);
    }
  };

  const handleOnEditSave = ({
    question,
    questionOptions,
  }: {
    question?: { id: string; text?: string };
    questionOptions?: { id: string; text?: string; orderNumber?: number }[];
  }) => {
    if (question) {
      editQuestionMutation.mutate(question);
    }
    if (questionOptions) {
      editQuestionOption.mutate(questionOptions);
    }
  };

  return { handleOnAddSave, handleOnEditSave };
};

export default useBuilder;
