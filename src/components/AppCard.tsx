import React from "react";

type Props = {
  children?: React.ReactNode;
  isCurrent?: boolean;
};

const AppButton: React.FC<Props> = ({ children, isCurrent }) => {
  return (
    <div
      className={`py-5 px-3 shadow rounded-md bg-white ${isCurrent && "py-20"}`}
    >
      {children}
    </div>
  );
};

export default AppButton;
