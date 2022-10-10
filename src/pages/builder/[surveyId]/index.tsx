import { useState, useEffect } from "react";
import BuilderHeader from "@/components/BuilderHeader";
import AppButton from "@/components/AppButton";
import Builder from "@/components/Builder";
import BuilderPreview from "@/components/BuilderPreview";
import BuilderPage from "@/components/BuilderPage";
import usePage from "@/hooks/usePage";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

// TODO Fix this BuilderPage_, underscore added due to naming duplication with BuilderPage component
const BuilderPage_ = () => {
  const [hasMultiplePages, setHasMultiplePages] = useState<boolean>(false);
  const { pages, addPage, deletePage, currentPageNumber, prevPage, nextPage } =
    usePage();

  return (
    <div className="mx-auto container">
      <div className="flex justify-center h-screen">
        <div className="w-1/3 my-2 mr-2">
          <BuilderPreview />
          <Builder questionId="question-0-0" />
        </div>
        <div className="flex flex-col w-1/2 overflow-y-scroll no-scrollbar">
          {hasMultiplePages && (
            <div className="flex flex-row justify-around items-center">
              <ArrowLeftIcon onClick={prevPage} className="cursor-pointer" />
              <div className="rounded py-2 px-4 mt-1 bg-indigo-500 text-white flex justify-center items-center">
                {currentPageNumber + 1} / {pages?.length}
              </div>
              <ArrowRightIcon onClick={nextPage} className="cursor-pointer" />
            </div>
          )}

          {pages?.map((page) => {
            if (currentPageNumber === page.pageNumber) {
              return (
                <div className="py-2" key={page.id}>
                  {hasMultiplePages && (
                    <BuilderHeader onDelete={() => deletePage(page.id)} />
                  )}
                  <div className="px-5 border border-dotted">
                    <BuilderPage pageId={page.id} />
                  </div>
                </div>
              );
            }
            return <></>;
          })}

          {hasMultiplePages && (
            <div className="flex justify-around items-center">
              <AppButton onClick={addPage}>Add page</AppButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPage_;
