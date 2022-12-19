import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

type SurveyRadioGroupItemProps = {
  value?: string;
  label?: string;
  isChecked?: boolean;
};

const SurveyRadioGroupItem = ({
  value,
  label,
  isChecked,
}: SurveyRadioGroupItemProps) => {
  return (
    <RadioGroup.Item
      value={value ? value : ""}
      className={`flex mt-4 shadow hover:shadow-md p-5 cursor-pointer w-full ${
        isChecked ? "bg-green-200" : "bg-green-100"
      }`}
    >
      <div className="flex my-2">
        <div className="h-6 w-6 flex justify-center items-center rounded-full shadow border-green-300 border bg-white">
          <RadioGroup.Indicator className="w-3 h-3 bg-green-200 rounded-full"></RadioGroup.Indicator>
        </div>
        <label className="ml-2">{label}</label>
      </div>
    </RadioGroup.Item>
  );
};

export default SurveyRadioGroupItem;
