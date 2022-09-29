import React, { useState } from "react";
import AppButton from "./AppButton";
import * as Separator from "@radix-ui/react-separator";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Prisma } from "@prisma/client";

import AppRadioGroup from "./AppRadioGroup";

type Props = {
  children?: React.ReactNode;
};

const BuilderQuestionForm: React.FC<Props> = ({ children }) => {
  const [questionOptions, setQuestionsOptions] = useState<
    Omit<Prisma.QuestionOptionCreateInput, "questionId">[]
  >([]);

  const [radioPreDefinedText, setRadioPreDefinedText] = useState<string>("");

  const addQuestionOption = (type: string, text?: string) => {
    console.log(text);
    setQuestionsOptions([
      ...questionOptions,
      {
        type,
        text: text ? text : "",
        orderNumber: questionOptions.length + 1,
      },
    ]);
  };

  return (
    <div>
      <div>
        <h1>Question</h1>
        <input className="w-full" type="text" />
      </div>
      <div>
        <h1>Add question options</h1>
        {/* QUESTION OPTION TEST 1*/}
        <div className="flex flex-row items-center">
          <div className="mr-2">
            <AppButton onClick={() => addQuestionOption("RADIOTEXT")}>
              Add
            </AppButton>
          </div>
          <input className="mr-2" type="radio" />
          <span>Radio for user input with </span>
          <select>
            <option value="text">Text field</option>
          </select>
        </div>
        1
        <AppRadioGroup />
        {/* QUESTION OPTION TEST 2 */}
        <div className="flex flex-row items-center">
          <div className="mr-2">
            <AppButton
              onClick={() => addQuestionOption("RADIO", radioPreDefinedText)}
            >
              Add
            </AppButton>
          </div>
          <input className="mr-2" type="radio" />
          <input
            onChange={(e) => setRadioPreDefinedText(e.target.value)}
            type="text"
            placeholder="Write option here"
          />
        </div>
      </div>
      <Separator.Root className="bg-slate-200 h-px my-4" />
      <div>
        {questionOptions.map((questionOption, i) => (
          <div key={i}>
            <input className="mr-2" type="radio" />
            {questionOption.type !== "RADIOTEXT" ? (
              <span>{questionOption.text}</span>
            ) : (
              <input type="text" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-10">
        <AppButton className="w-full">Save</AppButton>
      </div>
    </div>
  );
};

export default BuilderQuestionForm;
