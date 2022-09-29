import React, { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import BuilderInputElement from "./BuilderInputElement";
import AppButton from "./AppButton";
import { useAtom } from "jotai";
import {
  editingContentId,
  contentType,
  contentText,
  contentSupportingText,
  contentPlaceholder,
  contentInputElements,
} from "@/utils/atoms";

type Props = {
  contentId: string;
};

const BuilderSectionContent = ({ contentId }: Props) => {
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
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

  useEffect(() => {
    if (editingContentId_ === contentId) {
      setIsBeingEdited(true);
    } else {
      setIsBeingEdited(false);
    }
  }, [editingContentId_, contentId]);

  const { data: question } = trpc.useQuery(
    ["question.byId", { id: contentId }],
    { refetchOnWindowFocus: false }
  );
  const { data: questionOptions } = trpc.useQuery(
    ["questionOption.getAllByQuestionId", { questionId: contentId }],
    { enabled: !!question?.id, refetchOnWindowFocus: false }
  );

  const getInputElements = () => {
    let elements = contentInputElements_;
    const currentIsBeingEdited = contentId === editingContentId_;

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

  const getContentText = () => {
    if (isBeingEdited) {
      return contentText_;
    }

    return question?.text;
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
    if (question) {
      setContentText(question.text);
      setContentType(question.type);
    }

    if (questionOptions) {
      setContentInputElements(
        questionOptions.map(({ text, type, id }) => {
          return {
            label: text,
            value: text,
            type,
            id,
          };
        })
      );
    }
  };

  const renderElements = () => {
    const elements = getInputElements();
    const elemType = contentType_ || question?.type;

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
      <div className="z-10">
        <AppButton onClick={handleOnEdit}>Edit</AppButton>
      </div>
      {renderElements()}
    </div>
  );
};

export default BuilderSectionContent;
