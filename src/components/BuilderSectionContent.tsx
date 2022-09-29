import React, { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { useBuilder } from "@/hooks/useBuilder";
import BuilderInputElement from "./BuilderInputElement";

type Props = {
  contentId: string;
};

const BuilderSectionContent = ({ contentId }: Props) => {
  const { elementType, editing, questionText, inputElements, questionId } =
    useBuilder();

  const { data: question } = trpc.useQuery(
    ["question.byId", { id: contentId }],
    { refetchOnWindowFocus: false }
  );
  const { data: questionOptions } = trpc.useQuery(
    ["questionOption.getAllByQuestionId", { questionId: contentId }],
    { enabled: !!question?.id, refetchOnWindowFocus: false }
  );

  const getInputElements = () => {
    let elements = inputElements;
    const currentIsBeingEdited = editing && questionId === contentId;

    if (!currentIsBeingEdited && questionOptions) {
      elements = questionOptions.map(({ text, type, id }) => {
        return {
          label: text,
          value: text,
          type,
          id,
        };
      });
    }

    return elements;
  };

  const renderElements = () => {
    const elements = getInputElements();
    const elemType = elementType || question?.type;

    if (!elemType) {
      return <p>Something went wrong</p>;
    }

    const builderInputElementProps = {
      value: elements.length === 1 ? elements[0]?.value : undefined,
      options: elements,
      label: editing ? questionText : question?.text,
    };

    return (
      <BuilderInputElement type={elemType} {...builderInputElementProps} />
    );
  };

  return <div>{renderElements()}</div>;
};

export default BuilderSectionContent;
