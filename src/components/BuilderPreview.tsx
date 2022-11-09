import React, { useEffect, useState } from "react";
import useBuilder from "@/hooks/useBuilder";
import usePreview from "@/hooks/usePreview";
import AppButton from "./AppButton";
import {
  DragHandleHorizontalIcon,
  TrashIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import DragAndDrop from "./DragAndDrop";
import DragAndDropItem from "./DragAndDropItem";
import AppCard from "./AppCard";

// TODO Will create a BuilderImageForm, BuilderTextForm and etc
// and switch the builder form type out depending on the current elementType

type Props = {
  children?: React.ReactNode;
  questionId?: string;
  scrollToSection: (sectionNumber: number) => void;
};

const BuilderPreview: React.FC<Props> = ({ children, scrollToSection }) => {
  const [show, setShow] = useState<boolean>(false);
  const { handleOnAdd, content, isAdding, isEditing, clear } = useBuilder();
  const {
    sections,
    addContent,
    deleteSection,
    updateSectionOrder,
    handleOnEdit,
  } = usePreview();

  useEffect(() => setShow(isAdding || isEditing), [isEditing, isAdding]);

  // TODO Add content here, it'll need to add content as well as a section to belong to

  // TODO I want to remove the add content button in the builderSection component if content already exists ()

  const handleOnDragEnd = (list: any) => {
    // TODO Handle updating orderNumber here and not in hanldeOnEditSave
    const newList = list.map((item, i) => ({ ...item, sectionNumber: i }));
    updateSectionOrder(newList);
  };

  if (!sections) {
    return <></>;
  }

  return !show ? (
    <AppCard>
      <>
        <h1 className="text-xl">Overview</h1>
        <hr className="my-2" />
        <AppButton className="w-full" onClick={addContent}>
          Add content
        </AppButton>
        <DragAndDrop onDragEnd={handleOnDragEnd} list={sections}>
          {sections?.map((section, i) => {
            const questions = section.questions.map((question) => (
              <div key={question.id} className="flex flex-col">
                <span>
                  <span>{section.sectionNumber + 1}. </span>
                  {question.text}
                </span>
                {/* <span className="text-xs">{question.type}</span> */}
              </div>
            ));

            return (
              <DragAndDropItem key={section.id} id={section.id} index={i}>
                <div
                  className="py-5 flex items-center justify-between"
                  key={section.id}
                >
                  <div className="mr-2 cursor-pointer flex items-center">
                    <DragHandleHorizontalIcon className="mr-4" />
                    <div onClick={() => scrollToSection(section.sectionNumber)}>
                      {questions}
                    </div>
                  </div>
                  <div>
                    <TrashIcon
                      onClick={() => deleteSection(section.id)}
                      className="cursor-pointer h-4 w-4"
                    />
                    <Pencil1Icon onClick={() => handleOnEdit(section.id)} />
                  </div>
                </div>
              </DragAndDropItem>
            );
          })}
        </DragAndDrop>
      </>
    </AppCard>
  ) : (
    <></>
  );
};

export default BuilderPreview;
