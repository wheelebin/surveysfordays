import Builder from "@/components/Builder";
import QuestionsOverview from "@/components/QuestionsOverview";
import MainNavBar from "@/components/MainNavBar";
import BuilderSectionContent from "@/components/BuilderSectionContent";
import BuilderNavBar from "@/components/BuilderNavBar";
import AppTable from "@/components/AppTable";
import useQuestion from "@/hooks/useQuestion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSurveyStore } from "@/stores/survey";
import { trpc } from "@/utils/trpc";

const SubmissionPage = () => {
  const utils = trpc.useContext();
  const [surveyId, setSurveyId] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { surveyId: surveyIdParam } = router.query;

  const submitMutation = trpc.submission.submit.useMutation();

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
