import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useBuilderStore } from "@/stores/builder";

const useContent = (sectionId: string) => {
  const router = useRouter();
  const { surveyId } = router.query;

  const { initAdding } = useBuilderStore();

  const { data: questions } = trpc.useQuery(
    ["question.getAllBySectionId", { sectionId }],
    { refetchOnWindowFocus: false, enabled: !!sectionId }
  );

  const addContent = async () => {
    const newSurveyId = surveyId as string;

    if (questions) {
      initAdding({
        surveyId: newSurveyId,
        sectionId,
        orderNumber: questions.length,
      });
    }
  };

  return {
    questions,
    addContent,
  };
};

export default useContent;
