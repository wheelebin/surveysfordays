import Builder from "@/components/Builder";
import QuestionsOverview from "@/components/QuestionsOverview";
import MainNavBar from "@/components/MainNavBar";
import BuilderSectionContent from "@/components/BuilderSectionContent";
import BuilderNavBar from "@/components/BuilderNavBar";
import AppButton from "@/components/AppButton";
import useQuestion from "@/hooks/useQuestion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSurveyStore } from "@/stores/survey";
import { trpc } from "@/utils/trpc";

const BuilderPage = () => {
  const utils = trpc.useContext();
  const [surveyId, setSurveyId] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { surveyId: surveyIdParam } = router.query;

  useEffect(() => {
    if (typeof surveyIdParam === "string") {
      setSurveyId(surveyIdParam);
      useSurveyStore.getState().setCurrentSurveyId(surveyIdParam);
    }
  }, [surveyIdParam]);

  const [currentOrderNumber, setCurrentOrderNumber] = useState(0);
  const { questions } = useQuestion(surveyId as string);

  if (!surveyId) {
    return <></>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="grow-0 shrink basis-auto">
        <MainNavBar />
        <BuilderNavBar />
      </div>
      <div className="mx-auto container grow shrink basis-auto flex justify-between h-[calc(100vh_-_91px)]">
        <div className="w-1/3 max-w-sm my-2 mr-2">
          <QuestionsOverview
            surveyId={surveyId}
            scrollToQuestion={(orderNumber: number) =>
              setCurrentOrderNumber(orderNumber)
            }
          />
          <Builder surveyId={surveyId} questionId="question-0-0" />
        </div>
        <div className="flex flex-col w-1/2 overflow-y-scroll no-scrollbar">
          <div className={`p-3 `}>
            {questions.length > 0 ? (
              questions.map((question) => (
                <BuilderSectionContent
                  key={question.id}
                  isCurrent={currentOrderNumber === question.orderNumber}
                  questionId={question.id}
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
  );
};

export default BuilderPage;
