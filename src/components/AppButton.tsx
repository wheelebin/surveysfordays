import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const AppButton: React.FC<Props> = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`my-2 py-4 px-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold shadow ${className}`}
    >
      {children}
    </button>
  );
};

export default AppButton;
