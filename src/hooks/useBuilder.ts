import { trpc } from "@/utils/trpc";
import useQuestion from "./useQuestion";
import { useBuilderStore } from "@/stores/builder";

const useBuilder = (surveyId: string) => {
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

  const {
    addQuestion,
    editQuestion,
    addQuestionOption,
    editQuestionOption,
    deleteQuestionOption,
  } = useQuestion(surveyId);

  const handleOnAdd = async (type: string) => {
    const { surveyId, orderNumber } = initialContent || {};

    if (!surveyId || orderNumber === undefined) {
      return;
    }

    const resp = await addQuestion(type, orderNumber);

    if (!resp) {
      return;
    }

    const { question, questionOptions } = resp;

    if (question && questionOptions) {
      initEditing(question, questionOptions);
    }
  };

  const handleOnDeleteOption = async (id: string) => {
    const removedQuestionOption = await deleteQuestionOption(id);

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
      editQuestion(content);
    }
    if (inputElements) {
      editQuestionOption(inputElements);
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
    return await addQuestionOption([questionOption]);
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
