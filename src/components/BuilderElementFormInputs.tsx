import React from "react";
import AppTextField from "./AppTextField";
import {
  contentText,
  contentSupportingText,
  contentPlaceholder,
  contentInputElements,
} from "@/utils/atoms";
import { useAtom } from "jotai";

type Props = {
  elementType: string;
  questionId?: string;
};

const BuilderElementFormInputs: React.FC<Props> = ({
  elementType,
  questionId,
}) => {
  const [contentText_, setContentText] = useAtom(contentText);
  const [contentSupportingText_, setContentSupportingText] = useAtom(
    contentSupportingText
  );
  const [contentPlaceholder_, setContentPlaceholder] =
    useAtom(contentPlaceholder);
  const [contentInputElements_, setContentInputElements] =
    useAtom(contentInputElements);

  const handleOnChange = (key: string, value: string) => {
    const [currentElement] = contentInputElements_;
    if (currentElement) {
      const newInputElement = {
        ...currentElement,
        [key]: value,
      };
      setContentInputElements([newInputElement]);
      setContentPlaceholder(value);
    }
  };

  return (
    <div>
      <AppTextField
        label="Label"
        onChange={setContentText}
        value={contentText_}
      />
      <AppTextField
        label="Supporting text"
        onChange={setContentSupportingText}
        value={contentSupportingText_}
      />
      <AppTextField
        label="Placeholder"
        onChange={(value) => handleOnChange("placeholder", value)}
        value={contentPlaceholder_}
      />
    </div>
  );
};

export default BuilderElementFormInputs;
