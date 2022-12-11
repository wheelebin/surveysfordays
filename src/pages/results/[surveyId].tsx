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

  const submitMutation = trpc.useMutation("submission.submit");

  const { data } = trpc.useQuery([
    "submission.getAllBySurveyId",
    { surveyId: surveyId as string },
  ]);

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
    <div className="w-3/5">
      <div className="flex">
        {data.header?.map((item) => (
          <div className="w-60" key={item.id}>
            {item.text}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap">
        {data.data?.flatMap((data, i) => {
          return (
            <div className="w-full flex " key={"a-" + i}>
              {data.map((data_) => (
                <div className="w-60" key={"b-" + i}>
                  {data_ ? data_ : "-"}
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
