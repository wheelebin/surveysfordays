import React, { useEffect, useState, useCallback } from "react";
import AppButton from "./AppButton";
import * as Separator from "@radix-ui/react-separator";
import { DragHandleHorizontalIcon } from "@radix-ui/react-icons";
import BuilderQuestionFormPreview from "./BuilderQuestionFormPreview";
import AppTextField from "./AppTextField";
import DragAndDrop from "./DragAndDrop";
import DragAndDropItem from "./DragAndDropItem";
import {
  ELEMENTS_WITH_ADD_MULTIPLE,
  ELEMENTS_WITH_PLACEHOLDER,
} from "@/constants/elements";

type Props = {
  children?: React.ReactNode;
  elementType: string;
};

type inputElement = {
  type: string;
  label?: string;
  placeholder?: string;
  id: string;
};

const BuilderQuestionForm: React.FC<Props> = ({ children, elementType }) => {
  const [inputElements, setInputElements] = useState<inputElement[]>([]);
  const [canAdd, setCanAdd] = useState<boolean>(false);
  const [hasPlaceholder, setHasPlaceholder] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [supportingText, setSupportingText] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");

  const addInputElement = useCallback(
    (text?: string) =>
      setInputElements([
        ...inputElements,
        {
          type: elementType,
          label: text ? text : "",
          id: Date.now().toString(),
        },
      ]),
    [elementType, inputElements]
  );

  const handleOnChange = (index: number, value: string) => {
    // TODO This is a mess and needs to be refactored
    const newOptions = inputElements.map((option, optionIndex) => {
      if (optionIndex === index) {
        return { ...option, label: value };
      }
      return option;
    });

    setInputElements(newOptions);
  };

  useEffect(() => {
    const canAdd = ELEMENTS_WITH_ADD_MULTIPLE.find(
      (value) => elementType === value
    );
    const hasPlaceholder = ELEMENTS_WITH_PLACEHOLDER.find(
      (value) => elementType === value
    );

    if (canAdd) {
      setCanAdd(true);
    } else {
      setInputElements([
        {
          type: elementType,
          id: Date.now().toString(),
        },
      ]);
    }

    if (hasPlaceholder) {
      setHasPlaceholder(true);
    }
  }, [elementType]);

  return (
    <div>
      <div>
        <AppTextField label="Question label" onChange={setQuestion} />
        <AppTextField label="Supporting text" onChange={setSupportingText} />
        {hasPlaceholder && (
          <AppTextField label="Placeholder" onChange={setPlaceholder} />
        )}
      </div>
      {canAdd && (
        <div>
          <Separator.Root className="bg-slate-200 h-px my-4" />
          <AppButton className="w-full" onClick={() => addInputElement()}>
            Add option
          </AppButton>
          <DragAndDrop
            onDragEnd={(list) => setInputElements(list)}
            list={inputElements}
          >
            {inputElements.map(({ id }, i) => (
              <DragAndDropItem key={id} id={id} index={i}>
                <div className="flex flex-row items-center">
                  <div className="mr-2 py-5">
                    <DragHandleHorizontalIcon className="cursor-pointer" />
                  </div>

                  <AppTextField
                    onChange={(value) => handleOnChange(i, value)}
                  />
                </div>
              </DragAndDropItem>
            ))}
          </DragAndDrop>
        </div>
      )}
      <Separator.Root className="bg-slate-200 h-px my-4" />
      <BuilderQuestionFormPreview
        label={question}
        supportingText={supportingText}
        inputElements={inputElements.map(({ label, type }) => ({
          label,
          value: label,
          type,
          placeholder: placeholder,
        }))}
      />
      <div className="mt-10">
        <AppButton className="w-full">Save</AppButton>
      </div>
    </div>
  );
};

export default BuilderQuestionForm;
