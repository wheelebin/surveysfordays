import { useState, useEffect, useRef } from "react";
import { trpc } from "@/utils/trpc";
import { useBuilderStore, InputElement } from "@/stores/builder";
import useQuestion from "./useQuestion";

// TODO Finish this

const useElement = (
  contentId: string,
  surveyId: string,
  questionType: string,
  questionText: string,
  orderNumber: number,
  isPublished?: boolean,
  questionSupportText?: string | null
) => {
  const [inputElements, setInputElements] = useState<InputElement[]>([]);
  const [text, setText] = useState<string | undefined>("");
  const [supportText, setSupportText] =
    useState<string | undefined | null>(undefined);
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>("");

  //const { deleteQuestion } = useQuestion(surveyId);

  // TODO This could stay here, we could put it in useQuestion or create a new hook for QuestionOption

  const { data } = trpc.useQuery(
    isPublished
      ? [
          "questionOption.getAllPublishedByQuestionId",
          { questionId: contentId },
        ]
      : ["questionOption.getAllByQuestionId", { questionId: contentId }],
    {
      refetchOnWindowFocus: false,
    }
  );

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
            setInputElements(data || []);
            setText(questionText);
            setType(questionType);
            setSupportText(questionSupportText);
          }
        }
      ),
    [contentId, data, questionText, questionType, questionSupportText]
  );
  useEffect(() => {
    setInputElements(data || []);
  }, [data]);

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
