import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useAtom } from "jotai";
import { editingContentId } from "@/utils/atoms";

const useContent = (sectionId: string) => {
  const router = useRouter();
  const { surveyId } = router.query;

  const [text, setText] = useState<string>("");
  const [support, setSupport] = useState<string>("");

  const [editingContentId_, setEditingContentId] = useAtom(editingContentId);

  const utils = trpc.useContext();

  const addQuestionMutation = trpc.useMutation("question.add", {
    onSuccess(input) {
      const sectionId = input?.sectionId;
      if (sectionId) {
        utils.invalidateQueries(["question.getAllBySectionId", { sectionId }]);
      }
    },
  });

  const { data: questions } = trpc.useQuery(
    ["question.getAllBySectionId", { sectionId }],
    { refetchOnWindowFocus: false, enabled: !!sectionId }
  );

  const addContent = async (question: {
    type: string;
    text: string;
    orderNumber: number;
  }) => {
    const newSurveyId = surveyId as string;

    const addedQuestion = await addQuestionMutation.mutateAsync({
      ...question,
      sectionId,
      surveyId: newSurveyId,
    });

    if (addedQuestion) {
      setEditingContentId(addedQuestion.id);
    }
  };

  return {
    questions,
    addContent,
  };
};

export default useContent;
