import React, { useRef, useEffect, useState } from "react";
import BuilderInputElement from "./BuilderInputElement";
import AppCard from "./AppCard";
import AppButton from "./AppButton";

import useElement from "@/hooks/useElement";

import { ELEMENTS_WITH_ADD_MULTIPLE } from "@/constants/elements";

type Props = {
  id: string;
  type: string;
  surveyId: string;
  text: string;
  supportText?: string | null;
  orderNumber: number;
  isCurrent: boolean;
  status: string;
  questionOptions: {
    id: string;
    type: string;
    label: string;
    placeholder: string | null;
    supportText: string | null;
    value: string;
    orderNumber: number;
    status: string;
  }[];
  onSubmit?: (values: string[]) => void;
};

const BuilderSectionContent = (props: Props) => {
  const [answers, setAnswers] = useState<string[]>([]);
  const myRef = useRef<HTMLDivElement | null>(null);
  const { inputElements, text, supportText, type } = useElement(
    props.id,
    props.surveyId,
    props.type,
    props.text,
    props.orderNumber,
    props.status,
    props.questionOptions,
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
      return (
        <BuilderInputElement
          type={type}
          options={elements}
          onChange={(value) => setAnswers(value)}
        />
      );
    } else if (element) {
      return (
        <BuilderInputElement
          type={type}
          support={element.supportText || undefined}
          placeholder={element.placeholder || undefined}
          label={element.label}
          onChange={(value) => setAnswers(value)}
        />
      );
    }
  };

  const submitAnswer = () => {
    // Do some submit logic
    // Set next question

    if (props.onSubmit) {
      props.onSubmit(answers);
      console.log(answers);
    }
  };

  console.log("BuilderSectionContent Render", props.id);

  return (
    <div className="mb-5">
      <AppCard isCurrent={props.isCurrent}>
        <div className="relative">
          <div className="flex mb-4 flex-col">
            <h1 className="text-xl">{text}</h1>
            <span className="text-sm">{supportText}</span>
          </div>
          <div className="">{renderElements()}</div>
        </div>
        <div>
          <AppButton className="w-full" onClick={submitAnswer}>
            Next
          </AppButton>
        </div>
      </AppCard>
    </div>
  );
};

export default BuilderSectionContent;
