import AppButton from "@/components/AppButton";
import Builder from "@/components/Builder";
import BuilderPage from "@/components/BuilderPage";
import { Provider } from "jotai";
import usePage from "@/hooks/usePage";

// TODO Fix this BuilderPage_, underscore added due to naming duplication with BuilderPage component
const BuilderPage_ = () => {
  const { pages } = usePage();

  return (
    <Provider>
      <div className="container mx-auto">
        <div className="flex justify-center h-screen">
          <div className="flex flex-col w-1/2 overflow-y-scroll">
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
            <Builder questionId="question-0-0" />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default BuilderPage_;
