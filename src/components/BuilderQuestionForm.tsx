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
import getDummyId from "@/utils/id";

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

  const addInputElement = (text?: string) =>
    setInputElements([
      ...inputElements,
      {
        type: elementType,
        label: text ? text : "",
        id: getDummyId(),
      },
    ]);

  const handleOnChange = (index: number, value: string) => {
    const updatedElements = inputElements.map((element, i) =>
      i === index ? { ...element, label: value } : element
    );

    setInputElements(updatedElements);
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
          id: getDummyId(),
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
