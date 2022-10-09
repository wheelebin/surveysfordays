import { useState, useEffect, useRef } from "react";
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
  const [inputElements, setInputElements] = useState<InputElement[]>([]);
  const [text, setText] = useState<string | undefined>("");
  const [supportText, setSupportText] =
    useState<string | undefined | null>(undefined);
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>("");

  const utils = trpc.useContext();

  const deleteQuestionMutation = trpc.useMutation("question.delete", {
    onSuccess(input) {
      utils.invalidateQueries([
        "question.getAllBySectionId",
        { sectionId: input.sectionId },
      ]);
    },
  });

  const { data } = trpc.useQuery(
    ["questionOption.getAllByQuestionId", { questionId: contentId }],
    { refetchOnWindowFocus: false }
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
        sectionId,
        text: questionText,
        supportText: questionSupportText,
        type: questionType,
        orderNumber,
      },
      inputElements
    );
  };

  const handleOnDelete = () => {
    deleteQuestionMutation.mutateAsync({ id: contentId });
  };

  return {
    type,
    text,
    supportText,
    inputElements,
    handleOnEdit,
    handleOnDelete,
  };
};

export default useElement;
