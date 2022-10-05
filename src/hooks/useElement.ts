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
  questionType: string,
  questionText: string,
  questionSupportText?: string
) => {
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
  const [inputElements, setInputElements] = useState<InputElement[]>([]);
  const [text, setText] = useState<string>("");
  const [supportText, setSupportText] = useState<string | undefined>(undefined);
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>("");
  const [editingContentId_, setEditingContentId] = useAtom(editingContentId);

  const [contentType_, setContentType] = useAtom(contentType);
  const [contentText_, setContentText] = useAtom(contentText);
  const [contentPlaceholder_, setContentPlaceholder] =
    useAtom(contentPlaceholder);
  const [contentSupportingText_, setContentSupportingText] = useAtom(
    contentSupportingText
  );
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
    if (isBeingEdited) {
      setInputElements(contentInputElements_);
    } else if (data) {
      setInputElements(data);
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
      setSupportText(contentSupportingText_);
    } else if (questionSupportText) {
      setSupportText(questionSupportText);
    }
  }, [isBeingEdited, questionSupportText, contentSupportingText_]);

  const handleOnEdit = () => {
    setEditingContentId(contentId);
    setContentText(questionText);
    setContentSupportingText(questionSupportText);
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
    supportText,
    inputElements,
    isBeingEdited,
    handleOnEdit,
  };
};

export default useElement;
