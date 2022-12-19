const TEXT = { label: "Text field", value: "TEXT" };
const NUMBER = { label: "Number field", value: "NUMBER" };
const CHECKBOX = { label: "Multiple choices", value: "CHECKBOX" };
const RADIO = { label: "Single choice", value: "RADIO" };

const ELEMENT_GROUPS = [
  {
    label: "Inputs",
    selectItems: [TEXT, NUMBER],
  },
  {
    label: "Selections",
    selectItems: [CHECKBOX, RADIO],
  },
];

const ELEMENTS_WITH_ADD_MULTIPLE = [CHECKBOX.value, RADIO.value];
const ELEMENTS_WITH_PLACEHOLDER = [TEXT.value, NUMBER.value];

export {
  ELEMENT_GROUPS,
  ELEMENTS_WITH_ADD_MULTIPLE,
  ELEMENTS_WITH_PLACEHOLDER,
};
