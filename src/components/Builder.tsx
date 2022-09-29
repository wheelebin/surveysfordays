import React from "react";
import BuilderQuestionForm from "./BuilderQuestionForm";
import AppButton from "./AppButton";

type Props = {
  children?: React.ReactNode;
};

const Builder: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div>
        <h1>Choose content type</h1>

        <div className="flex flex-col">
          <AppButton>Question</AppButton>
          <AppButton>Text</AppButton>
        </div>
      </div>

      <BuilderQuestionForm />
    </div>
  );
};

export default Builder;
