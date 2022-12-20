import React, { useState } from "react";
import { useRouter } from "next/router";
import { EyeIcon } from "@heroicons/react/20/solid";
import AppButton from "@/components/AppButton";
import surveyApi from "@/api/survey";
import * as Dialog from "@radix-ui/react-dialog";
import { useToastStore } from "@/stores/toast";

const DialogComponent = ({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode[] | React.ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger onClick={() => setOpen(true)}>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-red fixed top-0 left-0 right-0 bottom-0 grid place-items-center overflow-y-scroll">
          <Dialog.Content className="w-full h-full bg-white p-3">
            <div className="w-full">
              <div className="w-full flex justify-end">
                <AppButton onClick={() => setOpen(false)}>Close</AppButton>
              </div>
              {children}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const AppNavBar = () => {
  const router = useRouter();
  const { surveyId } = router.query;

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
          <DialogComponent
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
          </DialogComponent>
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
