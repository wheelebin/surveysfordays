import React, { useEffect, useState, useCallback } from "react";
import { trpc } from "@/utils/trpc";
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
  elementType?: string;
  questionId?: string;
};

type inputElement = {
  type: string;
  label?: string;
  placeholder?: string;
  id: string;
};

const BuilderQuestionForm: React.FC<Props> = ({ elementType, questionId }) => {
  const [elemType, setElemType] = useState<string | undefined>(undefined);
  const [inputElements, setInputElements] = useState<inputElement[]>([]);
  const [canAdd, setCanAdd] = useState<boolean>(false);
  const [hasPlaceholder, setHasPlaceholder] = useState<boolean>(false);
  const [questionText, setQuestionText] = useState<string>("");
  const [supportingText, setSupportingText] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");

  const utils = trpc.useContext();
  const editQuestionOptions = trpc.useMutation(["questionOption.edit"]);

  const { data: question } = trpc.useQuery(
    ["question.byId", { id: questionId as string }],
    { enabled: !!questionId }
  );
  const { data: questionOptions } = trpc.useQuery(
    [
      "questionOption.getAllByQuestionId",
      { questionId: question?.id as string },
    ],
    { enabled: !!question?.id }
  );

  const addInputElement = (text?: string) => {
    if (elemType) {
      // TODO Fix this mess
      setInputElements([
        ...inputElements,
        {
          type: elemType,
          label: text ? text : "",
          id: getDummyId(),
        },
      ]);
    }
  };

  const handleOnChange = (index: number, value: string) => {
    const updatedElements = inputElements.map((element, i) =>
      i === index ? { ...element, label: value } : element
    );

    setInputElements(updatedElements);
  };

  useEffect(() => {
    let elementTypeInternal = elementType;

    if (question && questionOptions) {
      setQuestionText(question.text);

      setInputElements(
        questionOptions.map(({ text, type, id }, i) => {
          if (i === 0) {
            elementTypeInternal = type;
          }
          return { id, type, label: text };
        })
      );
    }

    setElemType(elementTypeInternal);

    if (!elementTypeInternal) {
      // TODO Fix this mess
      return;
    }

    const canAdd = ELEMENTS_WITH_ADD_MULTIPLE.find(
      (value) => elementTypeInternal === value
    );
    const hasPlaceholder = ELEMENTS_WITH_PLACEHOLDER.find(
      (value) => elementTypeInternal === value
    );

    if (canAdd) {
      setCanAdd(true);

      if (question && questionOptions) {
        setInputElements(
          questionOptions.map(({ text, type, id }) => ({
            id,
            type,
            label: text,
          }))
        );
      }
    } else {
      setInputElements([
        {
          type: elementTypeInternal,
          id: getDummyId(),
        },
      ]);
    }

    if (hasPlaceholder) {
      setHasPlaceholder(true);
    }
  }, [elementType, question, questionOptions]);

  const handleOnSave = () => {
    if (questionId) {
      const data = inputElements.map(({ id, label }) => ({
        id,
        text: label,
      }));

      editQuestionOptions.mutate(data, {
        onSuccess(input) {
          utils.invalidateQueries(["questionOption.getAllByQuestionId"]);
        },
      });
    } /* else {
      const mutation = trpc.useMutation(["questionOption.add"]);
      const data = inputElements.map(({ label, type }) => ({
        type,
        text: label,
      }));

      mutation.mutate(data);
    } */
  };

  return (
    <div>
      <div>
        <AppTextField label="Question label" onChange={setQuestionText} />
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
            {inputElements.map(({ id, label }, i) => (
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
      )}
      <Separator.Root className="bg-slate-200 h-px my-4" />
      <BuilderQuestionFormPreview
        label={questionText}
        supportingText={supportingText}
        inputElements={inputElements.map(({ label, type }) => ({
          label,
          value: label,
          type,
          placeholder: placeholder,
        }))}
      />
      <div className="mt-10">
        <AppButton onClick={handleOnSave} className="w-full">
          Save
        </AppButton>
      </div>
    </div>
  );
};

export default BuilderQuestionForm;
