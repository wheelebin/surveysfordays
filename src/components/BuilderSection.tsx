import React, { useRef, useEffect } from "react";
import BuilderSectionContent from "./BuilderSectionContent";
import AppButton from "./AppButton";
import useContent from "@/hooks/useContent";

type Props = {
  sectionId: string;
  isCurrent: boolean;
};

const BuilderSection = ({ sectionId, isCurrent }: Props) => {
  const myRef = useRef<HTMLDivElement | null>(null);
  const { questions, addContent } = useContent(sectionId);

  useEffect(() => {
    if (myRef && myRef.current && isCurrent) {
      myRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [isCurrent]);

  return (
    <div className={`p-3 `} ref={myRef}>
      <div>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question.id}
              className={`py-5 px-3 shadow rounded-md bg-white ${
                isCurrent && "py-20"
              }`}
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
