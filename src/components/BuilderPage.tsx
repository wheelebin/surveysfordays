import React from "react";
import BuilderSection from "./BuilderSection";
import AppButton from "./AppButton";
import useSection from "@/hooks/useSection";

type Props = {
  pageId: string;
};

const BuilderPage = ({ pageId }: Props) => {
  const { sections, addSection } = useSection(pageId);

  return (
    <div>
      <div>
        {sections?.map((section) => (
          <BuilderSection key={section.id} sectionId={section.id} />
        ))}
      </div>
      <div className="flex justify-center">
        <AppButton onClick={addSection}>Add section</AppButton>
      </div>
    </div>
  );
};

export default BuilderPage;
