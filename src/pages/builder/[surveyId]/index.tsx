import { createContext } from "react";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import AppButton from "@/components/AppButton";
import Builder from "@/components/Builder";
import BuilderPage from "@/components/BuilderPage";

/* type BuilderContextType = {
  addingSection: boolean;
  editingQuestion: string | undefined;
};
const BuilderContext = createContext<BuilderContextType | undefined>(undefined);
const BuilderContextProvider = (props: any) => {
  const value = {
    addingSection: false,
    editingQuestion: undefined,
  };
  return <BuilderContext.Provider value={value} {...props} />;
}; */

// TODO Fix this BuilderPage_, underscore added due to naming duplication with BuilderPage component
const BuilderPage_ = () => {
  const router = useRouter();
  const { surveyId } = router.query;

  const { data: survey } = trpc.useQuery([
    "survey.byId",
    { id: surveyId as string },
  ]);

  const { data: pages } = trpc.useQuery(
    ["page.getAllBySurveyId", { surveyId: surveyId as string }],
    { enabled: !!survey?.id }
  );

  return (
    <div className="container mx-auto mt-2">
      <div className="flex justify-center">
        <div className="flex flex-col w-1/2">
          <div className="flex flex-row justify-between">
            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex justify-center items-center">
              1
            </div>
          </div>

          {pages?.map((page) => (
            <BuilderPage key={page.id} pageId={page.id} />
          ))}

          <div className="flex justify-center">
            <AppButton>Add page</AppButton>
          </div>
        </div>
        <div className="ml-20 w-1/3">
          <Builder questionId="question-2-0" />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage_;
