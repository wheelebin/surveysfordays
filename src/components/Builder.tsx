import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import BuilderElementFormInputs from "./BuilderElementFormInputs";
import AppSelectField from "./AppSelectField";
import AppButton from "./AppButton";
import { ELEMENT_GROUPS } from "@/constants/elements";
import BuilderElementFormSelections from "./BuilderElementFormSelections";
import useQuestion from "@/hooks/useQuestion";

import { useBuilder } from "@/hooks/useBuilder";
import {
  ELEMENTS_WITH_ADD_MULTIPLE,
  ELEMENTS_WITH_PLACEHOLDER,
} from "@/constants/elements";

type Props = {
  children?: React.ReactNode;
  questionId?: string;
};

const Builder: React.FC<Props> = ({ children }) => {
  const {
    elementType,
    setElementType,
    setQuestionId,
    setQuestionText,
    questionId,
  } = useBuilder();

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

  const getFormElement = () => {
    if (!elementType) {
      return <>No elem type</>;
    }

    if (ELEMENTS_WITH_ADD_MULTIPLE.includes(elementType)) {
      return (
        <BuilderElementFormSelections
          key={elementType}
          type={elementType}
          questionId={questionId}
        />
      );
    }
    return (
      <BuilderElementFormInputs
        key={elementType}
        elementType={elementType}
        questionId={questionId}
      />
    );
  };

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

      {getFormElement()}

      <AppButton className="w-full">Save</AppButton>
    </div>
  );
};

export default Builder;
