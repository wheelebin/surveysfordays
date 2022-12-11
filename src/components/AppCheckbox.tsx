import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";

type AppCheckboxProps = {
  value?: string;
  label?: string;
  onChange?: (isChecked: boolean) => void;
};

const AppCheckbox = ({ value, label, onChange }: AppCheckboxProps) => {
  return (
    <div className="flex my-2">
      <Checkbox.Root
        value={value}
        onCheckedChange={onChange}
        className="rounded-sm h-6 w-6 flex justify-center items-center shadow border-slate-200 border"
      >
        <Checkbox.Indicator className="w-3 h-3 bg-indigo-500"></Checkbox.Indicator>
      </Checkbox.Root>
      <label className="ml-2">{label}</label>
    </div>
  );
};

export default AppCheckbox;
