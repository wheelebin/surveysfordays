import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

type AppRadioProps = {
  value?: string;
  label?: string;
};

const AppRadio = ({ value, label }: AppRadioProps) => {
  return (
    <div className="flex my-2">
      <RadioGroup.Item
        value={value ? value : ""}
        className="h-6 w-6 flex justify-center items-center rounded-full shadow border-slate-200 border"
      >
        <RadioGroup.Indicator className="w-3 h-3 bg-indigo-500 rounded-full"></RadioGroup.Indicator>
      </RadioGroup.Item>
      <label className="ml-2">{label}</label>
    </div>
  );
};

export default AppRadio;
