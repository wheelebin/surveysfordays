import React from "react";
import { trpc } from "@/utils/trpc";
import BuilderSection from "./BuilderSection";
import AppButton from "./AppButton";
import { useBuilder } from "@/hooks/useBuilder";

type Props = {
  pageId: string;
};

const BuilderPage = ({ pageId }: Props) => {
  const { data: sections } = trpc.useQuery(
    ["section.getAllByPageId", { pageId }],
    { refetchOnWindowFocus: false }
  );
  const {} = useBuilder();

  return (
    <div className="border border-red-600">
      <div>
        {sections?.map((section) => (
          <BuilderSection key={section.id} sectionId={section.id} />
        ))}
      </div>
      <div className="flex justify-center">
        <AppButton>Add section</AppButton>
      </div>
    </div>
  );
};

export default BuilderPage;
