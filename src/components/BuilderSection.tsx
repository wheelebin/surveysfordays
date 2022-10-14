import React from "react";
import BuilderSectionContent from "./BuilderSectionContent";
import AppButton from "./AppButton";
import useContent from "@/hooks/useContent";

type Props = {
  sectionId: string;
};

const BuilderSection = ({ sectionId }: Props) => {
  const { questions, addContent } = useContent(sectionId);

  return (
    <div className="p-3">
      <div>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question.id}
              className="hover:bg-slate-50 py-3 px-3 shadow-xl rounded-md"
            >
              <BuilderSectionContent contentId={question.id} {...question} />
            </div>
          ))
        ) : (
          <div className=" my-5 p-3 bg-slate-50">No content</div>
        )}
      </div>
    </div>
  );
};

export default BuilderSection;
