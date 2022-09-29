import React, { useEffect, useState, useCallback } from "react";
import { trpc } from "@/utils/trpc";
import AppButton from "./AppButton";
import * as Separator from "@radix-ui/react-separator";
import { DragHandleHorizontalIcon } from "@radix-ui/react-icons";
import BuilderInputElement from "./BuilderInputElement";
import AppTextField from "./AppTextField";
import DragAndDrop from "./DragAndDrop";
import DragAndDropItem from "./DragAndDropItem";

import getDummyId from "@/utils/id";
import { useBuilder } from "@/hooks/useBuilder";

type inputElement = {
  id: string;
  type: string;
  label: string;
  value: string;
};

type Props = {
  type: string;
  questionId?: string;
  options?: { id: string; type: string; label: string; value: string }[];
  onChange?: (elements: inputElement[]) => void;
};

const BuilderElementFormSelections: React.FC<Props> = ({
  type,
  questionId,
  options,
  onChange,
}) => {
  const {
    questionText,
    setQuestionText,
    supportingText,
    setSupportingText,
    inputElements,
    addInputElement,
    modifyInputElement,
    setInputElements,
  } = useBuilder();

  const handleAddInputElement = (label: string) => {
    addInputElement({
      id: getDummyId(),
      label,
      type,
      value: label,
    });
  };

  const handleOnChange = (index: number, label: string) => {
    modifyInputElement(index, "label", label);
  };

  const handleOnAdd = () => {
    handleAddInputElement("Change me :)");
    //onChange()
  };

  const handleOnDragEnd = (list: any) => {
    setInputElements(list);
    if (onChange) {
      onChange(list);
    }
  };

  useEffect(() => {
    // This will be handled elsewhere, in the parent component
    if (options) {
      setInputElements(options);
    }
  }, [options]);

  return (
    <div>
      <AppTextField
        label="Label"
        onChange={setQuestionText}
        value={questionText}
      />
      <AppTextField
        label="Supporting text"
        onChange={setSupportingText}
        value={supportingText}
      />
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

              <AppTextField
                value={label}
                onChange={(value) => handleOnChange(i, value)}
              />
            </div>
          </DragAndDropItem>
        ))}
      </DragAndDrop>
    </div>
  );
};

export default BuilderElementFormSelections;
