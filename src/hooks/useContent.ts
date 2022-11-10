import { trpc } from "@/utils/trpc";
import { useBuilderStore } from "@/stores/builder";

const useContent = (surveyId: string) => {
  // const router = useRouter();
  // const { surveyId } = router.query;

  const { data: questions } = trpc.useQuery(
    ["question.getAllBySurveyId", { surveyId }],
    { refetchOnWindowFocus: false, enabled: !!surveyId }
  );

  const addContent = async () => {
    const newSurveyId = surveyId as string;

    if (questions) {
      useBuilderStore.getState().initAdding({
        surveyId: newSurveyId,
        orderNumber: questions.length,
      });
    }
  };

  return {
    questions: questions || [],
    addContent,
  };
};

export default useContent;
