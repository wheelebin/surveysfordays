import React from "react";
import BuilderInputElement from "./BuilderInputElement";

type Props = {
  label?: string;
  supportingText?: string;
  inputElements: {
    type: string;
    value?: string;
    label?: string;
    placeholder?: string;
  }[];
};

const BuilderQuestionFormPreview: React.FC<Props> = ({
  label,
  supportingText,
  inputElements,
}) => {
  return (
    <>
      <h1 className="text-xl">{label}</h1>
      {inputElements.map(({ type, value, label, placeholder }, i) => (
        <div key={i}>
          <BuilderInputElement
            type={type}
            value={value}
            label={label}
            placeholder={placeholder}
          />
        </div>
      ))}
      <h5 className="text-xs">{supportingText}</h5>
    </>
  );
};

export default BuilderQuestionFormPreview;
