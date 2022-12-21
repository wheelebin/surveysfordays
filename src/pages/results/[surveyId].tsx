import MainNavBar from "@/components/MainNavBar";

import AppTable from "@/components/AppTable";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const SubmissionPage = () => {
  const router = useRouter();
  const { surveyId } = router.query;

  const { data } = trpc.submission.getAllBySurveyId.useQuery(
    {
      surveyId: surveyId as string,
    },
    {
      enabled: !!surveyId,
    }
  );

  if (!data) {
    return <></>;
  }

  return (
    <div className="h-screen">
      <MainNavBar />
      <div className="mx-auto container">
        <div className="px-10">
          <AppTable headerItems={data.header} contentItems={data.data} />
        </div>
      </div>
    </div>
  );
};

SubmissionPage.auth = true;

export default SubmissionPage;
