import { trpc } from "@/utils/trpc";
import { useBuilderStore } from "@/stores/builder";

const useBuilder = () => {
  const {
    isAdding,
    isEditing,
    initEditing,
    content,
    initialContent,
    inputElements,
    setContent,
    setInputElements,
    clear,
  } = useBuilderStore();

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

  const handleOnAdd = async (type: string) => {
    const { surveyId, sectionId, orderNumber } = initialContent || {};

    if (!surveyId || !sectionId || !orderNumber) {
      return;
    }

    const newQuestion = await addQuestionMutation.mutateAsync({
      surveyId,
      sectionId,
      type,
      orderNumber,
      text: "Change me :)",
      supportText: "Some support text",
    });

    if (!newQuestion) {
      return;
    }

    const newQuestionOption = await addQuestionOption.mutateAsync([
      {
        questionId: newQuestion.id,
        type,
        label: "Change me :)",
        placeholder: "Some placeholder",
        supportText: "Some support text for the input element",
        orderNumber: 0,
      },
    ]);

    if (newQuestion && newQuestionOption) {
      initEditing(newQuestion, newQuestionOption);
    }
  };

  const handleOnEditSave = () => {
    if (content) {
      editQuestionMutation.mutate(content);
    }
    if (inputElements) {
      editQuestionOption.mutate(inputElements);
    }
    clear();
  };

  const handleOnAddQuestionOption = async (questionOption: {
    questionId: string;
    type: string;
    label: string;
    placeholder?: string;
    supportText?: string;
    orderNumber: number;
  }) => {
    return await addQuestionOption.mutateAsync([questionOption]);
  };

  return {
    handleOnAdd,
    handleOnEditSave,
    handleOnAddQuestionOption,
    isAdding,
    isEditing,
    content,
    inputElements,
    setContent,
    setInputElements,
  };
};

export default useBuilder;
