import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const usePage = () => {
  const router = useRouter();
  const queries = router.query;

  const utils = trpc.useContext();

  const addPageMutation = trpc.useMutation("page.add", {
    onSuccess(input) {
      utils.invalidateQueries([
        "page.getAllBySurveyId",
        { surveyId: input.surveyId },
      ]);
    },
  });

  const { data: survey } = trpc.useQuery(
    ["survey.byId", { id: queries.surveyId as string }],
    { refetchOnWindowFocus: false }
  );

  // TODO This takes "take" & "skip" now so add pagination
  const { data: pages } = trpc.useQuery(
    ["page.getAllBySurveyId", { surveyId: queries.surveyId as string }],
    { enabled: !!survey?.id, refetchOnWindowFocus: false }
  );

  const addPage = () => {
    if (!survey || !pages) {
      return;
    }

    addPageMutation.mutate({
      surveyId: survey.id,
      pageNumber: pages.length,
    });
  };

  return {
    pages,
    addPage,
  };
};

export default usePage;
