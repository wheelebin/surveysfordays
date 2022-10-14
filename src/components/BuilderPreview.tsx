import React, { useEffect, useState } from "react";
import useBuilder from "@/hooks/useBuilder";
import usePreview from "@/hooks/usePreview";
import AppButton from "./AppButton";
import { DragHandleHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";

// TODO Will create a BuilderImageForm, BuilderTextForm and etc
// and switch the builder form type out depending on the current elementType

type Props = {
  children?: React.ReactNode;
  questionId?: string;
};

const BuilderPreview: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const { handleOnAdd, content, isAdding, isEditing, clear } = useBuilder();
  const { sections, addContent, deleteSection } = usePreview();

  useEffect(() => setShow(isAdding || isEditing), [isEditing, isAdding]);

  // TODO Add content here, it'll need to add content as well as a section to belong to

  // TODO I want to remove the add content button in the builderSection component if content already exists ()

  return !show ? (
    <div className="shadow p-4">
      <AppButton className="w-full" onClick={addContent}>
        Add content
      </AppButton>
      {sections?.map((section) => {
        const questions = section.questions.map((question) => (
          <div key={question.id} className="flex flex-col">
            <span>{question.text}</span>
            <span className="text-xs">{question.type}</span>
          </div>
        ));

        return (
          <div
            className="py-2 flex items-center justify-between"
            key={section.id}
          >
            <div className="mr-2 cursor-pointer flex items-center">
              <DragHandleHorizontalIcon className="mr-4" />
              {questions}
            </div>
            <div>
              <TrashIcon
                onClick={() => deleteSection(section.id)}
                className="cursor-pointer h-4 w-4"
              />
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default BuilderPreview;
