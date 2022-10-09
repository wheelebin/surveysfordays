import { trpc } from "@/utils/trpc";

const useSection = (pageId: string) => {
  const utils = trpc.useContext();

  const addSectionMutation = trpc.useMutation("section.add", {
    onSuccess(input) {
      utils.invalidateQueries([
        "section.getAllByPageId",
        { pageId: input.pageId },
      ]);
    },
  });

  const { data: sections } = trpc.useQuery(
    ["section.getAllByPageId", { pageId }],
    { refetchOnWindowFocus: false }
  );

  const addSection = () => {
    if (!sections) {
      return;
    }

    addSectionMutation.mutate({
      pageId,
      sectionNumber: sections.length,
    });
  };

  return {
    sections,
    addSection,
  };
};

export default useSection;
