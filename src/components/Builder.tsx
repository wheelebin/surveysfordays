import React, { useEffect, useState } from "react";
import BuilderElementFormInputs from "./BuilderElementFormInputs";
import AppSelectField from "./AppSelectField";
import AppButton from "./AppButton";
import { ELEMENT_GROUPS } from "@/constants/elements";
import BuilderElementFormSelections from "./BuilderElementFormSelections";
import { ELEMENTS_WITH_ADD_MULTIPLE } from "@/constants/elements";
import { useAtom } from "jotai";
import { editingContentId, contentType } from "@/utils/atoms";
import useBuilder from "@/hooks/useBuilder";

// TODO Will create a BuilderImageForm, BuilderTextForm and etc
// and switch the builder form type out depending on the current elementType

type Props = {
  children?: React.ReactNode;
  questionId?: string;
};

const Builder: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const [editingContentId_] = useAtom(editingContentId);
  const [contentType_, setContentType] = useAtom(contentType);
  const { handleOnAddQuestionOption } = useBuilder();

  useEffect(
    () => setShow(editingContentId_ ? true : false),
    [editingContentId_]
  );

  const handleOnChange = (type: string) => {
    setContentType(type);
    if (!ELEMENTS_WITH_ADD_MULTIPLE.includes(type) && editingContentId_) {
      handleOnAddQuestionOption({
        questionId: editingContentId_,
        type,
        label: "Some label",
        placeholder: "Some placeholder",
        supportText: "Some supportText",
        orderNumber: 0,
      });
    }
  };

  const getFormElement = () => {
    if (!contentType_) {
      return <>No elem type</>;
    }

    if (ELEMENTS_WITH_ADD_MULTIPLE.includes(contentType_)) {
      return (
        <BuilderElementFormSelections
          key={contentType_}
          type={contentType_}
          questionId={editingContentId_}
        />
      );
    }
    return (
      <BuilderElementFormInputs
        key={contentType_}
        elementType={contentType_}
        questionId={editingContentId_}
      />
    );
  };

  const getElementSelector = () => {
    if (editingContentId_ && !contentType_) {
      return (
        <div>
          <h1 className="text-xl">Choose content type</h1>

          <div className="my-4">
            <AppSelectField
              onChange={handleOnChange}
              placeholder="Select an element"
              selectGroups={ELEMENT_GROUPS}
            />
          </div>
        </div>
      );
    }
    return <></>;
  };

  return show ? (
    <div>
      {getElementSelector()}
      {getFormElement()}
    </div>
  ) : (
    <></>
  );
};

export default Builder;
