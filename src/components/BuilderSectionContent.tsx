import React, { useRef, useEffect } from "react";
import BuilderInputElement from "./BuilderInputElement";
import BuilderHeader from "./BuilderHeader";
import AppCard from "./AppCard";

import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";
import useElement from "@/hooks/useElement";

import { ELEMENTS_WITH_ADD_MULTIPLE } from "@/constants/elements";

type Props = {
  contentId: string;
  type: string;
  surveyId: string;
  text: string;
  supportText?: string | null;
  orderNumber: number;
  isCurrent: boolean;
};

const BuilderSectionContent = (props: Props) => {
  const myRef = useRef<HTMLDivElement | null>(null);
  const {
    inputElements,
    handleOnEdit,
    handleOnDelete,
    text,
    supportText,
    type,
  } = useElement(
    props.contentId,
    props.surveyId,
    props.type,
    props.text,
    props.orderNumber,
    props.supportText
  );

  useEffect(() => {
    if (myRef && myRef.current && props.isCurrent) {
      myRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [props.isCurrent]);

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
    <div>
      <AppCard isCurrent={props.isCurrent}>
        <div className="relative">
          <BuilderHeader onEdit={handleOnEdit} />

          <div className="flex mb-4 flex-col">
            <h1 className="text-xl">{text}</h1>
            <span className="text-sm">{supportText}</span>
          </div>
          <div className="">{renderElements()}</div>
        </div>
      </AppCard>
    </div>
  );
};

export default BuilderSectionContent;
