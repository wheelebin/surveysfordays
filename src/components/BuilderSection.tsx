import React, { useRef, useEffect } from "react";
import BuilderSectionContent from "./BuilderSectionContent";
import AppCard from "./AppCard";
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
            <AppCard key={question.id} isCurrent={isCurrent}>
              <BuilderSectionContent contentId={question.id} {...question} />
            </AppCard>
          ))
        ) : (
          <div className=" my-5 p-3 bg-slate-50">No content</div>
        )}
      </div>
    </div>
  );
};

export default BuilderSection;
