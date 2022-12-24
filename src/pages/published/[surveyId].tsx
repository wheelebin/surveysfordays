import Survey from "@/components/Survey";
import { useRouter } from "next/router";

const BuilderPage = () => {
  const router = useRouter();
  const { surveyId } = router.query;

  if (!surveyId) {
    return <></>;
  }

  return (
    <div className="h-screen ">
      <div className="mx-auto container">
        <div className="flex justify-center h-screen py-5">
          <Survey
            surveyId={surveyId as string}
            canSubmit
            isPublished
            isTransparent
          />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
