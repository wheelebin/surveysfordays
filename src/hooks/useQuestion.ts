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

const useQuestion = ({
  questionId,
  elementType,
}: {
  questionId?: string;
  elementType?: string;
}) => {
  const [elemType, setElemType] = useState<string | undefined>(undefined);

  const [questionText, setQuestionText] = useState<string | undefined>(
    undefined
  );
  const [supportingText, setSupportingText] = useState<string | undefined>(
    undefined
  );
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);

  const [hasPlaceholder, setHasPlaceholder] = useState<boolean>(false);

  const utils = trpc.useContext();
  const editQuestion = trpc.useMutation(["question.editQuestionText"]);
  const addQuestion = trpc.useMutation(["question.add"]);

  const { data: question } = trpc.useQuery(
    ["question.byId", { id: questionId as string }],
    { enabled: !!questionId }
  );

  console.log("QUESTION: ", question);

  useEffect(() => {
    setElemType(elementType);
  }, [elementType]);

  useEffect(() => {
    setQuestionText(question?.text);
    setElemType(question?.type);
  }, [question]);

  useEffect(() => {
    const hasPlaceholder = ELEMENTS_WITH_PLACEHOLDER.find(
      (value) => elemType === value
    );

    if (hasPlaceholder) {
      setHasPlaceholder(true);
    }
  }, [elemType]);

  return {
    elemType,
    questionText,
    setQuestionText,
    supportingText,
    setSupportingText,
    placeholder,
    setPlaceholder,
    hasPlaceholder,
  };
};

export default useQuestion;
