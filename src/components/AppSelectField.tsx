import React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";

type SelectItem = {
  value: string;
  label: string;
};

type SelectGroup = {
  label?: string;
  selectItems: SelectItem[];
};

type AppSelectFieldProps = {
  selectGroups: SelectGroup[];
  onChange?: (value: string) => void;
  placeholder?: string;
};

const AppSelectField = ({
  selectGroups,
  onChange,
  placeholder,
}: AppSelectFieldProps) => {
  return (
    <Select.Root onValueChange={onChange}>
      <Select.Trigger className="flex items-center justify-between w-full">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white shadow">
          <Select.ScrollUpButton />
          <Select.Viewport className="p-3">
            {selectGroups.map(({ selectItems, label: GroupLabel }, i) => (
              <Select.Group key={GroupLabel || i}>
                {GroupLabel && (
                  <Select.Label className="text-sm m">
                    {GroupLabel}
                  </Select.Label>
                )}
                {selectItems.map(({ value, label }) => (
                  <Select.Item className="pl-5" key={value} value={value}>
                    <Select.ItemText>{label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Group>
            ))}
            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default AppSelectField;
