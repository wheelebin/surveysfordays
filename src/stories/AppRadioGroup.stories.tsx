import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AppRadioGroup from "../components/AppRadioGroup";
import AppRadioGroupItem from "../components/AppRadioGroup";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/AppRadioGroup",
  component: AppRadioGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AppRadioGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppRadioGroup> = (args) => (
  <AppRadioGroup {...args}>
    <AppRadioGroupItem />
  </AppRadioGroup>
);

export const Primary = Template.bind({});
Primary.args = {
  radioItems: [{ id: "someId", label: "My radio item", value: "someValue" }],
};

export const MultipleItems = Template.bind({});
Primary.args = {
  radioItems: [
    { id: "someId1", label: "My radio item 1", value: "someValue1" },
    { id: "someId2", label: "My radio item 2", value: "someValue2" },
  ],
};
