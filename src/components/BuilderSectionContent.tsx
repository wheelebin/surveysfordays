import React, { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import BuilderInputElement from "./BuilderInputElement";
import { useAtom } from "jotai";
import {
  editingContentId,
  contentType,
  contentText,
  contentSupportingText,
  contentPlaceholder,
  contentInputElements,
} from "@/utils/atoms";
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

const BuilderSectionContent = ({
  contentId,
  type,
  surveyId,
  sectionId,
  text,
  orderNumber,
}: Props) => {
  const { inputElements, isBeingEdited } = useElement(contentId);
  const [editingContentId_, setEditingContentId] = useAtom(editingContentId);
  const [contentType_, setContentType] = useAtom(contentType);
  const [contentText_, setContentText] = useAtom(contentText);
  const [contentSupportingText_, setContentSupportingText] = useAtom(
    contentSupportingText
  );
  const [contentPlaceholder_, setContentPlaceholder] =
    useAtom(contentPlaceholder);
  const [contentInputElements_, setContentInputElements] =
    useAtom(contentInputElements);

  const getContentText = () => {
    if (isBeingEdited) {
      return contentText_;
    }

    return text;
  };

  const getSupportText = () => {
    // TODO Add support text to question table and render that in here if not editing
    if (isBeingEdited) {
      return contentSupportingText_;
    }

    return "";
  };

  const handleOnEdit = () => {
    setEditingContentId(contentId);
    setContentText(text);
    setContentType(type);

    if (inputElements) {
      setContentInputElements(
        inputElements.map(({ label, type, value, id }) => {
          return {
            label,
            value,
            type,
            id,
          };
        })
      );
    }
  };

  const renderElements = () => {
    const elements = inputElements;
    const elemType = type || contentType_;

    if (!elemType) {
      return <p>Something went wrong</p>;
    }

    const builderInputElementProps = {
      value: elements.length === 1 ? elements[0]?.value : undefined,
      options: elements,
      support: getSupportText(),
      label: getContentText(),
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
