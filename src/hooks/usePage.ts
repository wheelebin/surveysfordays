import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const usePage = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const router = useRouter();
  const queries = router.query;

  const utils = trpc.useContext();

  const deletePageMutation = trpc.useMutation("page.delete", {
    onSuccess(input) {
      utils.invalidateQueries([
        "page.getAllBySurveyId",
        { surveyId: input.surveyId },
      ]);
    },
  });

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

  const { data: pages } = trpc.useQuery(
    ["page.getAllBySurveyId", { surveyId: queries.surveyId as string }],
    { enabled: !!survey?.id, refetchOnWindowFocus: false }
  );

  return {
    pages,
  };
};

export default usePage;
