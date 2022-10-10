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

    if (!surveyId || !sectionId || orderNumber === undefined) {
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

  const handleOnDeleteOption = async (id: string) => {
    const removedQuestionOption =
      await deleteQuestionOptionMutation.mutateAsync({ id });

    if (removedQuestionOption) {
      setInputElements(
        inputElements.filter(
          (questionOption) => questionOption.id !== removedQuestionOption.id
        )
      );
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
    handleOnDeleteOption,
    isAdding,
    isEditing,
    content,
    inputElements,
    setContent,
    setInputElements,
    clear,
  };
};

export default useBuilder;
