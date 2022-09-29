import React from "react";
import { trpc } from "@/utils/trpc";
import BuilderSectionContent from "./BuilderSectionContent";
import { Pencil1Icon } from "@radix-ui/react-icons";
import AppButton from "./AppButton";

type Props = {
  sectionId: string;
};

const BuilderSection = ({ sectionId }: Props) => {
  const { data: questions } = trpc.useQuery(
    ["question.getAllBySectionId", { sectionId }],
    { refetchOnWindowFocus: false }
  );

  const handleEdit = (questionId: string) => {
    //setEditing(true);
    //handleEditing(true, questionId);
  };

  return (
    <div className="border border-blue-500 my-5 p-5">
      <div>
        {questions?.map((question) => (
          <div key={question.id} className="hover:bg-slate-50 py-3 px-2">
            <div
              className="cursor-pointer flex items-center"
              onClick={() => handleEdit(question.id)}
            >
              <span>Edit section {sectionId}</span>
              <Pencil1Icon className="ml-2 cursor-pointer" />
            </div>
            <BuilderSectionContent contentId={question.id} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <AppButton>Add content</AppButton>
      </div>
    </div>
  );
};

export default BuilderSection;
