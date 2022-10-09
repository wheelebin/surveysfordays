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

  // TODO This takes "take" & "skip" now so add pagination
  const { data: pages } = trpc.useQuery(
    ["page.getAllBySurveyId", { surveyId: queries.surveyId as string }],
    { enabled: !!survey?.id, refetchOnWindowFocus: false }
  );

  const addPage = async () => {
    if (!survey || !pages) {
      return;
    }

    const addedPage = await addPageMutation.mutateAsync({
      surveyId: survey.id,
      pageNumber: pages.length,
    });

    setCurrentPageNumber(addedPage.pageNumber);
  };

  const deletePage = async (id: string) => {
    await deletePageMutation.mutateAsync({ id });
    setCurrentPageNumber(currentPageNumber - 1);
  };

  const prevPage = () => {
    if (currentPageNumber !== 0) {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };

  const nextPage = () => {
    if (pages && currentPageNumber !== pages.length - 1) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  return {
    pages,
    addPage,
    deletePage,
    currentPageNumber,
    prevPage,
    nextPage,
  };
};

export default usePage;
