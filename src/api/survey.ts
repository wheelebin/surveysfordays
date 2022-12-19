import { trpc } from "@/utils/trpc";

const useGetAll = () => {
  return trpc.survey.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
};

const useGetById = (surveyId: string) => {
  return trpc.survey.byId.useQuery(
    { id: surveyId },
    {
      refetchOnWindowFocus: false,
      enabled: !!surveyId,
    }
  );
};

const useGetPublished = (parentId: string) => {
  return trpc.survey.getPublishedSurveyById.useQuery(
    { id: parentId },
    { refetchOnWindowFocus: false, enabled: !!parentId }
  );
};

const usePublish = () => {
  return trpc.survey.publish.useMutation({
    onSuccess(input) {
      //utils.invalidateQueries(["questionOption.getAllByQuestionId"]);
    },
  });
};

const useDelete = () => {
  const utils = trpc.useContext();

  return trpc.survey.delete.useMutation({
    onSuccess(input) {
      utils.question.getAllBySurveyId.invalidate({ surveyId: input.id });
    },
  });
};

const useAdd = () => {
  const utils = trpc.useContext();
  return trpc.survey.add.useMutation({
    onSuccess(input) {
      utils.question.getAllBySurveyId.invalidate({ surveyId: input.id });
    },
  });
};

const surveyApi = {
  useGetAll,
  useDelete,
  useGetPublished,
  useGetById,
  usePublish,
  useAdd,
};

export default surveyApi;
