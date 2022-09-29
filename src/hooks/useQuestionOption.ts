import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import {
  ELEMENTS_WITH_ADD_MULTIPLE,
  ELEMENTS_WITH_PLACEHOLDER,
} from "@/constants/elements";

type inputElement = {
  type: string;
  label: string;
  value: string;
  placeholder?: string;
  id: string;
};

const useQuestionOption = ({
  questionId,
  elementType,
}: {
  questionId?: string;
  elementType?: string;
}) => {
  const [inputElements, setInputElements] = useState<inputElement[]>([]);
  const [elemType, setElemType] = useState<string | undefined>(undefined);

  const [questionText, setQuestionText] = useState<string | undefined>(
    undefined
  );
  const [supportingText, setSupportingText] = useState<string | undefined>(
    undefined
  );
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);

  const [canAdd, setCanAdd] = useState<boolean>(false);
  const [hasPlaceholder, setHasPlaceholder] = useState<boolean>(false);

  const utils = trpc.useContext();
  const editQuestionOptions = trpc.useMutation(["questionOption.edit"]);
  const addQuestionOptions = trpc.useMutation(["questionOption.add"]);

  const { data: question } = trpc.useQuery(
    ["question.byId", { id: questionId as string }],
    { enabled: !!questionId }
  );
  const { data: questionOptions } = trpc.useQuery(
    [
      "questionOption.getAllByQuestionId",
      { questionId: question?.id as string },
    ],
    { enabled: !!question?.id }
  );

  useEffect(() => {
    setQuestionText(question?.text);
  }, [question]);

  useEffect(() => {
    const canAdd = ELEMENTS_WITH_ADD_MULTIPLE.find(
      (value) => elemType === value
    );
    const hasPlaceholder = ELEMENTS_WITH_PLACEHOLDER.find(
      (value) => elemType === value
    );

    if (canAdd) {
      setCanAdd(true);
    }
    if (hasPlaceholder) {
      setHasPlaceholder(true);
    }
  }, [elemType]);

  useEffect(() => {
    let elementTypeInternal = elementType;

    if (questionOptions) {
      setInputElements(
        questionOptions.map(({ text, type, id }, i) => {
          if (i === 0) {
            elementTypeInternal = type;
            setElemType(elementTypeInternal);
          }
          return { id, type, label: text, value: text };
        })
      );
    }
  }, [elementType, question, questionOptions]);

  const onSave = () => {
    if (questionId) {
      const data = inputElements.map(({ id, label }) => ({
        id,
        text: label,
      }));

      editQuestionOptions.mutate(data, {
        onSuccess(input) {
          utils.invalidateQueries(["questionOption.getAllByQuestionId"]);
        },
      });
    } /* else {
      const data = inputElements.map(({ label, type }) => ({
        type,
        text: label,
      }));

      addQuestionOptions.mutate({questionId, data});
    } */
  };

  return {
    inputElements,
    setInputElements,
    elemType,
    questionText,
    setQuestionText,
    supportingText,
    setSupportingText,
    placeholder,
    setPlaceholder,
    canAdd,
    hasPlaceholder,
    onSave,
  };
};

export default useQuestionOption;
