import React, { useState, useEffect } from "react";
import AppTextField from "./AppTextField";
import useBuilder from "@/hooks/useBuilder";

const BuilderQuestionForm: React.FC = () => {
  const { content, setContent } = useBuilder();

  return (
    <div className="bg-white mb-10">
      <h1 className="text-xl">Question</h1>
      <AppTextField
        label="Question text"
        onChange={(value) => setContent("text", value)}
        value={content?.text}
      />
      <AppTextField
        label="Question description"
        onChange={(value) => setContent("supportText", value)}
        value={content?.supportText || ""}
      />
    </div>
  );
};

export default BuilderQuestionForm;
