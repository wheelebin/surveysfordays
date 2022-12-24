import React from "react";

type Props = {
  primary?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const AppButton: React.FC<Props> = ({
  primary,
  children,
  onClick,
  disabled,
  className = "",
}) => {
  const primaryStyle = "bg-green-200 text-gray-800";
  const secondaryStyle = "bg-white";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`my-2 py-2 px-4 shadow hover:shadow-md text-sm flex items-center justify-center font-bold
      ${primary ? primaryStyle : secondaryStyle} ${
        disabled ? "opacity-50" : "opacity-100"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default AppButton;
