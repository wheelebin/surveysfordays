import React, { useState } from "react";
import AppRadioGroup from "./AppRadioGroup";
import AppCheckbox from "./AppCheckbox";
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
  // TODO Label in here is only for on an input element level, actual question text is in BuilderSectionContent
  const getElement = () => {
    if (type === "RADIO") {
      return (
        <AppRadioGroup
          onChange={(value: string) => onChange && onChange([value])}
          radioItems={options}
        />
      );
    }

    if (type === "CHECKBOX") {
      const handleOnCheckedChange = (id: string, isChecked: boolean) => {
        const value = isChecked
          ? [...valueInternal, id]
          : valueInternal.filter((value) => value !== id);
        setValueInternal(value);
        onChange && onChange(value);
      };
      return options ? (
        options.map((option) => (
          <AppCheckbox
            onChange={(isChecked) =>
              handleOnCheckedChange(option.id, isChecked)
            }
            key={option.id}
            value={option.id}
            label={option.label}
          />
        ))
      ) : (
        <AppCheckbox value={value} label={label} />
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
