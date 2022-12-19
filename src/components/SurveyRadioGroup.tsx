import React, { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import SurveyRadioGroupItem from "./SurveyRadioGroupItem";

type SurveyRadioGroupProps = {
  children?: React.ReactNode;
  radioItems?: { id: string; value?: string; label?: string }[];
  onChange?: (value: string) => void;
};

const SurveyRadioGroup = ({
  radioItems,
  children,
  onChange,
}: SurveyRadioGroupProps) => {
  const [valueInternal, setValueInternal] =
    useState<string | undefined>(undefined);

  const handleOnChange = (value: string) => {
    setValueInternal(value);
    onChange && onChange(value);
  };

  return (
    <RadioGroup.Root
      onValueChange={(value) => handleOnChange(value)}
      value={valueInternal}
    >
      {radioItems && radioItems.length > 0
        ? radioItems.map(({ id, label, value }) => (
            <SurveyRadioGroupItem
              key={id}
              label={label}
              value={id}
              isChecked={valueInternal === id}
            />
          ))
        : children}
    </RadioGroup.Root>
  );
};

export default SurveyRadioGroup;
