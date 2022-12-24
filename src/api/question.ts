import { trpc } from "@/utils/trpc";

const useGetAllBySurveyId = (surveyId?: string, isPublished = false) => {
  if (isPublished) {
    return trpc.question.getAllPublishedBySurveyId.useQuery(
      { surveyId },
      { refetchOnWindowFocus: false, enabled: !!surveyId }
    );
  }

  return trpc.question.getAllBySurveyId.useQuery(
    { surveyId: surveyId as string },
    { refetchOnWindowFocus: false, enabled: !!surveyId }
  );
};

const useGetById = (questionId: string) => {
  return trpc.question.byId.useQuery(
    { id: questionId },
    { refetchOnWindowFocus: false, enabled: !!questionId }
  );
};

const useDelete = () => {
  const utils = trpc.useContext();

  return trpc.question.delete.useMutation({
    onSuccess(input) {
      utils.question.byId.invalidate({ id: input.id });
      utils.question.getAllBySurveyId.invalidate({ surveyId: input.surveyId });
      utils.survey.byId.invalidate({ id: input.surveyId });
    },
  });
};

const useGenerateQuestions = () => {
  const utils = trpc.useContext();
  return trpc.question.generateQuestionsForSurveyId.useMutation({
    onSuccess(input) {
      const surveyId = input[0]?.surveyId;
      if (surveyId) {
        utils.survey.byId.invalidate({ id: surveyId });
      }
    },
  });
};

const useEdit = () => {
  const utils = trpc.useContext();
  return trpc.question.editQuestion.useMutation({
    onSuccess(input) {
      utils.question.byId.invalidate({ id: input.id });
      utils.question.getAllBySurveyId.invalidate({ surveyId: input.surveyId });
      utils.survey.byId.invalidate({ id: input.surveyId });
    },
  });
};

const useEditOrder = () => {
  const utils = trpc.useContext();
  return trpc.question.editQuestionsOrderNumber.useMutation({
    onSuccess(input) {
      const surveyId = input[0]?.surveyId;
      const questionId = input[0]?.id;
      if (surveyId && questionId) {
        utils.question.byId.invalidate({ id: questionId });
        utils.question.getAllBySurveyId.invalidate({
          surveyId: surveyId,
        });
        utils.survey.byId.invalidate({ id: surveyId });
      }
    },
  });
};

const useAdd = () => {
  const utils = trpc.useContext();
  return trpc.question.add.useMutation({
    onSuccess(input) {
      utils.question.byId.invalidate({ id: input.id });
      utils.question.getAllBySurveyId.invalidate({ surveyId: input.surveyId });
      utils.survey.byId.invalidate({ id: input.surveyId });
    },
  });
};

const questionApi = {
  useGetAllBySurveyId,
  useGetById,
  useDelete,
  useEdit,
  useEditOrder,
  useAdd,
  useGenerateQuestions,
};

export default questionApi;
