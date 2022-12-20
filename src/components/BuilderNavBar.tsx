import React from "react";
import { useRouter } from "next/router";
import { EyeIcon } from "@heroicons/react/20/solid";
import AppButton from "@/components/AppButton";
import AppDialog from "@/components/AppDialog";
import surveyApi from "@/api/survey";
import { useToastStore } from "@/stores/toast";
import useDialog from "@/hooks/useDialog";

const AppNavBar = () => {
  const router = useRouter();
  const { surveyId } = router.query;

  const { open, handleOnOpenChange } = useDialog();

  const publishMutation = surveyApi.usePublish();
  const hanldeOnPublish = async () => {
    await publishMutation.mutateAsync({ id: surveyId as string });
    useToastStore.getState().open({
      title: `${surveyId} has been published`,
      description: "Click on preview to view it!",
    });
  };

  return (
    <div className="border-bottom bg-white border-slate-200 text-black text-sm">
      <div className="container mx-auto flex justify-between items-center pt-1 px-10">
        <div className="flex items-center">
          <AppDialog
            open={open}
            onOpen={handleOnOpenChange}
            full
            trigger={
              <AppButton className="ma-0 mr-2">
                <EyeIcon className="w-4 h-4 mr-1" />
                Preview
              </AppButton>
            }
          >
            <iframe
              src={`/published/${surveyId}`}
              className="w-full h-[calc(100vh_-_100px)] "
            ></iframe>
          </AppDialog>
          <AppButton
            primary={true}
            className="ma-0 mr-2"
            onClick={hanldeOnPublish}
          >
            Publish
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default AppNavBar;
