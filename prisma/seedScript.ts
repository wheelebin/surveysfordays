import {
  PrismaClient,
  Prisma,
  Page,
  Section,
  Question,
  QuestionOption,
  Text,
  Image,
  PrismaPromise,
} from "@prisma/client";

const prisma = new PrismaClient();

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const duplicate = <T>(
  itemMethod: (index: number) => T,
  amount?: number
): T[] => {
  // Will pick random amount of items to duplicate if amount is 0
  const items: T[] = [];
  const timesToRun = amount ? amount : getRandomNumber(1, 2);
  for (let i = 0; i < timesToRun; i++) {
    items.push(itemMethod(i));
  }
  return items;
};

const pause = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const dropDatabase = async () => {
  // Dirty solution for sqlite timeout issue, inspiration from https://github.com/prisma/prisma/issues/2955#issuecomment-1005784033
  // TODO manage this in a better way
  await prisma.questionOption.deleteMany();
  await prisma.question.deleteMany();
  await prisma.text.deleteMany();
  await prisma.image.deleteMany();
  await prisma.section.deleteMany();
  await prisma.page.deleteMany();
  await prisma.survey.deleteMany();
};

export const initMock = () => {
  const survey = {
    id: "survey-0",
    title: "what are your favorite things",
    name: "Favorite things",
    description: "What are your favorite things?",
    startsAt: new Date("2022-01-01T00:00:00.000Z"),
    endsAt: new Date("2022-12-29T00:00:00.000Z"),
  };

  const pages = duplicate<Page>((index: number) => ({
    pageNumber: index,
    id: `page-${index}`,
    surveyId: survey.id,
    createdAt: new Date(),
  }));

  const sections: Section[] = [];
  pages.forEach((page, pageIndex) =>
    sections.push(
      ...duplicate<Section>((index: number) => ({
        pageId: page.id,
        id: `section-${index}-${pageIndex}`,
        sectionNumber: index,
        createdAt: new Date(),
      }))
    )
  );

  // TODO Set question and question options based on hardcoded questions
  // for the different question types
  const questions: Question[] = [];
  sections.forEach((section, sectionIndex) =>
    questions.push(
      ...duplicate<Question>((index: number) => ({
        id: `question-${index}-${sectionIndex}`,
        sectionId: section.id,
        surveyId: survey.id,
        text: "What is your favorite color?",
        supportText: "Some support text",
        type: "RADIO",
        orderNumber: index,
        createdAt: new Date(),
      }))
    )
  );

  const questionOptions: QuestionOption[] = [];
  questions.forEach((question, questionIndex) =>
    questionOptions.push(
      ...duplicate<QuestionOption>((index: number) => ({
        id: `questionOption-${index}-${questionIndex}`,
        questionId: question.id,
        type: "RADIO",
        label: "Blue",
        placeholder: "Something goes here",
        supportText: "This text will nudge you in the right direction",
        value: `questionOption-${questionIndex}-${index}`,
        orderNumber: index,
        createdAt: new Date(),
      }))
    )
  );

  // TODO Add text & image creation to this method

  return {
    survey,
    pages,
    sections,
    questions,
    questionOptions,
  };
};

export async function main() {
  await dropDatabase();
  const { survey, pages, sections, questions, questionOptions } = initMock();

  await prisma.survey.upsert({
    where: { id: survey.id },
    update: {},
    create: survey,
  });

  await Promise.any(
    pages.map((page) =>
      prisma.page.upsert({
        where: { id: page.id },
        update: {},
        create: page,
      })
    )
  );

  await Promise.any(
    sections.map((section) =>
      prisma.section.upsert({
        where: { id: section.id },
        update: {},
        create: section,
      })
    )
  );

  await Promise.any(
    questions.map((question) =>
      prisma.question.upsert({
        where: { id: question.id },
        update: {},
        create: question,
      })
    )
  );

  await Promise.any(
    questionOptions.map((questionOption) =>
      prisma.questionOption.upsert({
        where: { id: questionOption.id },
        update: {},
        create: questionOption,
      })
    )
  );
}
