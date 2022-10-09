import { trpc } from "@/utils/trpc";

const useSection = (pageId: string) => {
  const utils = trpc.useContext();

  const deleteSectionMutation = trpc.useMutation("section.delete", {
    onSuccess(input) {
      utils.invalidateQueries([
        "section.getAllByPageId",
        { pageId: input.pageId },
      ]);
    },
  });

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

  const deleteSection = (id: string) => {
    deleteSectionMutation.mutate({ id });
  };

  return {
    sections,
    addSection,
    deleteSection,
  };
};

export default useSection;
