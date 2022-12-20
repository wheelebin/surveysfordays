import React from "react";

type AppTextFieldProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  supportText?: string;
};

const AppTextField = ({
  label,
  value,
  onChange,
  placeholder,
}: AppTextFieldProps) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        placeholder={placeholder}
        className="bg-transparent border-b-2 border-black outline-none  p-1"
        onChange={(e) => onChange && onChange(e.target.value)}
        value={value}
        type="text"
      />
    </div>
  );
};

export default AppTextField;
