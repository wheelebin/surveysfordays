import React from "react";

type Props = {
  primary?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const AppButton: React.FC<Props> = ({
  primary,
  children,
  onClick,
  className = "",
}) => {
  const primaryStyle = "bg-green-200 text-gray-800";
  const secondaryStyle = "bg-white";

  return (
    <button
      onClick={onClick}
      className={`my-2 py-2 px-4 shadow hover:shadow-md text-sm flex items-center justify-center font-bold
      ${primary ? primaryStyle : secondaryStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default AppButton;
