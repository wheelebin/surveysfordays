import usePublished from "@/hooks/usePublished";

import BuilderSectionContent from "@/components/BuilderSectionContent";
import AppButton from "@/components/AppButton";
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
  const [allAnswers, setAllAnswers] = useState<
    {
      questionId: string;
      questionOptionIds: string[];
    }[]
  >([]);

  const { survey, questions } = usePublished({
    surveyId: surveyId as string,
  });

  const submitMutation = trpc.useMutation("submissionsubmit");

  useEffect(() => {
    if (typeof surveyIdParam === "string") {
      setSurveyId(surveyIdParam);
      useSurveyStore.getState().setCurrentSurveyId(surveyIdParam);
    }
  }, [surveyIdParam]);

  if (!surveyId) {
    return <></>;
  }

  const submitAnswer = (questionId: string, values: string[]) => {
    const a = allAnswers.filter((answer) => {
      return answer.questionId !== questionId;
    });
    setAllAnswers([...a, { questionId, questionOptionIds: values }]);
  };
  const submitAnswers = () => {
    if (survey) {
      const req = {
        userId: null,
        surveyId: survey.id,
        answers: allAnswers.map(({ questionOptionIds }) => ({
          questionOptionIds,
        })),
      };
      submitMutation.mutate(req);
    }
  };

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
                    onSubmit={(values) => submitAnswer(question.id, values)}
                    {...question}
                  />
                ))
              ) : (
                <div className=" my-5 p-3 bg-slate-50">No content</div>
              )}
            </div>
            <AppButton className="w-full" onClick={submitAnswers}>
              Next
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
