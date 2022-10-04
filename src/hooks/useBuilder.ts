import { Prisma } from "@prisma/client";
import { trpc } from "@/utils/trpc";
import { useAtom } from "jotai";
import { clearBuilderContent } from "@/utils/atoms";

const useBuilder = () => {
  const [_, clear] = useAtom(clearBuilderContent);

  const utils = trpc.useContext();

  const editQuestionMutation = trpc.useMutation("question.editQuestion", {
    onSuccess(input) {
      utils.invalidateQueries([
        "question.getAllBySectionId",
        { sectionId: input.sectionId },
      ]);
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
  const addQuestionOption = trpc.useMutation("questionOption.add", {
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
  const addQuestionMutation = trpc.useMutation("question.add", {
    onSuccess(input) {
      const sectionId = input?.sectionId;
      if (sectionId) {
        utils.invalidateQueries(["question.getAllBySectionId", { sectionId }]);
      }
    },
  });

  const handleOnAddSave = (
    question: {
      sectionId: string;
      surveyId: string;
      type: string;
      orderNumber: number;
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
    clear();
  };

  const handleOnEditSave = ({
    question,
    questionOptions,
  }: {
    question?: { id: string; text?: string; type?: string };
    questionOptions?: { id: string; text?: string; orderNumber?: number }[];
  }) => {
    if (question) {
      editQuestionMutation.mutate(question);
    }
    if (questionOptions) {
      editQuestionOption.mutate(questionOptions);
    }
    clear();
  };

  const handleOnAddQuestionOption = async (questionOption: {
    questionId: string;
    type: string;
    text: string;
    orderNumber: number;
  }) => {
    return await addQuestionOption.mutateAsync([questionOption]);
  };

  return { handleOnAddSave, handleOnEditSave, handleOnAddQuestionOption };
};

export default useBuilder;
