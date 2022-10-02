import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { useAtom } from "jotai";
import { contentText, contentSupportingText } from "@/utils/atoms";

const useContent = (sectionId?: string) => {
  const [text, setText] = useState<string>("");
  const [support, setSupport] = useState<string>("");

  const { data: questions } = trpc.useQuery(
    ["question.getAllBySectionId", { sectionId: sectionId || "" }],
    { refetchOnWindowFocus: false, enabled: !!sectionId }
  );

  const addContent = () => {
    return;
  };

  return {
    questions,
    addContent,
  };
};

export default useContent;
