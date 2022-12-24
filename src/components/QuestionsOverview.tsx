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
import AppTextField from "./AppTextField";
import AppDropdownItem from "./AppDropdownItem";
import AppDialog from "@/components/AppDialog";
import type { Question } from "../types/question";
import useDialog from "@/hooks/useDialog";
import questionApi from "@/api/question";
import { useToastStore } from "@/stores/toast";

const GenerateQuestionsDialog = ({ surveyId }: { surveyId: string }) => {
  const [numberOfQuestions, setNumberOfQuestions] =
    useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [tags, setTags] = useState<string | undefined>();

  const { open, handleOnOpenChange, closeDialog } = useDialog();

  const generateMutation = questionApi.useGenerateQuestions();
  const handleOnGenerate = async () => {
    if (!numberOfQuestions || !description || !tags) {
      return;
    }

    await generateMutation.mutateAsync({
      numberOfQuestions: Number(numberOfQuestions),
      tags: tags.split(","),
      description,
      surveyId,
    });
  };

  const handleOnCreate = async () => {
    await handleOnGenerate();
    useToastStore.getState().open({
      title: `Questions have been created`,
      description: "Have a look and see what you think!",
    });
    closeDialog();
  };

  return (
    <AppDialog
      open={open}
      onOpen={handleOnOpenChange}
      trigger={<AppButton primary>Create questions</AppButton>}
    >
      <div className="p-5 w-96">
        <AppTextField
          className="mt-5"
          label="Number of questions"
          onChange={setNumberOfQuestions}
        />
        <AppTextField
          className="mt-5"
          label="Description"
          supportText="Describe the type business you have"
          onChange={setDescription}
        />
        <AppTextField
          className="mt-5"
          label="Enter tags"
          supportText="Tags represent the insights you want to gather (Comma seperated)"
          onChange={setTags}
        />
        <AppButton
          className="mt-10 w-full"
          primary
          onClick={handleOnCreate}
          disabled={generateMutation.isLoading}
        >
          {!generateMutation.isLoading ? (
            "Generate"
          ) : (
            <svg
              aria-hidden="true"
              className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-green-200 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
        </AppButton>
      </div>
    </AppDialog>
  );
};

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
        {!!questions.length ? (
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
                      <div
                        onClick={() => scrollToQuestion(question.orderNumber)}
                      >
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
        ) : (
          <div className="my-20 text-center">
            <p className="font-bold">You have no questions</p>
            <p className="text-gray-600">
              You can use AI to generate questions if you need inspiration
            </p>
            <GenerateQuestionsDialog surveyId={surveyId} />
          </div>
        )}
      </div>
    </AppCard>
  ) : (
    <></>
  );
};

export default QuestionsOverview;
