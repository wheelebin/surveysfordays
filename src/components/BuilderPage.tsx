import React from "react";
import BuilderSection from "./BuilderSection";
import AppButton from "./AppButton";
import useSection from "@/hooks/useSection";
import BuilderHeader from "./BuilderHeader";

type Props = {
  pageId: string;
};

const BuilderPage = ({ pageId }: Props) => {
  const { sections, addSection, deleteSection } = useSection(pageId);

  return (
    <div>
      <div>
        {sections?.map((section) => (
          <div key={section.id}>
            <BuilderHeader onDelete={() => deleteSection(section.id)} />
            <BuilderSection sectionId={section.id} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <AppButton onClick={addSection}>Add section</AppButton>
      </div>
    </div>
  );
};

export default BuilderPage;
