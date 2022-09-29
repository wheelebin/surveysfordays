import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import AppRadioGroupItem from "./AppRadioGroupItem";

const AppRadioGroup = () => {
  return (
    <RadioGroup.Root>
      <AppRadioGroupItem value="Test 1" label="Test 1" />
      <AppRadioGroupItem value="Test 2" label="Test 2" />
    </RadioGroup.Root>
  );
};

export default AppRadioGroup;
