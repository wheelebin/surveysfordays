import { trpc } from "@/utils/trpc";
import { Section } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useSection = () => {
  const [surveyId, setSurveyId] = useState<string>("");
  const router = useRouter();
  const queries = router.query;
  const utils = trpc.useContext();

  useEffect(() => setSurveyId(queries.surveyId as string), [queries.surveyId]);

  const deleteSectionMutation = trpc.useMutation("section.delete", {
    onSuccess(input) {
      utils.invalidateQueries([
        "section.getAllBySurveyId",
        { surveyId: input.surveyId },
      ]);
    },
  });

  const addSectionMutation = trpc.useMutation("section.add", {
    onSuccess(input) {
      utils.invalidateQueries([
        "section.getAllBySurveyId",
        { surveyId: input.surveyId },
      ]);
    },
  });

  const editSectionMutation = trpc.useMutation("section.edit", {
    onSuccess(input) {
      utils.invalidateQueries(["section.getAllBySurveyId", { surveyId }]);
    },
  });

  const { data: sections } = trpc.useQuery(
    ["section.getAllBySurveyId", { surveyId }],
    { refetchOnWindowFocus: false }
  );

  const addSection = async () => {
    if (!sections) {
      return;
    }

    return await addSectionMutation.mutateAsync({
      surveyId,
      sectionNumber: sections.length,
    });
  };

  const updateSectionOrder = async (updatedSections: Section[]) => {
    return await editSectionMutation.mutateAsync(updatedSections);
  };

  const deleteSection = (id: string) => {
    deleteSectionMutation.mutate({ id });
  };

  return {
    sections,
    addSection,
    deleteSection,
    updateSectionOrder,
    surveyId,
  };
};

export default useSection;
