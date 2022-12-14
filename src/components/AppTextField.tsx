import React from "react";

type AppTextFieldProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  supportText?: string;
  className?: string;
};

const AppTextField = ({
  label,
  value,
  onChange,
  placeholder,
  className,
  supportText,
}: AppTextFieldProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        className="bg-transparent border-b-2 border-black outline-none  p-1"
        onChange={(e) => onChange && onChange(e.target.value)}
        value={value}
        type="text"
      />
      <span className="text-gray-600">{supportText}</span>
    </div>
  );
};

export default AppTextField;
