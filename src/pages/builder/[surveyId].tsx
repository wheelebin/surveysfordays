import Builder from "@/components/Builder";
import QuestionsOverview from "@/components/QuestionsOverview";
import MainNavBar from "@/components/MainNavBar";
import BuilderNavBar from "@/components/BuilderNavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSurveyStore } from "@/stores/survey";
import { useSession } from "next-auth/react";
import surveyApi from "@/api/survey";
import Survey from "@/components/Survey";

const BuilderPage = () => {
  useSession({ required: true });
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
  const { data: survey } = surveyApi.useGetById(surveyId as string);

  if (!survey) {
    return <></>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="grow-0 shrink basis-auto">
        <MainNavBar />
        <BuilderNavBar />
      </div>
      <div className="pt-5 mx-auto container grow shrink basis-auto flex justify-between h-[calc(100vh_-_120px)]">
        <div className="w-1/3 max-w-sm">
          <QuestionsOverview
            surveyId={survey.id}
            questions={survey.Question}
            scrollToQuestion={(orderNumber: number) =>
              setCurrentOrderNumber(orderNumber)
            }
          />
          <Builder surveyId={survey.id} questionId="question-0-0" />
        </div>
        <Survey
          surveyId={surveyId as string}
          currentOrderNumber={currentOrderNumber}
        />
      </div>
    </div>
  );
};

export default BuilderPage;
