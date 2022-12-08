import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const Survey = () => {
  const router = useRouter();
  const surveyId = router.query.surveyId;

  const { data: surveys } = trpc.useQuery([
    "survey.getPublishedSurveyById",
    { id: surveyId as string },
  ]);

  return (
    <div>
      <p>Published survey </p>
      <div>{JSON.stringify(surveys) || ""}</div>
    </div>
  );
};

export default Survey;
