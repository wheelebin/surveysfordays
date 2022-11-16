import React, { useState, useEffect } from "react";
import AppTextField from "./AppTextField";
import AppButton from "./AppButton";
import AppSeperator from "./AppSeperator";
import useBuilder from "@/hooks/useBuilder";
import { InputElement } from "@/stores/builder";

const BuilderElementFormInputs: React.FC = () => {
  const [inputElement, setInputElement] =
    useState<InputElement | undefined>(undefined);

  const {
    handleOnEditSave,
    content,
    inputElements,
    setContent,
    setInputElements,
  } = useBuilder();

  useEffect(() => {
    const [internalInputElement] = inputElements;
    setInputElement(internalInputElement);
  }, [inputElements]);

  const handleOnChange = (key: string, value: string) => {
    if (inputElement) {
      const newInputElement = {
        ...inputElement,
        [key]: value,
      };
      setInputElements([newInputElement]);
    }
  };

  return (
    <div>
      <h1 className="text-xl">Input</h1>
      <AppTextField
        label="Label"
        onChange={(value) => handleOnChange("label", value)}
        value={inputElement?.label || ""}
      />
      <AppTextField
        label="Placeholder"
        onChange={(value) => handleOnChange("placeholder", value)}
        value={inputElement?.placeholder || ""}
      />
      <AppTextField
        label="Support text"
        onChange={(value) => handleOnChange("supportText", value)}
        value={inputElement?.supportText || ""}
      />
      <AppButton className="w-full" onClick={handleOnEditSave}>
        Save
      </AppButton>
    </div>
  );
};

export default BuilderElementFormInputs;
