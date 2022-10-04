import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AppCheckbox from "../components/AppCheckbox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/AppCheckbox",
  component: AppCheckbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AppCheckbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppCheckbox> = (args) => (
  <AppCheckbox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: "My checkbox",
};
