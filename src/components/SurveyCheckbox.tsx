import React, { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";

type SurveyCheckboxProps = {
  value?: string;
  label?: string;
  onChange?: (isChecked: boolean) => void;
};

const SurveyCheckbox = ({ value, label, onChange }: SurveyCheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleOnCheckedChange = (isChecked: boolean) => {
    onChange && onChange(isChecked);
    setIsChecked(isChecked);
  };

  return (
    <Checkbox.Root
      value={value}
      onCheckedChange={handleOnCheckedChange}
      className="flex w-full"
    >
      <div
        className={`flex mt-4 shadow hover:shadow-md p-5 cursor-pointer w-full ${
          isChecked ? "bg-green-200" : "bg-green-100"
        }`}
      >
        <div className="rounded-sm h-6 w-6 flex justify-center items-center border-green-300 border bg-white ">
          <Checkbox.Indicator className="w-3 h-3 bg-green-200"></Checkbox.Indicator>
        </div>
        <label className="ml-2 font-bold text-gray-800 cursor-pointer">
          {label}
        </label>
      </div>
    </Checkbox.Root>
  );
};

export default SurveyCheckbox;
