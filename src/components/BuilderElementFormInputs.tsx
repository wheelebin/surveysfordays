import React from "react";
import AppTextField from "./AppTextField";
import AppButton from "./AppButton";
import useBuilder from "@/hooks/useBuilder";

type Props = {
  elementType: string;
  questionId?: string;
};

const BuilderElementFormInputs: React.FC<Props> = ({
  elementType,
  questionId,
}) => {
  const {
    handleOnEditSave,
    content,
    inputElements,
    setContent,
    setInputElements,
  } = useBuilder();

  const handleOnChange = (key: string, value: string) => {
    const [currentElement] = inputElements;
    if (currentElement) {
      const newInputElement = {
        ...currentElement,
        [key]: value,
      };
      setInputElements([newInputElement]);
    }
  };

  return (
    <div>
      <AppTextField
        label="Label"
        onChange={(value) => setContent("text", value)}
        value={content?.text}
      />
      <AppTextField
        label="Supporting text"
        onChange={(value) => setContent("supportText", value)}
        value={content?.supportText || ""}
      />
      <AppTextField
        label="Placeholder"
        onChange={(value) => handleOnChange("placeholder", value)}
        value={inputElements[0]?.placeholder || ""}
      />
      <AppButton className="w-full" onClick={handleOnEditSave}>
        Save
      </AppButton>
    </div>
  );
};

export default BuilderElementFormInputs;
