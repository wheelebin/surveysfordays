import React, { useEffect, useState } from "react";
import BuilderElementFormInputs from "./BuilderElementFormInputs";
import AppSelectField from "./AppSelectField";
import { ELEMENT_GROUPS } from "@/constants/elements";
import BuilderElementFormSelections from "./BuilderElementFormSelections";
import { ELEMENTS_WITH_ADD_MULTIPLE } from "@/constants/elements";
import useBuilder from "@/hooks/useBuilder";

// TODO Will create a BuilderImageForm, BuilderTextForm and etc
// and switch the builder form type out depending on the current elementType

type Props = {
  children?: React.ReactNode;
  questionId?: string;
};

const Builder: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const { handleOnAdd, content, isAdding, isEditing } = useBuilder();

  useEffect(() => setShow(isAdding || isEditing), [isEditing, isAdding]);

  const handleOnChange = (type: string) => {
    handleOnAdd(type);
  };

  const getFormElement = () => {
    if (!content?.type) {
      return <>No elem type</>;
    }

    if (ELEMENTS_WITH_ADD_MULTIPLE.includes(content?.type)) {
      return (
        <BuilderElementFormSelections
          key={content?.type}
          type={content?.type}
        />
      );
    }
    return <BuilderElementFormInputs key={content?.type} />;
  };

  const getElementSelector = () => {
    if (isAdding) {
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
    <div className="shadow p-4">
      {getElementSelector()}
      {getFormElement()}
    </div>
  ) : (
    <></>
  );
};

export default Builder;
