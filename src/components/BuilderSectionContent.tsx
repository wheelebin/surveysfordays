import React, { useState, useEffect } from "react";
import BuilderInputElement from "./BuilderInputElement";

import { Pencil1Icon } from "@radix-ui/react-icons";
import useElement from "@/hooks/useElement";

type Props = {
  contentId: string;
  type: string;
  surveyId: string;
  sectionId: string;
  text: string;
  orderNumber: number;
};

const BuilderSectionContent = (props: Props) => {
  const { inputElements, handleOnEdit, text, support, type } = useElement(
    props.contentId,
    props.text,
    "",
    props.type
  );

  const renderElements = () => {
    const elements = inputElements;
    const elemType = props.type || type;

    if (!elemType) {
      return <p>Something went wrong</p>;
    }

    const builderInputElementProps = {
      value: elements.length === 1 ? elements[0]?.value : undefined,
      options: elements,
      support: support,
      label: text,
    };

    return (
      <BuilderInputElement type={elemType} {...builderInputElementProps} />
    );
  };

  return (
    <div>
      <Pencil1Icon onClick={handleOnEdit} className="ml-2 cursor-pointer" />
      {renderElements()}
    </div>
  );
};

export default BuilderSectionContent;
