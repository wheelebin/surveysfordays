import React, { useEffect, useState } from "react";
import AppRadioGroup from "./AppRadioGroup";
import AppCheckbox from "./AppCheckbox";

type Props = {
  type: string;
  elements: {
    type: string;
    value?: string;
    label?: string;
    placeholder?: string;
  }[];
};

const BuilderSelectionElement: React.FC<Props> = ({ type, elements }) => {
  if (type === "RADIO") {
    return <AppRadioGroup radioItems={elements} />;
  }

  if (type === "CHECKBOX") {
    return (
      <>
        {elements.map(({ value, label }) => (
          <AppCheckbox key={value} value={value} label={label} />
        ))}
      </>
    );
  }

  return <></>;
};

export default BuilderSelectionElement;
