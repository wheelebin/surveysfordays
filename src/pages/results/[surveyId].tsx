import usePublished from "@/hooks/usePublished";

import BuilderSectionContent from "@/components/BuilderSectionContent";
import AppButton from "@/components/AppButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSurveyStore } from "@/stores/survey";
import { trpc } from "@/utils/trpc";
import { ELEMENTS_WITH_PLACEHOLDER } from "@/constants/elements";

const SubmissionPage = () => {
  const utils = trpc.useContext();
  const [surveyId, setSurveyId] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { surveyId: surveyIdParam } = router.query;

  const submitMutation = trpc.submission.submit.useMutation();

  const { data } = trpc.submission.getAllBySurveyId.useQuery({ surveyId: surveyId as string });

  // clbihl3d10023uz8fqnjyqsud

  useEffect(() => {
    if (typeof surveyIdParam === "string") {
      setSurveyId(surveyIdParam);
      useSurveyStore.getState().setCurrentSurveyId(surveyIdParam);
    }
  }, [surveyIdParam]);

  if (!data) {
    return <>s</>;
  }

  // Add type or versionStatus or isPublished to the components-
  // in order to switch to the getPublished* methods instead

  return (
    <div className="w-4/5">
      <div className="flex">
        {data.header?.map((item) => (
          <div className="w-72 font-bold" key={item.id}>
            {item.text}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap">
        {data.data?.map((row, i) => {
          return (
            <div className="w-full flex " key={`row-${i}`}>
              {row.map((cellValue) => (
                <div className="w-72" key={`cell-${i}`}>
                  {cellValue ? cellValue : "-"}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubmissionPage;
