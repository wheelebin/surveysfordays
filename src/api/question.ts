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

const useDelete = () => {
  const utils = trpc.useContext();

  return trpc.question.delete.useMutation({
    onSuccess(input) {
      utils.question.getAllBySurveyId.invalidate({ surveyId: input.surveyId });
    },
  });
};

const useEdit = () => {
  const utils = trpc.useContext();
  return trpc.question.editQuestion.useMutation({
    onSuccess(input) {
      utils.question.getAllBySurveyId.invalidate({ surveyId: input.surveyId });
    },
  });
};

const useEditOrder = () => {
  const utils = trpc.useContext();
  return trpc.question.editQuestionsOrderNumber.useMutation({
    onSuccess(input) {
      const surveyId = input[0]?.surveyId;
      if (surveyId) {
        utils.question.getAllBySurveyId.invalidate({ surveyId: surveyId });
      }
    },
  });
};

const useAdd = () => {
  const utils = trpc.useContext();
  return trpc.question.add.useMutation({
    onSuccess(input) {
      utils.question.getAllBySurveyId.invalidate({ surveyId: input.surveyId });
    },
  });
};

const questionApi = {
  useGetAllBySurveyId,
  useDelete,
  useEdit,
  useEditOrder,
  useAdd,
};

export default questionApi;
