import React, { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import BuilderQuestionForm from "./BuilderQuestionForm";
import AppSelectField from "./AppSelectField";
import { ELEMENT_GROUPS } from "@/constants/elements";

type Props = {
  children?: React.ReactNode;
  questionId?: string;
};

const Builder: React.FC<Props> = ({ children, questionId }) => {
  const [elementType, setElementType] = useState<string | undefined>("");

  const router = useRouter();
  const { surveyId } = router.query;

  /* const { data: survey } = trpc.useQuery([
    "survey.byId",
    { id: surveyId as string },
  ]);

  const { data: pages } = trpc.useQuery(
    ["page.getAllBySurveyId", { surveyId: surveyId as string }],
    { enabled: !!survey?.id }
  ); */

  const handleOnChange = (value: string) => {
    setElementType(value);
  };

  /*
    - When click on add section, create section through endpoint
    - When click on save in builderForm, create questions and etc in there through endpoint
  */

  // TODO Will create a BuilderImageForm, BuilderTextForm and etc
  // and switch the builder form type out depending on the current elementType
  return (
    <div>
      {!questionId && (
        <div>
          <h1 className="text-xl">Choose content type</h1>

          <div className="my-4">
            <AppSelectField
              onChange={handleOnChange}
              placeholder="Select an element"
              selectGroups={ELEMENT_GROUPS}
            />
          </div>
        </div>
      )}

      {(elementType || questionId) && (
        <BuilderQuestionForm
          key={elementType}
          elementType={elementType}
          questionId={questionId}
        />
      )}
    </div>
  );
};

export default Builder;
