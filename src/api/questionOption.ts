import { trpc } from "@/utils/trpc";

const useGetAllByQuestionId = (questionId: string, isPublished = false) => {
  return (
    isPublished
      ? trpc.questionOption.getAllPublishedByQuestionId
      : trpc.questionOption.getAllByQuestionId
  ).useQuery({ questionId }, { refetchOnWindowFocus: false });
};

const useDelete = () => {
  const utils = trpc.useContext();
  return trpc.questionOption.delete.useMutation({
    onSuccess(input) {
      utils.questionOption.getAllByQuestionId.invalidate({
        questionId: input.questionId,
      });
    },
  });
};

const useEdit = () => {
  const utils = trpc.useContext();
  return trpc.questionOption.edit.useMutation({
    onSuccess(input) {
      const questionId = input[0]?.questionId;
      if (questionId) {
        utils.questionOption.getAllByQuestionId.invalidate({
          questionId: questionId,
        });
      }
    },
  });
};

const useAdd = () => {
  const utils = trpc.useContext();

  return trpc.questionOption.add.useMutation({
    onSuccess(input) {
      const questionId = input[0]?.questionId;
      if (questionId) {
        utils.questionOption.getAllByQuestionId.invalidate({
          questionId: questionId,
        });
      }
    },
  });
};

const questionOptionApi = {
  useDelete,
  useEdit,
  useAdd,
  useGetAllByQuestionId,
};

export default questionOptionApi;
