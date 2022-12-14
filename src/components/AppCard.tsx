import React from "react";

type Props = {
  children?: React.ReactNode;
  isCurrent?: boolean;
  className?: string;
};

const AppButton: React.FC<Props> = ({ children, isCurrent, className }) => {
  return (
    <div
      className={`py-5 px-3 shadow rounded-md bg-white ${
        isCurrent ? "py-20" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default AppButton;
