import React, { useState } from "react";
import SurveyRadioGroup from "./SurveyRadioGroup";
import SurveyCheckbox from "./SurveyCheckbox";
import AppTextField from "./AppTextField";

type Props = {
  id?: string;
  type: string;
  value?: string;
  options?: { id: string; value: string; label: string }[];
  label?: string;
  placeholder?: string;
  support?: string;
  onChange?: (value: string[]) => void;
};

const BuilderInputElement: React.FC<Props> = ({
  type,
  value,
  options,
  label,
  placeholder,
  support,
  onChange,
}) => {
  const [valueInternal, setValueInternal] = useState<string[]>([]);

  const handleOnCheckedChange = (id: string, isChecked: boolean) => {
    const value = isChecked
      ? [...valueInternal, id]
      : valueInternal.filter((value) => value !== id);
    setValueInternal(value);
    onChange && onChange(value);
  };

  const getElement = () => {
    if (type === "RADIO") {
      return (
        <SurveyRadioGroup
          onChange={(value: string) => onChange && onChange([value])}
          radioItems={options}
        />
      );
    }

    if (type === "CHECKBOX") {
      return options ? (
        options.map((option) => (
          <SurveyCheckbox
            onChange={(isChecked) =>
              handleOnCheckedChange(option.id, isChecked)
            }
            key={option.id}
            value={option.id}
            label={option.label}
          />
        ))
      ) : (
        <SurveyCheckbox value={value} label={label} />
      );
    }

    if (type === "TEXT") {
      return (
        <AppTextField
          onChange={(value) => onChange && onChange([value])}
          value={value}
          placeholder={placeholder}
        />
      );
    }
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <h1 className="text-md">{label}</h1>
      </div>
      <div>{getElement()}</div>
      <div className="text-sm">{support}</div>
    </div>
  );
};

export default BuilderInputElement;
