import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { trpc } from "@/utils/trpc";
import { string } from "zod";

// TODO In the Builder components (for the preview), check if editing value is true and if it is use the bellow values instead
// of fetched valued from TRPC until editing is false (which it will be set to after a save from the builder sidebar)

type InputElement = {
  id: string;
  type: string;
  label: string;
  value: string;
};

type BuilderContextType = {
  elementType?: string;
  setElementType: (value: string) => void;
  questionId?: string;
  setQuestionId: (questionId: string) => void;
  editing: boolean;
  handleEditing: (isEditing: boolean, sectionId: string) => void;
  questionText?: string;
  setQuestionText: (value: string) => void;
  supportingText?: string;
  setSupportingText: (value: string) => void;
  placeholder?: string;
  setPlaceholder: (value: string) => void;
  inputElements: InputElement[];
  setInputElements: (inputElements: InputElement[]) => void;
  addInputElement: (inputElement: InputElement) => void;
  modifyInputElement: (
    index: number,
    key: string,
    value: string
  ) => InputElement[];
  clearInputElements: () => void;
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderContextProvider = (props: {
  questionId?: string;
  children?: React.ReactNode;
}) => {
  const [elementType, setElementType] = useState<string | undefined>(undefined);
  const [questionId, setQuestionId] = useState<string | undefined>(undefined);
  const [editing, setEditing] = useState<boolean>(false);
  const [questionText, setQuestionText] = useState<string | undefined>(
    undefined
  );
  const [supportingText, setSupportingText] = useState<string | undefined>(
    undefined
  );
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined);
  const [inputElements, setInputElements] = useState<InputElement[]>([]);

  const { data: question } = trpc.useQuery(
    ["question.byId", { id: questionId as string }],
    { enabled: !!questionId, refetchOnWindowFocus: false }
  );

  const { data: questions } = trpc.useQuery(
    ["questionOption.getAllByQuestionId", { questionId: questionId as string }],
    { enabled: !!questionId, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (question) {
      setElementType(question.type);
      setQuestionText(question.text);
    }
  }, [question]);

  useEffect(() => {
    if (questions) {
      const formattedElements = questions.map(({ text, type, id }) => ({
        label: text,
        value: text,
        type,
        placeholder: undefined,
        id,
      }));
      setInputElements(formattedElements);
    }
  }, [questions]);

  // TODO Move the actions to selecitons component and just pass setInputElements from here

  const handleEditing = (isEditing: boolean, questionId: string) => {
    setEditing(isEditing);
    setQuestionId(questionId);
  };

  const addInputElement = (inputElement: InputElement) =>
    setInputElements([...inputElements, inputElement]);

  const modifyInputElement = (index: number, key: string, value: string) => {
    const updatedElements = inputElements.map((element, i) =>
      i === index ? { ...element, [key]: value } : element
    );
    setInputElements(updatedElements);
    return updatedElements;
  };

  const removeInputElement = (id: string) => ({}); // TODO Implement this

  const clearInputElements = () => setInputElements([]);

  const value = {
    elementType,
    setElementType,
    questionId,
    setQuestionId,
    editing,
    handleEditing,
    questionText,
    setQuestionText,
    supportingText,
    setSupportingText,
    placeholder,
    setPlaceholder,
    inputElements,
    setInputElements,
    addInputElement,
    modifyInputElement,
    clearInputElements,
  };
  return <BuilderContext.Provider value={value} {...props} />;
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);

  if (context === undefined) {
    throw new Error(`useBuilder must be used within BuilderContextProvider.`);
  }
  return context;
};
