import { useState, useEffect, useRef } from "react";
import { trpc } from "@/utils/trpc";
import { useBuilderStore, InputElement } from "@/stores/builder";
import questionOptionApi from "@/api/questionOption";

const useElement = (
  contentId: string,
  surveyId: string,
  questionType: string,
  questionText: string,
  orderNumber: number,
  status: string,
  questionOptions: {
    id: string;
    type: string;
    label: string;
    placeholder: string | null;
    supportText: string | null;
    value: string;
    orderNumber: number;
    status: string;
  }[],
  questionSupportText?: string | null
) => {
  const [inputElements, setInputElements] = useState<InputElement[]>([]);
  const [text, setText] = useState<string | undefined>("");
  const [supportText, setSupportText] =
    useState<string | undefined | null>(undefined);
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>("");

  useEffect(
    () =>
      useBuilderStore.subscribe(
        ({ isEditing, content, inputElements }, prev) => {
          const isBeingEdited = isEditing && contentId === content?.id;
          const previousWasBeingEdited = prev.content?.id === contentId;

          if (isBeingEdited) {
            setInputElements(inputElements);
            setText(content?.text);
            setType(content?.type);
            setSupportText(content?.supportText);
          }

          if (!isBeingEdited && previousWasBeingEdited) {
            setInputElements(questionOptions || []);
            setText(questionText);
            setType(questionType);
            setSupportText(questionSupportText);
          }
        }
      ),
    [
      contentId,
      questionOptions,
      questionText,
      questionType,
      questionSupportText,
    ]
  );
  useEffect(() => {
    setInputElements(questionOptions || []);
  }, [questionOptions]);

  useEffect(() => {
    setText(questionText);
  }, [questionText]);

  useEffect(() => {
    setType(questionType);
  }, [questionType]);

  useEffect(() => {
    setSupportText(questionSupportText);
  }, [questionSupportText]);

  const handleOnEdit = () => {
    useBuilderStore.getState().initEditing(
      {
        id: contentId,
        surveyId,
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
    //handleOnEdit,
    //handleOnDelete: () => deleteQuestion(contentId),
  };
};

export default useElement;
