import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import BuilderInputElement from "../components/BuilderInputElement";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/BuilderInputElement",
  component: BuilderInputElement,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof BuilderInputElement>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BuilderInputElement> = (args) => (
  <BuilderInputElement {...args} />
);

export const Radio = Template.bind({});
Radio.args = {
  type: "RADIO",
  label: "My radio",
  support: "Choose one of the radio items",
  options: [
    { id: "someId1", value: "someValue1", label: "Radio item 1" },
    { id: "someId2", value: "someValue2", label: "Radio item 2" },
  ],
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  type: "CHECKBOX",
  label: "My checkbox",
  support: "Choose one or more of the checkbox items",
  options: [
    { id: "someId1", value: "someValue1", label: "Checkbox item 1" },
    { id: "someId2", value: "someValue2", label: "Checkbox item 2" },
  ],
};

export const TextField = Template.bind({});
TextField.args = {
  type: "TEXT",
  label: "My text field",
  support: "Enter your name in the field above",
  placeholder: "Some name",
};
