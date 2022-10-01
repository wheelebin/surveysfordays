import React from "react";
import AppRadioGroup from "./AppRadioGroup";
import AppCheckbox from "./AppCheckbox";
import AppTextField from "./AppTextField";

type Props = {
  id?: string;
  type: string;
  value?: string;
  options?: { id?: string; value: string; label: string }[];
  label?: string;
  placeholder?: string;
  support?: string;
  onChange?: (value: string) => void;
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
  const getElement = () => {
    if (type === "RADIO") {
      return <AppRadioGroup radioItems={options} />;
    }

    if (type === "CHECKBOX") {
      return options ? (
        options.map((option) => (
          <AppCheckbox
            key={option.id}
            value={option.value}
            label={option.label}
          />
        ))
      ) : (
        <AppCheckbox value={value} label={label} />
      );
    }

    if (type === "TEXT") {
      return <AppTextField value={value} placeholder={placeholder} />;
    }
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <h1 className="text-xl">{label}</h1>
      </div>
      <div>{getElement()}</div>
      <div className="text-sm">{support}</div>
    </div>
  );
};

export default BuilderInputElement;
