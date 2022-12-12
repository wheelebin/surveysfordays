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

  const publishMutation = trpc.survey.publish.useMutation({
    onSuccess(input) {
      //utils.invalidateQueries(["questionOption.getAllByQuestionId"]);
    },
  });

  if (!surveyId) {
    return <></>;
  }

  return (
    <div>
      <MainNavBar />
      <BuilderNavBar />
      <div className="mx-auto container">
        <div className="flex justify-between h-screen">
          <div className="w-1/3 my-2 mr-2">
            <AppButton
              className="w-full"
              onClick={() => publishMutation.mutate({ id: surveyId as string })}
            >
              publish
            </AppButton>
            <QuestionsOverview
              surveyId={surveyId}
              scrollToQuestion={(orderNumber: number) =>
                setCurrentOrderNumber(orderNumber)
              }
            />
            <Builder surveyId={surveyId} questionId="question-0-0" />
          </div>
          <div className="flex flex-col w-1/2 overflow-y-scroll no-scrollbar ">
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
    </div>
  );
};

export default BuilderPage;
