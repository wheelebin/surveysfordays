import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import AppButton from "./AppButton";
import { DragHandleHorizontalIcon } from "@radix-ui/react-icons";
import AppTextField from "./AppTextField";
import DragAndDrop from "./DragAndDrop";
import DragAndDropItem from "./DragAndDropItem";

import {
  editingContentId,
  contentText,
  contentSupportingText,
  contentInputElements,
} from "@/utils/atoms";
import useBuilder from "@/hooks/useBuilder";

type Props = {
  type: string;
};

const BuilderElementFormSelections: React.FC<Props> = ({ type }) => {
  const [editingContentId_] = useAtom(editingContentId);
  const [contentText_, setContentText] = useAtom(contentText);
  const [contentSupportingText_, setContentSupportingText] = useAtom(
    contentSupportingText
  );

  const [contentInputElements_, setContentInputElements] =
    useAtom(contentInputElements);

  const { handleOnEditSave, handleOnAddQuestionOption } = useBuilder();

  const handleOnAdd = async () => {
    if (!editingContentId_) {
      return;
    }
    const newInputElement = {
      type,
      text: "Change me :)",
      orderNumber: contentInputElements_.length,
      questionId: editingContentId_,
    };

    const [questionOption] = await handleOnAddQuestionOption(newInputElement);
    if (questionOption) {
      setContentInputElements([
        ...contentInputElements_,
        {
          ...questionOption,
          value: questionOption.text,
          label: questionOption.text,
        },
      ]);
    }
  };

  const handleOnChange = (index: number, label: string) => {
    const updatedElements = contentInputElements_.map((element, i) =>
      i === index ? { ...element, label } : element
    );
    setContentInputElements(updatedElements);
  };

  const handleOnDragEnd = (list: any) => {
    setContentInputElements(list);
  };

  const handleOnSave = () => {
    if (!editingContentId_) {
      return;
    }

    handleOnEditSave({
      question: { id: editingContentId_, text: contentText_ },
      questionOptions: contentInputElements_.map(({ id, label, type }, i) => ({
        id,
        type,
        questionId: editingContentId_,
        text: label,
        orderNumber: i,
      })),
    });
  };

  return (
    <div>
      <AppTextField
        label="Label"
        onChange={setContentText}
        value={contentText_}
      />
      <AppTextField
        label="Supporting text"
        onChange={setContentSupportingText}
        value={contentSupportingText_}
      />
      <AppButton className="w-full" onClick={handleOnAdd}>
        Add option
      </AppButton>
      <DragAndDrop onDragEnd={handleOnDragEnd} list={contentInputElements_}>
        {contentInputElements_.map(({ label, id }, i) => (
          <DragAndDropItem key={id} id={id} index={i}>
            <div className="flex flex-row items-center">
              <div className="mr-2 py-5">
                <DragHandleHorizontalIcon className="cursor-pointer" />
              </div>

              <AppTextField
                value={label}
                onChange={(value) => handleOnChange(i, value)}
              />
            </div>
          </DragAndDropItem>
        ))}
      </DragAndDrop>
      <AppButton className="w-full" onClick={handleOnSave}>
        Save
      </AppButton>
    </div>
  );
};

export default BuilderElementFormSelections;
