import Builder from "@/components/Builder";
import BuilderPreview from "@/components/BuilderPreview";
import BuilderSectionContent from "@/components/BuilderSectionContent";
import useContent from "@/hooks/useContent";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSurveyStore } from "@/stores/survey";

const BuilderPage = () => {
  const router = useRouter();
  const { surveyId } = router.query;

  useEffect(() => {
    useSurveyStore.getState().setCurrentSurveyId(surveyId as string);
  }, [surveyId]);

  const [currentOrderNumber, setCurrentOrderNumber] = useState(0);
  const { questions } = useContent(surveyId as string);

  return (
    <div className="mx-auto container">
      <div className="flex justify-center h-screen">
        <div className="w-1/3 my-2 mr-2">
          <BuilderPreview
            scrollToQuestion={(orderNumber: number) =>
              setCurrentOrderNumber(orderNumber)
            }
          />
          <Builder questionId="question-0-0" />
        </div>
        <div className="flex flex-col w-1/2 overflow-y-scroll no-scrollbar ">
          <div className={`p-3 `}>
            <div>
              {questions.length > 0 ? (
                questions.map((question) => (
                  <BuilderSectionContent
                    key={question.id}
                    isCurrent={currentOrderNumber === question.orderNumber}
                    contentId={question.id}
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
