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
  supportText?: string;
  orderNumber: number;
};

const BuilderSectionContent = (props: Props) => {
  const { inputElements, handleOnEdit, text, supportText, type } = useElement(
    props.contentId,
    props.type,
    props.text,
    props.supportText
  );

  const renderElements = () => {
    const elements = inputElements;
    const [element] = elements.length === 1 ? elements : [];
    const elemType = props.type || type;

    if (!elemType) {
      return <p>Something went wrong</p>;
    }

    // TODO Move text & suportText from content/question into BuilderSection

    if (element) {
      return (
        <BuilderInputElement
          type={elemType}
          support={element.supportText || undefined}
          placeholder={element.placeholder || undefined}
          label={element.label}
        />
      );
    }

    return <BuilderInputElement type={elemType} options={elements} />;
  };

  return (
    <div>
      <Pencil1Icon onClick={handleOnEdit} className="ml-2 cursor-pointer" />
      <div className="flex items-center mb-2">
        <h1 className="text-xl">{text}</h1>
      </div>
      {renderElements()}
      <div className="flex items-center mb-2">
        <h1 className="text-sm">{supportText}</h1>
      </div>
    </div>
  );
};

export default BuilderSectionContent;
