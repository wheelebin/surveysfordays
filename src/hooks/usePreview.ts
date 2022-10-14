import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSection from "./useSection";
import useBuilder from "./useBuilder";
import { useBuilderStore } from "@/stores/builder";

const usePreview = () => {
  const { sections, addSection, updateSectionOrder, deleteSection, surveyId } =
    useSection();
  const { handleOnAdd, content, isAdding, isEditing, clear } = useBuilder();
  const utils = trpc.useContext();

  const { data: questions } = trpc.useQuery(
    ["section.getAllBySurveyId", { surveyId }],
    { refetchOnWindowFocus: false, enabled: !!surveyId }
  );

  const addSectionMutation = trpc.useMutation("section.add", {
    onSuccess(input) {
      utils.invalidateQueries([
        "section.getAllBySurveyId",
        { surveyId: input.surveyId },
      ]);
    },
  });

  const addContent = async () => {
    if (!sections) {
      return;
    }

    const section = await addSectionMutation.mutateAsync({
      surveyId,
      sectionNumber: sections?.length,
    });

    if (section && questions) {
      useBuilderStore.getState().initAdding({
        surveyId,
        sectionId: section.id,
        orderNumber: questions.length,
      });
    }
  };

  return {
    sections,
    addSection,
    deleteSection,
    addContent,
    updateSectionOrder,
  };
};

export default usePreview;
