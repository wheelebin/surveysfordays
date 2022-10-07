import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { useBuilderStore, InputElement } from "@/stores/builder";

// TODO Finish this

const useElement = (
  contentId: string,
  surveyId: string,
  sectionId: string,
  questionType: string,
  questionText: string,
  orderNumber: number,
  questionSupportText?: string | null
) => {
  const builderStore = useBuilderStore();

  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
  const [inputElements, setInputElements] = useState<InputElement[]>([]);
  const [text, setText] = useState<string | undefined>("");
  const [supportText, setSupportText] =
    useState<string | undefined | null>(undefined);
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>("");

  const { data } = trpc.useQuery(
    ["questionOption.getAllByQuestionId", { questionId: contentId }],
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (builderStore.isEditing && builderStore.content?.id === contentId) {
      setIsBeingEdited(true);
    } else {
      setIsBeingEdited(false);
    }
  }, [builderStore.isEditing, builderStore.content?.id, contentId]);

  useEffect(() => {
    if (isBeingEdited) {
      setType(builderStore.content?.type);
    } else {
      setType(questionType);
    }
  }, [isBeingEdited, builderStore.content?.type, questionType]);

  useEffect(() => {
    if (isBeingEdited) {
      setInputElements(builderStore.inputElements);
    } else if (data) {
      setInputElements(data);
    }
  }, [isBeingEdited, data, builderStore.inputElements]);

  useEffect(() => {
    if (isBeingEdited) {
      setText(builderStore.content?.text);
    } else {
      setText(questionText);
    }
  }, [isBeingEdited, questionText, builderStore.content?.text]);

  useEffect(() => {
    if (isBeingEdited) {
      setSupportText(builderStore.content?.supportText);
    } else if (questionSupportText) {
      setSupportText(questionSupportText);
    }
  }, [isBeingEdited, questionSupportText, builderStore.content?.supportText]);

  const handleOnEdit = () => {
    builderStore.initEditing(
      {
        id: contentId,
        surveyId,
        sectionId,
        text: questionText,
        supportText: questionSupportText,
        type: questionType,
        orderNumber,
      },
      inputElements
    );
  };

  return {
    type,
    text,
    supportText,
    inputElements,
    isEditing: builderStore.isEditing,
    handleOnEdit,
  };
};

export default useElement;
