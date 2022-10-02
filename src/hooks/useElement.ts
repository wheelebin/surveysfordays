import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { useAtom } from "jotai";
import {
  editingContentId,
  contentType,
  contentText,
  contentSupportingText,
  contentPlaceholder,
  contentInputElements,
  InputElement,
} from "@/utils/atoms";

// TODO Finish this

const useElement = (contentId: string) => {
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
  const [inputElements, setInputElements] = useState<InputElement[]>([]);
  const [editingContentId_, setEditingContentId] = useAtom(editingContentId);

  const [contentType_, setContentType] = useAtom(contentType);
  const [contentText_, setContentText] = useAtom(contentText);
  const [contentSupportingText_, setContentSupportingText] = useAtom(
    contentSupportingText
  );
  const [contentPlaceholder_, setContentPlaceholder] =
    useAtom(contentPlaceholder);
  const [contentInputElements_, setContentInputElements] =
    useAtom(contentInputElements);

  const { data } = trpc.useQuery(
    ["questionOption.getAllByQuestionId", { questionId: contentId }],
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (editingContentId_ === contentId) {
      setIsBeingEdited(true);
    } else {
      setIsBeingEdited(false);
    }
  }, [editingContentId_, contentId]);

  useEffect(() => {
    const fetchedElements = data || [];

    if (isBeingEdited) {
      setInputElements(contentInputElements_);
    } else {
      setInputElements(
        fetchedElements.map(({ text, type, id }) => {
          return {
            label: text,
            value: text,
            type,
            id,
          };
        })
      );
    }
  }, [isBeingEdited, data, contentInputElements_]);

  const addInputElement = () => {
    return;
  };

  return {
    inputElements,
    isBeingEdited,
  };
};

export default useElement;
