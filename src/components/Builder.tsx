import React, { useState } from "react";
import BuilderQuestionForm from "./BuilderQuestionForm";
import AppSelectField from "./AppSelectField";
import { ELEMENT_GROUPS } from "@/constants/elements";

type Props = {
  children?: React.ReactNode;
};

const Builder: React.FC<Props> = ({ children }) => {
  const [elementType, setElementType] = useState<string | undefined>("");

  const handleOnChange = (value: string) => {
    setElementType(value);
  };

  return (
    <div>
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

      {elementType && (
        <BuilderQuestionForm key={elementType} elementType={elementType} />
      )}
    </div>
  );
};

export default Builder;
