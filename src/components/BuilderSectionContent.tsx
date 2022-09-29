import React, { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import AppRadioGroup from "./AppRadioGroup";
import AppCheckbox from "./AppCheckbox";
import AppTextField from "./AppTextField";

type Props = {
  contentId: string;
};

const BuilderSectionContent = ({ contentId }: Props) => {
  const [type, setType] = useState<string | undefined>(undefined);

  const { data: question } = trpc.useQuery([
    "question.byId",
    { id: contentId },
  ]);
  const { data: questionOptions } = trpc.useQuery(
    ["questionOption.getAllByQuestionId", { questionId: contentId }],
    { enabled: !!question?.id }
  );

  useEffect(() => {
    if (questionOptions) {
      setType(questionOptions[0]?.type);
    }
  }, [questionOptions]);

  const renderElements = () => {
    if (!questionOptions) {
      return <p>Something went wrong</p>;
    }

    const formattedElements = questionOptions.map(({ text, type, id }) => ({
      label: text,
      value: text,
      type,
      placeholder: undefined,
      id,
    }));

    if (type === "RADIO") {
      return (
        <div className="my-2">
          <AppRadioGroup radioItems={formattedElements} />
        </div>
      );
    }

    return (
      <>
        {formattedElements.map(({ value, label, id }) => {
          if (type === "CHECKBOX") {
            return (
              <div className="my-2" key={id}>
                <AppCheckbox value={value} label={label} />
              </div>
            );
          }
          if (type === "TEXT") {
            return (
              <div className="my-2" key={id}>
                <AppTextField value={value} />
              </div>
            );
          }
        })}
      </>
    );
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <h1 className="text-xl">{question?.text}</h1>
      </div>
      {renderElements()}
    </div>
  );
};

export default BuilderSectionContent;
