import usePublished from "@/hooks/usePublished";

import BuilderSectionContent from "@/components/BuilderSectionContent";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSurveyStore } from "@/stores/survey";
import { trpc } from "@/utils/trpc";

const BuilderPage = () => {
  const utils = trpc.useContext();
  const [surveyId, setSurveyId] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { surveyId: surveyIdParam } = router.query;

  const [currentOrderNumber, setCurrentOrderNumber] = useState(0);

  const { survey, questions } = usePublished({
    surveyId: surveyId as string,
  });

  useEffect(() => {
    if (typeof surveyIdParam === "string") {
      setSurveyId(surveyIdParam);
      useSurveyStore.getState().setCurrentSurveyId(surveyIdParam);
    }
  }, [surveyIdParam]);

  if (!surveyId) {
    return <></>;
  }

  // Add type or versionStatus or isPublished to the components-
  // in order to switch to the getPublished* methods instead

  return (
    <div>
      <div className="mx-auto container">
        <div className="flex justify-between h-screen">
          <div className="flex flex-col w-1/2 overflow-y-scroll no-scrollbar ">
            <div className={`p-3 `}>
              {questions.length > 0 ? (
                questions.map((question) => (
                  <BuilderSectionContent
                    key={question.id}
                    isCurrent={currentOrderNumber === question.orderNumber}
                    questionId={question.id}
                    isPublished={question.status === "PUBLISH"}
                    {...question}
                  />
                ))
              ) : (
                <div className=" my-5 p-3 bg-slate-50">No content</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
