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
      className={`my-2 py-2 px-4 bg-black	shadow hover:shadow-md text-white text-sm  ${className}`}
    >
      {children}
    </button>
  );
};

export default AppButton;
