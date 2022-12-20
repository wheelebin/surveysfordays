import React, { useState, useEffect, useRef } from "react";
import { trpc } from "@/utils/trpc";
import { ELEMENTS_WITH_PLACEHOLDER } from "@/constants/elements";
import BuilderSectionContent from "@/components/BuilderSectionContent";
import surveyApi from "@/api/survey";
import AppCard from "@/components/AppCard";
import AppButton from "@/components/AppButton";

type SurveyProps = {
  surveyId: string;
  currentOrderNumber?: number;
  onOrderNumberChange?: (orderNumber: number) => void;
  canSubmit?: boolean;
  isPublished?: boolean;
  isTransparent?: boolean;
};

const Survey = ({
  surveyId,
  currentOrderNumber,
  onOrderNumberChange,
  canSubmit,
  isPublished,
  isTransparent,
}: SurveyProps) => {
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState<boolean>(false);
  const [currentOrderNumberInternal, setCurrentOrderNumberInternal] =
    useState<number>(0);

  const [allAnswers, setAllAnswers] = useState<
    {
      questionId: string;
      text?: string;
      questionOptionIds: string[];
    }[]
  >([]);

  const completionCardRef = useRef<HTMLDivElement | null>(null);

  const submitMutation = trpc.submission.submit.useMutation();

  const { data: survey } = isPublished
    ? surveyApi.useGetPublished(surveyId as string)
    : surveyApi.useGetById(surveyId as string);

  useEffect(() => {
    currentOrderNumber && setCurrentOrderNumberInternal(currentOrderNumber);
  }, [currentOrderNumber]);

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

    if (survey && orderNumber === survey.Question.length - 1) {
      if (completionCardRef && completionCardRef.current) {
        completionCardRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "center",
        });
      }
    } else {
      onOrderNumberChange && onOrderNumberChange(orderNumber + 1);
      setCurrentOrderNumberInternal(orderNumber + 1);
    }
  };
  const submitAnswers = () => {
    if (survey) {
      submitMutation.mutate({
        userId: null,
        surveyId: survey.id,
        answers: allAnswers.map(({ questionOptionIds, text, questionId }) => ({
          questionId,
          questionOptionIds,
          text: text || null,
        })),
      });
      setHasBeenSubmitted(true);
    }
  };

  if (!survey) {
    return <></>;
  }

  return (
    <div className="flex flex-col w-1/2 overflow-y-scroll no-scrollbar">
      {!hasBeenSubmitted ? (
        <div className={`p-3 `}>
          {survey.Question.length > 0 ? (
            survey.Question.map((question) => (
              <BuilderSectionContent
                key={question.id}
                isCurrent={currentOrderNumberInternal === question.orderNumber}
                isTransparent={isTransparent}
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

          {canSubmit && (
            <div className="h-screen" ref={completionCardRef}>
              <AppCard>
                <h1 className="text-xl">
                  Click on submit to complete the survey
                </h1>
                <AppButton
                  className="w-full mt-10"
                  primary
                  onClick={() => submitAnswers()}
                >
                  Submit
                </AppButton>
              </AppCard>
            </div>
          )}
        </div>
      ) : (
        <AppCard>
          <h1 className="text-xl">Thank you for completing the survey!</h1>
        </AppCard>
      )}
    </div>
  );
};

export default Survey;
