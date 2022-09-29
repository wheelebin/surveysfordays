import React from "react";
import AppTextField from "./AppTextField";
import { useBuilder } from "@/hooks/useBuilder";

type Props = {
  elementType: string;
  questionId?: string;
};

const BuilderElementFormInputs: React.FC<Props> = ({
  elementType,
  questionId,
}) => {
  const {
    questionText,
    setQuestionText,
    supportingText,
    setSupportingText,
    placeholder,
    setPlaceholder,
  } = useBuilder();

  return (
    <div>
      <AppTextField
        label="Label"
        onChange={setQuestionText}
        value={questionText}
      />
      <AppTextField
        label="Supporting text"
        onChange={setSupportingText}
        value={supportingText}
      />
      <AppTextField
        label="Placeholder"
        onChange={setPlaceholder}
        value={placeholder}
      />
    </div>
  );
};

export default BuilderElementFormInputs;
