import React from "react";
import BuilderSectionContent from "./BuilderSectionContent";
import AppButton from "./AppButton";
import useContent from "@/hooks/useContent";

type Props = {
  sectionId: string;
};

const BuilderSection = ({ sectionId }: Props) => {
  const { questions, addContent } = useContent(sectionId);

  const handleOnAdd = () => {
    addContent({
      type: "",
      text: "Some text",
      orderNumber: questions.length,
    });
  };

  return (
    <div className="border border-blue-500 my-5 p-5">
      <div>
        {questions?.map((question) => (
          <div key={question.id} className="hover:bg-slate-50 py-3 px-2">
            <BuilderSectionContent contentId={question.id} {...question} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <AppButton onClick={handleOnAdd}>Add content</AppButton>
      </div>
    </div>
  );
};

export default BuilderSection;
