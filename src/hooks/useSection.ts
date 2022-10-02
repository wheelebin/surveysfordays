import { trpc } from "@/utils/trpc";

const usePage = (pageId: string) => {
  const { data: sections } = trpc.useQuery(
    ["section.getAllByPageId", { pageId }],
    { refetchOnWindowFocus: false }
  );

  const addSection = () => {
    return;
  };

  return {
    sections,
    addSection,
  };
};

export default usePage;
