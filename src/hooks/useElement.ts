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

const useElement = (
  contentId: string,
  questionText: string,
  questionSupport: string,
  questionType: string
) => {
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
  const [inputElements, setInputElements] = useState<InputElement[]>([]);
  const [text, setText] = useState<string>("");
  const [support, setSupport] = useState<string>("");
  const [type, setType] = useState<string | undefined>("");
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
    if (editingContentId_ === contentId) {
      setType(contentType_);
    } else {
      setType(questionType);
    }
  }, [editingContentId_, contentId, contentType_, questionType]);

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

  useEffect(() => {
    if (isBeingEdited) {
      setText(contentText_);
    } else {
      setText(questionText);
    }
  }, [isBeingEdited, questionText, contentText_]);

  useEffect(() => {
    if (isBeingEdited) {
      setSupport(contentSupportingText_);
    } else {
      setSupport(questionSupport);
    }
  }, [isBeingEdited, questionSupport, contentSupportingText_]);

  const handleOnEdit = () => {
    setEditingContentId(contentId);
    setContentText(questionText);
    setContentType(questionType);

    setContentInputElements(
      inputElements.map(({ label, type, value, id }) => {
        return {
          label,
          value,
          type,
          id,
        };
      })
    );
  };

  const addInputElement = () => {
    return;
  };

  return {
    type,
    text,
    support,
    inputElements,
    isBeingEdited,
    handleOnEdit,
  };
};

export default useElement;
