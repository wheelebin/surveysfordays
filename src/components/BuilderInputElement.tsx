import React from "react";
import AppRadioGroup from "./AppRadioGroup";
import AppCheckbox from "./AppCheckbox";
import AppTextField from "./AppTextField";

type Props = {
  type: string;
  value?: string;
  label?: string;
  placeholder?: string;
};

const BuilderInputElement: React.FC<Props> = ({
  type,
  value,
  label,
  placeholder,
}) => {
  if (type === "RADIO") {
    return <AppRadioGroup radioItems={[{ value: value, label: label }]} />;
  }

  if (type === "CHECKBOX") {
    return <AppCheckbox value={value} label={label} />;
  }

  if (type === "TEXT") {
    return <AppTextField value={value} placeholder={placeholder} />;
  }

  return <></>;
};

export default BuilderInputElement;
