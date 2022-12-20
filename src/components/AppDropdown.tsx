import React from "react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

type AppDropdownProps = {
  trigger?: React.ReactNode;
  children: React.ReactNode;
};

const AppDropdown = ({ trigger, children }: AppDropdownProps) => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        {trigger ? trigger : <DotsVerticalIcon />}
      </Dropdown.Trigger>
      <Dropdown.Content className="bg-white shadow mt-2">
        {children}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default AppDropdown;
