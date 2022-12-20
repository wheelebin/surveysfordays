import Survey from "@/components/Survey";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSurveyStore } from "@/stores/survey";

const BuilderPage = () => {
  const [surveyId, setSurveyId] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { surveyId: surveyIdParam } = router.query;

  useEffect(() => {
    if (typeof surveyIdParam === "string") {
      setSurveyId(surveyIdParam);
      useSurveyStore.getState().setCurrentSurveyId(surveyIdParam);
    }
  }, [surveyIdParam]);

  if (!surveyId) {
    return <></>;
  }

  return (
    <div className="h-screen ">
      <div className="mx-auto container">
        <div className="flex justify-center h-screen py-5">
          <Survey
            surveyId={surveyId as string}
            canSubmit
            isPublished
            isTransparent
          />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
