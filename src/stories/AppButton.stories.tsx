import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AppButton from "../components/AppButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/AppButton",
  component: AppButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AppButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppButton> = (args) => (
  <AppButton {...args}>Click me</AppButton>
);

export const Primary = Template.bind({});

export const FullWidth = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FullWidth.args = {
  className: "w-full",
};
