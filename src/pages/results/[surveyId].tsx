import MainNavBar from "@/components/MainNavBar";

import AppTable from "@/components/AppTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSurveyStore } from "@/stores/survey";
import { trpc } from "@/utils/trpc";

const SubmissionPage = () => {
  const [surveyId, setSurveyId] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { surveyId: surveyIdParam } = router.query;

  const { data } = trpc.submission.getAllBySurveyId.useQuery({
    surveyId: surveyId as string,
  });

  useEffect(() => {
    if (typeof surveyIdParam === "string") {
      setSurveyId(surveyIdParam);
      useSurveyStore.getState().setCurrentSurveyId(surveyIdParam);
    }
  }, [surveyIdParam]);

  if (!data) {
    return <>s</>;
  }

  // Add type or versionStatus or isPublished to the components-
  // in order to switch to the getPublished* methods instead

  return (
    <div>
      <MainNavBar />
      <div className="mx-auto container">
        <AppTable headerItems={data.header} contentItems={data.data} />
      </div>
    </div>
  );
};

export default SubmissionPage;
