import React, { useState, useEffect } from "react";
import BuilderInputElement from "./BuilderInputElement";

import { Pencil1Icon } from "@radix-ui/react-icons";
import useElement from "@/hooks/useElement";

import { ELEMENTS_WITH_ADD_MULTIPLE } from "@/constants/elements";

type Props = {
  contentId: string;
  type: string;
  surveyId: string;
  sectionId: string;
  text: string;
  supportText?: string | null;
  orderNumber: number;
};

const BuilderSectionContent = (props: Props) => {
  const { inputElements, handleOnEdit, text, supportText, type } = useElement(
    props.contentId,
    props.surveyId,
    props.sectionId,
    props.type,
    props.text,
    props.orderNumber,
    props.supportText
  );

  const renderElements = () => {
    const elements = inputElements;
    const [element] = elements.length === 1 ? elements : []; // This also needs to check for the elementType

    if (!type) {
      return <p>Something went wrong</p>;
    }

    if (ELEMENTS_WITH_ADD_MULTIPLE.includes(type)) {
      return <BuilderInputElement type={type} options={elements} />;
    } else if (element) {
      return (
        <BuilderInputElement
          type={type}
          support={element.supportText || undefined}
          placeholder={element.placeholder || undefined}
          label={element.label}
        />
      );
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <Pencil1Icon onClick={handleOnEdit} className="ml-2 cursor-pointer" />
      </div>
      <div className="flex mb-4 flex-col">
        <h1 className="text-xl">{text}</h1>
        <span className="text-sm">{supportText}</span>
      </div>
      <div className="">{renderElements()}</div>
    </div>
  );
};

export default BuilderSectionContent;
