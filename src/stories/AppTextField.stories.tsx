import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AppTextField from "../components/AppTextField";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/AppTextField",
  component: AppTextField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AppTextField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppTextField> = (args) => (
  <AppTextField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: "My text field",
  value: "someValue",
  placeholder: "Enter something here",
};
