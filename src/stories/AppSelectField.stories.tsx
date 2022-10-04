import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AppSelectField from "../components/AppSelectField";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/AppSelectField",
  component: AppSelectField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AppSelectField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppSelectField> = (args) => (
  <AppSelectField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  placeholder: "Select an item",
  selectGroups: [
    {
      selectItems: [
        { label: "Item 1", value: "item1" },
        { label: "Item 2", value: "item2" },
        { label: "Item 3", value: "item4" },
      ],
    },
  ],
};

export const WithGroups = Template.bind({});
WithGroups.args = {
  placeholder: "Select an item",
  selectGroups: [
    {
      label: "Group 1",
      selectItems: [
        { label: "Item 1", value: "item1" },
        { label: "Item 2", value: "item2" },
        { label: "Item 3", value: "item4" },
      ],
    },
    {
      label: "Group 2",
      selectItems: [
        { label: "Item 5", value: "item5" },
        { label: "Item 6", value: "item6" },
        { label: "Item 7", value: "item7" },
      ],
    },
  ],
};
