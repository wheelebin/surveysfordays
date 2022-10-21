import Builder from "@/components/Builder";
import BuilderPreview from "@/components/BuilderPreview";
import BuilderSection from "@/components/BuilderSection";
import useSection from "@/hooks/useSection";
import { useState } from "react";

// TODO Fix this BuilderPage_, underscore added due to naming duplication with BuilderPage component
const BuilderPage_ = () => {
  const [currentSectionNumber, setCurrentSectionNumber] = useState(0);
  const { sections } = useSection();

  return (
    <div className="mx-auto container">
      <div className="flex justify-center h-screen">
        <div className="w-1/3 my-2 mr-2">
          <BuilderPreview
            scrollToSection={(sectionNumber: number) =>
              setCurrentSectionNumber(sectionNumber)
            }
          />
          <Builder questionId="question-0-0" />
        </div>
        <div className="flex flex-col w-1/2 overflow-y-scroll no-scrollbar ">
          {sections?.map((section) => {
            return (
              <div className="py-2 my-12" key={section.id}>
                <div className="px-5">
                  <BuilderSection
                    isCurrent={currentSectionNumber === section.sectionNumber}
                    sectionId={section.id}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BuilderPage_;
