import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const usePage = () => {
  const router = useRouter();
  const queries = router.query;

  const { data: survey } = trpc.useQuery(
    ["survey.byId", { id: queries.surveyId as string }],
    { refetchOnWindowFocus: false }
  );

  // TODO This takes "take" & "skip" now so add pagination
  const { data: pages } = trpc.useQuery(
    ["page.getAllBySurveyId", { surveyId: queries.surveyId as string }],
    { enabled: !!survey?.id, refetchOnWindowFocus: false }
  );

  return {
    pages,
  };
};

export default usePage;
