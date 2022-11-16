import React from "react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { DropdownMenuIcon } from "@radix-ui/react-icons";

type AppDropdownProps = {
  children: React.ReactNode;
};

const AppDropdown = ({ children }: AppDropdownProps) => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <DropdownMenuIcon />
      </Dropdown.Trigger>
      <Dropdown.Content className="bg-white shadow">
        {children}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default AppDropdown;
