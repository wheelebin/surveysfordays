import { useBuilderStore } from "@/stores/builder";
import questionApi from "@/api/question";
import questionOptionApi from "@/api/questionOption";

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

  const addQuestionMutation = questionApi.useAdd();
  const handleOnAdd = async (type: string) => {
    const { surveyId, orderNumber } = initialContent || {};

    if (!surveyId) {
      return;
    }

    const question = await addQuestionMutation.mutateAsync({
      surveyId,
      type,
      orderNumber,
    });

    if (!question) {
      return;
    }

    initEditing(question, question.questionOptions);
  };

  const deleteQuestionOptionMutation = questionOptionApi.useDelete();
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

  const editQuestionMutation = questionApi.useEdit();
  const editQuestionOptionMutation = questionOptionApi.useEdit();
  const handleOnEditSave = () => {
    if (content) {
      editQuestionMutation.mutate(content);
    }
    if (inputElements) {
      editQuestionOptionMutation.mutate(inputElements);
    }
    clear();
  };

  const addQuestionOptionMutation = questionOptionApi.useAdd();
  const handleOnAddQuestionOption = async (questionOption: {
    questionId: string;
    type: string;
    label: string;
    placeholder?: string;
    supportText?: string;
    orderNumber: number;
  }) => {
    return await addQuestionOptionMutation.mutateAsync([questionOption]);
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
