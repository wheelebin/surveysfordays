import React, { useEffect, useState, useRef } from "react";
import useBuilder from "@/hooks/useBuilder";
import useQuestionsOverview from "@/hooks/useQuestionsOverview";
import useResizeObserver from "@/hooks/useResizeObserver";
import AppButton from "./AppButton";
import {
  DragHandleHorizontalIcon,
  TrashIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import DragAndDrop from "./DragAndDrop";
import DragAndDropItem from "./DragAndDropItem";
import AppCard from "./AppCard";
import AppDropdown from "./AppDropdown";
import AppDropdownItem from "./AppDropdownItem";
import type { Question } from "../types/question";

type Props = {
  surveyId: string;
  questions: Question[];
  scrollToQuestion: (orderNumber: number) => void;
};

const QuestionsOverview: React.FC<Props> = ({
  scrollToQuestion,
  surveyId,
  questions,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const { isAdding, isEditing } = useBuilder();
  const { addQuestion, deleteQuestion, updateQuestionOrder, handleOnEdit } =
    useQuestionsOverview(surveyId, questions);

  useEffect(() => setShow(isAdding || isEditing), [isEditing, isAdding]);

  const header = useRef<HTMLDivElement | null>(null);
  const { height } = useResizeObserver(header);

  const handleOnDragEnd = (list: any) => {
    // TODO Handle updating orderNumber here and not in hanldeOnEditSave
    const newList = list.map((item, i) => ({ ...item, orderNumber: i }));
    updateQuestionOrder(newList);
  };

  if (!questions) {
    return <></>;
  }

  return !show ? (
    <AppCard className="h-full">
      <div ref={header}>
        <h1 className="text-xl">Questions Overview</h1>
        <hr className="my-2" />
        <AppButton className="w-full" onClick={addQuestion} primary>
          Add question
        </AppButton>
      </div>
      <div className={`h-[calc(100%-${height}px)]`}>
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
                  <div className="flex items-center">
                    <AppDropdown>
                      <AppDropdownItem
                        label="Edit"
                        icon={<Pencil1Icon />}
                        onClick={() => handleOnEdit(question.id)}
                      />
                      <AppDropdownItem
                        label="Delete"
                        icon={<TrashIcon />}
                        onClick={() => deleteQuestion(question.id)}
                      />
                    </AppDropdown>
                  </div>
                </div>
              </DragAndDropItem>
            );
          })}
        </DragAndDrop>
      </div>
    </AppCard>
  ) : (
    <></>
  );
};

export default QuestionsOverview;
