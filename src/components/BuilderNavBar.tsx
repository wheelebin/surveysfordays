import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { EyeIcon } from "@heroicons/react/20/solid";
import AppButton from "@/components/AppButton";
import surveyApi from "@/api/survey";

const AppNavBar = () => {
  const router = useRouter();
  const { surveyId } = router.query;

  const publishMutation = surveyApi.usePublish();

  return (
    <div className="border-bottom bg-white border-slate-200 text-black text-sm">
      <div className="container mx-auto flex justify-between items-center pt-1">
        <div className="flex items-center">
          <Link href={"/published/" + surveyId} target="_blank">
            <AppButton className="ma-0 mr-2">
              <EyeIcon className="w-4 h-4 mr-1" />
              Preview
            </AppButton>
          </Link>
          <AppButton
            primary={true}
            className="ma-0 mr-2"
            onClick={() => publishMutation.mutate({ id: surveyId as string })}
          >
            Publish
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default AppNavBar;
