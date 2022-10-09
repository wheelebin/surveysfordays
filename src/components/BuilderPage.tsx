import React from "react";
import BuilderSection from "./BuilderSection";
import AppButton from "./AppButton";
import useSection from "@/hooks/useSection";
import { TrashIcon } from "@radix-ui/react-icons";

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
            <div className="flex flex-row-reverse">
              <TrashIcon
                className="cursor-pointer"
                onClick={() => deleteSection(section.id)}
              />
            </div>
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
