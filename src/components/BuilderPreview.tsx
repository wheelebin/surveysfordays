import React, { useEffect, useState } from "react";
import BuilderElementFormInputs from "./BuilderElementFormInputs";
import AppSelectField from "./AppSelectField";
import { ELEMENT_GROUPS } from "@/constants/elements";
import BuilderElementFormSelections from "./BuilderElementFormSelections";
import { ELEMENTS_WITH_ADD_MULTIPLE } from "@/constants/elements";
import useBuilder from "@/hooks/useBuilder";
import { ExitIcon } from "@radix-ui/react-icons";

// TODO Will create a BuilderImageForm, BuilderTextForm and etc
// and switch the builder form type out depending on the current elementType

type Props = {
  children?: React.ReactNode;
  questionId?: string;
};

const BuilderPreview: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const { handleOnAdd, content, isAdding, isEditing, clear } = useBuilder();

  useEffect(() => setShow(isAdding || isEditing), [isEditing, isAdding]);

  return !show ? <div className="shadow p-4">s</div> : <></>;
};

export default BuilderPreview;
