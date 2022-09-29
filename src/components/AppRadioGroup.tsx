import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import AppRadioGroupItem from "./AppRadioGroupItem";

type AppRadioGroupProps = {
  children?: React.ReactNode;
  radioItems?: { value?: string; label?: string }[];
  onChange?: (value: string) => void;
};

const AppRadioGroup = ({
  radioItems,
  children,
  onChange,
}: AppRadioGroupProps) => {
  return (
    <RadioGroup.Root onValueChange={(value) => onChange && onChange(value)}>
      {radioItems && radioItems.length > 0
        ? radioItems.map(({ label, value }) => (
            <AppRadioGroupItem key={value} label={label} value={value} />
          ))
        : children}
    </RadioGroup.Root>
  );
};

export default AppRadioGroup;
