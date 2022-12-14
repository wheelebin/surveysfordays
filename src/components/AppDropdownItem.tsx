import React from "react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

type AppDropdownItemProps = {
  icon?: JSX.Element;
  label: string;
  onClick: () => void;
};

const AppDropdownItem = ({ icon, label, onClick }: AppDropdownItemProps) => {
  return (
    <Dropdown.Item onClick={onClick}>
      <div className="flex items-center bg-white py-2 px-5 cursor-pointer">
        {icon}
        {label}
      </div>
    </Dropdown.Item>
  );
};

export default AppDropdownItem;
