import React from "react";
import BuilderSection from "./BuilderSection";
import AppButton from "./AppButton";
import AppSeperator from "./AppSeperator";
import useSection from "@/hooks/useSection";

type Props = {
  pageId: string;
};

const BuilderPage = ({ pageId }: Props) => {
  const { sections } = useSection(pageId);

  return (
    <div>
      <div>
        {sections?.map((section) => (
          <BuilderSection key={section.id} sectionId={section.id} />
        ))}
      </div>
      <div className="flex justify-center">
        <AppButton>Add section</AppButton>
      </div>
      <AppSeperator />
    </div>
  );
};

export default BuilderPage;
