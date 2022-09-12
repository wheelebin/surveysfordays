const survey = {
  id: "sxxxxxxxx",
  title: "what are your favorite things",
  name: "Favorite things",
  description: "What are your favorite things?",
  startsAt: new Date("2022-01-01T00:00:00.000Z"),
  endsAt: new Date("2022-12-29T00:00:00.000Z"),
};

const pages = [
  {
    id: "p1xxxxxxx",
    surveyId: undefined,
    pageNumber: 1,
  },
  {
    id: "p2xxxxxxx",
    surveyId: undefined,
    pageNumber: 2,
  },
  {
    id: "p3xxxxxxx",
    surveyId: undefined,
    pageNumber: 3,
  },
];

const sections = [
  // First section
  {
    id: "s11xxxxxx",
    pageId: undefined,
    sectionNumber: 1,
  },
  {
    id: "s12xxxxxx",
    pageId: undefined,
    sectionNumber: 2,
  },

  // Second section
  {
    id: "s21xxxxxx",
    pageId: undefined,
    sectionNumber: 1,
  },
  {
    id: "s22xxxxxx",
    pageId: undefined,
    sectionNumber: 2,
  },

  // Second section
  {
    id: "s31xxxxxx",
    pageId: undefined,
    sectionNumber: 1,
  },
  {
    id: "s32xxxxxx",
    pageId: undefined,
    sectionNumber: 2,
  },
  {
    id: "s33xxxxxx",
    pageId: undefined,
    sectionNumber: 3,
  },
];

const question = {
  id: "qxxxxxxxx",
  surveyId: undefined,
  sectionId: undefined,
  text: "What is your favorite color?",
};

const questionOptions = {
  TEXT: { id: "DUMMYID", questionId: undefined, type: "TEXT" },
  CHECKBOX: {
    id: "DUMMYID",
    questionId: undefined,
    type: "CHECKBOX",
    text: "Blue",
  },
  RADIO: { id: "DUMMYID", questionId: undefined, type: "RADIO", text: "Red" },
  NUMBER: { id: "DUMMYID", questionId: undefined, type: "Number" },
};

export const mockData = {
  survey,
  pages,
  sections,
  question,
  questionOptions,
};
