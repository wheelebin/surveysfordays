import BuilderSectionContent from "@/components/BuilderSectionContent";
import AppButton from "@/components/AppButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSurveyStore } from "@/stores/survey";
import { trpc } from "@/utils/trpc";
import { ELEMENTS_WITH_PLACEHOLDER } from "@/constants/elements";
import surveyApi from "@/api/survey";
import questionApi from "@/api/question";

const BuilderPage = () => {
  const [surveyId, setSurveyId] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { surveyId: surveyIdParam } = router.query;

  const [currentOrderNumber, setCurrentOrderNumber] = useState(0);
  const [allAnswers, setAllAnswers] = useState<
    {
      questionId: string;
      text?: string;
      questionOptionIds: string[];
    }[]
  >([]);

  const { data: survey } = surveyApi.useGetPublished(surveyId as string);

  const submitMutation = trpc.submission.submit.useMutation();

  useEffect(() => {
    if (typeof surveyIdParam === "string") {
      setSurveyId(surveyIdParam);
      useSurveyStore.getState().setCurrentSurveyId(surveyIdParam);
    }
  }, [surveyIdParam]);

  if (!surveyId) {
    return <></>;
  }

  const submitAnswer = (
    type: string,
    questionId: string,
    values: string[],
    orderNumber: number
  ) => {
    const a = allAnswers.filter((answer) => {
      return answer.questionId !== questionId;
    });

    const text = ELEMENTS_WITH_PLACEHOLDER.includes(type)
      ? values[0]
      : undefined;

    setAllAnswers([
      ...a,
      { questionId, questionOptionIds: !text ? values : [], text },
    ]);

    setCurrentOrderNumber(orderNumber + 1);

    console.log(text, allAnswers);
  };
  const submitAnswers = () => {
    if (survey) {
      const req = {
        userId: null,
        surveyId: survey.id,
        answers: allAnswers.map(({ questionOptionIds, text, questionId }) => ({
          questionId,
          questionOptionIds,
          text: text || null,
        })),
      };
      console.log(req);
      submitMutation.mutate(req);
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="mx-auto container">
        <div className="flex justify-center h-screen py-5">
          <div className="flex flex-col overflow-y-scroll no-scrollbar w-1/2">
            <div className="p-3">
              {survey && survey.Question.length > 0 ? (
                survey.Question.map((question) => (
                  <BuilderSectionContent
                    key={question.id}
                    isCurrent={currentOrderNumber === question.orderNumber}
                    onSubmit={(values) =>
                      submitAnswer(
                        question.type,
                        question.id,
                        values,
                        question.orderNumber
                      )
                    }
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
