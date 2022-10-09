import { useState, useEffect } from "react";

import AppButton from "@/components/AppButton";
import Builder from "@/components/Builder";
import BuilderPage from "@/components/BuilderPage";
import usePage from "@/hooks/usePage";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

// TODO Fix this BuilderPage_, underscore added due to naming duplication with BuilderPage component
const BuilderPage_ = () => {
  const { pages, addPage, deletePage, currentPageNumber, prevPage, nextPage } =
    usePage();

  return (
    <div className="container mx-auto">
      <div className="flex justify-center h-screen">
        <div className="flex flex-col w-1/2 overflow-y-scroll no-scrollbar">
          <div className="flex flex-row justify-around items-center">
            <ArrowLeftIcon onClick={prevPage} className="cursor-pointer" />
            <div className="rounded py-2 px-4 mt-1 bg-indigo-500 text-white flex justify-center items-center">
              {currentPageNumber + 1} / {pages?.length}
            </div>
            <ArrowRightIcon onClick={nextPage} className="cursor-pointer" />
          </div>

          {pages?.map((page) => {
            if (currentPageNumber === page.pageNumber) {
              return (
                <div className="p-5" key={page.id}>
                  <AppButton onClick={() => deletePage(page.id)}>
                    Delete page
                  </AppButton>
                  <BuilderPage pageId={page.id} />
                </div>
              );
            }
            return <></>;
          })}

          <div className="flex justify-around items-center">
            <AppButton onClick={addPage}>Add page</AppButton>
          </div>
        </div>
        <div className="ml-20 w-1/3">
          <Builder questionId="question-0-0" />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage_;
