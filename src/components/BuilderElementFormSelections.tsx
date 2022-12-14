import React, { useEffect, useState } from "react";
import AppButton from "./AppButton";
import { DragHandleHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import AppTextField from "./AppTextField";
import DragAndDrop from "./DragAndDrop";
import DragAndDropItem from "./DragAndDropItem";
import useBuilder from "@/hooks/useBuilder";

type Props = {
  type: string;
};

const BuilderElementFormSelections: React.FC<Props> = ({ type }) => {
  const {
    handleOnEditSave,
    handleOnAddQuestionOption,
    handleOnDeleteOption,
    content,
    inputElements,
    setContent,
    setInputElements,
  } = useBuilder();

  const handleOnAdd = async () => {
    if (!content?.id) {
      return;
    }
    const newInputElement = {
      type,
      label: "Change me :)",
      orderNumber: inputElements.length,
      questionId: content.id,
    };

    const [questionOption] = await handleOnAddQuestionOption(newInputElement);
    if (questionOption) {
      setInputElements([...inputElements, questionOption]);
    }
  };

  const handleOnChange = (index: number, label: string) => {
    const updatedElements = inputElements.map((element, i) =>
      i === index ? { ...element, label } : element
    );
    setInputElements(updatedElements);
  };

  const handleOnDragEnd = (list: any) => {
    // TODO Handle updating orderNumber here and not in hanldeOnEditSave
    const newList = list.map((item, i) => ({ ...item, orderNumber: i }));
    setInputElements(newList);
  };

  return (
    <div>
      <h1 className="text-xl">Input</h1>
      <AppButton className="w-full" onClick={handleOnAdd}>
        Add option
      </AppButton>
      <DragAndDrop onDragEnd={handleOnDragEnd} list={inputElements}>
        {inputElements.map(({ label, id }, i) => (
          <DragAndDropItem key={id} id={id} index={i}>
            <div className="flex flex-row items-center">
              <div className="mr-2 py-5">
                <DragHandleHorizontalIcon className="cursor-pointer" />
              </div>

              <div className="grow px-2">
                <AppTextField
                  value={label}
                  onChange={(value) => handleOnChange(i, value)}
                />
              </div>
              <div className="ml-2 py-5">
                <TrashIcon
                  onClick={() => handleOnDeleteOption(id)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </DragAndDropItem>
        ))}
      </DragAndDrop>
      <AppButton className="w-full" primary onClick={handleOnEditSave}>
        Save
      </AppButton>
    </div>
  );
};

export default BuilderElementFormSelections;
