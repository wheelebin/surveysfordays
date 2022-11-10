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
  scrollToQuestion: (orderNumber: number) => void;
};

const BuilderPreview: React.FC<Props> = ({ children, scrollToQuestion }) => {
  const [show, setShow] = useState<boolean>(false);
  const { isAdding, isEditing } = useBuilder();
  const {
    questions,
    addQuestion,
    deleteQuestion,
    updateQuestionOrder,
    handleOnEdit,
  } = usePreview();

  useEffect(() => setShow(isAdding || isEditing), [isEditing, isAdding]);

  // TODO Add content here, it'll need to add content as well as a section to belong to

  // TODO I want to remove the add content button in the builderSection component if content already exists ()

  const handleOnDragEnd = (list: any) => {
    // TODO Handle updating orderNumber here and not in hanldeOnEditSave
    const newList = list.map((item, i) => ({ ...item, orderNumber: i }));
    updateQuestionOrder(newList);
  };

  if (!questions) {
    return <></>;
  }

  return !show ? (
    <AppCard>
      <>
        <h1 className="text-xl">Overview</h1>
        <hr className="my-2" />
        <AppButton className="w-full" onClick={addQuestion}>
          Add content
        </AppButton>
        <DragAndDrop onDragEnd={handleOnDragEnd} list={questions}>
          {questions?.map((question, i) => {
            return (
              <DragAndDropItem key={question.id} id={question.id} index={i}>
                <div
                  className="py-5 flex items-center justify-between"
                  key={question.id}
                >
                  <div className="mr-2 cursor-pointer flex items-center">
                    <DragHandleHorizontalIcon className="mr-4" />
                    <div onClick={() => scrollToQuestion(question.orderNumber)}>
                      <div key={question.id} className="flex flex-col">
                        <span>{question.text}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <TrashIcon
                      onClick={() => deleteQuestion(question.id)}
                      className="cursor-pointer h-4 w-4"
                    />
                    <Pencil1Icon onClick={() => handleOnEdit(question.id)} />
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
