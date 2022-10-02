import { trpc } from "@/utils/trpc";

const useContent = (sectionId?: string) => {
  const { data: questions } = trpc.useQuery(
    ["question.getAllBySectionId", { sectionId: sectionId || "" }],
    { refetchOnWindowFocus: false, enabled: !!sectionId }
  );

  const addContent = () => {
    return;
  };

  return {
    questions,
    addContent,
  };
};

export default useContent;
